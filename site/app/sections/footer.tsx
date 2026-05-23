import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/ui/text";
import { links } from "@/content/links";
import { ArrowUpRight } from "lucide-react";

const footerLinks = [{ label: "Source repo", href: links.repo }];

export function Footer() {
  return (
    <footer className="bg-bg-subtle">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 items-start">
          <div className="space-y-3 max-w-md">
            <Text weight="semibold" className="text-fg">
              CLARA
            </Text>
            <Text size="sm" variant="muted" className="leading-relaxed">
              Confluence Learning &amp; AI Research Assistant. An internal
              ProductOps tool for DSTA programme teams &mdash; cited Research
              artefacts, drafted from the knowledge base they already own.
            </Text>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-3">
            {footerLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-fg-muted hover:text-fg transition-colors"
              >
                {l.label}
                <ArrowUpRight className="h-3.5 w-3.5 opacity-70" aria-hidden />
              </a>
            ))}
          </nav>
        </div>

        <Separator className="my-10" />

        <div className="flex flex-col md:flex-row justify-between gap-4 text-xs">
          <Text size="xs" variant="subtle">
            Developed by the DSTA ProductOps team.
          </Text>
          <Text size="xs" variant="subtle">
            Designed with the PRIZM design system &middot; Enterprise light.
          </Text>
        </div>
      </div>
    </footer>
  );
}
