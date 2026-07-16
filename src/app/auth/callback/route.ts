import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const ALLOWED_HOSTS = [
  "vibe-coding-platform-psi-cyan-45.vercel.app",
  "localhost:3000",
];

function getSafeOrigin(requestUrl: string): string {
  const { origin } = new URL(requestUrl);
  const hostname = new URL(origin).hostname;
  if (ALLOWED_HOSTS.includes(hostname)) return origin;
  return `https://${ALLOWED_HOSTS[0]}`;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type");
  const safeOrigin = getSafeOrigin(request.url);

  const supabase = await createClient();

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${safeOrigin}/dashboard`);
    }
  }

  if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({
      type: type as "email" | "sms" | "magiclink",
      token: token_hash,
      email: searchParams.get("email") ?? "",
    });
    if (!error) {
      return NextResponse.redirect(`${safeOrigin}/dashboard`);
    }
  }

  return NextResponse.redirect(`${safeOrigin}/login`);
}
