import { createPublicClient } from "@/lib/supabase/public";
import { ReleaseCard } from "@/components/release-card";
import Link from "next/link";

type ReleaseItem = {
  type: "album" | "single";
  id: string;
  title: string;
  release_date: string | null;
  cover_url?: string | null;
  url_apple_music?: string | null;
  url_spotify?: string | null;
  url_youtube?: string | null;
  is_new: boolean;
  artist_name: string;
  artist_id: string;
};

export default async function ReleasesPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab } = await searchParams;
  const supabase = createPublicClient();

  const showAlbums = tab !== "singles";
  const showSingles = tab !== "albums";

  const [albumsResult, singlesResult] = await Promise.all([
    showAlbums
      ? supabase
          .from("albums")
          .select("*, artists(id, name)")
          .order("release_date", { ascending: false })
          .limit(50)
      : Promise.resolve({ data: [] }),
    showSingles
      ? supabase
          .from("singles")
          .select("*, artists(id, name)")
          .order("release_date", { ascending: false })
          .limit(50)
      : Promise.resolve({ data: [] }),
  ]);

  const albums = albumsResult.data ?? [];
  const singles = singlesResult.data ?? [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const allReleases: ReleaseItem[] = [
    ...albums.map((a: any) => ({
      type: "album" as const,
      id: a.id,
      title: a.title,
      release_date: a.release_date,
      cover_url: a.cover_url,
      url_apple_music: a.url_apple_music,
      url_spotify: a.url_spotify,
      is_new: a.is_new,
      artist_name: a.artist_name || a.artists?.name || "Unknown",
      artist_id: a.artist_id || a.artists?.id || "",
    })),
    ...singles.map((s: any) => ({
      type: "single" as const,
      id: s.id,
      title: s.title,
      release_date: s.release_date,
      url_apple_music: s.url_apple_music,
      url_spotify: s.url_spotify,
      url_youtube: s.url_youtube,
      is_new: s.is_new,
      artist_name: s.artist_name || s.artists?.name || "Unknown",
      artist_id: s.artist_id || s.artists?.id || "",
    })),
  ].sort((a, b) => {
    if (!a.release_date) return 1;
    if (!b.release_date) return -1;
    return (
      new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
    );
  });

  const tabs = [
    { label: "All", value: undefined },
    { label: "Albums", value: "albums" },
    { label: "Singles", value: "singles" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-4xl font-bold leading-[0.9] mb-8">New Releases</h1>

      <div className="flex gap-2 mb-8">
        {tabs.map((t) => (
          <Link
            key={t.label}
            href={t.value ? `/releases?tab=${t.value}` : "/releases"}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
              tab === t.value || (!tab && !t.value)
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:border-primary hover:text-foreground"
            }`}
          >
            {t.label}
          </Link>
        ))}
      </div>

      {allReleases.length > 0 ? (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {allReleases.map((release) => (
            <ReleaseCard key={`${release.type}-${release.id}`} {...release} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No releases found.</p>
      )}
    </div>
  );
}
