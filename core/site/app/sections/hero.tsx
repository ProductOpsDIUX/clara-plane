import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { links } from "@/content/links";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section id="top" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 py-24 sm:py-32 lg:py-40">
        <div className="max-w-3xl space-y-8">
          <Text
            size="sm"
            variant="muted"
            weight="medium"
            className="uppercase tracking-[0.18em] text-accent"
          >
            AI-enabled product intelligence by DSTA
          </Text>

          <Heading as="h1" size="4xl" className="text-balance sm:text-5xl lg:text-6xl">
            Product clarity, grounded in evidence.
          </Heading>

          <Text size="lg" variant="muted" className="text-balance max-w-2xl leading-relaxed">
            CLARA reads your programme&rsquo;s knowledge base, turns raw
            field notes into evidence-backed insights, and files them as research
            artefacts across the Research, Design, and Test phases of the
            ProductOps pipeline &mdash; personas, journeys, PRDs, storyboards,
            test plans &mdash; cited to source, never fabricated.
          </Text>

          <div className="flex flex-wrap gap-2 pt-2">
            <Badge variant="outline">Cites every finding</Badge>
            <Badge variant="outline">Files back to your KB</Badge>
            <Badge variant="outline">Air-gap ready</Badge>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-4">
            <a href="#how-it-works" className="inline-flex">
              <Button variant="solid" size="lg">
                See how it works
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
            </a>
            <a href="#deploy" className="inline-flex">
              <Button variant="outline" size="lg">
                For platform teams
              </Button>
            </a>
          </div>

          <div className="space-y-3 pt-6">
            <Text
              size="sm"
              variant="muted"
              weight="medium"
              className="uppercase tracking-[0.14em]"
            >
              One CLARA, two knowledge bases — pick your platform build
            </Text>
            <div className="flex flex-wrap items-center gap-3">
              <a href={links.plane} className="inline-flex" target="_blank" rel="noreferrer">
                <Button variant="outline" size="lg">
                  CLARA for Plane
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Button>
              </a>
              <a href={links.confluence} className="inline-flex" target="_blank" rel="noreferrer">
                <Button variant="outline" size="lg">
                  CLARA for Confluence
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
