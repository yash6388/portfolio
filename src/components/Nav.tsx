"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export function Nav({ name, role }: { name: string; role: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open ? "border-line bg-background/90 backdrop-blur-md" : "border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="flex items-baseline gap-2.5" aria-label="Back to top">
          <span className="font-serif text-xl leading-none">{name}</span>
          <span className="hidden font-mono text-[11px] text-muted sm:inline">/ {role}</span>
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="link-underline font-mono text-xs text-muted transition hover:text-foreground">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setOpen((v) => !v)}
          className="-mr-2 p-2 text-muted transition hover:text-foreground md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {open && (
        <ul className="border-t border-line px-5 pb-4 pt-1 md:hidden">
          {LINKS.map((l, i) => (
            <li key={l.href} className="border-b border-line last:border-0">
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-3 py-3.5 text-base"
              >
                <span className="font-mono text-[11px] text-muted">0{i + 1}</span>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
