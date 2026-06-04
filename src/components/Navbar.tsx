import { useState, useRef, useEffect } from "react";
import { ArrowUpRight, X, GraduationCap, Factory, Cpu, Info, Calendar, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/qubitedge-logo.png.asset.json";

const navItems = [
  { label: "Learning", href: "#learning", icon: GraduationCap, desc: "Workshops, courses & career pathways" },
  { label: "Manufacturing", href: "#manufacturing", icon: Factory, desc: "Operations, automation & growth" },
  { label: "IT/IT Services", href: "#it-services", icon: Cpu, desc: "Enterprise tech & implementation" },
  { label: "About Us", href: "#about", icon: Info, desc: "Who we are & what we stand for" },
  { label: "Workshops", href: "#workshops", icon: Calendar, desc: "2-hour live sessions, real impact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null);

  useEffect(() => {
    if (hoverIdx === null) {
      setIndicator(null);
      return;
    }
    const el = itemRefs.current[hoverIdx];
    if (el) {
      const parent = el.parentElement!;
      const elRect = el.getBoundingClientRect();
      const parentRect = parent.getBoundingClientRect();
      setIndicator({ left: elRect.left - parentRect.left, width: elRect.width });
    }
  }, [hoverIdx]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/40 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <a href="#" className="flex items-center">
            <img src={logo.url} alt="Qubitedge" className="h-8 w-auto" />
          </a>

          {/* Desktop dynamic nav with sliding indicator */}
          <nav
            className="hidden lg:flex relative items-center gap-1 rounded-full border border-gray-700 px-2 py-2"
            onMouseLeave={() => setHoverIdx(null)}
          >
            <AnimatePresence>
              {indicator && (
                <motion.span
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, left: indicator.left, width: indicator.width }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="absolute top-1 bottom-1 rounded-full bg-white/10 border border-white/15"
                  style={{ left: indicator.left, width: indicator.width }}
                />
              )}
            </AnimatePresence>

            {navItems.map((i, idx) => (
              <a
                key={i.label}
                ref={(el) => { itemRefs.current[idx] = el; }}
                href={i.href}
                onMouseEnter={() => setHoverIdx(idx)}
                className="relative z-10 px-4 py-1.5 text-sm text-white/80 hover:text-white rounded-full transition-colors"
              >
                {i.label}
              </a>
            ))}
            <a
              ref={(el) => { itemRefs.current[navItems.length] = el; }}
              href="#contact"
              onMouseEnter={() => setHoverIdx(navItems.length)}
              className="relative z-10 flex items-center gap-1 px-4 py-1.5 text-sm text-white/80 hover:text-white rounded-full transition-colors"
            >
              Contact us <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </nav>

          {/* Mobile: animated dot-grid trigger (not a classic hamburger) */}
          <button
            onClick={() => setOpen(true)}
            className="lg:hidden group flex items-center gap-2 rounded-full border border-white/20 px-3 py-2 text-xs text-white/80 hover:text-white hover:border-white/40 transition-colors"
            aria-label="Open menu"
          >
            <span className="grid grid-cols-2 gap-0.5">
              <span className="h-1 w-1 rounded-full bg-current" />
              <span className="h-1 w-1 rounded-full bg-current" />
              <span className="h-1 w-1 rounded-full bg-current" />
              <span className="h-1 w-1 rounded-full bg-current" />
            </span>
            Menu
          </button>
        </div>
      </header>

      {/* Mobile slide-over drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 280 }}
              className="fixed top-0 right-0 bottom-0 z-[70] w-[85%] max-w-sm bg-black border-l border-white/10 lg:hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b border-white/10">
                <img src={logo.url} alt="Qubitedge" className="h-7 w-auto" />
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-full p-2 hover:bg-white/10 text-white"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto p-4">
                <p className="px-3 pb-3 text-[10px] uppercase tracking-widest text-white/40">Explore</p>
                <ul className="flex flex-col gap-1">
                  {navItems.map((i, idx) => (
                    <motion.li
                      key={i.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + idx * 0.05 }}
                    >
                      <a
                        href={i.href}
                        onClick={() => setOpen(false)}
                        className="group flex items-start gap-3 rounded-xl p-3 hover:bg-white/5 transition-colors"
                      >
                        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-[#64CEFB] group-hover:border-[#64CEFB]/40">
                          <i.icon className="h-4 w-4" />
                        </span>
                        <span className="flex-1 min-w-0">
                          <span className="block text-sm text-white font-medium">{i.label}</span>
                          <span className="block text-xs text-white/50 mt-0.5">{i.desc}</span>
                        </span>
                        <ArrowUpRight className="h-4 w-4 text-white/30 group-hover:text-white transition-colors mt-2" />
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <div className="p-5 border-t border-white/10">
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="group flex items-center justify-center gap-2 w-full rounded-full bg-white text-black px-5 py-3 text-sm font-medium hover:bg-white/90 transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  Contact us
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
