import { createPublicClient } from "@/lib/supabase/public";
import { ConcertRow } from "@/components/concert-row";

export default async function ConcertsPage() {
  const supabase = createPublicClient();

  const today = new Date().toISOString().split("T")[0];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: concerts } = await supabase
    .from("concerts")
    .select("*, artists(id, name)")
    .gte("event_date", today)
    .order("event_date");

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-4xl font-bold leading-[0.9] mb-8">
        Concerts &amp; Events
      </h1>

      {concerts && concerts.length > 0 ? (
        <div className="space-y-3">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {concerts.map((concert: any) => (
            <ConcertRow
              key={concert.id}
              title={concert.title}
              artist_name={concert.artist_name || concert.artists?.name || "Unknown"}
              artist_id={concert.artist_id || concert.artists?.id || ""}
              venue={concert.venue}
              city={concert.city}
              country={concert.country}
              event_date={concert.event_date}
              url_tickets={concert.url_tickets}
              url_info={concert.url_info}
            />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No upcoming events.</p>
      )}
    </div>
  );
}
