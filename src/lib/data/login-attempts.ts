"use server";

import { createClient } from "@/lib/supabase/server";

export async function logLoginAttempt(
  email: string,
  success: boolean,
  ip?: string,
) {
  const supabase = await createClient();
  await supabase.from("login_attempts").insert({
    email,
    success,
    ip: ip || null,
  });
}
