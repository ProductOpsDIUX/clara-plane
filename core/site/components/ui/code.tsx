"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { type HTMLAttributes, forwardRef, useCallback, useRef, useState } from "react";

// Inline code
export const Code = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <code
      ref={ref}
      className={cn(
        "relative rounded border border-border bg-bg-muted px-[0.4em] py-[0.2em]",
        "font-mono text-[0.875em] text-fg",
        className,
      )}
      {...props}
    />
  ),
);
Code.displayName = "Code";

// Block code (preformatted) with a copy-to-clipboard control in the top-right.
export const CodeBlock = forwardRef<HTMLPreElement, HTMLAttributes<HTMLPreElement>>(
  ({ className, children, ...props }, ref) => {
    const preRef = useRef<HTMLPreElement | null>(null);
    const [copied, setCopied] = useState(false);

    // Keep our internal ref and any forwarded ref in sync.
    const setRefs = useCallback(
      (node: HTMLPreElement | null) => {
        preRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      [ref],
    );

    // Copy everything rendered inside the box, regardless of whether the
    // children are a raw string or a nested <code> element.
    const handleCopy = useCallback(async () => {
      const text = preRef.current?.innerText ?? "";
      if (!text) return;
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
      } catch {
        /* clipboard unavailable — no-op */
      }
    }, []);

    return (
      <div className="group relative">
        <pre
          ref={setRefs}
          className={cn(
            "overflow-x-auto rounded-lg border border-border bg-bg-muted p-4 pr-12",
            "font-mono text-sm text-fg leading-relaxed",
            className,
          )}
          {...props}
        >
          {children}
        </pre>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCopy}
          aria-label={copied ? "Copied" : "Copy to clipboard"}
          title={copied ? "Copied" : "Copy"}
          className="absolute right-2 top-2 h-8 w-8 text-fg-subtle hover:bg-bg-subtle hover:text-fg"
        >
          {copied ? (
            <Check className="h-4 w-4 text-success" aria-hidden />
          ) : (
            <Copy className="h-4 w-4" aria-hidden />
          )}
        </Button>
      </div>
    );
  },
);
CodeBlock.displayName = "CodeBlock";
