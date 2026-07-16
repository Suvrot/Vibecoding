"use client";

/* eslint-disable react-hooks/set-state-in-effect */
import * as React from "react";
import Link from "next/link";
import { User, LogOut, Shield } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { adminEmail } from "@/lib/data/nav";

export function AuthButton() {
  const [user, setUser] = React.useState<{ email?: string } | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const supabase = createClient();
    if (!supabase) {
      setLoading(false);
      return;
    }
    supabase.auth.getUser().then((res: { data: { user: { email?: string } | null } }) => {
      setUser(res.data.user ? { email: res.data.user.email } : null);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange(
      (_e: string, session: { user: { email?: string } | null } | null) => {
      setUser(session?.user ? { email: session.user.email } : null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div className="h-9 w-20 animate-pulse rounded-lg bg-white/[0.06]" />;
  }

  const isAdmin = user?.email === adminEmail;

  if (user) {
    return (
      <div className="flex items-center gap-2">
        {isAdmin && (
          <Link href="/admin">
            <Button variant="ghost" size="sm">
              <Shield size={16} /> Админ
            </Button>
          </Link>
        )}
        <Link href="/dashboard">
          <Button variant="outline" size="sm">
            <User size={16} /> Кабинет
          </Button>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Выйти"
          onClick={async () => {
            await createClient()?.auth.signOut();
          }}
        >
          <LogOut size={16} />
        </Button>
      </div>
    );
  }

  return (
    <Link href="/login">
      <Button size="sm" variant="gradient">
        Войти
      </Button>
    </Link>
  );
}
