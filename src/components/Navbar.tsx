import { useState } from "react";
import { ArrowUpRight, Menu, X, ChevronDown } from "lucide-react";
import logo from "@/assets/qubitedge-logo.png.asset.json";

const navItems = [
  { label: "Learning", href: "#learning" },
  { label: "Manufacturing", href: "#manufacturing" },
  { label: "IT/IT Services", href: "#it-services" },
  { label: "About Us", href: "#about" },
  { label: "Workshops", href: "#workshops" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/40 border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <a href="#" className="flex items-center">
          <img src={logo.url} alt="Qubitedge" className="h-8 w-auto" />
        </a>

        <nav className="hidden lg:flex items-center gap-1 rounded-full border border-gray-700 px-2 py-2">
          {navItems.map((i) => (
            <a
              key={i.label}
              href={i.href}
              className="px-4 py-1.5 text-sm text-white/80 hover:text-white rounded-full transition-colors"
            >
              {i.label}
            </a>
          ))}
          <a
            href="#contact"
            className="flex items-center gap-1 px-4 py-1.5 text-sm text-white/80 hover:text-white rounded-full transition-colors"
          >
            Contact us <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-white"
          aria-label="Menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-white/10 bg-black/90">
          <div className="px-4 py-4 flex flex-col gap-2">
            {navItems.map((i) => (
              <a
                key={i.label}
                href={i.href}
                onClick={() => setOpen(false)}
                className="text-white/80 hover:text-white py-2 text-sm flex items-center justify-between"
              >
                {i.label} <ChevronDown className="h-4 w-4 -rotate-90" />
              </a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="text-white/80 hover:text-white py-2 text-sm flex items-center gap-1">
              Contact us <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
