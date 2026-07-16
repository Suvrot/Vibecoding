import { NextRequest, NextResponse } from "next/server";

// ponytail: same in-memory rate limiter, shared pattern
const rateMap = new Map<string, { count: number; reset: number }>();
const RATE_LIMIT = 10;
const RATE_WINDOW = 60_000;

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return req.headers.get("x-real-ip") ?? "unknown";
}

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

function sanitize(input: unknown, maxLen = 500): string {
  return typeof input === "string" ? input.trim().slice(0, maxLen) : "";
}

function buildPrompt(
  role: string,
  task: string,
  context: string,
  constraints: string,
  format: string,
  tone: string,
): string {
  const parts = [
    `Ты — ${role}.`,
    context && `Контекст: ${context}`,
    `Задача: ${task || "..."}`,
    constraints && `Ограничения: ${constraints}`,
    `Формат ответа: ${format}.`,
    `Тон общения: ${tone}.`,
  ].filter(Boolean);
  return parts.join("\n\n");
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);

  if (!checkRate(ip)) {
    return NextResponse.json(
      { error: "Слишком много запросов. Подожди минуту." },
      { status: 429 },
    );
  }

  const body = await req.json().catch(() => null);

  const role = sanitize(body?.role, 200);
  const task = sanitize(body?.task, 1000);
  const context = sanitize(body?.context, 500);
  const constraints = sanitize(body?.constraints, 500);
  const format = sanitize(body?.format, 200);
  const tone = sanitize(body?.tone, 200);

  if (!task) {
    return NextResponse.json(
      { error: "Поле «Задача» обязательно." },
      { status: 400 },
    );
  }

  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return NextResponse.json({
      prompt: buildPrompt(role, task, context, constraints, format, tone),
      enhanced: false,
    });
  }

  try {
    const systemMsg = `Ты — эксперт по промпт-инжинирингу. Улучши промпт пользователя, сделай его максимально эффективным для ИИ. Сохрани структуру: РОЛЬ + КОНТЕКСТ + ЗАДАЧА + ОГРАНИЧЕНИЯ + ФОРМАТ. Отвечай ТОЛЬКО готовым промптом без объяснений.`;

    const userMsg = `Улучши этот промпт:
Роль: ${role}
Задача: ${task}
Контекст: ${context || "не указан"}
Ограничения: ${constraints || "нет"}
Формат: ${format}
Тон: ${tone}`;

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemMsg },
          { role: "user", content: userMsg },
        ],
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    const data = await res.json();
    const prompt = data?.choices?.[0]?.message?.content;
    if (!prompt) {
      return NextResponse.json({
        prompt: buildPrompt(role, task, context, constraints, format, tone),
        enhanced: false,
      });
    }
    return NextResponse.json({ prompt, enhanced: true });
  } catch {
    return NextResponse.json({
      prompt: buildPrompt(role, task, context, constraints, format, tone),
      enhanced: false,
    });
  }
}
