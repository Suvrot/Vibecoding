import Link from "next/link";
import { redirect } from "next/navigation";
import { ExternalLink, Code, Trash2, Plus } from "lucide-react";
import { requireUser, getProjects } from "@/lib/data/profile";
import { ProjectForm } from "@/components/projects/project-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const user = await requireUser();
  if (!user) redirect("/login");

  const projects = await getProjects(user.id);

  async function deleteProject(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    if (!user) return;
    const supabase = await createClient();
    await supabase.from("projects").delete().eq("id", id).eq("user_id", user.id);
  }

  return (
    <div className="container mx-auto px-4 lg:px-6 py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Мои проекты</h1>
        <p className="mt-2 text-muted-foreground">
          Портфолио — твоё главное оружие при поиске клиентов
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Plus size={16} /> Новый проект
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ProjectForm
            onAdded={() => {}}
          />
        </CardContent>
      </Card>

      {projects.length === 0 ? (
        <Card>
          <CardContent className="p-10 text-center text-muted-foreground">
            Проектов пока нет. Добавь первый сверху
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {projects.map((p) => (
            <Card key={p.id}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-lg">{p.title}</h3>
                  {p.earned > 0 && <Badge variant="success">{p.earned} $</Badge>}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {p.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <Badge key={s} variant="outline">
                      {s}
                    </Badge>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-3">
                  {p.link && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-400 hover:underline text-sm inline-flex items-center gap-1"
                    >
                      <ExternalLink size={14} /> Демо
                    </a>
                  )}
                  {p.repo && (
                    <a
                      href={p.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-400 hover:underline text-sm inline-flex items-center gap-1"
                    >
                      <Code size={14} /> Код
                    </a>
                  )}
                  <form action={deleteProject} className="ml-auto">
                    <input type="hidden" name="id" value={p.id} />
                    <button
                      type="submit"
                      className="text-red-400 hover:text-red-500"
                      aria-label="Удалить"
                    >
                      <Trash2 size={16} />
                    </button>
                  </form>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="mt-8 text-center">
        <Link href="/money">
          <Button variant="outline">Как монетизировать проекты →</Button>
        </Link>
      </div>
    </div>
  );
}
