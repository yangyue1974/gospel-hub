import { createClient } from "@supabase/supabase-js";

const sb = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

const updates = [
  {
    title: "Live From Liberty University",
    url_spotify: "https://open.spotify.com/album/1vZIyUcYKNuxTq9l3rHs3h",
    url_apple_music: "https://music.apple.com/us/album/live-from-liberty-university/1869384748",
  },
  {
    title: "Closer (Live in Chicago)",
    url_spotify: "https://open.spotify.com/album/7ug3T3uwftsFJqZiUhqYlH",
    url_apple_music: "https://music.apple.com/us/album/closer-live-in-chicago/1860442674",
  },
  {
    title: "House of Worship",
    url_spotify: "https://open.spotify.com/album/05xxkIx9f2zacGCUQ3x79C",
  },
  {
    title: "Break Open (Live)",
    url_spotify: "https://open.spotify.com/album/0FSWZD1UjBwGb1nNUJFExO",
  },
  {
    title: "BEHOLD (Acoustic Live), Vol. 2",
    url_spotify: "https://open.spotify.com/album/1WQpJontK28jOd0TVyYdDn",
    url_apple_music: "https://music.apple.com/us/album/behold-acoustic-live-vol-2/1879406664",
  },
  {
    title: "Instrumental Worship Collection",
    url_spotify: "https://open.spotify.com/album/7oW8IhvJpVd4efpomMxptQ",
  },
];

async function fix() {
  for (const { title, ...links } of updates) {
    const { error } = await sb.from("albums").update(links).eq("title", title);
    if (error) console.error(`  Error: ${title} — ${error.message}`);
    else console.log(`  Updated: ${title}`);
  }

  // Verify
  const { data } = await sb.from("albums").select("title, url_spotify, url_apple_music").order("release_date", { ascending: false });
  console.log("\nFinal check:");
  data?.forEach(a => {
    const sp = a.url_spotify ? "✓" : "✗";
    const am = a.url_apple_music ? "✓" : "✗";
    console.log(`  Spotify:${sp} Apple:${am} | ${a.title}`);
  });
}

fix();
