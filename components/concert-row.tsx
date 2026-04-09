import Link from "next/link";
import { Calendar, MapPin, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";

type ConcertRowProps = {
  title: string | null;
  artist_name: string;
  artist_id: string;
  venue: string | null;
  city: string | null;
  country: string | null;
  event_date: string | null;
  url_tickets: string | null;
  url_info: string | null;
};

export function ConcertRow(props: ConcertRowProps) {
  const location = [props.city, props.country].filter(Boolean).join(", ");

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-1 flex-1 min-w-0">
        <h3 className="font-semibold truncate">
          {props.title || "Concert"}
        </h3>
        <Link
          href={`/artists/${props.artist_id}`}
          className="text-sm text-primary hover:underline"
        >
          {props.artist_name}
        </Link>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
          {props.event_date && (
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {new Date(props.event_date).toLocaleDateString("en-US", {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          )}
          {(props.venue || location) && (
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {[props.venue, location].filter(Boolean).join(" \u00B7 ")}
            </span>
          )}
        </div>
      </div>
      <div className="flex gap-2 shrink-0">
        {props.url_tickets && (
          <a href={props.url_tickets} target="_blank" rel="noopener noreferrer">
            <Button size="sm" className="gap-1.5">
              <Ticket className="h-3.5 w-3.5" />
              Tickets
            </Button>
          </a>
        )}
        {props.url_info && (
          <a href={props.url_info} target="_blank" rel="noopener noreferrer">
            <Button size="sm" variant="outline">
              Info
            </Button>
          </a>
        )}
      </div>
    </div>
  );
}
