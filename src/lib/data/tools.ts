import type { Tool } from "@/lib/types";

export const tools: Tool[] = [
  {
    id: "cursor",
    name: "Cursor",
    category: "IDE",
    description:
      "AI-редактор кода на базе VS Code. Лучший выбор для Vibe Coding: пишет, рефакторит и объясняет код по自然语言-запросам.",
    pricing: "Бесплатно + Pro $20/мес",
    url: "https://cursor.com",
    tags: ["AI IDE", "Composer", "Tab completion"],
    bestFor: "Ежедневная разработка с ИИ-помощником",
  },
  {
    id: "vscode",
    name: "VS Code",
    category: "IDE",
    description:
      "Бесплатный редактор от Microsoft. Через расширения (GitHub Copilot, Cline, Roo Code) превращается в мощный Vibe Coding инструмент.",
    pricing: "Бесплатно",
    url: "https://code.visualstudio.com",
    tags: ["Редактор", "Расширения", "Copilot"],
    bestFor: "Базовая среда + расширения ИИ",
  },
  {
    id: "windsurf",
    name: "Windsurf",
    category: "IDE",
    description:
      "AI-native редактор с агентом Cascade, который понимает весь проект и вносит изменения across файлов.",
    pricing: "Бесплатно + Pro $15/мес",
    url: "https://windsurf.com",
    tags: ["Cascade", "Agents", "Multi-file"],
    bestFor: "Работа с большими проектами агентом",
  },
  {
    id: "lovable",
    name: "Lovable",
    category: "Builder",
    description:
      "Полностью no-code/low-code платформа: описываешь приложение словами — получаешь работающее веб-приложение с бэкендом.",
    pricing: "Бесплатно + $20/мес",
    url: "https://lovable.dev",
    tags: ["No-code", "Full-stack", "Supabase"],
    bestFor: "Быстрый запуск MVP без кода",
  },
  {
    id: "bolt",
    name: "Bolt.new",
    category: "Builder",
    description:
      "Браузерная среда разработки от StackBlitz. Генерирует и запускает полноценные приложения прямо в браузере.",
    pricing: "Бесплатно + $20/мес",
    url: "https://bolt.new",
    tags: ["In-browser", "Full-stack", "Deploy"],
    bestFor: "Прототипы и демо в браузере",
  },
  {
    id: "replit",
    name: "Replit",
    category: "Builder",
    description:
      "Облачная IDE с AI-агентом Replit Agent. Запускает, хостит и деплоит приложения из одного окна.",
    pricing: "Бесплатно + Core $20/мес",
    url: "https://replit.com",
    tags: ["Cloud IDE", "Deploy", "Agent"],
    bestFor: "Хостинг и деплой без локальной настройки",
  },
  {
    id: "claude",
    name: "Claude",
    category: "Assistant",
    description:
      "AI-ассистент от Anthropic с выдающимся кодом. Отлично пишет архитектуру, объясняет и помогает с дебагом.",
    pricing: "Бесплатно + Pro $20/мес",
    url: "https://claude.ai",
    tags: ["Chat", "Code", "Reasoning"],
    bestFor: "Планирование и сложные задачи",
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    category: "Assistant",
    description:
      "Универсальный ассистент с код-режимом. Хорош для объяснений, генерации промптов и быстрых правок.",
    pricing: "Бесплатно + Plus $20/мес",
    url: "https://chatgpt.com",
    tags: ["Chat", "Code", "Prompts"],
    bestFor: "Обучение и генерация промптов",
  },
];
