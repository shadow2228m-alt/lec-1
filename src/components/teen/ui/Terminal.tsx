"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { playSound } from "@/lib/audio";

interface TerminalLine {
  type: "prompt" | "out" | "success" | "error";
  text: string;
}

interface TerminalProps {
  lines: TerminalLine[];
  className?: string;
}

const lineStyles: Record<TerminalLine["type"], string> = {
  prompt: "text-[#30d158]",
  out: "text-ink-soft",
  success: "text-[#30d158]",
  error: "text-[#ff375f]",
};

export function Terminal({ lines, className }: TerminalProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.3"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  const [visibleCount, setVisibleCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      if (v > 0.4 && !started) setStarted(true);
    });
    return () => unsubscribe();
  }, [scrollYProgress, started]);

  useEffect(() => {
    if (!started || visibleCount >= lines.length) return;
    const t = setTimeout(() => {
      setVisibleCount((c) => c + 1);
      playSound("type");
    }, 380);
    return () => clearTimeout(t);
  }, [started, visibleCount, lines.length]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      dir="ltr"
      className={cn(
        "relative bg-[#0d1117] rounded-2xl overflow-hidden shadow-premium",
        "border border-white/[0.06]",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/[0.04]">
        <span className="w-3 h-3 rounded-full bg-[#ff5f56]/80" />
        <span className="w-3 h-3 rounded-full bg-[#ffbd2e]/80" />
        <span className="w-3 h-3 rounded-full bg-[#27c93f]/80" />
        <span className="font-mono text-[11px] text-ink-faint ml-2">terminal</span>
      </div>

      {/* Body */}
      <div className="px-6 py-5 min-h-[220px] font-mono text-[13px] leading-[1.85]">
        {lines.slice(0, visibleCount).map((line, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className={lineStyles[line.type]}
          >
            {line.text}
          </motion.div>
        ))}
        {visibleCount >= lines.length && (
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[#30d158]">$</span>
            <motion.span
              className="inline-block w-2 h-4 bg-[#2997ff]"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}
