"use client";

import * as React from "react";
import { Copy, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/input";

const roles = [
  "Senior React-разработчик",
  "Опытный UX-дизайнер",
  "DevOps-инженер",
  "Эксперт по базам данных",
  "Технический писатель",
];

const formats = [
  "Только код",
  "Код + пошаговое объяснение",
  "Список шагов",
  "Таблица сравнения",
  "Краткий план",
];

const tones = [
  "Профессионально",
  "Просто и понятно",
  "Для новичка",
  "Для эксперта",
];

export default function PromptsPage() {
  const [role, setRole] = React.useState(roles[0]);
  const [task, setTask] = React.useState("");
  const [context, setContext] = React.useState("");
  const [constraints, setConstraints] = React.useState("");
  const [format, setFormat] = React.useState(formats[0]);
  const [tone, setTone] = React.useState(tones[1]);
  const [result, setResult] = React.useState("");

  function build() {
    const parts = [
      `Ты — ${role}.`,
      context.trim() && `Контекст: ${context.trim()}`,
      `Задача: ${task.trim() || "..."}`,
      constraints.trim() && `Ограничения: ${constraints.trim()}`,
      `Формат ответа: ${format}.`,
      `Тон: ${tone}.`,
    ].filter(Boolean);
    setResult(parts.join("\n\n"));
  }

  function copy() {
    navigator.clipboard.writeText(result);
  }

  return (
    <div className="container mx-auto px-4 lg:px-6 py-12 max-w-3xl">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold">Генератор промптов</h1>
        <p className="mt-2 text-muted-foreground">
          Соберите чёткий промпт по структуре РОЛЬ + КОНТЕКСТ + ЗАДАЧА +
          ОГРАНИЧЕНИЯ + ФОРМАТ.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Роль</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="flex h-11 w-full rounded-lg border border-border bg-muted/50 px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {roles.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Задача *</label>
            <Textarea
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Что нужно сделать?"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Контекст</label>
            <Textarea
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="Стек, проект, фреймворк…"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">
              Ограничения
            </label>
            <Input
              value={constraints}
              onChange={(e) => setConstraints(e.target.value)}
              placeholder="Язык, библиотеки, стиль…"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium mb-1 block">Формат</label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="flex h-11 w-full rounded-lg border border-border bg-muted/50 px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {formats.map((f) => (
                  <option key={f}>{f}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Тон</label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="flex h-11 w-full rounded-lg border border-border bg-muted/50 px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {tones.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>
          <Button variant="gradient" className="w-full" onClick={build}>
            <Sparkles size={16} /> Сгенерировать
          </Button>
        </div>

        <Card className="md:sticky md:top-20 self-start">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="text-base">Готовый промпт</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={copy}
              disabled={!result}
              aria-label="Копировать"
            >
              <Copy size={16} />
            </Button>
          </CardHeader>
          <CardContent>
            {result ? (
              <pre className="whitespace-pre-wrap text-sm leading-relaxed bg-white/[0.03] border border-white/[0.06] rounded-lg p-4">
                {result}
              </pre>
            ) : (
              <p className="text-sm text-muted-foreground">
                Заполните поля слева и нажмите «Сгенерировать».
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
