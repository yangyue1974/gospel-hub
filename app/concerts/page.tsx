import { createPublicClient } from "@/lib/supabase/public";
import Link from "next/link";
import { Calendar, MapPin, Ticket, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

type TourGroup = {
  artist_name: string;
  artist_id: string;
  title: string;
  date_start: string;
  date_end: string;
  show_count: number;
  cities: string[];
  url_tickets: string | null;
  url_info: string | null;
};

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function formatDateFull(d: string) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export const dynamic = "force-dynamic";

export default async function ConcertsPage() {
  const supabase = createPublicClient();
  const today = new Date().toISOString().split("T")[0];

  const { data: concerts } = await supabase
    .from("concerts")
    .select("*, artists(id, name)")
    .gte("event_date", today)
    .order("event_date");

  // Group by artist + tour title + ticket URL
  const groupMap = new Map<string, TourGroup>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  concerts?.forEach((c: any) => {
    const artistName = c.artist_name || c.artists?.name || "Unknown";
    const artistId = c.artist_id || c.artists?.id || "";
    const title = c.title || "Concert";
    const key = `${artistName}::${title}::${c.url_tickets || ""}`;

    if (!groupMap.has(key)) {
      groupMap.set(key, {
        artist_name: artistName,
        artist_id: artistId,
        title,
        date_start: c.event_date,
        date_end: c.event_date,
        show_count: 1,
        cities: c.city ? [c.city] : [],
        url_tickets: c.url_tickets,
        url_info: c.url_info,
      });
    } else {
      const group = groupMap.get(key)!;
      if (c.event_date < group.date_start) group.date_start = c.event_date;
      if (c.event_date > group.date_end) group.date_end = c.event_date;
      group.show_count++;
      if (c.city && !group.cities.includes(c.city)) {
        group.cities.push(c.city);
      }
    }
  });

  const tours = Array.from(groupMap.values()).sort(
    (a, b) => new Date(a.date_start).getTime() - new Date(b.date_start).getTime()
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-4xl font-bold leading-[0.9] mb-8">
        Concerts &amp; Events
      </h1>

      {tours.length > 0 ? (
        <div className="space-y-3">
          {tours.map((tour, i) => {
            const sameDate = tour.date_start === tour.date_end;
            const dateDisplay = sameDate
              ? formatDateFull(tour.date_start)
              : `${formatDate(tour.date_start)} – ${formatDateFull(tour.date_end)}`;

            // Show up to 5 cities, then "+ N more"
            const maxCities = 5;
            const displayCities = tour.cities.slice(0, maxCities);
            const moreCities = tour.cities.length > maxCities ? tour.cities.length - maxCities : 0;

            return (
              <div
                key={i}
                className="rounded-lg border border-border bg-card p-4 sm:p-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <h3 className="font-semibold">{tour.title}</h3>
                  <Link
                    href={tour.artist_id ? `/artists/${tour.artist_id}` : "#"}
                    className="text-sm text-primary hover:underline"
                  >
                    {tour.artist_name}
                  </Link>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 shrink-0" />
                      {dateDisplay}
                      {tour.show_count > 1 && (
                        <span className="text-xs text-muted-foreground/60">
                          · {tour.show_count} shows
                        </span>
                      )}
                    </span>
                  </div>
                  {displayCities.length > 0 && (
                    <div className="flex items-start gap-1.5 text-sm text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                      <span>
                        {displayCities.join(", ")}
                        {moreCities > 0 && ` + ${moreCities} more`}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex gap-2 w-full sm:w-auto sm:shrink-0">
                  {tour.url_tickets && (
                    <a href={tour.url_tickets} target="_blank" rel="noopener noreferrer" className="flex-1 sm:flex-none">
                      <Button size="sm" className="gap-1.5 w-full sm:w-auto">
                        <Ticket className="h-3.5 w-3.5" />
                        Tickets
                      </Button>
                    </a>
                  )}
                  {tour.url_info && (
                    <a href={tour.url_info} target="_blank" rel="noopener noreferrer" className="flex-1 sm:flex-none">
                      <Button size="sm" variant="outline" className="gap-1.5 w-full sm:w-auto">
                        <ExternalLink className="h-3.5 w-3.5" />
                        Info
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-muted-foreground">No upcoming events.</p>
      )}
    </div>
  );
}
