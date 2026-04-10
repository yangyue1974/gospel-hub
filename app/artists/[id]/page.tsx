import { notFound } from "next/navigation";
import { createPublicClient } from "@/lib/supabase/public";
import { Badge } from "@/components/ui/badge";
import { StreamingLinks } from "@/components/streaming-links";
import { ReleaseCard } from "@/components/release-card";
import { ConcertRow } from "@/components/concert-row";
import { Globe, BookOpen } from "lucide-react";
import type { Metadata } from "next";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const supabase = createPublicClient();
  const { data: artist } = await supabase
    .from("artists")
    .select("name")
    .eq("id", id)
    .eq("status", "published")
    .single();

  return {
    title: artist ? `${artist.name} — Gospel Hub` : "Artist — Gospel Hub",
  };
}

export default async function ArtistDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = createPublicClient();

  const [
    { data: artist },
    { data: members },
    { data: albums },
    { data: singles },
    { data: concerts },
  ] = await Promise.all([
    supabase
      .from("artists")
      .select("*")
      .eq("id", id)
      .eq("status", "published")
      .single(),
    supabase
      .from("members")
      .select("*")
      .eq("artist_id", id)
      .order("is_core", { ascending: false }),
    supabase
      .from("albums")
      .select("*")
      .eq("artist_id", id)
      .order("release_date", { ascending: false }),
    supabase
      .from("singles")
      .select("*")
      .eq("artist_id", id)
      .order("release_date", { ascending: false }),
    supabase
      .from("concerts")
      .select("*")
      .eq("artist_id", id)
      .gte("event_date", new Date().toISOString().split("T")[0])
      .order("event_date"),
  ]);

  if (!artist) notFound();

  const externalLinks = [
    {
      url: artist.url_website,
      label: "Website",
      icon: <Globe className="h-4 w-4" />,
    },
    {
      url: artist.url_wiki,
      label: "Wikipedia",
      icon: <BookOpen className="h-4 w-4" />,
    },
  ].filter((l) => l.url);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-6 mb-8">
        <div className="w-40 sm:w-56 rounded-lg bg-muted overflow-hidden shrink-0 border border-border mx-auto sm:mx-0">
          {artist.photo_url ? (
            <img
              src={artist.photo_url}
              alt={artist.name}
              className="w-full h-auto object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-5xl text-muted-foreground">
              {artist.name[0]}
            </div>
          )}
        </div>
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-bold leading-[0.9]">{artist.name}</h1>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">
              {artist.type === "band" ? "Band" : "Solo Artist"}
            </Badge>
            {artist.church_label && (
              <Badge variant="secondary">{artist.church_label}</Badge>
            )}
            {artist.founded_year && (
              <span className="text-sm text-muted-foreground">
                Est. {artist.founded_year}
              </span>
            )}
            {artist.location && (
              <span className="text-sm text-muted-foreground">
                &middot; {artist.location}
              </span>
            )}
          </div>
          <StreamingLinks
            apple_music={artist.url_apple_music}
            spotify={artist.url_spotify}
            youtube={artist.url_youtube}
            size="md"
          />
          {externalLinks.length > 0 && (
            <div className="flex gap-3">
              {externalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.icon} {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bio */}
      {artist.bio && (
        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-3">About</h2>
          <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
            {artist.bio}
          </p>
        </section>
      )}

      {/* Style & Awards */}
      {(artist.style || artist.awards) && (
        <section className="mb-10 grid gap-6 sm:grid-cols-2">
          {artist.style && (
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Style
              </h3>
              <p className="text-foreground/80">{artist.style}</p>
            </div>
          )}
          {artist.awards && (
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Awards
              </h3>
              <p className="text-foreground/80">{artist.awards}</p>
            </div>
          )}
        </section>
      )}

      {/* Members */}
      {members && members.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-3">Members</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {members.map((member) => (
              <div
                key={member.id}
                className="flex items-center gap-3 rounded-lg border border-border p-3"
              >
                <div>
                  <p className="font-medium">{member.name}</p>
                  {member.role && (
                    <p className="text-sm text-muted-foreground">
                      {member.role}
                    </p>
                  )}
                </div>
                {!member.is_core && (
                  <Badge variant="outline" className="text-xs ml-auto">
                    Past
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Albums */}
      {albums && albums.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-3">Albums</h2>
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3">
            {albums.map((album) => (
              <ReleaseCard
                key={album.id}
                type="album"
                title={album.title}
                artist_name={artist.name}
                artist_id={artist.id}
                release_date={album.release_date}
                cover_url={album.cover_url}
                url_apple_music={album.url_apple_music}
                url_spotify={album.url_spotify}
                is_new={album.is_new}
              />
            ))}
          </div>
        </section>
      )}

      {/* Singles */}
      {singles && singles.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-3">Singles</h2>
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3">
            {singles.map((single) => (
              <ReleaseCard
                key={single.id}
                type="single"
                title={single.title}
                artist_name={artist.name}
                artist_id={artist.id}
                release_date={single.release_date}
                url_apple_music={single.url_apple_music}
                url_spotify={single.url_spotify}
                url_youtube={single.url_youtube}
                is_new={single.is_new}
              />
            ))}
          </div>
        </section>
      )}

      {/* Concerts */}
      {concerts && concerts.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-3">Upcoming Events</h2>
          <div className="space-y-3">
            {concerts.map((concert) => (
              <ConcertRow
                key={concert.id}
                title={concert.title}
                artist_name={artist.name}
                artist_id={artist.id}
                venue={concert.venue}
                city={concert.city}
                country={concert.country}
                event_date={concert.event_date}
                url_tickets={concert.url_tickets}
                url_info={concert.url_info}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
