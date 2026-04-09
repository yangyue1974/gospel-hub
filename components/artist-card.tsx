import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Artist } from "@/lib/types";

export function ArtistCard({ artist }: { artist: Artist }) {
  return (
    <Link href={`/artists/${artist.id}`} className="group">
      <div className="overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-primary/50">
        <div className="aspect-square bg-muted relative">
          {artist.photo_url ? (
            <img
              src={artist.photo_url}
              alt={artist.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-4xl text-muted-foreground">
              {artist.name[0]}
            </div>
          )}
        </div>
        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
            {artist.name}
          </h3>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {artist.type === "band" ? "Band" : "Solo"}
            </Badge>
            {artist.church_label && (
              <span className="text-xs text-muted-foreground truncate">
                {artist.church_label}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
