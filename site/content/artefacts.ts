export type Phase = "discover" | "synthesise" | "define";

export interface Artefact {
  slug: string;
  title: string;
  phase: Phase;
  tagline: string;
  filesTo: string;
}

export const phases: Record<Phase, { label: string; description: string }> = {
  discover: {
    label: "Discover",
    description:
      "Surface what's already known and gather fresh evidence — before drawing conclusions.",
  },
  synthesise: {
    label: "Synthesise",
    description:
      "Turn evidence into shape: who the user is, how they work, where the friction lives.",
  },
  define: {
    label: "Define",
    description:
      "Translate the synthesised picture into concrete operational, capability, and product specifications.",
  },
};

export const artefacts: Artefact[] = [
  {
    slug: "prior-knowledge-summariser",
    title: "Prior-knowledge summariser",
    phase: "discover",
    tagline:
      "Surface what past programmes already learned about a topic — before starting fresh research.",
    filesTo: "Knowledge Base/{track}/Prior-knowledge/{topic}",
  },
  {
    slug: "interview-guide-generator",
    title: "Interview-guide generator",
    phase: "discover",
    tagline:
      "Generate a field-ready interview guide targeted at the data the team actually needs to surface.",
    filesTo: "Knowledge Base/{track}/Interview-guides/{topic}",
  },
  {
    slug: "research-synthesiser",
    title: "Research synthesiser",
    phase: "discover",
    tagline:
      "Turn interview transcripts and field notes into a synthesis of themes, friction, problem statement, and success criteria.",
    filesTo: "Knowledge Base/{track}/Research-synthesis",
  },
  {
    slug: "persona-generator",
    title: "Persona generator",
    phase: "synthesise",
    tagline: "Draft a persona from research evidence — every claim sourced.",
    filesTo: "Knowledge Base/{track}/Personas/{persona-name}",
  },
  {
    slug: "journey-map-drafter",
    title: "Journey-map drafter",
    phase: "synthesise",
    tagline:
      "Draft a current-state journey for a persona — stages, touchpoints, emotions, friction, opportunities.",
    filesTo: "Knowledge Base/{track}/Journeys/{journey-scope}",
  },
  {
    slug: "service-blueprint-drafter",
    title: "Service-blueprint drafter",
    phase: "synthesise",
    tagline:
      "Extend a journey into a service blueprint — making the back-stage systems, processes, and teams visible.",
    filesTo: "Knowledge Base/{track}/Service blueprints/{journey-scope}",
  },
  {
    slug: "mission-thread-mapper",
    title: "Mission-thread mapper",
    phase: "define",
    tagline:
      "Map the end-to-end mission thread — actors, systems, and data flows that produce an operational outcome.",
    filesTo: "Knowledge Base/{track}/Mission threads/{mission-task}",
  },
  {
    slug: "operational-scenario-generator",
    title: "Operational-scenario generator",
    phase: "define",
    tagline:
      "Draft an operational scenario from operator research and a capability brief — operator, environment, decisions, failure modes.",
    filesTo: "Knowledge Base/{track}/Operational scenarios/{scenario-title}",
  },
  {
    slug: "capability-spec-generator",
    title: "Capability-spec generator",
    phase: "define",
    tagline:
      "Turn an operational scenario into measurable capability requirements — functional, performance, environmental.",
    filesTo: "Knowledge Base/{track}/Capability specs/{capability-name}",
  },
  {
    slug: "prd-generator",
    title: "PRD generator",
    phase: "define",
    tagline:
      "Draft a first-pass PRD from research synthesis and stakeholder context — clarifying questions where inputs are thin.",
    filesTo: "Knowledge Base/{track}/PRDs/{prd-title}",
  },
];
