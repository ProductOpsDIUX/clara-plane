// CLARA build script.
// Reads modular sources from persona.md, conventions/, and artefacts/,
// and emits three derived distributions:
//   dist/portal/*.mdx     — lean per-artefact invocation guides for the portal.
//                           One short copy block pointing CLARA at the artefact
//                           by slug; CLARA herself holds the procedure.
//   dist/SKILL.md         — vendor-neutral LLM skill bundle. Filename retained
//                           for Anthropic skill compatibility; content is
//                           neutral and loads into any system-prompt slot.
//   dist/system-prompt.md — flat system prompt for hosts that take a single
//                           system prompt string (no skill protocol).

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import matter from 'gray-matter';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

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

async function readFile(rel: string): Promise<string> {
  return (await fs.readFile(path.join(ROOT, rel), 'utf8')).trim();
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

// Strip the H1 title and the Short preamble section. Used for the full-persona
// distributions (SKILL.md, system-prompt.md) where the persona is presented once
// at the top rather than embedded per-prompt.
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
    const src = await fs.readFile(path.join(dir, f), 'utf8');
    const parsed = matter(src);
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

// Strip author-side token annotations from a context bullet so user-facing
// copy doesn't leak template variables. Handles the common phrasings used
// across the artefact sources:
//   "... — this becomes `{{persona-name}}`."
//   "... This becomes `{{capability-name}}`."
//   "... This is the `{{topic}}` token."
function stripTokenAnnotations(line: string): string {
  return line
    // "Becomes `{{token}}` and X" → "X" (capitalised)
    .replace(/\s*Becomes\s*`\{\{[^}]+\}\}`\s+and\s+(\w)/gi, (_m, ch: string) => ' ' + ch.toUpperCase())
    // "Becomes `{{token}}`."
    .replace(/\s*Becomes\s*`\{\{[^}]+\}\}`\.?/gi, '')
    // Legacy phrasings from the older sources
    .replace(/\s*[—-]\s*this becomes\s*`\{\{[^}]+\}\}`\.?/gi, '.')
    .replace(/\.?\s*This becomes\s*`\{\{[^}]+\}\}`\.?/g, '.')
    .replace(/\.?\s*This is the\s*`\{\{[^}]+\}\}`\s*token\.?/g, '.')
    // Ensure the bullet ends with a single period
    .replace(/\.\.+$/g, '.')
    .replace(/([^.])\s*$/, '$1.')
    .trim();
}


// Emit the lean portal output for an artefact: structured frontmatter
// (including the literal copyBlock for the page's hero copy card) and a
// body containing only the user-facing context — "What CLARA will ask
// you for", "Where the output lands", and tips. Persona, conventions,
// Step 1-4 boilerplate, draft instructions, filing rules — all omitted.
// CLARA herself supplies them at runtime from her loaded system prompt.
//
// The body intentionally does NOT carry the copy block (the page template
// renders it from frontmatter as a hero card with a dedicated Copy button)
// or the artefact intro (the page lede already shows the `task` field, which
// the intro just paraphrases).
function emitPortalMdx(opts: { art: ArtefactSource; sha: string }): string {
  const { art, sha } = opts;
  const fm = { ...art.frontmatter } as Record<string, unknown>;
  delete fm.status;
  fm.source = 'clara';
  fm.claraSourceSha = sha;
  fm.copyBlock = `Use CLARA's \`${art.slug}\` for <programme name>.`;

  const tips = art.sections.tips?.trim() ?? '';
  const contextSection = art.sections.context?.trim() ?? '';

  const cc = (art.frontmatter.confluenceContext ?? {}) as {
    inputs?: Array<{ what: string; description?: string }>;
    outputPathTemplate?: string;
  };
  const outputPath = (cc.outputPathTemplate ?? '').trim();

  // Surface the source-authored `# context` bullets — these are the
  // artefact-specific questions CLARA will actually ask (name tokens plus
  // any extra context-shaping inputs like interviewee profile, outcome
  // question, scope refs). Strip the author-side `{{token}}` annotations.
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
      '- **Inputs** — CLARA will search the programme\'s Confluence space for ' +
        cc.inputs.map((i) => i.what.toLowerCase()).join('; ') +
        '. You can also paste fresh material if it\'s not in Confluence yet.',
    );
  }

  const sections: string[] = [
    '## What CLARA will ask you for',
    '',
    willAskFor.join('\n'),
  ];

  if (outputPath) {
    sections.push('', '## Where the output lands', '', `\`${outputPath}\` inside your programme's Confluence space.`);
  }

  if (tips) {
    sections.push('', '## Tips', '', tips);
  }

  const body = sections
    .filter((line, i, arr) => !(line === '' && arr[i - 1] === ''))
    .join('\n');

  return matter.stringify('\n' + body + '\n', fm);
}

