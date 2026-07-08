"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { playSound } from "@/lib/audio";
import type { ConceptStep } from "@/lib/content/teen-lesson-1";

const colorMap: Record<
  ConceptStep["color"],
  {
    border: string;
    iconBg: string;
    numText: string;
    glow: string;
    svg: string;
    svgGlow: string;
  }
> = {
  cyan: {
    border: "border-cyan-400/30",
    iconBg: "bg-cyan-400/10",
    numText: "text-cyan",
    glow: "from-cyan-400/30",
    svg: "#22d3ee",
    svgGlow: "rgba(34,211,238,0.5)",
  },
  violet: {
    border: "border-violet-400/30",
    iconBg: "bg-violet-400/10",
    numText: "text-violet",
    glow: "from-violet-400/30",
    svg: "#a78bfa",
    svgGlow: "rgba(167,139,250,0.5)",
  },
  mint: {
    border: "border-emerald-400/30",
    iconBg: "bg-emerald-400/10",
    numText: "text-mint",
    glow: "from-emerald-400/30",
    svg: "#34d399",
    svgGlow: "rgba(52,211,153,0.5)",
  },
  amber: {
    border: "border-amber-400/30",
    iconBg: "bg-amber-400/10",
    numText: "text-amber",
    glow: "from-amber-400/30",
    svg: "#fbbf24",
    svgGlow: "rgba(251,191,36,0.5)",
  },
};

export function ConceptCard({ step, index }: { step: ConceptStep; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.3"],
  });

  // 3D tilt + rise
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [15, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const colors = colorMap[step.color];

  return (
    <motion.div
      ref={ref}
      style={{ y, rotateX, opacity, transformPerspective: 800 }}
      onHoverStart={() => playSound("hover")}
      whileHover={{ y: -8, rotateX: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }}
      className={cn(
        "group relative p-7 rounded-2xl bg-card-glass overflow-hidden",
        colors.border,
        "border",
      )}
    >
      {/* SVG drawn border — path draws itself on scroll */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <motion.rect
          x="0.5"
          y="0.5"
          width="99"
          height="99"
          rx="2"
          fill="none"
          stroke={colors.svg}
          strokeWidth="0.4"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.5 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: index * 0.15, ease: "easeInOut" }}
        />
      </svg>

      {/* Top accent line */}
      <div
        className={cn(
          "absolute top-0 right-0 left-0 h-px bg-gradient-to-l to-transparent",
          colors.glow,
        )}
      />

      {/* Icon with pulse ring */}
      <div className="relative mb-5">
        <div
          className={cn(
            "flex items-center justify-center w-14 h-14 rounded-xl text-3xl",
            colors.iconBg,
          )}
        >
          <motion.span
            animate={{ scale: [1, 1.1, 1] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.3,
            }}
          >
            {step.icon}
          </motion.span>
        </div>
        {/* Pulse ring */}
        <motion.div
          className={cn("absolute inset-0 rounded-xl border", colors.border)}
          animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeOut",
            delay: index * 0.4,
          }}
        />
      </div>

      {/* Number tag */}
      <div
        className={cn(
          "font-mono text-[11px] mb-2 tracking-[0.15em]",
          colors.numText,
        )}
      >
        {step.num}
      </div>

      {/* Title */}
      <h3 className="text-xl text-ink mb-3 font-display font-bold">
        {step.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-ink-soft leading-relaxed">{step.desc}</p>

      {/* Hover glow */}
      <motion.div
        className={cn(
          "absolute -bottom-12 -left-12 w-32 h-32 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br",
          colors.glow,
          "to-transparent",
        )}
      />
    </motion.div>
  );
}
