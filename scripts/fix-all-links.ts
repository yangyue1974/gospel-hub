import { createClient } from "@supabase/supabase-js";

const sb = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

const fixes: Record<string, { url_spotify?: string; url_apple_music?: string }> = {
  // Batch 1
  "Anne Wilson": {
    url_spotify: "https://open.spotify.com/artist/75JvBeqW4BJ4xgnbMAq6MN",
    url_apple_music: "https://music.apple.com/us/artist/anne-wilson/1561871798",
  },
  "Blessing Offor": {
    url_spotify: "https://open.spotify.com/artist/55qfDfgj4Qi3JGe6KpqGtC",
    url_apple_music: "https://music.apple.com/us/artist/blessing-offor/274532732",
  },
  "Brian & Jenn Johnson": {
    url_spotify: "https://open.spotify.com/artist/483CBzp3nFK7Zox6ILdpwn",
    url_apple_music: "https://music.apple.com/us/artist/brian-jenn-johnson/198866042",
  },
  "Brooke Ligertwood": {
    url_spotify: "https://open.spotify.com/artist/7iETGaxJ4crz3qaljDPCKC",
    url_apple_music: "https://music.apple.com/us/artist/brooke-ligertwood/312711773",
  },
  "Chandler Moore": {
    url_spotify: "https://open.spotify.com/artist/6y7frW1RUq3XBBXbYowVpk",
    url_apple_music: "https://music.apple.com/us/artist/chandler-moore/538780318",
  },
  "Charity Gayle": {
    url_spotify: "https://open.spotify.com/artist/57YsESW6BGZLHQgOg8AiAq",
    url_apple_music: "https://music.apple.com/us/artist/charity-gayle/925719609",
  },
  "Cody Carnes": {
    url_spotify: "https://open.spotify.com/artist/7apN8bBgl19E0Ona9pvPq0",
    url_apple_music: "https://music.apple.com/us/artist/cody-carnes/307949955",
  },
  "Crowder": {
    url_spotify: "https://open.spotify.com/artist/39xmI59WrIMyyJjSDq6WCu",
    url_apple_music: "https://music.apple.com/us/artist/crowder/215662555",
  },
  "Danny Gokey": {
    url_spotify: "https://open.spotify.com/artist/5Yu3b48Y29bZlI1cLPOZJz",
    url_apple_music: "https://music.apple.com/us/artist/danny-gokey/305373242",
  },
  "Dante Bowe": {
    url_spotify: "https://open.spotify.com/artist/60JjUCBeLsuJ95WFvqFiFz",
    url_apple_music: "https://music.apple.com/us/artist/dante-bowe/1099303920",
  },
  "Darlene Zschech": {
    url_spotify: "https://open.spotify.com/artist/6ZLy8YFk7VbamsI5qbYXtw",
    url_apple_music: "https://music.apple.com/us/artist/darlene-zschech/5365131",
  },
  "DOE": {
    url_spotify: "https://open.spotify.com/artist/7z7byOJ4AJnMY2NHE66ZpW",
    url_apple_music: "https://music.apple.com/us/artist/doe/1454842892",
  },
  "Lecrae": {
    url_spotify: "https://open.spotify.com/artist/1CFCsEqKrCyvAFKOATQHiW",
    url_apple_music: "https://music.apple.com/us/artist/lecrae/130043072",
  },
  "Kim Walker-Smith": {
    url_spotify: "https://open.spotify.com/artist/4leTWyczsXYGlzUh8sFGSz",
    url_apple_music: "https://music.apple.com/us/artist/kim-walker-smith/323912741",
  },

  // Batch 2
  "for KING & COUNTRY": {
    url_spotify: "https://open.spotify.com/artist/3sDbKMebVH2VYcRSl7u1VC",
    url_apple_music: "https://music.apple.com/us/artist/for-king-country/457871289",
  },
  "Francesca Battistelli": {
    url_spotify: "https://open.spotify.com/artist/29ywwKkxfoH7iWwNY1UezA",
    url_apple_music: "https://music.apple.com/us/artist/francesca-battistelli/280141877",
  },
  "Gateway Worship": {
    url_spotify: "https://open.spotify.com/artist/2b6REyd5UBBp4ZPDhZ2TNB",
    url_apple_music: "https://music.apple.com/us/artist/gateway-worship/160408277",
  },
  "Hillsong UNITED": {
    url_spotify: "https://open.spotify.com/artist/74cb3MG0x0BOnYNW1uXYnM",
    url_apple_music: "https://music.apple.com/us/artist/hillsong-united/79437763",
  },
  "Hillsong Young & Free": {
    url_spotify: "https://open.spotify.com/artist/7m4gF38CPATtHrk5HS42WZ",
    url_apple_music: "https://music.apple.com/us/artist/hillsong-young-free/661271604",
  },
  "Hope Darst": {
    url_spotify: "https://open.spotify.com/artist/0B5924KrMyjdeYqZsPpw36",
    url_apple_music: "https://music.apple.com/us/artist/hope-darst/401473983",
  },
  "Israel & New Breed": {
    url_spotify: "https://open.spotify.com/artist/77HU1Zb1VDIFvWKteJii0E",
    url_apple_music: "https://music.apple.com/us/artist/israel-new-breed/155653250",
  },
  "Jonathan McReynolds": {
    url_spotify: "https://open.spotify.com/artist/5ItTHwcEtFh6DEOBheMub9",
    url_apple_music: "https://music.apple.com/us/artist/jonathan-mcreynolds/384006788",
  },
  "KB": {
    url_spotify: "https://open.spotify.com/artist/77IKXFvO7SpWrq8hflrUXc",
    url_apple_music: "https://music.apple.com/us/artist/kb/74520603",
  },
  "Kirk Franklin": {
    url_spotify: "https://open.spotify.com/artist/4akybxRTGHJZ1DXjLhJ1qu",
    url_apple_music: "https://music.apple.com/us/artist/kirk-franklin/3293094",
  },
  "Leeland": {
    url_spotify: "https://open.spotify.com/artist/6j1fmLreVuAay7k6Gudfa2",
    url_apple_music: "https://music.apple.com/us/artist/leeland/152665329",
  },
  "NF": {
    url_spotify: "https://open.spotify.com/artist/6fOMl44jA4Sp5b9PpYCkzz",
    url_apple_music: "https://music.apple.com/us/artist/nf/898094630",
  },
  "Newsboys": {
    url_spotify: "https://open.spotify.com/artist/1SZMaiNHfdUuU0qZKZ6y62",
    url_apple_music: "https://music.apple.com/us/artist/newsboys/574574",
  },
  "Skillet": {
    url_spotify: "https://open.spotify.com/artist/49bzE5vRBRIota4qeHtQM8",
    url_apple_music: "https://music.apple.com/us/artist/skillet/1750802",
  },
  "TobyMac": {
    url_spotify: "https://open.spotify.com/artist/5VX8hxrcfJWwaTLiqGUHG3",
    url_apple_music: "https://music.apple.com/us/artist/tobymac/635550",
  },
};

async function fixAll() {
  let fixed = 0;
  for (const [name, links] of Object.entries(fixes)) {
    const { error } = await sb.from("artists").update(links).eq("name", name);
    if (error) {
      console.error(`  Error: ${name} — ${error.message}`);
    } else {
      console.log(`  Fixed: ${name}`);
      fixed++;
    }
  }
  console.log(`\nDone! Fixed ${fixed}/${Object.keys(fixes).length} artists.`);
}

fixAll();
