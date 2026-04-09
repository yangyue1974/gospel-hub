import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

type Links = {
  url_website?: string | null;
  url_wiki?: string | null;
  url_youtube?: string | null;
  url_apple_music?: string | null;
  url_spotify?: string | null;
};

const artistLinks: Record<string, Links> = {
  "Bethel Music": {
    url_website: "https://bethelmusic.com/",
    url_wiki: "https://en.wikipedia.org/wiki/Bethel_Music",
    url_youtube: "https://www.youtube.com/c/bethelmusic",
    url_apple_music: "https://music.apple.com/us/artist/bethel-music/480438107",
    url_spotify: "https://open.spotify.com/artist/26T4yOaOoFJvUvxR87Y9HO",
  },
  "Elevation Worship": {
    url_website: "https://www.elevationworship.com/",
    url_wiki: "https://en.wikipedia.org/wiki/Elevation_Worship",
    url_youtube: "https://www.youtube.com/@elevationworship",
    url_apple_music: "https://music.apple.com/us/artist/elevation-worship/287874918",
    url_spotify: "https://open.spotify.com/artist/3YCKuqpv9nCsIhJ2v8SMix",
  },
  "Hillsong Worship": {
    url_website: "https://hillsong.com/music/worship",
    url_wiki: "https://en.wikipedia.org/wiki/Hillsong_Worship",
    url_youtube: "https://www.youtube.com/channel/UC4q12NoPNySbVqwpw4iO5Vg",
    url_apple_music: "https://music.apple.com/us/artist/hillsong-worship/878620224",
    url_spotify: "https://open.spotify.com/artist/3SgHzT552wy2W8pNLaLk24",
  },
  "Jesus Culture": {
    url_website: "https://jesusculture.com/",
    url_wiki: "https://en.wikipedia.org/wiki/Jesus_Culture",
    url_youtube: "https://www.youtube.com/@jesuscultureofficial",
    url_apple_music: "https://music.apple.com/us/artist/jesus-culture/319089613",
    url_spotify: "https://open.spotify.com/artist/0Onvkz1Nbs4wHXXUwOIGk8",
  },
  "Casting Crowns": {
    url_website: "https://www.castingcrowns.com/",
    url_wiki: "https://en.wikipedia.org/wiki/Casting_Crowns",
    url_youtube: "https://www.youtube.com/user/CastingCrowns",
    url_apple_music: "https://music.apple.com/us/artist/casting-crowns/3501817",
    url_spotify: "https://open.spotify.com/artist/6eJqAWJdd8JhAN1pQGie4r",
  },
  "MercyMe": {
    url_website: "https://mercyme.org/",
    url_wiki: "https://en.wikipedia.org/wiki/MercyMe",
    url_youtube: "https://www.youtube.com/channel/UCSK2vitdNzVlVpg3XVb2hIg",
    url_apple_music: "https://music.apple.com/us/artist/mercyme/5360449",
    url_spotify: "https://open.spotify.com/artist/6APm8EjxOHSYM5B4i3vT3q",
  },
  "Housefires": {
    url_website: "https://www.housefires.org/",
    url_wiki: "https://en.wikipedia.org/wiki/Housefires",
    url_youtube: "https://www.youtube.com/channel/UCF80293azxnDAdbOa7fFKfw",
    url_apple_music: "https://music.apple.com/us/artist/housefires/503039804",
    url_spotify: "https://open.spotify.com/artist/6egyCFgiJ1j941PaxKoWJD",
  },
  "Maverick City Music": {
    url_website: "https://maverickcitymusic.com/",
    url_wiki: "https://en.wikipedia.org/wiki/Maverick_City_Music",
    url_youtube: "https://www.youtube.com/channel/UCZ4trZcPxr3DwcMbFb54rDQ",
    url_apple_music: "https://music.apple.com/us/artist/maverick-city-music/1474458790",
    url_spotify: "https://open.spotify.com/artist/58r1rB5t3VF5X6yXGPequV",
  },
  "Selah": {
    url_website: "https://www.selahonline.com/",
    url_wiki: "https://en.wikipedia.org/wiki/Selah_(group)",
    url_youtube: "https://www.youtube.com/user/TheSelahVideos",
    url_apple_music: "https://music.apple.com/us/artist/selah/18208951",
    url_spotify: "https://open.spotify.com/artist/5dZiRoY9Vpp6qrxqXNRwPE",
  },
  "Kutless": {
    url_website: "https://www.kutless.com/",
    url_wiki: "https://en.wikipedia.org/wiki/Kutless",
    url_youtube: "https://www.youtube.com/user/kutless",
    url_apple_music: "https://music.apple.com/us/artist/kutless/572538",
    url_spotify: "https://open.spotify.com/artist/3lLT23km6QvzYCojCXAYtX",
  },
  "Red Rocks Worship": {
    url_website: "https://www.redrocksworship.com",
    url_wiki: null,
    url_youtube: "https://www.youtube.com/@redrocksworship",
    url_apple_music: "https://music.apple.com/us/artist/red-rocks-worship/949720423",
    url_spotify: "https://open.spotify.com/artist/48AVv3cw03WdSB5b4qmNCr",
  },
  "Caleb & Kelsey": {
    url_website: "https://calebandkelsey.com",
    url_wiki: null,
    url_youtube: "https://www.youtube.com/@calebandkelsey",
    url_apple_music: "https://music.apple.com/us/artist/caleb-and-kelsey/914103158",
    url_spotify: "https://open.spotify.com/artist/7l0sphz32GV0AjjEhECpVg",
  },
  "Phil Wickham": {
    url_website: "https://philwickham.com",
    url_wiki: "https://en.wikipedia.org/wiki/Phil_Wickham",
    url_youtube: "https://www.youtube.com/@philwickham",
    url_apple_music: "https://music.apple.com/us/artist/phil-wickham/133485322",
    url_spotify: "https://open.spotify.com/artist/5d1JhBfyb58upMXCZOdbQu",
  },
  "Jeremy Riddle": {
    url_website: "https://www.jeremyriddle.com",
    url_wiki: "https://en.wikipedia.org/wiki/Jeremy_Riddle",
    url_youtube: null,
    url_apple_music: "https://music.apple.com/us/artist/jeremy-riddle/7018857",
    url_spotify: "https://open.spotify.com/artist/6jZbQXvNtDjnj18yoHMuvi",
  },
  "Amanda Cook": {
    url_website: "https://www.amandacook.co",
    url_wiki: "https://en.wikipedia.org/wiki/Amanda_Lindsey_Cook",
    url_youtube: null,
    url_apple_music: "https://music.apple.com/us/artist/amanda-cook/1294406471",
    url_spotify: "https://open.spotify.com/artist/53Gnd3lGlcL8ua9Yyu9xDP",
  },
  "Steffany Gretzinger": {
    url_website: "https://www.steffanygretzinger.com",
    url_wiki: "https://en.wikipedia.org/wiki/Steffany_Gretzinger",
    url_youtube: null,
    url_apple_music: "https://music.apple.com/us/artist/steffany-gretzinger/907081162",
    url_spotify: "https://open.spotify.com/artist/2akNRvGNB400IDDUMr1PHW",
  },
  "Josh Baldwin": {
    url_website: "https://joshbaldwin.com",
    url_wiki: "https://en.wikipedia.org/wiki/Josh_Baldwin",
    url_youtube: null,
    url_apple_music: "https://music.apple.com/us/artist/josh-baldwin/276932668",
    url_spotify: "https://open.spotify.com/artist/2cB6hX2LI14KUTAevpaYn2",
  },
  "Lauren Daigle": {
    url_website: "https://www.laurendaigle.com",
    url_wiki: "https://en.wikipedia.org/wiki/Lauren_Daigle",
    url_youtube: "https://www.youtube.com/@laurendaigle",
    url_apple_music: "https://music.apple.com/us/artist/lauren-daigle/722177758",
    url_spotify: "https://open.spotify.com/artist/40LHVA5BTQp9RxHOQ9JPYj",
  },
  "Jonathan David & Melissa Helser": {
    url_website: "https://www.jonathanhelser.com",
    url_wiki: "https://en.wikipedia.org/wiki/Jonathan_David_%26_Melissa_Helser",
    url_youtube: null,
    url_apple_music: "https://music.apple.com/us/artist/jonathan-david-helser/254484891",
    url_spotify: "https://open.spotify.com/artist/2ZLsTObAIv5UOAMalmlKXp",
  },
  "Kristene DiMarco": {
    url_website: "https://kristenedimarco.com",
    url_wiki: "https://en.wikipedia.org/wiki/Kristene_DiMarco",
    url_youtube: "https://www.youtube.com/channel/UCUsOHKd2n53m4ml651Dc8HA",
    url_apple_music: "https://music.apple.com/us/artist/kristene-dimarco/486992715",
    url_spotify: "https://open.spotify.com/artist/0uWNGisbRTdz6E5O3V3Sc8",
  },
  "Cory Asbury": {
    url_website: "https://www.coryasbury.com/",
    url_wiki: "https://en.wikipedia.org/wiki/Cory_Asbury",
    url_youtube: "https://www.youtube.com/channel/UCKmcSqv0TcJMw_Bew0rawNQ",
    url_apple_music: "https://music.apple.com/us/artist/cory-asbury/272633727",
    url_spotify: "https://open.spotify.com/artist/2gXmjQIxCO8lMnSncluZaU",
  },
  "Brandon Lake": {
    url_website: "https://brandonlake.co/",
    url_wiki: "https://en.wikipedia.org/wiki/Brandon_Lake",
    url_youtube: "https://www.youtube.com/channel/UCUvrv1Ox5rRwzG-SHCN7zrg",
    url_apple_music: "https://music.apple.com/us/artist/brandon-lake/1050382282",
    url_spotify: "https://open.spotify.com/artist/1bdnGJxkbIIys5Jhk1T74v",
  },
  "Pat Barrett": {
    url_website: "https://www.patbarrettmusic.com/",
    url_wiki: "https://en.wikipedia.org/wiki/Pat_Barrett_(musician)",
    url_youtube: "https://www.youtube.com/channel/UCIQdGW-XFgSFBhGob9yf3ww",
    url_apple_music: "https://music.apple.com/us/artist/pat-barrett/254986718",
    url_spotify: "https://open.spotify.com/artist/0289SkqAn0iOohwm0pIHv3",
  },
  "Ellie Holcomb": {
    url_website: "https://www.ellieholcomb.com/",
    url_wiki: "https://en.wikipedia.org/wiki/Ellie_Holcomb",
    url_youtube: "https://www.youtube.com/channel/UCvjMBJA6_W9uyjJvCO9__DA",
    url_apple_music: "https://music.apple.com/us/artist/ellie-holcomb/382655540",
    url_spotify: "https://open.spotify.com/artist/5hNiAUVPCTgcpy8vljCxzs",
  },
  "Chris Tomlin": {
    url_website: "https://christomlin.com/",
    url_wiki: "https://en.wikipedia.org/wiki/Chris_Tomlin",
    url_youtube: null,
    url_apple_music: "https://music.apple.com/us/artist/chris-tomlin/569510",
    url_spotify: "https://open.spotify.com/artist/6pRi6EIPXz4QJEOEsBaA0m",
  },
  "Naomi Raine": {
    url_website: "https://www.naomirainemusic.com/",
    url_wiki: "https://en.wikipedia.org/wiki/Naomi_Raine",
    url_youtube: null,
    url_apple_music: "https://music.apple.com/us/artist/naomi-raine/670137315",
    url_spotify: "https://open.spotify.com/artist/4rc8nzClXj7sUjvsHVg6AD",
  },
  "Jordan Smith": {
    url_website: "https://www.therealjordansmith.com/",
    url_wiki: "https://en.wikipedia.org/wiki/Jordan_Smith_(musician)",
    url_youtube: "https://www.youtube.com/channel/UC41GHsigm-VUSIntH8YyPoA",
    url_apple_music: "https://music.apple.com/us/artist/jordan-smith/124498692",
    url_spotify: "https://open.spotify.com/artist/6TV0LZ3BaEun0OQEh96elP",
  },
  "CeCe Winans": {
    url_website: "https://cecewinans.com/",
    url_wiki: "https://en.wikipedia.org/wiki/CeCe_Winans",
    url_youtube: "https://www.youtube.com/channel/UC86Zlc-v_kkZ-yKG2cJZkxQ",
    url_apple_music: "https://music.apple.com/us/artist/cece-winans/655149",
    url_spotify: "https://open.spotify.com/artist/3qfrrrSO7utFdJkM2tvMRb",
  },
  "Kari Jobe": {
    url_website: "https://www.karijobe.com/",
    url_wiki: "https://en.wikipedia.org/wiki/Kari_Jobe",
    url_youtube: "https://www.youtube.com/c/karijobemusic",
    url_apple_music: "https://music.apple.com/us/artist/kari-jobe/136770805",
    url_spotify: "https://open.spotify.com/artist/5XlSS9O4eHRiJ0hKzbaFQ2",
  },
};

async function updateLinks() {
  let updated = 0;
  for (const [name, links] of Object.entries(artistLinks)) {
    const { error } = await supabase
      .from("artists")
      .update(links)
      .eq("name", name);

    if (error) {
      console.error(`  Error: ${name} — ${error.message}`);
    } else {
      console.log(`  Updated: ${name}`);
      updated++;
    }
  }
  console.log(`\nDone! ${updated}/${Object.keys(artistLinks).length} artists updated.`);
}

updateLinks();
