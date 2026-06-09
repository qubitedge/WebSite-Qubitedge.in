import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ChevronUp, ChevronDown, Trash2, Plus, RotateCcw, Save, Eye } from "lucide-react";
import { useCMS, type Block, type BlockType } from "@/lib/cms";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Qubitedge" }] }),
  component: AdminPage,
});

const BLOCK_LABELS: Record<BlockType, string> = {
  hero: "Hero",
  features: "Features Grid",
  workshops: "Workshops / Cards",
  testimonials: "Testimonials",
  articles: "Articles / News",
  faq: "FAQ",
  cta: "Call to Action",
  richText: "Rich Text",
};

function AdminPage() {
  const { content, setContent, reset, addBlock, removeBlock, moveBlock, updateBlock } = useCMS();
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(content.blocks[0]?.id ?? null);

  const active = content.blocks.find((b) => b.id === activeId) ?? null;

  const handleSave = () => {
    // Already auto-saved to localStorage via provider effect; show confirmation.
    setSavedAt(new Date().toLocaleTimeString());
  };

  return (
    <div className="min-h-screen bg-[#0a0d12] text-white flex flex-col">
      {/* Top bar */}
      <header className="border-b border-white/10 bg-black/60 backdrop-blur sticky top-0 z-20">
        <div className="px-4 sm:px-6 py-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 text-sm text-white/70 hover:text-white">
              <ArrowLeft className="h-4 w-4" /> Back to site
            </Link>
            <span className="h-5 w-px bg-white/10" />
            <span className="text-sm font-medium">CMS · Page Editor</span>
          </div>
          <div className="flex items-center gap-2">
            {savedAt && <span className="text-xs text-emerald-400">Saved {savedAt}</span>}
            <button onClick={() => { if (confirm("Reset to default content?")) reset(); }} className="inline-flex items-center gap-1.5 rounded-md border border-white/15 px-3 py-1.5 text-xs hover:bg-white/5">
              <RotateCcw className="h-3.5 w-3.5" /> Reset
            </button>
            <Link to="/" className="inline-flex items-center gap-1.5 rounded-md border border-white/15 px-3 py-1.5 text-xs hover:bg-white/5">
              <Eye className="h-3.5 w-3.5" /> Preview
            </Link>
            <button onClick={handleSave} className="inline-flex items-center gap-1.5 rounded-md bg-[#64CEFB] text-black font-medium px-3 py-1.5 text-xs hover:bg-[#64CEFB]/90">
              <Save className="h-3.5 w-3.5" /> Save
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-0">
        {/* Sidebar: block list + add */}
        <aside className="border-r border-white/10 p-3 space-y-3 max-h-[calc(100vh-57px)] overflow-y-auto">
          {/* Site settings */}
          <SiteSettings />

          {/* Nav editor */}
          <NavEditor />

          {/* Blocks list */}
          <div>
            <div className="flex items-center justify-between px-1 py-2">
              <span className="text-xs uppercase tracking-widest text-white/40">Blocks</span>
              <AddBlockMenu onAdd={addBlock} />
            </div>
            <ul className="space-y-1">
              {content.blocks.map((b, i) => (
                <li key={b.id}>
                  <div
                    className={`group flex items-center gap-1 rounded-lg px-2 py-2 text-sm cursor-pointer ${
                      activeId === b.id ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5"
                    }`}
                    onClick={() => setActiveId(b.id)}
                  >
                    <span className="text-[10px] text-white/40 w-4 shrink-0">{i + 1}</span>
                    <span className="flex-1 truncate">{BLOCK_LABELS[b.type]}</span>
                    <button onClick={(e) => { e.stopPropagation(); moveBlock(b.id, -1); }} className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white/10 rounded" title="Move up">
                      <ChevronUp className="h-3.5 w-3.5" />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); moveBlock(b.id, 1); }} className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white/10 rounded" title="Move down">
                      <ChevronDown className="h-3.5 w-3.5" />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); if (confirm("Delete this block?")) { removeBlock(b.id); if (activeId === b.id) setActiveId(null); } }} className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-500/20 text-red-400 rounded" title="Delete">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Editor pane */}
        <main className="p-4 sm:p-6 max-h-[calc(100vh-57px)] overflow-y-auto">
          {active ? (
            <BlockEditor
              key={active.id}
              block={active}
              onChange={(data) => updateBlock(active.id, data)}
              onAnchorChange={(anchor) => setContent((c) => ({ ...c, blocks: c.blocks.map((bb) => bb.id === active.id ? { ...bb, anchor } : bb) }))}
            />
          ) : (
            <div className="text-white/50 text-sm">Select a block on the left to edit it, or add a new one.</div>
          )}
        </main>
      </div>
    </div>
  );
}

