import Link from "next/link";
import { createPublicClient } from "@/lib/supabase/public";
import { ArtistCard } from "@/components/artist-card";
import { Button } from "@/components/ui/button";
import { Music, Radio, Calendar } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const supabase = createPublicClient();

  const today = new Date().toISOString().split("T")[0];

  const [
    { data: artists },
    { count: artistCount },
    { count: albumCount },
    { data: concertData },
  ] = await Promise.all([
    supabase
      .from("artists")
      .select("*")
      .eq("status", "published")
      .limit(8)
      .order("name"),
    supabase
      .from("artists")
      .select("id", { count: "exact", head: true })
      .eq("status", "published"),
    supabase
      .from("albums")
      .select("id", { count: "exact", head: true }),
    supabase
      .from("concerts")
      .select("artist_name, title, url_tickets")
      .gte("event_date", today),
  ]);

  // Count unique tours (same artist + title + ticket URL = one tour)
  const tourSet = new Set<string>();
  concertData?.forEach((c: any) => {
    tourSet.add(`${c.artist_name}::${c.title}::${c.url_tickets}`);
  });
  const concertCount = tourSet.size;

  const modules = [
    {
      title: "Artist Directory",
      description:
        "Explore our curated collection of contemporary gospel music artists and bands.",
      href: "/artists",
      icon: <Music className="h-6 w-6" />,
    },
    {
      title: "New Releases",
      description:
        "Stay updated with the latest albums and singles from your favorite artists.",
      href: "/releases",
      icon: <Radio className="h-6 w-6" />,
    },
    {
      title: "Concerts & Events",
      description:
        "Find upcoming concerts, tours, and gospel music events near you.",
      href: "/concerts",
      icon: <Calendar className="h-6 w-6" />,
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative py-20 sm:py-32 px-4 overflow-hidden">
        {/* Background pattern + glow */}
        <div className="absolute inset-0 -z-10">
          {/* Gold radial glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/8 rounded-full blur-[120px]" />
          {/* Secondary glow */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary/4 rounded-full blur-[80px]" />
          {/* Cross pattern SVG */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="crosses" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M30 20v20M20 30h20" stroke="currentColor" strokeWidth="1" fill="none" className="text-primary" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#crosses)" />
          </svg>
          {/* Subtle grid dots */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="1" fill="currentColor" className="text-primary" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>

        <div className="mx-auto max-w-3xl text-center relative">
          {/* Small label above title */}
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 mb-8">
            <Music className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-medium text-primary tracking-wider uppercase">
              Contemporary Worship &amp; Gospel
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[0.9] tracking-tight">
            Your Home for
            <br />
            <span className="text-primary">Gospel Music</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
            Discover artists, track new releases, and find upcoming concerts
            &mdash; all in one place.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <Link href="/artists">
              <Button size="lg" className="text-base px-6">
                Explore Artists
              </Button>
            </Link>
            <Link href="/releases">
              <Button size="lg" variant="outline" className="text-base px-6">
                New Releases
              </Button>
            </Link>
          </div>

          {/* Stats row */}
          <div className="mt-16 flex justify-center gap-6 sm:gap-16">
            <Link href="/artists" className="text-center group">
              <p className="text-3xl font-bold text-primary group-hover:opacity-80 transition-opacity">{artistCount ?? 0}</p>
              <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">Artists</p>
            </Link>
            <Link href="/releases" className="text-center group">
              <p className="text-3xl font-bold text-primary group-hover:opacity-80 transition-opacity">{albumCount ?? 0}</p>
              <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">New Albums</p>
            </Link>
            <Link href="/concerts" className="text-center group">
              <p className="text-3xl font-bold text-primary group-hover:opacity-80 transition-opacity">{concertCount}</p>
              <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">Tours</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Module Cards */}
      <section className="px-4 pb-16">
        <div className="mx-auto max-w-6xl grid gap-4 sm:grid-cols-3">
          {modules.map((mod) => (
            <Link key={mod.href} href={mod.href} className="group">
              <div className="rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary/50 h-full">
                <div className="text-primary mb-3">{mod.icon}</div>
                <h2 className="text-lg font-semibold group-hover:text-primary transition-colors">
                  {mod.title}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {mod.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Artists */}
      {artists && artists.length > 0 && (
        <section className="px-4 pb-20">
          <div className="mx-auto max-w-6xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Featured Artists</h2>
              <Link
                href="/artists"
                className="text-sm text-primary hover:underline"
              >
                View all &rarr;
              </Link>
            </div>
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
              {artists.map((artist) => (
                <ArtistCard key={artist.id} artist={artist} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
