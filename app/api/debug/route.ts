import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return NextResponse.json({
      error: "Missing env vars",
      hasUrl: !!url,
      hasKey: !!key,
    });
  }

  try {
    const supabase = createClient(url, key);
    const { data, error, count } = await supabase
      .from("artists")
      .select("name, status", { count: "exact" })
      .limit(3);

    return NextResponse.json({
      success: !error,
      error: error?.message,
      count,
      sample: data,
      urlPrefix: url.substring(0, 30),
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message });
  }
}
