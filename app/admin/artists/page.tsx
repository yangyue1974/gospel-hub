import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default async function AdminArtistsPage() {
  const supabase = await createClient();
  const { data: artists } = await supabase
    .from("artists")
    .select("*")
    .order("name");

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Artists</h2>
        <Link href="/admin/artists/new">
          <Button>Add Artist</Button>
        </Link>
      </div>

      <div className="rounded-lg border border-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-card">
              <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                Name
              </th>
              <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                Type
              </th>
              <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                Status
              </th>
              <th className="text-right p-3 text-sm font-medium text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {artists?.map((artist) => (
              <tr
                key={artist.id}
                className="border-b border-border last:border-0"
              >
                <td className="p-3 font-medium">{artist.name}</td>
                <td className="p-3">
                  <Badge variant="outline" className="text-xs">
                    {artist.type === "band" ? "Band" : "Solo"}
                  </Badge>
                </td>
                <td className="p-3">
                  <Badge
                    className={`text-xs ${
                      artist.status === "published"
                        ? "bg-green-900/50 text-green-400 border-green-800"
                        : "bg-yellow-900/50 text-yellow-400 border-yellow-800"
                    }`}
                    variant="outline"
                  >
                    {artist.status}
                  </Badge>
                </td>
                <td className="p-3 text-right">
                  <Link href={`/admin/artists/${artist.id}`}>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
