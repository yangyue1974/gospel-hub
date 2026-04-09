import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

async function addHopeDarst() {
  const { data: existing } = await supabase.from("artists").select("id").eq("name", "Hope Darst").limit(1);
  if (existing && existing.length > 0) {
    console.log("Hope Darst already exists");
    return;
  }

  const { error } = await supabase.from("artists").insert({
    name: "Hope Darst",
    type: "solo",
    founded_year: 2020,
    location: "Nashville, Tennessee",
    church_label: null,
    bio: "Hope Darst is a worship leader and songwriter from Nashville whose debut single 'Peace Be Still' became one of the most impactful worship songs of the early 2020s. Originally written during a personal crisis, the song resonated with millions during the COVID-19 pandemic, spending weeks at the top of Christian radio charts. Darst's music is characterized by vulnerability, emotional depth, and a clear anointing for leading people into God's presence. Her subsequent releases, including 'Promise' and 'God of Mine,' have continued to establish her as a significant voice in contemporary worship. Darst's journey from behind-the-scenes songwriter to frontline worship leader inspires those who feel called to step into their purpose later in life.",
    style: "Intimate worship, vulnerable songwriting, radio-friendly anthems, emotionally resonant",
    awards: "Billboard #1 Christian Airplay, GMA Dove Award nominations",
    url_website: "https://hopedarst.com",
    url_wiki: null,
    url_youtube: "https://www.youtube.com/@HopeDarst",
    url_apple_music: "https://music.apple.com/us/artist/hope-darst/1498498281",
    url_spotify: "https://open.spotify.com/artist/5w1VJM6P4yh4sdYUgVlIHo",
    photo_url: null,
    status: "published",
  });

  if (error) console.error("Error:", error.message);
  else console.log("Inserted & published: Hope Darst");
}

addHopeDarst();
