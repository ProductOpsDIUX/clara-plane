"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Text } from "@/components/ui/text";
import { type Artefact, type Phase, artefacts, phases } from "@/content/artefacts";

const phaseOrder: Phase[] = ["discover", "synthesise", "define"];

function ArtefactCard({ artefact }: { artefact: Artefact }) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="pb-3">
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
            Ten artefacts. Three phases of work.
          </Heading>
          <Text size="md" variant="muted" className="leading-relaxed">
            CLARA&rsquo;s catalogue covers Research from initial discovery through
            product definition. Each artefact files to a predictable path and feeds
            the next.
          </Text>
        </div>

        <Tabs defaultValue="discover" className="mt-10">
          <TabsList className="h-auto p-1">
            {phaseOrder.map((p) => (
              <TabsTrigger key={p} value={p} className="px-4 py-1.5">
                {phases[p].label}
                <span className="ml-2 text-xs text-fg-subtle">
                  {artefacts.filter((a) => a.phase === p).length}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>

          {phaseOrder.map((p) => {
            const items = artefacts.filter((a) => a.phase === p);
            return (
              <TabsContent key={p} value={p} className="mt-8">
                <Text
                  size="sm"
                  variant="muted"
                  className="mb-6 max-w-2xl leading-relaxed"
                >
                  {phases[p].description}
                </Text>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {items.map((a) => (
                    <ArtefactCard key={a.slug} artefact={a} />
                  ))}
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </section>
  );
}
