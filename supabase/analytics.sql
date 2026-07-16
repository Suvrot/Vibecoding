-- VibeCode analytics table
-- Run this in Supabase SQL Editor

create table if not exists public.analytics (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  page text not null,
  created_at timestamptz not null default now()
);

alter table public.analytics enable row level security;

create policy "Admins read analytics"
  on public.analytics for select
  using (true);

create policy "Anyone can insert analytics"
  on public.analytics for insert
  with check (true);

-- Index for fast queries
create index if not exists idx_analytics_created_at on public.analytics (created_at desc);
create index if not exists idx_analytics_page on public.analytics (page);
create index if not exists idx_analytics_user_id on public.analytics (user_id);
