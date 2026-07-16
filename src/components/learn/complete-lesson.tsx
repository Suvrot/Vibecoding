"use client";

import * as React from "react";
import { createClient } from "@/lib/supabase/client";
import { LessonView } from "@/components/learn/lesson-view";
import type { Lesson } from "@/lib/types";

type ProfileRow = {
  xp: number;
  completed_lessons: string[] | null;
  achievements: string[] | null;
};

export function CompleteLesson({ lesson }: { lesson: Lesson }) {
  async function onComplete(xp: number) {
    const supabase = createClient();
    if (!supabase) return;
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;
    const { data: profile } = (await supabase
      .from("profiles")
      .select("xp, completed_lessons, achievements")
      .eq("id", user.id)
      .single()) as { data: ProfileRow | null };

    const completed = new Set(profile?.completed_lessons ?? []);
    completed.add(lesson.id);
    const newXp = (profile?.xp ?? 0) + xp;
    const achievements = new Set(profile?.achievements ?? []);
    achievements.add("first-step");
    if (lesson.moduleId === "m5") achievements.add("data-master");
    if (lesson.moduleId === "m6") achievements.add("deploy-pro");
    if (completed.size >= 12) achievements.add("graduate");

    await supabase
      .from("profiles")
      .update({
        xp: newXp,
        completed_lessons: Array.from(completed),
        achievements: Array.from(achievements),
        level: Math.max(1, Math.floor(newXp / 200) + 1),
      })
      .eq("id", user.id);
  }

  return <LessonView lesson={lesson} onComplete={() => onComplete(lesson.xp)} />;
}
