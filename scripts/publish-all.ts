import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function publishAll() {
  const { data, error } = await supabase
    .from("artists")
    .update({ status: "published" })
    .eq("status", "draft")
    .select("name");

  if (error) {
    console.error("Error:", error.message);
  } else {
    console.log(`Published ${data.length} artists:`);
    data.forEach((a) => console.log(`  - ${a.name}`));
  }
}

publishAll();
