import Link from "next/link";
import { createPublicClient } from "@/lib/supabase/public";
import { ArtistCard } from "@/components/artist-card";
import { Button } from "@/components/ui/button";
import { Music, Radio, Calendar } from "lucide-react";

export default async function HomePage() {
  const supabase = createPublicClient();

  const { data: artists } = await supabase
    .from("artists")
    .select("*")
    .eq("status", "published")
    .limit(8)
    .order("name");

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
      <section className="py-20 sm:py-32 px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-5xl sm:text-7xl font-bold leading-[0.9] tracking-tight">
            Your Home for
            <br />
            <span className="text-primary">Gospel Music</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
            Discover artists, track new releases, and find upcoming concerts
            &mdash; all in one place.
          </p>
          <div className="mt-8 flex justify-center gap-3">
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
