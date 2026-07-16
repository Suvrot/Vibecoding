import { getProfile } from "@/lib/data/profile";
import { achievements } from "@/lib/data/achievements";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AchievementsPage() {
  const profile = await getProfile();
  if (!profile) redirect("/login");
  const earned = new Set(profile.achievements);

  return (
    <div className="container mx-auto px-4 lg:px-6 py-12 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Достижения</h1>
        <p className="mt-2 text-muted-foreground">
          Открыто {earned.size} из {achievements.length}
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {achievements.map((a) => {
          const got = earned.has(a.id);
          return (
            <Card
              key={a.id}
              className={got ? "border-emerald-500/30" : "opacity-50"}
            >
              <CardContent className="p-5 flex items-center gap-4">
                <span
                  className={`text-3xl ${got ? "" : "grayscale opacity-40"}`}
                >
                  {a.icon}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{a.title}</h3>
                    {got && <Badge variant="success">Получено</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {a.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
