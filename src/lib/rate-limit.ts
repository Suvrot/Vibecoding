import { createClient } from "@/lib/supabase/server";

export async function checkRateLimit(
  key: string,
  limit = 20,
  windowSeconds = 60,
): Promise<boolean> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("check_rate_limit", {
    p_key: key,
    p_limit: limit,
    p_window_seconds: windowSeconds,
  });
  if (error) return true; // fail open on RPC error
  return data === true;
}
