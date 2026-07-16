import Link from "next/link";
import { ArrowRight, Bot, Rocket, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/[0.06]">
      <div className="bg-hero-gradient absolute inset-0" />
      <div className="bg-grid absolute inset-0" />

      <div className="relative container mx-auto px-4 lg:px-6 py-20 lg:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-1.5 text-sm text-muted-foreground surface-blur">
            <Sparkles size={14} className="text-emerald-400" /> Vibe Coding — новый подход к разработке
          </span>

          <h1 className="display-1 mt-8">
            Учись <span className="gradient-text">кодить с ИИ</span>
            <br />и зарабатывай на навыке
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
            Описывай идеи словами — ИИ пишет код. Проведём от первого промпта
            до первых денег за 6 шагов.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/learn">
              <Button variant="gradient" size="lg">
                Начать бесплатно <ArrowRight size={18} />
              </Button>
            </Link>
            <Link href="/#program">
              <Button variant="outline" size="lg">
                Смотреть программу
              </Button>
            </Link>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            Старт в любой момент · темп свободный · доступ навсегда
          </p>
        </div>

        <div className="mt-16 lg:mt-20 max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="glass-card p-6 animate-float">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-emerald-500/10 text-emerald-400 mb-4">
              <Bot size={20} />
            </div>
            <h3 className="font-semibold text-foreground">ИИ-наставник 24/7</h3>
            <p className="mt-2 text-sm text-muted-foreground">Ответы мгновенно, без ожидания</p>
          </div>

          <div className="glass-card p-6 animate-float" style={{ animationDelay: "1s" }}>
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-emerald-500/10 text-emerald-400 mb-4">
              <Rocket size={20} />
            </div>
            <h3 className="font-semibold text-foreground">6 этапов до заказа</h3>
            <p className="mt-2 text-sm text-muted-foreground">От нуля до первых денег</p>
          </div>

          <div className="glass-card p-6 sm:col-span-2">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">Прогресс обучения</span>
              <span className="text-sm font-semibold text-emerald-400">12 уроков</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.06]">
              <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500" />
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Теория → Практика → Тест. Проходи в своём темпе.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
