"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { whatIsContent, type ConceptStep } from "@/lib/content/teen-lesson-1";
import { playSound } from "@/lib/audio";
import { cn } from "@/lib/utils";

/**
 * StepExplorer — replaces the static numbered list.
 * الطالب يضغط على أي خطوة فيتفتح пример عملي تفاعلي ليها.
 */
export function StepExplorer() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <div className="mb-32">
      {/* Steps list */}
      <div className="space-y-2 md:space-y-3">
        {whatIsContent.steps.map((step, i) => (
          <StepRow
            key={step.num}
            step={step}
            index={i}
            isActive={activeStep === i}
            onClick={() => {
              if (activeStep === i) {
                setActiveStep(null);
              } else {
                setActiveStep(i);
                playSound("click");
              }
            }}
          />
        ))}
      </div>

      {/* Active step example — slides in below */}
      <AnimatePresence mode="wait">
        {activeStep !== null && (
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <StepExample step={whatIsContent.steps[activeStep]} index={activeStep} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface StepRowProps {
  step: ConceptStep;
  index: number;
  isActive: boolean;
  onClick: () => void;
}

function StepRow({ step, index, isActive, onClick }: StepRowProps) {
  return (
    <motion.button
      onClick={onClick}
      onHoverStart={() => playSound("hover")}
      whileHover={{ x: -4 }}
      className={cn(
        "group relative w-full text-right flex items-start gap-6 md:gap-10 py-8 md:py-12 border-b border-white/[0.06] transition-colors",
        isActive && "border-[#0a84ff]/30",
      )}
    >
      {/* Huge number */}
      <motion.div
        animate={{
          color: isActive ? "#0a84ff" : "#48484a",
          scale: isActive ? 1.05 : 1,
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="font-display font-bold text-5xl md:text-7xl lg:text-8xl leading-none shrink-0 w-20 md:w-32 tabular-nums"
      >
        {String(index + 1).padStart(2, "0")}
      </motion.div>

      {/* Content */}
      <div className="flex-1 pt-2 md:pt-4">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">{step.icon}</span>
          <h3
            className={cn(
              "text-2xl md:text-4xl font-display font-bold tracking-tight transition-colors",
              isActive ? "text-[#0a84ff]" : "text-ink",
            )}
          >
            {step.title}
          </h3>
        </div>
        <p className="text-base md:text-lg text-ink-soft leading-relaxed max-w-2xl font-body">
          {step.desc}
        </p>

        {/* "اضغط للمثال" hint */}
        {!isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="mt-3 inline-flex items-center gap-1.5 text-xs text-ink-faint font-mono"
          >
            <span>اضغط للمثال التفاعلي</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="rtl:scale-x-[-1]">
              <path d="M2 6 H10 M7 3 L10 6 L7 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        )}
      </div>

      {/* Chevron indicator */}
      <motion.div
        animate={{ rotate: isActive ? -90 : 0 }}
        className="self-center text-ink-faint shrink-0"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="rtl:scale-x-[-1]">
          <path d="M5 8 L10 13 L15 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </motion.button>
  );
}

/* ====== Step example — interactive mini-demo for each step ====== */
function StepExample({ step, index }: { step: ConceptStep; index: number }) {
  const examples: Record<number, React.ReactNode> = {
    0: <UnderstandProblemExample />,
    1: <DefineRequirementsExample />,
    2: <DivideSolutionExample />,
    3: <OrderStepsExample />,
    4: <ConditionsExample />,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="mt-8 p-6 md:p-10 rounded-3xl glass-card shadow-premium"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-px bg-[#0a84ff]" />
        <span className="font-mono text-xs text-[#0a84ff] tracking-[0.2em] uppercase">
          مثال تطبيقي
        </span>
      </div>
      {examples[index] || null}
    </motion.div>
  );
}

/* ====== Example 1: Understand the Problem ====== */
function UnderstandProblemExample() {
  const [selected, setSelected] = useState<number | null>(null);
  const correct = 2; // "إيه المخرجات المتوقعة"

  const questions = [
    { q: "إيه اللي الكمبيوتر يعمله؟", correct: false },
    { q: "إيه المدخلات اللي هندخلها؟", correct: false },
    { q: "إيه المخرجات المتوقعة؟", correct: true },
    { q: "إيه لون الشاشة؟", correct: false },
  ];

  return (
    <div>
      <h4 className="text-xl md:text-2xl font-display font-bold text-ink mb-3">
        السؤال الصح لـ "فهم المشكلة"
      </h4>
      <p className="text-sm md:text-base text-ink-soft mb-6 leading-relaxed">
        لو حد قالك "اعمل لي حساب بنكي" — إيه أول سؤال لازم تسأله قبل ما تبدأ تكتب كود؟
      </p>
      <div className="grid sm:grid-cols-2 gap-3">
        {questions.map((q, i) => (
          <motion.button
            key={i}
            onClick={() => {
              setSelected(i);
              playSound(q.correct ? "success" : "error");
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "p-4 rounded-xl text-right text-sm md:text-base border transition-all",
              selected === null && "bg-white/[0.04] border-white/[0.06] text-ink-soft hover:border-[#0a84ff]/40",
              selected === i && q.correct && "bg-[#30d158]/10 border-[#30d158]/40 text-ink",
              selected === i && !q.correct && "bg-[#ff375f]/10 border-[#ff375f]/40 text-ink",
              selected !== null && selected !== i && "opacity-40 bg-white/[0.04] border-white/[0.06] text-ink-soft",
            )}
          >
            <div className="flex items-center justify-between">
              <span>{q.q}</span>
              {selected === i && (
                <span className="text-lg">{q.correct ? "✓" : "✗"}</span>
              )}
            </div>
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "mt-4 p-4 rounded-xl text-sm leading-relaxed",
              selected === correct
                ? "bg-[#30d158]/[0.08] text-[#30d158] border border-[#30d158]/20"
                : "bg-[#ff375f]/[0.08] text-[#ff375f] border border-[#ff375f]/20",
            )}
          >
            {selected === correct
              ? "✓ أحسنت! قبل ما تبدأ، لازم تعرف إيه النتيجة المتوقعة. ده بيحدد كل الخطوات الجاية."
              : "✗ فكّر تاني. إيه أهم حاجة لازم تعرفها قبل ما تكتب أي كود؟"}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ====== Example 2: Define Requirements ====== */
function DefineRequirementsExample() {
  const [inputs, setInputs] = useState<string[]>([]);
  const [outputs, setOutputs] = useState<string[]>([]);

  const items = [
    { id: "email", label: "الإيميل", type: "input" as const },
    { id: "password", label: "كلمة المرور", type: "input" as const },
    { id: "welcome", label: "رسالة ترحيب", type: "output" as const },
    { id: "error", label: "رسالة خطأ", type: "output" as const },
    { id: "weather", label: "حالة الطقس", type: "output" as const },
    { id: "username", label: "اسم المستخدم", type: "input" as const },
  ];

  const toggle = (id: string, type: "input" | "output") => {
    const arr = type === "input" ? inputs : outputs;
    const set = type === "input" ? setInputs : setOutputs;
    if (arr.includes(id)) {
      set(arr.filter((x) => x !== id));
    } else {
      set([...arr, id]);
    }
    playSound("click");
  };

  const correctInputs = ["email", "password", "username"];
  const correctOutputs = ["welcome", "error"];
  const inputsCorrect =
    inputs.length === 3 && inputs.every((i) => correctInputs.includes(i));
  const outputsCorrect =
    outputs.length === 2 && outputs.every((o) => correctOutputs.includes(o));

  return (
    <div>
      <h4 className="text-xl md:text-2xl font-display font-bold text-ink mb-3">
        صنّف المدخلات والمخرجات
      </h4>
      <p className="text-sm md:text-base text-ink-soft mb-6 leading-relaxed">
        في نظام تسجيل دخول — اضغط على كل عنصر علشان تصنفه كـ input أو output.
      </p>
      <div className="grid sm:grid-cols-2 gap-3 mb-6">
        {items.map((item) => {
          const isIn = inputs.includes(item.id);
          const isOut = outputs.includes(item.id);
          return (
            <motion.button
              key={item.id}
              onClick={() => toggle(item.id, item.type)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "p-4 rounded-xl text-right text-sm md:text-base border transition-all flex items-center justify-between",
                !isIn && !isOut && "bg-white/[0.04] border-white/[0.06] text-ink-soft",
                isIn && "bg-[#0a84ff]/10 border-[#0a84ff]/40 text-ink",
                isOut && "bg-[#bf5af2]/10 border-[#bf5af2]/40 text-ink",
              )}
            >
              <span>{item.label}</span>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/[0.08]">
                {isIn ? "INPUT" : isOut ? "OUTPUT" : "؟"}
              </span>
            </motion.button>
          );
        })}
      </div>
      <AnimatePresence>
        {inputs.length + outputs.length >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "p-4 rounded-xl text-sm leading-relaxed border",
              inputsCorrect && outputsCorrect
                ? "bg-[#30d158]/[0.08] text-[#30d158] border-[#30d158]/20"
                : "bg-[#ff9f0a]/[0.08] text-[#ff9f0a] border-[#ff9f0a]/20",
            )}
          >
            {inputsCorrect && outputsCorrect
              ? "✓ ممتاز! حدّت المدخلات (email + password + username) والمخرجات (welcome + error) صح."
              : "🤔 قربت. اتأكد إنك صنفت كل العناصر صح — في عناصر لسه محتاجة تصنيف أو في تصنيف غلط."}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ====== Example 3: Divide Solution ====== */
function DivideSolutionExample() {
  const [expanded, setExpanded] = useState<number | null>(null);

  const bigProblem = "اعمل نظام تسجيل دخول كامل";
  const smallSteps = [
    { title: "اقرأ الإيميل", detail: "خد قيمة الإيميل من المستخدم" },
    { title: "اقرأ كلمة المرور", detail: "خد قيمة الباسوورد (مخفية)" },
    { title: "تأكد إنهم مش فاضيين", detail: "if not email or not password" },
    { title: "قارن مع الداتا الصح", detail: "if email == stored_email" },
    { title: "اطبع نتيجة", detail: "success message or error" },
  ];

  return (
    <div>
      <h4 className="text-xl md:text-2xl font-display font-bold text-ink mb-3">
        قسّم المشكلة الكبيرة
      </h4>
      <p className="text-sm md:text-base text-ink-soft mb-6 leading-relaxed">
        "اعمل نظام تسجيل دخول كامل" مشكلة كبيرة. اضغط على كل خطوة صغيرة علشان تشوف تفاصيلها.
      </p>
      <div className="space-y-2">
        {smallSteps.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <motion.button
              onClick={() => {
                setExpanded(expanded === i ? null : i);
                playSound("click");
              }}
              whileHover={{ x: -4 }}
              className={cn(
                "w-full text-right p-4 rounded-xl border transition-all flex items-center gap-4",
                expanded === i
                  ? "bg-[#0a84ff]/10 border-[#0a84ff]/40"
                  : "bg-white/[0.04] border-white/[0.06] hover:border-[#0a84ff]/30",
              )}
            >
              <span className="font-mono text-xs text-[#0a84ff] w-8 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 text-ink text-sm md:text-base">{s.title}</span>
              <motion.span animate={{ rotate: expanded === i ? 90 : 0 }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="rtl:scale-x-[-1]">
                  <path d="M3 7 H11 M7 3 L11 7 L7 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.span>
            </motion.button>
            <AnimatePresence>
              {expanded === i && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 py-3 mt-1 mr-12 ml-4 rounded-lg bg-black/40 border border-white/[0.04]">
                    <code className="font-mono text-xs text-[#64d2ff]" dir="ltr">
                      {s.detail}
                    </code>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
      <div className="mt-5 p-4 rounded-xl bg-[#0a84ff]/[0.06] border border-[#0a84ff]/20 text-sm text-ink-soft leading-relaxed">
        💡 كل خطوة صغيرة دي ممكن تتحول لـ 1-2 سطر كود. ده اللي بيخلي البرمجة أسهل.
      </div>
    </div>
  );
}

/* ====== Example 4: Order Steps ====== */
function OrderStepsExample() {
  const correctOrder = ["اقرأ الإيميل", "اقرأ كلمة المرور", "قارن البيانات", "اطبع النتيجة"];
  const [order, setOrder] = useState(["اطبع النتيجة", "اقرأ الإيميل", "قارن البيانات", "اقرأ كلمة المرور"]);

  const moveUp = (i: number) => {
    if (i === 0) return;
    const newOrder = [...order];
    [newOrder[i - 1], newOrder[i]] = [newOrder[i], newOrder[i - 1]];
    setOrder(newOrder);
    playSound("click");
  };
  const moveDown = (i: number) => {
    if (i === order.length - 1) return;
    const newOrder = [...order];
    [newOrder[i + 1], newOrder[i]] = [newOrder[i], newOrder[i + 1]];
    setOrder(newOrder);
    playSound("click");
  };

  const isCorrect = order.every((item, i) => item === correctOrder[i]);

  return (
    <div>
      <h4 className="text-xl md:text-2xl font-display font-bold text-ink mb-3">
        رتّب الخطوات بالترتيب الصح
      </h4>
      <p className="text-sm md:text-base text-ink-soft mb-6 leading-relaxed">
        استخدم الأسهم ↑ ↓ علشان ترتّب خطوات تسجيل الدخول بالترتيب المنطقي الصح.
      </p>
      <div className="space-y-2">
        {order.map((item, i) => (
          <motion.div
            key={item}
            layout
            className={cn(
              "flex items-center gap-3 p-4 rounded-xl border",
              isCorrect
                ? "bg-[#30d158]/10 border-[#30d158]/30"
                : "bg-white/[0.04] border-white/[0.06]",
            )}
          >
            <span className="font-mono text-sm text-[#0a84ff] w-6 shrink-0">
              {i + 1}.
            </span>
            <span className="flex-1 text-ink text-sm md:text-base">{item}</span>
            <div className="flex gap-1">
              <motion.button
                onClick={() => moveUp(i)}
                disabled={i === 0}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-7 h-7 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-ink-soft"
              >
                ↑
              </motion.button>
              <motion.button
                onClick={() => moveDown(i)}
                disabled={i === order.length - 1}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-7 h-7 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-ink-soft"
              >
                ↓
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {isCorrect && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 rounded-xl bg-[#30d158]/[0.08] border border-[#30d158]/20 text-sm text-[#30d158] leading-relaxed"
          >
            ✓ ممتاز! الترتيب صح: قراءة → مقارنة → نتيجة. لو غيّرت الترتيب، البرنامج هيقرأ حاجة لسه ما اتحددتش!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ====== Example 5: Conditions ====== */
function ConditionsExample() {
  const [email, setEmail] = useState("ahmed@code.academy");
  const [password, setPassword] = useState("1234");

  const VALID = { email: "ahmed@code.academy", password: "1234" };
  const emailOk = email === VALID.email;
  const passOk = password === VALID.password;
  const bothOk = emailOk && passOk;

  return (
    <div>
      <h4 className="text-xl md:text-2xl font-display font-bold text-ink mb-3">
        جرّب الشروط بنفسك
      </h4>
      <p className="text-sm md:text-base text-ink-soft mb-6 leading-relaxed">
        غيّر الإيميل أو الباسوورد وشوف إزاي الـ condition بتغيّر مسار البرنامج.
      </p>

      <div className="grid sm:grid-cols-2 gap-3 mb-6">
        <div>
          <label className="block font-mono text-[11px] text-ink-faint mb-2 tracking-wider uppercase">
            Email
          </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            dir="ltr"
            className="w-full px-3 py-2.5 rounded-lg bg-black/40 border border-white/[0.06] text-ink font-mono text-sm focus:outline-none focus:border-[#0a84ff] transition-colors"
          />
          <div className={cn("mt-2 text-xs font-mono", emailOk ? "text-[#30d158]" : "text-[#ff375f]")}>
            {emailOk ? "✓ email == stored" : "✗ email != stored"}
          </div>
        </div>
        <div>
          <label className="block font-mono text-[11px] text-ink-faint mb-2 tracking-wider uppercase">
            Password
          </label>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            dir="ltr"
            className="w-full px-3 py-2.5 rounded-lg bg-black/40 border border-white/[0.06] text-ink font-mono text-sm focus:outline-none focus:border-[#0a84ff] transition-colors"
          />
          <div className={cn("mt-2 text-xs font-mono", passOk ? "text-[#30d158]" : "text-[#ff375f]")}>
            {passOk ? "✓ password == stored" : "✗ password != stored"}
          </div>
        </div>
      </div>

      {/* Code preview with live highlight */}
      <div className="bg-[#0d1117] rounded-xl p-4 font-mono text-xs md:text-sm leading-relaxed border border-white/[0.04]" dir="ltr">
        <div className={cn("transition-colors", emailOk && passOk ? "bg-[#30d158]/8" : "bg-[#ff375f]/8")}>
          <span className="text-[#ff7b72]">if</span>{" "}
          <span className="text-[#ffa657]">email</span>{" "}
          <span className="text-[#ff7b72]">==</span>{" "}
          <span className="text-[#a5d6ff]">"{VALID.email}"</span>{" "}
          <span className="text-[#ff7b72]">and</span>{" "}
          <span className="text-[#ffa657]">password</span>{" "}
          <span className="text-[#ff7b72]">==</span>{" "}
          <span className="text-[#a5d6ff]">"{VALID.password}"</span>
          <span className="text-ink">:</span>
        </div>
        <div className="pl-4">
          <span className="text-[#ff7b72]">return</span>{" "}
          <span className="text-[#a5d6ff]">"أهلًا! ✓"</span>
        </div>
        <div className={cn("transition-colors", !bothOk ? "bg-[#30d158]/8" : "")}>
          <span className="text-[#ff7b72]">else</span>
          <span className="text-ink">:</span>
        </div>
        <div className="pl-4">
          <span className="text-[#ff7b72]">return</span>{" "}
          <span className="text-[#a5d6ff]">"غلط ✕"</span>
        </div>
      </div>

      {/* Live result */}
      <motion.div
        key={bothOk ? "ok" : "no"}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn(
          "mt-4 p-4 rounded-xl border text-sm leading-relaxed",
          bothOk
            ? "bg-[#30d158]/[0.08] border-[#30d158]/20 text-[#30d158]"
            : "bg-[#ff375f]/[0.08] border-[#ff375f]/20 text-[#ff375f]",
        )}
      >
        {bothOk
          ? "✓ الشرط اتحقق → البرنامج هيدخل في if ويرجع رسالة الترحيب"
          : "✗ الشرط مش متحقق → البرنامج هيدخل في else ويرجع رسالة الخطأ"}
      </motion.div>
    </div>
  );
}
