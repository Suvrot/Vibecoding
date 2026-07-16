import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `Ты — дружелюбный ИИ-наставник по Vibe Coding на русском языке. 
Помогаешь новичкам учиться кодить с помощью ИИ-инструментов (Cursor, VS Code, Windsurf, Lovable, Bolt.new, Replit, Claude, ChatGPT).
Объясняй просто, давай примеры кода, подсказывай промпты. Будь поддерживающим. 
Если вопрос не по теме кодинга — вежливо верни к обучению. Отвечай лаконично, но по делу.`;

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

  const { createServerClient } = await import("@supabase/ssr");
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll() {},
      },
    },
  );
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { messages } = await req.json();

  const apiKey = process.env.OPENAI_API_KEY;
  const baseUrl = process.env.OPENAI_BASE_URL ?? "https://api.openai.com/v1";
  const model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";

  if (!apiKey) {
    const last = messages[messages.length - 1]?.content ?? "";
    const reply = demoReply(last);
    return NextResponse.json({ reply });
  }

  if (!user) {
    const last = messages[messages.length - 1]?.content ?? "";
    const reply = demoReply(last);
    return NextResponse.json({ reply });
  }

  try {
    const res = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages.map((m: { role: string; content: string }) => ({
            role: m.role,
            content: m.content,
          })),
        ],
        temperature: 0.7,
      }),
    });
    const data = await res.json();
    const reply =
      data?.choices?.[0]?.message?.content ??
      "Извини, не удалось получить ответ. Попробуй переформулировать.";
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ reply: demoReply(messages.at(-1)?.content ?? "") });
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
