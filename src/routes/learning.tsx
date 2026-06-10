import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";

export const Route = createFileRoute("/learning")({
  component: Learning,
});

function Learning() {
  return (
    <main className="min-h-screen text-white relative">
      <Navbar />
      
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[80%] h-[80%] rounded-full bg-[#64CEFB]/10 blur-[150px]" />
      </div>

      <div className="pt-40 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center flex flex-col items-center justify-center min-h-[70vh]">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
          <span className="w-2 h-2 rounded-full bg-[#64CEFB] animate-pulse" />
          <span className="text-sm font-medium text-white/80 tracking-wide uppercase">Coming Soon</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 bg-gradient-to-br from-white via-white to-white/40 bg-clip-text text-transparent">
          Learning Paths
        </h1>
        
        <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed mb-12">
          We are currently building our comprehensive learning resources. Check back soon for courses, tutorials, and materials designed to bridge the gap between talent and opportunity.
        </p>

        <a href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-colors">
          Return Home
        </a>
      </div>
    </main>
  );
}
