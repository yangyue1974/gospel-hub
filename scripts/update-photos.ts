import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const photos: Record<string, string> = {
  "Elevation Worship": "https://upload.wikimedia.org/wikipedia/commons/5/5b/Elevation_Worship.jpg",
  "Hillsong Worship": "https://upload.wikimedia.org/wikipedia/commons/a/a3/Hillsong_church_worship01.jpg",
  "Casting Crowns": "https://upload.wikimedia.org/wikipedia/commons/6/6c/Casting_Crowns_2013.jpg",
  "MercyMe": "https://upload.wikimedia.org/wikipedia/commons/c/cd/Bart_Millard_and_Robin_Shaffer_in_concert.JPG",
  "Maverick City Music": "https://upload.wikimedia.org/wikipedia/commons/8/8d/Maverick_City_music.jpg",
  "Kutless": "https://upload.wikimedia.org/wikipedia/commons/4/48/Kutless_band.jpg",
  "Phil Wickham": "https://upload.wikimedia.org/wikipedia/commons/8/8c/Phil_Wickham_by_Gage_Skidmore.jpg",
  "Jeremy Riddle": "https://upload.wikimedia.org/wikipedia/commons/9/93/Jeremy_Riddle.JPG",
  "Amanda Cook": "https://upload.wikimedia.org/wikipedia/commons/e/ef/Amandalindseycook.jpg",
  "Josh Baldwin": "https://upload.wikimedia.org/wikipedia/commons/d/d1/JB-TIF_Promo_Pic.jpg",
  "Lauren Daigle": "https://upload.wikimedia.org/wikipedia/commons/8/8b/Lauren_Daigle_%40_The_Novo_05_11_2023_%2853048053550%29.jpg",
  "Kristene DiMarco": "https://upload.wikimedia.org/wikipedia/commons/7/73/Kristene_DiMarco.webp",
  "Cory Asbury": "https://upload.wikimedia.org/wikipedia/commons/d/de/Cory_Asbury.png",
  "Brandon Lake": "https://upload.wikimedia.org/wikipedia/commons/d/dd/Brandon_Lake_by_Gage_Skidmore.jpg",
  "Chris Tomlin": "https://upload.wikimedia.org/wikipedia/commons/1/11/030422_ChrisTomlin_08_2156.jpg",
  "Naomi Raine": "https://upload.wikimedia.org/wikipedia/commons/2/21/Naomi_Raine.webp",
  "Jordan Smith": "https://upload.wikimedia.org/wikipedia/commons/c/c7/Jordan_Smith_2016.jpg",
  "CeCe Winans": "https://upload.wikimedia.org/wikipedia/commons/c/cc/Cece_Winans_%28cropped%29.jpg",
  "Kari Jobe": "https://upload.wikimedia.org/wikipedia/commons/8/82/Kari_Jobe_by_Gage_Skidmore.jpg",
};

async function updatePhotos() {
  let updated = 0;
  for (const [name, url] of Object.entries(photos)) {
    const { error } = await supabase
      .from("artists")
      .update({ photo_url: url })
      .eq("name", name);

    if (error) {
      console.error(`  Error: ${name} — ${error.message}`);
    } else {
      console.log(`  Updated: ${name}`);
      updated++;
    }
  }
  console.log(`\nDone! Updated ${updated}/${Object.keys(photos).length} artists.`);
}

updatePhotos();
