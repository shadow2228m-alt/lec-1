"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { errorsContent } from "@/lib/content/teen-lesson-1";
import { ScrollReveal, ScrollDivider } from "./IntroScene";
import { CodeDiff } from "../ui/CodeDiff";
import { playSound } from "@/lib/audio";
import { useLessonStore } from "@/lib/store/lesson-store";
import { cn } from "@/lib/utils";

const colorMap: Record<string, { border: string; bg: string; text: string }> = {
  rose: { border: "border-[#ff375f]/30", bg: "bg-[#ff375f]/[0.06]", text: "text-[#ff375f]" },
  amber: { border: "border-[#ff9f0a]/30", bg: "bg-[#ff9f0a]/[0.06]", text: "text-[#ff9f0a]" },
  violet: { border: "border-[#bf5af2]/30", bg: "bg-[#bf5af2]/[0.06]", text: "text-[#bf5af2]" },
};

export function ErrorsScene() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 0.5], [60, -60]);

  return (
    <section ref={ref} id="errors" className="relative py-32 md:py-48 px-6">
      <div className="relative z-10 w-full max-w-5xl mx-auto">
        <ScrollReveal delay={0}>
          <p className="font-mono text-xs text-accent mb-4 tracking-[0.2em] uppercase">
            {errorsContent.eyebrow}
          </p>
        </ScrollReveal>

        <motion.h2
          style={{ y: titleY }}
          className="text-[40px] md:text-6xl lg:text-7xl font-display font-bold leading-[1.05] tracking-tight mb-8 text-gradient"
        >
          <ScrollReveal delay={0.1}>{errorsContent.title}</ScrollReveal>
        </motion.h2>

        <ScrollReveal delay={0.25}>
          <p className="text-base md:text-xl text-ink-soft max-w-3xl leading-relaxed mb-8 font-body">
            {errorsContent.subtitle}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.35}>
          <div className="p-6 rounded-2xl bg-[#ff9f0a]/[0.06] border border-[#ff9f0a]/20 mb-20">
            <p className="text-sm md:text-base text-ink-soft leading-relaxed">
              {errorsContent.intro}
            </p>
          </div>
        </ScrollReveal>

        <ScrollDivider />

        {/* Types of errors */}
        <ScrollReveal delay={0}>
          <h3 className="text-2xl md:text-4xl font-display font-bold text-ink mb-10">
            {errorsContent.typesTitle}
          </h3>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-4 mb-20">
          {errorsContent.types.map((type, i) => {
            const c = colorMap[type.color];
            return (
              <ScrollReveal key={i} delay={0.1 + i * 0.1}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className={cn("p-6 rounded-2xl border backdrop-blur-md h-full", c.border, c.bg)}
                >
                  <div className="text-4xl mb-4">{type.icon}</div>
                  <h4 className={cn("font-mono text-sm mb-1", c.text)}>{type.name}</h4>
                  <p className="text-ink font-display font-bold mb-3">{type.arabic}</p>
                  <p className="text-sm text-ink-soft leading-relaxed mb-4">{type.desc}</p>
                  <code className="block font-mono text-xs text-ink-faint bg-black/30 p-2 rounded ltr:text-left" dir="ltr">
                    {type.example}
                  </code>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollDivider />

        {/* Debug challenge */}
        <ScrollReveal delay={0}>
          <h3 className="text-2xl md:text-4xl font-display font-bold text-ink mb-3">
            {errorsContent.challengeTitle}
          </h3>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <p className="text-sm md:text-lg text-ink-soft mb-10">
            {errorsContent.challengeSubtitle}
          </p>
        </ScrollReveal>

        <DebugChallenge />
      </div>
    </section>
  );
}

function DebugChallenge() {
  const [selectedLine, setSelectedLine] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [hintShown, setHintShown] = useState(false);
  const { showAha, hasShown } = useLessonStore();

  const handleSelect = (i: number) => {
    if (revealed) return;
    setSelectedLine(i);
  };

  const check = () => {
    if (selectedLine === null) return;
    const isBug = errorsContent.buggyCode[selectedLine].isBug;
    playSound(isBug ? "success" : "error");
    setRevealed(true);
    // Trigger aha moment if correct and not shown before
    if (isBug && !hasShown("bug-found")) {
      setTimeout(() => showAha("bug-found"), 600);
    }
  };

  const reset = () => {
    setSelectedLine(null);
    setRevealed(false);
    setHintShown(false);
    playSound("click");
  };

  const correct = revealed && selectedLine !== null && errorsContent.buggyCode[selectedLine].isBug;

  // The fixed version of the code (with bug line corrected)
  const fixedCode = errorsContent.buggyCode.map((line) => {
    if (line.isBug) {
      return line.line.replace(" or ", " and ");
    }
    return line.line;
  });

  return (
    <div>
      {/* Code lines */}
      <div className="bg-[#0d1117] rounded-2xl overflow-hidden border border-white/[0.06] mb-6">
        <div className="px-4 py-2.5 border-b border-white/[0.04] flex items-center justify-between">
          <span className="font-mono text-[11px] text-ink-faint">find_the_bug.py</span>
          <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#ff9f0a]/15 text-[#ff9f0a]">DEBUG</span>
        </div>
        <div dir="ltr" className="p-3">
          {errorsContent.buggyCode.map((line, i) => (
            <motion.button
              key={i}
              onClick={() => handleSelect(i)}
              whileHover={!revealed ? { backgroundColor: "rgba(255,255,255,0.03)" } : {}}
              className={cn(
                "w-full text-left px-3 py-2 rounded font-mono text-[13px] flex items-center gap-3 transition-all",
                selectedLine === i && !revealed && "bg-[#0a84ff]/10 ring-1 ring-[#0a84ff]/40",
                revealed && line.isBug && "bg-[#30d158]/10 ring-1 ring-[#30d158]/40",
                revealed && selectedLine === i && !line.isBug && "bg-[#ff375f]/10 ring-1 ring-[#ff375f]/40",
              )}
            >
              <span className="text-ink-darker/60 select-none w-6 text-right">{i + 1}</span>
              <span className={cn(
                "flex-1 whitespace-pre",
                revealed && line.isBug ? "text-[#ff375f]" : "text-[#f5f5f7]",
              )}>
                {line.line}
              </span>
              {selectedLine === i && !revealed && (
                <span className="text-[#0a84ff]">●</span>
              )}
              {revealed && line.isBug && (
                <span className="text-[#30d158]">🐛</span>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Hint */}
      {!revealed && (
        <div className="mb-4">
          <button
            onClick={() => {
              setHintShown(!hintShown);
              playSound("click");
            }}
            className="text-xs text-ink-faint hover:text-ink-soft font-mono transition-colors"
          >
            {hintShown ? "✕ إخفاء التلميح" : "💡 محتاج تلميح؟"}
          </button>
          {hintShown && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="overflow-hidden mt-2"
            >
              <div className="p-4 rounded-xl bg-[#ff9f0a]/[0.06] border border-[#ff9f0a]/20 text-sm text-ink-soft">
                ركّز على السطر اللي بيقارن الإيميل والباسوورد. في كلمة معينة فيه فرق كبير بين <code className="font-mono text-[#ff9f0a]">and</code> و <code className="font-mono text-[#ff9f0a]">or</code>.
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* Action buttons */}
      {!revealed && (
        <div className="flex gap-3">
          <motion.button
            onClick={check}
            disabled={selectedLine === null}
            whileHover={selectedLine !== null ? { scale: 1.02 } : {}}
            whileTap={selectedLine !== null ? { scale: 0.98 } : {}}
            className="px-6 py-3 rounded-xl bg-[#0a84ff] text-white font-display font-bold disabled:opacity-40 disabled:cursor-not-allowed transition-colors hover:bg-[#64d2ff]"
          >
            تحقّق
          </motion.button>
        </div>
      )}

      {/* Result */}
      {revealed && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "p-6 rounded-2xl border mb-4",
            correct
              ? "bg-[#30d158]/[0.08] border-[#30d158]/20"
              : "bg-[#ff375f]/[0.08] border-[#ff375f]/20",
          )}
        >
          <div className={cn("text-lg font-display font-bold mb-2", correct ? "text-[#30d158]" : "text-[#ff375f]")}>
            {correct ? "✓ أحسنت! لقيت الـ bug" : "✗ مش ده الـ bug، حاول تاني"}
          </div>
          {selectedLine !== null && (
            <p className="text-sm text-ink-soft leading-relaxed mb-4">
              <strong className="text-ink">السطر {selectedLine + 1}:</strong> {errorsContent.buggyCode[selectedLine].explanation}
            </p>
          )}

          {/* Code diff (only when correct) */}
          {correct && (
            <CodeDiff
              buggyCode={errorsContent.buggyCode}
              fixedCode={fixedCode}
              showFix={true}
            />
          )}

          <motion.button
            onClick={reset}
            whileHover={{ scale: 1.02 }}
            className="px-5 py-2.5 rounded-xl bg-white/[0.06] text-ink font-display font-bold border border-white/[0.08] hover:bg-white/[0.1] transition-colors text-sm"
          >
            ↻ جرّب تاني
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
