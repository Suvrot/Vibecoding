"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export function DeleteProjectButton({ projectId }: { projectId: string }) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  async function handleDelete() {
    const ok = window.confirm("Удалить проект? Это действие необратимо.");
    if (!ok) return;

    setLoading(true);
    const res = await fetch("/api/delete-project", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: projectId }),
    });
    if (res.ok) {
      router.refresh();
    } else {
      alert("Не удалось удалить проект. Попробуй позже.");
    }
    setLoading(false);
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-red-400 hover:text-red-500 ml-auto disabled:opacity-50"
      aria-label="Удалить"
    >
      <Trash2 size={16} />
    </button>
  );
}
