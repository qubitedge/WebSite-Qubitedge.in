import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { useCMS } from "@/lib/cms";
import { useAdmin } from "@/lib/AdminContext";
import { BlockRenderer } from "@/components/BlockRenderer";
import { BlockWrapper } from "@/components/BlockWrapper";
import { motion } from "framer-motion";
import { 
  Play, 
  Layers, 
  Map, 
  Navigation, 
  Compass, 
  ExternalLink, 
  ShieldCheck, 
  Wifi
} from "lucide-react";

export const Route = createFileRoute("/it-marketing")({
  head: () => ({
    meta: [
      { title: "IT & Marketing Projects — qubitedge" },
      {
        name: "description",
        content:
          "Explore qubitedge's IT & marketing showcase: from the JNTU GV 3D Campus Navigator with A* pathfinding to custom web systems, spatial apps, and enterprise-grade digital solutions.",
      },
      { name: "robots", content: "index, follow" },
      {
        name: "keywords",
        content:
          "qubitedge IT services, web development Hyderabad, campus navigator, 3D mapping, digital marketing, enterprise software, React Three.js projects, spatial web",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://qubitedge.in/it-marketing" },
      { property: "og:title", content: "IT & Marketing Projects — qubitedge" },
      {
        property: "og:description",
        content:
          "High-performance IT assets, custom integrations, and spatial web systems engineered for scale — including the JNTU GV 3D Campus Navigator.",
      },
      { property: "og:image", content: "https://qubitedge.in/logo.webp" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "IT & Marketing Projects — qubitedge" },
      {
        name: "twitter:description",
        content:
          "High-performance IT assets, custom integrations, and spatial web systems — including the JNTU GV 3D Campus Navigator.",
      },
      { name: "twitter:image", content: "https://qubitedge.in/logo.webp" },
    ],
    links: [{ rel: "canonical", href: "https://qubitedge.in/it-marketing" }],
  }),
  component: ITMarketing,
});

function ITMarketing() {
  const { content } = useCMS();
  const { isAdmin } = useAdmin();
  const blocks = content.pages?.["it-marketing"] ?? [];

  return (
    <main className="min-h-screen text-white pt-24 pb-16 relative overflow-hidden selection:bg-[#64CEFB]/30">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#64CEFB]/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[150px] pointer-events-none z-0" />

      <Navbar />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#64CEFB]/20 bg-[#64CEFB]/5 text-xs text-[#64CEFB] mb-4 uppercase tracking-widest font-medium"
          >
            <SparkleIcon className="h-3 w-3 animate-pulse" />
            IT & Marketing Showcase
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/70"
          >
            Projects & Products
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-white/60"
          >
            Discover our high-performance technical assets, custom integrations, and spatial web systems engineered for scale.
          </motion.p>
        </div>

        {/* Featured Project Showcase: JNTU GV Campus Navigator */}
        <div className="mt-16 flex flex-col gap-24 mb-32">
          
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center max-w-4xl mx-auto flex flex-col items-center px-4"
          >
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
              JNTU GV Campus Navigator
            </h2>
            <p className="text-xl md:text-3xl text-white/60 mb-10 font-medium">
              Know your campus before you arrive.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4">
              <a 
                href="#demo-video"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/5 text-white font-semibold hover:bg-white/10 transition-all border border-white/10"
              >
                <Play className="h-4 w-4 fill-current" /> Watch Demo
              </a>
              <a 
                href="https://navigation-mgmt.vercel.app/" 
                target="_blank" 
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-semibold hover:scale-105 transition-transform"
              >
                View Live <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </motion.div>

          {/* BIG VIDEO */}
          <motion.div 
            id="demo-video"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-full aspect-[16/9] md:aspect-[21/9] rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_0_100px_-20px_rgba(255,255,255,0.1)] bg-black relative"
          >
            <video 
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              controls
              src="https://res.cloudinary.com/den4nmmwx/video/upload/q_auto/f_auto/v1781427280/music_ixybzy.mp4"
            />
          </motion.div>

          {/* Features Grid */}
          <div className="max-w-7xl mx-auto w-full px-4">
            <h3 className="text-3xl md:text-4xl font-bold mb-12 text-center tracking-tight">Core Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "3D Campus Digital twin", desc: "Three.js, zoom/rotate campus map, room-level details.", icon: Map },
                { title: "Intelligent Pathfinding", desc: "A* search calculations for the shortest walking path route.", icon: Navigation },
                { title: "Indoor Navigation", desc: "Switchable multi-floor mapping for staircase/labs/corridors.", icon: Layers },
                { title: "Role-based Access", desc: "Tailored CMS, role control (Student, Editor, Admin), Analytics.", icon: ShieldCheck },
                { title: "Offline Caching", desc: "Service worker caching saves mapping data even offline.", icon: Wifi },
                { title: "Interactive Hover Popups", desc: "Instantly inspect building departments, hours, navigation.", icon: Compass }
              ].map((feat, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all"
                >
                  <feat.icon className="h-8 w-8 text-white mb-6" />
                  <h4 className="text-xl font-bold mb-3">{feat.title}</h4>
                  <p className="text-base text-white/60 leading-relaxed">{feat.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>



          {/* Tech Stack */}
          <div className="max-w-5xl mx-auto w-full px-4 pt-16">
            <h3 className="text-3xl md:text-4xl font-bold mb-12 text-center tracking-tight">Tech Stack</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {["React.js + Vite", "Three.js + R3F", "Node.js + Express", "PostgreSQL", "Draco 3D Mesh", "JWT Sessions", "Service Workers", "Vercel Pages"].map((tech, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="px-6 py-4 rounded-full bg-white/[0.02] border border-white/10 text-sm md:text-base font-medium hover:bg-white/[0.08] hover:scale-105 transition-all"
                >
                  {tech}
                </motion.div>
              ))}
            </div>
          </div>

        </div>

        {/* Dynamic Blocks at Bottom */}
        {blocks.length > 0 && (
          <div className="mt-20">
            <h3 className="text-2xl font-bold tracking-tight text-center mb-10 text-white/60">More from IT & Marketing</h3>
            <div className="divide-y divide-white/5">
              {blocks.map((b, i) => (
                isAdmin ? (
                  <BlockWrapper key={b.id} blockId={b.id} blockType={b.type} pageId="it-marketing" index={i} total={blocks.length}>
                    <BlockRenderer block={b} pageId="it-marketing" />
                  </BlockWrapper>
                ) : (
                  <BlockRenderer key={b.id} block={b} pageId="it-marketing" />
                )
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

function SparkleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z" />
    </svg>
  );
}
