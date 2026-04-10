import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { join } from "path";

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
const DIR = "/Users/yangyue12/Desktop/albumcover";
const BUCKET = "album-covers";

async function fix() {
  // Ensure bucket exists
  const { data: buckets } = await supabase.storage.listBuckets();
  if (!buckets?.some((b) => b.name === BUCKET)) {
    await supabase.storage.createBucket(BUCKET, { public: true });
  }

  // 1. Upload missing covers
  const covers = [
    { file: "AOH Music.jpg", title: "BEHOLD (Acoustic Live), Vol. 2", slug: "aoh-music-behold-vol2" },
    { file: "Closer (Live In Chicago).jpg", title: "Closer (Live in Chicago)", slug: "jonathan-mcreynolds-closer" },
    { file: "MA_Live-From-Liberty-University_Cover-ezgif.com-webp-to-jpg-converter.jpg", title: "Live From Liberty University", slug: "meredith-andrews-live-from-liberty" },
    { file: "Maverick City Music, The Prayer Project, Will Morrison & Calm Worship Collective.jpg", title: "Instrumental Worship Collection", slug: "maverick-city-instrumental" },
  ];

  for (const { file, title, slug } of covers) {
    const buf = readFileSync(join(DIR, file));
    const path = `${slug}.jpg`;

    await supabase.storage.from(BUCKET).upload(path, buf, { contentType: "image/jpeg", upsert: true });
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);

    const { error } = await supabase.from("albums").update({ cover_url: data.publicUrl }).eq("title", title);
    if (error) console.error(`  Error updating ${title}:`, error.message);
    else console.log(`  Cover uploaded: ${title}`);
  }

  // 2. Remove duplicate Elevation Worship "SO BE IT (Live)"
  const { data: dupes } = await supabase
    .from("albums")
    .select("id, artist_name, title")
    .eq("title", "SO BE IT (Live)")
    .order("created_at");

  if (dupes && dupes.length > 1) {
    // Keep the first, delete the rest
    for (let i = 1; i < dupes.length; i++) {
      await supabase.from("albums").delete().eq("id", dupes[i].id);
      console.log(`  Deleted duplicate: ${dupes[i].title} (id: ${dupes[i].id})`);
    }
  } else {
    console.log("  No Elevation Worship duplicates found");
  }

  // Also check for the earlier "So Be It (Live)" variant
  const { data: dupes2 } = await supabase
    .from("albums")
    .select("id, artist_name, title")
    .ilike("title", "%so be it%")
    .order("created_at");

  if (dupes2 && dupes2.length > 1) {
    for (let i = 1; i < dupes2.length; i++) {
      await supabase.from("albums").delete().eq("id", dupes2[i].id);
      console.log(`  Deleted duplicate: ${dupes2[i].title} (id: ${dupes2[i].id})`);
    }
  }

  // 3. Delete Deitrick Haddon (no real data available)
  const { data: deitrick } = await supabase
    .from("albums")
    .delete()
    .ilike("artist_name", "%deitrick%")
    .select("title, artist_name");

  if (deitrick && deitrick.length > 0) {
    console.log(`  Deleted: ${deitrick[0].artist_name} - ${deitrick[0].title}`);
  }

  // Show final album list
  const { data: all } = await supabase
    .from("albums")
    .select("title, artist_name, release_date, cover_url")
    .order("release_date", { ascending: false });

  console.log(`\nFinal album list (${all?.length ?? 0}):`);
  all?.forEach((a) => {
    const hasCover = a.cover_url ? "✓" : "✗";
    console.log(`  ${hasCover} ${a.release_date} | ${a.artist_name} - ${a.title}`);
  });
}

fix();
