import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CLARA — Confluence Learning & AI Research Assistant",
  description:
    "CLARA reads your programme's Confluence knowledge base, turns raw field notes into evidence-backed insights, and files them back as Research artefacts — cited to source, never fabricated.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-zone="enterprise" data-mode="light">
      <body>{children}</body>
    </html>
  );
}
