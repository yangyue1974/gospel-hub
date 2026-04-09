-- Artists table
create table artists (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text check (type in ('band', 'solo')),
  founded_year integer,
  location text,
  church_label text,
  bio text,
  style text,
  awards text,
  url_website text,
  url_wiki text,
  url_youtube text,
  url_apple_music text,
  url_spotify text,
  photo_url text,
  is_active boolean default true,
  status text default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Members table (for bands)
create table members (
  id uuid primary key default gen_random_uuid(),
  artist_id uuid references artists(id) on delete cascade,
  person_artist_id uuid references artists(id) on delete set null,
  name text not null,
  role text,
  is_core boolean default true,
  joined_year integer,
  left_year integer
);

-- Albums table
create table albums (
  id uuid primary key default gen_random_uuid(),
  artist_id uuid references artists(id) on delete cascade,
  title text not null,
  release_date date,
  cover_url text,
  url_apple_music text,
  url_spotify text,
  is_new boolean default false,
  created_at timestamptz default now()
);

-- Singles table
create table singles (
  id uuid primary key default gen_random_uuid(),
  artist_id uuid references artists(id) on delete cascade,
  title text not null,
  release_date date,
  url_apple_music text,
  url_spotify text,
  url_youtube text,
  is_new boolean default false,
  created_at timestamptz default now()
);

-- Concerts table
create table concerts (
  id uuid primary key default gen_random_uuid(),
  artist_id uuid references artists(id) on delete cascade,
  title text,
  venue text,
  city text,
  country text,
  event_date date,
  url_tickets text,
  url_info text,
  created_at timestamptz default now()
);

-- Indexes
create index idx_artists_status on artists(status);
create index idx_artists_type on artists(type);
create index idx_albums_artist on albums(artist_id);
create index idx_albums_release on albums(release_date desc);
create index idx_singles_artist on singles(artist_id);
create index idx_singles_release on singles(release_date desc);
create index idx_concerts_artist on concerts(artist_id);
create index idx_concerts_date on concerts(event_date);
create index idx_members_artist on members(artist_id);

-- RLS policies
alter table artists enable row level security;
alter table members enable row level security;
alter table albums enable row level security;
alter table singles enable row level security;
alter table concerts enable row level security;

-- Public read for published content
create policy "Public can read published artists" on artists
  for select using (status = 'published');

create policy "Public can read members" on members
  for select using (
    exists (select 1 from artists where artists.id = members.artist_id and artists.status = 'published')
  );

create policy "Public can read albums" on albums
  for select using (
    exists (select 1 from artists where artists.id = albums.artist_id and artists.status = 'published')
  );

create policy "Public can read singles" on singles
  for select using (
    exists (select 1 from artists where artists.id = singles.artist_id and artists.status = 'published')
  );

create policy "Public can read future concerts" on concerts
  for select using (
    event_date >= current_date
    and exists (select 1 from artists where artists.id = concerts.artist_id and artists.status = 'published')
  );

-- Admin full access (authenticated users)
create policy "Admins can do everything with artists" on artists
  for all using (auth.role() = 'authenticated');

create policy "Admins can do everything with members" on members
  for all using (auth.role() = 'authenticated');

create policy "Admins can do everything with albums" on albums
  for all using (auth.role() = 'authenticated');

create policy "Admins can do everything with singles" on singles
  for all using (auth.role() = 'authenticated');

create policy "Admins can do everything with concerts" on concerts
  for all using (auth.role() = 'authenticated');

-- Updated_at trigger for artists
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger artists_updated_at
  before update on artists
  for each row execute function update_updated_at();
