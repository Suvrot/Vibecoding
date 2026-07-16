import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { modules } from "@/lib/data/modules";

const icons = ["🌱", "✍️", "🚀", "💸", "🗄️", "🌐"];

export function Program() {
  return (
    <section className="border-t border-white/[0.06]">
      <div className="container mx-auto px-4 lg:px-6 section-padding">
        <div className="text-center mb-12 lg:mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
            Программа
          </span>
          <h2 className="display-2 mt-3">6 модулей до первых денег</h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            От основ до деплоя и поиска клиентов. Каждый модуль — навык,
            который сразу применяешь на практике.
          </p>
          <Link
            href="/roadmap"
            className="mt-4 inline-flex items-center gap-2 text-emerald-400 font-medium hover:underline"
          >
            Вся дорожная карта <ArrowRight size={16} />
          </Link>
        </div>

        <div className="space-y-3 max-w-3xl mx-auto">
          {modules.map((m, i) => (
            <Link
              key={m.id}
              href={`/learn/${m.lessons[0].id}`}
              className="group glass-card flex gap-5 p-5 hover:border-emerald-500/30 transition-all"
            >
              <span className="text-3xl shrink-0">{icons[i] ?? "✦"}</span>
              <div className="flex-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                  Модуль {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-1 text-lg font-semibold group-hover:text-emerald-400 transition-colors">
                  {m.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {m.subtitle}
                </p>
              </div>
              <span className="self-center text-muted-foreground group-hover:text-emerald-400 transition-colors">
                <ArrowRight size={18} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