// Assemble the body shared by SKILL.md and system-prompt.md: full persona,
// the four conventions in full (keeping "Why it matters" since these are
// loaded once and benefit from rationale context), an artefact index, and
// the per-artefact briefs concatenated.
function assembleFullDistribution(opts: {
  fullPersona: string;
  contextMd: string;
  kbPathsMd: string;
  cascadeMd: string;
  confluenceMcpMd: string;
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
    confluenceMcpMd,
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
      (a.frontmatter.confluenceContext as Record<string, unknown> | undefined)?.outputPathTemplate ??
        '',
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
    return [
      `### ${title} (\`${a.slug}\`)`,
      '',
      '```',
      brief,
      '```',
    ].join('\n');
  });

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
    convention('Confluence MCP filing discipline', confluenceMcpMd),
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

// CLARA ships as a vendor-neutral LLM skill: the same body loads into any
// host that supports a system prompt or a skill bundle. The SKILL.md filename
// is retained because Anthropic's skill loader expects it; the description
// and content are framed in vendor-neutral language so other hosts can
// consume the same file.
function emitSkillMd(body: string): string {
  const fm = {
    name: 'clara',
    description:
      'CLARA — Confluence Learning & AI Research Assistant. Load this skill (or paste into a system prompt) on any LLM that has Confluence access. CLARA drafts, refines, and files Research artefacts (personas, journey maps, research synthesis, PRDs, capability specs, mission threads, etc.) into the programme\'s Knowledge Base under a disciplined hierarchy. Users invoke her with `Use CLARA\'s `<artefact-slug>` for <programme>.`',
  };
  return matter.stringify('\n' + body + '\n', fm);
}

function emitSystemPromptMd(body: string): string {
  return [
    '# CLARA — Confluence Learning & AI Research Assistant',
    '',
    '<!--',
    '  Vendor-neutral LLM skill. Install into any LLM that has Confluence MCP',
    '  access by pasting this file into the system-prompt slot, the org-wide',
    '  default-instructions field, the gateway preamble, or whatever your',
    '  stack provides. Same content as SKILL.md; different filename for hosts',
    '  that don\'t use the skill protocol.',
    '-->',
    '',
    body,
    '',
  ].join('\n');
}

async function main() {
  const personaMd = await readFile('persona.md');
  const preamble = extractShortPreamble(personaMd);
  const fullPersona = extractFullPersona(personaMd);

  const contextMd = await readFile('conventions/context.md');
  const kbPathsMd = await readFile('conventions/kb-paths.md');
  const cascadeMd = await readFile('conventions/cascade.md');
  const confluenceMcpMd = await readFile('conventions/confluence-mcp.md');
  const setupKbMd = await readFile('conventions/setup-kb.md');
  const fieldNotesMd = await readFile('conventions/field-notes.md');

  const contextRule = stripWhyItMatters(stripH1(contextMd));
  const cascadeRule = stripWhyItMatters(stripH1(cascadeMd));
  const filingRule = stripWhyItMatters(stripH1(confluenceMcpMd));

  const artefacts = await loadArtefacts();
  const sha = getSha();

  const portalDir = path.join(ROOT, 'dist', 'portal');
  await fs.mkdir(portalDir, { recursive: true });

  // Clear any stale lean outputs so renamed/removed artefacts don't linger.
  for (const f of await fs.readdir(portalDir)) {
    if (f.endsWith('.mdx')) await fs.unlink(path.join(portalDir, f));
  }

  // Clean up the legacy thick-prompt directory if it still exists from a
  // previous build. The portal now reads from dist/portal/.
  const legacyPromptsDir = path.join(ROOT, 'dist', 'prompts');
  try {
    await fs.rm(legacyPromptsDir, { recursive: true, force: true });
  } catch {
    /* nothing to clean */
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
    console.log(`  build  portal/${art.slug}.mdx`);
  }

  const distributionBody = assembleFullDistribution({
    fullPersona,
    contextMd,
    kbPathsMd,
    cascadeMd,
    confluenceMcpMd,
    setupKbMd,
    fieldNotesMd,
    artefacts,
    contextRule,
    cascadeRule,
    filingRule,
  });

  await fs.writeFile(path.join(ROOT, 'dist', 'SKILL.md'), emitSkillMd(distributionBody), 'utf8');
  console.log('  build  SKILL.md');

  await fs.writeFile(
    path.join(ROOT, 'dist', 'system-prompt.md'),
    emitSystemPromptMd(distributionBody),
    'utf8',
  );
  console.log('  build  system-prompt.md');

  console.log('');
  console.log(`Built ${built} artefact(s), skipped ${skipped} stub(s). Source SHA: ${sha}`);
}

function stripH1(md: string): string {
  return md.replace(/^#\s+[^\n]*\n+/, '').trim();
}

// Strip "## Why it matters" (and anything after it) from convention bodies
// when inlining into a prompt — that section is meta-documentation, not
// runtime guidance for the LLM.
function stripWhyItMatters(md: string): string {
  return md.replace(/\n##\s+Why it matters[\s\S]*$/i, '').trim();
}

// Bump every Markdown heading level by `by` (e.g. ## → ####). Used when
// embedding a convention body underneath an outer heading so its own
// subheadings don't collide at the same level.
function bumpHeadings(md: string, by: number): string {
  return md.replace(/^(#+)(\s)/gm, (_, hashes: string, space: string) => '#'.repeat(hashes.length + by) + space);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
