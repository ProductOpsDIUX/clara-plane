const navLinks = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#why-clara", label: "Why CLARA" },
  { href: "#artefacts", label: "Artefacts" },
  { href: "#deploy", label: "Deploy" },
];

export function TopNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6 sm:px-8">
        <a
          href="#top"
          className="font-semibold tracking-tight text-fg text-base hover:text-accent transition-colors"
          aria-label="CLARA home"
        >
          CLARA
        </a>

        <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-3 py-2 text-sm text-fg-muted hover:text-fg transition-colors rounded-md"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
