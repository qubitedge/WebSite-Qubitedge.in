import { useCMS } from "@/lib/cms";
import { BlockRenderer } from "./BlockRenderer";

export function Home() {
  const { content } = useCMS();
  const bg = content.background;

  return (
    <div className="relative text-white">
      {/* Persistent background — visible while scrolling all sections */}
      {bg?.enabled && (bg.videoUrl || bg.imageUrl) && (
        <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
          {bg.videoUrl ? (
            <video
              key={bg.videoUrl}
              className="h-full w-full object-cover"
              style={{ opacity: bg.opacity ?? 0.25 }}
              autoPlay
              loop
              muted
              playsInline
              src={bg.videoUrl}
            />
          ) : (
            <img
              src={bg.imageUrl}
              alt=""
              className="h-full w-full object-cover"
              style={{ opacity: bg.opacity ?? 0.25 }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
        </div>
      )}

      {content.blocks.map((b) => (
        <BlockRenderer key={b.id} block={b} />
      ))}

      <footer className="relative border-t border-white/10 py-12 bg-black/60 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
          <div>{content.footer.copyright}</div>
          <div className="flex gap-6">
            {content.footer.links.map((l) => (
              <a key={l.label} href={l.href} className="hover:text-white">
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
