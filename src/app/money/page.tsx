import Link from "next/link";
import {
  Users,
  Briefcase,
  FolderGit2,
  MessageCircle,
  Target,
  DollarSign,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Первые деньги — VibeCode",
  description:
    "Где искать клиентов и как собрать портфолио, которое продаёт. Путь к первому заработку.",
};

const clientSources = [
  {
    icon: Users,
    title: "Знакомые и рефералы",
    desc: "Расскажи 10 знакомым, что делаешь сайты и ботов. Половина знает кого-то, кому нужно.",
  },
  {
    icon: MessageCircle,
    title: "Соцсети и чаты",
    desc: "Telegram-каналы для бизнеса, локальные группы. Показывай процесс, а не только результат.",
  },
  {
    icon: Briefcase,
    title: "Фриланс-биржи",
    desc: "Kwork, FL.ru для первых заказов. Бери маленькие задачи, набивай рейтинг.",
  },
  {
    icon: Target,
    title: "Локальный бизнес",
    desc: "Кофейни, салоны, мастера без сайта. Предложи лендинг за фиксированную цену.",
  },
];

const portfolioSteps = [
  "3 рабочих проекта лучше 20 брошенных",
  "Для каждого: проблема → решение → результат",
  "Живая ссылка обязательна (Vercel/Netlify)",
  "Добавь стек и короткое описание процесса",
  "Покажи до/после, если переделывал",
];

export default function MoneyPage() {
  return (
    <div className="container mx-auto px-4 lg:px-6 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold">Первые деньги</h1>
        <p className="mt-2 text-muted-foreground max-w-xl mx-auto">
          Навык Vibe Coding можно монетизировать быстрее, чем кажется. Вот
          практичный путь.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 mb-10">
        <Card className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/5">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <DollarSign className="text-emerald-400" size={24} />
              <h2 className="text-xl font-semibold">Реалистичный путь</h2>
            </div>
            <ol className="space-y-3 text-sm">
              {[
                "Неделя 1-2: 2-3 учебных проекта в портфолио",
                "Неделя 3: первый бесплатный/символический заказ для отзыва",
                "Неделя 4-6: платные микро-заказы (лендинг, бот)",
                "Месяц 2+: повторяющиеся клиенты и рефералы",
              ].map((s, i) => (
                <li key={i} className="flex gap-3">
                  <Badge variant="accent">{i + 1}</Badge>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <FolderGit2 className="text-emerald-400" size={24} />
              <h2 className="text-xl font-semibold">Портфолио, которое продаёт</h2>
            </div>
            <ul className="space-y-2 text-sm">
              {portfolioSteps.map((s, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-emerald-400">✓</span> {s}
                </li>
              ))}
            </ul>
            <Link href="/projects" className="mt-4 block">
              <Button variant="outline" size="sm" className="w-full">
                Заполнить свои проекты
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-bold text-center mb-6">
        Где искать первых клиентов
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {clientSources.map((c) => (
          <Card key={c.title} className="h-full">
            <CardContent className="p-5">
              <c.icon className="text-emerald-400 mb-3" size={22} />
              <h3 className="font-semibold">{c.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-10">
        <CardHeader>
          <CardTitle>Шаблон первого предложения</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="whitespace-pre-wrap text-sm leading-relaxed bg-white/[0.03] border border-white/[0.06] rounded-lg p-4">
{`Привет, [Имя]! Я делаю простые сайты и телеграм-ботов на ИИ за пару дней.
Заметил, что у [бизнес] нет удобного сайта — могу сделать лендинг с описанием услуг и формой записи.
Первый проект — по символической цене, чтобы получить отзыв. Интересно?`}
          </pre>
        </CardContent>
      </Card>

      <div className="mt-10 text-center">
        <Link href="/learn">
          <Button variant="gradient" size="lg">
            Подтянуть навыки в уроках
          </Button>
        </Link>
      </div>
    </div>
  );
}
