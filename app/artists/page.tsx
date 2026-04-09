import { createPublicClient } from "@/lib/supabase/public";
import { ArtistCard } from "@/components/artist-card";
import Link from "next/link";
import type { Artist } from "@/lib/types";

export default async function ArtistsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  const supabase = createPublicClient();

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

  // Group artists by first letter
  const grouped: Record<string, Artist[]> = {};
  artists?.forEach((artist) => {
    const firstChar = artist.name[0].toUpperCase();
    const letter = /[A-Z]/.test(firstChar) ? firstChar : "#";
    if (!grouped[letter]) grouped[letter] = [];
    grouped[letter].push(artist);
  });

  const sortedLetters = Object.keys(grouped).sort((a, b) => {
    if (a === "#") return 1;
    if (b === "#") return -1;
    return a.localeCompare(b);
  });

  // All possible letters for the index bar
  const allLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-4xl font-bold leading-[0.9] mb-8">Artists</h1>

      {/* Type filters */}
      <div className="flex gap-2 mb-6">
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

      {/* A-Z index bar */}
      <div className="flex flex-wrap gap-1 mb-8 sticky top-16 z-40 bg-background/90 backdrop-blur-sm py-2">
        {allLetters.map((letter) => {
          const hasArtists = grouped[letter] && grouped[letter].length > 0;
          return hasArtists ? (
            <a
              key={letter}
              href={`#letter-${letter}`}
              className="w-8 h-8 flex items-center justify-center rounded text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {letter}
            </a>
          ) : (
            <span
              key={letter}
              className="w-8 h-8 flex items-center justify-center rounded text-sm text-muted-foreground/30"
            >
              {letter}
            </span>
          );
        })}
      </div>

      {/* Artists grouped by letter */}
      {artists && artists.length > 0 ? (
        <div className="space-y-10">
          {sortedLetters.map((letter) => (
            <section key={letter} id={`letter-${letter}`} className="scroll-mt-28">
              <h2 className="text-2xl font-bold text-primary mb-4 border-b border-border pb-2">
                {letter}
              </h2>
              <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                {grouped[letter].map((artist) => (
                  <ArtistCard key={artist.id} artist={artist} />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No artists found.</p>
      )}
    </div>
  );
}
