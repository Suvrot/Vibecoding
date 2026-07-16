import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, Bot, Sparkles, Wallet } from "lucide-react";
import { getProfile, getProjects, requireUser } from "@/lib/data/profile";
import { StatsGrid } from "@/components/dashboard/stats";
import { DeleteAccount } from "@/components/dashboard/delete-account";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default async function DashboardPage() {
  const user = await requireUser();
  if (!user) redirect("/login");

  const profile = await getProfile();
  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p>Профиль создаётся… обновите страницу.</p>
      </div>
    );
  }

  const projects = await getProjects(user.id);

  const quickLinks = [
    { href: "/learn", icon: Sparkles, label: "Продолжить обучение", desc: "Уроки и тесты" },
    { href: "/mentor", icon: Bot, label: "Спросить наставника", desc: "ИИ-помощь 24/7" },
    { href: "/money", icon: Wallet, label: "Раздел «Первые деньги»", desc: "Клиенты и портфолио" },
  ];

  return (
    <div className="container mx-auto px-4 lg:px-6 py-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            Привет, {profile.username}
          </h1>
          <p className="text-muted-foreground">
            Вот твой прогресс в Vibe Coding
          </p>
        </div>

      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            {quickLinks.map((q) => (
              <Link key={q.href} href={q.href}>
                <Card className="h-full hover:border-emerald-500/30 transition-all">
                  <CardContent className="p-5">
                    <q.icon className="text-emerald-400 mb-3" size={22} />
                    <p className="font-medium">{q.label}</p>
                    <p className="text-xs text-muted-foreground">{q.desc}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle>Мои проекты</CardTitle>
              <Link href="/projects">
                <Button variant="ghost" size="sm">
                  Все <ArrowRight size={14} />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {projects.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Проектов пока нет.{" "}
                  <Link href="/projects" className="text-emerald-400 hover:underline">
                    Добавить первый
                  </Link>
                </p>
              ) : (
                <div className="space-y-3">
                  {projects.slice(0, 3).map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center justify-between rounded-lg bg-white/[0.03] border border-white/[0.06] p-3"
                    >
                      <div>
                        <p className="font-medium">{p.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {p.stack.join(", ")}
                        </p>
                      </div>
                      {p.earned > 0 && (
                        <Badge variant="success">{p.earned} $</Badge>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <StatsGrid profile={profile} />
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-white/[0.06]">
        <DeleteAccount />
      </div>
    </div>
  );
}
