import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";

export const Route = createFileRoute("/it-services")({
  component: ITServices,
});

function ITServices() {
  return (
    <main className="min-h-screen text-white relative">
      <Navbar />
      
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[80%] h-[80%] rounded-full bg-blue-700/10 blur-[150px]" />
      </div>

      <div className="pt-40 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center flex flex-col items-center justify-center min-h-[70vh]">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-sm font-medium text-white/80 tracking-wide uppercase">Coming Soon</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 bg-gradient-to-br from-white via-white to-white/40 bg-clip-text text-transparent">
          IT Services
        </h1>
        
        <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed mb-12">
          Our enterprise-class solutions for growth are currently being documented. Check back soon for detailed information on how we empower businesses to scale with precision.
        </p>

        <a href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-colors">
          Return Home
        </a>
      </div>
    </main>
  );
}
