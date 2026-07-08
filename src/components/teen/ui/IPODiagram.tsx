"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * IPO (Input → Processing → Output) diagram with SVG path drawing.
 * Connector lines draw themselves as the user scrolls into view.
 */
export function IPODiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.3"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className="relative my-12"
    >
      <div className="grid grid-cols-3 gap-4 md:gap-8 items-center relative">
        {/* Input box */}
        <IPOBox
          icon="⌨️"
          title="Input"
          desc="البيانات الداخلة"
          color="cyan"
          delay={0}
        />

        {/* Arrow 1 */}
        <ArrowConnector delay={0.6} />

        {/* Processing box */}
        <IPOBox
          icon="⚙️"
          title="Processing"
          desc="المعالجة المنطقية"
          color="violet"
          delay={0.4}
        />

        {/* Arrow 2 */}
        <ArrowConnector delay={1.0} />
      </div>

      {/* Output box — full width below */}
      <div className="mt-6">
        <IPOBox
          icon="✓"
          title="Output"
          desc="النتيجة النهائية"
          color="mint"
          delay={1.4}
          fullWidth
        />
      </div>
    </motion.div>
  );
}

/* Rebuilt with proper grid */
export function IPODiagramV2() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.3"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className="relative my-12"
    >
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 md:gap-3 items-center">
        <IPOBox
          icon="⌨️"
          title="Input"
          desc="البيانات الداخلة"
          color="cyan"
          delay={0}
        />
        <ArrowConnector delay={0.6} className="hidden md:block" />
        <IPOBox
          icon="⚙️"
          title="Processing"
          desc="المعالجة المنطقية"
          color="violet"
          delay={0.4}
        />
        <ArrowConnector delay={1.0} className="hidden md:block" />
        <IPOBox
          icon="✓"
          title="Output"
          desc="النتيجة النهائية"
          color="mint"
          delay={1.4}
        />
      </div>

      {/* Mobile arrows */}
      <div className="md:hidden flex flex-col items-center my-2">
        <span className="text-ink-faint text-xl rotate-90">→</span>
        <span className="text-ink-faint text-xl rotate-90">→</span>
      </div>
    </motion.div>
  );
}

interface IPOBoxProps {
  icon: string;
  title: string;
  desc: string;
  color: "cyan" | "violet" | "mint";
  delay: number;
  fullWidth?: boolean;
}

function IPOBox({ icon, title, desc, color, delay, fullWidth }: IPOBoxProps) {
  const colors = {
    cyan: {
      border: "border-cyan-400/40",
      bg: "bg-cyan-400/[0.06]",
      text: "text-cyan",
      svg: "#22d3ee",
    },
    violet: {
      border: "border-violet-400/40",
      bg: "bg-violet-400/[0.06]",
      text: "text-violet",
      svg: "#a78bfa",
    },
    mint: {
      border: "border-emerald-400/40",
      bg: "bg-emerald-400/[0.06]",
      text: "text-mint",
      svg: "#34d399",
    },
  };
  const c = colors[color];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
      className={cn(
        "relative p-6 md:p-7 rounded-2xl border backdrop-blur-md text-center overflow-hidden",
        c.border,
        c.bg,
        fullWidth && "max-w-md mx-auto",
      )}
    >
      {/* SVG drawn corner accents */}
      <svg className="absolute top-0 right-0 w-8 h-8" viewBox="0 0 32 32">
        <motion.path
          d="M 32 0 L 32 12 M 32 0 L 20 0"
          stroke={c.svg}
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: delay + 0.3 }}
        />
      </svg>
      <svg className="absolute bottom-0 left-0 w-8 h-8" viewBox="0 0 32 32">
        <motion.path
          d="M 0 32 L 0 20 M 0 32 L 12 32"
          stroke={c.svg}
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: delay + 0.4 }}
        />
      </svg>

      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay }}
        className="text-3xl md:text-4xl mb-3"
      >
        {icon}
      </motion.div>
      <div
        className={cn(
          "font-mono text-[11px] md:text-xs uppercase tracking-[0.15em] mb-2",
          c.text,
        )}
      >
        {title}
      </div>
      <div className="text-xs md:text-sm text-ink-soft">{desc}</div>
    </motion.div>
  );
}

function ArrowConnector({
  delay,
  className,
}: {
  delay: number;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <svg width="60" height="24" viewBox="0 0 60 24" fill="none">
        <motion.path
          d="M 2 12 L 50 12"
          stroke="#4b5570"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay, ease: "easeInOut" }}
        />
        <motion.path
          d="M 45 6 L 55 12 L 45 18"
          stroke="#22d3ee"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: delay + 0.6 }}
        />
      </svg>
    </div>
  );
}
