import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { modules } from "@/lib/data/modules";
import { CompleteLesson } from "@/components/learn/complete-lesson";
import { Button } from "@/components/ui/button";

export function generateStaticParams() {
  return modules.flatMap((m) => m.lessons.map((l) => ({ id: l.id })));
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lesson = modules.flatMap((m) => m.lessons).find((l) => l.id === id);
  if (!lesson) notFound();

  return (
    <div className="container mx-auto px-4 lg:px-6 py-10 max-w-3xl">
      <Link href="/learn" className="inline-block mb-6">
        <Button variant="ghost" size="sm">
          <ArrowLeft size={16} /> К урокам
        </Button>
      </Link>
      <CompleteLesson lesson={lesson} />
    </div>
  );
}
