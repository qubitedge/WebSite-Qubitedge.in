import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ChevronUp, ChevronDown, Trash2, Plus, RotateCcw, Save, Eye, EyeOff, LogOut, GripVertical, Lock } from "lucide-react";
import { useCMS, type Block, type BlockType } from "@/lib/cms";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Qubitedge" }] }),
  component: AdminPage,
});

const ADMIN_EMAIL = "qubitedge@gmail.com";
const ADMIN_PASSWORD = "Qubitedge@2026";
const AUTH_KEY = "qubitedge.admin.auth";

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
  const [authed, setAuthed] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.sessionStorage.getItem(AUTH_KEY) === "1";
  });

  if (!authed) return <LoginScreen onAuth={() => setAuthed(true)} />;
  return <AdminApp onLogout={() => { window.sessionStorage.removeItem(AUTH_KEY); setAuthed(false); }} />;
}

/* ---------- Login screen ---------- */

function LoginScreen({ onAuth }: { onAuth: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim().toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      window.sessionStorage.setItem(AUTH_KEY, "1");
      onAuth();
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0d12] text-white flex items-center justify-center px-4">
      <form onSubmit={submit} className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl">
        <div className="flex items-center gap-2 mb-5">
          <div className="h-9 w-9 rounded-lg bg-[#64CEFB]/15 border border-[#64CEFB]/30 flex items-center justify-center">
            <Lock className="h-4 w-4 text-[#64CEFB]" />
          </div>
          <div>
            <div className="text-sm font-semibold">Qubitedge CMS</div>
            <div className="text-xs text-white/50">Admin sign-in</div>
          </div>
        </div>
        <label className="block mb-3">
          <span className="block text-xs uppercase tracking-widest text-white/40 mb-1.5">Email</span>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" autoFocus className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:border-[#64CEFB]/60" />
        </label>
        <label className="block mb-4">
          <span className="block text-xs uppercase tracking-widest text-white/40 mb-1.5">Password</span>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:border-[#64CEFB]/60" />
        </label>
        {error && <div className="mb-3 text-xs text-red-400">{error}</div>}
        <button type="submit" className="w-full rounded-md bg-[#64CEFB] text-black font-medium py-2 text-sm hover:bg-[#64CEFB]/90">Sign in</button>
        <Link to="/" className="mt-3 inline-flex items-center gap-1 text-xs text-white/50 hover:text-white">
          <ArrowLeft className="h-3 w-3" /> Back to site
        </Link>
      </form>
    </div>
  );
}

/* ---------- Admin app ---------- */

