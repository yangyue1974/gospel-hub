import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { StreamingLinks } from "@/components/streaming-links";

type ReleaseCardProps = {
  type: "album" | "single";
  title: string;
  artist_name: string;
  artist_id: string;
  release_date: string | null;
  cover_url?: string | null;
  url_apple_music?: string | null;
  url_spotify?: string | null;
  url_youtube?: string | null;
  is_new: boolean;
};

export function ReleaseCard(props: ReleaseCardProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <div className="aspect-square bg-muted">
        {props.cover_url ? (
          <img
            src={props.cover_url}
            alt={props.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-3xl text-muted-foreground">
            {props.type === "album" ? "\uD83D\uDCBF" : "\uD83C\uDFB5"}
          </div>
        )}
      </div>
      <div className="p-4 space-y-2">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold truncate">{props.title}</h3>
          {props.is_new && (
            <Badge className="bg-primary text-primary-foreground text-xs shrink-0">
              New
            </Badge>
          )}
        </div>
        <Link
          href={`/artists/${props.artist_id}`}
          className="block text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          {props.artist_name}
        </Link>
        {props.release_date && (
          <p className="text-xs text-muted-foreground">
            {new Date(props.release_date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        )}
        <StreamingLinks
          apple_music={props.url_apple_music}
          spotify={props.url_spotify}
          youtube={props.url_youtube}
        />
      </div>
    </div>
  );
}
