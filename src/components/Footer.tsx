import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-black/60 backdrop-blur-md pt-20 pb-10 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Column 1: Brand & Description */}
          <div className="flex flex-col space-y-6">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Qubitedge Logo" className="h-8 w-8 object-contain drop-shadow-[0_0_15px_rgba(100,206,251,0.4)]" />
              <span className="text-xl font-bold tracking-tight text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                Qubitedge
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Qubitedge helps students build job-ready skills through hands-on training in IT, AI, and communication. We offer workshops, internships, and career support to prepare you for real-world opportunities.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-white/40 hover:text-[#64CEFB] transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white/40 hover:text-[#64CEFB] transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white/40 hover:text-[#64CEFB] transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-white/40 hover:text-[#64CEFB] transition-colors" aria-label="VK">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 4.5c0 0-1.5-1-3-1s-3 .5-3 .5c-.5.5-.5 1-.5 1s.5 2 .5 3c0 1-.5 1-.5 1s-1.5.5-3 .5-3-.5-3-.5c-1-.5-2-1.5-2-1.5s-.5-.5-.5-1 .5-2 1.5-3c1-1 2-1 2-1s1-.5 2-.5" />
                  <path d="M11 19c-3 0-5-1.5-6-3s-1.5-3-1.5-4c0-.5.5-1 1-1s1.5.5 2 1c.5.5 1 1.5 1 1.5s1 1.5 2 1.5 2-.5 2-.5" />
                  <path d="M16 19c1.5 0 2.5-1 3-2s1-2 1-2" />
                  <path d="M12 12c1 0 1.5.5 2 1s1 2 1 2" />
                </svg>
              </a>
              <a href="#" className="text-white/40 hover:text-[#64CEFB] transition-colors" aria-label="X (Twitter)">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white/40 hover:text-[#64CEFB] transition-colors" aria-label="YouTube">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Column 2: Company */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-white font-medium mb-2">Company</h3>
            <Link to="/about" className="text-sm text-white/60 hover:text-white transition-colors">About Us</Link>
            <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Policy</a>
            <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Terms and Conditions</a>
            <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Career</a>
            <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Blog</a>
          </div>

          {/* Column 3: Services */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-white font-medium mb-2">Services</h3>
            <Link to="/workshops" className="text-sm text-white/60 hover:text-white transition-colors">Workshops & Training</Link>
          </div>

          {/* Column 4: Contact Us */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-white font-medium mb-2">Contact Us</h3>
            <address className="not-italic text-sm text-white/60 leading-relaxed max-w-xs space-y-3">
              <p>4-61-15, Galilee Enclave,<br />Lawsons Bay Colony,<br />Visakhapatnam.</p>
              <p><a href="tel:+916302829618" className="hover:text-white transition-colors">+91 6302829618</a></p>
              <p><a href="mailto:info@quibitedge.in" className="hover:text-white transition-colors">info@quibitedge.in</a></p>
              <p className="pt-2">Monday – Saturday: 9:00 AM – 5:00 PM</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
          <p>© {new Date().getFullYear()} Qubitedge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
