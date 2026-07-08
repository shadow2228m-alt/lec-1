"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useMemo, useRef } from "react";

/**
 * Multi-layer parallax dark background.
 * Layers move at different speeds based on scroll for depth illusion.
 */
export function DarkGridBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Each layer moves at a different parallax rate
  const gridY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const blob1Y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const blob1X = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], [0, -250]);
  const blob2X = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const blob3Y = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const particlesY = useTransform(scrollYProgress, [0, 1], [0, -500]);

  const particles = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 6,
        duration: 4 + Math.random() * 5,
        color: ["#22d3ee", "#a78bfa", "#34d399", "#fbbf24"][i % 4],
        size: 2 + Math.random() * 4,
      })),
    [],
  );

  return (
    <div ref={ref} className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Layer 1: Grid (slowest) */}
      <motion.div
        style={{ y: gridY }}
        className="absolute inset-[-10%] bg-grid-overlay animate-grid-shift"
      />

      {/* Layer 2: Cyan glow blob (top-right) */}
      <motion.div
        style={{ y: blob1Y, x: blob1X }}
        className="absolute rounded-full blur-[120px]"
      >
        <motion.div
          className="w-[600px] h-[600px] rounded-full"
          style={{ background: "rgba(34, 211, 238, 0.18)" }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Layer 3: Violet glow blob (bottom-left) */}
      <motion.div
        style={{ y: blob2Y, x: blob2X }}
        className="absolute bottom-[-100px] left-[-100px] rounded-full blur-[120px]"
      >
        <motion.div
          className="w-[500px] h-[500px] rounded-full"
          style={{ background: "rgba(167, 139, 250, 0.15)" }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </motion.div>

      {/* Layer 4: Mint accent glow (center) */}
      <motion.div
        style={{ y: blob3Y }}
        className="absolute top-[40%] left-[50%] rounded-full blur-[100px]"
      >
        <motion.div
          className="w-[300px] h-[300px] rounded-full"
          style={{ background: "rgba(52, 211, 153, 0.08)" }}
          animate={{ y: [0, 30, 0], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
      </motion.div>

      {/* Layer 5: Particles (fastest) */}
      <motion.div style={{ y: particlesY }} className="absolute inset-0">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
              background: p.color,
              boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            }}
            animate={{
              y: [0, -30, 0],
              scale: [0.9, 1.3, 0.9],
              opacity: [0.3, 0.9, 0.3],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            }}
          />
        ))}
      </motion.div>

      {/* Top/bottom fades */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0a0e1a] via-[#0a0e1a]/60 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0a0e1a] via-[#0a0e1a]/60 to-transparent" />
    </div>
  );
}
