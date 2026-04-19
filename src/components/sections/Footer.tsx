import { siteConfig } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="px-5 md:px-10 py-6 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-2">
      <span className="font-mono text-[11px] text-text-dim">
        © {year} {siteConfig.name}
      </span>
      <span className="font-mono text-[11px] text-text-dim">
        Built with Next.js + Tailwind + Framer Motion
      </span>
    </footer>
  );
}
