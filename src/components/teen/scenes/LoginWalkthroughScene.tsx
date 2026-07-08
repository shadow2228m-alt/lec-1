"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { loginWalkthrough } from "@/lib/content/teen-lesson-1";
import { ScrollReveal, ScrollDivider } from "./IntroScene";

export function LoginWalkthroughScene() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 0.5], [60, -60]);

  return (
    <section ref={ref} id="login-walkthrough" className="relative py-32 md:py-48 px-6">
      <div className="relative z-10 w-full max-w-5xl mx-auto">
        <ScrollReveal delay={0}>
          <p className="font-mono text-xs text-accent mb-4 tracking-[0.2em] uppercase">
            {loginWalkthrough.eyebrow}
          </p>
        </ScrollReveal>

        <motion.h2
          style={{ y: titleY }}
          className="text-[40px] md:text-6xl lg:text-7xl font-display font-bold leading-[1.05] tracking-tight mb-8 text-gradient"
        >
          <ScrollReveal delay={0.1}>{loginWalkthrough.title}</ScrollReveal>
        </motion.h2>

        <ScrollReveal delay={0.25}>
          <p className="text-base md:text-xl text-ink-soft max-w-3xl leading-relaxed mb-20 font-body">
            {loginWalkthrough.subtitle}
          </p>
        </ScrollReveal>

        <ScrollDivider />

        {/* Steps */}
        <div className="space-y-8 md:space-y-12">
          {loginWalkthrough.steps.map((step, i) => (
            <StepDetail key={i} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StepDetail({
  step,
  index,
}: {
  step: typeof loginWalkthrough.steps[0];
  index: number;
}) {
  return (
    <ScrollReveal delay={0}>
      <div className="grid md:grid-cols-[auto_1fr] gap-6 md:gap-10">
        {/* Number */}
        <div className="font-display font-bold text-5xl md:text-7xl text-[#0a84ff] leading-none tabular-nums">
          {step.num}
        </div>

        {/* Content */}
        <div>
          <h3 className="text-2xl md:text-3xl font-display font-bold text-ink mb-4">
            {step.title}
          </h3>

          {/* Code */}
          <div className="bg-[#0d1117] rounded-xl p-4 mb-4 border border-white/[0.06] overflow-x-auto" dir="ltr">
            <code className="font-mono text-sm md:text-base text-[#a5d6ff]">{step.code}</code>
          </div>

          {/* Explanation */}
          <p className="text-sm md:text-base text-ink-soft leading-relaxed mb-4">
            {step.explanation}
          </p>

          {/* Tip */}
          <div className="p-4 rounded-xl bg-[#0a84ff]/[0.06] border border-[#0a84ff]/20 flex items-start gap-3">
            <span className="text-lg shrink-0">💡</span>
            <p className="text-sm text-ink-soft leading-relaxed">{step.tip}</p>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}
