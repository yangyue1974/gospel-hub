import { createClient } from "@supabase/supabase-js";

const sb = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

async function exportLinks() {
  const { data } = await sb
    .from("artists")
    .select("name, url_website, url_wiki, url_youtube, url_apple_music, url_spotify")
    .eq("status", "published")
    .order("name");

  data?.forEach((a) => {
    const links = [
      a.url_website ? "W" : "-",
      a.url_wiki ? "K" : "-",
      a.url_youtube ? "Y" : "-",
      a.url_apple_music ? "A" : "-",
      a.url_spotify ? "S" : "-",
    ].join("");
    console.log(`${links} | ${a.name}`);
    if (a.url_spotify) console.log(`     spotify: ${a.url_spotify}`);
    if (a.url_apple_music) console.log(`     apple:   ${a.url_apple_music}`);
    if (a.url_youtube) console.log(`     youtube: ${a.url_youtube}`);
    if (a.url_website) console.log(`     website: ${a.url_website}`);
    if (a.url_wiki) console.log(`     wiki:    ${a.url_wiki}`);
  });
}

exportLinks();
