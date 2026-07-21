import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { checkRateLimit } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/utils";

const SYSTEM_PROMPT = `Ты — дружелюбный ИИ-наставник по Vibe Coding на русском языке. 
Помогаешь новичкам учиться кодить с помощью ИИ-инструментов (Cursor, VS Code, Windsurf, Lovable, Bolt.new, Replit, Claude, ChatGPT).
Объясняй просто, давай примеры кода, подсказывай промпты. Будь поддерживающим. 
Если вопрос не по теме кодинга — вежливо верни к обучению. Отвечай лаконично, но по делу. Максимум 3-4 абзаца.`;

function sanitizeMessages(raw: unknown): { role: string; content: string }[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((m): m is { role: unknown; content: unknown } =>
      typeof m === "object" && m !== null && "role" in m && "content" in m
    )
    .filter((m) => typeof m.content === "string" && m.content.length > 0)
    .slice(-20)
    .map((m) => ({
      role: m.role === "user" ? "user" : "assistant",
      content: String(m.content).slice(0, 2000),
    }));
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
  }

  const ip = getClientIp(req);

  if (!(await checkRateLimit(`mentor:${ip}`, 20, 60))) {
    return NextResponse.json(
      { error: "Слишком много запросов. Подожди минуту." },
      { status: 429 },
    );
  }

  const body = await req.json().catch(() => null);
  const messages = sanitizeMessages(body?.messages);

  if (messages.length === 0) {
    return NextResponse.json(
      { error: "Неверный формат сообщений." },
      { status: 400 },
    );
  }

  const last = messages[messages.length - 1]?.content ?? "";

  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ reply: demoReply(last), degraded: true });
  }

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    const data = await res.json();
    const reply = data?.choices?.[0]?.message?.content;
    if (!reply) {
      return NextResponse.json({ reply: demoReply(last), degraded: true });
    }
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ reply: demoReply(last), degraded: true });
  }
}

function demoReply(prompt: string): string {
  const p = prompt.toLowerCase();
  if (p.includes("промпт"))
    return "Отличный промпт строится по схеме: РОЛЬ + КОНТЕКСТ + ЗАДАЧА + ОГРАНИЧЕНИЯ + ФОРМАТ. Попробуй наш генератор промптов — он соберёт структуру за тебя!";
  if (p.includes("инструмент") || p.includes("cursor") || p.includes("lovable"))
    return "В каталоге инструментов я разобрал Cursor, VS Code, Windsurf, Lovable, Bolt.new и Replit. Для старта советую Cursor или Lovable — они прощают ошибки новичка.";
  if (p.includes("деньг") || p.includes("клиент") || p.includes("заработ"))
    return "Первый заказ часто приходит от знакомых или через соцсети. Собери 2-3 рабочих проекта в портфолио и предлагай малому бизнесу простые сайты и ботов. Подробнее — в разделе «Первые деньги».";
  if (p.includes("ошибк") || p.includes("bug") || p.includes("не работ"))
    return "Скопируй ошибку и вставь в ИИ с фразой: «Объясни эту ошибку и предложи исправление по шагам». Итеративно исправляй — это нормальный процесс Vibe Coding.";
  return "Привет! Я твой ИИ-наставник по Vibe Coding. Спрашивай про инструменты, промпты, уроки или первые деньги. Чем помочь?";
}
