import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

const hasEnv =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const protectedRoutes = ["/dashboard", "/projects", "/achievements"];
const adminRoutes = ["/admin"];
const adminEmail = process.env.ADMIN_EMAIL ?? "supermax44676@gmail.com";

export async function middleware(request: NextRequest) {
  if (!hasEnv) return NextResponse.next();

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const { data: { user } } = await supabase.auth.getUser().catch(() => ({ data: { user: null } }));

  const url = request.nextUrl.pathname;

  // Log page view (fire and forget, skip API/static assets)
  if (
    !url.startsWith("/api") &&
    !url.startsWith("/_next") &&
    !url.includes(".") &&
    url !== "/favicon.ico"
  ) {
    supabase.from("analytics").insert({
      user_id: user?.id ?? null,
      page: url,
    }).then(() => {}).catch(() => {});
  }

  // Protect admin routes
  if (adminRoutes.some((r) => url.startsWith(r))) {
    if (!user || user.email !== adminEmail) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Protect regular routes
  if (protectedRoutes.some((r) => url.startsWith(r))) {
    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
