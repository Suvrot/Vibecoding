import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `Ты — дружелюбный ИИ-наставник по Vibe Coding на русском языке. 
Помогаешь новичкам учиться кодить с помощью ИИ-инструментов (Cursor, VS Code, Windsurf, Lovable, Bolt.new, Replit, Claude, ChatGPT).
Объясняй просто, давай примеры кода, подсказывай промпты. Будь поддерживающим. 
Если вопрос не по теме кодинга — вежливо верни к обучению. Отвечай лаконично, но по делу. Максимум 3-4 абзаца.`;

const rateMap = new Map<string, { count: number; reset: number }>();
const RATE_LIMIT = 20;
const RATE_WINDOW = 60_000;

function checkRate(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.reset) {
    rateMap.set(ip, { count: 1, reset: now + RATE_WINDOW });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip") ?? "unknown";

  if (!checkRate(ip)) {
    return NextResponse.json(
      { error: "Слишком много запросов. Подожди минуту." },
      { status: 429 },
    );
  }

  const { messages } = await req.json();
  const last = messages[messages.length - 1]?.content ?? "";

  const geminiKey = process.env.GEMINI_API_KEY;

  if (!geminiKey) {
    return NextResponse.json({ reply: demoReply(last) });
  }

  try {
    const contents = [
      { role: "user", parts: [{ text: SYSTEM_PROMPT + "\n\nОтвечай как наставник." }] },
      { role: "model", parts: [{ text: "Понял! Я готов помогать с Vibe Coding." }] },
      ...messages.map((m: { role: string; content: string }) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      })),
    ];

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents }),
      },
    );

    const data = await res.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ??
      "Извини, не удалось получить ответ. Попробуй переформулировать.";
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ reply: demoReply(last) });
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
