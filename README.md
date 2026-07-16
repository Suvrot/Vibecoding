# VibeCode — платформа по Vibe Coding

Образовательная платформа для изучения Vibe Coding с нуля до первых заработанных денег.
Стек: **Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Supabase · Vercel**.

## Возможности

- 🏠 Главная с дорожной картой обучения
- 🗺️ Дорожная карта из 4 этапов (основы → промпты → проект → деньги)
- 📚 Пошаговые уроки: теория → практика → тест
- 🤖 ИИ-наставник (чат, demo-режим без ключа либо через OpenAI-compatible API)
- ✨ Генератор промптов по структуре РОЛЬ+КОНТЕКСТ+ЗАДАЧА+ОГРАНИЧЕНИЯ+ФОРМАТ
- 🧰 Каталог AI-инструментов (Cursor, VS Code, Windsurf, Lovable, Bolt.new, Replit, Claude, ChatGPT)
- 💎 Система прогресса: уровни, XP, достижения, streak
- 💼 Личный кабинет и страница проектов (портфолио)
- 💸 Раздел «Первые деньги»: где искать клиентов и как собрать портфолио
- 🌗 Тёмная/светлая тема, адаптивный дизайн

## Быстрый старт

```bash
pnpm install
cp .env.example .env.local   # заполните значения Supabase
pnpm dev
```

Платформа **работает в demo-режиме без Supabase** (авторизация и сохранение
профиля отключены, контент доступен). Чтобы включить полный функционал —
подключите Supabase (см. ниже).

## Подключение Supabase

1. Создайте проект на [supabase.com](https://supabase.com).
2. Скопируйте `URL` и `anon key` в `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   ```
3. Выполните SQL из `supabase/schema.sql` в SQL Editor (создаёт таблицы
   `profiles`, `projects` и триггер профиля при регистрации).
4. (Опционально) ИИ-наставник с реальным LLM — добавьте `OPENAI_API_KEY`,
   `OPENAI_BASE_URL`, `OPENAI_MODEL` в `.env.local`. Без них работает demo-режим.

## Деплой на Vercel

1. Залейте код в GitHub.
2. Импортируйте репозиторий на [vercel.com](https://vercel.com/new).
3. Добавьте те же переменные окружения (Supabase + OpenAI).
4. Deploy — готово.

## Структура

```
src/
  app/                 # маршруты (pages)
    api/mentor/        # endpoint ИИ-наставника
    learn/[id]/        # страница урока
    dashboard/ projects/ achievements/  # личный кабинет
  components/
    ui/                # базовые компоненты (Button, Card, Badge, Input, Progress)
    layout/ home/ learn/ mentor/ projects/ auth/ dashboard/
  lib/
    supabase/          # клиенты (browser/server/middleware)
    data/              # контент: modules, tools, achievements, nav, profile
    types.ts utils.ts
supabase/schema.sql    # схема БД
```

## Дальнейшие улучшения

- Реальная генерация изображений для уроков (Supabase Storage).
- Push-уведомления и streak-напоминания.
- Рейтинг учеников и социальные функции.
- Расширенный генератор промптов с шаблонами по категориям.
- Интеграция платежей для платных курсов.
