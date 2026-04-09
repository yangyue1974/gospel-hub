/**
 * Utility script for Cloud Scheduled Tasks to add albums, singles, and concerts.
 * Usage: Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY env vars, then:
 *   npx tsx add-releases.ts
 *
 * The script reads from stdin (JSON array) or can be imported as a module.
 */
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const COVERS_BUCKET = "album-covers";

// Upload a cover image from URL to Supabase Storage, returns public URL
export async function uploadCover(imageUrl: string, slug: string): Promise<string | null> {
  try {
    // Ensure bucket exists
    const { data: buckets } = await supabase.storage.listBuckets();
    if (!buckets?.some((b) => b.name === COVERS_BUCKET)) {
      await supabase.storage.createBucket(COVERS_BUCKET, { public: true });
    }

    const res = await fetch(imageUrl);
    if (!res.ok) return null;

    const buffer = Buffer.from(await res.arrayBuffer());
    const contentType = res.headers.get("content-type") || "image/jpeg";
    const ext = contentType.includes("png") ? ".png" : contentType.includes("webp") ? ".webp" : ".jpg";
    const path = `${slug}${ext}`;

    await supabase.storage.from(COVERS_BUCKET).upload(path, buffer, { contentType, upsert: true });

    const { data } = supabase.storage.from(COVERS_BUCKET).getPublicUrl(path);
    return data.publicUrl;
  } catch {
    return null;
  }
}

export async function getArtistId(name: string): Promise<string | null> {
  const { data } = await supabase
    .from("artists")
    .select("id")
    .eq("name", name)
    .limit(1)
    .single();
  return data?.id ?? null;
}

export async function addAlbum(artistName: string, album: {
  title: string;
  release_date?: string;
  cover_url?: string;
  url_apple_music?: string;
  url_spotify?: string;
  is_new?: boolean;
}) {
  const artistId = await getArtistId(artistName);
  if (!artistId) {
    console.error(`Artist not found: ${artistName}`);
    return false;
  }

  // Check for duplicates
  const { data: existing } = await supabase
    .from("albums")
    .select("id")
    .eq("artist_id", artistId)
    .eq("title", album.title)
    .limit(1);

  if (existing && existing.length > 0) {
    console.log(`  Skipped (exists): ${artistName} - ${album.title}`);
    return false;
  }

  // If cover_url is an external URL, upload to Supabase Storage
  let finalCoverUrl = album.cover_url || null;
  if (finalCoverUrl && !finalCoverUrl.includes("supabase.co")) {
    const slug = `${artistName}-${album.title}`.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");
    const uploaded = await uploadCover(finalCoverUrl, slug);
    if (uploaded) {
      finalCoverUrl = uploaded;
      console.log(`    Cover uploaded: ${slug}`);
    }
  }

  const { error } = await supabase.from("albums").insert({
    artist_id: artistId,
    title: album.title,
    release_date: album.release_date || null,
    cover_url: finalCoverUrl,
    url_apple_music: album.url_apple_music || null,
    url_spotify: album.url_spotify || null,
    is_new: album.is_new ?? false,
  });

  if (error) {
    console.error(`  Error: ${artistName} - ${album.title}: ${error.message}`);
    return false;
  }
  console.log(`  Added album: ${artistName} - ${album.title}`);
  return true;
}

export async function addSingle(artistName: string, single: {
  title: string;
  release_date?: string;
  url_apple_music?: string;
  url_spotify?: string;
  url_youtube?: string;
  is_new?: boolean;
}) {
  const artistId = await getArtistId(artistName);
  if (!artistId) {
    console.error(`Artist not found: ${artistName}`);
    return false;
  }

  const { data: existing } = await supabase
    .from("singles")
    .select("id")
    .eq("artist_id", artistId)
    .eq("title", single.title)
    .limit(1);

  if (existing && existing.length > 0) {
    console.log(`  Skipped (exists): ${artistName} - ${single.title}`);
    return false;
  }

  const { error } = await supabase.from("singles").insert({
    artist_id: artistId,
    title: single.title,
    release_date: single.release_date || null,
    url_apple_music: single.url_apple_music || null,
    url_spotify: single.url_spotify || null,
    url_youtube: single.url_youtube || null,
    is_new: single.is_new ?? false,
  });

  if (error) {
    console.error(`  Error: ${artistName} - ${single.title}: ${error.message}`);
    return false;
  }
  console.log(`  Added single: ${artistName} - ${single.title}`);
  return true;
}

export async function addConcert(artistName: string, concert: {
  title?: string;
  venue?: string;
  city?: string;
  country?: string;
  event_date?: string;
  url_tickets?: string;
  url_info?: string;
}) {
  const artistId = await getArtistId(artistName);
  if (!artistId) {
    console.error(`Artist not found: ${artistName}`);
    return false;
  }

  // Check for duplicates by artist + date + venue
  if (concert.event_date && concert.venue) {
    const { data: existing } = await supabase
      .from("concerts")
      .select("id")
      .eq("artist_id", artistId)
      .eq("event_date", concert.event_date)
      .eq("venue", concert.venue)
      .limit(1);

    if (existing && existing.length > 0) {
      console.log(`  Skipped (exists): ${artistName} - ${concert.venue} on ${concert.event_date}`);
      return false;
    }
  }

  const { error } = await supabase.from("concerts").insert({
    artist_id: artistId,
    title: concert.title || null,
    venue: concert.venue || null,
    city: concert.city || null,
    country: concert.country || null,
    event_date: concert.event_date || null,
    url_tickets: concert.url_tickets || null,
    url_info: concert.url_info || null,
  });

  if (error) {
    console.error(`  Error: ${artistName} concert: ${error.message}`);
    return false;
  }
  console.log(`  Added concert: ${artistName} - ${concert.title || concert.venue} (${concert.event_date})`);
  return true;
}

// List all artist names for reference
export async function listArtists() {
  const { data } = await supabase
    .from("artists")
    .select("name")
    .eq("status", "published")
    .order("name");
  return data?.map((a) => a.name) ?? [];
}
