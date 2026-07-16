"use client";

import * as React from "react";
import { Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Msg = { role: "user" | "assistant"; content: string };

const suggestions = [
  "Какой инструмент выбрать новичку?",
  "Помоги составить промпт для сайта",
  "Как найти первого клиента?",
  "Что делать, если код не работает?",
];

export function MentorChat() {
  const [messages, setMessages] = React.useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Привет! Я твой ИИ-наставник по Vibe Coding. Спрашивай что угодно об инструментах, промптах и первых деньгах.",
    },
  ]);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const endRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function send(text: string) {
    if (!text.trim() || loading) return;
    const next = [...messages, { role: "user" as const, content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/mentor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      setMessages((m) => [
        ...m,
        { role: "assistant", content: data.reply },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Ошибка сети. Попробуй ещё раз." },
      ]);
    }
    setLoading(false);
  }

  return (
    <div className="flex flex-col h-[70vh] glass-card overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m, i) => (
          <div
            key={i}
            className={cn(
              "flex gap-3",
              m.role === "user" ? "justify-end" : "justify-start",
            )}
          >
            {m.role === "assistant" && (
              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 text-black">
                <Bot size={16} />
              </div>
            )}
            <div
              className={cn(
                "max-w-[80%] rounded-2xl p-3 text-sm leading-relaxed",
                m.role === "user"
                  ? "bg-emerald-500 text-black"
                  : "bg-white/[0.06]",
              )}
            >
              {m.content}
            </div>
            {m.role === "user" && (
              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/[0.06]">
                <User size={16} />
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex gap-3">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 text-black">
              <Bot size={16} />
            </div>
            <div className="rounded-2xl bg-white/[0.06] p-3 text-sm">Печатает…</div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className="border-t border-white/[0.06] p-3">
        <div className="mb-2 flex flex-wrap gap-2">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="rounded-full bg-white/[0.06] border border-white/[0.08] px-3 py-1 text-xs text-muted-foreground hover:border-emerald-500/30 hover:text-emerald-400 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Спроси наставника…"
          />
          <Button type="submit" size="icon" disabled={loading}>
            <Send size={16} />
          </Button>
        </form>
      </div>
    </div>
  );
}