/* ---------- Reusable inputs ---------- */

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-widest text-white/40 mb-1.5">{label}</span>
      {children}
    </label>
  );
}

function TextInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <input
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#64CEFB]/60"
    />
  );
}

function TextArea({ value, onChange, rows = 3 }: { value: string; onChange: (v: string) => void; rows?: number }) {
  return (
    <textarea
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#64CEFB]/60 resize-y"
    />
  );
}

/* ---------- Site settings & nav editor ---------- */

function SiteSettings() {
  const { content, setContent } = useCMS();
  return (
    <details className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
      <summary className="cursor-pointer text-xs uppercase tracking-widest text-white/60">Site</summary>
      <div className="mt-3 space-y-3">
        <Field label="Brand name">
          <TextInput value={content.brand.name} onChange={(v) => setContent((c) => ({ ...c, brand: { name: v } }))} />
        </Field>
        <Field label="CTA label">
          <TextInput value={content.cta.label} onChange={(v) => setContent((c) => ({ ...c, cta: { ...c.cta, label: v } }))} />
        </Field>
        <Field label="CTA scroll target (anchor)">
          <TextInput value={content.cta.anchor} onChange={(v) => setContent((c) => ({ ...c, cta: { ...c.cta, anchor: v } }))} />
        </Field>
        <Field label="Footer copyright">
          <TextInput value={content.footer.copyright} onChange={(v) => setContent((c) => ({ ...c, footer: { ...c.footer, copyright: v } }))} />
        </Field>
      </div>
    </details>
  );
}

function NavEditor() {
  const { content, setContent } = useCMS();
  const update = (idx: number, patch: Partial<{ label: string; anchor: string }>) =>
    setContent((c) => ({ ...c, nav: c.nav.map((n, i) => (i === idx ? { ...n, ...patch } : n)) }));
  const remove = (idx: number) => setContent((c) => ({ ...c, nav: c.nav.filter((_, i) => i !== idx) }));
  const add = () => setContent((c) => ({ ...c, nav: [...c.nav, { id: Math.random().toString(36).slice(2, 10), label: "New", anchor: "" }] }));

  return (
    <details className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
      <summary className="cursor-pointer text-xs uppercase tracking-widest text-white/60">Navigation</summary>
      <div className="mt-3 space-y-2">
        {content.nav.map((n, idx) => (
          <div key={n.id} className="flex gap-1.5">
            <input value={n.label} onChange={(e) => update(idx, { label: e.target.value })} placeholder="Label" className="flex-1 min-w-0 rounded-md bg-white/5 border border-white/10 px-2 py-1.5 text-xs" />
            <input value={n.anchor} onChange={(e) => update(idx, { anchor: e.target.value })} placeholder="anchor" className="w-24 rounded-md bg-white/5 border border-white/10 px-2 py-1.5 text-xs" />
            <button onClick={() => remove(idx)} className="p-1.5 rounded-md hover:bg-red-500/20 text-red-400"><Trash2 className="h-3.5 w-3.5" /></button>
          </div>
        ))}
        <button onClick={add} className="w-full inline-flex items-center justify-center gap-1 rounded-md border border-dashed border-white/15 py-1.5 text-xs text-white/60 hover:text-white hover:border-white/30">
          <Plus className="h-3.5 w-3.5" /> Add nav item
        </button>
      </div>
    </details>
  );
}

/* ---------- Add block menu ---------- */

