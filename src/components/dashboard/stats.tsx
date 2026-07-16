import { Trophy, Flame, CheckCircle2, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { levelForXp } from "@/lib/data/achievements";
import { formatXP } from "@/lib/utils";
import type { Profile } from "@/lib/types";

export function StatsGrid({ profile }: { profile: Profile }) {
  const { current, next, progress } = levelForXp(profile.xp);
  const totalLessons = 12;

  const items = [
    {
      icon: Trophy,
      label: "Уровень",
      value: `${current.icon} ${current.title}`,
      sub: `${profile.xp} XP`,
    },
    {
      icon: Flame,
      label: "Серия",
      value: `${profile.streak} дн.`,
      sub: profile.streak > 0 ? "Не пропускай день!" : "Начни сегодня",
    },
    {
      icon: CheckCircle2,
      label: "Уроки",
      value: `${(profile.completedLessons ?? []).length}/${totalLessons}`,
      sub: "пройдено",
    },
    {
      icon: Star,
      label: "Достижения",
      value: `${(profile.achievements ?? []).length}`,
      sub: "открыто",
    },
  ];

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold">
              {current.icon} {current.title}
            </span>
            <span className="text-sm text-muted-foreground">
              {formatXP(profile.xp)} XP
            </span>
          </div>
          <Progress value={progress} />
          <p className="mt-2 text-xs text-muted-foreground">
            {next
              ? `До уровня «${next.title}» осталось ${
                  next.xpReward - profile.xp
                } XP`
              : "Максимальный уровень достигнут!"}
          </p>
        </CardContent>
      </Card>
      <div className="grid grid-cols-2 gap-4">
        {items.slice(1).map((it) => (
          <Card key={it.label}>
            <CardContent className="p-4">
              <it.icon className="text-emerald-400 mb-2" size={20} />
              <p className="text-sm text-muted-foreground">{it.label}</p>
              <p className="text-lg font-semibold">{it.value}</p>
              <p className="text-xs text-muted-foreground">{it.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
