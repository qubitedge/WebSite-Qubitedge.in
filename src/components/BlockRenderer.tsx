import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight, Sparkles, Plus, Minus, Trash2, ChevronDown, X, Edit2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useState, useRef } from "react";
import type { Block } from "@/lib/cms";
import { scrollToAnchor, useCMS } from "@/lib/cms";
import { useAdmin } from "@/lib/AdminContext";
import { EditableText } from "./EditableText";
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

function ParallaxContent({ children, offset = 50, className = "", style = {} }: { children: React.ReactNode, offset?: number, className?: string, style?: React.CSSProperties }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  return (
    <motion.div ref={ref} style={{ y, ...style }} className={className}>
      {children}
    </motion.div>
  );
}

/* ---------- Main renderer ---------- */

type BlockRendererProps = {
  block: Block;
  /** Page ID for CMS updates */
  pageId?: string;
};

export function BlockRenderer({ block, pageId = "home" }: BlockRendererProps) {
  const d = block.data;
  const anchor = block.anchor;
  const { isAdmin } = useAdmin();
  const { updateBlock } = useCMS();
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});
  const [editingAnnIndex, setEditingAnnIndex] = useState<number | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Helper to update a top-level field on this block
  const set = (key: string, value: any) => updateBlock(block.id, { [key]: value }, pageId);

  // Helper to update a nested CTA field
  const setCta = (ctaKey: string, field: string, value: string) =>
    updateBlock(block.id, { [ctaKey]: { ...d[ctaKey], [field]: value } }, pageId);

  // Helper to update an item in an items array
  const updateItem = (idx: number, patch: Record<string, any>) =>
    set("items", (d.items || []).map((it: any, i: number) => (i === idx ? { ...it, ...patch } : it)));

  const removeItem = (idx: number) =>
    set("items", (d.items || []).filter((_: any, i: number) => i !== idx));

  const addItem = (template: Record<string, any>) =>
    set("items", [...(d.items || []), { id: Math.random().toString(36).slice(2, 10), ...template }]);

  switch (block.type) {
    case "hero":
      {
        const accent = d.accentColor || "#64CEFB";
        return (
          <section id={anchor} data-accent={accent} style={{ "--accent-color": accent } as React.CSSProperties} className="relative w-full overflow-hidden pt-16">
          {d.videoUrl && (
            <ParallaxContent offset={120} className="absolute inset-0 h-[140%] w-full -top-[20%] z-0">
              <video className="absolute inset-0 h-full w-full object-cover" autoPlay loop muted playsInline src={d.videoUrl} />
              <div className="absolute inset-0 bg-black/40" />
            </ParallaxContent>
          )}
          <ParallaxContent offset={40} className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-12 md:pb-24">
            {(d.topLeft || d.topRight || isAdmin) && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-16">
                <EditableText as="p" className="text-sm md:text-base text-white/80 max-w-md" value={d.topLeft || ""} onChange={(v) => set("topLeft", v)} placeholder="Top left text…" />
                <EditableText as="p" className="text-sm md:text-base text-white/80 lg:text-right" value={d.topRight || ""} onChange={(v) => set("topRight", v)} placeholder="Top right text…" />
              </div>
            )}
            <div className="text-center flex flex-col items-center">
              {(d.eyebrow || isAdmin) && (
                <EditableText as="p" className="text-xs md:text-sm uppercase tracking-tight text-white/80 mb-4" style={{ color: 'var(--accent-color, #64CEFB)' }} value={d.eyebrow || ""} onChange={(v) => set("eyebrow", v)} placeholder="Eyebrow…" />
              )}
              <h1 className="tracking-tighter font-medium" style={{ lineHeight: 0.85 }}>
                <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-white">
                  {isAdmin ? (
                    <EditableText as="span" className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-white tracking-tighter font-medium" value={d.titleLine1 || ""} onChange={(v) => set("titleLine1", v)} placeholder="Title line 1…" />
                  ) : (
                    d.titleLine1
                  )}
                </span>
                <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
                  {isAdmin ? (
                    <EditableText as="span" className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-tighter font-medium bg-gradient-to-r from-white to-[#64CEFB] bg-clip-text text-transparent" value={d.titleLine2 || ""} onChange={(v) => set("titleLine2", v)} placeholder="Title line 2…" />
                  ) : (
                    <ShinyText text={d.titleLine2 || ""} />
                  )}
                </span>
              </h1>
              {(d.subtitle || isAdmin) && (
                <EditableText as="p" className="mt-6 md:mt-8 max-w-2xl text-sm md:text-base text-white/80" value={d.subtitle || ""} onChange={(v) => set("subtitle", v)} multiline placeholder="Subtitle text…" />
              )}
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                {d.primaryCta?.label && <CTAButton label={d.primaryCta.label} anchor={d.primaryCta.anchor} />}
                {d.secondaryCta?.label && <CTAButton label={d.secondaryCta.label} anchor={d.secondaryCta.anchor} variant="secondary" />}
              </div>

              {/* Announcements Section */}
              {((d.announcements && d.announcements.length > 0) || isAdmin) && (
                <div className="mt-12 w-full max-w-4xl mx-auto flex flex-col items-center gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    {(d.announcements || []).map((ann: any, idx: number) => (
                      <motion.div
                        key={ann.id || idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -5, scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                        className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md p-6 flex flex-col justify-between min-h-[160px] text-left cursor-pointer"
                        onClick={() => {
                          if (!isAdmin && ann.link) {
                            if (ann.link.startsWith("http")) {
                              window.open(ann.link, "_blank");
                            } else {
                              window.location.href = ann.link;
                            }
                          }
                        }}
                      >
                        {/* Background media */}
                        {ann.bgType === "image" && ann.bgUrl && (
                          <>
                            <img src={ann.bgUrl} className="absolute inset-0 w-full h-full object-cover z-0 opacity-20 group-hover:opacity-30 transition-opacity" alt="" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-0" />
                          </>
                        )}
                        {ann.bgType === "video" && ann.bgUrl && (
                          <>
                            <video src={ann.bgUrl} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-20 group-hover:opacity-30 transition-opacity" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-0" />
                          </>
                        )}
                        {ann.bgType !== "image" && ann.bgType !== "video" && (
                          <div className="absolute inset-0 z-0" style={{ background: ann.bgGradient || 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 100%)' }} />
                        )}

                        <div className="relative z-10 flex flex-col h-full justify-between gap-4">
                          <div>
                            {ann.tag && (
                              <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-3" style={{ backgroundColor: 'var(--accent-color, #64CEFB)', color: '#000' }}>
                                {ann.tag}
                              </span>
                            )}
                            <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-[var(--accent-color)] transition-colors">
                              {ann.title}
                            </h3>
                            <p className="text-white/60 text-sm mt-1 line-clamp-2">
                              {ann.description}
                            </p>
                          </div>
                          
                          {ann.link && (
                            <div className="flex items-center gap-1 text-xs font-medium text-white/80 group-hover:text-white transition-colors mt-auto">
                              <span>Learn More</span>
                              <ArrowUpRight className="h-3.5 w-3.5" />
                            </div>
                          )}
                        </div>

                        {/* Admin Edit/Delete overlays */}
                        {isAdmin && (
                          <div className="absolute top-3 right-3 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-md p-1.5 rounded-lg border border-white/10">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingAnnIndex(idx);
                              }}
                              className="p-1 hover:text-[var(--accent-color)] text-white/85 transition-colors"
                              title="Edit Announcement"
                            >
                              <Edit2 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (confirm("Delete this announcement?")) {
                                  const next = (d.announcements || []).filter((_: any, i: number) => i !== idx);
                                  set("announcements", next);
                                }
                              }}
                              className="p-1 hover:text-red-400 text-white/85 transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        )}
                      </motion.div>
                    ))}

                    {/* Add Announcement Slot (Only visible when count < 2) */}
                    {isAdmin && (d.announcements || []).length < 2 && (
                      <button
                        onClick={() => {
                          const next = [
                            ...(d.announcements || []),
                            {
                              id: Math.random().toString(36).slice(2, 10),
                              tag: "NEW",
                              title: "New Internship Opportunity",
                              description: "Apply now for our upcoming cohort.",
                              link: "/workshops",
                              bgType: "color",
                              bgUrl: "",
                              bgGradient: "linear-gradient(135deg, rgba(100, 206, 251, 0.1) 0%, rgba(0,0,0,0) 100%)",
                            }
                          ];
                          set("announcements", next);
                        }}
                        className="border border-dashed border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 transition-all rounded-2xl p-6 flex flex-col items-center justify-center min-h-[160px] text-white/60 hover:text-white group"
                      >
                        <div className="p-3 rounded-full bg-white/5 border border-white/10 group-hover:scale-110 transition-transform mb-2">
                          <Plus className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-sm font-medium">Add Announcement (Max 2)</span>
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Announcement Edit Modal */}
              {editingAnnIndex !== null && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 text-slate-800 flex flex-col"
                  >
                    {/* Header */}
                    <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                      <h3 className="font-semibold text-slate-900 text-lg flex items-center gap-2">
                        <Edit2 className="h-4 w-4 text-[#64CEFB]" />
                        Edit Announcement
                      </h3>
                      <button
                        onClick={() => setEditingAnnIndex(null)}
                        className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>

                    {/* Form Body */}
                    <div className="p-6 flex flex-col gap-4 overflow-y-auto max-h-[70vh] text-left">
                      {/* Badge / Tag */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                          Badge / Tag
                        </label>
                        <input
                          type="text"
                          value={d.announcements?.[editingAnnIndex]?.tag || ""}
                          onChange={(e) => {
                            const next = [...(d.announcements || [])];
                            next[editingAnnIndex] = { ...next[editingAnnIndex], tag: e.target.value };
                            set("announcements", next);
                          }}
                          placeholder="e.g. Internship, Announcement, NEW"
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#64CEFB]/20 focus:border-[#64CEFB] transition-all"
                        />
                      </div>

                      {/* Title */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                          Title
                        </label>
                        <input
                          type="text"
                          value={d.announcements?.[editingAnnIndex]?.title || ""}
                          onChange={(e) => {
                            const next = [...(d.announcements || [])];
                            next[editingAnnIndex] = { ...next[editingAnnIndex], title: e.target.value };
                            set("announcements", next);
                          }}
                          placeholder="Announcement Title"
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#64CEFB]/20 focus:border-[#64CEFB] transition-all font-semibold"
                        />
                      </div>

                      {/* Description */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                          Description
                        </label>
                        <textarea
                          value={d.announcements?.[editingAnnIndex]?.description || ""}
                          onChange={(e) => {
                            const next = [...(d.announcements || [])];
                            next[editingAnnIndex] = { ...next[editingAnnIndex], description: e.target.value };
                            set("announcements", next);
                          }}
                          placeholder="Brief description..."
                          rows={3}
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#64CEFB]/20 focus:border-[#64CEFB] transition-all resize-none"
                        />
                      </div>

                      {/* Link URL */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                          Link URL
                        </label>
                        <input
                          type="text"
                          value={d.announcements?.[editingAnnIndex]?.link || ""}
                          onChange={(e) => {
                            const next = [...(d.announcements || [])];
                            next[editingAnnIndex] = { ...next[editingAnnIndex], link: e.target.value };
                            set("announcements", next);
                          }}
                          placeholder="e.g. /workshops, https://example.com"
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#64CEFB]/20 focus:border-[#64CEFB] transition-all font-mono"
                        />
                      </div>

                      {/* Background Type */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                          Background Style
                        </label>
                        <div className="flex gap-2 mb-3">
                          {[
                            { value: "color", label: "Gradient Fallback" },
                            { value: "image", label: "Custom Image" },
                            { value: "video", label: "Custom Video" },
                          ].map((opt) => (
                            <button
                              key={opt.value}
                              onClick={() => {
                                const next = [...(d.announcements || [])];
                                next[editingAnnIndex] = { ...next[editingAnnIndex], bgType: opt.value };
                                set("announcements", next);
                              }}
                              className={`flex-1 py-1.5 px-3 border rounded-lg text-xs font-medium transition-all ${
                                d.announcements?.[editingAnnIndex]?.bgType === opt.value
                                  ? "border-[#64CEFB] bg-[#64CEFB]/10 text-[#1e6180]"
                                  : "border-slate-200 text-slate-600 hover:bg-slate-50"
                              }`}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>

                        {/* Background Media URL (if image or video) */}
                        {d.announcements?.[editingAnnIndex]?.bgType !== "color" && (
                          <div>
                            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                              Media Source URL
                            </label>
                            <input
                              type="text"
                              value={d.announcements?.[editingAnnIndex]?.bgUrl || ""}
                              onChange={(e) => {
                                const next = [...(d.announcements || [])];
                                next[editingAnnIndex] = { ...next[editingAnnIndex], bgUrl: e.target.value };
                                set("announcements", next);
                              }}
                              placeholder="URL to image or video file..."
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#64CEFB]/20 focus:border-[#64CEFB] transition-all font-mono"
                            />
                          </div>
                        )}

                        {/* Background Gradient preset if color */}
                        {d.announcements?.[editingAnnIndex]?.bgType === "color" && (
                          <div>
                            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                              Gradient Colorway
                            </label>
                            <div className="flex gap-2">
                              {[
                                { value: "linear-gradient(135deg, rgba(100, 206, 251, 0.1) 0%, rgba(0,0,0,0) 100%)", label: "Sky Blue" },
                                { value: "linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(0,0,0,0) 100%)", label: "Violet" },
                                { value: "linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(0,0,0,0) 100%)", label: "Pink" },
                                { value: "linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(0,0,0,0) 100%)", label: "Emerald" },
                              ].map((grad, i) => (
                                <button
                                  key={i}
                                  onClick={() => {
                                    const next = [...(d.announcements || [])];
                                    next[editingAnnIndex] = { ...next[editingAnnIndex], bgGradient: grad.value };
                                    set("announcements", next);
                                  }}
                                  className={`h-8 flex-1 rounded-lg border transition-all ${
                                    d.announcements?.[editingAnnIndex]?.bgGradient === grad.value
                                      ? "border-black scale-105 shadow-sm"
                                      : "border-slate-200 hover:scale-102"
                                  }`}
                                  style={{ background: grad.value }}
                                  title={grad.label}
                                />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                      <button
                        onClick={() => setEditingAnnIndex(null)}
                        className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-sm font-semibold rounded-lg transition-colors"
                      >
                        Done
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}

              {(d.stats || d.badges) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="mt-12 md:mt-16 w-full max-w-4xl mx-auto border-t border-white/10 pt-8"
                >
                  {d.stats && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                      {d.stats.map((stat: any, i: number) => (
                        <div key={i} className="flex flex-col items-center justify-center">
                          <span className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(to right, white, var(--accent-color, #64CEFB))` }}>
                            {stat.value}
                          </span>
                          <span className="text-white/60 text-xs md:text-sm mt-2 uppercase tracking-widest">{stat.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {d.badges && (
                    <div className="flex flex-col items-center">
                      <p className="text-white/50 text-xs uppercase tracking-widest mb-4">Technologies You'll Learn</p>
                      <div className="flex flex-wrap justify-center gap-2">
                        {d.badges.map((badge: string, i: number) => (
                          <motion.span
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6 + (i * 0.1), type: "spring" }}
                            className="px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/10 bg-white/5 text-white/80 text-xs md:text-sm hover:bg-white/10 hover:border-white/20 transition-all cursor-default"
                            style={{ boxShadow: `0 0 20px rgba(255,255,255,0.02)` }}
                          >
                            {badge}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </ParallaxContent>
        </section>
      );
    }

    case "features":
      {
        const accent = d.accentColor || "#64CEFB";
        return (
          <section id={anchor} data-accent={accent} style={{ "--accent-color": accent } as React.CSSProperties} className="py-24 md:py-32 border-t border-white/10">
          <ParallaxContent offset={30} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              <div>
                <EditableText as="p" className="text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--accent-color, #64CEFB)' }} value={d.eyebrow || ""} onChange={(v) => set("eyebrow", v)} placeholder="Eyebrow…" />
                <EditableText as="h2" className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter" style={{ lineHeight: 0.95 }} value={d.title || ""} onChange={(v) => set("title", v)} placeholder="Title…" />
              </div>
              <EditableText as="p" className="text-white/70 text-base md:text-lg self-end" value={d.intro || ""} onChange={(v) => set("intro", v)} multiline placeholder="Intro text…" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden">
              {(d.items || []).map((f: any, i: number) => (
                <TiltCard key={f.id || i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }} className="bg-black p-8 hover:bg-white/[0.03] transition-colors relative group/item">
                  {isAdmin && (
                    <button onClick={() => removeItem(i)} title="Remove item" className="absolute top-2 right-2 p-1.5 rounded-md bg-red-500/10 text-red-400 opacity-0 group-hover/item:opacity-100 hover:bg-red-500/20 transition-all z-10">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                  <Sparkles className="h-6 w-6 mb-6" style={{ color: 'var(--accent-color, #64CEFB)' }} />
                  <EditableText as="h3" className="text-lg font-medium mb-3" value={f.title || ""} onChange={(v) => updateItem(i, { title: v })} placeholder="Feature title…" />
                  <EditableText as="p" className="text-sm text-white/60 leading-relaxed" value={f.body || ""} onChange={(v) => updateItem(i, { body: v })} multiline placeholder="Feature description…" />
                </TiltCard>
              ))}
            </div>
            {isAdmin && (
              <button
                onClick={() => addItem({ title: "New Feature", body: "Describe the feature." })}
                className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-white/15 py-4 text-sm text-white/40 hover:text-[#64CEFB] hover:border-[#64CEFB]/30 transition-all"
              >
                <Plus className="h-4 w-4" /> Add Feature Item
              </button>
            )}
          </ParallaxContent>
        </section>
      );
    }

    case "workshops":
      {
        const accent = d.accentColor || "#64CEFB";
        return (
          <section id={anchor} data-accent={accent} style={{ "--accent-color": accent } as React.CSSProperties} className="py-24 md:py-32 border-t border-white/10 bg-black/40 backdrop-blur-sm relative overflow-hidden">
          <ParallaxContent offset={40} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="mb-16 max-w-3xl">
              <EditableText as="p" className="text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--accent-color, #64CEFB)' }} value={d.eyebrow || ""} onChange={(v) => set("eyebrow", v)} placeholder="Eyebrow…" />
              <EditableText as="h2" className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter mb-6" style={{ lineHeight: 0.95 }} value={d.title || ""} onChange={(v) => set("title", v)} placeholder="Title…" />
              <EditableText as="p" className="text-white/70 text-base md:text-lg" value={d.intro || ""} onChange={(v) => set("intro", v)} multiline placeholder="Intro text…" />
            </div>
            <div className="flex flex-col gap-12">
              {(d.items || []).map((w: any, i: number) => {
                const isEven = i % 2 === 0;
                return (
                  <TiltCard key={w.id || i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} rounded-3xl border border-white/10 bg-white/[0.02] overflow-hidden hover:bg-white/[0.04] transition-all relative group/item`} style={{ borderColor: 'var(--accent-color, rgba(255,255,255,0.1))' }}>
                    {isAdmin && (
                      <button onClick={() => removeItem(i)} title="Remove item" className="absolute top-3 right-3 p-1.5 rounded-md bg-red-500/10 text-red-400 opacity-0 group-hover/item:opacity-100 hover:bg-red-500/20 transition-all z-10">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                    <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
                      <EditableText as="span" className="text-xs uppercase tracking-widest mb-6" style={{ color: 'var(--accent-color, #64CEFB)' }} value={w.tag || ""} onChange={(v) => updateItem(i, { tag: v })} placeholder="Tag…" />
                      <EditableText as="h3" className="text-3xl md:text-4xl font-medium mb-6 tracking-tight" value={w.title || ""} onChange={(v) => updateItem(i, { title: v })} placeholder="Workshop title…" />
                      {(w.body || isAdmin) && (
                        <EditableText as="p" className="text-base text-white/60 leading-relaxed mb-6 whitespace-pre-line" value={w.body || ""} onChange={(v) => updateItem(i, { body: v })} multiline placeholder="Body text…" />
                      )}
                      {w.modules && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                          {w.modules.map((m: string, idx: number) => (
                            <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-3 text-xs md:text-sm text-white/80 text-center flex items-center justify-center shadow-inner hover:bg-white/10 transition-colors">
                              {m}
                            </div>
                          ))}
                        </div>
                      )}
                      {w.longDescription ? (
                        <div className="flex flex-col gap-4">
                          <button
                            onClick={() => toggleExpand(w.id || i.toString())}
                            className="group inline-flex items-center gap-2 text-sm font-medium w-fit cursor-pointer text-white/80 hover:text-white transition-colors"
                          >
                            {expandedIds[w.id || i.toString()] ? "Show Less" : w.cta}
                            <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${expandedIds[w.id || i.toString()] ? "rotate-180" : ""}`} />
                          </button>
                          <AnimatePresence initial={false}>
                            {expandedIds[w.id || i.toString()] && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="overflow-hidden"
                              >
                                <div className="mt-4 pt-6 border-t border-white/10 text-white/70">
                                  <ReactMarkdown
                                    components={{
                                      h1: ({node, ...props}) => <h1 className="text-xl md:text-2xl font-bold mb-4 text-white tracking-tight" {...props} />,
                                      h2: ({node, ...props}) => <h2 className="text-base md:text-lg font-semibold mb-3 mt-6 text-white tracking-tight" {...props} />,
                                      p: ({node, ...props}) => <p className="mb-4 leading-relaxed" {...props} />,
                                      ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-4 space-y-1.5 marker:text-white/30" {...props} />,
                                      li: ({node, ...props}) => <li className="pl-1" {...props} />,
                                      strong: ({node, ...props}) => <strong className="text-white font-semibold" {...props} />,
                                    }}
                                  >
                                    {w.longDescription}
                                  </ReactMarkdown>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <span className="group inline-flex items-center gap-2 text-sm font-medium w-fit cursor-pointer">
                          {w.cta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </span>
                      )}
                    </div>
                    <div className="flex-1 relative min-h-[300px] md:min-h-full bg-black/50 border-white/10" style={{ borderLeftWidth: isEven ? '1px' : '0', borderRightWidth: isEven ? '0' : '1px' }}>
                      {w.mediaUrl ? (
                         w.mediaUrl.includes("youtube.com") || w.mediaUrl.includes("youtu.be") ? (
                           <iframe className="absolute inset-0 w-full h-full border-none" src={w.mediaUrl.replace("watch?v=", "embed/").replace("youtu.be/", "www.youtube.com/embed/")} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                         ) : w.mediaUrl.includes(".mp4") || w.mediaUrl.includes("/video/upload/") ? (
                           <video className="absolute inset-0 w-full h-full object-cover" autoPlay loop muted playsInline controls src={w.mediaUrl} />
                         ) : (
                           <img src={w.mediaUrl} alt={w.title} className="absolute inset-0 w-full h-full object-cover" />
                         )
                      ) : (
                        <div className="absolute inset-0 w-full h-full flex items-center justify-center opacity-20" style={{ background: `linear-gradient(to bottom right, var(--accent-color, #64CEFB), transparent)` }}>
                          <div className="w-full h-full backdrop-blur-3xl" />
                        </div>
                      )}
                    </div>
                  </TiltCard>
                );
              })}
            </div>
            {isAdmin && (
              <button
                onClick={() => addItem({ tag: "Tag", title: "New Workshop", body: "Workshop description.", cta: "Learn More" })}
                className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-white/15 py-4 text-sm text-white/40 hover:text-[#64CEFB] hover:border-[#64CEFB]/30 transition-all"
              >
                <Plus className="h-4 w-4" /> Add Workshop Item
              </button>
            )}
          </ParallaxContent>
        </section>
      );
    }

    case "testimonials":
      {
        const accent = d.accentColor || "#F59E0B";
        return (
          <section id={anchor} data-accent={accent} style={{ "--accent-color": accent } as React.CSSProperties} className="py-24 md:py-32 border-t border-white/10">
          <ParallaxContent offset={30} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 max-w-3xl">
              <EditableText as="p" className="text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--accent-color, #F59E0B)' }} value={d.eyebrow || ""} onChange={(v) => set("eyebrow", v)} placeholder="Eyebrow…" />
              <EditableText as="h2" className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter mb-6" style={{ lineHeight: 0.95 }} value={d.title || ""} onChange={(v) => set("title", v)} placeholder="Title…" />
              {(d.intro || isAdmin) && (
                <EditableText as="p" className="text-white/70 text-base md:text-lg" value={d.intro || ""} onChange={(v) => set("intro", v)} multiline placeholder="Intro text…" />
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(d.items || []).map((t: any, i: number) => (
                <motion.figure key={t.id || i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} className="rounded-2xl border border-white/10 p-8 bg-white/[0.02] relative group/item">
                  {isAdmin && (
                    <button onClick={() => removeItem(i)} title="Remove item" className="absolute top-2 right-2 p-1.5 rounded-md bg-red-500/10 text-red-400 opacity-0 group-hover/item:opacity-100 hover:bg-red-500/20 transition-all z-10">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                  <blockquote className="text-lg md:text-xl text-white/90 leading-relaxed mb-6">
                    "<EditableText as="span" className="text-lg md:text-xl text-white/90 leading-relaxed" value={t.quote || ""} onChange={(v) => updateItem(i, { quote: v })} multiline placeholder="Quote text…" />"
                  </blockquote>
                  <figcaption className="flex items-center gap-3 text-sm text-white/60">
                    <div className="h-10 w-10 rounded-full" style={{ background: `linear-gradient(to bottom right, var(--accent-color, #F59E0B), rgba(255,255,255,0.1))` }} />
                    <div>
                      <EditableText as="div" className="text-white" value={t.author || ""} onChange={(v) => updateItem(i, { author: v })} placeholder="Author name…" />
                      <EditableText as="div" className="text-xs" value={t.role || ""} onChange={(v) => updateItem(i, { role: v })} placeholder="Role…" />
                    </div>
                  </figcaption>
                </motion.figure>
              ))}
            </div>
            {isAdmin && (
              <button
                onClick={() => addItem({ quote: "Great work.", author: "Name", role: "Role" })}
                className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-white/15 py-4 text-sm text-white/40 hover:text-[#64CEFB] hover:border-[#64CEFB]/30 transition-all"
              >
                <Plus className="h-4 w-4" /> Add Testimonial
              </button>
            )}
          </ParallaxContent>
        </section>
      );
    }

    case "articles":
      {
        const accent = d.accentColor || "#8B5CF6";
        return (
          <section id={anchor} data-accent={accent} style={{ "--accent-color": accent } as React.CSSProperties} className="py-24 md:py-32 border-t border-white/10 bg-black/40 backdrop-blur-sm">
          <ParallaxContent offset={40} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 max-w-3xl">
              <EditableText as="p" className="text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--accent-color, #8B5CF6)' }} value={d.eyebrow || ""} onChange={(v) => set("eyebrow", v)} placeholder="Eyebrow…" />
              <EditableText as="h2" className="text-4xl md:text-5xl font-medium tracking-tighter mb-6" style={{ lineHeight: 0.95 }} value={d.title || ""} onChange={(v) => set("title", v)} placeholder="Title…" />
              {(d.intro || isAdmin) && (
                <EditableText as="p" className="text-white/70" value={d.intro || ""} onChange={(v) => set("intro", v)} multiline placeholder="Intro text…" />
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(d.items || []).map((a: any, i: number) => (
                <TiltCard key={a.id || i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} className="group flex flex-col rounded-2xl border border-white/10 overflow-hidden transition-all relative group/item" style={{ borderColor: 'var(--accent-color, rgba(255,255,255,0.1))' }}>
                  {isAdmin && (
                    <button onClick={() => removeItem(i)} title="Remove item" className="absolute top-2 right-2 p-1.5 rounded-md bg-red-500/10 text-red-400 opacity-0 group-hover/item:opacity-100 hover:bg-red-500/20 transition-all z-10">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                  {a.imageUrl ? (
                    <div className="aspect-[16/10] overflow-hidden">
                      <img src={a.imageUrl} alt={a.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                  ) : (
                    <div className="aspect-[16/10]" style={{ background: `linear-gradient(to bottom right, var(--accent-color, #8B5CF6), black)` }} />
                  )}
                  <div className="p-6 flex-1 flex flex-col">
                    <EditableText as="span" className="text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--accent-color, #8B5CF6)' }} value={a.tag || ""} onChange={(v) => updateItem(i, { tag: v })} placeholder="Tag…" />
                    <EditableText as="h3" className="text-xl font-medium mb-3 tracking-tight transition-colors" style={{ color: 'var(--accent-color, #8B5CF6)' }} value={a.title || ""} onChange={(v) => updateItem(i, { title: v })} placeholder="Article title…" />
                    <EditableText as="p" className="text-sm text-white/60 leading-relaxed" value={a.excerpt || ""} onChange={(v) => updateItem(i, { excerpt: v })} multiline placeholder="Excerpt…" />
                  </div>
                </TiltCard>
              ))}
            </div>
            {isAdmin && (
              <button
                onClick={() => addItem({ tag: "Tag", title: "New Article", excerpt: "Article excerpt." })}
                className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-white/15 py-4 text-sm text-white/40 hover:text-[#64CEFB] hover:border-[#64CEFB]/30 transition-all"
              >
                <Plus className="h-4 w-4" /> Add Article
              </button>
            )}
          </ParallaxContent>
        </section>
      );
    }

    case "faq":
      return <FAQBlock block={block} pageId={pageId} />;

    case "cta":
      {
        const accent = d.accentColor || "#EC4899";
        return (
          <section id={anchor} data-accent={accent} style={{ "--accent-color": accent } as React.CSSProperties} className="py-24 md:py-32 border-t border-white/10 relative overflow-hidden">
          <ParallaxContent offset={60} className="absolute inset-0 opacity-20 -top-[20%] h-[140%] w-full" style={{ background: `linear-gradient(to bottom right, var(--accent-color, #EC4899), transparent)` }}><span /></ParallaxContent>
          <ParallaxContent offset={-20} className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tighter mb-6" style={{ lineHeight: 0.95 }}>
              {isAdmin ? (
                <EditableText as="span" className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tighter" value={d.title || ""} onChange={(v) => set("title", v)} placeholder="Title…" />
              ) : (
                d.highlight && d.title?.includes(d.highlight) ? (
                  <>
                    {d.title.split(d.highlight)[0]}
                    <ShinyText text={d.highlight} />
                    {d.title.split(d.highlight)[1]}
                  </>
                ) : (
                  d.title
                )
              )}
            </h2>
            <EditableText as="p" className="text-white/70 text-base md:text-lg max-w-2xl mx-auto mb-10" value={d.body || ""} onChange={(v) => set("body", v)} multiline placeholder="Body text…" />
            {d.ctaLabel && (
              <MagneticButton className="group inline-flex items-center gap-2 rounded-full bg-white text-black px-8 py-4 text-base hover:bg-white/90 transition-colors">
                {d.ctaLabel}
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </MagneticButton>
            )}
          </ParallaxContent>
        </section>
      );
    }

    case "richText":
      {
        const accent = d.accentColor || "#64CEFB";
        return (
          <section id={anchor} data-accent={accent} style={{ "--accent-color": accent } as React.CSSProperties} className="py-24 md:py-32 border-t border-white/10">
          <ParallaxContent offset={20} className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            {(d.eyebrow || isAdmin) && <EditableText as="p" className="text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--accent-color, #64CEFB)' }} value={d.eyebrow || ""} onChange={(v) => set("eyebrow", v)} placeholder="Eyebrow…" />}
            {(d.title || isAdmin) && <EditableText as="h2" className="text-4xl md:text-5xl font-medium tracking-tighter mb-6" value={d.title || ""} onChange={(v) => set("title", v)} placeholder="Title…" />}
            {(d.body || isAdmin) && <EditableText as="p" className="text-white/70 text-base md:text-lg whitespace-pre-line leading-relaxed" value={d.body || ""} onChange={(v) => set("body", v)} multiline placeholder="Body text…" />}
          </ParallaxContent>
        </section>
      );
    }

    case "story":
      {
        const accent = d.accentColor || "#64CEFB";
        return (
          <section id={anchor} data-accent={accent} style={{ "--accent-color": accent } as React.CSSProperties} className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
          <ParallaxContent offset={30} className="max-w-3xl mx-auto text-center mb-16 relative">
            {(d.title || isAdmin) && (
              <EditableText as="h1" className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent" value={d.title || ""} onChange={(v) => set("title", v)} placeholder="Title…" />
            )}
            {(d.subtitle || isAdmin) && (
              <EditableText as="h2" className="text-2xl md:text-3xl font-medium mb-8" style={{ color: 'var(--accent-color, #64CEFB)' }} value={d.subtitle || ""} onChange={(v) => set("subtitle", v)} placeholder="Subtitle…" />
            )}
            {(d.bodyBeforeQuote || isAdmin) && (
              <EditableText as="p" className="text-lg text-white/80 leading-relaxed mb-6 whitespace-pre-line" value={d.bodyBeforeQuote || ""} onChange={(v) => set("bodyBeforeQuote", v)} multiline placeholder="Body before quote…" />
            )}
            {(d.quote || isAdmin) && (
              <div className="py-8 my-8 border-y border-white/10 relative">
                <div className="absolute left-0 top-0 w-1/4 h-px" style={{ background: `linear-gradient(to right, transparent, var(--accent-color, #64CEFB))` }} />
                <div className="absolute right-0 bottom-0 w-1/4 h-px" style={{ background: `linear-gradient(to left, transparent, var(--accent-color, #64CEFB))` }} />
                <EditableText as="p" className="text-2xl md:text-3xl font-semibold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" value={d.quote || ""} onChange={(v) => set("quote", v)} multiline placeholder="Quote text…" />
              </div>
            )}
            {(d.bodyAfterQuote || isAdmin) && (
              <EditableText as="p" className="text-lg text-white/80 leading-relaxed mb-6 whitespace-pre-line" value={d.bodyAfterQuote || ""} onChange={(v) => set("bodyAfterQuote", v)} multiline placeholder="Body after quote…" />
            )}
          </ParallaxContent>
        </section>
      );
    }

    case "profile":
      {
        const accent = d.accentColor || "#64CEFB";
        return (
          <section id={anchor} data-accent={accent} style={{ "--accent-color": accent } as React.CSSProperties} className="py-16 md:py-24 border-t border-white/10 relative overflow-hidden">
          <ParallaxContent offset={20} className="mt-8 max-w-5xl mx-auto relative px-4 sm:px-6 lg:px-8">
            <div className="absolute -inset-4 blur-2xl -z-10 rounded-full opacity-20" style={{ background: `linear-gradient(to bottom right, var(--accent-color, #64CEFB), transparent)` }} />
            {(d.title || isAdmin) && <EditableText as="h2" className="text-3xl md:text-4xl font-bold text-center mb-12" value={d.title || ""} onChange={(v) => set("title", v)} placeholder="Section title…" />}
            <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl p-8 md:p-12 flex flex-col md:flex-row gap-10 items-center">
              <div className="w-56 h-72 md:w-72 md:h-96 shrink-0 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.1)] border border-white/15 relative group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <img src={d.imageUrl || "/ceo.webp"} alt={d.name || "Profile"} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <EditableText as="h3" className="text-3xl font-bold mb-2" value={d.name || ""} onChange={(v) => set("name", v)} placeholder="Name…" />
                    <EditableText as="p" className="font-medium text-lg" style={{ color: 'var(--accent-color, #64CEFB)' }} value={d.role || ""} onChange={(v) => set("role", v)} placeholder="Role…" />
                  </div>
                </div>
                {(d.bio || isAdmin) && (
                  <EditableText as="div" className="space-y-4 text-white/80 leading-relaxed text-lg whitespace-pre-line" value={d.bio || ""} onChange={(v) => set("bio", v)} multiline placeholder="Biography…" />
                )}
              </div>
            </div>
          </ParallaxContent>
        </section>
      );
    }

    case "customLayout":
      {
        const accent = d.accentColor || "#64CEFB";
        return (
          <section id={anchor} data-accent={accent} style={{ "--accent-color": accent } as React.CSSProperties} className="py-20 md:py-28 border-t border-white/10 relative overflow-hidden">
          {/* Admin configuration header */}
          {isAdmin && (
            <div className="mx-auto max-w-4xl mb-10 p-5 rounded-2xl border border-slate-200 bg-white/95 backdrop-blur-xl flex flex-wrap items-center justify-between gap-6 text-xs text-slate-800 shadow-[0_4px_30px_rgba(0,0,0,0.06)] relative z-30">
              <div className="flex items-center gap-3">
                <span className="text-slate-400 uppercase tracking-wider font-semibold">Shape / Layout:</span>
                <div className="flex bg-slate-50 rounded-lg p-0.5 border border-slate-200">
                  {(["centered", "split-left", "split-right", "grid"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => set("shape", s)}
                      className={`px-3 py-1.5 rounded-md capitalize transition-all ${
                        d.shape === s ? "bg-[#64CEFB] text-black font-semibold shadow-[0_0_15px_rgba(100,206,251,0.3)]" : "hover:text-black text-slate-600 hover:bg-slate-100/50"
                      }`}
                    >
                      {s.replace("-", " ")}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-4 flex-wrap">
                <span className="text-slate-400 uppercase tracking-wider font-semibold">Insert Elements:</span>
                <label className="flex items-center gap-1.5 cursor-pointer hover:text-slate-900 transition-colors font-medium">
                  <input
                    type="checkbox"
                    checked={!!d.showTitle}
                    onChange={(e) => set("showTitle", e.target.checked)}
                    className="rounded text-[#64CEFB] border-slate-300 bg-white focus:ring-0 focus:ring-offset-0"
                  />
                  <span>Title</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer hover:text-slate-900 transition-colors font-medium">
                  <input
                    type="checkbox"
                    checked={!!d.showSubtitle}
                    onChange={(e) => set("showSubtitle", e.target.checked)}
                    className="rounded text-[#64CEFB] border-slate-300 bg-white focus:ring-0 focus:ring-offset-0"
                  />
                  <span>Subtitle</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer hover:text-slate-900 transition-colors font-medium">
                  <input
                    type="checkbox"
                    checked={!!d.showCta}
                    onChange={(e) => set("showCta", e.target.checked)}
                    className="rounded text-[#64CEFB] border-slate-300 bg-white focus:ring-0 focus:ring-offset-0"
                  />
                  <span>CTA Button</span>
                </label>
                {d.shape !== "grid" && (
                  <label className="flex items-center gap-1.5 cursor-pointer hover:text-slate-900 transition-colors font-medium">
                    <input
                      type="checkbox"
                      checked={!!d.showMedia}
                      onChange={(e) => set("showMedia", e.target.checked)}
                      className="rounded text-[#64CEFB] border-slate-300 bg-white focus:ring-0 focus:ring-offset-0"
                    />
                    <span>Media</span>
                  </label>
                )}
              </div>
            </div>
          )}

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            {d.shape === "centered" && (
              <div className="text-center flex flex-col items-center max-w-3xl mx-auto">
                {d.showTitle && (
                  <EditableText
                    as="h2"
                    className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter mb-6 text-white"
                    value={d.title || ""}
                    onChange={(v) => set("title", v)}
                    placeholder="Custom Title..."
                  />
                )}
                {d.showSubtitle && (
                  <EditableText
                    as="p"
                    className="text-white/70 text-base md:text-lg mb-8 leading-relaxed"
                    value={d.subtitle || ""}
                    onChange={(v) => set("subtitle", v)}
                    multiline
                    placeholder="Custom Subtitle..."
                  />
                )}
                {d.showCta && (
                  <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                    <EditableText
                      as="span"
                      className="bg-white text-black hover:bg-white/90 rounded-full px-6 py-3 text-sm font-semibold transition-colors cursor-pointer"
                      value={d.ctaLabel || "Get Started"}
                      onChange={(v) => set("ctaLabel", v)}
                      placeholder="CTA Label..."
                    />
                    {isAdmin && (
                      <input
                        type="text"
                        placeholder="CTA Link/Anchor..."
                        value={d.ctaAnchor || ""}
                        onChange={(e) => set("ctaAnchor", e.target.value)}
                        className="bg-white border border-slate-200 rounded-full px-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#64CEFB] w-48 font-mono"
                      />
                    )}
                  </div>
                )}
                {d.showMedia && (
                  <div className="mt-10 w-full rounded-2xl overflow-hidden border border-white/15 bg-white/5 aspect-video relative group">
                    {d.mediaType === "video" ? (
                      <video src={d.mediaUrl} className="w-full h-full object-cover" autoPlay loop muted playsInline />
                    ) : (
                      <img src={d.mediaUrl} className="w-full h-full object-cover" alt="Media" />
                    )}
                    {isAdmin && (
                      <div className="absolute inset-0 bg-white/95 flex flex-col items-center justify-center gap-3 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-slate-800 text-xs font-bold uppercase tracking-wider">Media Settings</span>
                        <input
                          type="text"
                          value={d.mediaUrl || ""}
                          onChange={(e) => set("mediaUrl", e.target.value)}
                          className="bg-white border border-slate-200 rounded px-3 py-1.5 text-xs text-slate-800 w-2/3 focus:outline-none focus:border-[#64CEFB] font-mono"
                          placeholder="Media URL..."
                        />
                        <select
                          value={d.mediaType || "image"}
                          onChange={(e) => set("mediaType", e.target.value)}
                          className="bg-white border border-slate-200 rounded px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-[#64CEFB] cursor-pointer"
                        >
                          <option value="image">Image</option>
                          <option value="video">Video</option>
                        </select>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {d.shape === "split-left" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="flex flex-col items-start text-left">
                  {d.showTitle && (
                    <EditableText
                      as="h2"
                      className="text-4xl md:text-5xl font-medium tracking-tighter mb-6 text-left text-white"
                      value={d.title || ""}
                      onChange={(v) => set("title", v)}
                      placeholder="Custom Title..."
                    />
                  )}
                  {d.showSubtitle && (
                    <EditableText
                      as="p"
                      className="text-white/70 text-base md:text-lg mb-8 leading-relaxed text-left"
                      value={d.subtitle || ""}
                      onChange={(v) => set("subtitle", v)}
                      multiline
                      placeholder="Custom Subtitle..."
                    />
                  )}
                  {d.showCta && (
                    <div className="flex flex-col sm:flex-row gap-3 items-center">
                      <EditableText
                        as="span"
                        className="bg-white text-black hover:bg-white/90 rounded-full px-6 py-3 text-sm font-semibold transition-colors cursor-pointer"
                        value={d.ctaLabel || "Get Started"}
                        onChange={(v) => set("ctaLabel", v)}
                        placeholder="CTA Label..."
                      />
                      {isAdmin && (
                        <input
                          type="text"
                          placeholder="CTA Link/Anchor..."
                          value={d.ctaAnchor || ""}
                          onChange={(e) => set("ctaAnchor", e.target.value)}
                          className="bg-white border border-slate-200 rounded-full px-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#64CEFB] w-40 font-mono"
                        />
                      )}
                    </div>
                  )}
                </div>
                {d.showMedia && (
                  <div className="w-full rounded-2xl overflow-hidden border border-white/15 bg-white/5 aspect-[4/3] relative group">
                    {d.mediaType === "video" ? (
                      <video src={d.mediaUrl} className="w-full h-full object-cover" autoPlay loop muted playsInline />
                    ) : (
                      <img src={d.mediaUrl} className="w-full h-full object-cover" alt="Media" />
                    )}
                    {isAdmin && (
                      <div className="absolute inset-0 bg-white/95 flex flex-col items-center justify-center gap-3 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-slate-800 text-xs font-bold uppercase tracking-wider">Media Settings</span>
                        <input
                          type="text"
                          value={d.mediaUrl || ""}
                          onChange={(e) => set("mediaUrl", e.target.value)}
                          className="bg-white border border-slate-200 rounded px-3 py-1.5 text-xs text-slate-800 w-2/3 focus:outline-none focus:border-[#64CEFB] font-mono"
                          placeholder="Media URL..."
                        />
                        <select
                          value={d.mediaType || "image"}
                          onChange={(e) => set("mediaType", e.target.value)}
                          className="bg-white border border-slate-200 rounded px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-[#64CEFB] cursor-pointer"
                        >
                          <option value="image">Image</option>
                          <option value="video">Video</option>
                        </select>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {d.shape === "split-right" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  {d.showMedia && (
                    <div className="w-full rounded-2xl overflow-hidden border border-white/15 bg-white/5 aspect-[4/3] relative group">
                      {d.mediaType === "video" ? (
                        <video src={d.mediaUrl} className="w-full h-full object-cover" autoPlay loop muted playsInline />
                      ) : (
                        <img src={d.mediaUrl} className="w-full h-full object-cover" alt="Media" />
                      )}
                      {isAdmin && (
                        <div className="absolute inset-0 bg-white/95 flex flex-col items-center justify-center gap-3 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-slate-800 text-xs font-bold uppercase tracking-wider">Media Settings</span>
                          <input
                            type="text"
                            value={d.mediaUrl || ""}
                            onChange={(e) => set("mediaUrl", e.target.value)}
                            className="bg-white border border-slate-200 rounded px-3 py-1.5 text-xs text-slate-800 w-2/3 focus:outline-none focus:border-[#64CEFB] font-mono"
                            placeholder="Media URL..."
                          />
                          <select
                            value={d.mediaType || "image"}
                            onChange={(e) => set("mediaType", e.target.value)}
                            className="bg-white border border-slate-200 rounded px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-[#64CEFB] cursor-pointer"
                          >
                            <option value="image">Image</option>
                            <option value="video">Video</option>
                          </select>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-start text-left order-1 lg:order-2">
                  {d.showTitle && (
                    <EditableText
                      as="h2"
                      className="text-4xl md:text-5xl font-medium tracking-tighter mb-6 text-left text-white"
                      value={d.title || ""}
                      onChange={(v) => set("title", v)}
                      placeholder="Custom Title..."
                    />
                  )}
                  {d.showSubtitle && (
                    <EditableText
                      as="p"
                      className="text-white/70 text-base md:text-lg mb-8 leading-relaxed text-left"
                      value={d.subtitle || ""}
                      onChange={(v) => set("subtitle", v)}
                      multiline
                      placeholder="Custom Subtitle..."
                    />
                  )}
                  {d.showCta && (
                    <div className="flex flex-col sm:flex-row gap-3 items-center">
                      <EditableText
                        as="span"
                        className="bg-white text-black hover:bg-white/90 rounded-full px-6 py-3 text-sm font-semibold transition-colors cursor-pointer"
                        value={d.ctaLabel || "Get Started"}
                        onChange={(v) => set("ctaLabel", v)}
                        placeholder="CTA Label..."
                      />
                      {isAdmin && (
                        <input
                          type="text"
                          placeholder="CTA Link/Anchor..."
                          value={d.ctaAnchor || ""}
                          onChange={(e) => set("ctaAnchor", e.target.value)}
                          className="bg-white border border-slate-200 rounded-full px-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#64CEFB] w-40 font-mono"
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {d.shape === "grid" && (
              <div>
                <div className="text-center max-w-2xl mx-auto mb-16">
                  {d.showTitle && (
                    <EditableText
                      as="h2"
                      className="text-4xl md:text-5xl font-medium tracking-tighter mb-6 text-white"
                      value={d.title || ""}
                      onChange={(v) => set("title", v)}
                      placeholder="Custom Title..."
                    />
                  )}
                  {d.showSubtitle && (
                    <EditableText
                      as="p"
                      className="text-white/70 text-base"
                      value={d.subtitle || ""}
                      onChange={(v) => set("subtitle", v)}
                      multiline
                      placeholder="Custom Subtitle..."
                    />
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {(d.items || []).map((it: any, i: number) => (
                    <TiltCard key={it.id || i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }} className="bg-white/5 border border-white/10 rounded-2xl p-6 relative group/grid-item hover:bg-white/[0.08] transition-all">
                      {isAdmin && (
                        <button
                          onClick={() => removeItem(i)}
                          title="Remove item"
                          className="absolute top-2 right-2 p-1.5 rounded-md bg-red-500/10 text-red-400 opacity-0 group-hover/grid-item:opacity-100 hover:bg-red-500/20 transition-all z-10"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      )}
                      <EditableText
                        as="h3"
                        className="text-lg font-medium text-white mb-2"
                        value={it.title || ""}
                        onChange={(v) => updateItem(i, { title: v })}
                        placeholder="Item Title..."
                      />
                      <EditableText
                        as="p"
                        className="text-sm text-white/60 leading-relaxed font-light"
                        value={it.body || ""}
                        onChange={(v) => updateItem(i, { body: v })}
                        multiline
                        placeholder="Item Description..."
                      />
                    </TiltCard>
                  ))}
                  {isAdmin && (
                    <button
                      onClick={() => addItem({ title: "New Item", body: "Description goes here." })}
                      className="h-full min-h-[180px] rounded-2xl border-2 border-dashed border-white/15 flex flex-col items-center justify-center text-white/40 hover:text-[#64CEFB] hover:border-[#64CEFB]/40 transition-all p-6 gap-2 hover:bg-white/5"
                    >
                      <Plus className="h-5 w-5" /> Add Grid Item
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      );
    }

    default:
      return null;
  }
}

function FAQBlock({ block, pageId }: { block: Block; pageId: string }) {
  const d = block.data;
  const [open, setOpen] = useState<string | null>(null);
  const { isAdmin } = useAdmin();
  const { updateBlock } = useCMS();

  const set = (key: string, value: any) => updateBlock(block.id, { [key]: value }, pageId);
  const updateItem = (idx: number, patch: Record<string, any>) =>
    set("items", (d.items || []).map((it: any, i: number) => (i === idx ? { ...it, ...patch } : it)));
  const removeItem = (idx: number) =>
    set("items", (d.items || []).filter((_: any, i: number) => i !== idx));
  const addItem = () =>
    set("items", [...(d.items || []), { id: Math.random().toString(36).slice(2, 10), q: "New question?", a: "Answer here." }]);

  const accent = d.accentColor || "#10B981";
  return (
    <section id={block.anchor} data-accent={accent} style={{ "--accent-color": accent } as React.CSSProperties} className="py-24 md:py-32 border-t border-white/10">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <EditableText as="p" className="text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--accent-color, #10B981)' }} value={d.eyebrow || ""} onChange={(v) => set("eyebrow", v)} placeholder="Eyebrow…" />
        <EditableText as="h2" className="text-4xl md:text-5xl font-medium tracking-tighter mb-10" style={{ lineHeight: 0.95 }} value={d.title || ""} onChange={(v) => set("title", v)} placeholder="Title…" />
        <div className="divide-y divide-white/10 border-y border-white/10">
          {(d.items || []).map((f: any, i: number) => {
            const isOpen = open === f.id;
            return (
              <div key={f.id} className="relative group/item">
                {isAdmin && (
                  <button onClick={() => removeItem(i)} title="Remove item" className="absolute top-4 right-0 p-1.5 rounded-md bg-red-500/10 text-red-400 opacity-0 group-hover/item:opacity-100 hover:bg-red-500/20 transition-all z-10">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
                <button onClick={() => setOpen(isOpen ? null : f.id)} className="w-full text-left py-6 flex items-start gap-4">
                  <span className="flex-1">
                    <span className="block text-lg font-medium">
                      {isAdmin ? (
                        <EditableText as="span" className="text-lg font-medium" value={f.q || ""} onChange={(v) => updateItem(i, { q: v })} placeholder="Question…" />
                      ) : f.q}
                    </span>
                    {isOpen && (
                      <span className="mt-3 block text-white/70 text-sm md:text-base leading-relaxed">
                        {isAdmin ? (
                          <EditableText as="span" className="text-white/70 text-sm md:text-base leading-relaxed" value={f.a || ""} onChange={(v) => updateItem(i, { a: v })} multiline placeholder="Answer…" />
                        ) : f.a}
                      </span>
                    )}
                  </span>
                  {isOpen ? <Minus className="h-5 w-5 mt-1 shrink-0" style={{ color: 'var(--accent-color, #10B981)' }} /> : <Plus className="h-5 w-5 mt-1 shrink-0" />}
                </button>
              </div>
            );
          })}
        </div>
        {isAdmin && (
          <button
            onClick={addItem}
            className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-white/15 py-4 text-sm text-white/40 hover:text-[var(--accent-color,#10B981)] hover:border-[var(--accent-color,#10B981)]/30 transition-all"
          >
            <Plus className="h-4 w-4" /> Add FAQ Item
          </button>
        )}
      </div>
    </section>
  );
}
