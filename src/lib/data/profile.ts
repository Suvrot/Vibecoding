import { createClient } from "@/lib/supabase/server";
import type { Profile, Project } from "@/lib/types";

const hasEnv = !!(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function getProfile(): Promise<Profile | null> {
  if (!hasEnv) return null;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!data) return null;
  return data as Profile;
}

export async function getProjects(userId: string): Promise<Project[]> {
  if (!hasEnv) return [];
  const supabase = await createClient();
  const { data } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  return (data ?? []) as Project[];
}

export async function requireUser() {
  if (!hasEnv) return null;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}
