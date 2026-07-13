"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code";
import { Heading } from "@/components/ui/heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Text } from "@/components/ui/text";
import { links } from "@/content/links";
import { stackPatterns } from "@/content/stack-patterns";
import {
  CheckCircle2,
  FileText,
  GitBranch,
  Plug,
  RefreshCcw,
  ShieldAlert,
} from "lucide-react";

const youNeed = [
  {
    icon: FileText,
    title: "CLARA's skill file",
    body: "A single Markdown file from CLARA's repo — either `dist/system-prompt.md` (flat) or `dist/SKILL.md` (skill-protocol wrapper). Pick the one that matches your stack.",
  },
  {
    icon: Plug,
    title: "Knowledge-base MCP",
    body: "Already wired into your LLM. CLARA does not require a separate connector — she uses whichever knowledge-base MCP (Plane, Confluence, and the like) your stack provides.",
  },
  {
    icon: CheckCircle2,
    title: "Nothing else",
    body: "No new infrastructure, no per-programme provisioning, no permissions request. Once installed, any team can invoke CLARA against their own knowledge base.",
  },
];

const keepCurrent = [
  {
    icon: GitBranch,
    title: "SHA-pinned",
    body: "Each CLARA release stamps a git SHA into the skill file and downstream artefacts. Pin a specific SHA in your config; bump deliberately.",
  },
  {
    icon: RefreshCcw,
    title: "Rarely changes",
    body: "CLARA's content updates infrequently — new artefacts, KB convention revisions, persona refinements. No constant churn to keep up with.",
  },
  {
    icon: FileText,
    title: "One-time per release",
    body: "Each install is a one-time action per CLARA release. Bump the skill file in your environment when a new SHA ships.",
  },
];

export function Deploy() {
  return (
    <section id="deploy" className="border-b border-border bg-bg-subtle">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 py-20 sm:py-24 lg:py-28 space-y-16">
        {/* Header */}
        <div className="max-w-2xl space-y-4">
          <Text
            size="sm"
            variant="muted"
            weight="medium"
            className="uppercase tracking-[0.18em] text-accent"
          >
            For platform teams
          </Text>
          <Heading as="h2" size="3xl" className="text-balance">
            Deploy CLARA in your stack.
          </Heading>
          <Text size="md" variant="muted" className="leading-relaxed">
            A single Markdown file. Install once per environment. CLARA is vendor-neutral and
            air-gap clean &mdash; she runs against whichever KB-aware LLM your platform
            already provides.
          </Text>
          <div className="flex flex-wrap gap-2 pt-2">
            <Badge variant="outline">Air-gap ready</Badge>
            <Badge variant="outline">Vendor-neutral</Badge>
            <Badge variant="outline">Zero per-programme setup</Badge>
          </div>
        </div>

        {/* What you need */}
        <div className="space-y-6">
          <Heading as="h3" size="xl">
            What you need
          </Heading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {youNeed.map(({ icon: Icon, title, body }) => (
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

        {/* Choose your stack — Tabs */}
        <div className="space-y-6">
          <div className="space-y-2 max-w-2xl">
            <Heading as="h3" size="xl">
              Choose your stack
            </Heading>
            <Text size="sm" variant="muted" className="leading-relaxed">
              The install is the same shape across every stack: load CLARA&rsquo;s skill file
              into the LLM&rsquo;s system context. The mechanism differs by platform.
            </Text>
          </div>

          <Tabs defaultValue={stackPatterns[0].slug} className="w-full">
            <TabsList className="h-auto p-1 flex-wrap">
              {stackPatterns.map((s) => (
                <TabsTrigger key={s.slug} value={s.slug} className="px-3 py-1.5">
                  {s.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {stackPatterns.map((s) => (
              <TabsContent key={s.slug} value={s.slug} className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{s.label}</CardTitle>
                    <Text size="sm" variant="muted">
                      {s.context}
                    </Text>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="rounded-md border border-border bg-bg-muted px-4 py-3">
                      <Text size="xs" variant="subtle" className="uppercase tracking-wider mb-1">
                        Where the file goes
                      </Text>
                      <Text size="sm" className="leading-relaxed">
                        {s.fileTarget}
                      </Text>
                    </div>

                    <ol className="space-y-3">
                      {s.steps.map((step, i) => (
                        <li key={i} className="flex gap-3">
                          <span
                            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-accent-fg text-xs font-semibold"
                            aria-hidden
                          >
                            {i + 1}
                          </span>
                          <Text size="sm" className="leading-relaxed pt-0.5">
                            {step.split("`").map((chunk, j) =>
                              j % 2 === 1 ? (
                                <code
                                  key={j}
                                  className="font-mono text-[0.875em] bg-bg-muted px-1 py-0.5 rounded border border-border"
                                >
                                  {chunk}
                                </code>
                              ) : (
                                <span key={j}>{chunk}</span>
                              ),
                            )}
                          </Text>
                        </li>
                      ))}
                    </ol>

                    {s.snippet ? (
                      <div className="space-y-2">
                        <Text size="xs" variant="subtle" className="uppercase tracking-wider">
                          Example
                        </Text>
                        <CodeBlock>
                          <code>{s.snippet.code}</code>
                        </CodeBlock>
                      </div>
                    ) : null}
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Verify */}
        <div className="space-y-6">
          <div className="space-y-2 max-w-2xl">
            <Heading as="h3" size="xl">
              Verify the install
            </Heading>
            <Text size="sm" variant="muted" className="leading-relaxed">
              Open a fresh chat against the configured LLM and paste the invocation below.
              CLARA should respond with a one-line route confirmation and a batched question
              for the missing inputs.
            </Text>
          </div>

          <Card className="border-l-4 border-l-accent">
            <CardHeader>
              <CardTitle className="text-base">Paste this</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <CodeBlock>
                <code>{`Use CLARA's \`persona-generator\` for <a programme with a knowledge base you can access>.`}</code>
              </CodeBlock>

              <div className="space-y-2">
                <Text size="xs" variant="subtle" className="uppercase tracking-wider">
                  Expected response
                </Text>
                <Text size="sm" variant="muted" className="leading-relaxed">
                  CLARA confirms which artefact she&rsquo;ll run and against which programme,
                  then asks for the <em>track</em>, <em>persona name</em>, and whether to
                  search your knowledge base or accept paste-in inputs &mdash; all in one message.
                </Text>
              </div>

              <Alert variant="warning">
                <ShieldAlert />
                <AlertDescription>
                  <strong className="font-semibold text-fg">If CLARA starts drafting without asking,</strong>{" "}
                  <span className="text-fg-muted">
                    the skill file didn&rsquo;t load. Confirm the system-prompt slot
                    you used actually injects into user conversations.
                  </span>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>

        {/* Keep it current */}
        <div className="space-y-6">
          <Heading as="h3" size="xl">
            Keep it current
          </Heading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {keepCurrent.map(({ icon: Icon, title, body }) => (
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
          <Text size="sm" variant="subtle" className="pt-2">
            CLARA source &amp; build artefacts:{" "}
            <a
              href={links.repo}
              className="text-accent hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/dsta-productops/clara
            </a>
            .
          </Text>
        </div>
      </div>
    </section>
  );
}
