-- Seed tables for our database --
create table
profiles (
  user_id uuid,
  name text,
  email text,
  created_at timestamptz default now(),
  primary key (user_id)
);

create table
tracks (
  id uuid default uuid_generate_v4(),
  user_id uuid,
  comment text,
  rating int,
  learned_thing text,
  created_at timestamptz default now(),
  primary key (id)
);
