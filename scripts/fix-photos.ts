import { createClient } from "@supabase/supabase-js";
import { readFileSync, readdirSync } from "fs";
import { join } from "path";

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
const DIR = "/Users/yangyue12/Desktop/Gospe Cover2";
const BUCKET = "artist-photos";

const nameMap: Record<string, { artist: string; slug: string }> = {
  "cody carnes": { artist: "Cody Carnes", slug: "cody-carnes" },
  "francesca battistelli": { artist: "Francesca Battistelli", slug: "francesca-battistelli" },
  "kirk franklin": { artist: "Kirk Franklin", slug: "kirk-franklin" },
  "newsboys": { artist: "Newsboys", slug: "newsboys" },
};

async function fix() {
  const allFiles = readdirSync(DIR);

  for (const file of allFiles) {
    const normalized = file.replace(/\.[^.]+$/, "").replace(/[\s\u00a0]+/g, " ").trim().toLowerCase();
    const match = nameMap[normalized];
    if (!match) continue;

    const { artist, slug } = match;
    const buf = readFileSync(join(DIR, file));
    const path = `${slug}.jpg`;

    await supabase.storage.from(BUCKET).upload(path, buf, { contentType: "image/jpeg", upsert: true });
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
    await supabase.from("artists").update({ photo_url: data.publicUrl }).eq("name", artist);
    console.log(`Fixed: ${artist}`);
  }
}

fix();
