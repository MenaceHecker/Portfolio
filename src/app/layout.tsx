import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/lib/data";
import DotGrid from "@/components/ui/DotGrid";
import ScrollProgressBar from "@/components/ui/ScrollProgressBar";
import PageTransition from "@/components/ui/PageTransition";
import CustomCursor from "@/components/ui/CustomCursor";

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.role}`,
  description: siteConfig.description,
  keywords: ["backend engineer", "cloud infrastructure", "AI products", "Next.js", "AWS", "Python"],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="noise-bg">
        <ScrollProgressBar />
        <PageTransition />
        <DotGrid />
        <CustomCursor />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
