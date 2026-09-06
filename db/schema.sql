-- Bison data model. Applied idempotently by api/_db.js on first request; also runnable by hand:
--   psql "$DATABASE_URL" -f db/schema.sql
create table if not exists leads (
  id          bigserial primary key,
  email       text not null,
  source      text not null,
  context     jsonb not null default '{}'::jsonb,
  created_at  timestamptz not null default now()
);
create index if not exists leads_email_idx on leads (email);

create table if not exists contacts (
  id          bigserial primary key,
  name        text not null,
  email       text not null,
  company     text,
  interest    text,
  message     text,
  created_at  timestamptz not null default now()
);

create table if not exists specs (
  id          text primary key,
  title       text,
  yaml        text not null,
  lint        jsonb,
  sss         numeric(5,1),
  form        jsonb,
  created_at  timestamptz not null default now()
);

-- Anonymous readiness submissions feed the public benchmark (data flywheel).
create table if not exists readiness (
  id          bigserial primary key,
  total       smallint not null check (total between 0 and 100),
  dims        jsonb not null,
  answers     smallint[] not null,
  created_at  timestamptz not null default now()
);
alter table specs add column if not exists form jsonb;
