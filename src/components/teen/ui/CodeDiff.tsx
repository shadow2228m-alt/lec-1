"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CodeDiffProps {
  buggyCode: { line: string; isBug: boolean }[];
  fixedCode: string[];
  /** Show after the user finds the bug */
  showFix: boolean;
}

/**
 * CodeDiff — side-by-side comparison of buggy vs fixed code.
 * Highlights the bug line in red, the fix line in green.
 */
export function CodeDiff({ buggyCode, fixedCode, showFix }: CodeDiffProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: showFix ? 1 : 0, y: showFix ? 0 : 20 }}
      className="grid md:grid-cols-2 gap-4 mt-6"
    >
      {/* Buggy code (left) */}
      <div className="bg-[#0d1117] rounded-2xl overflow-hidden border border-[#ff375f]/20">
        <div className="px-4 py-2.5 border-b border-white/[0.04] flex items-center justify-between">
          <span className="font-mono text-[11px] text-ink-faint">before.py</span>
          <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#ff375f]/15 text-[#ff375f]">BUG</span>
        </div>
        <div dir="ltr" className="p-4 font-mono text-[12px] leading-[1.85]">
          {buggyCode.map((line, i) => (
            <div
              key={i}
              className={cn(
                "px-2 -mx-2 rounded flex",
                line.isBug && "bg-[#ff375f]/10",
              )}
            >
              <span className="inline-block w-6 text-ink-darker/60 select-none text-right shrink-0">
                {i + 1}
              </span>
              <span className={cn("flex-1 whitespace-pre", line.isBug ? "text-[#ff375f]" : "text-[#f5f5f7]")}>
                {line.line}
              </span>
              {line.isBug && <span className="text-[#ff375f] mr-2">✗</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Fixed code (right) */}
      <div className="bg-[#0d1117] rounded-2xl overflow-hidden border border-[#30d158]/20">
        <div className="px-4 py-2.5 border-b border-white/[0.04] flex items-center justify-between">
          <span className="font-mono text-[11px] text-ink-faint">after.py</span>
          <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#30d158]/15 text-[#30d158]">FIXED</span>
        </div>
        <div dir="ltr" className="p-4 font-mono text-[12px] leading-[1.85]">
          {fixedCode.map((line, i) => {
            // Check if this line differs from the buggy version
            const buggyLine = buggyCode[i]?.line;
            const isFixed = buggyLine && line !== buggyLine;
            return (
              <div
                key={i}
                className={cn(
                  "px-2 -mx-2 rounded flex",
                  isFixed && "bg-[#30d158]/10",
                )}
              >
                <span className="inline-block w-6 text-ink-darker/60 select-none text-right shrink-0">
                  {i + 1}
                </span>
                <span className={cn("flex-1 whitespace-pre", isFixed ? "text-[#30d158]" : "text-[#f5f5f7]")}>
                  {line}
                </span>
                {isFixed && <span className="text-[#30d158] mr-2">✓</span>}
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
