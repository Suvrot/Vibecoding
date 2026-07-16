"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type User = {
  id: string;
  email: string;
  username: string;
  xp: number;
  level: number;
  completed_lessons: string[] | null;
  created_at: string;
};

export function AdminUsers({ users }: { users: User[] }) {
  const [sort, setSort] = React.useState<"date" | "xp" | "lessons">("date");

  const sorted = [...users].sort((a, b) => {
    if (sort === "xp") return b.xp - a.xp;
    if (sort === "lessons") return (b.completed_lessons ?? []).length - (a.completed_lessons ?? []).length;
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="text-base">Все пользователи ({users.length})</CardTitle>
        <div className="flex gap-2">
          {(["date", "xp", "lessons"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSort(s)}
              className={`rounded-lg px-3 py-1 text-xs font-medium transition-colors ${
                sort === s
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {s === "date" ? "По дате" : s === "xp" ? "По XP" : "По урокам"}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06] text-muted-foreground">
                <th className="text-left py-2 px-2 font-medium">Email</th>
                <th className="text-left py-2 px-2 font-medium">Имя</th>
                <th className="text-right py-2 px-2 font-medium">XP</th>
                <th className="text-right py-2 px-2 font-medium">Уровень</th>
                <th className="text-right py-2 px-2 font-medium">Уроки</th>
                <th className="text-right py-2 px-2 font-medium">Дата</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((u) => (
                <tr key={u.id} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                  <td className="py-2 px-2">{u.email}</td>
                  <td className="py-2 px-2">{u.username}</td>
                  <td className="py-2 px-2 text-right font-mono">{u.xp}</td>
                  <td className="py-2 px-2 text-right">
                    <Badge variant="outline">{u.level}</Badge>
                  </td>
                  <td className="py-2 px-2 text-right font-mono">
                    {(u.completed_lessons ?? []).length}/12
                  </td>
                  <td className="py-2 px-2 text-right text-muted-foreground">
                    {new Date(u.created_at).toLocaleDateString("ru-RU")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
