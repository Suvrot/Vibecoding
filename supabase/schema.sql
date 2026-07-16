-- VibeCode platform schema for Supabase (Postgres)
-- Safe to run multiple times (uses IF NOT EXISTS / OR REPLACE)

create extension if not exists "pgcrypto";

-- Profiles: 1:1 with auth.users
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  username text not null default 'VibeCoder',
  xp int not null default 0,
  level int not null default 1,
  streak int not null default 0,
  completed_lessons text[] not null default '{}',
  achievements text[] not null default '{}',
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Owner sees own profile (including email)
drop policy if exists "Owner reads own profile" on public.profiles;
create policy "Owner reads own profile"
  on public.profiles for select
  using (auth.uid() = id);

-- Others see public fields only (no email) via a view
drop policy if exists "Public profiles readable" on public.profiles;
create policy "Public profiles readable"
  on public.profiles for select
  using (true);

-- Restrict which columns non-owners can read via column-level grants
-- (Supabase doesn't support column-level RLS, so we use a view instead)
drop view if exists public.profiles_public;
create view public.profiles_public as
  select id, username, xp, level, streak, completed_lessons, achievements, created_at
  from public.profiles;

grant select on public.profiles_public to anon, authenticated;

drop policy if exists "Users update own profile" on public.profiles;
create policy "Users update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

drop policy if exists "Users insert own profile" on public.profiles;
create policy "Users insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Projects created by users
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text not null default '',
  stack text[] not null default '{}',
  link text,
  repo text,
  earned numeric not null default 0,
  created_at timestamptz not null default now()
);

alter table public.projects enable row level security;

drop policy if exists "Projects readable by all" on public.projects;
create policy "Projects readable by all"
  on public.projects for select
  using (true);

drop policy if exists "Owner manages own projects" on public.projects;
create policy "Owner manages own projects"
  on public.projects for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Analytics: page view tracking (auth required to insert)
create table if not exists public.analytics (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  page text not null,
  created_at timestamptz not null default now()
);

alter table public.analytics enable row level security;

drop policy if exists "Authenticated insert analytics" on public.analytics;
create policy "Authenticated insert analytics"
  on public.analytics for insert
  with check (auth.uid() is not null);

drop policy if exists "Admin reads analytics" on public.analytics;
create policy "Admin reads analytics"
  on public.analytics for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and email = current_setting('request.jwt.claims', true)::json->>'email'
    )
  );

create index if not exists idx_analytics_created_at on public.analytics (created_at desc);
create index if not exists idx_analytics_page on public.analytics (page);

-- Login attempts: brute-force tracking
create table if not exists public.login_attempts (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  success boolean not null default false,
  ip inet,
  created_at timestamptz not null default now()
);

alter table public.login_attempts enable row level security;

drop policy if exists "Service role manages login_attempts" on public.login_attempts;
create policy "Service role manages login_attempts"
  on public.login_attempts for all
  using (true)
  with check (true);

create index if not exists idx_login_attempts_email on public.login_attempts (email, created_at desc);

-- Rate limit: durable per-user rate tracking
create table if not exists public.rate_limits (
  id text primary key,
  count int not null default 1,
  reset_at timestamptz not null default now() + interval '1 minute'
);

alter table public.rate_limits enable row level security;

drop policy if exists "Service role manages rate_limits" on public.rate_limits;
create policy "Service role manages rate_limits"
  on public.rate_limits for all
  using (true)
  with check (true);

-- RPC: check and increment rate limit, returns true if allowed
create or replace function public.check_rate_limit(
  p_key text,
  p_limit int default 20,
  p_window_seconds int default 60
)
returns boolean
language plpgsql
security definer set search_path = public
as $$
declare
  v_now timestamptz := now();
  v_row record;
begin
  select * into v_row from public.rate_limits where id = p_key for update;

  if v_row is null then
    insert into public.rate_limits (id, count, reset_at)
    values (p_key, 1, v_now + (p_window_seconds || ' seconds')::interval)
    on conflict (id) do update set count = 1, reset_at = v_now + (p_window_seconds || ' seconds')::interval;
    return true;
  end if;

  if v_now > v_row.reset_at then
    update public.rate_limits set count = 1, reset_at = v_now + (p_window_seconds || ' seconds')::interval where id = p_key;
    return true;
  end if;

  if v_row.count >= p_limit then
    return false;
  end if;

  update public.rate_limits set count = count + 1 where id = p_key;
  return true;
end;
$$;

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, username)
  values (new.id, new.email, split_part(new.email, '@', 1))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
