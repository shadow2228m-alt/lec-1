"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { buttonHover } from "@/lib/motion";
import { playSound } from "@/lib/audio";

interface GlowButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  icon?: ReactNode;
  variant?: "primary" | "ghost";
  size?: "md" | "lg";
}

export function GlowButton({
  children,
  onClick,
  className,
  icon,
  variant = "primary",
  size = "lg",
}: GlowButtonProps) {
  const base =
    "relative inline-flex items-center gap-3 font-display font-bold no-select rounded-2xl transition-shadow";
  const sizes = {
    md: "px-6 py-3 text-base",
    lg: "px-9 py-5 text-lg",
  };
  const variants = {
    primary:
      "text-[#0a0e1a] shadow-glow-cyan bg-gradient-to-br from-cyan-400 to-violet-400",
    ghost:
      "text-ink border border-cyan-soft bg-card-glass hover:border-cyan-400/60",
  };

  return (
    <motion.button
      onClick={() => {
        playSound("click");
        onClick?.();
      }}
      onHoverStart={() => playSound("hover")}
      className={cn(base, sizes[size], variants[variant], className)}
      {...buttonHover}
    >
      <span>{children}</span>
      {icon && <span className="inline-flex items-center">{icon}</span>}
    </motion.button>
  );
}
