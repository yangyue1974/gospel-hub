import { createClient } from "@supabase/supabase-js";

const sb = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

const fixes: Record<string, string | null> = {
  "Anne Wilson": "https://www.youtube.com/c/annewilson",
  "Brooke Ligertwood": "https://www.youtube.com/channel/UC2JxSOsnJlyY7xwOFeYEtug",
  "Chandler Moore": "https://www.youtube.com/@chandlerdmoore",
  "Charity Gayle": "https://www.youtube.com/@charitygaylemusic",
  "Darlene Zschech": "https://www.youtube.com/user/zschechdarlene",
  "for KING & COUNTRY": "https://www.youtube.com/@forkingandcountry",
  "Hillsong Young & Free": "https://www.youtube.com/@HillsongYoungFree",
  "Hope Darst": "https://www.youtube.com/channel/UCgGG-QHNJqffhrJmL-iHiGg",
  "Israel & New Breed": "https://www.youtube.com/channel/UCIl3H4ut9HZrET6_FHobeaA",
  "Jonathan McReynolds": "https://www.youtube.com/channel/UCIk_5MIPkEA8HMjljJCyohA",
  "Kim Walker-Smith": "https://www.youtube.com/@KimWalkerSmithMusic",
  "Kirk Franklin": "https://www.youtube.com/@realkirkfranklin",
  "Kutless": null, // no valid channel found
  "Lauren Daigle": "https://www.youtube.com/user/laurendaiglemusic",
  "Lecrae": "https://www.youtube.com/@lecraeofficial",
  "Matt Maher": "https://www.youtube.com/@MattMaherMusic",
  "Matthew West": "https://www.youtube.com/channel/UCs7x1ETqOho69bBQqHCJx7A",
  "Natalie Grant": "https://www.youtube.com/user/nataliegrantvideos",
  "Skillet": "https://www.youtube.com/@SkilletBand",
  "Tasha Cobbs Leonard": "https://www.youtube.com/@TashaCobbs",
  "Tauren Wells": "https://www.youtube.com/@TaurenWellsMusic",
  "The Belonging Co": "https://www.youtube.com/channel/UCYunZCk5QjyHBMeElVn0tbQ",
};

async function fix() {
  let count = 0;
  for (const [name, url] of Object.entries(fixes)) {
    const { error } = await sb.from("artists").update({ url_youtube: url }).eq("name", name);
    if (error) console.error(`  Error: ${name}`);
    else {
      console.log(`  ${url ? "Fixed" : "Removed"}: ${name}`);
      count++;
    }
  }
  console.log(`\nDone! Updated ${count} YouTube links.`);
}

fix();