function AdminApp({ onLogout }: { onLogout: () => void }) {
  const { content, setContent, reset, addBlock, removeBlock, moveBlock, updateBlock } = useCMS();
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(content.blocks[0]?.id ?? null);
  const [previewOn, setPreviewOn] = useState(false);
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [overPos, setOverPos] = useState<{ idx: number; pos: "before" | "after" } | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const active = content.blocks.find((b) => b.id === activeId) ?? null;

  // Force iframe to pick up updates (storage event fires in iframe automatically,
  // but we also nudge it whenever the structure changes for snappy feel).
  useEffect(() => {
    // no-op: storage event handles it
  }, [content]);

  const handleSave = () => setSavedAt(new Date().toLocaleTimeString());

  const reorder = (from: number, to: number) => {
    if (from === to || to < 0 || to >= content.blocks.length) return;
    setContent((c) => {
      const blocks = [...c.blocks];
      const [m] = blocks.splice(from, 1);
      blocks.splice(to, 0, m);
      return { ...c, blocks };
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0d12] text-white flex flex-col">
      <header className="border-b border-white/10 bg-black/60 backdrop-blur sticky top-0 z-20">
        <div className="px-4 sm:px-6 py-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-3 min-w-0">
            <Link to="/" className="flex items-center gap-2 text-sm text-white/70 hover:text-white">
              <ArrowLeft className="h-4 w-4" /> Site
            </Link>
            <span className="h-5 w-px bg-white/10" />
            <span className="text-sm font-medium truncate">CMS · Page Editor</span>
          </div>
          <div className="flex items-center gap-2">
            {savedAt && <span className="text-xs text-emerald-400 hidden sm:inline">Saved {savedAt}</span>}
            <button onClick={() => setPreviewOn((p) => !p)} className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs ${previewOn ? "border-[#64CEFB]/60 bg-[#64CEFB]/10 text-[#64CEFB]" : "border-white/15 hover:bg-white/5"}`}>
              {previewOn ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />} Live preview
            </button>
            <button onClick={() => { if (confirm("Reset to default content?")) reset(); }} className="inline-flex items-center gap-1.5 rounded-md border border-white/15 px-3 py-1.5 text-xs hover:bg-white/5">
              <RotateCcw className="h-3.5 w-3.5" /> Reset
            </button>
            <button onClick={handleSave} className="inline-flex items-center gap-1.5 rounded-md bg-[#64CEFB] text-black font-medium px-3 py-1.5 text-xs hover:bg-[#64CEFB]/90">
              <Save className="h-3.5 w-3.5" /> Save
            </button>
            <button onClick={onLogout} title="Sign out" className="inline-flex items-center gap-1.5 rounded-md border border-white/15 px-2 py-1.5 text-xs hover:bg-white/5">
              <LogOut className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </header>

      <div className={`flex-1 grid grid-cols-1 ${previewOn ? "lg:grid-cols-[260px_minmax(0,1fr)_minmax(0,1.1fr)]" : "lg:grid-cols-[280px_minmax(0,1fr)]"} gap-0`}>
        {/* Sidebar */}
        <aside className="border-r border-white/10 p-3 space-y-3 max-h-[calc(100vh-57px)] overflow-y-auto">
          <SiteSettings />
          <BackgroundSettings />
          <NavEditor />

          <div>
            <div className="flex items-center justify-between px-1 py-2">
              <span className="text-xs uppercase tracking-widest text-white/40">Blocks</span>
              <AddBlockMenu onAdd={addBlock} />
            </div>
            <ul className="space-y-1">
              {content.blocks.map((b, i) => {
                const showBefore = overPos?.idx === i && overPos.pos === "before" && dragIdx !== null && dragIdx !== i && dragIdx !== i - 1;
                const showAfter = overPos?.idx === i && overPos.pos === "after" && dragIdx !== null && dragIdx !== i && dragIdx !== i + 1;
                return (
                  <li
                    key={b.id}
                    draggable
                    onDragStart={(e) => { setDragIdx(i); e.dataTransfer.effectAllowed = "move"; }}
                    onDragOver={(e) => {
                      e.preventDefault();
                      const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
                      const pos = e.clientY < r.top + r.height / 2 ? "before" : "after";
                      setOverPos({ idx: i, pos });
                    }}
                    onDragLeave={() => setOverPos((o) => (o?.idx === i ? null : o))}
                    onDrop={(e) => {
                      e.preventDefault();
                      if (dragIdx === null) return;
                      let target = overPos?.pos === "after" ? i + 1 : i;
                      if (dragIdx < target) target -= 1;
                      reorder(dragIdx, target);
                      setDragIdx(null); setOverPos(null);
                    }}
                    onDragEnd={() => { setDragIdx(null); setOverPos(null); }}
                    className="relative"
                  >
                    {showBefore && <div className="absolute -top-0.5 left-0 right-0 h-0.5 bg-[#64CEFB] rounded-full" />}
                    {showAfter && <div className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-[#64CEFB] rounded-full" />}
                    <div
                      tabIndex={0}
                      role="button"
                      aria-label={`Block ${i + 1}: ${BLOCK_LABELS[b.type]}. Alt+Arrow Up or Down to reorder.`}
                      onKeyDown={(e) => {
                        if (e.altKey && e.key === "ArrowUp") { e.preventDefault(); moveBlock(b.id, -1); }
                        else if (e.altKey && e.key === "ArrowDown") { e.preventDefault(); moveBlock(b.id, 1); }
                        else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActiveId(b.id); }
                        else if (e.key === "Delete" || e.key === "Backspace") { e.preventDefault(); if (confirm("Delete this block?")) { removeBlock(b.id); if (activeId === b.id) setActiveId(null); } }
                      }}
                      className={`group flex items-center gap-1 rounded-lg px-2 py-2 text-sm cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#64CEFB]/60 ${
                        activeId === b.id ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5"
                      } ${dragIdx === i ? "opacity-40" : ""}`}
                      onClick={() => setActiveId(b.id)}
                    >
                      <GripVertical className="h-3.5 w-3.5 text-white/30 cursor-grab active:cursor-grabbing" />
                      <span className="text-[10px] text-white/40 w-4 shrink-0">{i + 1}</span>
                      <span className="flex-1 truncate">{BLOCK_LABELS[b.type]}</span>
                      <button onClick={(e) => { e.stopPropagation(); moveBlock(b.id, -1); }} aria-label="Move up" className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white/10 rounded"><ChevronUp className="h-3.5 w-3.5" /></button>
                      <button onClick={(e) => { e.stopPropagation(); moveBlock(b.id, 1); }} aria-label="Move down" className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white/10 rounded"><ChevronDown className="h-3.5 w-3.5" /></button>
                      <button onClick={(e) => { e.stopPropagation(); if (confirm("Delete this block?")) { removeBlock(b.id); if (activeId === b.id) setActiveId(null); } }} aria-label="Delete block" className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-500/20 text-red-400 rounded"><Trash2 className="h-3.5 w-3.5" /></button>
                    </div>
                  </li>
                );
              })}
            </ul>
            <p className="mt-2 px-1 text-[11px] text-white/30">Drag the handle to reorder · focus a block and press <kbd className="px-1 rounded bg-white/10">Alt</kbd>+<kbd className="px-1 rounded bg-white/10">↑/↓</kbd></p>
          </div>
        </aside>

        {/* Editor */}
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

        {/* Live preview */}
        {previewOn && (
          <aside className="border-l border-white/10 bg-black max-h-[calc(100vh-57px)] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 text-xs text-white/60">
              <span>Live preview · updates as you edit</span>
              <button onClick={() => iframeRef.current?.contentWindow?.location.reload()} className="text-white/60 hover:text-white">Refresh</button>
            </div>
            <iframe ref={iframeRef} src="/" title="Live preview" className="flex-1 w-full bg-black" />
          </aside>
        )}
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
    <input value={value ?? ""} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#64CEFB]/60" />
  );
}

function TextArea({ value, onChange, rows = 3 }: { value: string; onChange: (v: string) => void; rows?: number }) {
  return (
    <textarea value={value ?? ""} onChange={(e) => onChange(e.target.value)} rows={rows} className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#64CEFB]/60 resize-y" />
  );
}

/* ---------- Site settings & nav editor ---------- */

function SiteSettings() {
  const { content, setContent } = useCMS();
  return (
    <details className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
      <summary className="cursor-pointer text-xs uppercase tracking-widest text-white/60">Site</summary>
      <div className="mt-3 space-y-3">
        <Field label="Brand name"><TextInput value={content.brand.name} onChange={(v) => setContent((c) => ({ ...c, brand: { name: v } }))} /></Field>
        <Field label="CTA label"><TextInput value={content.cta.label} onChange={(v) => setContent((c) => ({ ...c, cta: { ...c.cta, label: v } }))} /></Field>
        <Field label="CTA scroll target (anchor)"><TextInput value={content.cta.anchor} onChange={(v) => setContent((c) => ({ ...c, cta: { ...c.cta, anchor: v } }))} /></Field>
        <Field label="Footer copyright"><TextInput value={content.footer.copyright} onChange={(v) => setContent((c) => ({ ...c, footer: { ...c.footer, copyright: v } }))} /></Field>
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
  const reorder = (from: number, to: number) => {
    if (from === to || to < 0 || to >= items.length) return;
    const next = [...items];
    const [m] = next.splice(from, 1);
    next.splice(to, 0, m);
    onChange({ items: next });
  };
  const add = () => {
    const blank: any = { id: Math.random().toString(36).slice(2, 10) };
    fields.forEach((f) => (blank[f.key] = ""));
    onChange({ items: [...items, blank] });
  };

  const [dragIdx, setDragIdx] = useState<number | null>(null);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-widest text-white/40">Items · drag to reorder</span>
        <button onClick={add} className="inline-flex items-center gap-1 text-xs rounded-md bg-white/10 hover:bg-white/15 px-2 py-1">
          <Plus className="h-3.5 w-3.5" /> Add item
        </button>
      </div>
      {items.map((it, idx) => (
        <details
          key={it.id || idx}
          draggable
          onDragStart={() => setDragIdx(idx)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => { if (dragIdx !== null) reorder(dragIdx, idx); setDragIdx(null); }}
          onDragEnd={() => setDragIdx(null)}
          className={`rounded-lg border border-white/10 bg-white/[0.02] ${dragIdx === idx ? "opacity-50" : ""}`}
        >
          <summary className="cursor-pointer px-3 py-2 text-sm flex items-center justify-between gap-2">
            <span className="flex items-center gap-1.5 min-w-0">
              <GripVertical className="h-3.5 w-3.5 text-white/30 cursor-grab" />
              <span className="truncate">{it[fields[0]?.key] || `Item ${idx + 1}`}</span>
            </span>
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
