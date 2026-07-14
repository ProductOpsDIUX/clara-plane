import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { BookOpen, FilePlus, Quote } from "lucide-react";

const steps = [
  {
    icon: BookOpen,
    title: "Read",
    body: "CLARA traverses your programme's knowledge base via MCP and reads the source items. She doesn't search the web; she doesn't invent context. The corpus is the boundary.",
  },
  {
    icon: Quote,
    title: "Draft",
    body: "Every finding points to the exact source it came from. If the evidence is thin, CLARA flags the gap and asks before continuing.",
  },
  {
    icon: FilePlus,
    title: "File",
    body: "Artefacts file back into your knowledge base under a disciplined path. CLARA creates the hierarchy top-down on first use — no manual folder setup, no improvised locations.",
  },
];

export function HowClaraThinks() {
  return (
    <section id="how-it-works" className="border-b border-border bg-bg-subtle">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 py-20 sm:py-24 lg:py-28">
        <div className="max-w-2xl space-y-4">
          <Text
            size="sm"
            variant="muted"
            weight="medium"
            className="uppercase tracking-[0.18em] text-accent"
          >
            How she thinks
          </Text>
          <Heading as="h2" size="3xl" className="text-balance">
            Read &rarr; Draft &rarr; File. Cited at every step.
          </Heading>
          <Text size="md" variant="muted" className="leading-relaxed">
            CLARA runs a disciplined loop over your knowledge base. The discipline is
            the point: she won&rsquo;t give you an answer she can&rsquo;t back with a citation.
          </Text>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {steps.map(({ icon: Icon, title, body }) => (
            <Card key={title}>
              <CardHeader>
                <div className="flex items-center gap-2 text-accent">
                  <Icon className="h-5 w-5" aria-hidden />
                  <CardTitle className="text-base">{title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <Text size="sm" variant="muted" className="leading-relaxed">
                  {body}
                </Text>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
}
