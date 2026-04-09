import { createClient } from "@/lib/supabase/server";
import { ArtistCard } from "@/components/artist-card";
import Link from "next/link";

export default async function ArtistsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from("artists")
    .select("*")
    .eq("status", "published")
    .order("name");

  if (type === "band" || type === "solo") {
    query = query.eq("type", type);
  }

  const { data: artists } = await query;

  const filters = [
    { label: "All", value: undefined },
    { label: "Bands", value: "band" },
    { label: "Solo", value: "solo" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-4xl font-bold leading-[0.9] mb-8">Artists</h1>

      <div className="flex gap-2 mb-8">
        {filters.map((f) => (
          <Link
            key={f.label}
            href={f.value ? `/artists?type=${f.value}` : "/artists"}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
              type === f.value || (!type && !f.value)
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:border-primary hover:text-foreground"
            }`}
          >
            {f.label}
          </Link>
        ))}
      </div>

      {artists && artists.length > 0 ? (
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {artists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No artists found.</p>
      )}
    </div>
  );
}
