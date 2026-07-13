#!/usr/bin/env tsx
/**
 * Air-gap audit script — CLARA marketing site
 * ------------------------------------------------------------
 * Scans the repo for anything that would break in a disconnected
 * environment: external URL references, CDN-hosted fonts, remote
 * <Image>/<Script> sources, etc. Exits 1 on violation so CI fails fast.
 *
 * Adapted from PRIZM's audit-airgap.ts.
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");

const IGNORE_DIRS = new Set([
  "node_modules",
  ".next",
  "out",
  ".git",
  ".pnpm-store-offline",
  "public/fonts",
]);

const IGNORE_FILES = new Set<string>([
  "scripts/audit-airgap.ts",
  "next-env.d.ts",
]);

const SCAN_EXTENSIONS = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",
  ".mdx",
  ".md",
  ".css",
  ".html",
  ".json",
]);

const FORBIDDEN_HOSTS = [
  "fonts.googleapis.com",
  "fonts.gstatic.com",
  "use.typekit.net",
  "use.fontawesome.com",
  "cdn.jsdelivr.net",
  "cdnjs.cloudflare.com",
  "unpkg.com",
  "googletagmanager.com",
  "google-analytics.com",
  "sentry.io",
  "vercel-analytics.com",
];

const DOC_EXTENSIONS = new Set([".md", ".mdx", ".json"]);

/**
 * Allowlist — prefixes accepted in code files. These are href targets the user
 * clicks (not runtime fetches), or W3C XML namespaces required by SVG.
 */
const ALLOWLIST = [
  "http://www.w3.org/2000/svg",
  "http://www.w3.org/1999/xlink",
  "https://github.com/dsta-productops",
];

interface Violation {
  file: string;
  line: number;
  column: number;
  match: string;
  rule: string;
}

const violations: Violation[] = [];

function walk(dir: string, fn: (file: string) => void) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const rel = relative(ROOT, full);
    if (IGNORE_DIRS.has(entry) || IGNORE_DIRS.has(rel)) continue;
    if (IGNORE_FILES.has(rel)) continue;
    const stat = statSync(full);
    if (stat.isDirectory()) walk(full, fn);
    else fn(full);
  }
}

function scanFile(file: string) {
  const ext = file.slice(file.lastIndexOf("."));
  if (!SCAN_EXTENSIONS.has(ext)) return;

  const content = readFileSync(file, "utf8");
  const lines = content.split("\n");
  const isDocFile = DOC_EXTENSIONS.has(ext);
  const relPath = relative(ROOT, file);

  lines.forEach((line, i) => {
    if (!isDocFile) {
      for (const host of FORBIDDEN_HOSTS) {
        const idx = line.indexOf(host);
        if (idx !== -1) {
          violations.push({
            file: relPath,
            line: i + 1,
            column: idx + 1,
            match: host,
            rule: "forbidden-host",
          });
        }
      }
    }

    if (!isDocFile) {
      const urlRegex = /https?:\/\/[^\s"'`<>)]+/g;
      let match: RegExpExecArray | null = urlRegex.exec(line);
      while (match !== null) {
        const url = match[0];
        if (!ALLOWLIST.some((a) => url.startsWith(a))) {
          violations.push({
            file: relPath,
            line: i + 1,
            column: match.index + 1,
            match: url,
            rule: "external-url",
          });
        }
        match = urlRegex.exec(line);
      }
    }
  });
}

console.log("CLARA site air-gap audit — scanning...\n");
walk(ROOT, scanFile);

if (violations.length === 0) {
  console.log("[OK] No violations found. Site is air-gap clean.");
  process.exit(0);
}

console.log(`[FAIL] Found ${violations.length} violation(s):\n`);
const grouped = new Map<string, Violation[]>();
for (const v of violations) {
  const arr = grouped.get(v.file) ?? [];
  arr.push(v);
  grouped.set(v.file, arr);
}

for (const [file, vs] of grouped) {
  console.log(`  ${file}`);
  for (const v of vs) {
    console.log(`    ${v.line}:${v.column}  [${v.rule}]  ${v.match}`);
  }
  console.log();
}

console.log(
  "Fix these references so the CLARA site works in air-gapped environments.",
);
process.exit(1);
