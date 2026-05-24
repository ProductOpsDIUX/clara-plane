import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { ChevronRight, Library, Link2, Quote, Zap } from "lucide-react";

type FeatureCardProps = {
  icon: typeof Zap;
  title: string;
  body: string;
  children?: React.ReactNode;
};

function FeatureCard({ icon: Icon, title, body, children }: FeatureCardProps) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <div className="flex items-center gap-2 text-accent">
          <Icon className="h-5 w-5" aria-hidden />
          <CardTitle className="text-base">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-4">
        <Text size="sm" variant="muted" className="leading-relaxed">
          {body}
        </Text>
        {children}
      </CardContent>
    </Card>
  );
}

type ChainStage = {
  label: string;
  variant?: "default" | "fieldwork";
};

const chainStages: ChainStage[] = [
  { label: "Prior knowledge" },
  { label: "Interview guide" },
  { label: "Fieldwork", variant: "fieldwork" },
  { label: "Synthesis" },
  { label: "Persona" },
  { label: "Journey" },
  { label: "PRD" },
];

function SpeedComparison() {
  return (
    <div
      className="flex flex-col gap-3 rounded-md border border-border bg-bg-subtle p-4"
      aria-label="Drafting time, manual versus CLARA"
    >
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between font-mono text-[0.75rem] text-fg-subtle">
          <span>Manual</span>
          <span>1&ndash;2 weeks</span>
        </div>
        <div className="h-2 rounded-sm bg-bg-muted">
          <div className="h-full w-full rounded-sm bg-fg-subtle" />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between font-mono text-[0.75rem] text-fg">
          <span>With CLARA</span>
          <span>minutes</span>
        </div>
        <div className="h-2 rounded-sm bg-bg-muted">
          <div className="h-full w-[3%] rounded-sm bg-accent" />
        </div>
      </div>
    </div>
  );
}

function ChainDiagram() {
  return (
    <div
      className="flex flex-wrap items-center gap-x-1.5 gap-y-2 rounded-md border border-border bg-bg-subtle p-4"
      aria-label="End-to-end artefact chain"
    >
      {chainStages.map((stage, i) => (
        <span key={stage.label} className="inline-flex items-center gap-1.5">
          <span
            className={
              stage.variant === "fieldwork"
                ? "inline-flex items-center rounded-md border border-dashed border-border-strong bg-bg-muted px-2 py-1 font-mono text-[0.75rem] italic text-fg-subtle whitespace-nowrap"
                : "inline-flex items-center rounded-md border border-border bg-surface px-2 py-1 font-mono text-[0.75rem] text-fg whitespace-nowrap shadow-sm"
            }
          >
            {stage.label}
          </span>
          {i < chainStages.length - 1 ? (
            <ChevronRight
              className="h-3.5 w-3.5 text-fg-subtle"
              aria-hidden
            />
          ) : null}
        </span>
      ))}
    </div>
  );
}

export function WhereClaraEarns() {
  return (
    <section id="why-clara" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 py-20 sm:py-24 lg:py-28 space-y-12">
        <div className="max-w-2xl space-y-4">
          <Text
            size="sm"
            variant="muted"
            weight="medium"
            className="uppercase tracking-[0.18em] text-accent"
          >
            Where CLARA earns her keep
          </Text>
          <Heading as="h2" size="3xl" className="text-balance">
            Replace the grind. Keep the chain.
          </Heading>
          <Text size="md" variant="muted" className="leading-relaxed">
            CLARA isn&rsquo;t a chatbot. She&rsquo;s your AI research assistant. She
            replaces the slow, error-prone parts of producing research artefacts
            across Research, Design, and Test phases of the ProductOps pipeline
            &mdash; and chains the outputs so your evidence stays intact from
            transcript to test plan.
          </Text>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <FeatureCard
            icon={Zap}
            title="Research at speed"
            body="CLARA turns raw interview transcripts and field observations into evidence-backed insights — themes, friction points, problem statement, success criteria — in a single cited pass. The kind of work that takes a research lead a week or two lands as a draft in minutes. Personas, journeys, PRDs — the rest of the chain drafts in minutes too. The hours saved go back where they belong: understanding real users."
          >
            <SpeedComparison />
          </FeatureCard>

          <FeatureCard
            icon={Link2}
            title="Chained by design"
            body="The chain runs end-to-end. CLARA prepares for the field by searching past programmes for prior knowledge that shapes the interview guide. After fieldwork, the synthesis grounds the persona, the persona shapes the journey, and the journey extends through service blueprints, operational scenarios, mission threads, capability specs, and PRDs. Evidence preserved at every stage."
          >
            <ChainDiagram />
          </FeatureCard>

          <FeatureCard
            icon={Quote}
            title="Citations at page level"
            body="Every finding points to the exact Confluence page it came from. If a stakeholder asks &lsquo;where did this come from?&rsquo;, you can answer instantly — the link is in the artefact."
          />

          <FeatureCard
            icon={Library}
            title="Cross-programme referencing"
            body="CLARA's prior-knowledge step searches across all programmes — not just yours — to surface what's already been learned about a topic. Don't rediscover what another team already knows."
          />
        </div>
      </div>
    </section>
  );
}
