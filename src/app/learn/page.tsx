import Link from "next/link";
import { ArrowRight, Clock, CheckCircle2 } from "lucide-react";
import { modules } from "@/lib/data/modules";
import { getProfile } from "@/lib/data/profile";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Уроки — VibeCode",
  description: "Пошаговые уроки Vibe Coding с практикой и тестами.",
};

export default async function LearnPage() {
  const profile = await getProfile();
  const completed = new Set(profile?.completedLessons ?? []);

  return (
    <div className="container mx-auto px-4 lg:px-6 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold">Уроки по Vibe Coding</h1>
        <p className="mt-2 text-muted-foreground max-w-xl mx-auto">
          Каждый урок: теория → практика → тест. Проходите в своём темпе.
        </p>
      </div>

      <div className="space-y-8 max-w-3xl mx-auto">
        {modules.map((m) => (
          <div key={m.id}>
            <h2 className="text-xl font-semibold mb-3">{m.title}</h2>
            <div className="grid gap-3">
              {m.lessons.map((l) => {
                const isDone = completed.has(l.id);
                return (
                  <Link key={l.id} href={`/learn/${l.id}`}>
                    <Card className={`hover:border-emerald-500/30 transition-all ${isDone ? "border-emerald-500/20" : ""}`}>
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {isDone && (
                            <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                          )}
                          <div>
                            <p className={`font-medium ${isDone ? "text-emerald-400" : ""}`}>
                              {l.title}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {l.summary}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <Badge variant="outline" className="hidden sm:flex">
                            <Clock size={12} /> {l.durationMin}м
                          </Badge>
                          {isDone ? (
                            <Badge variant="success">Пройдено</Badge>
                          ) : (
                            <Badge variant="accent">{l.xp} XP</Badge>
                          )}
                          <ArrowRight size={16} className="text-muted-foreground" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
