// CLARA build script (platform-aware).
//
// CLARA is authored once as a shared core (persona, artefacts, and the policy
// conventions context/kb-paths/cascade) plus a thin per-platform adapter
// (platform/<name>/: mcp, filing, field-notes, setup-kb conventions + demo KB).
//
// Core sources carry conditional blocks:
//     @@if plane@@ ... @@endif@@
//     @@if confluence@@ ... @@endif@@
// The build strips the blocks that don't match the target platform, so a
// single core reproduces both platform distributions with no drift.
//
// Select the platform with CLARA_PLATFORM=plane|confluence (default: plane).
// Output dir is CLARA_OUT (default: dist).
//
// Emits:
//   <out>/portal/*.mdx     — lean per-artefact invocation guides for the portal.
//   <out>/SKILL.md         — vendor-neutral LLM skill bundle.
//   <out>/system-prompt.md — flat system prompt for hosts without skill protocol.

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import matter from 'gray-matter';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------------------
// Platform configuration
// ---------------------------------------------------------------------------

type PlatformName = 'plane' | 'confluence';

interface PlatformConfig {
  tool: string; // "Plane" | "Confluence"
  substrate: string; // "Plane project" | "Confluence space"
  contextKey: string; // frontmatter key: "planeContext" | "confluenceContext"
  systemPromptMcp: string; // "Plane MCP" | "Confluence MCP"
  skillDescription: string;
  systemPromptTitle: string;
}

const PLATFORMS: Record<PlatformName, PlatformConfig> = {
  plane: {
    tool: 'Plane',
    substrate: 'Plane project',
    contextKey: 'planeContext',
    systemPromptMcp: 'Plane MCP',
    skillDescription:
      "CLARA — Research & Design assistant for Plane. Load this skill (or paste into a system prompt) on any LLM that has Plane access. CLARA drafts, refines, and files Research artefacts (personas, journey maps, research synthesis, PRDs, capability specs, mission threads, etc.) into the programme's Knowledge Base under a disciplined hierarchy. Users invoke her with `Use CLARA's `<artefact-slug>` for <programme>.`",
    systemPromptTitle: 'CLARA — Research & Design assistant for Plane',
  },
  confluence: {
    tool: 'Confluence',
    substrate: 'Confluence space',
    contextKey: 'confluenceContext',
    systemPromptMcp: 'Confluence MCP',
    skillDescription:
      "CLARA — Confluence Learning & AI Research Assistant. Load this skill (or paste into a system prompt) on any LLM that has Confluence access. CLARA drafts, refines, and files Research artefacts (personas, journey maps, research synthesis, PRDs, capability specs, mission threads, etc.) into the programme's Knowledge Base under a disciplined hierarchy. Users invoke her with `Use CLARA's `<artefact-slug>` for <programme>.`",
    systemPromptTitle: 'CLARA — Confluence Learning & AI Research Assistant',
  },
};

const PLATFORM = (process.env.CLARA_PLATFORM ?? 'plane') as PlatformName;
if (!PLATFORMS[PLATFORM]) {
  console.error(`Unknown CLARA_PLATFORM "${PLATFORM}". Use "plane" or "confluence".`);
  process.exit(1);
}
const P = PLATFORMS[PLATFORM];
// Output dir resolves relative to the current working directory (the repo
// root), so once core/ is vendored via git subtree the dist lands at the
// platform repo root rather than inside core/.
const OUT_ENV = process.env.CLARA_OUT ?? 'dist';
const OUT_BASE = path.isAbsolute(OUT_ENV) ? OUT_ENV : path.join(process.cwd(), OUT_ENV);

// Adapter directory for the selected platform.
const ADAPTER = path.join('platform', PLATFORM);

// ---------------------------------------------------------------------------
// Conditional-block stripping
// ---------------------------------------------------------------------------

// Remove @@if <other>@@...@@endif@@ blocks; unwrap @@if <target>@@ blocks.
// Nesting is supported via a keep-stack. Marker lines are dropped entirely.
function stripConditionals(text: string, platform: PlatformName): string {
  const lines = text.split('\n');
  const out: string[] = [];
  const keep: boolean[] = [true];
  for (const line of lines) {
    const open = line.trim().match(/^@@if (plane|confluence)@@$/);
    if (open) {
      keep.push(keep[keep.length - 1] && open[1] === platform);
      continue;
    }
    if (line.trim() === '@@endif@@') {
      if (keep.length > 1) keep.pop();
      continue;
    }
    if (keep[keep.length - 1]) out.push(line);
  }
  return out.join('\n');
}

