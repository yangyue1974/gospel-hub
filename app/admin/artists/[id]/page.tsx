import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = { params: Promise<{ id: string }> };

export default async function EditArtistPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const isNew = id === "new";

  let artist: Record<string, unknown> | null = null;
  if (!isNew) {
    const { data } = await supabase
      .from("artists")
      .select("*")
      .eq("id", id)
      .single();
    if (!data) notFound();
    artist = data;
  }

  async function saveArtist(formData: FormData) {
    "use server";
    const supabase = await createClient();

    const fields = {
      name: formData.get("name") as string,
      type: formData.get("type") as string,
      founded_year: formData.get("founded_year")
        ? Number(formData.get("founded_year"))
        : null,
      location: (formData.get("location") as string) || null,
      church_label: (formData.get("church_label") as string) || null,
      bio: (formData.get("bio") as string) || null,
      style: (formData.get("style") as string) || null,
      awards: (formData.get("awards") as string) || null,
      url_website: (formData.get("url_website") as string) || null,
      url_wiki: (formData.get("url_wiki") as string) || null,
      url_youtube: (formData.get("url_youtube") as string) || null,
      url_apple_music: (formData.get("url_apple_music") as string) || null,
      url_spotify: (formData.get("url_spotify") as string) || null,
      photo_url: (formData.get("photo_url") as string) || null,
    };

    if (isNew) {
      await supabase.from("artists").insert(fields);
    } else {
      await supabase.from("artists").update(fields).eq("id", id);
    }

    revalidatePath("/admin/artists");
    revalidatePath("/artists");
    redirect("/admin/artists");
  }

  async function togglePublish() {
    "use server";
    const supabase = await createClient();
    const { data: current } = await supabase
      .from("artists")
      .select("status")
      .eq("id", id)
      .single();
    const newStatus =
      current?.status === "published" ? "draft" : "published";
    await supabase.from("artists").update({ status: newStatus }).eq("id", id);
    revalidatePath("/admin/artists");
    revalidatePath("/artists");
    redirect("/admin/artists");
  }

  const textFields = [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "founded_year", label: "Founded Year", type: "number" },
    { name: "location", label: "Location", type: "text" },
    { name: "church_label", label: "Church / Label", type: "text" },
    { name: "style", label: "Style", type: "text" },
    { name: "awards", label: "Awards", type: "text" },
    { name: "photo_url", label: "Photo URL", type: "url" },
    { name: "url_website", label: "Website", type: "url" },
    { name: "url_wiki", label: "Wikipedia", type: "url" },
    { name: "url_youtube", label: "YouTube", type: "url" },
    { name: "url_apple_music", label: "Apple Music", type: "url" },
    { name: "url_spotify", label: "Spotify", type: "url" },
  ];

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">
          {isNew ? "Add Artist" : `Edit: ${(artist as any)?.name}`}
        </h2>
        {!isNew && (
          <form action={togglePublish}>
            <Button variant="outline" type="submit">
              {(artist as any)?.status === "published"
                ? "Unpublish"
                : "Publish"}
            </Button>
          </form>
        )}
      </div>

      <form action={saveArtist} className="space-y-4">
        {/* Type select */}
        <div className="space-y-2">
          <Label htmlFor="type">Type</Label>
          <Select
            name="type"
            defaultValue={(artist as any)?.type ?? "solo"}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="band">Band</SelectItem>
              <SelectItem value="solo">Solo</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Text fields */}
        {textFields.map((field) => (
          <div key={field.name} className="space-y-2">
            <Label htmlFor={field.name}>{field.label}</Label>
            <Input
              id={field.name}
              name={field.name}
              type={field.type}
              defaultValue={(artist as any)?.[field.name] ?? ""}
              required={field.required}
            />
          </div>
        ))}

        {/* Bio textarea */}
        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            name="bio"
            rows={6}
            defaultValue={(artist as any)?.bio ?? ""}
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="submit">
            {isNew ? "Create Artist" : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
