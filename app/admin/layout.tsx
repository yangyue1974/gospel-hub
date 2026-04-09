import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="flex items-center justify-between mb-8 border-b border-border pb-4">
        <div className="flex items-center gap-6">
          <h1 className="text-xl font-semibold">Admin</h1>
          <nav className="flex gap-4 text-sm">
            <Link
              href="/admin/artists"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Artists
            </Link>
            <Link
              href="/admin/releases"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Releases
            </Link>
            <Link
              href="/admin/concerts"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Concerts
            </Link>
          </nav>
        </div>
        <form action="/api/auth/signout" method="post">
          <Button variant="ghost" size="sm" type="submit">
            Sign Out
          </Button>
        </form>
      </div>
      {children}
    </div>
  );
}
