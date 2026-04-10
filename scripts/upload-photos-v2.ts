import { createClient } from "@supabase/supabase-js";
import { readFileSync, readdirSync } from "fs";
import { join, extname } from "path";

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
const PHOTO_DIR = "/Users/yangyue12/Desktop/Gospe Cover2";
const BUCKET = "artist-photos";

const fileToArtist: Record<string, string> = {
  "Anne Wilson.jpg": "Anne Wilson",
  "Blessing Offor.jpg": "Blessing Offor",
  "Brian & Jenn Johnson.jpg": "Brian & Jenn Johnson",
  "Brooke Ligertwood.jpg": "Brooke Ligertwood",
  "Chandler Moore.jpg": "Chandler Moore",
  "Charity Gayle.jpg": "Charity Gayle",
  "Cody Carnes .jpg": "Cody Carnes",
  "Crowder.jpg": "Crowder",
  "DOE.jpg": "DOE",
  "Danny Gokey.jpg": "Danny Gokey",
  "Dante Bowe.jpg": "Dante Bowe",
  "Darlene Zschech.jpg": "Darlene Zschech",
  "Francesca Battistelli .jpg": "Francesca Battistelli",
  "Gateway Worship.jpg": "Gateway Worship",
  "Hillsong UNITED.jpg": "Hillsong UNITED",
  "Hillsong Young & Free.jpg": "Hillsong Young & Free",
  "Hope Darst.jpg": "Hope Darst",
  "Israel & New Breed.jpg": "Israel & New Breed",
  "Jonathan McReynolds.jpg": "Jonathan McReynolds",
  "KB.jpg": "KB",
  "Kim Walker-Smith.jpg": "Kim Walker-Smith",
  "Kirk Franklin .jpg": "Kirk Franklin",
  "Lecrae.jpg": "Lecrae",
  "Leeland.jpg": "Leeland",
  "Matt Maher.jpg": "Matt Maher",
  "Matt Redman.jpg": "Matt Redman",
  "Matthew West.jpg": "Matthew West",
  "NF.jpg": "NF",
  "Natalie Grant.jpg": "Natalie Grant",
  "Newsboys .jpg": "Newsboys",
  "North Point Worship.jpg": "North Point Worship",
  "Passion.jpg": "Passion",
  "Planetshakers.jpg": "Planetshakers",
  "Riley Clemmons.jpg": "Riley Clemmons",
  "Sean Feucht.jpg": "Sean Feucht",
  "Skillet.jpg": "Skillet",
  "Tamela Mann.jpg": "Tamela Mann",
  "Tasha Cobbs Leonard.jpg": "Tasha Cobbs Leonard",
  "Tauren Wells.jpg": "Tauren Wells",
  "The Belonging Co.jpg": "The Belonging Co",
  "Tim Hughes.jpg": "Tim Hughes",
  "TobyMac.jpg": "TobyMac",
  "Travis Greene.jpg": "Travis Greene",
  "Tye Tribbett.jpg": "Tye Tribbett",
  "UPPERROOM.jpg": "UPPERROOM",
  "We The Kingdom.jpg": "We The Kingdom",
  "Zach Williams.jpg": "Zach Williams",
  "for KING & COUNTRY.jpg": "for KING & COUNTRY",
};

async function upload() {
  // Ensure bucket exists
  const { data: buckets } = await supabase.storage.listBuckets();
  if (!buckets?.some((b) => b.name === BUCKET)) {
    await supabase.storage.createBucket(BUCKET, { public: true });
    console.log(`Created bucket: ${BUCKET}`);
  }

  const files = readdirSync(PHOTO_DIR);
  let uploaded = 0;

  for (const file of files) {
    const artistName = fileToArtist[file];
    if (!artistName) {
      console.log(`  Skipped (no mapping): ${file}`);
      continue;
    }

    const ext = extname(file);
    const slug = artistName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");
    const storagePath = `${slug}${ext}`;
    const filePath = join(PHOTO_DIR, file);
    const fileBuffer = readFileSync(filePath);
    const contentType = ext === ".webp" ? "image/webp" : ext === ".png" ? "image/png" : "image/jpeg";

    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(storagePath, fileBuffer, { contentType, upsert: true });

    if (uploadError) {
      console.error(`  Upload error (${artistName}):`, uploadError.message);
      continue;
    }

    const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(storagePath);

    const { error: updateError } = await supabase
      .from("artists")
      .update({ photo_url: urlData.publicUrl })
      .eq("name", artistName);

    if (updateError) {
      console.error(`  DB error (${artistName}):`, updateError.message);
    } else {
      console.log(`  Done: ${artistName}`);
      uploaded++;
    }
  }

  console.log(`\nUploaded ${uploaded}/${Object.keys(fileToArtist).length} photos.`);
}

upload();
