"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Heart } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { href: "/artists", label: "Artists" },
  { href: "/releases", label: "New Releases" },
  { href: "/concerts", label: "Concerts" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (pathname.startsWith("/admin")) return null;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2v20M5 9h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-primary-foreground" />
              <circle cx="12" cy="9" r="4" stroke="currentColor" strokeWidth="2" className="text-primary-foreground" opacity="0.4" />
            </svg>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-base font-bold tracking-tight text-foreground">Gospel Hub</span>
            <span className="text-[10px] font-medium tracking-widest uppercase text-primary/70">Worship &amp; Music</span>
          </div>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              style={
                pathname === link.href
                  ? {
                      boxShadow:
                        "oklch(0.75 0.12 75) 0px -2px 0px 0px inset",
                    }
                  : undefined
              }
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://paypal.me/yangyue1974"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
          >
            <Heart className="h-3 w-3" />
            Donate
          </a>
        </div>

        {/* Mobile */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
            <Menu className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent side="right" className="w-64">
            <div className="flex flex-col gap-4 mt-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`text-lg font-medium ${
                    pathname === link.href
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://paypal.me/yangyue1974"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-lg font-medium text-primary"
              >
                <Heart className="h-4 w-4" />
                Donate
              </a>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
