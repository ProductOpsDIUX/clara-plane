# Deploying CLARA

A one-page brief for the platform / cloud team enabling CLARA in your environment.

## What you're installing

CLARA is a **vendor-neutral LLM skill**: a single Markdown file loaded into the LLM's context at session start. Once installed, every conversation against that LLM has CLARA preloaded — end users just paste a one-line invocation from the [ProductOps Co-pilot portal](https://copilot.productops.dsta) and CLARA drives the rest.

CLARA is **Research-only** and **Confluence-only**. She reads and writes a programme's Confluence Knowledge Base via MCP. She does not require any other integration.

## What you need

Two things:

1. **CLARA's skill file.** Built artefact from this repo at `dist/system-prompt.md` (flat) or `dist/SKILL.md` (skill-protocol format — same content, frontmatter wrapper). Pick the one that matches your stack.
2. **Confluence MCP access** wired into the LLM. CLARA does not require a separate connector — she uses whichever Confluence MCP your LLM already has.

If your stack doesn't have Confluence MCP yet, that's the prerequisite. CLARA can't read or file without it.

## Where the skill file goes

Depends on your stack. Pick the closest match:

| Stack pattern | Install location |
|---|---|
| LLM gateway / proxy (LiteLLM, custom API wrapper, internal chat backend) | Prepend the file contents to every incoming request's system prompt. |
| Self-hosted inference server (vLLM, Ollama, TGI) | Set as the default system prompt in your server config. |
| Vendor-hosted LLM with enterprise contract | Install via the host's organisation-level system-prompt slot or default-project-instructions field. |
| Internal chat UI wrapping an LLM | Inject on every conversation start in the UI's backend. |
| Anthropic-format skill loader | Load `dist/SKILL.md` as a skill bundle. |

In all cases the install is **one-time per CLARA release**. Bump the file when CLARA ships a new version.

## Version pinning

CLARA is versioned by git SHA. Every build stamps the source SHA into:

- `dist/system-prompt.md` and `dist/SKILL.md` — as a comment near the top (if a commit exists; otherwise reads `unreleased`)
- Each `dist/portal/<slug>.mdx` — in the `claraSourceSha:` frontmatter field

The portal's `pnpm sync:clara` records the SHA it synced from, so portal git history is a clean audit trail of which CLARA version was live at each portal deploy. Your deployment should mirror this — pin a specific CLARA SHA in your config and bump deliberately.

## Update cadence

CLARA's content changes when:

- New Research artefacts are added to the catalogue
- The Knowledge Base path convention is revised
- CLARA's persona or filing discipline is refined

These are infrequent (target: monthly at most once steady-state). When CLARA ships an update, the portal will be synced first; teams will see no behaviour change until you bump the skill file in your environment. Plan to bump within a release window of the portal sync to keep portal copy and CLARA behaviour aligned.

## Per-programme onboarding (programme lead)

Separate from the environment-level install above. Each programme that adopts CLARA does a one-time setup in its own Confluence space:

1. Create a top-level page named **`Knowledge Base`** at the root of the programme's space. This is where all CLARA-filed artefacts live.
2. Decide on the programme's track structure ahead of first use — workstream / capability area / feature line / sub-system, whatever applies. Track names go under `Knowledge Base` as second-level pages. Artefacts spanning tracks file under the literal track name `Programme-wide`.
3. No further setup needed. CLARA creates artefact-type folders (`Personas (<track>)`, `Journeys (<track>)`, `PRDs (<track>)`, etc.) on first use, working top-down — placeholder pages are created automatically before the artefact lands.

The resulting hierarchy:

```
Knowledge Base /
  Programme-wide /
    Personas (Programme-wide) /
    PRDs (Programme-wide) /
    ...
  <track> /
    Personas (<track>) /
    Journeys (<track>) /
    PRDs (<track>) /
    ...
```

If a level can't be created (permissions, naming conflict, missing parent), CLARA stops and reports — never silently files at the space root.

## Testing the install

After installing the skill file, open a fresh chat against the configured LLM and paste:

```
Use CLARA's `persona-generator` for <a programme name with a Confluence space you can access>.
```

CLARA should respond with a one-line route confirmation ("Running `persona-generator` for <programme>") and a batched question asking for the track, persona name, and whether to search Confluence or accept paste-ins. If she instead launches into drafting without asking, the skill file didn't load — check that the system-prompt slot you used actually injects into user conversations.

**Optional: demo knowledge base.** CLARA ships a self-contained demo Confluence KB at `demo-kb/SKYPROTECT-setup.md` for end-to-end testing without touching a real programme's space. Run that setup to create a `SKYPROTECT` space populated with sample interview transcripts, prior knowledge pages, and a Knowledge Base skeleton — then `Use CLARA's \`persona-generator\` for SKYPROTECT.` will exercise the full read → draft → file loop against fixture data. SKYPROTECT is **not** a default programme; it doesn't exist until you run the setup.

## Where things live

- **CLARA source** — this repo (`/Users/alvinloh/Claude/CLARA/`)
- **Build output** — `dist/` after `pnpm build`
- **Portal source** — sibling project at `/Users/alvinloh/Claude/ProductOps/portal/`
- **End-user catalogue** — the portal's `/prompts` and `/tools/clara` pages explain CLARA to teams; you don't need to write user-facing docs

## Who to contact

The PXO ProductOps team owns CLARA. Reach out to them via the contact channel listed on the portal's `/tools/clara` page.
