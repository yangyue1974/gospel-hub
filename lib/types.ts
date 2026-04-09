export type Artist = {
  id: string;
  name: string;
  type: "band" | "solo";
  founded_year: number | null;
  location: string | null;
  church_label: string | null;
  bio: string | null;
  style: string | null;
  awards: string | null;
  url_website: string | null;
  url_wiki: string | null;
  url_youtube: string | null;
  url_apple_music: string | null;
  url_spotify: string | null;
  photo_url: string | null;
  is_active: boolean;
  status: "draft" | "published";
  created_at: string;
  updated_at: string;
};

export type Member = {
  id: string;
  artist_id: string;
  person_artist_id: string | null;
  name: string;
  role: string | null;
  is_core: boolean;
  joined_year: number | null;
  left_year: number | null;
};

export type Album = {
  id: string;
  artist_id: string;
  title: string;
  release_date: string | null;
  cover_url: string | null;
  url_apple_music: string | null;
  url_spotify: string | null;
  is_new: boolean;
  created_at: string;
};

export type Single = {
  id: string;
  artist_id: string;
  title: string;
  release_date: string | null;
  url_apple_music: string | null;
  url_spotify: string | null;
  url_youtube: string | null;
  is_new: boolean;
  created_at: string;
};

export type Concert = {
  id: string;
  artist_id: string;
  title: string | null;
  venue: string | null;
  city: string | null;
  country: string | null;
  event_date: string | null;
  url_tickets: string | null;
  url_info: string | null;
  created_at: string;
};
