import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/image-upload";
import { ArtistSelect } from "@/components/artist-select";

export default async function AdminReleasesPage() {
  const supabase = await createClient();

  const [{ data: albums }, { data: singles }, { data: artists }] =
    await Promise.all([
      supabase
        .from("albums")
        .select("*, artists(name)")
        .order("release_date", { ascending: false }),
      supabase
        .from("singles")
        .select("*, artists(name)")
        .order("release_date", { ascending: false }),
      supabase.from("artists").select("id, name").order("name"),
    ]);

  async function addAlbum(formData: FormData) {
    "use server";
    const supabase = await createClient();
    const artistId = (formData.get("artist_id") as string) || null;
    const artistName = (formData.get("artist_name") as string)?.trim() || null;
    // Need either an existing artist or a typed name
    if (!artistId && !artistName) return;
    await supabase.from("albums").insert({
      artist_id: artistId,
      artist_name: artistName || null,
      title: formData.get("title") as string,
      release_date: (formData.get("release_date") as string) || null,
      cover_url: (formData.get("cover_url") as string) || null,
      url_apple_music: (formData.get("url_apple_music") as string) || null,
      url_spotify: (formData.get("url_spotify") as string) || null,
      is_new: formData.get("is_new") === "on",
    });
    revalidatePath("/admin/releases");
    revalidatePath("/releases");
  }

  async function addSingle(formData: FormData) {
    "use server";
    const supabase = await createClient();
    const artistId = (formData.get("artist_id") as string) || null;
    const artistName = (formData.get("artist_name") as string)?.trim() || null;
    if (!artistId && !artistName) return;
    await supabase.from("singles").insert({
      artist_id: artistId,
      artist_name: artistName || null,
      title: formData.get("title") as string,
      release_date: (formData.get("release_date") as string) || null,
      url_apple_music: (formData.get("url_apple_music") as string) || null,
      url_spotify: (formData.get("url_spotify") as string) || null,
      url_youtube: (formData.get("url_youtube") as string) || null,
      is_new: formData.get("is_new") === "on",
    });
    revalidatePath("/admin/releases");
    revalidatePath("/releases");
  }

  async function updateCoverUrl(formData: FormData) {
    "use server";
    const supabase = await createClient();
    const albumId = formData.get("id") as string;
    const coverUrl = (formData.get("cover_url") as string) || null;
    await supabase.from("albums").update({ cover_url: coverUrl }).eq("id", albumId);
    revalidatePath("/admin/releases");
    revalidatePath("/releases");
  }

  async function deleteRelease(formData: FormData) {
    "use server";
    const supabase = await createClient();
    const table = formData.get("table") as string;
    const releaseId = formData.get("id") as string;
    if (table === "albums") {
      await supabase.from("albums").delete().eq("id", releaseId);
    } else {
      await supabase.from("singles").delete().eq("id", releaseId);
    }
    revalidatePath("/admin/releases");
    revalidatePath("/releases");
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Releases</h2>

      {/* Add Album Form */}
      <details className="mb-6 rounded-lg border border-border p-4">
        <summary className="cursor-pointer font-medium">Add Album</summary>
        <form action={addAlbum} className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="space-y-1">
            <Label>Artist</Label>
            <ArtistSelect artists={artists || []} />
          </div>
          <div className="space-y-1">
            <Label>Title</Label>
            <Input name="title" required />
          </div>
          <div className="space-y-1">
            <Label>Release Date</Label>
            <Input name="release_date" type="date" />
          </div>
          <div className="space-y-1">
            <Label>Cover URL</Label>
            <Input name="cover_url" />
          </div>
          <div className="space-y-1">
            <Label>Apple Music URL</Label>
            <Input name="url_apple_music" />
          </div>
          <div className="space-y-1">
            <Label>Spotify URL</Label>
            <Input name="url_spotify" />
          </div>
          <div className="flex items-center gap-2 sm:col-span-2">
            <input type="checkbox" name="is_new" id="album_is_new" />
            <Label htmlFor="album_is_new">Mark as New</Label>
          </div>
          <Button type="submit" className="sm:col-span-2 w-fit">
            Add Album
          </Button>
        </form>
      </details>

      {/* Add Single Form */}
      <details className="mb-6 rounded-lg border border-border p-4">
        <summary className="cursor-pointer font-medium">Add Single</summary>
        <form action={addSingle} className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="space-y-1">
            <Label>Artist</Label>
            <ArtistSelect artists={artists || []} />
          </div>
          <div className="space-y-1">
            <Label>Title</Label>
            <Input name="title" required />
          </div>
          <div className="space-y-1">
            <Label>Release Date</Label>
            <Input name="release_date" type="date" />
          </div>
          <div className="space-y-1">
            <Label>Apple Music URL</Label>
            <Input name="url_apple_music" />
          </div>
          <div className="space-y-1">
            <Label>Spotify URL</Label>
            <Input name="url_spotify" />
          </div>
          <div className="space-y-1">
            <Label>YouTube URL</Label>
            <Input name="url_youtube" />
          </div>
          <div className="flex items-center gap-2 sm:col-span-2">
            <input type="checkbox" name="is_new" id="single_is_new" />
            <Label htmlFor="single_is_new">Mark as New</Label>
          </div>
          <Button type="submit" className="sm:col-span-2 w-fit">
            Add Single
          </Button>
        </form>
      </details>

      {/* Albums List */}
      <h3 className="text-lg font-semibold mb-3">Albums</h3>
      <div className="space-y-3 mb-8">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {albums?.map((album: any) => (
          <div key={album.id} className="rounded-lg border border-border p-4">
            <div className="flex items-start gap-4">
              {/* Cover upload */}
              <ImageUpload
                bucket="album-covers"
                table="albums"
                recordId={album.id}
                field="cover_url"
                currentUrl={album.cover_url}
                slug={`${(album.artist_name || album.artists?.name || "unknown").toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${album.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium truncate">{album.title}</h4>
                  {album.is_new && <Badge className="text-xs bg-primary/20 text-primary">New</Badge>}
                </div>
                <p className="text-sm text-muted-foreground">{album.artist_name || album.artists?.name} &middot; {album.release_date}</p>
              </div>
              <form action={deleteRelease}>
                <input type="hidden" name="table" value="albums" />
                <input type="hidden" name="id" value={album.id} />
                <Button variant="ghost" size="sm" type="submit" className="text-destructive shrink-0">Delete</Button>
              </form>
            </div>
          </div>
        ))}
      </div>

      {/* Singles List */}
      <h3 className="text-lg font-semibold mb-3">Singles</h3>
      <div className="rounded-lg border border-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-card">
              <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                Title
              </th>
              <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                Artist
              </th>
              <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                Date
              </th>
              <th className="text-right p-3 text-sm font-medium text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {singles?.map((single: any) => (
              <tr
                key={single.id}
                className="border-b border-border last:border-0"
              >
                <td className="p-3 font-medium">
                  {single.title}
                  {single.is_new && (
                    <Badge className="ml-2 text-xs bg-primary/20 text-primary">
                      New
                    </Badge>
                  )}
                </td>
                <td className="p-3 text-muted-foreground">
                  {single.artists?.name}
                </td>
                <td className="p-3 text-muted-foreground">
                  {single.release_date}
                </td>
                <td className="p-3 text-right">
                  <form action={deleteRelease} className="inline">
                    <input type="hidden" name="table" value="singles" />
                    <input type="hidden" name="id" value={single.id} />
                    <Button
                      variant="ghost"
                      size="sm"
                      type="submit"
                      className="text-destructive"
                    >
                      Delete
                    </Button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
