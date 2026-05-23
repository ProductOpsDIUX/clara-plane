export interface StackPattern {
  slug: string;
  label: string;
  context: string;
  fileTarget: string;
  steps: string[];
  snippet?: {
    language: string;
    code: string;
  };
}

export const stackPatterns: StackPattern[] = [
  {
    slug: "llm-gateway",
    label: "LLM gateway",
    context: "LiteLLM, custom API wrapper, internal chat backend.",
    fileTarget:
      "Prepend the file contents to the system message of every outbound LLM request.",
    steps: [
      "Download `dist/system-prompt.md` from CLARA's repo.",
      "Load it once at gateway startup; cache the contents in memory.",
      "Prepend the contents to the `system` role on every request before forwarding.",
    ],
    snippet: {
      language: "ts",
      code: `// Pseudo-code for a gateway request handler.
const claraPreamble = await fs.readFile("clara/system-prompt.md", "utf8");

async function handle(req: ChatRequest) {
  const messages = [
    { role: "system", content: claraPreamble },
    ...req.messages,
  ];
  return forwardToLLM({ ...req, messages });
}`,
    },
  },
  {
    slug: "self-hosted",
    label: "Self-hosted inference",
    context: "vLLM, Ollama, TGI, or other on-prem inference servers.",
    fileTarget:
      "Set CLARA as the default system prompt in your server's configuration.",
    steps: [
      "Download `dist/system-prompt.md` and place it on the inference host.",
      "Point the server's default-system-prompt config field at the file path.",
      "Restart the inference service so the new default applies to all sessions.",
    ],
    snippet: {
      language: "bash",
      code: `# Example: vLLM with a default system prompt
vllm serve <model> \\
  --chat-template clara/system-prompt.md \\
  --port 8000`,
    },
  },
  {
    slug: "vendor-hosted",
    label: "Vendor-hosted LLM",
    context:
      "Enterprise contracts with a hosted model provider (Anthropic, OpenAI, etc.).",
    fileTarget:
      "Install via the host's organisation-level system-prompt slot, or as default project instructions on a shared workspace.",
    steps: [
      "Download `dist/system-prompt.md`.",
      "Paste the contents into your vendor's organisation-level system-prompt field.",
      "If no org-level slot exists, create a shared Project / workspace with CLARA in its default instructions and direct users to it.",
    ],
  },
  {
    slug: "chat-ui",
    label: "Internal chat UI",
    context: "Custom front-end wrapping an LLM (Streamlit, internal portal, etc.).",
    fileTarget:
      "Inject CLARA on every conversation start in the UI's backend.",
    steps: [
      "Bundle `dist/system-prompt.md` with your UI's backend deployment.",
      "Read the file once at process start.",
      "Prepend the contents as the first `system` message of every new conversation thread.",
    ],
  },
  {
    slug: "skill-loader",
    label: "Skill loader",
    context: "Claude Code, the Anthropic Agent SDK, or Claude Desktop.",
    fileTarget: "Load `dist/SKILL.md` as a skill bundle.",
    steps: [
      "Download `dist/SKILL.md` — the frontmatter-wrapped variant.",
      "Place it where your host loads skills from (e.g. `~/.claude/skills/` for Claude Code).",
      "CLARA activates automatically when invoked by slug.",
    ],
    snippet: {
      language: "bash",
      code: `# Claude Code: drop the skill into the skills directory
mkdir -p ~/.claude/skills/clara
cp dist/SKILL.md ~/.claude/skills/clara/SKILL.md`,
    },
  },
];
