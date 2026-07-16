import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const tiers = [
  {
    name: "Базовый",
    price: "0",
    period: "старт бесплатно",
    desc: "Попробуй Vibe Coding без вложений",
    features: [
      "Доступ к базовым урокам",
      "Генератор промптов",
      "Каталог инструментов",
      "ИИ-наставник (demo)",
    ],
    cta: "Начать бесплатно",
    href: "/learn",
    featured: false,
  },
  {
    name: "Продвинутый",
    price: "1 850",
    period: "₽/мес",
    desc: "Для тех, кто хочет первый заказ",
    features: [
      "Все уроки и модули",
      "Сохранение прогресса и проектов",
      "ИИ-наставник (полный)",
      "Достижения и уровни",
      "Шаблоны для поиска клиентов",
    ],
    cta: "Выбрать тариф",
    href: "/login",
    featured: true,
  },
  {
    name: "Премиальный",
    price: "2 650",
    period: "₽/мес",
    desc: "Максимум поддержки и практики",
    features: [
      "Всё из Продвинутого",
      "Разбор твоих проектов",
      "Приоритетная проверка",
      "Закрытые воркшопы",
      "Личный чек-лист заработка",
    ],
    cta: "Выбрать тариф",
    href: "/login",
    featured: false,
  },
];

export function Pricing() {
  return (
    <section className="border-t border-white/[0.06]">
      <div className="container mx-auto px-4 lg:px-6 section-padding">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
            Тарифы
          </span>
          <h2 className="display-2 mt-3">Выбери подходящий для себя</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={cn(
                "relative glass-card p-6 flex flex-col",
                t.featured
                  ? "border-emerald-500/30 shadow-lg shadow-emerald-500/5"
                  : "",
              )}
            >
              {t.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-500 px-3 py-1 text-xs font-medium text-black">
                  Популярный
                </span>
              )}
              <h3 className="text-lg font-semibold">{t.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
              <div className="mt-5 flex items-baseline gap-1">
                <span className="text-3xl font-bold">{t.price}</span>
                <span className="text-sm text-muted-foreground">
                  {t.period}
                </span>
              </div>
              <ul className="mt-5 space-y-2.5 flex-1">
                {t.features.map((f) => (
                  <li key={f} className="flex gap-2 text-sm">
                    <Check size={16} className="text-emerald-400 mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
              <Link href={t.href} className="mt-6">
                <Button
                  variant={t.featured ? "gradient" : "outline"}
                  className="w-full"
                >
                  {t.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
