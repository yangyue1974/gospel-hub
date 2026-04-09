import { createClient } from "@supabase/supabase-js";

const sb = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

async function clean() {
  // Delete albums older than 3 months (before 2026-01-10)
  const { data: deletedAlbums } = await sb
    .from("albums")
    .delete()
    .lt("release_date", "2026-01-10")
    .select("title, artist_name");

  console.log(`Deleted ${deletedAlbums?.length ?? 0} old albums:`);
  deletedAlbums?.forEach((a) => console.log(`  - ${a.artist_name} - ${a.title}`));

  // Delete singles older than 3 months
  const { data: deletedSingles } = await sb
    .from("singles")
    .delete()
    .lt("release_date", "2026-01-10")
    .select("title, artist_name");

  console.log(`Deleted ${deletedSingles?.length ?? 0} old singles`);

  // Show remaining
  const { data: remaining } = await sb
    .from("albums")
    .select("title, artist_name, release_date")
    .order("release_date", { ascending: false });

  console.log(`\nRemaining ${remaining?.length ?? 0} albums:`);
  remaining?.forEach((a) => console.log(`  ${a.release_date} | ${a.artist_name} - ${a.title}`));
}

clean();
