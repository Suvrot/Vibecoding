"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function DeleteAccount() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  async function handleDelete() {
    const ok = window.confirm(
      "Удалить аккаунт? Это действие необратимо. Все данные, проекты и прогресс будут удалены навсегда.",
    );
    if (!ok) return;

    setLoading(true);
    const res = await fetch("/api/delete-account", { method: "POST" });
    if (res.ok) {
      const supabase = createClient();
      await supabase?.auth.signOut();
      router.push("/");
    }
    setLoading(false);
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-sm text-red-400 hover:text-red-300 transition-colors underline-offset-4 hover:underline disabled:opacity-50"
    >
      {loading ? "Удаляю…" : "Удалить аккаунт"}
    </button>
  );
}
