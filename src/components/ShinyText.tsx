import { motion } from "framer-motion";

interface ShinyTextProps {
  text: string;
  baseColor?: string;
  shineColor?: string;
  speed?: number;
  spread?: number;
  className?: string;
}

export function ShinyText({
  text,
  baseColor = "#64CEFB",
  shineColor = "#ffffff",
  speed = 3,
  spread = 100,
  className = "",
}: ShinyTextProps) {
  return (
    <motion.span
      className={className}
      style={{
        backgroundImage: `linear-gradient(${spread}deg, ${baseColor} 0%, ${baseColor} 40%, ${shineColor} 50%, ${baseColor} 60%, ${baseColor} 100%)`,
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        color: "transparent",
        display: "inline-block",
      }}
      animate={{ backgroundPosition: ["200% 0%", "-200% 0%"] }}
      transition={{ duration: speed, ease: "linear", repeat: Infinity }}
    >
      {text}
    </motion.span>
  );
}
