import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <main className="min-h-screen text-white selection:bg-[#64CEFB]/30">
      <Navbar />
      
      {/* Background elements */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#64CEFB]/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-700/10 blur-[120px]" />
      </div>

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16 relative">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            Our Story
          </h1>
          <h2 className="text-2xl md:text-3xl text-[#64CEFB] font-medium mb-8">
            Built to Bridge the Gap
          </h2>
          <p className="text-lg text-white/80 leading-relaxed mb-6">
            Qubitedge was founded with a simple but powerful belief.
          </p>
          <div className="py-8 my-8 border-y border-white/10 relative">
            <div className="absolute left-0 top-0 w-1/4 h-px bg-gradient-to-r from-transparent to-[#64CEFB]/50" />
            <div className="absolute right-0 bottom-0 w-1/4 h-px bg-gradient-to-l from-transparent to-[#64CEFB]/50" />
            <p className="text-2xl md:text-3xl font-semibold text-white drop-shadow-[0_0_15px_rgba(100,206,251,0.3)]">
              Talent is everywhere, but opportunity is not.
            </p>
          </div>
          <p className="text-lg text-white/80 leading-relaxed mb-6">
            What began as a mission to equip students with practical, future-ready skills has grown into a full-scale ecosystem supporting learners, startups, and businesses alike.
          </p>
          <p className="text-lg text-white/80 leading-relaxed mb-6">
            Founded by Sam Oguri with over 25 years of global experience, Qubitedge is proudly headquartered in The Jewel of the East Coast—Visakhapatnam, with a growing network of partners and clients worldwide.
          </p>
          <p className="text-lg text-white/80 leading-relaxed">
            From hands-on workshops and tech services to executive mentoring and startup incubation, our journey is rooted in one core vision: to turn potential into performance—at every stage of growth.
          </p>
        </div>

        <div className="mt-32 max-w-5xl mx-auto relative">
          <div className="absolute -inset-4 bg-gradient-to-br from-[#64CEFB]/10 to-blue-700/10 blur-2xl -z-10 rounded-full" />
          
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Meet our Founder</h2>
          
          <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl p-8 md:p-12 flex flex-col md:flex-row gap-10 items-center">
            <div className="w-56 h-56 md:w-72 md:h-72 shrink-0 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(100,206,251,0.2)] border border-white/15 relative group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <img src="/ceo.png" alt="Sam Oguri" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-3xl font-bold mb-2">Sam Oguri</h3>
                  <p className="text-[#64CEFB] font-medium text-lg">Founder & CEO – Qubitedge</p>
                </div>
              </div>
              
              <div className="space-y-4 text-white/80 leading-relaxed text-lg">
                <p>
                  With over 25 years of leadership in EdTech and global services, the Founder and CEO of Qubitedge has a proven track record of building high-performing teams, scaling operations, and turning early-stage ventures into market leaders.
                </p>
                <p>
                  As the founding head of Chegg India, he spearheaded the company's growth from a team of 8 to over 850 professionals. His core expertise spans operational strategy, financial leadership, cross-functional execution, and scaling innovation with structure and precision.
                </p>
                <p>
                  At Qubitedge, he leads with a singular mission: to empower students with future-ready skills, and to help startups, professionals, and businesses scale smarter—with clarity, purpose, and measurable impact.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
