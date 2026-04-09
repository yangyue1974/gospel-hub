import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [artists, albums, singles, concerts] = await Promise.all([
    supabase.from("artists").select("id", { count: "exact" }),
    supabase.from("albums").select("id", { count: "exact" }),
    supabase.from("singles").select("id", { count: "exact" }),
    supabase.from("concerts").select("id", { count: "exact" }),
  ]);

  const stats = [
    { label: "Artists", count: artists.count ?? 0, href: "/admin/artists" },
    { label: "Albums", count: albums.count ?? 0, href: "/admin/releases" },
    { label: "Singles", count: singles.count ?? 0, href: "/admin/releases" },
    { label: "Concerts", count: concerts.count ?? 0, href: "/admin/concerts" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
      <div className="grid gap-4 sm:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <div className="rounded-lg border border-border bg-card p-6 hover:border-primary/50 transition-colors">
              <p className="text-3xl font-semibold text-primary">
                {stat.count}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {stat.label}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
