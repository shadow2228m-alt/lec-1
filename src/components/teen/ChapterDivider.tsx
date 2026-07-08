"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { Chapter } from "@/lib/content/teen-lesson-1";

const accentMap: Record<
  Chapter["accent"],
  { text: string; glow: string; line: string }
> = {
  blue: { text: "#0a84ff", glow: "rgba(10,132,255,0.25)", line: "from-[#0a84ff]" },
  violet: { text: "#bf5af2", glow: "rgba(191,90,242,0.25)", line: "from-[#bf5af2]" },
  mint: { text: "#30d158", glow: "rgba(48,209,88,0.25)", line: "from-[#30d158]" },
  amber: { text: "#ff9f0a", glow: "rgba(255,159,10,0.25)", line: "from-[#ff9f0a]" },
  rose: { text: "#ff375f", glow: "rgba(255,55,95,0.25)", line: "from-[#ff375f]" },
};

/**
 * ChapterDivider — cinematic transition between major narrative acts.
 * Parallax-driven, scroll-integrated (not blocking).
 */
export function ChapterDivider({ chapter }: { chapter: Chapter }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const accent = accentMap[chapter.accent];

  // Parallax: number moves up slower than text
  const numberY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const numberOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.08, 0.08, 0]);
  const numberScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 0.8]);

  const titleY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const titleOpacity = useTransform(scrollYProgress, [0.1, 0.4, 0.6, 0.9], [0, 1, 1, 0]);

  const narrativeY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const narrativeOpacity = useTransform(scrollYProgress, [0.2, 0.45, 0.55, 0.8], [0, 1, 1, 0]);

  const lineScaleX = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);

  return (
    <section
      ref={ref}
      className="relative min-h-[80vh] flex items-center justify-center px-6 overflow-hidden"
    >
      {/* Spotlight from accent color */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 50% 40% at 50% 50%, ${accent.glow} 0%, transparent 70%)`,
        }}
      />

      <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
        {/* Huge faded chapter number */}
        <motion.div
          style={{ y: numberY, opacity: numberOpacity, scale: numberScale, color: accent.text }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <span className="font-display font-black text-[200px] md:text-[400px] leading-none select-none">
            {chapter.num}
          </span>
        </motion.div>

        {/* Chapter label */}
        <motion.div
          style={{ opacity: titleOpacity }}
          className="relative mb-6 font-mono text-xs tracking-[0.3em] uppercase"
          initial={{ opacity: 0 }}
        >
          <span style={{ color: accent.text }}>CHAPTER {chapter.num}</span>
        </motion.div>

        {/* Title — mask reveal driven by scroll */}
        <motion.h2
          style={{ y: titleY, opacity: titleOpacity }}
          className="relative font-display font-bold text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05] mb-8"
        >
          <span className="text-gradient">{chapter.title}</span>
        </motion.h2>

        {/* Decorative line that draws itself */}
        <motion.div
          style={{ scaleX: lineScaleX }}
          className={`relative h-px w-24 mx-auto mb-8 origin-center bg-gradient-to-l ${accent.line} to-transparent`}
        />

        {/* Narrative subtitle */}
        <motion.p
          style={{ y: narrativeY, opacity: narrativeOpacity }}
          className="relative text-lg md:text-2xl text-ink-soft max-w-2xl mx-auto leading-relaxed font-body"
        >
          {chapter.narrative}
        </motion.p>
      </div>
    </section>
  );
}
