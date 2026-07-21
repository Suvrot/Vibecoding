"use client";

import * as React from "react";
import { createClient } from "@/lib/supabase/client";
import { LessonView } from "@/components/learn/lesson-view";
import type { Lesson } from "@/lib/types";

export function CompleteLesson({ lesson }: { lesson: Lesson }) {
  const [completing, setCompleting] = React.useState(false);

  async function onComplete() {
    const supabase = createClient();
    if (!supabase) return;

    setCompleting(true);
    const res = await fetch("/api/complete-lesson", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lessonId: lesson.id }),
    });

    if (!res.ok) {
      console.error("Failed to complete lesson");
    }
    setCompleting(false);
  }

  return (
    <div className={completing ? "pointer-events-none opacity-60" : ""}>
      <LessonView lesson={lesson} onComplete={onComplete} />
    </div>
  );
}
