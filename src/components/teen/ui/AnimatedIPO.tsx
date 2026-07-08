"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { playSound } from "@/lib/audio";
import { cn } from "@/lib/utils";

/**
 * AnimatedIPO — cinematic SVG diagram showing a glowing orb
 * traveling from Input → Processing → Output, changing color/size.
 * Replaces the static IPO diagram in WhatIsScene.
 */
export function AnimatedIPO() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.4"],
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [playKey, setPlayKey] = useState(0);

  // Auto-play when scrolled into view
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      if (v > 0.3 && v < 0.7 && !isPlaying) {
        setIsPlaying(true);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, isPlaying]);

  const replay = () => {
    setPlayKey((k) => k + 1);
    playSound("whoosh");
  };

  // Orb position along the path (0 = Input, 0.5 = Processing, 1 = Output)
  const orbProgress = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);

  return (
    <div ref={ref} className="relative my-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-2 items-center relative">
        {/* Input box */}
        <IPOBox icon="⌨️" title="Input" desc="البيانات الداخلة" color="cyan" delay={0} />

        {/* SVG path connecting Input → Processing (with animated orb) */}
        <div className="relative h-32 md:h-20 flex items-center justify-center order-last md:order-none">
          <svg
            viewBox="0 0 200 40"
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="none"
          >
            {/* Base line */}
            <motion.line
              x1="10"
              y1="20"
              x2="190"
              y2="20"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            {/* Animated glow line */}
            <motion.line
              x1="10"
              y1="20"
              x2="190"
              y2="20"
              stroke="url(#ipoGradient)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
            />
            <defs>
              <linearGradient id="ipoGradient" x1="0%" x2="100%">
                <stop offset="0%" stopColor="#64d2ff" />
                <stop offset="50%" stopColor="#bf5af2" />
                <stop offset="100%" stopColor="#30d158" />
              </linearGradient>
            </defs>
          </svg>

          {/* Animated orb (uses scroll progress) */}
          <motion.div
            style={{
              left: useTransform(orbProgress, [0, 1], ["5%", "85%"]),
              background: useTransform(
                orbProgress,
                [0, 0.5, 1],
                ["#64d2ff", "#bf5af2", "#30d158"],
              ),
            }}
            className="absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full shadow-[0_0_20px_currentColor]"
            animate={{
              scale: [1, 1.2, 1],
              boxShadow: ["0 0 10px currentColor", "0 0 20px currentColor", "0 0 10px currentColor"],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Processing box */}
        <IPOBox icon="⚙️" title="Processing" desc="المعالجة المنطقية" color="violet" delay={0.4} />

        {/* Mobile connector */}
        <div className="md:hidden flex justify-center -my-2">
          <svg width="40" height="20" viewBox="0 0 40 20" fill="none">
            <motion.path
              d="M 5 5 L 20 15 L 35 5"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="1"
              strokeDasharray="2 2"
            />
          </svg>
        </div>
      </div>

      {/* Output box — separate row, connected */}
      <div className="mt-6 max-w-xs mx-auto">
        <IPOBox icon="✓" title="Output" desc="النتيجة النهائية" color="mint" delay={1.4} fullWidth />
      </div>

      {/* Replay button */}
      <div className="flex justify-center mt-6">
        <motion.button
          onClick={replay}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.06] text-xs text-ink-soft hover:text-ink transition-colors font-mono"
        >
          ↻ إعادة الأنيميشن
        </motion.button>
      </div>
    </div>
  );
}

function IPOBox({
  icon,
  title,
  desc,
  color,
  delay,
  fullWidth,
}: {
  icon: string;
  title: string;
  desc: string;
  color: "cyan" | "violet" | "mint";
  delay: number;
  fullWidth?: boolean;
}) {
  const colors = {
    cyan: { border: "border-[#64d2ff]/30", bg: "bg-[#64d2ff]/[0.06]", text: "text-[#64d2ff]", dot: "bg-[#64d2ff]" },
    violet: { border: "border-[#bf5af2]/30", bg: "bg-[#bf5af2]/[0.06]", text: "text-[#bf5af2]", dot: "bg-[#bf5af2]" },
    mint: { border: "border-[#30d158]/30", bg: "bg-[#30d158]/[0.06]", text: "text-[#30d158]", dot: "bg-[#30d158]" },
  };
  const c = colors[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
      className={cn(
        "relative p-5 md:p-6 rounded-2xl border backdrop-blur-md text-center",
        c.border,
        c.bg,
        fullWidth && "max-w-md mx-auto",
      )}
    >
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay }}
        className="text-3xl md:text-4xl mb-3"
      >
        {icon}
      </motion.div>
      <div className={cn("flex items-center justify-center gap-2 mb-2")}>
        <span className={cn("w-1.5 h-1.5 rounded-full", c.dot)} />
        <span className={cn("font-mono text-[11px] md:text-xs uppercase tracking-[0.15em]", c.text)}>
          {title}
        </span>
      </div>
      <div className="text-xs md:text-sm text-ink-soft">{desc}</div>
    </motion.div>
  );
}
