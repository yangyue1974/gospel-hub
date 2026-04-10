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
            <div className="mt-3 flex flex-col gap-1">
              <Link
                href="/artists"
                className="text-sm text-foreground/80 hover:text-primary transition-colors py-1.5"
              >
                Artists
              </Link>
              <Link
                href="/releases"
                className="text-sm text-foreground/80 hover:text-primary transition-colors py-1.5"
              >
                New Releases
              </Link>
              <Link
                href="/concerts"
                className="text-sm text-foreground/80 hover:text-primary transition-colors py-1.5"
              >
                Concerts
              </Link>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Support
            </h4>
            <p className="mt-3 text-sm text-muted-foreground">
              Gospel Hub is free to use. If you enjoy this resource, consider supporting us with a donation.
            </p>
            <a
              href="https://paypal.me/yangyue1974"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797H9.603c-.564 0-1.04.408-1.13.964L7.076 21.337z" />
              </svg>
              Donate via PayPal
            </a>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Gospel Hub. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
