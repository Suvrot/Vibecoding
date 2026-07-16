import Link from "next/link";
import { navLinks } from "@/lib/data/nav";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/[0.06] bg-surface">
      <div className="container mx-auto px-4 lg:px-6 py-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2.5 font-bold text-lg mb-3">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 text-black text-sm">
              V
            </span>
            <span className="text-foreground">VibeCode</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">
            Обучение Vibe Coding с нуля до первых денег. Собрано с ИИ, для людей.
          </p>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-foreground">
            Обучение
          </h4>
          <ul className="space-y-2.5 text-sm">
            {navLinks.slice(0, 4).map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-foreground">
            Инструменты
          </h4>
          <ul className="space-y-2.5 text-sm">
            {navLinks.slice(4).map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-foreground">
            Контакты
          </h4>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            <li>
              <a
                href="https://t.me/slimgorur67"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                Telegram
              </a>
            </li>
            <li>
              <Link
                href="/privacy"
                className="hover:text-foreground transition-colors"
              >
                Политика конфиденциальности
              </Link>
            </li>
            <li>
              <Link
                href="/oferta"
                className="hover:text-foreground transition-colors"
              >
                Договор оферты
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/[0.06] py-5">
        <div className="container mx-auto px-4 lg:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} VibeCode</span>
          <span>Сделано с ИИ, для людей</span>
        </div>
      </div>
    </footer>
  );
}
