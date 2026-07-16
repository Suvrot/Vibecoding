import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { modules } from "@/lib/data/modules";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Уроки — VibeCode",
  description: "Пошаговые уроки Vibe Coding с практикой и тестами.",
};

export default function LearnPage() {
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
              {m.lessons.map((l) => (
                <Link key={l.id} href={`/learn/${l.id}`}>
                  <Card className="hover:border-emerald-500/30 transition-all">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div>
                        <p className="font-medium">{l.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {l.summary}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <Badge variant="outline" className="hidden sm:flex">
                          <Clock size={12} /> {l.durationMin}м
                        </Badge>
                        <Badge variant="accent">{l.xp} XP</Badge>
                        <ArrowRight size={16} className="text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
