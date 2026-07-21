import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { levelForXp } from "@/lib/data/achievements";

const VALID_LESSONS = new Set([
  "l1", "l2", "l3", "l4", "l5", "l6",
  "l7", "l8", "l9", "l10", "l11", "l12",
]);

const LESSON_XP: Record<string, number> = {
  l1: 50, l2: 50, l3: 70, l4: 70,
  l5: 90, l6: 90, l7: 110, l8: 110,
  l9: 100, l10: 100, l11: 90, l12: 90,
};

const MODULE_MAP: Record<string, string> = {
  l1: "m1", l2: "m1", l3: "m2", l4: "m2",
  l5: "m3", l6: "m3", l7: "m4", l8: "m4",
  l9: "m5", l10: "m5", l11: "m6", l12: "m6",
};

type ProfileRow = {
  xp: number;
  completed_lessons: string[] | null;
  achievements: string[] | null;
};

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const lessonId = body?.lessonId;

  if (!lessonId || typeof lessonId !== "string" || !VALID_LESSONS.has(lessonId)) {
    return NextResponse.json({ error: "Неверный ID урока" }, { status: 400 });
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("xp, completed_lessons, achievements")
    .eq("id", user.id)
    .single() as { data: ProfileRow | null; error: unknown };

  if (profileError || !profile) {
    return NextResponse.json(
      { error: "Не удалось загрузить профиль" },
      { status: 500 },
    );
  }

  const completed = new Set(profile.completed_lessons ?? []);
  const alreadyCompleted = completed.has(lessonId);
  completed.add(lessonId);

  const xp = LESSON_XP[lessonId] ?? 50;
  const newXp = profile.xp + (alreadyCompleted ? 0 : xp);

  const achievements = new Set(profile.achievements ?? []);
  achievements.add("first-step");
  const moduleId = MODULE_MAP[lessonId];
  if (moduleId === "m5") achievements.add("data-master");
  if (moduleId === "m6") achievements.add("deploy-pro");
  if (completed.size >= 12) achievements.add("graduate");

  const { error: updateError } = await supabase
    .from("profiles")
    .update({
      xp: newXp,
      completed_lessons: Array.from(completed),
      achievements: Array.from(achievements),
      level: levelForXp(newXp).current.id,
    })
    .eq("id", user.id)
    .select()
    .single();

  if (updateError) {
    return NextResponse.json(
      { error: "Не удалось сохранить прогресс" },
      { status: 500 },
    );
  }

  return NextResponse.json({
    success: true,
    xp: alreadyCompleted ? 0 : xp,
    totalXp: newXp,
    completed: Array.from(completed),
  });
}
