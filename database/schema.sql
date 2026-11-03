create extension if not exists pgcrypto;
create table wedding_config (id int primary key default 1, data jsonb not null, check (id=1));
create table guests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null, email text, phone text,
  token text not null unique default encode(gen_random_bytes(24),'hex'),
  allocation int not null default 1 check (allocation between 1 and 20),
  status text not null default 'invited' check (status in ('invited','responded','revoked')),
  created_at timestamptz default now());
create table rsvps (
  id uuid primary key default gen_random_uuid(),
  guest_id uuid not null unique references guests(id) on delete cascade, -- unique = no duplicates
  attending boolean not null, attendees int not null default 0 check (attendees >= 0),
  message text, dietary text, submitted_at timestamptz default now());
-- RLS on, NO public policies: all access goes through server routes using the service role.
alter table wedding_config enable row level security;
alter table guests enable row level security;
alter table rsvps enable row level security;
create policy "public read config" on wedding_config for select using (true);
