import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Sparkles, Plus, Minus } from "lucide-react";
import { useState } from "react";
import type { Block } from "@/lib/cms";
import { scrollToAnchor } from "@/lib/cms";
import { ShinyText } from "./ShinyText";
import { MagneticButton } from "./MagneticButton";
import { TiltCard } from "./TiltCard";

function CTAButton({ label, anchor, variant = "primary" }: { label: string; anchor?: string; variant?: "primary" | "secondary" }) {
  const cls =
    variant === "primary"
      ? "bg-white text-black hover:bg-white/90"
      : "border border-white/30 text-white hover:bg-white/10";
  return (
    <MagneticButton
      onClick={() => anchor && scrollToAnchor(anchor)}
      className={`group inline-flex items-center gap-2 rounded-full px-6 md:px-8 py-3 md:py-4 text-sm md:text-base transition-colors ${cls}`}
    >
      {label}
      {variant === "primary" ? (
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      ) : (
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      )}
    </MagneticButton>
  );
}

export function BlockRenderer({ block }: { block: Block }) {
  const d = block.data;
  const anchor = block.anchor;

  switch (block.type) {
    case "hero":
      return (
        <section id={anchor} data-accent="#64CEFB" className="relative min-h-screen w-full overflow-hidden pt-16">
          {d.videoUrl && (
            <video className="absolute inset-0 h-full w-full object-cover" autoPlay loop muted playsInline src={d.videoUrl} />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-16">
              <p className="text-sm md:text-base text-white/80 max-w-md">{d.topLeft}</p>
              <p className="text-sm md:text-base text-white/80 lg:text-right">{d.topRight}</p>
            </div>
            <div className="text-center flex flex-col items-center">
              {d.eyebrow && <p className="text-xs md:text-sm uppercase tracking-tight text-white/80 mb-4" style={{ color: 'var(--accent-color, #64CEFB)' }}>{d.eyebrow}</p>}
              <h1 className="tracking-tighter font-medium" style={{ lineHeight: 0.85 }}>
                <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-white">{d.titleLine1}</span>
                <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
                  <ShinyText text={d.titleLine2 || ""} />
                </span>
              </h1>
              {d.subtitle && <p className="mt-8 max-w-2xl text-sm md:text-base text-white/80">{d.subtitle}</p>}
              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                {d.primaryCta?.label && <CTAButton label={d.primaryCta.label} anchor={d.primaryCta.anchor} />}
                {d.secondaryCta?.label && <CTAButton label={d.secondaryCta.label} anchor={d.secondaryCta.anchor} variant="secondary" />}
              </div>
            </div>
          </div>
        </section>
      );

    case "features":
      return (
        <section id={anchor} data-accent="#64CEFB" className="py-24 md:py-32 border-t border-white/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              <div>
                <p className="text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--accent-color, #64CEFB)' }}>{d.eyebrow}</p>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter" style={{ lineHeight: 0.95 }}>{d.title}</h2>
              </div>
              <p className="text-white/70 text-base md:text-lg self-end">{d.intro}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden">
              {(d.items || []).map((f: any, i: number) => (
                <TiltCard key={f.id || i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }} className="bg-black p-8 hover:bg-white/[0.03] transition-colors">
                  <Sparkles className="h-6 w-6 mb-6" style={{ color: 'var(--accent-color, #64CEFB)' }} />
                  <h3 className="text-lg font-medium mb-3">{f.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{f.body}</p>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>
      );

    case "workshops":
      return (
        <section id={anchor} data-accent="#64CEFB" className="py-24 md:py-32 border-t border-white/10 bg-black/40 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 max-w-3xl">
              <p className="text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--accent-color, #64CEFB)' }}>{d.eyebrow}</p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter mb-6" style={{ lineHeight: 0.95 }}>{d.title}</h2>
              <p className="text-white/70 text-base md:text-lg">{d.intro}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(d.items || []).map((w: any, i: number) => (
                <TiltCard key={w.id || i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-8 hover:bg-white/[0.04] transition-all" style={{ borderColor: 'var(--accent-color, rgba(255,255,255,0.1))' }}>
                  <span className="text-xs uppercase tracking-widest mb-6" style={{ color: 'var(--accent-color, #64CEFB)' }}>{w.tag}</span>
                  <h3 className="text-2xl font-medium mb-4 tracking-tight">{w.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed mb-8 flex-1">{w.body}</p>
                  <span className="group inline-flex items-center gap-2 text-sm font-medium w-fit">
                    {w.cta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>
      );

    case "testimonials":
      return (
        <section id={anchor} data-accent="#F59E0B" className="py-24 md:py-32 border-t border-white/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 max-w-3xl">
              <p className="text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--accent-color, #F59E0B)' }}>{d.eyebrow}</p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter mb-6" style={{ lineHeight: 0.95 }}>{d.title}</h2>
              {d.intro && <p className="text-white/70 text-base md:text-lg">{d.intro}</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(d.items || []).map((t: any, i: number) => (
                <motion.figure key={t.id || i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} className="rounded-2xl border border-white/10 p-8 bg-white/[0.02]">
                  <blockquote className="text-lg md:text-xl text-white/90 leading-relaxed mb-6">"{t.quote}"</blockquote>
                  <figcaption className="flex items-center gap-3 text-sm text-white/60">
                    <div className="h-10 w-10 rounded-full" style={{ background: `linear-gradient(to bottom right, var(--accent-color, #F59E0B), rgba(255,255,255,0.1))` }} />
                    <div>
                      <div className="text-white">{t.author}</div>
                      <div className="text-xs">{t.role}</div>
                    </div>
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          </div>
        </section>
      );

    case "articles":
      return (
        <section id={anchor} data-accent="#8B5CF6" className="py-24 md:py-32 border-t border-white/10 bg-black/40 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 max-w-3xl">
              <p className="text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--accent-color, #8B5CF6)' }}>{d.eyebrow}</p>
              <h2 className="text-4xl md:text-5xl font-medium tracking-tighter mb-6" style={{ lineHeight: 0.95 }}>{d.title}</h2>
              {d.intro && <p className="text-white/70">{d.intro}</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(d.items || []).map((a: any, i: number) => (
                <TiltCard key={a.id || i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} className="group flex flex-col rounded-2xl border border-white/10 overflow-hidden transition-all" style={{ borderColor: 'var(--accent-color, rgba(255,255,255,0.1))' }}>
                  {a.imageUrl ? (
                    <div className="aspect-[16/10] overflow-hidden">
                      <img src={a.imageUrl} alt={a.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                  ) : (
                    <div className="aspect-[16/10]" style={{ background: `linear-gradient(to bottom right, var(--accent-color, #8B5CF6), black)` }} />
                  )}
                  <div className="p-6 flex-1 flex flex-col">
                    <span className="text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--accent-color, #8B5CF6)' }}>{a.tag}</span>
                    <h3 className="text-xl font-medium mb-3 tracking-tight transition-colors" style={{ color: 'var(--accent-color, #8B5CF6)' }}>{a.title}</h3>
                    <p className="text-sm text-white/60 leading-relaxed">{a.excerpt}</p>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>
      );

    case "faq":
      return <FAQBlock block={block} />;

    case "cta":
      return (
        <section id={anchor} data-accent="#EC4899" className="py-24 md:py-32 border-t border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20" style={{ background: `linear-gradient(to bottom right, var(--accent-color, #EC4899), transparent)` }} />
          <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tighter mb-6" style={{ lineHeight: 0.95 }}>
              {d.highlight && d.title?.includes(d.highlight) ? (
                <>
                  {d.title.split(d.highlight)[0]}
                  <ShinyText text={d.highlight} />
                  {d.title.split(d.highlight)[1]}
                </>
              ) : (
                d.title
              )}
            </h2>
            <p className="text-white/70 text-base md:text-lg max-w-2xl mx-auto mb-10">{d.body}</p>
            {d.ctaLabel && (
              <MagneticButton className="group inline-flex items-center gap-2 rounded-full bg-white text-black px-8 py-4 text-base hover:bg-white/90 transition-colors">
                {d.ctaLabel}
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </MagneticButton>
            )}
          </div>
        </section>
      );

    case "richText":
      return (
        <section id={anchor} data-accent="#64CEFB" className="py-24 md:py-32 border-t border-white/10">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            {d.eyebrow && <p className="text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--accent-color, #64CEFB)' }}>{d.eyebrow}</p>}
            {d.title && <h2 className="text-4xl md:text-5xl font-medium tracking-tighter mb-6">{d.title}</h2>}
            {d.body && <p className="text-white/70 text-base md:text-lg whitespace-pre-line leading-relaxed">{d.body}</p>}
          </div>
        </section>
      );

    case "story":
      return (
        <section id={anchor} data-accent="#64CEFB" className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
          <div className="max-w-3xl mx-auto text-center mb-16 relative">
            {d.title && (
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                {d.title}
              </h1>
            )}
            {d.subtitle && (
              <h2 className="text-2xl md:text-3xl font-medium mb-8" style={{ color: 'var(--accent-color, #64CEFB)' }}>
                {d.subtitle}
              </h2>
            )}
            {d.bodyBeforeQuote && (
              <p className="text-lg text-white/80 leading-relaxed mb-6 whitespace-pre-line">
                {d.bodyBeforeQuote}
              </p>
            )}
            {d.quote && (
              <div className="py-8 my-8 border-y border-white/10 relative">
                <div className="absolute left-0 top-0 w-1/4 h-px" style={{ background: `linear-gradient(to right, transparent, var(--accent-color, #64CEFB))` }} />
                <div className="absolute right-0 bottom-0 w-1/4 h-px" style={{ background: `linear-gradient(to left, transparent, var(--accent-color, #64CEFB))` }} />
                <p className="text-2xl md:text-3xl font-semibold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                  {d.quote}
                </p>
              </div>
            )}
            {d.bodyAfterQuote && (
              <p className="text-lg text-white/80 leading-relaxed mb-6 whitespace-pre-line">
                {d.bodyAfterQuote}
              </p>
            )}
          </div>
        </section>
      );

    case "profile":
      return (
        <section id={anchor} data-accent="#64CEFB" className="py-16 md:py-24 border-t border-white/10 relative">
          <div className="mt-8 max-w-5xl mx-auto relative px-4 sm:px-6 lg:px-8">
            <div className="absolute -inset-4 blur-2xl -z-10 rounded-full opacity-20" style={{ background: `linear-gradient(to bottom right, var(--accent-color, #64CEFB), transparent)` }} />
            {d.title && <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{d.title}</h2>}
            <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl p-8 md:p-12 flex flex-col md:flex-row gap-10 items-center">
              <div className="w-56 h-56 md:w-72 md:h-72 shrink-0 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.1)] border border-white/15 relative group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <img src={d.imageUrl || "/ceo.png"} alt={d.name || "Profile"} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-3xl font-bold mb-2">{d.name}</h3>
                    <p className="font-medium text-lg" style={{ color: 'var(--accent-color, #64CEFB)' }}>{d.role}</p>
                  </div>
                </div>
                {d.bio && (
                  <div className="space-y-4 text-white/80 leading-relaxed text-lg whitespace-pre-line">
                    {d.bio}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      );

    default:
      return null;
  }
}

function FAQBlock({ block }: { block: Block }) {
  const d = block.data;
  const [open, setOpen] = useState<string | null>(null);
  return (
    <section id={block.anchor} data-accent="#10B981" className="py-24 md:py-32 border-t border-white/10">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--accent-color, #10B981)' }}>{d.eyebrow}</p>
        <h2 className="text-4xl md:text-5xl font-medium tracking-tighter mb-10" style={{ lineHeight: 0.95 }}>{d.title}</h2>
        <div className="divide-y divide-white/10 border-y border-white/10">
          {(d.items || []).map((f: any) => {
            const isOpen = open === f.id;
            return (
              <button key={f.id} onClick={() => setOpen(isOpen ? null : f.id)} className="w-full text-left py-6 flex items-start gap-4">
                <span className="flex-1">
                  <span className="block text-lg font-medium">{f.q}</span>
                  {isOpen && <span className="mt-3 block text-white/70 text-sm md:text-base leading-relaxed">{f.a}</span>}
                </span>
                {isOpen ? <Minus className="h-5 w-5 mt-1 shrink-0" style={{ color: 'var(--accent-color, #10B981)' }} /> : <Plus className="h-5 w-5 mt-1 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
