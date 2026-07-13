import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { type Artefact, artefacts, phases } from "@/content/artefacts";

function ArtefactCard({ artefact }: { artefact: Artefact }) {
  return (
    <Card className="flex flex-col snap-start">
      <CardHeader className="pb-3 space-y-2">
        <Badge variant="outline" className="self-start text-xs">
          {phases[artefact.phase].label}
        </Badge>
        <CardTitle className="text-base">{artefact.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-4">
        <Text size="sm" variant="muted" className="leading-relaxed">
          {artefact.tagline}
        </Text>
        <div className="mt-auto pt-3 border-t border-border space-y-1">
          <Text size="xs" variant="subtle" className="uppercase tracking-wider">
            Files to
          </Text>
          <code className="block font-mono text-xs text-fg-muted break-all">
            {artefact.filesTo}
          </code>
        </div>
      </CardContent>
    </Card>
  );
}

export function ArtefactCatalogue() {
  return (
    <section id="artefacts" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 py-20 sm:py-24 lg:py-28">
        <div className="max-w-2xl space-y-4">
          <Text
            size="sm"
            variant="muted"
            weight="medium"
            className="uppercase tracking-[0.18em] text-accent"
          >
            What CLARA drafts
          </Text>
          <Heading as="h2" size="3xl" className="text-balance">
            Twelve artefacts. Three phases of work.
          </Heading>
          <Text size="md" variant="muted" className="leading-relaxed">
            CLARA&rsquo;s catalogue spans Research, Design, and Test &mdash; from
            initial discovery through product definition, storyboards, and test
            plans. Each artefact files to a predictable path and feeds the next.
          </Text>
        </div>

        <div
          className="mt-10 -mx-6 sm:-mx-8 overflow-x-auto snap-x snap-mandatory scroll-px-6 sm:scroll-px-8"
          aria-label="Artefact catalogue"
        >
          <div className="grid grid-flow-col auto-cols-[18rem] gap-4 md:gap-6 px-6 sm:px-8 pb-2">
            {artefacts.map((a) => (
              <ArtefactCard key={a.slug} artefact={a} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
