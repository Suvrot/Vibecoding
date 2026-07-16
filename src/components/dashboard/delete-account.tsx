"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function DeleteAccount() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  async function handleDelete() {
    setLoading(true);
    const res = await fetch("/api/delete-account", { method: "POST" });
    if (res.ok) {
      const supabase = createClient();
      await supabase?.auth.signOut();
      router.push("/");
    }
    setLoading(false);
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger className="text-sm text-red-400 hover:text-red-300 transition-colors underline-offset-4 hover:underline">
        Удалить аккаунт
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Удалить аккаунт?</AlertDialogTitle>
          <AlertDialogDescription>
            Это действие необратимо. Все твои данные, проекты и прогресс будут
            удалены навсегда.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Отмена</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700"
          >
            {loading ? "Удаляю…" : "Да, удалить"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
