import { unstable_cache } from "next/cache";
import { createClient } from "@/lib/supabase/server";

const CACHE_TTL = 60; // seconds

export const getCachedAdminStats = unstable_cache(
  async () => {
    const supabase = await createClient();
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();

    const [
      { count: totalUsers },
      { count: todayViews },
      { count: weekViews },
      { count: totalProjects },
    ] = await Promise.all([
      supabase.from("profiles").select("*", { count: "exact", head: true }),
      supabase.from("analytics").select("*", { count: "exact", head: true }).gte("created_at", todayStart),
      supabase.from("analytics").select("*", { count: "exact", head: true }).gte("created_at", weekAgo),
      supabase.from("projects").select("*", { count: "exact", head: true }),
    ]);

    return { totalUsers: totalUsers ?? 0, todayViews: todayViews ?? 0, weekViews: weekViews ?? 0, totalProjects: totalProjects ?? 0 };
  },
  ["admin-stats"],
  { revalidate: CACHE_TTL },
);

export const getCachedAdminUsers = unstable_cache(
  async () => {
    const supabase = await createClient();
    const { data } = await supabase
      .from("profiles")
      .select("id, email, username, xp, level, completed_lessons, created_at")
      .order("created_at", { ascending: false })
      .limit(20);
    return data ?? [];
  },
  ["admin-users"],
  { revalidate: CACHE_TTL },
);

export const getCachedAdminTopPages = unstable_cache(
  async () => {
    const supabase = await createClient();
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const { data } = await supabase.from("analytics").select("page").gte("created_at", weekAgo);
    const pageViews = (data ?? []) as Array<{ page: string }>;
    const pageCount: Record<string, number> = {};
    pageViews.forEach((p) => {
      pageCount[p.page] = (pageCount[p.page] || 0) + 1;
    });
    return Object.entries(pageCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10);
  },
  ["admin-top-pages"],
  { revalidate: CACHE_TTL },
);

export const getCachedAdminActiveUsers = unstable_cache(
  async () => {
    const supabase = await createClient();
    const { data } = await supabase
      .from("profiles")
      .select("id, email, username, xp, completed_lessons")
      .not("completed_lessons", "eq", "{}");
    return data ?? [];
  },
  ["admin-active-users"],
  { revalidate: CACHE_TTL },
);
