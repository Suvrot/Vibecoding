import Link from "next/link";
import { Bot, Sparkles, Boxes, Trophy, Wallet } from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "ИИ-наставник",
    desc: "Задай любой вопрос по коду — ответ мгновенно, 24/7.",
    href: "/mentor",
  },
  {
    icon: Sparkles,
    title: "Генератор промптов",
    desc: "Конструктор, превращающий идею в чёткий промпт.",
    href: "/prompts",
  },
  {
    icon: Boxes,
    title: "Каталог инструментов",
    desc: "Cursor, VS Code, Windsurf, Lovable, Bolt.new — разобрано по делу.",
    href: "/tools",
  },
  {
    icon: Trophy,
    title: "Уровни и достижения",
    desc: "Система прогресса, удерживающая мотивацию каждый день.",
    href: "/dashboard",
  },
  {
    icon: Wallet,
    title: "Первые деньги",
    desc: "Где искать клиентов и как собрать портфолио, которое продаёт.",
    href: "/money",
  },
];

export function Features() {
  return (
    <section className="border-t border-white/[0.06]">
      <div className="container mx-auto px-4 lg:px-6 section-padding">
        <div className="text-center mb-12 lg:mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
            Экосистема
          </span>
          <h2 className="display-2 mt-3">Всё в одном месте</h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Всё необходимое, чтобы стать Vibe Coder — без переключения между десятью сервисами.
          </p>
        </div>

        <div className="bento-grid max-w-5xl mx-auto">
          <div className="glass-card p-7 bento-span-2 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl" />
            <div className="relative grid md:grid-cols-2 gap-6 items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                  <Bot size={14} /> Живой диалог
                </span>
                <h3 className="mt-4 text-2xl font-semibold">
                  Спроси наставника прямо сейчас
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Объясняет код, предлагает промпты, помогает с дебагом.
                </p>
                <Link
                  href="/mentor"
                  className="mt-4 inline-flex items-center gap-2 text-emerald-400 font-medium hover:underline"
                >
                  Открыть чат →
                </Link>
              </div>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 text-black">
                    <Bot size={16} />
                  </div>
                  <div className="rounded-2xl rounded-tl-sm bg-white/[0.06] px-4 py-2.5 text-sm">
                    Какой инструмент выбрать новичку?
                  </div>
                </div>
                <div className="flex gap-3 flex-row-reverse">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-violet-500/20">
                    <Sparkles size={14} className="text-violet-400" />
                  </div>
                  <div className="rounded-2xl rounded-tr-sm bg-emerald-500 px-4 py-2.5 text-sm text-black">
                    Начни с Cursor — он прощает ошибки новичка.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {features.slice(1).map((f) => (
            <Link key={f.title} href={f.href} className="glass-card p-6 glow-border group">
              <f.icon className="text-emerald-400 mb-4 group-hover:scale-110 transition-transform" size={24} />
              <h3 className="font-semibold text-lg">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {f.desc}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