const SECTION_NAMES = ['intro', 'context', 'inputs', 'draft', 'filing', 'tips'] as const;
type SectionName = (typeof SECTION_NAMES)[number];
type Sections = Partial<Record<SectionName, string>>;

interface ArtefactSource {
  slug: string;
  frontmatter: Record<string, unknown>;
  sections: Sections;
}

function parseSections(body: string): Sections {
  const out: Sections = {};
  const lines = body.split('\n');
  const re = new RegExp(`^# (${SECTION_NAMES.join('|')})\\s*$`);
  let current: SectionName | null = null;
  let buf: string[] = [];
  const flush = () => {
    if (current) out[current] = buf.join('\n').trim();
    buf = [];
  };
  for (const line of lines) {
    const m = line.match(re);
    if (m) {
      flush();
      current = m[1] as SectionName;
    } else if (current) {
      buf.push(line);
    }
  }
  flush();
  return out;
}

// Read a shared-core source and strip conditionals for the active platform.
async function readCore(rel: string): Promise<string> {
  const raw = (await fs.readFile(path.join(ROOT, rel), 'utf8')).trim();
  return stripConditionals(raw, PLATFORM).trim();
}

// Read a platform adapter file verbatim (already platform-specific).
async function readAdapter(rel: string): Promise<string> {
  return (await fs.readFile(path.join(ROOT, ADAPTER, rel), 'utf8')).trim();
}

function getSha(): string {
  try {
    return execSync('git rev-parse HEAD', { cwd: ROOT, stdio: ['ignore', 'pipe', 'ignore'] })
      .toString()
      .trim();
  } catch {
    return 'unreleased';
  }
}

