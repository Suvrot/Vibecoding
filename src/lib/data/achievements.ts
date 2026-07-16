import type { Achievement, Level } from "@/lib/types";

export const achievements: Achievement[] = [
  { id: "first-step", title: "Первый шаг", description: "Завершён первый урок", icon: "🌱" },
  { id: "prompt-master", title: "Мастер промптов", description: "Прошёл модуль о промптах", icon: "✍️" },
  { id: "first-deploy", title: "В эфире", description: "Задеплоил первый проект", icon: "🚀" },
  { id: "streak-7", title: "Неделя подряд", description: "7 дней подряд в обучении", icon: "🔥" },
  { id: "first-money", title: "Первые деньги", description: "Добавил проект с заработком", icon: "💸" },
  { id: "tool-explorer", title: "Исследователь", description: "Открыл 5 инструментов", icon: "🧭" },
  { id: "data-master", title: "Хранитель данных", description: "Прошёл модуль про Supabase", icon: "🗄️" },
  { id: "deploy-pro", title: "В продакшне", description: "Прошёл модуль про деплой", icon: "🌐" },
  { id: "graduate", title: "Выпускник", description: "Прошёл все модули", icon: "🎓" },
  { id: "mentor-fan", title: "Друг ИИ-наставника", description: "10 сообщений наставнику", icon: "🤖" },
];

export const levels: Level[] = [
  { id: 1, title: "Новичок", description: "Только начинаешь", xpReward: 0, icon: "🌱" },
  { id: 2, title: "Ученик", description: "Осваиваешь основы", xpReward: 200, icon: "📘" },
  { id: 3, title: "Практик", description: "Пишешь первые проекты", xpReward: 500, icon: "⚒️" },
  { id: 4, title: "Билдер", description: "Собираешь приложения", xpReward: 900, icon: "🛠️" },
  { id: 5, title: "Профи", description: "Зарабатываешь на навыке", xpReward: 1400, icon: "💎" },
  { id: 6, title: "Мастер", description: "Наставляешь других", xpReward: 2000, icon: "👑" },
  { id: 7, title: "Легенда", description: "Прошёл всю платформу", xpReward: 2600, icon: "🌟" },
];

export function levelForXp(xp: number) {
  let current = levels[0];
  for (const lvl of levels) {
    if (xp >= lvl.xpReward) current = lvl;
  }
  const next = levels.find((l) => l.xpReward > xp);
  const progress = next
    ? ((xp - current.xpReward) / (next.xpReward - current.xpReward)) * 100
    : 100;
  return { current, next: next ?? null, progress };
}
