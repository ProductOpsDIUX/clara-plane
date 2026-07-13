import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CLARA — named for the Latin clarus, \"clear\"",
  description:
    "CLARA reads your programme's knowledge base, turns raw field notes into evidence-backed insights, and files them back as research artefacts across the Research, Design, and Test phases of the ProductOps pipeline — cited to source, never fabricated.",
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