function extractShortPreamble(personaMd: string): string {
  const m = personaMd.match(/##\s+Short preamble\s*\n([\s\S]*?)$/);
  if (!m) throw new Error('persona.md missing "## Short preamble" section');
  return m[1].trim();
}

function extractFullPersona(personaMd: string): string {
  return personaMd
    .replace(/^#\s+[^\n]*\n+/, '')
    .replace(/\n##\s+Short preamble[\s\S]*$/, '')
    .trim();
}

async function loadArtefacts(): Promise<ArtefactSource[]> {
  const dir = path.join(ROOT, 'artefacts');
  const files = (await fs.readdir(dir)).filter((f) => f.endsWith('.md')).sort();
  const out: ArtefactSource[] = [];
  for (const f of files) {
    const raw = await fs.readFile(path.join(dir, f), 'utf8');
    const stripped = stripConditionals(raw, PLATFORM);
    const parsed = matter(stripped);
    out.push({
      slug: f.replace(/\.md$/, ''),
      frontmatter: parsed.data,
      sections: parseSections(parsed.content),
    });
  }
  return out;
}

function assemblePromptBody(opts: {
  art: ArtefactSource;
  preamble?: string;
  contextRule: string;
  cascadeRule: string;
  filingRule: string;
}): string {
  const { art, preamble, contextRule, cascadeRule, filingRule } = opts;
  const s = art.sections;
  const task = String(art.frontmatter.task ?? '').trim();
  const parts: string[] = [];

  if (preamble) {
    parts.push(preamble);
    parts.push('');
  }
  parts.push(`You are helping me ${task}.`);
  parts.push('');

  parts.push('Step 1 — Confirm the run context.');
  parts.push('');
  parts.push(contextRule);
  if (s.context) {
    parts.push('');
    parts.push(s.context);
  }
  parts.push('');

  parts.push('Step 2 — Gather inputs.');
  parts.push('');
  parts.push(cascadeRule);
  if (s.inputs) {
    parts.push('');
    parts.push(s.inputs);
  }
  parts.push('');

  parts.push('Step 3 — Draft.');
  parts.push('');
  if (s.draft) parts.push(s.draft);
  parts.push('');

  parts.push('Step 4 — File the output.');
  parts.push('');
  parts.push(filingRule);
  if (s.filing) {
    parts.push('');
    parts.push(s.filing);
  }

  return parts.join('\n').trim();
}

function stripTokenAnnotations(line: string): string {
  return line
    .replace(/\s*Becomes\s*`\{\{[^}]+\}\}`\s+and\s+(\w)/gi, (_m, ch: string) => ' ' + ch.toUpperCase())
    .replace(/\s*Becomes\s*`\{\{[^}]+\}\}`\.?/gi, '')
    .replace(/\s*[—-]\s*this becomes\s*`\{\{[^}]+\}\}`\.?/gi, '.')
    .replace(/\.?\s*This becomes\s*`\{\{[^}]+\}\}`\.?/g, '.')
    .replace(/\.?\s*This is the\s*`\{\{[^}]+\}\}`\s*token\.?/g, '.')
    .replace(/\.\.+$/g, '.')
    .replace(/([^.])\s*$/, '$1.')
    .trim();
}

function emitPortalMdx(opts: { art: ArtefactSource; sha: string }): string {
  const { art, sha } = opts;
  const fm = { ...art.frontmatter } as Record<string, unknown>;
  delete fm.status;
  fm.source = 'clara';
  fm.claraSourceSha = sha;
  fm.copyBlock = `Use CLARA's \`${art.slug}\` for <programme name>.`;

  const tips = art.sections.tips?.trim() ?? '';
  const contextSection = art.sections.context?.trim() ?? '';

  const cc = (art.frontmatter[P.contextKey] ?? {}) as {
    inputs?: Array<{ what: string; description?: string }>;
    outputPathTemplate?: string;
  };
  const outputPath = (cc.outputPathTemplate ?? '').trim();

  const contextBullets = contextSection
    .split('\n')
    .filter((line) => line.trim().startsWith('-'))
    .map((line) => stripTokenAnnotations(line));

  const willAskFor: string[] = [
    '- **Programme name** — your programme\'s name (e.g. SKYPROTECT).',
    '- **Track** — the slice of the programme this artefact belongs to (workstream, capability area, feature line, etc.), or `Programme-wide` if it spans tracks.',
    ...contextBullets,
  ];
  if (cc.inputs?.length) {
    willAskFor.push(
      `- **Inputs** — CLARA will search the programme's ${P.substrate} for ` +
        cc.inputs.map((i) => i.what.toLowerCase()).join('; ') +
        `. You can also paste fresh material if it's not in ${P.tool} yet.`,
    );
  }

  const sections: string[] = [
    '## What CLARA will ask you for',
    '',
    willAskFor.join('\n'),
  ];

  if (outputPath) {
    sections.push('', '## Where the output lands', '', `\`${outputPath}\` inside your programme's ${P.substrate}.`);
  }

  if (tips) {
    sections.push('', '## Tips', '', tips);
  }

  const body = sections
    .filter((line, i, arr) => !(line === '' && arr[i - 1] === ''))
    .join('\n');

  return matter.stringify('\n' + body + '\n', fm);
}

function assembleFullDistribution(opts: {
  fullPersona: string;
  contextMd: string;
  kbPathsMd: string;
  cascadeMd: string;
  mcpMd: string;
  setupKbMd: string;
  fieldNotesMd: string;
  artefacts: ArtefactSource[];
  contextRule: string;
  cascadeRule: string;
  filingRule: string;
}): string {
  const {
    fullPersona,
    contextMd,
    kbPathsMd,
    cascadeMd,
    mcpMd,
    setupKbMd,
    fieldNotesMd,
    artefacts,
    contextRule,
    cascadeRule,
    filingRule,
  } = opts;

  const ready = artefacts.filter((a) => a.frontmatter.status !== 'stub');

  const indexLines = ready.map((a) => {
    const task = String(a.frontmatter.task ?? '').trim();
    const outPath = String(
      (a.frontmatter[P.contextKey] as Record<string, unknown> | undefined)?.outputPathTemplate ?? '',
    ).trim();
    return `- **\`${a.slug}\`** — ${task}${outPath ? ` → \`${outPath}\`` : ''}`;
  });

  const briefBlocks = ready.map((a) => {
    const title = String(a.frontmatter.title ?? a.slug);
    const brief = assemblePromptBody({
      art: a,
      contextRule,
      cascadeRule,
      filingRule,
    });
    return [`### ${title} (\`${a.slug}\`)`, '', '```', brief, '```'].join('\n');
  });

  // The MCP convention's own H1 supplies the section header ("Plane MCP
  // filing discipline" / "Confluence MCP filing discipline").
  const mcpTitle = (mcpMd.match(/^#\s+(.+)$/m)?.[1] ?? 'MCP filing discipline').trim();

  const convention = (name: string, md: string) =>
    ['### ' + name, '', bumpHeadings(stripH1(md), 2), ''].join('\n');

  return [
    fullPersona,
    '',
    '## Operating conventions',
    '',
    convention('Confirming the run context', contextMd),
    convention('Knowledge Base path convention', kbPathsMd),
    convention('Track ↔ Programme-wide cascade', cascadeMd),
    convention(mcpTitle, mcpMd),
    convention('KB setup flows (setup-kb, add-track)', setupKbMd),
    convention('Field notes', fieldNotesMd),
    '## Artefact catalogue',
    '',
    'When the user asks for a Research artefact, identify which one applies and follow the corresponding brief. Always confirm `{{programme}}` and `{{track}}` before drafting.',
    '',
    '### Available artefacts',
    '',
    indexLines.join('\n'),
    '',
    '### Briefs',
    '',
    briefBlocks.join('\n\n'),
  ].join('\n');
}

function emitSkillMd(body: string): string {
  const fm = {
    name: 'clara',
    description: P.skillDescription,
  };
  return matter.stringify('\n' + body + '\n', fm);
}

function emitSystemPromptMd(body: string): string {
  return [
    `# ${P.systemPromptTitle}`,
    '',
    '<!--',
    `  Vendor-neutral LLM skill. Install into any LLM that has ${P.systemPromptMcp}`,
    '  access by pasting this file into the system-prompt slot, the org-wide',
    '  default-instructions field, the gateway preamble, or whatever your',
    '  stack provides. Same content as SKILL.md; different filename for hosts',
    "  that don't use the skill protocol.",
    '-->',
    '',
    body,
    '',
  ].join('\n');
}

async function main() {
  const personaMd = await readCore('persona.md');
  const preamble = extractShortPreamble(personaMd);
  const fullPersona = extractFullPersona(personaMd);

  // Shared-core policy conventions (conditional-stripped).
  const contextMd = await readCore('conventions/context.md');
  const kbPathsMd = await readCore('conventions/kb-paths.md');
  const cascadeMd = await readCore('conventions/cascade.md');

  // Platform adapter conventions (verbatim).
  const mcpMd = await readAdapter('conventions/mcp.md');
  const setupKbMd = await readAdapter('conventions/setup-kb.md');
  const fieldNotesMd = await readAdapter('conventions/field-notes.md');

  const contextRule = stripWhyItMatters(stripH1(contextMd));
  const cascadeRule = stripWhyItMatters(stripH1(cascadeMd));
  const filingRule = stripWhyItMatters(stripH1(mcpMd));

  const artefacts = await loadArtefacts();
  const sha = getSha();

  const portalDir = path.join(OUT_BASE, 'portal');
  await fs.mkdir(portalDir, { recursive: true });

  for (const f of await fs.readdir(portalDir)) {
    if (f.endsWith('.mdx')) await fs.unlink(path.join(portalDir, f));
  }

  let built = 0;
  let skipped = 0;
  for (const art of artefacts) {
    if (art.frontmatter.status === 'stub') {
      skipped++;
      console.log(`  skip   ${art.slug} (stub)`);
      continue;
    }
    const mdx = emitPortalMdx({ art, sha });
    await fs.writeFile(path.join(portalDir, `${art.slug}.mdx`), mdx, 'utf8');
    built++;
    console.log(`  build  ${OUT_ENV}/portal/${art.slug}.mdx`);
  }

  const distributionBody = assembleFullDistribution({
    fullPersona,
    contextMd,
    kbPathsMd,
    cascadeMd,
    mcpMd,
    setupKbMd,
    fieldNotesMd,
    artefacts,
    contextRule,
    cascadeRule,
    filingRule,
  });

  await fs.writeFile(path.join(OUT_BASE, 'SKILL.md'), emitSkillMd(distributionBody), 'utf8');
  console.log(`  build  ${OUT_ENV}/SKILL.md`);

  await fs.writeFile(
    path.join(OUT_BASE, 'system-prompt.md'),
    emitSystemPromptMd(distributionBody),
    'utf8',
  );
  console.log(`  build  ${OUT_ENV}/system-prompt.md`);

  console.log('');
  console.log(
    `Platform: ${PLATFORM}. Built ${built} artefact(s), skipped ${skipped} stub(s). Source SHA: ${sha}`,
  );
}

function stripH1(md: string): string {
  return md.replace(/^#\s+[^\n]*\n+/, '').trim();
}

function stripWhyItMatters(md: string): string {
  return md.replace(/\n##\s+Why it matters[\s\S]*$/i, '').trim();
}

function bumpHeadings(md: string, by: number): string {
  return md.replace(/^(#+)(\s)/gm, (_, hashes: string, space: string) => '#'.repeat(hashes.length + by) + space);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
