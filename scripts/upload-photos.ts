import { createClient } from "@supabase/supabase-js";
import { readFileSync, readdirSync } from "fs";
import { join, extname } from "path";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const PHOTO_DIR = "/Users/yangyue12/Desktop/Gospe Cover";
const BUCKET = "artist-photos";

// Map filenames to artist names in database
const fileToArtist: Record<string, string> = {
  "bethel music.jpg": "Bethel Music",
  "elevation worship.webp": "Elevation Worship",
  "hillsong worship.jpg": "Hillsong Worship",
  "jesus culture.jpg": "Jesus Culture",
  "casting crowns.jpg": "Casting Crowns",
  "mercyme.jpg": "MercyMe",
  "housefires.jpg": "Housefires",
  "maverick city music.webp": "Maverick City Music",
  "selah.jpg": "Selah",
  "kutless.jpg": "Kutless",
  "red rocks worship .jpg": "Red Rocks Worship",
  "caleb & kelsey .jpg": "Caleb & Kelsey",
  "phil wickham.jpg": "Phil Wickham",
  "jeremy riddle.jpg": "Jeremy Riddle",
  "amanda cook.jpg": "Amanda Cook",
  "Steffany Gretzinger.jpg": "Steffany Gretzinger",
  "Josh baldwin.webp": "Josh Baldwin",
  "lauren daigle.jpg": "Lauren Daigle",
  "jonathan david And melissa helser.jpg": "Jonathan David & Melissa Helser",
  "kristene dimarco.jpg": "Kristene DiMarco",
  "cory asbury.jpg": "Cory Asbury",
  "brandon lake.jpg": "Brandon Lake",
  "pat barrent.jpg": "Pat Barrett",
  "ellie holcomb.jpg": "Ellie Holcomb",
  "chris tomlin .jpg": "Chris Tomlin",
  "naomi raine.jpg": "Naomi Raine",
  "jordan smith.jpg": "Jordan Smith",
  "cece winans .webp": "CeCe Winans",
  "kari jobe.jpg": "Kari Jobe",
};

async function createBucketIfNeeded() {
  const { data: buckets } = await supabase.storage.listBuckets();
  const exists = buckets?.some((b) => b.name === BUCKET);
  if (!exists) {
    const { error } = await supabase.storage.createBucket(BUCKET, {
      public: true,
    });
    if (error) {
      console.error("Failed to create bucket:", error.message);
      process.exit(1);
    }
    console.log(`Created bucket: ${BUCKET}`);
  } else {
    console.log(`Bucket exists: ${BUCKET}`);
  }
}

async function upload() {
  await createBucketIfNeeded();

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

    const contentType =
      ext === ".webp" ? "image/webp" :
      ext === ".png" ? "image/png" :
      "image/jpeg";

    // Upload to storage
    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(storagePath, fileBuffer, {
        contentType,
        upsert: true,
      });

    if (uploadError) {
      console.error(`  Upload error (${artistName}):`, uploadError.message);
      continue;
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(BUCKET)
      .getPublicUrl(storagePath);

    // Update artist record
    const { error: updateError } = await supabase
      .from("artists")
      .update({ photo_url: urlData.publicUrl })
      .eq("name", artistName);

    if (updateError) {
      console.error(`  DB update error (${artistName}):`, updateError.message);
    } else {
      console.log(`  Uploaded & updated: ${artistName} → ${storagePath}`);
      uploaded++;
    }
  }

  console.log(`\nDone! ${uploaded}/${Object.keys(fileToArtist).length} artists updated.`);
}

upload();
