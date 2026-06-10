import { useState, useEffect } from "react";
import { ArrowUpRight, X, Settings, Box } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useRouterState } from "@tanstack/react-router";
import { useCMS, scrollToAnchor } from "@/lib/cms";

export function Navbar() {
  const { content } = useCMS();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const routerState = useRouterState();
  const activePath = routerState.location.pathname;

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

  return (
    <>
      <header className="fixed top-3 left-0 right-0 z-50 px-3 sm:px-4">
        <div
          className={`mx-auto max-w-6xl flex items-center justify-between rounded-full border border-white/15 transition-all ${
            scrolled ? "bg-black/70 backdrop-blur-xl shadow-[0_8px_40px_-12px_rgba(100,206,251,0.25)]" : "bg-black/40 backdrop-blur-md"
          } pl-4 pr-2 py-2`}
        >
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img src="/logo.png" alt="Logo" className="h-7 w-7 object-contain drop-shadow-[0_0_15px_rgba(100,206,251,0.4)]" />
            <span className="text-white font-medium tracking-tight">{content.brand.name}</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {content.nav.map((i) => {
              const isActive = activePath === i.href;
              const linkClasses = `relative px-4 py-2 text-sm transition-colors ${
                isActive ? "text-white" : "text-white/70 hover:text-white"
              }`;
              const activeIndicator = isActive && (
                <motion.span
                  layoutId="nav-active-dot"
                  className="absolute left-1/2 -translate-x-1/2 -bottom-0.5 h-1 w-1 rounded-full bg-[#64CEFB]"
                />
              );

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
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <Link
              to="/admin"
              title="Admin"
              className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Settings className="h-4 w-4" />
            </Link>
            <Link
              to="/"
              hash={content.cta.anchor}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-white text-black px-5 py-2 text-sm font-medium hover:bg-white/90 transition-colors"
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
                  to="/admin"
                  onClick={() => setOpen(false)}
                  className="flex-1 flex items-center justify-center gap-2 rounded-full border border-white/15 px-4 py-3 text-sm text-white hover:bg-white/5"
                >
                  <Settings className="h-4 w-4" /> Admin
                </Link>
                <Link
                  to="/"
                  hash={content.cta.anchor}
                  onClick={() => setOpen(false)}
                  className="flex-[2] inline-flex items-center justify-center gap-1.5 rounded-full bg-white text-black px-5 py-3 text-sm font-medium hover:bg-white/90"
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