function AddBlockMenu({ onAdd }: { onAdd: (t: BlockType) => void }) {
  const [open, setOpen] = useState(false);
  const types: BlockType[] = ["hero", "features", "workshops", "testimonials", "articles", "faq", "cta", "richText"];
  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="inline-flex items-center gap-1 rounded-md bg-[#64CEFB] text-black px-2 py-1 text-xs font-medium">
        <Plus className="h-3.5 w-3.5" /> Add
      </button>
      {open && (
        <div className="absolute right-0 mt-1 w-44 rounded-md border border-white/10 bg-[#0f1620] shadow-xl z-10">
          {types.map((t) => (
            <button key={t} onClick={() => { onAdd(t); setOpen(false); }} className="block w-full text-left px-3 py-2 text-sm text-white/80 hover:bg-white/10 first:rounded-t-md last:rounded-b-md">
              {BLOCK_LABELS[t]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- Block editor ---------- */

function BlockEditor({ block, onChange, onAnchorChange }: { block: Block; onChange: (d: Record<string, any>) => void; onAnchorChange: (a: string) => void }) {
  const d = block.data;
  const set = (k: string, v: any) => onChange({ [k]: v });

  return (
    <div className="max-w-3xl space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium tracking-tight">{BLOCK_LABELS[block.type]}</h2>
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/40">Scroll anchor</span>
          <input value={block.anchor ?? ""} onChange={(e) => onAnchorChange(e.target.value)} placeholder="e.g. about" className="w-32 rounded-md bg-white/5 border border-white/10 px-2 py-1 text-xs" />
        </div>
      </div>

      {block.type === "hero" && (
        <>
          <Field label="Eyebrow"><TextInput value={d.eyebrow} onChange={(v) => set("eyebrow", v)} /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Top left text"><TextArea rows={2} value={d.topLeft} onChange={(v) => set("topLeft", v)} /></Field>
            <Field label="Top right text"><TextArea rows={2} value={d.topRight} onChange={(v) => set("topRight", v)} /></Field>
          </div>
          <Field label="Title line 1"><TextInput value={d.titleLine1} onChange={(v) => set("titleLine1", v)} /></Field>
          <Field label="Title line 2 (gradient)"><TextInput value={d.titleLine2} onChange={(v) => set("titleLine2", v)} /></Field>
          <Field label="Subtitle"><TextArea value={d.subtitle} onChange={(v) => set("subtitle", v)} /></Field>
          <Field label="Background video URL"><TextInput value={d.videoUrl} onChange={(v) => set("videoUrl", v)} /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Primary CTA label"><TextInput value={d.primaryCta?.label} onChange={(v) => set("primaryCta", { ...d.primaryCta, label: v })} /></Field>
            <Field label="Primary CTA anchor"><TextInput value={d.primaryCta?.anchor} onChange={(v) => set("primaryCta", { ...d.primaryCta, anchor: v })} /></Field>
            <Field label="Secondary CTA label"><TextInput value={d.secondaryCta?.label} onChange={(v) => set("secondaryCta", { ...d.secondaryCta, label: v })} /></Field>
            <Field label="Secondary CTA anchor"><TextInput value={d.secondaryCta?.anchor} onChange={(v) => set("secondaryCta", { ...d.secondaryCta, anchor: v })} /></Field>
          </div>
        </>
      )}

      {block.type === "cta" && (
        <>
          <Field label="Title (use highlight word inside)"><TextInput value={d.title} onChange={(v) => set("title", v)} /></Field>
          <Field label="Highlight word"><TextInput value={d.highlight} onChange={(v) => set("highlight", v)} /></Field>
          <Field label="Body"><TextArea value={d.body} onChange={(v) => set("body", v)} /></Field>
          <Field label="Button label"><TextInput value={d.ctaLabel} onChange={(v) => set("ctaLabel", v)} /></Field>
        </>
      )}

      {block.type === "richText" && (
        <>
          <Field label="Eyebrow"><TextInput value={d.eyebrow} onChange={(v) => set("eyebrow", v)} /></Field>
          <Field label="Title"><TextInput value={d.title} onChange={(v) => set("title", v)} /></Field>
          <Field label="Body"><TextArea rows={8} value={d.body} onChange={(v) => set("body", v)} /></Field>
        </>
      )}

      {(block.type === "features" || block.type === "workshops" || block.type === "testimonials" || block.type === "articles" || block.type === "faq") && (
        <>
          {d.eyebrow !== undefined && <Field label="Eyebrow"><TextInput value={d.eyebrow} onChange={(v) => set("eyebrow", v)} /></Field>}
          {d.title !== undefined && <Field label="Title"><TextInput value={d.title} onChange={(v) => set("title", v)} /></Field>}
          {d.intro !== undefined && <Field label="Intro"><TextArea value={d.intro} onChange={(v) => set("intro", v)} /></Field>}
          <ItemListEditor block={block} onChange={onChange} />
        </>
      )}
    </div>
  );
}

function ItemListEditor({ block, onChange }: { block: Block; onChange: (d: Record<string, any>) => void }) {
  const items: any[] = block.data.items || [];
  const fields = itemFieldsFor(block.type);
  const update = (idx: number, patch: any) => onChange({ items: items.map((it, i) => (i === idx ? { ...it, ...patch } : it)) });
  const remove = (idx: number) => onChange({ items: items.filter((_, i) => i !== idx) });
  const move = (idx: number, dir: -1 | 1) => {
    const ni = idx + dir;
    if (ni < 0 || ni >= items.length) return;
    const next = [...items];
    [next[idx], next[ni]] = [next[ni], next[idx]];
    onChange({ items: next });
  };
  const add = () => {
    const blank: any = { id: Math.random().toString(36).slice(2, 10) };
    fields.forEach((f) => (blank[f.key] = ""));
    onChange({ items: [...items, blank] });
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-widest text-white/40">Items</span>
        <button onClick={add} className="inline-flex items-center gap-1 text-xs rounded-md bg-white/10 hover:bg-white/15 px-2 py-1">
          <Plus className="h-3.5 w-3.5" /> Add item
        </button>
      </div>
      {items.map((it, idx) => (
        <details key={it.id || idx} className="rounded-lg border border-white/10 bg-white/[0.02]">
          <summary className="cursor-pointer px-3 py-2 text-sm flex items-center justify-between gap-2">
            <span className="truncate">{it[fields[0]?.key] || `Item ${idx + 1}`}</span>
            <span className="flex items-center gap-1 shrink-0">
              <button onClick={(e) => { e.preventDefault(); move(idx, -1); }} className="p-1 hover:bg-white/10 rounded"><ChevronUp className="h-3.5 w-3.5" /></button>
              <button onClick={(e) => { e.preventDefault(); move(idx, 1); }} className="p-1 hover:bg-white/10 rounded"><ChevronDown className="h-3.5 w-3.5" /></button>
              <button onClick={(e) => { e.preventDefault(); remove(idx); }} className="p-1 hover:bg-red-500/20 text-red-400 rounded"><Trash2 className="h-3.5 w-3.5" /></button>
            </span>
          </summary>
          <div className="p-3 pt-0 space-y-2.5">
            {fields.map((f) => (
              <Field key={f.key} label={f.label}>
                {f.multiline ? (
                  <TextArea value={it[f.key]} onChange={(v) => update(idx, { [f.key]: v })} />
                ) : (
                  <TextInput value={it[f.key]} onChange={(v) => update(idx, { [f.key]: v })} />
                )}
              </Field>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}

function itemFieldsFor(type: BlockType): { key: string; label: string; multiline?: boolean }[] {
  switch (type) {
    case "features": return [{ key: "title", label: "Title" }, { key: "body", label: "Body", multiline: true }];
    case "workshops": return [{ key: "tag", label: "Tag" }, { key: "title", label: "Title" }, { key: "body", label: "Body", multiline: true }, { key: "cta", label: "CTA label" }];
    case "testimonials": return [{ key: "quote", label: "Quote", multiline: true }, { key: "author", label: "Author" }, { key: "role", label: "Role" }];
    case "articles": return [{ key: "tag", label: "Tag" }, { key: "title", label: "Title" }, { key: "excerpt", label: "Excerpt", multiline: true }];
    case "faq": return [{ key: "q", label: "Question" }, { key: "a", label: "Answer", multiline: true }];
    default: return [];
  }
}
