import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function AdminConcertsPage() {
  const supabase = await createClient();

  const [{ data: concerts }, { data: artists }] = await Promise.all([
    supabase
      .from("concerts")
      .select("*, artists(name)")
      .order("event_date", { ascending: false }),
    supabase.from("artists").select("id, name").order("name"),
  ]);

  async function addConcert(formData: FormData) {
    "use server";
    const supabase = await createClient();
    await supabase.from("concerts").insert({
      artist_id: formData.get("artist_id") as string,
      title: (formData.get("title") as string) || null,
      venue: (formData.get("venue") as string) || null,
      city: (formData.get("city") as string) || null,
      country: (formData.get("country") as string) || null,
      event_date: (formData.get("event_date") as string) || null,
      url_tickets: (formData.get("url_tickets") as string) || null,
      url_info: (formData.get("url_info") as string) || null,
    });
    revalidatePath("/admin/concerts");
    revalidatePath("/concerts");
  }

  async function deleteConcert(formData: FormData) {
    "use server";
    const supabase = await createClient();
    await supabase
      .from("concerts")
      .delete()
      .eq("id", formData.get("id") as string);
    revalidatePath("/admin/concerts");
    revalidatePath("/concerts");
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Concerts & Events</h2>

      <details className="mb-6 rounded-lg border border-border p-4">
        <summary className="cursor-pointer font-medium">Add Concert</summary>
        <form action={addConcert} className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="space-y-1">
            <Label>Artist</Label>
            <select
              name="artist_id"
              required
              className="w-full rounded border border-border bg-background px-3 py-2 text-sm"
            >
              <option value="">Select artist...</option>
              {artists?.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <Label>Title</Label>
            <Input name="title" />
          </div>
          <div className="space-y-1">
            <Label>Venue</Label>
            <Input name="venue" />
          </div>
          <div className="space-y-1">
            <Label>City</Label>
            <Input name="city" />
          </div>
          <div className="space-y-1">
            <Label>Country</Label>
            <Input name="country" />
          </div>
          <div className="space-y-1">
            <Label>Date</Label>
            <Input name="event_date" type="date" />
          </div>
          <div className="space-y-1">
            <Label>Tickets URL</Label>
            <Input name="url_tickets" />
          </div>
          <div className="space-y-1">
            <Label>Info URL</Label>
            <Input name="url_info" />
          </div>
          <Button type="submit" className="sm:col-span-2 w-fit">
            Add Concert
          </Button>
        </form>
      </details>

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
                Venue
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
            {concerts?.map((concert: any) => (
              <tr
                key={concert.id}
                className="border-b border-border last:border-0"
              >
                <td className="p-3 font-medium">
                  {concert.title || "\u2014"}
                </td>
                <td className="p-3 text-muted-foreground">
                  {concert.artists?.name}
                </td>
                <td className="p-3 text-muted-foreground">
                  {[concert.venue, concert.city].filter(Boolean).join(", ") ||
                    "\u2014"}
                </td>
                <td className="p-3 text-muted-foreground">
                  {concert.event_date || "\u2014"}
                </td>
                <td className="p-3 text-right">
                  <form action={deleteConcert} className="inline">
                    <input type="hidden" name="id" value={concert.id} />
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
