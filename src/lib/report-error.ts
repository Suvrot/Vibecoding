import { createClient } from "@/lib/supabase/client";

type ErrorSeverity = "error" | "warning" | "fatal";

export function reportError(
  error: Error,
  componentStack?: string,
  severity: ErrorSeverity = "error",
) {
  const supabase = createClient();
  if (!supabase) return;

  void supabase.from("app_errors").insert({
    message: error.message?.slice(0, 1000),
    stack: error.stack?.slice(0, 2000),
    component_stack: componentStack?.slice(0, 2000),
    url: typeof window !== "undefined" ? window.location.href : null,
    severity,
  });
}
