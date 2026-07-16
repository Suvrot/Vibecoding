import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { role, task, context, constraints, format, tone } = await req.json();

  const geminiKey = process.env.GEMINI_API_KEY;

  if (!geminiKey) {
    const prompt = buildPrompt(role, task, context, constraints, format, tone);
    return NextResponse.json({ prompt, enhanced: false });
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

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            { role: "user", parts: [{ text: systemMsg + "\n\n" + userMsg }] },
          ],
        }),
      },
    );

    const data = await res.json();
    const prompt =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ??
      buildPrompt(role, task, context, constraints, format, tone);
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
