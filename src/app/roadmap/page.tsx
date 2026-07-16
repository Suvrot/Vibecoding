import Link from "next/link";
import { Circle, CheckCircle2, ArrowRight } from "lucide-react";
import { modules } from "@/lib/data/modules";
import { getProfile } from "@/lib/data/profile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const icons = ["🌱", "✍️", "🚀", "💸", "🗄️", "🌐"];

export const metadata = {
  title: "Дорожная карта — VibeCode",
  description: "Полный путь обучения Vibe Coding от новичка до первых денег.",
};

export default async function RoadmapPage() {
  const profile = await getProfile();
  const completed = new Set(profile?.completedLessons ?? []);

  return (
    <div className="container mx-auto px-4 lg:px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold">Дорожная карта</h1>
        <p className="mt-2 text-muted-foreground max-w-xl mx-auto">
          Чёткий путь из 6 этапов. Проходите по порядку — каждый шаг даёт
          навык и XP.
        </p>
      </div>

      <div className="relative space-y-6 max-w-3xl mx-auto">
        {modules.map((m, i) => (
          <div key={m.id} className="relative pl-12">
            <div className="absolute left-3 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 text-black text-sm font-bold">
              {i + 1}
            </div>
            {i < modules.length - 1 && (
              <div className="absolute left-[26px] top-10 h-[calc(100%+1rem)] w-px bg-white/[0.08]" />
            )}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{icons[i] ?? "✦"}</span>
                  <div>
                    <CardTitle>{m.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {m.subtitle}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {m.lessons.map((l) => {
                  const isDone = completed.has(l.id);
                  return (
                    <Link
                      key={l.id}
                      href={`/learn/${l.id}`}
                      className="flex items-center justify-between rounded-lg bg-white/[0.03] border border-white/[0.06] p-3 hover:border-emerald-500/30 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        {isDone ? (
                          <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                        ) : (
                          <Circle size={16} className="text-muted-foreground" />
                        )}
                        <span className={`font-medium ${isDone ? "text-emerald-400" : ""}`}>
                          {l.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {isDone ? (
                          <Badge variant="success">Пройдено</Badge>
                        ) : (
                          <Badge variant="outline">{l.xp} XP</Badge>
                        )}
                        <ArrowRight size={14} className="text-muted-foreground" />
                      </div>
                    </Link>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link href="/learn">
          <span className="inline-flex items-center gap-2 text-emerald-400 font-medium hover:underline">
            Открыть все уроки <ArrowRight size={16} />
          </span>
        </Link>
      </div>
    </div>
  );
}
