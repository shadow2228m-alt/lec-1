"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { CodeBlock } from "../ui/CodeBlock";
import { Terminal } from "../ui/Terminal";
import { StepExplorer } from "../ui/StepExplorer";
import { IPOLiveDemo } from "../ui/IPOLiveDemo";
import { AnimatedIPO } from "../ui/AnimatedIPO";
import { InteractiveLoginDemo } from "../ui/InteractiveLoginDemo";
import { ScrollReveal, ScrollDivider } from "./IntroScene";
import { loginCode, terminalLines, whatIsContent, thinkContent } from "@/lib/content/teen-lesson-1";

export function WhatIsScene() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const titleY = useTransform(scrollYProgress, [0, 0.5], [60, -60]);

  return (
    <section ref={ref} id="what-is" className="relative py-32 md:py-48 px-6">
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <ScrollReveal delay={0}>
          <p className="font-mono text-xs text-accent mb-4 tracking-[0.2em] uppercase">
            {whatIsContent.label}
          </p>
        </ScrollReveal>

        <motion.h2
          style={{ y: titleY }}
          className="text-[40px] md:text-6xl lg:text-7xl font-display font-bold leading-[1.05] tracking-tight mb-8 max-w-4xl"
        >
          <ScrollReveal delay={0.1}>
            <span className="text-gradient">البرمجة طريقة تفكير،</span>
          </ScrollReveal>
          <ScrollReveal delay={0.25}>
            <span className="text-gradient-blue">مش حفظ أوامر.</span>
          </ScrollReveal>
        </motion.h2>

        <ScrollReveal delay={0.4}>
          <p className="text-lg md:text-2xl text-ink-soft max-w-3xl leading-relaxed mb-20 md:mb-32 font-body font-normal">
            {whatIsContent.intro}
            <span className="text-ink font-medium"> {whatIsContent.highlight} </span>
            بتعتمد على فهم المشكلة، تقسيمها لخطوات، ترتيبها منطقيًا، وتحويلها لتعليمات
            الكمبيوتر ينفذها.
          </p>
        </ScrollReveal>

        <ScrollDivider />

        {/* Step Explorer */}
        <ScrollReveal delay={0}>
          <p className="font-mono text-xs text-accent mb-4 tracking-[0.2em] uppercase">
            الخطوات الخمس · تفاعلي
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold leading-[1.05] tracking-tight mb-4 text-gradient max-w-3xl">
            اضغط على أي خطوة
          </h3>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p className="text-base md:text-xl text-ink-soft max-w-2xl leading-relaxed mb-12">
            كل خطوة فيها مثال تفاعلي صغير. جرّب بنفسك — كده بتفهم أكتر من أي شرح.
          </p>
        </ScrollReveal>

        <StepExplorer />

        <ScrollDivider />

        {/* IPO Live Demo */}
        <ScrollReveal delay={0}>
          <p className="font-mono text-xs text-accent mb-4 tracking-[0.2em] uppercase">
            إزاي البرنامج يفكر؟ · تفاعلي
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold leading-[1.05] tracking-tight mb-4 text-gradient max-w-3xl">
            Input → Processing → Output
          </h3>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p className="text-base md:text-xl text-ink-soft max-w-2xl leading-relaxed mb-4">
            {thinkContent.subtitle}
          </p>
        </ScrollReveal>

        {/* Analogies */}
        <div className="grid sm:grid-cols-3 gap-3 mb-10">
          {thinkContent.analogies.map((a, i) => (
            <ScrollReveal key={i} delay={0.3 + i * 0.1}>
              <div className="p-5 rounded-2xl glass-card">
                <div className="text-3xl mb-3">{a.icon}</div>
                <h4 className="text-sm font-display font-bold text-ink mb-2">{a.title}</h4>
                <p className="text-xs text-ink-soft leading-relaxed">{a.text}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Animated visual IPO diagram (cinematic, scroll-driven) */}
        <ScrollReveal delay={0}>
          <p className="text-sm md:text-base text-ink-soft mb-4 leading-relaxed">
            بصّ على الرسم المتحرك — الكرة المضيئة بتمشي من Input، عبر Processing، لـ Output.
          </p>
        </ScrollReveal>
        <AnimatedIPO />

        {/* Interactive IPO demo (hands-on) */}
        <ScrollReveal delay={0}>
          <p className="font-mono text-xs text-accent mb-2 mt-12 tracking-[0.2em] uppercase">
            دلوقتي جرّب بنفسك
          </p>
        </ScrollReveal>
        <IPOLiveDemo />

        <ScrollDivider />

        {/* Static code showcase */}
        <ScrollReveal delay={0}>
          <p className="font-mono text-xs text-accent mb-4 tracking-[0.2em] uppercase">
            الكود الكامل
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold leading-[1.05] tracking-tight mb-6 text-gradient max-w-3xl">
            نظام تسجيل الدخول
          </h3>
        </ScrollReveal>
        <ScrollReveal delay={0.25}>
          <p className="text-base md:text-xl text-ink-soft max-w-2xl leading-relaxed mb-12">
            ده الكود الكامل بـ Python. شوفه الأول، وبعدين جرّبه بنفسك في المربع اللي تحت.
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-5 mb-20">
          <CodeBlock
            filename={loginCode.filename}
            lang={loginCode.lang}
            lines={loginCode.lines}
          />
          <Terminal lines={terminalLines} />
        </div>

        {/* Interactive Login Demo */}
        <ScrollReveal delay={0}>
          <p className="font-mono text-xs text-accent mb-4 tracking-[0.2em] uppercase">
            جرّب بنفسك · تفاعلي
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold leading-[1.05] tracking-tight mb-4 text-gradient-blue max-w-3xl">
            نفّذ الكود بنفسك
          </h3>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p className="text-base md:text-xl text-ink-soft max-w-2xl leading-relaxed mb-12">
            اكتب إيميل وكلمة مرور، دوس Run، وشوف الكود بيتنفّذ خطوة بخطوة قدامك. جرّب بيانات مختلفة!
          </p>
        </ScrollReveal>

        <InteractiveLoginDemo />

        {/* Insight */}
        <ScrollReveal delay={0}>
          <div className="mt-20 relative p-8 md:p-12 rounded-3xl glass-card shadow-premium overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-l from-transparent via-[#0a84ff]/40 to-transparent" />
            <div className="flex items-start gap-5">
              <div className="text-3xl shrink-0">💡</div>
              <div>
                <h4 className="text-xl md:text-2xl font-display font-bold text-ink mb-3">
                  الفكرة الأساسية
                </h4>
                <p className="text-base md:text-lg text-ink-soft leading-relaxed font-body">
                  البرنامج مش بيبدأ من الكتابة على الكيبورد — بيبدأ من
                  <span className="text-ink font-medium"> التفكير الصحيح</span>.
                  الكود ده مجرد ترجمة لخطوات منطقية كنت فاكرها قبل ما أكتبها.
                  <br /><br />
                  كل سطر بيعمل حاجة واحدة فقط، والشروط (
                  <code className="font-mono text-accent text-sm">if</code> /{" "}
                  <code className="font-mono text-accent text-sm">else</code>
                  ) بتحكم مسار التنفيذ بناءً على البيانات. جرّبت بنفسك فوق؟ ده اللي بيحصل بالظبط.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
