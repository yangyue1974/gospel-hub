import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold text-primary">Gospel Hub</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Your home for contemporary gospel music.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Explore
            </h4>
            <div className="mt-3 flex flex-col gap-2">
              <Link
                href="/artists"
                className="text-sm text-foreground/80 hover:text-primary transition-colors"
              >
                Artists
              </Link>
              <Link
                href="/releases"
                className="text-sm text-foreground/80 hover:text-primary transition-colors"
              >
                New Releases
              </Link>
              <Link
                href="/concerts"
                className="text-sm text-foreground/80 hover:text-primary transition-colors"
              >
                Concerts
              </Link>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              About
            </h4>
            <p className="mt-3 text-sm text-muted-foreground">
              Gospel Hub aggregates information about contemporary gospel music
              artists, releases, and events. Free to use, supported by
              donations.
            </p>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Gospel Hub. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
