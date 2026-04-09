import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// A simple Supabase client for public read-only queries in server components.
// Does not depend on cookies, avoiding SSR issues on Vercel.
export function createPublicClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
