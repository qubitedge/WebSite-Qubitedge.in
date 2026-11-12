import { useState } from "react";
import { ChevronUp, ChevronDown, Copy, Trash2, Plus, GripVertical, Settings, X } from "lucide-react";
import { useAdmin } from "@/lib/AdminContext";
import { useCMS, type BlockType } from "@/lib/cms";

const BLOCK_LABELS: Record<BlockType, string> = {
  hero: "Hero",
  features: "Features Grid",
  workshops: "Workshops / Cards",
  playlists: "Learning Playlists",
  testimonials: "Testimonials",
  articles: "Articles / News",
  faq: "FAQ",
  cta: "Call to Action",
  richText: "Rich Text",
  profile: "Profile Block",
  story: "Story Block",
  customLayout: "Custom Layout Block",
};

type BlockWrapperProps = {
  blockId: string;
  blockType: BlockType;
  pageId: string;
  index: number;
  total: number;
  children: React.ReactNode;
};

export function BlockWrapper({ blockId, blockType, pageId, index, total, children }: BlockWrapperProps) {
  const { isAdmin } = useAdmin();
  const { content, updateBlock, moveBlock, duplicateBlock, removeBlock, addBlock } = useCMS();
  const [hovered, setHovered] = useState(false);
  const [inserterOpen, setInserterOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  if (!isAdmin) return <>{children}</>;

  const pageBlocks = content.pages?.[pageId] ?? content.blocks ?? [];
  const currentBlock = pageBlocks.find((b) => b.id === blockId);
  const blockData = currentBlock?.data || {};
  const accentColor = blockData.accentColor || "";
  const anchorVal = currentBlock?.anchor || "";

  const blockTypes: BlockType[] = [
    "hero", "features", "workshops", "playlists", "testimonials",
    "articles", "faq", "cta", "richText", "profile", "story", "customLayout"
  ];

  return (
    <div
      className="relative group/block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setInserterOpen(false); }}
    >
      {/* Block outline on hover */}
      {hovered && (
        <div className="absolute inset-0 border-2 border-dashed border-[#64CEFB]/40 rounded-lg pointer-events-none z-20 transition-all" />
      )}

      {/* Block controls — top right corner */}
      {hovered && (
        <div className="absolute top-2 right-4 z-30 flex items-center gap-1 bg-white border border-slate-200 rounded-lg px-1.5 py-1 shadow-xl text-slate-800">
          <span className="text-[10px] text-slate-500 px-2 font-semibold tracking-wider uppercase truncate max-w-[120px]">
            {BLOCK_LABELS[blockType]}
          </span>
          <span className="h-4 w-px bg-slate-200" />
          <button
            onClick={() => moveBlock(blockId, -1, pageId)}
            disabled={index === 0}
            title="Move up"
            className="p-1.5 rounded text-slate-500 hover:text-black hover:bg-slate-100 disabled:opacity-30 transition-all"
          >
            <ChevronUp className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => moveBlock(blockId, 1, pageId)}
            disabled={index === total - 1}
            title="Move down"
            className="p-1.5 rounded text-slate-500 hover:text-black hover:bg-slate-100 disabled:opacity-30 transition-all"
          >
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => duplicateBlock(blockId, pageId)}
            title="Duplicate block"
            className="p-1.5 rounded text-[#1e6180] hover:text-[#3ab7f2] hover:bg-[#64CEFB]/10 transition-all"
          >
            <Copy className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => setSettingsOpen(!settingsOpen)}
            title="Block Settings"
            className={`p-1.5 rounded transition-all ${
              settingsOpen
                ? "bg-[#64CEFB]/15 text-[#1e6180]"
                : "text-slate-500 hover:text-black hover:bg-slate-100"
            }`}
          >
            <Settings className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => { if (confirm("Delete this block?")) removeBlock(blockId, pageId); }}
            title="Delete block"
            className="p-1.5 rounded text-red-500 hover:text-red-700 hover:bg-red-50 transition-all"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {settingsOpen && hovered && (
        <>
          <div className="fixed inset-0 z-35 cursor-default" onClick={() => setSettingsOpen(false)} />
          <div className="absolute top-12 right-4 w-72 p-4 rounded-xl border border-slate-200 bg-white/95 backdrop-blur-xl shadow-2xl z-40 text-xs flex flex-col gap-4 text-left text-slate-800 animate-scale-up">
            <div className="font-semibold text-slate-900 pb-1 border-b border-slate-200 flex justify-between items-center">
              <span>Section Settings</span>
              <button onClick={() => setSettingsOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="h-3 w-3" />
              </button>
            </div>
            
            {/* Accent Color picker */}
            <div>
              <label className="block text-slate-500 mb-2 font-medium">Accent Color Colorway</label>
              <div className="flex gap-2">
                {[
                  { value: "#64CEFB", label: "Sky Blue" },
                  { value: "#8B5CF6", label: "Violet" },
                  { value: "#EC4899", label: "Rose Pink" },
                  { value: "#10B981", label: "Emerald" },
                  { value: "#F59E0B", label: "Amber" },
                  { value: "#EF4444", label: "Crimson" },
                ].map((color) => (
                  <button
                    key={color.value}
                    onClick={() => updateBlock(blockId, { accentColor: color.value }, pageId)}
                    title={color.label}
                    className={`h-6 w-6 rounded-full border transition-all ${
                      accentColor === color.value
                        ? "border-black scale-110 shadow-[0_0_10px_rgba(0,0,0,0.2)]"
                        : "border-slate-300 hover:scale-105"
                    }`}
                    style={{ backgroundColor: color.value }}
                  />
                ))}
              </div>
            </div>

            {/* Anchor Link ID */}
            <div>
              <label className="block text-slate-500 mb-1 font-medium">Navbar Section Anchor Link (ID)</label>
              <input
                type="text"
                value={anchorVal}
                onChange={(e) => updateBlock(blockId, { anchor: e.target.value }, pageId)}
                className="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-[#64CEFB] font-mono"
                placeholder="e.g. features, workshops"
              />
            </div>
          </div>
        </>
      )}

      {children}

      {/* Block inserter between blocks */}
      <div className={`relative flex items-center justify-center h-0 ${inserterOpen ? "z-40" : "z-20"}`}>
        <div className="absolute flex items-center justify-center" style={{ top: "-14px" }}>
          <div className="relative">
            <button
              onClick={() => setInserterOpen(!inserterOpen)}
              className={`h-7 w-7 rounded-full flex items-center justify-center transition-all ${
                inserterOpen
                  ? "bg-[#64CEFB] text-black shadow-[0_0_20px_rgba(100,206,251,0.4)]"
                  : "bg-white border border-slate-200 text-slate-500 hover:text-[#1e6180] hover:border-[#64CEFB]/60 opacity-0 group-hover/block:opacity-100 shadow-md"
              }`}
              title="Insert block here"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
            {inserterOpen && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setInserterOpen(false)} />
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-52 rounded-lg border border-slate-200 bg-white shadow-2xl z-45 py-1 max-h-64 overflow-y-auto">
                  {blockTypes.map((t) => (
                    <button
                      key={t}
                      onClick={() => {
                        addBlock(t, pageId);
                        setInserterOpen(false);
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
        </div>
      </div>
    </div>
  );
}
