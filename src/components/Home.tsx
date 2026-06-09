import { useCMS } from "@/lib/cms";
import { BlockRenderer } from "./BlockRenderer";

export function Home() {
  const { content } = useCMS();
  return (
    <div className="bg-black text-white">
      {content.blocks.map((b) => (
        <BlockRenderer key={b.id} block={b} />
      ))}
      <footer className="border-t border-white/10 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
          <div>{content.footer.copyright}</div>
          <div className="flex gap-6">
            {content.footer.links.map((l) => (
              <a key={l.label} href={l.href} className="hover:text-white">{l.label}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
