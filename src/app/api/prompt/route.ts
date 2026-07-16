import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { role, task, context, constraints, format, tone } = await req.json();

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
    context.trim() && `Контекст: ${context.trim()}`,
    `Задача: ${task.trim() || "..."}`,
    constraints.trim() && `Ограничения: ${constraints.trim()}`,
    `Формат ответа: ${format}.`,
    `Тон общения: ${tone}.`,
  ].filter(Boolean);
  return parts.join("\n\n");
}
