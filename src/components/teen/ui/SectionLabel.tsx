"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: ReactNode;
  className?: string;
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "flex items-center gap-3 font-mono text-[12px] md:text-[13px] text-cyan uppercase tracking-[0.15em] mb-4",
        className,
      )}
    >
      <span className="flex-none w-8 h-px bg-gradient-to-l from-transparent to-cyan" />
      <span>{children}</span>
      <span className="flex-1 h-px bg-gradient-to-l from-cyan to-transparent opacity-30" />
    </motion.div>
  );
}
