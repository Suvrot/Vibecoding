import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
  }

  const { error } = await supabase.auth.admin.deleteUser(user.id);

  if (error) {
    return NextResponse.json(
      { error: "Не удалось удалить аккаунт. Попробуй позже." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
