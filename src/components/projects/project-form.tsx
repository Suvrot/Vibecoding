"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/input";

export function ProjectForm() {
  const router = useRouter();
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [stack, setStack] = React.useState("");
  const [link, setLink] = React.useState("");
  const [repo, setRepo] = React.useState("");
  const [earned, setEarned] = React.useState("");
  const [saving, setSaving] = React.useState(false);

  function isValidUrl(str: string) {
    try {
      const u = new URL(str);
      return u.protocol === "http:" || u.protocol === "https:";
    } catch {
      return false;
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    if (link && !isValidUrl(link)) {
      setSaving(false);
      return;
    }
    if (repo && !isValidUrl(repo)) {
      setSaving(false);
      return;
    }

    setSaving(true);
    const supabase = createClient();
    if (!supabase) {
      router.push("/login");
      return;
    }
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      router.push("/login");
      return;
    }
    await supabase.from("projects").insert({
      user_id: user.id,
      title,
      description,
      stack: stack
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      link: link || null,
      repo: repo || null,
      earned: Math.min(Number(earned) || 0, 99999),
    });
    setTitle("");
    setDescription("");
    setStack("");
    setLink("");
    setRepo("");
    setEarned("");
    setSaving(false);
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium mb-1 block">Название *</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            maxLength={100}
            placeholder="Мой первый сайт"
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">
            Стек (через запятую)
          </label>
          <Input
            value={stack}
            onChange={(e) => setStack(e.target.value)}
            placeholder="Next.js, Tailwind, Supabase"
          />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium mb-1 block">Описание *</label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          maxLength={500}
          placeholder="Что сделал и какой результат"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="text-sm font-medium mb-1 block">Ссылка</label>
          <Input
            value={link}
            onChange={(e) => setLink(e.target.value)}
            maxLength={200}
            placeholder="https://..."
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Репозиторий</label>
          <Input
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
            maxLength={200}
            placeholder="https://github.com/..."
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Заработано ($)</label>
          <Input
            type="number"
            value={earned}
            onChange={(e) => setEarned(e.target.value)}
            placeholder="0"
          />
        </div>
      </div>
      <Button type="submit" variant="gradient" disabled={saving}>
        <Plus size={16} /> {saving ? "Сохраняю…" : "Добавить проект"}
      </Button>
    </form>
  );
}
