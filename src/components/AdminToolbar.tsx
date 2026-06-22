import { useState, useEffect } from "react";
import { Undo, Redo, RotateCcw, LogOut, Plus, ChevronDown } from "lucide-react";
import { useAdmin } from "@/lib/AdminContext";
import { useCMS, type BlockType } from "@/lib/cms";
import { useRouterState, useNavigate } from "@tanstack/react-router";

const BLOCK_LABELS: Record<BlockType, string> = {
  hero: "Hero",
  features: "Features Grid",
  workshops: "Workshops / Cards",
  testimonials: "Testimonials",
  articles: "Articles / News",
  faq: "FAQ",
  cta: "Call to Action",
  richText: "Rich Text",
  profile: "Profile Block",
  story: "Story Block",
};

const PAGES: Record<string, string> = {
  home: "Homepage",
  learning: "Learning",
  "it-marketing": "IT & Marketing",
  workshops: "Workshops & Internships",
  about: "About Us",
};

const PATH_TO_PAGE: Record<string, string> = {
  "/": "home",
  "/learning": "learning",
  "/it-marketing": "it-marketing",
  "/workshops": "workshops",
  "/about": "about",
};

export function AdminToolbar() {
  const { isAdmin, logout } = useAdmin();
  const { undo, redo, canUndo, canRedo, reset, addBlock, savingStatus } = useCMS();
  const routerState = useRouterState();
  const navigate = useNavigate();
  const [addOpen, setAddOpen] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);

  const currentPath = routerState.location.pathname;
  const currentPageId = PATH_TO_PAGE[currentPath] || "home";

  // Keyboard shortcuts for undo/redo
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (["INPUT", "TEXTAREA", "SELECT"].includes((e.target as HTMLElement)?.tagName)) return;
      if (e.ctrlKey || e.metaKey) {
        if (e.key === "z" || e.key === "Z") {
          e.preventDefault();
          if (e.shiftKey) redo();
          else undo();
        } else if (e.key === "y" || e.key === "Y") {
          e.preventDefault();
          redo();
        }
      }
    };
    if (isAdmin) {
      window.addEventListener("keydown", onKeyDown);
      return () => window.removeEventListener("keydown", onKeyDown);
    }
  }, [isAdmin, undo, redo]);

  if (!isAdmin) return null;

  const blockTypes: BlockType[] = [
    "hero", "features", "workshops", "testimonials",
    "articles", "faq", "cta", "richText", "profile", "story", "customLayout"
  ];

  return (
    <div className="admin-toolbar fixed top-0 left-0 right-0 z-[100] bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-[0_4px_30px_rgba(0,0,0,0.08)]">
      <div className="flex items-center justify-between px-4 py-2 gap-2 max-w-full overflow-visible">
        {/* Left: indicator + page */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[#3ab7f2] animate-pulse" />
            <span className="text-xs font-semibold text-[#1e6180] uppercase tracking-widest">Edit Mode</span>
          </div>
          <span className="h-4 w-px bg-slate-200" />
          {/* Page indicator */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-500">Page:</span>
            <select
              value={currentPageId}
              onChange={(e) => {
                const pageId = e.target.value;
                const path = Object.entries(PATH_TO_PAGE).find(([, v]) => v === pageId)?.[0] || "/";
                navigate({ to: path });
              }}
              className="bg-slate-50 border border-slate-200 rounded-md px-2 py-1 text-xs text-slate-800 focus:outline-none focus:border-[#3ab7f2] cursor-pointer"
            >
              {Object.entries(PAGES).map(([id, label]) => (
                <option key={id} value={id} className="bg-white text-slate-800">{label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Center: actions */}
        <div className="flex items-center gap-1.5">
          <button
            disabled={!canUndo}
            onClick={undo}
            title="Undo (Ctrl+Z)"
            className="admin-btn inline-flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs text-slate-700 hover:text-black hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <Undo className="h-3.5 w-3.5" />
          </button>
          <button
            disabled={!canRedo}
            onClick={redo}
            title="Redo (Ctrl+Y)"
            className="admin-btn inline-flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs text-slate-700 hover:text-black hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <Redo className="h-3.5 w-3.5" />
          </button>
          <span className="h-4 w-px bg-slate-200" />
          {/* Add block dropdown */}
          <div className="relative">
            <button
              onClick={() => setAddOpen(!addOpen)}
              className="admin-btn inline-flex items-center gap-1 rounded-md bg-[#64CEFB]/15 border border-[#64CEFB]/40 px-3 py-1.5 text-xs font-semibold text-[#1e6180] hover:bg-[#64CEFB]/25 transition-all shadow-sm"
            >
              <Plus className="h-3.5 w-3.5" /> Add Block <ChevronDown className="h-3 w-3" />
            </button>
            {addOpen && (
              <>
                <div className="fixed inset-0 z-[110]" onClick={() => setAddOpen(false)} />
                <div className="absolute left-0 top-full mt-1 w-52 rounded-lg border border-slate-200 bg-white shadow-2xl z-[120] py-1 max-h-80 overflow-y-auto">
                  {blockTypes.map((t) => (
                    <button
                      key={t}
                      onClick={() => {
                        addBlock(t, currentPageId);
                        setAddOpen(false);
                        // Scroll to bottom after a tick
                        setTimeout(() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }), 100);
                      }}
                      className="block w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-black transition-colors"
                    >
                      {BLOCK_LABELS[t]}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
          <span className="h-4 w-px bg-slate-200" />
          <button
            onClick={() => { if (confirm("Reset all content to defaults? This cannot be undone.")) reset(); }}
            className="admin-btn inline-flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs text-slate-700 hover:text-black hover:bg-slate-100 transition-all"
            title="Reset to defaults"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Right: save indicator + logout */}
        <div className="flex items-center gap-2 shrink-0">
          {savingStatus === "saving" && (
            <span className="text-xs text-[#1e6180] flex items-center gap-1 font-medium">
              <span className="h-2 w-2 rounded-full bg-[#3ab7f2] animate-pulse" />
              Saving...
            </span>
          )}
          {savingStatus === "saved" && (
            <span className="text-xs text-emerald-600 flex items-center gap-1 font-medium">
              ✓ Saved to server
            </span>
          )}
          {savingStatus === "error" && (
            <span className="text-xs text-red-600 flex items-center gap-1 font-medium">
              ⚠️ Save failed
            </span>
          )}
          {savingStatus === "idle" && (
            <span className="text-[10px] text-slate-400 hidden sm:inline font-medium">Synced to server</span>
          )}
          <button
            onClick={() => {
              logout();
              navigate({ to: "/" });
            }}
            className="admin-btn inline-flex items-center gap-1.5 rounded-md border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100 hover:text-red-700 transition-all shadow-sm"
          >
            <LogOut className="h-3.5 w-3.5" /> Exit
          </button>
        </div>
      </div>
    </div>
  );
}
