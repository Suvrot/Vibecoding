"use client";

import * as React from "react";
import { createClient } from "@/lib/supabase/client";
import { LessonView } from "@/components/learn/lesson-view";
import type { Lesson } from "@/lib/types";

export function CompleteLesson({ lesson }: { lesson: Lesson }) {
  async function onComplete() {
    const supabase = createClient();
    if (!supabase) return;

    const res = await fetch("/api/complete-lesson", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lessonId: lesson.id }),
    });

    if (!res.ok) {
      console.error("Failed to complete lesson");
    }
  }

  return <LessonView lesson={lesson} onComplete={onComplete} />;
}
