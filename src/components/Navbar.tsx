import { useState, useEffect } from "react";
import { ArrowUpRight, X, Settings, Plus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useRouterState } from "@tanstack/react-router";
import { useCMS, scrollToAnchor } from "@/lib/cms";
import { useAdmin } from "@/lib/AdminContext";
import { EditableText } from "./EditableText";

export function Navbar() {
  const { content, setContent } = useCMS();
  const { isAdmin } = useAdmin();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const routerState = useRouterState();
  const activePath = routerState.location.pathname;
  const [editingNavItemIdx, setEditingNavItemIdx] = useState<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleNav = (anchor: string) => {
    setOpen(false);
    setTimeout(() => scrollToAnchor(anchor), 60);
  };

  const updateNavItem = (idx: number, patch: Partial<{ label: string; anchor: string; href?: string; isExternal?: boolean }>) =>
    setContent((c) => ({ ...c, nav: c.nav.map((n, i) => (i === idx ? { ...n, ...patch } : n)) }));

  const removeNavItem = (idx: number) =>
    setContent((c) => ({ ...c, nav: c.nav.filter((_, i) => i !== idx) }));

  const addNavItem = () => {
    setContent((c) => ({
      ...c,
      nav: [...c.nav, { id: Math.random().toString(36).slice(2, 10), label: "New Item", href: "/", isExternal: false, anchor: "" }],
    }));
    setTimeout(() => {
      setEditingNavItemIdx(content.nav.length);
    }, 50);
  };

  return (
    <>
      <header className={`fixed left-0 right-0 z-50 px-3 sm:px-4 ${isAdmin ? "top-[44px]" : "top-3"}`}>
        <div
          className={`mx-auto max-w-6xl flex items-center justify-between rounded-full border border-white/15 transition-all ${
            scrolled ? "bg-black/70 backdrop-blur-xl shadow-[0_8px_40px_-12px_rgba(100,206,251,0.25)]" : "bg-black/40 backdrop-blur-md"
          } pl-5 pr-3 py-3`}
        >
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img src="/logo.png" alt="Logo" className="h-10 w-10 object-contain drop-shadow-[0_0_15px_rgba(100,206,251,0.4)]" />
            {isAdmin ? (
              <EditableText
                as="span"
                className="text-white text-lg font-medium tracking-tight"
                value={content.brand.name}
                onChange={(v) => setContent((c) => ({ ...c, brand: { name: v } }))}
                placeholder="Brand name…"
              />
            ) : (
              <span className="text-white text-lg font-medium tracking-tight">{content.brand.name}</span>
            )}
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {content.nav.map((i, idx) => {
              const isActive = activePath === i.href;
              const linkClasses = `relative px-5 py-2.5 text-base transition-colors ${
                isActive ? "text-white" : "text-white/70 hover:text-white"
              }`;
              const activeIndicator = isActive && (
                <motion.span
                  layoutId="nav-active-dot"
                  className="absolute left-1/2 -translate-x-1/2 -bottom-0.5 h-1 w-1 rounded-full bg-[#64CEFB]"
                />
              );

              if (isAdmin) {
                const isEditing = editingNavItemIdx === idx;
                return (
                  <div key={i.id} className="relative group/nav flex items-center animate-fade-in">
                    <button
                      onClick={() => setEditingNavItemIdx(isEditing ? null : idx)}
                      className={`relative px-4 py-2 text-base transition-all rounded-full flex items-center gap-1.5 border border-white/10 hover:border-[#64CEFB]/40 hover:bg-[#64CEFB]/5 ${
                        activePath === i.href ? "text-white bg-white/10 border-[#64CEFB]/40" : "text-white/70 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <span className="font-medium">{i.label || "New Item"}</span>
                      <span className="text-[10px] text-white/40 font-mono px-1.5 py-0.5 bg-white/5 rounded border border-white/10 max-w-[80px] truncate">
                        {i.href || "#"}
                      </span>
                    </button>
                    <button
                      onClick={() => removeNavItem(idx)}
                      title="Remove nav item"
                      className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500/80 text-white flex items-center justify-center opacity-0 group-hover/nav:opacity-100 transition-opacity z-30 hover:bg-red-500 animate-scale-up"
                    >
                      <X className="h-3 w-3" />
                    </button>

                    {isEditing && (
                      <>
                        <div className="fixed inset-0 z-30 cursor-default" onClick={() => setEditingNavItemIdx(null)} />
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 p-4 rounded-xl border border-slate-200 bg-white/95 backdrop-blur-xl shadow-2xl z-40 text-xs flex flex-col gap-3 text-left text-slate-800">
                          <div className="font-semibold text-slate-900 pb-1 border-b border-slate-200 flex justify-between items-center">
                            <span>Configure Nav Link</span>
                            <button onClick={() => setEditingNavItemIdx(null)} className="text-slate-400 hover:text-slate-700">
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                          <div>
                            <label className="block text-slate-500 mb-1 font-medium">Text Label</label>
                            <input
                              type="text"
                              value={i.label}
                              onChange={(e) => updateNavItem(idx, { label: e.target.value })}
                              className="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-[#64CEFB]"
                              placeholder="e.g. Learning"
                            />
                          </div>
                          <div>
                            <label className="block text-slate-500 mb-1 font-medium">Hyperlink URL / Path</label>
                            <input
                              type="text"
                              value={i.href || ""}
                              onChange={(e) => updateNavItem(idx, { href: e.target.value })}
                              className="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-[#64CEFB] font-mono"
                              placeholder="e.g. /learning or https://..."
                            />
                          </div>
                          <label className="flex items-center gap-2 cursor-pointer text-slate-600 hover:text-slate-900 py-1 font-medium">
                            <input
                              type="checkbox"
                              checked={!!i.isExternal}
                              onChange={(e) => updateNavItem(idx, { isExternal: e.target.checked })}
                              className="rounded border-slate-300 bg-white text-[#64CEFB] focus:ring-0 focus:ring-offset-0"
                            />
                            <span>Open in new tab (External)</span>
                          </label>
                        </div>
                      </>
                    )}
                  </div>
                );
              }

              if (i.isExternal && i.href) {
                return (
                  <a key={i.id} href={i.href} target="_blank" rel="noopener noreferrer" className={linkClasses}>
                    {i.label}
                    {activeIndicator}
                  </a>
                );
              }

              return (
                <Link key={i.id} to={i.href || "/"} className={linkClasses}>
                  {i.label}
                  {activeIndicator}
                </Link>
              );
            })}
            {/* Admin: add nav item button */}
            {isAdmin && (
              <button
                onClick={addNavItem}
                title="Add nav item"
                className="h-8 w-8 rounded-full border border-dashed border-white/20 text-white/40 hover:text-[#64CEFB] hover:border-[#64CEFB]/40 flex items-center justify-center transition-all ml-1"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            )}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">

            <Link
              to="/"
              hash={content.cta.anchor}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-white text-black px-6 py-2.5 text-base font-medium hover:bg-white/90 transition-colors"
            >
              {content.cta.label}
            </Link>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden relative flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white"
              aria-label="Open menu"
            >
              <span className="flex flex-col gap-1">
                <span className="h-px w-4 bg-current" />
                <span className="h-px w-4 bg-current" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer — top sheet, large tappable items */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-md lg:hidden"
            />
            <motion.aside
              initial={{ y: "-100%" }} animate={{ y: 0 }} exit={{ y: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 240 }}
              className="fixed top-0 left-0 right-0 z-[70] lg:hidden bg-gradient-to-b from-[#0a1118] to-black border-b border-white/10 rounded-b-3xl overflow-hidden"
            >
              <div className="flex items-center justify-between px-5 pt-5 pb-3">
                <div className="flex items-center gap-2">
                  <img src="/logo.png" alt="Logo" className="h-7 w-7 object-contain" />
                  <span className="text-white font-medium">{content.brand.name}</span>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="h-9 w-9 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="px-3 pb-3">
                <ul>
                  {content.nav.map((i, idx) => (
                    <motion.li
                      key={i.id}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.04 + idx * 0.04 }}
                    >
                      {i.isExternal && i.href ? (
                        <a
                          href={i.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setOpen(false)}
                          className="group w-full flex items-center justify-between px-4 py-4 rounded-xl hover:bg-white/5 transition-colors"
                        >
                          <span className="text-xl font-medium text-white tracking-tight">{i.label}</span>
                          <ArrowUpRight className="h-5 w-5 text-white/30 group-hover:text-[#64CEFB] transition-colors" />
                        </a>
                      ) : (
                        <Link
                          to={i.href || "/"}
                          onClick={() => setOpen(false)}
                          className="group w-full flex items-center justify-between px-4 py-4 rounded-xl hover:bg-white/5 transition-colors"
                        >
                          <span className="text-xl font-medium text-white tracking-tight">{i.label}</span>
                          <ArrowUpRight className="h-5 w-5 text-white/30 group-hover:text-[#64CEFB] transition-colors" />
                        </Link>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <div className="px-5 pb-6 pt-2 flex gap-2">

                <Link
                  to="/"
                  hash={content.cta.anchor}
                  onClick={() => setOpen(false)}
                  className={`${isAdmin ? 'flex-1' : 'flex-[2]'} inline-flex items-center justify-center gap-1.5 rounded-full bg-white text-black px-5 py-3 text-sm font-medium hover:bg-white/90`}
                >
                  {content.cta.label}
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
