import { Music, Play } from "lucide-react";

type StreamingLinksProps = {
  apple_music?: string | null;
  spotify?: string | null;
  youtube?: string | null;
  size?: "sm" | "md";
};

export function StreamingLinks({
  apple_music,
  spotify,
  youtube,
  size = "sm",
}: StreamingLinksProps) {
  const iconSize = size === "sm" ? "h-4 w-4" : "h-5 w-5";
  const links = [
    { url: apple_music, label: "Apple Music", icon: <Music className={iconSize} /> },
    { url: spotify, label: "Spotify", icon: <Music className={iconSize} /> },
    { url: youtube, label: "YouTube", icon: <Play className={iconSize} /> },
  ].filter((l) => l.url);

  if (links.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.url!}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-2 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          title={link.label}
        >
          {link.icon}
          <span>{link.label}</span>
        </a>
      ))}
    </div>
  );
}
