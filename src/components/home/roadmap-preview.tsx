import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { modules } from "@/lib/data/modules";

const icons = ["🌱", "✍️", "🚀", "💸", "🗄️", "🌐"];

export function RoadmapPreview() {
  return (
    <section className="border-t border-white/[0.06]">
      <div className="container mx-auto px-4 lg:px-6 section-padding">
        <div className="text-center mb-12 lg:mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
            Дорожная карта
          </span>
          <h2 className="display-2 mt-3">Шесть шагов к первым деньгам</h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Каждый этап даёт навык и XP. Проходите по порядку — от идеи до
            поддержки клиентов.
          </p>
          <Link
            href="/roadmap"
            className="mt-4 inline-flex items-center gap-2 text-emerald-400 font-medium hover:underline"
          >
            Полная карта <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {modules.map((m, i) => (
              <div
                key={m.id}
                className="glass-card p-5 group"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-3xl">{icons[i] ?? "✦"}</span>
                  <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                    Этап {i + 1}
                  </span>
                </div>
                <h3 className="font-semibold text-lg leading-tight group-hover:text-emerald-400 transition-colors">
                  {m.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {m.subtitle}
                </p>
                <p className="mt-3 text-xs text-muted-foreground">
                  {m.lessons.length} урока ·{" "}
                  {m.lessons.reduce((s, l) => s + l.xp, 0)} XP
                </p>
              </div>
          ))}
        </div>
      </div>
    </section>
  );
}
