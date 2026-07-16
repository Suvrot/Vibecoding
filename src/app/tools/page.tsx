"use client";

import * as React from "react";
import { ExternalLink, Search } from "lucide-react";
import { tools } from "@/lib/data/tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const categories = ["Все", "IDE", "Builder", "Assistant"] as const;

export default function ToolsPage() {
  const [cat, setCat] = React.useState<(typeof categories)[number]>("Все");
  const [q, setQ] = React.useState("");

  const filtered = tools.filter((t) => {
    const matchCat = cat === "Все" || t.category === cat;
    const matchQ =
      q === "" ||
      t.name.toLowerCase().includes(q.toLowerCase()) ||
      t.description.toLowerCase().includes(q.toLowerCase()) ||
      t.tags.some((tag) => tag.toLowerCase().includes(q.toLowerCase()));
    return matchCat && matchQ;
  });

  return (
    <div className="container mx-auto px-4 lg:px-6 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold">Каталог AI-инструментов</h1>
        <p className="mt-2 text-muted-foreground max-w-xl mx-auto">
          Лучшие помощники для Vibe Coding — от редакторов до no-code билдеров.
        </p>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-3 justify-center">
        <div className="relative max-w-xs">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            placeholder="Поиск инструмента…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {categories.map((c) => (
          <Button
            key={c}
            size="sm"
            variant={cat === c ? "default" : "outline"}
            onClick={() => setCat(c)}
          >
            {c}
          </Button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((t) => (
          <Card key={t.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">{t.name}</CardTitle>
                <Badge
                  variant={t.category === "Builder" ? "accent" : "outline"}
                >
                  {t.category}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-3">
              <p className="text-sm text-muted-foreground">{t.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {t.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="mt-auto space-y-2 pt-2">
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">Для: </span>
                  {t.bestFor}
                </p>
                <p className="text-xs">
                  <span className="font-medium">Цена: </span>
                  {t.pricing}
                </p>
                <a href={t.url} target="_blank" rel="noreferrer">
                  <Button variant="secondary" size="sm" className="w-full">
                    Открыть <ExternalLink size={14} />
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
