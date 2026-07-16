"use client";

import * as React from "react";

type User = {
  id: string;
  email: string;
  username: string;
  xp: number;
  level: number;
  completed_lessons: string[] | null;
  created_at: string;
};

export function AdminExport({ users }: { users: User[] }) {
  function downloadUsersCSV() {
    const headers = ["Email", "Username", "XP", "Level", "Уроков пройдено", "Дата регистрации"];
    const rows = users.map((u) => [
      u.email,
      u.username,
      String(u.xp),
      String(u.level),
      String((u.completed_lessons ?? []).length),
      new Date(u.created_at).toLocaleDateString("ru-RU"),
    ]);

    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `vibecode-users-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <button
      onClick={downloadUsersCSV}
      className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-sm font-medium hover:bg-white/[0.08] transition-colors"
    >
      Скачать CSV
    </button>
  );
}
