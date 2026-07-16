-- VibeCode platform schema for Supabase (Postgres)
-- Run this in Supabase SQL Editor or via Supabase CLI.

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

create policy "Public profiles readable"
  on public.profiles for select
  using (true);

create policy "Users update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

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

create policy "Projects readable by all"
  on public.projects for select
  using (true);

create policy "Owner manages own projects"
  on public.projects for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

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
