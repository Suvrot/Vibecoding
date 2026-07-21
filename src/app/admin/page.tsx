import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Eye, FolderGit2, TrendingUp } from "lucide-react";
import { AdminUsers } from "@/components/admin/admin-users";
import { AdminExport } from "@/components/admin/admin-export";
import {
  getCachedAdminStats,
  getCachedAdminUsers,
  getCachedAdminTopPages,
  getCachedAdminActiveUsers,
} from "@/lib/data/admin";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Админ-панель — VibeCode",
};

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || !process.env.ADMIN_EMAIL || user.email !== process.env.ADMIN_EMAIL) {
    redirect("/");
  }

  const [stats, profileList, topPagesSorted, activeList] = await Promise.all([
    getCachedAdminStats(),
    getCachedAdminUsers(),
    getCachedAdminTopPages(),
    getCachedAdminActiveUsers(),
  ]);

  return (
    <div className="container mx-auto px-4 lg:px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Админ-панель</h1>
          <p className="text-muted-foreground">Статистика платформы VibeCode</p>
        </div>
        <AdminExport users={profileList} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardContent className="p-5">
            <Users className="text-emerald-400 mb-2" size={20} />
            <p className="text-sm text-muted-foreground">Всего пользователей</p>
            <p className="text-2xl font-bold">{stats.totalUsers}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <Eye className="text-emerald-400 mb-2" size={20} />
            <p className="text-sm text-muted-foreground">Просмотров сегодня</p>
            <p className="text-2xl font-bold">{stats.todayViews}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <TrendingUp className="text-emerald-400 mb-2" size={20} />
            <p className="text-sm text-muted-foreground">Просмотров за неделю</p>
            <p className="text-2xl font-bold">{stats.weekViews}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <FolderGit2 className="text-emerald-400 mb-2" size={20} />
            <p className="text-sm text-muted-foreground">Проектов создано</p>
            <p className="text-2xl font-bold">{stats.totalProjects}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Популярные страницы (7 дней)</CardTitle>
          </CardHeader>
          <CardContent>
            {topPagesSorted.length === 0 ? (
              <p className="text-sm text-muted-foreground">Нет данных</p>
            ) : (
              <div className="space-y-2">
                {topPagesSorted.map(([page, count]) => (
                  <div key={page} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{page}</span>
                    <span className="font-mono font-medium">{count}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Активные ученики ({activeList.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {activeList.length === 0 ? (
              <p className="text-sm text-muted-foreground">Пока нет активных</p>
            ) : (
              <div className="space-y-2">
                {activeList.slice(0, 8).map((u) => (
                  <div key={u.id} className="flex items-center justify-between text-sm">
                    <span>{u.username} <span className="text-muted-foreground">({u.email})</span></span>
                    <span className="font-mono text-emerald-400">{(u.completed_lessons ?? []).length} уроков</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <AdminUsers users={profileList} />
    </div>
  );
}
