"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { timelineContent, type TimelineStage } from "@/lib/content/teen-lesson-1";
import { ScrollReveal, ScrollDivider } from "./IntroScene";
import { playSound } from "@/lib/audio";
import { cn } from "@/lib/utils";

const colorMap: Record<TimelineStage["color"], { border: string; bg: string; text: string; dot: string; glow: string }> = {
  cyan: { border: "border-[#64d2ff]/30", bg: "bg-[#64d2ff]/[0.06]", text: "text-[#64d2ff]", dot: "bg-[#64d2ff]", glow: "shadow-[0_0_20px_rgba(100,210,255,0.3)]" },
  violet: { border: "border-[#bf5af2]/30", bg: "bg-[#bf5af2]/[0.06]", text: "text-[#bf5af2]", dot: "bg-[#bf5af2]", glow: "shadow-[0_0_20px_rgba(191,90,242,0.3)]" },
  mint: { border: "border-[#30d158]/30", bg: "bg-[#30d158]/[0.06]", text: "text-[#30d158]", dot: "bg-[#30d158]", glow: "shadow-[0_0_20px_rgba(48,209,88,0.3)]" },
  amber: { border: "border-[#ff9f0a]/30", bg: "bg-[#ff9f0a]/[0.06]", text: "text-[#ff9f0a]", dot: "bg-[#ff9f0a]", glow: "shadow-[0_0_20px_rgba(255,159,10,0.3)]" },
  rose: { border: "border-[#ff375f]/30", bg: "bg-[#ff375f]/[0.06]", text: "text-[#ff375f]", dot: "bg-[#ff375f]", glow: "shadow-[0_0_20px_rgba(255,55,95,0.3)]" },
};

export function TimelineScene() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 0.5], [60, -60]);
  const [activeStage, setActiveStage] = useState<number | null>(null);

  return (
    <section ref={ref} id="timeline" className="relative py-32 md:py-48 px-6">
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <ScrollReveal delay={0}>
          <p className="font-mono text-xs text-accent mb-4 tracking-[0.2em] uppercase">
            {timelineContent.eyebrow}
          </p>
        </ScrollReveal>

        <motion.h2
          style={{ y: titleY }}
          className="text-[40px] md:text-6xl lg:text-7xl font-display font-bold leading-[1.05] tracking-tight mb-8 text-gradient"
        >
          <ScrollReveal delay={0.1}>{timelineContent.title}</ScrollReveal>
        </motion.h2>

        <ScrollReveal delay={0.25}>
          <p className="text-base md:text-xl text-ink-soft max-w-3xl leading-relaxed mb-20 font-body">
            {timelineContent.subtitle}
          </p>
        </ScrollReveal>

        <ScrollDivider />

        {/* Timeline — vertical with progressive reveal */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute right-8 md:right-20 top-0 bottom-0 w-px bg-white/[0.06]" />
          <motion.div
            style={{ scaleY: scrollYProgress }}
            className="absolute right-8 md:right-20 top-0 bottom-0 w-px origin-top bg-gradient-to-b from-[#0a84ff] via-[#bf5af2] to-[#30d158]"
          />

          <div className="space-y-12 md:space-y-20">
            {timelineContent.stages.map((stage, i) => (
              <TimelineStageRow
                key={stage.num}
                stage={stage}
                index={i}
                isActive={activeStage === i}
                onClick={() => {
                  setActiveStage(activeStage === i ? null : i);
                  playSound("click");
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineStageRow({
  stage,
  index,
  isActive,
  onClick,
}: {
  stage: TimelineStage;
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  const colors = colorMap[stage.color];

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative pr-20 md:pr-40"
    >
      {/* Dot on timeline */}
      <motion.div
        className={cn("absolute right-8 md:right-20 top-2 -translate-y-1/2 translate-x-1/2 w-4 h-4 rounded-full border-2 border-black z-10", colors.dot, colors.glow)}
        animate={isActive ? { scale: [1, 1.3, 1] } : { scale: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Stage card */}
      <motion.button
        onClick={onClick}
        whileHover={{ x: -4 }}
        className={cn(
          "w-full text-right p-6 md:p-8 rounded-2xl border backdrop-blur-md transition-all",
          colors.border,
          colors.bg,
          isActive && "ring-2 ring-offset-0",
        )}
        style={isActive ? { boxShadow: `0 0 0 1px ${colors.dot}` } : {}}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <span className={cn("font-mono text-xs tracking-[0.15em]", colors.text)}>
              {stage.num}
            </span>
            <span className="text-3xl">{stage.icon}</span>
          </div>
          <span className="text-xs md:text-sm text-ink-faint font-mono">{stage.year}</span>
        </div>

        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-display font-bold text-ink mb-2">
          {stage.title}
        </h3>

        {/* Short desc */}
        <p className="text-sm md:text-base text-ink-soft mb-4">{stage.shortDesc}</p>

        {/* Hint */}
        {!isActive && (
          <div className="text-xs text-ink-faint font-mono flex items-center gap-1.5">
            <span>اضغط للتفاصيل</span>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="rtl:scale-x-[-1]">
              <path d="M2 5 H8 M5 2 L8 5 L5 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}

        {/* Expanded content */}
        {isActive && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="overflow-hidden mt-4"
          >
            <p className="text-sm md:text-base text-ink-soft leading-relaxed mb-4">
              {stage.longDesc}
            </p>
            <div className={cn("p-4 rounded-xl border", colors.border, colors.bg)}>
              <div className={cn("font-mono text-xs mb-2", colors.text)}>مثال:</div>
              <p className="text-sm text-ink leading-relaxed">{stage.example}</p>
            </div>
          </motion.div>
        )}
      </motion.button>
    </motion.div>
  );
}
