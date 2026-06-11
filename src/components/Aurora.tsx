import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function Aurora({ videoUrl }: { videoUrl?: string }) {
  const [accent, setAccent] = useState("#64CEFB");
  
  useEffect(() => {
    // Initial color
    const initial = document.documentElement.style.getPropertyValue("--accent-color");
    if (initial) setAccent(initial.trim());

    // Sync React state with the CSS variable for the framer motion animation
    const observer = new MutationObserver(() => {
      const currentAccent = document.documentElement.style.getPropertyValue("--accent-color");
      if (currentAccent) setAccent(currentAccent.trim());
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["style"] });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-[#050810]">
      {videoUrl && (
        <video 
          className="absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-overlay" 
          autoPlay loop muted playsInline src={videoUrl} 
        />
      )}
      
      <div className="absolute inset-0 mix-blend-screen opacity-60">
        <motion.div
          animate={{
            x: ["0%", "20%", "-10%", "0%"],
            y: ["0%", "10%", "-20%", "0%"],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-blue-900/40 blur-[120px]"
        />
        <motion.div
          animate={{
            x: ["0%", "-30%", "20%", "0%"],
            y: ["0%", "20%", "-10%", "0%"],
            scale: [1, 0.9, 1.3, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[10%] right-[0%] w-[50%] h-[50%] rounded-full bg-indigo-900/40 blur-[120px]"
        />
        {/* Dynamic accent blob */}
        <motion.div
          animate={{
            x: ["0%", "15%", "-15%", "0%"],
            y: ["0%", "-20%", "10%", "0%"],
            backgroundColor: accent,
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] rounded-full opacity-30 blur-[150px]"
          style={{ backgroundColor: accent }}
        />
      </div>
    </div>
  );
}
