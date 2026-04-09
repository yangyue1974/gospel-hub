import { addAlbum } from "./add-releases.ts";

async function seedNewReleases() {
  console.log("=== Adding recent gospel albums (Jan-Apr 2026) ===\n");

  await addAlbum("We The Kingdom", {
    title: "Dear Jesus",
    release_date: "2026-01-30",
    url_spotify: "https://open.spotify.com/album/0QiMDbTi1TJ8RGUKU11jZr",
    url_apple_music: "https://music.apple.com/us/album/dear-jesus/1849700774",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/e8/b3/72/e8b372ad-e0d8-5ddf-4de1-9f773538747b/25UM1IM73428.rgb.jpg/1200x630bb.jpg",
    is_new: true,
  });

  await addAlbum("Deitrick Haddon", {
    title: "Chain Breaker 2.5",
    release_date: "2026-01-30",
    url_spotify: null,
    url_apple_music: null,
    is_new: true,
  });

  await addAlbum("Maverick City Music", {
    title: "Instrumental Worship Collection",
    release_date: "2026-02-13",
    url_apple_music: "https://music.apple.com/us/album/instrumental-worship-collection/1873999963",
    is_new: true,
  });

  await addAlbum("Elevation Worship", {
    title: "SO BE IT (Live)",
    release_date: "2026-02-20",
    url_spotify: "https://open.spotify.com/album/6OF8Psf3BjjHnBIfUpOYHp",
    url_apple_music: "https://music.apple.com/us/album/so-be-it-live/1870678481",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/96/6c/7a/966c7a72-f91a-a766-ff1a-81eb9db4effd/196873921839.jpg/1200x630bb.jpg",
    is_new: true,
  });

  await addAlbum("Hillsong Worship", {
    title: "Great I AM",
    release_date: "2026-02-20",
    url_spotify: "https://open.spotify.com/album/7LaFsl3nY6e3xZblexnIo4",
    url_apple_music: "https://music.apple.com/us/album/great-i-am/1867166174",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/4c/9a/83/4c9a8394-807f-d0ae-4979-c342b2a4c950/9320428365057.png/1200x630bb.jpg",
    is_new: true,
  });

  await addAlbum("AOH Music", {
    title: "BEHOLD (Acoustic Live), Vol. 2",
    release_date: "2026-02-27",
    url_apple_music: null,
    is_new: true,
  });

  await addAlbum("Pat Barrett", {
    title: "Break Open (Live)",
    release_date: "2026-03-13",
    url_apple_music: "https://music.apple.com/us/album/break-open-live/1867671463",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/2f/2e/48/2f2e48a8-ed1e-d6cf-a00a-78cb4691845f/25UM2IM09133.rgb.jpg/1200x630bb.jpg",
    is_new: true,
  });

  await addAlbum("Lakewood Music", {
    title: "House of Worship",
    release_date: "2026-03-20",
    url_apple_music: "https://music.apple.com/us/album/house-of-worship/1849019634",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/05/b9/28/05b928d7-c5f9-234c-d1bc-db10fd1644cf/5037300554938.jpg/1200x630bb.jpg",
    is_new: true,
  });

  await addAlbum("Jonathan McReynolds", {
    title: "Closer (Live in Chicago)",
    release_date: "2026-03-27",
    url_apple_music: null,
    is_new: true,
  });

  await addAlbum("Meredith Andrews", {
    title: "Live From Liberty University",
    release_date: "2026-04-03",
    url_apple_music: null,
    is_new: true,
  });

  // Update existing albums with cover art
  console.log("\n=== Updating existing album covers ===\n");

  const { createClient } = await import("@supabase/supabase-js");
  const sb = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

  const covers: Record<string, string> = {
    "Song of the Saints (Deluxe)": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/9b/c4/5c/9bc45c6a-076d-0541-ba37-0449278fd216/196874094549.jpg/1200x630bb.jpg",
    "SO BE IT (Live)": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/96/6c/7a/966c7a72-f91a-a766-ff1a-81eb9db4effd/196873921839.jpg/1200x630bb.jpg",
  };

  for (const [title, url] of Object.entries(covers)) {
    const { error } = await sb.from("albums").update({ cover_url: url }).eq("title", title);
    if (!error) console.log(`  Updated cover: ${title}`);
  }

  console.log("\nDone!");
}

seedNewReleases();
