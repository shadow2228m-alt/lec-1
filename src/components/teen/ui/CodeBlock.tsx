"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import type { CodeLine } from "@/lib/content/teen-lesson-1";

interface CodeBlockProps {
  filename: string;
  lang: string;
  lines: CodeLine[];
  className?: string;
}

const tokenColors: Record<string, string> = {
  kw: "text-[#ff7b72]",
  fn: "text-[#d2a8ff]",
  str: "text-[#a5d6ff]",
  num: "text-[#79c0ff]",
  cm: "text-[#6e6e73] italic",
  op: "text-[#ff7b72]",
  var: "text-[#ffa657]",
  bool: "text-[#79c0ff]",
  plain: "text-[#f5f5f7]",
};

export function CodeBlock({ filename, lang, lines, className }: CodeBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.3"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className={cn(
        "relative bg-[#0d1117] rounded-2xl overflow-hidden shadow-premium",
        "border border-white/[0.06]",
        className,
      )}
    >
      {/* Header — minimal */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.04]">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56]/80" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e]/80" />
          <span className="w-3 h-3 rounded-full bg-[#27c93f]/80" />
        </div>
        <span className="font-mono text-[11px] text-ink-faint">{filename}</span>
        <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/[0.06] text-ink-soft">
          {lang}
        </span>
      </div>

      {/* Code body */}
      <div
        dir="ltr"
        className="px-6 py-5 font-mono text-[13px] md:text-[14px] leading-[1.85] overflow-x-auto nice-scroll"
      >
        {lines.map((line, idx) => (
          <Line key={idx} line={line} index={idx} progress={scrollYProgress} />
        ))}
      </div>
    </motion.div>
  );
}

function Line({
  line,
  index,
  progress,
}: {
  line: CodeLine;
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const start = 0.15 + index * 0.035;
  const opacity = useTransform(progress, [start, start + 0.1], [0, 1]);
  const x = useTransform(progress, [start, start + 0.1], [-10, 0]);

  const isEmpty =
    line.tokens.length === 0 ||
    (line.tokens.length === 1 && line.tokens[0].text === "");

  return (
    <motion.div style={{ opacity, x }} className="flex">
      <span className="inline-block w-8 text-ink-darker/80 select-none text-right pl-4 shrink-0">
        {index + 1}
      </span>
      <span className="flex-1 whitespace-pre">
        {isEmpty ? (
          "\u00A0"
        ) : (
          line.tokens.map((tok, i) => (
            <span key={i} className={tokenColors[tok.type]}>
              {tok.text}
            </span>
          ))
        )}
      </span>
    </motion.div>
  );
}
