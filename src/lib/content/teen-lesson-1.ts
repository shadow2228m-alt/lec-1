/**
 * Teen Lesson 1 — Complete Content Configuration
 * محتوى كامل لطلاب 16 سنة بدون خلفية برمجية
 * يشمل: نصوص غنية + أمثلة + تشبيهات + تفاعلات
 */

/* ====== Chapter Dividers (cinematic transitions between major acts) ====== */
export interface Chapter {
  num: string;
  title: string;
  narrative: string;
  /** Scene id where this chapter appears BEFORE */
  beforeScene: string;
  /** Accent color for this chapter */
  accent: "blue" | "violet" | "mint" | "amber" | "rose";
}

export const chapters: Chapter[] = [
  {
    num: "01",
    title: "البداية",
    narrative: "قبل ما نبدأ، خلّنا نفهم إحنا هنمشي فين",
    beforeScene: "intro",
    accent: "blue",
  },
  {
    num: "02",
    title: "الأساس",
    narrative: "البرمجة مش اللي إنت فاكره — هي أبسط وأعمق من كده",
    beforeScene: "what-is",
    accent: "blue",
  },
  {
    num: "03",
    title: "القصة",
    narrative: "إزاي وصلنا من آلة عملاقة لتطبيق في جيبك؟",
    beforeScene: "timeline",
    accent: "violet",
  },
  {
    num: "04",
    title: "التطبيق",
    narrative: "بعد ما فهمنا، دلوقتي نشغّل اللي تعلّمناه",
    beforeScene: "conditions",
    accent: "amber",
  },
  {
    num: "05",
    title: "الخلاصة",
    narrative: "كل حكاية ليها نهاية — ونهايتنا دي بداية رحلتك",
    beforeScene: "summary",
    accent: "mint",
  },
];

/* ====== Aha Moments (cinematic insights after successful interactions) ====== */
export interface AhaMoment {
  id: string;
  text: string;
  subtext?: string;
}

export const ahaMoments: Record<string, AhaMoment> = {
  "intro-quiz": {
    id: "intro-quiz",
    text: "كده فهمت إن البرمجة = تعليمات واضحة للكمبيوتر",
    subtext: "البرمجة مش سحر — هي طريقة واضحة لتوصيل الفكرة",
  },
  "steps-explored": {
    id: "steps-explored",
    text: "5 خطوات = طريقة تفكير كاملة",
    subtext: "ده اللي كل مبرمج بيعمله قبل ما يكتب أي كود",
  },
  "login-success": {
    id: "login-success",
    text: "إنت لسه شغّلت برنامج حقيقي!",
    subtext: "كل تطبيق في موبايلك بيشتغل بنفس الطريقة دي",
  },
  "condition-built": {
    id: "condition-built",
    text: "الشروط بتخلي البرامج ذكية",
    subtext: "بناءً على البيانات، البرنامج بياخد قرارات مختلفة",
  },
  "bug-found": {
    id: "bug-found",
    text: "كل مبرمج بيلقي bugs — المهم تعرف تصلّحها",
    subtext: "ده اسمه Debugging، وأحسن مبرمج هو أسرع واحد في التصليح",
  },
  "activity-solved": {
    id: "activity-solved",
    text: "ده بالظبط اللي المبرمج بيعمله كل يوم",
    subtext: "تحليل مشكلة → تقسيمها → ترتيبها → تنفيذها",
  },
};

/* ====== Hero Scene ====== */
export const heroContent = {
  badge: "LESSON 01 · INTRO TO PROGRAMMING",
  titleLines: ["From Giant Computers", "to Modern Apps"],
  subtitle:
    "رحلتك الأولى في عالم البرمجة. هنفهم إزاي الكمبيوتر بيفكر، وإزاي نحوّل فكرة لكود حقيقي يشتغل.",
  cta: "ابدأ الحصة",
  meta: [
    { label: "Code Academy", dot: "cyan" },
    { label: "Instructor: Ahmed Farhat", dot: "violet" },
    { label: "90 minutes", dot: "mint" },
    { label: "Beginner Level", dot: "amber" },
  ],
};

/* ====== Intro Scene ====== */
export const introContent = {
  eyebrow: "أهلًا بيكم في الحصة الأولى",
  title: "قبل ما نبدأ...",
  subtitle:
    "الحصة دي مش محتاجة أي خلفية برمجية. هنبدأ من الصفر، وهنفهم سوا إزاي الكمبيوتر بيفكر، وإزاي نكلمه بلغته.",
  introParagraphs: [
    "تخيّل إنك بتتعلم لغة جديدة — لغة بلد غريب. أول ما توصل هناك، مش هتعرف تتكلم مع حد. بس لو حد علّمك كام كلمة، وبعدين جمل بسيطة، وبعدها محادثات كاملة... هتلاقي نفسك بتتكلم بطلاقة.",
    "البرمجة بالظبط كده. الكمبيوتر كائن بيفهم لغة معينة. احنا دورنا إننا نتعلم اللغة دي، علشان نقدر نقوله يعمل اللي احنا عايزينه.",
    "في الحصة دي، هنمشي خطوة خطوة. مش هنجري. كل فكرة هنتأكد إنها وصلت قبل ما نروح اللي بعدها. لو حسّيت إنك مش فاهم حاجة، وقف واقرها تاني — ده طبيعي تمامًا.",
  ],
  objectivesTitle: "هدف الحصة",
  objectives: [
    "نبني فهم صحيح ومبسط لمفهوم البرمجة",
    "نفهم إزاي الكمبيوتر تطور من آلة عملاقة لتطبيق في موبايلك",
    "نعرف إزاي أي برنامج بيشتغل من جوّه (Input → Processing → Output)",
    "نتعلم إزاي المبرمج بيفكّر قبل ما يكتب أي كود",
    "نحاول نحلل مشكلة بسيطة ونحوّلها لخطوات منطقية",
  ],
  whatWellLearnTitle: "إيه اللي هنتعلمه النهارده؟",
  whatWellLearn: [
    { q: "البرمجة معناها إيه بالظبط؟", icon: "🤔" },
    { q: "إزاي الكمبيوتر والبرمجة تطوروا عبر الزمن؟", icon: "🕰️" },
    { q: "إزاي أي برنامج بيشتغل من جوّه؟", icon: "⚙️" },
    { q: "إزاي المبرمج بيفكّر قبل ما يكتب كود؟", icon: "🧠" },
    { q: "إزاي أحلّل مشكلة وأحوّلها لخطوات؟", icon: "📊" },
  ],
  quizTitle: "قبل ما نبدأ — سؤال بسيط",
  quizQuestion: "لو قلت للكمبيوتر: \"اعمللي ساندوتش\" — إيه اللي هيحصل؟",
  quizOptions: [
    {
      id: "smart",
      label: "هيروح المطبخ ويعمل ساندوتش",
      correct: false,
      feedback: "للأسف لا! الكمبيوتر مش بيفهم النوايا. محتاج تعليمات دقيقة جدًا.",
    },
    {
      id: "instructions",
      label: "مش هيعمل حاجة — محتاج تعليمات خطوة بخطوة",
      correct: true,
      feedback: "صح! الكمبيوتر محتاج تعليمات واضحة ومرتبة. ده اللي البرمجة بتعمله.",
    },
    {
      id: "refuse",
      label: "هيرفض لأنها مش مهمة برمجية",
      correct: false,
      feedback: "لا، الكمبيوتر ميرفضش. هو بينفّذ اللي تقولهولي — بس لازم تقوله إزاي.",
    },
  ],
};

/* ====== What Is Programming Scene ====== */
export interface ConceptStep {
  num: string;
  title: string;
  desc: string;
  color: "cyan" | "violet" | "mint" | "amber";
  icon: string;
}

export const whatIsContent: {
  label: string;
  title: string;
  intro: string;
  highlight: string;
  steps: ConceptStep[];
} = {
  label: "إيه هي البرمجة؟",
  title: "البرمجة طريقة تفكير، مش حفظ أوامر",
  intro:
    "البرمجة مش مجرد حفظ أوامر أو كتابة أكواد. هي",
  highlight: "طريقة تفكير",
  steps: [
    {
      num: "01 // STEP",
      title: "فهم المشكلة",
      desc: "قبل ما تكتب أي كود، لازم تفهم إيه المطلوب بالظبط وإيه المدخلات والمخرجات.",
      color: "cyan",
      icon: "🧠",
    },
    {
      num: "02 // STEP",
      title: "تحديد المطلوب",
      desc: "حدّد بالظبط إيه اللي البرنامج لازم يعمله، وإيه البيانات اللي هتدخله، وإيه النتيجة المتوقعة.",
      color: "violet",
      icon: "🎯",
    },
    {
      num: "03 // STEP",
      title: "تقسيم الحل لخطوات",
      desc: "قسّم المشكلة الكبيرة لخطوات صغيرة قابلة للتنفيذ — كل خطوة بتعمل حاجة واحدة فقط.",
      color: "mint",
      icon: "🧩",
    },
    {
      num: "04 // STEP",
      title: "الترتيب المنطقي",
      desc: "رتّب الخطوات بترتيب صحيح — الترتيب الغلط بيخلي البرنامج كله يفشل حتى لو الخطوات صح.",
      color: "amber",
      icon: "📊",
    },
    {
      num: "05 // STEP",
      title: "الشروط والقرارات",
      desc: "حدّد النقاط اللي البرنامج لازم ياخد فيها قرار بناءً على شرط معين — لو كذا اعمل كذا، غير كده اعمل كذا.",
      color: "cyan",
      icon: "🔀",
    },
  ],
};

/* ====== Computing Timeline Scene ====== */
export interface TimelineStage {
  num: string;
  year: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  example: string;
  icon: string;
  color: "cyan" | "violet" | "mint" | "amber" | "rose";
}

export const timelineContent: {
  eyebrow: string;
  title: string;
  subtitle: string;
  stages: TimelineStage[];
} = {
  eyebrow: "رحلة في الزمن",
  title: "إزاي وصلنا لهنا؟",
  subtitle:
    "قبل ما نتكلم عن البرمجة، لازم نفهم القصة كاملة. الكمبيوتر اللي في موبايلك دلوقتي، مرّ برحلة طويلة جدًا علشان يبقى زي ما هو دلوقتي. خلينا نمشيها مرحلة مرحلة.",
  stages: [
    {
      num: "01",
      year: "قبل الحواسيب الحديثة",
      title: "كل حاجة باليد",
      shortDesc: "الناس كانت تعمل الحسابات بورقة وقلم",
      longDesc:
        "في البداية، الإنسان كان محتاج يعمل حسابات كتير — لإدارة المحاصيل، للتجارة، للبناء. مفيش أي آلة بتساعده. كان بيستخدم أصابعه، وبعدين الحصى، وبعدين العدّة (abacus). كل ده كان بطيء جدًا ومعرض للخطأ.",
      example:
        "تخيّل إنك محتاج تضرب 234 في 567 بالورقة والقلم. هتاخد منك دقايق. لو غلّط في رقم، النتيجة كلها هتبقى غلط. ده كان حال الناس لقرون طويلة.",
      icon: "✋",
      color: "cyan",
    },
    {
      num: "02",
      year: "أول الحواسيب العملاقة",
      title: "آلات ضخمة بقدرات صغيرة",
      shortDesc: "حواسيب بحجم الغرفة بقدرة أقل من آلة حاسبة",
      longDesc:
        "مع زيادة الحاجة للسرعة، بدأ الناس يخترعو آلات بتساعد في العمليات الحسابية. ظهرت أول الحواسيب العملاقة — كانت بتاخد حاجة كبيرة جدًا (غرفة كاملة)، بتستهلك كهرباء كتير، وبتعمل عمليات حسابية بسيطة مقارنة بالسرعات اللي احنا عارفينها النهارده.",
      example:
        "حواسيب زي ENIAC (سنة 1945) كانت بزن 30 طن، بتاخد حيز 167 متر مربع، وبتعمل 5000 عملية جمع في الثانية. موبايلك دلوقتي بيعمل مليارات العمليات في الثانية!",
      icon: "🏭",
      color: "violet",
    },
    {
      num: "03",
      year: "ظهور مشكلة البرمجة",
      title: "إزاي نكلم الآلة؟",
      shortDesc: "السؤال اللي ولّد البرمجة",
      longDesc:
        "بعد ما ظهرت الحواسيب، الناس سألت نفسها سؤال مهم: إزاي نخلي الآلة دي تعمل اللي احنا عايزينه؟ مفيش كلمة سحرية نقولها للكمبيوتر فيفهم. لازم نلاقي طريقة نديله بيها تعليمات دقيقة وواضحة. من هنا، ظهرت الحاجة لـ \"البرمجة\" — يعني طريقة لتحويل أفكارنا لتعليمات يفهمها الكمبيوتر.",
      example:
        "تخيّل إنك عندك عامل أجنبي مابيفهمش لغتك. لو قلتله \"اعمل شاي\"، مش هيفهم. لازم تقوله خطوة خطوة: 1) هات كوباية، 2) حط فيها شاي، 3) صب مية سخنة... الكمبيوتر بالظبط كده.",
      icon: "❓",
      color: "amber",
    },
    {
      num: "04",
      year: "تطور لغات البرمجة",
      title: "من أوامر معقدة لكلمات بسيطة",
      shortDesc: "اللغات قربت للبشر",
      longDesc:
        "في الأول، الأوامر كانت معقدة جدًا وقريبة من لغة الآلة (0 و 1). مع الوقت، تطوّرت لغات البرمجة و بقت أوضح وأسهل وأقرب لطريقة تفكير البشر. ده اللي خلّى البرمجة تنتشر وتبقى متاحة لأي حد يتعلمها، مش بس للمتخصصين.",
      example:
        "بدل ما نقول للكمبيوتر '10110001 00000101'، بقينا نقول 'print(\"Hello\")'. فرق كبير صح؟ اللغات الحديثة زي Python و JavaScript قريبة جدًا من الإنجليزي.",
      icon: "💬",
      color: "mint",
    },
    {
      num: "05",
      year: "البرمجة اليوم",
      title: "في كل حاجة حوليك",
      shortDesc: "من تطبيقات الموبايل للذكاء الاصطناعي",
      longDesc:
        "النهارده، البرمجة جزء من حياتنا اليومية. كل اللي بنستخدمه — تطبيقات الموبايل، مواقع الإنترنت، الألعاب، الخدمات البنكية، الذكاء الاصطناعي، حتى السيارات الحديثة — كل ده مبني ببرمجة. البرمجة مش حاجة غريبة أو صعبة، دي أداة بنستخدمها علشان نحل مشاكل ونوفّر وقت.",
      example:
        "لما تفتح Instagram، البتاع بتاعك (follow)، الـ feed بيتحدّث، الفيديوهات بتشتغل، الإشعارات بتوصل — كل ده كود مكتوب بـ React و Swift و Python. آلاف السطور بتنفّذ في أجزاء من الثانية.",
      icon: "📱",
      color: "rose",
    },
  ],
};

/* ====== How Programs Think Scene ====== */
export const thinkContent: {
  eyebrow: string;
  title: string;
  subtitle: string;
  stages: { num: string; name: string; arabic: string; icon: string; color: string; desc: string }[];
  analogies: { title: string; text: string; icon: string }[];
} = {
  eyebrow: "إزاي البرنامج يفكّر؟",
  title: "السر ورا كل برنامج",
  subtitle:
    "أي برنامج في العالم — من آلة حاسبة بسيطة لنظام تشغيل موبايل — بيشتغل بـ 3 مراحل رئيسية. لو فهمت الـ 3 مراحل دول، فهمت أساس كل البرمجة.",
  stages: [
    {
      num: "01",
      name: "Input",
      arabic: "الدخل",
      icon: "⌨️",
      color: "cyan",
      desc: "البيانات أو المعلومات اللي بتدخل للبرنامج — من المستخدم، من ملف، من إنترنت، أو من أي مصدر.",
    },
    {
      num: "02",
      name: "Processing",
      arabic: "المعالجة",
      icon: "⚙️",
      color: "violet",
      desc: "البرنامج بيعالج البيانات — بيقارن، بيحسب، بيحوّل، بيقرر. دي المرحلة اللي فيها كل المنطق.",
    },
    {
      num: "03",
      name: "Output",
      arabic: "الخارج",
      icon: "✓",
      color: "mint",
      desc: "النتيجة النهائية اللي بتظهر للمستخدم — على الشاشة، في ملف، كصوت، أو في أي شكل تاني.",
    },
  ],
  analogies: [
    {
      title: "تشبيه 1: المطعم",
      text: "الطلب اللي بتقوله للجرسون = Input. الشيف اللي بيطبخ = Processing. الطبق اللي بيوصل لك = Output.",
      icon: "🍽️",
    },
    {
      title: "تشبيه 2: الغسالة",
      text: "الهدوم المتوسخة اللي بتحطها = Input. البرنامج اللي بيشغل الماية والصابون = Processing. الهدوم النظيفة = Output.",
      icon: "🧺",
    },
    {
      title: "تشبيه 3: المعلم",
      text: "السؤال اللي الطالب بيسأله = Input. التفكير في الإجابة = Processing. الإجابة اللي بيقولها = Output.",
      icon: "👨‍🏫",
    },
  ],
};

/* ====== Login Example Scene ====== */
export interface CodeToken {
  text: string;
  type: "kw" | "fn" | "str" | "num" | "cm" | "op" | "var" | "bool" | "plain";
}

export interface CodeLine {
  tokens: CodeToken[];
}

export const loginCode: {
  filename: string;
  lang: string;
  lines: CodeLine[];
} = {
  filename: "login_system.py",
  lang: "PYTHON",
  lines: [
    { tokens: [{ text: "# مثال: نظام تسجيل الدخول", type: "cm" }] },
    {
      tokens: [
        { text: "def ", type: "kw" },
        { text: "login", type: "fn" },
        { text: "(", type: "plain" },
        { text: "email", type: "var" },
        { text: ", ", type: "plain" },
        { text: "password", type: "var" },
        { text: "):", type: "plain" },
      ],
    },
    { tokens: [{ text: "    # 1. التأكد من أن الحقول مش فاضية", type: "cm" }] },
    {
      tokens: [
        { text: "    if ", type: "kw" },
        { text: "not ", type: "kw" },
        { text: "email", type: "var" },
        { text: " or ", type: "kw" },
        { text: "not ", type: "kw" },
        { text: "password", type: "var" },
        { text: ":", type: "plain" },
      ],
    },
    {
      tokens: [
        { text: "        return ", type: "kw" },
        { text: '"من فضلك املأ كل الحقول"', type: "str" },
      ],
    },
    { tokens: [{ text: "", type: "plain" }] },
    { tokens: [{ text: "    # 2. التحقق من صحة البيانات", type: "cm" }] },
    {
      tokens: [
        { text: "    if ", type: "kw" },
        { text: "email", type: "var" },
        { text: " == ", type: "op" },
        { text: '"ahmed@code.academy"', type: "str" },
        { text: " and ", type: "kw" },
        { text: "password", type: "var" },
        { text: " == ", type: "op" },
        { text: '"1234"', type: "str" },
        { text: ":", type: "plain" },
      ],
    },
    {
      tokens: [
        { text: "        return ", type: "kw" },
        { text: '"أهلًا يا أحمد! تم تسجيل الدخول ✓"', type: "str" },
      ],
    },
    { tokens: [{ text: "    else", type: "kw" }, { text: ":", type: "plain" }] },
    {
      tokens: [
        { text: "        return ", type: "kw" },
        { text: '"البيانات غير صحيحة ✕"', type: "str" },
      ],
    },
  ],
};

export const terminalLines: {
  type: "prompt" | "out" | "success" | "error";
  text: string;
}[] = [
  { type: "prompt", text: "$ python login_system.py" },
  { type: "out", text: "→ Enter your email: ahmed@code.academy" },
  { type: "out", text: "→ Enter password: ******" },
  { type: "out", text: "→ Checking credentials..." },
  { type: "success", text: "✓ Login successful! Welcome back, Ahmed." },
];

export const loginWalkthrough: {
  eyebrow: string;
  title: string;
  subtitle: string;
  steps: { num: string; title: string; code: string; explanation: string; tip: string }[];
} = {
  eyebrow: "مثال عملي",
  title: "نظام تسجيل الدخول",
  subtitle:
    "خلينا نحلل كل سطر في الكود ده. هنمشي خطوة بخطوة، وهنفهم ليه كل سطر موجود وإيه اللي بيعمله.",
  steps: [
    {
      num: "01",
      title: "تعريف الدالة",
      code: "def login(email, password):",
      explanation:
        "الكلمة def بتقول للكمبيوتر: \"عايز أعمل دالة جديدة اسمها login\". الدالة دي بتاخد حاجتين: email و password. دول الـ inputs بتوعنا.",
      tip: "الدالة زي وصفة طبيخ — بتقول \"دي طريقة عمل حاجة معينة\". كل ما نادّيها، بتنفّذ الخطوات اللي جوّاها.",
    },
    {
      num: "02",
      title: "التأكد من الحقول مش فاضية",
      code: "if not email or not password:",
      explanation:
        "هنا بنسأل: هل email فاضي؟ أو password فاضية؟ لو أي واحد فيهم فاضي، بنطلب من المستخدم يملأ كل الحقول. ده أول خط دفاع — نمنع الأخطاء قبل ما تحصل.",
      tip: "الـ if دي شرط. الكمبيوتر بيتحقق من الشرط، لو صح بينفّذ اللي تحت، لو غلط بيتخطّاه. زي لما ماما تقول: \"لو خلّصت واجبك، هنروح النادي\".",
    },
    {
      num: "03",
      title: "التحقق من البيانات",
      code: 'if email == "ahmed@code.academy" and password == "1234":',
      explanation:
        "هنا بنقارن الـ email اللي المستخدم دخله بالإيميل الصح. وبنقارن الـ password بالباسوورد الصح. لو الاتنين صح، بنسمح بالدخول. الـ and بتقول لازم الاتنين يكونوا صح.",
      tip: "الـ == بتقارن بين حاجتين. الـ and بتقول لازم الشرطين يتحققوا. فيه كمان or (أي واحد منهم) و not (العكس).",
    },
    {
      num: "04",
      title: "النتيجة",
      code: 'return "أهلًا يا أحمد! تم تسجيل الدخول ✓"',
      explanation:
        "return بتقول: \"دي النتيجة النهائية\". لو البيانات كانت صح، بنرجّع رسالة ترحيب. لو كانت غلط (في الـ else)، بنرجّع رسالة خطأ.",
      tip: "الـ return زي ما تقول للجرسون: \"الطلب جه جاهز\". هيطلع من المطبخ (الدالة) ويوصل للزبون (اللي نادى الدالة).",
    },
  ],
};

/* ====== Conditions Scene ====== */
export const conditionsContent: {
  eyebrow: string;
  title: string;
  subtitle: string;
  intro: string;
  examples: { scenario: string; condition: string; result: string; icon: string }[];
  builderTitle: string;
  builderSubtitle: string;
} = {
  eyebrow: "الشروط في البرمجة",
  title: "لو كذا... اعمل كذا",
  subtitle:
    "الحياة كلها شروط. \"لو مطرت، خد شمسية\". \"لو الجو حر، شغّل المكيف\". البرمجة كده برضه — بنستخدم الشروط علشان نخلي البرنامج ياخد قرارات بناءً على مواقف مختلفة.",
  intro:
    "في البرمجة، الشرط عبارة عن سؤال بيجاوب عليه الكمبيوتر بـ \"نعم\" (True) أو \"لا\" (False). بناءً على الإجابة، البرنامج بيمشي في طريق مختلف. ده اللي بيخلي البرامج ذكية ومرونة.",
  examples: [
    {
      scenario: "في تطبيق طقس",
      condition: "if temperature > 30:",
      result: "اعرض رسالة: \"الجو حر — اشرب مية كتير\"",
      icon: "☀️",
    },
    {
      scenario: "في لعبة",
      condition: "if score >= 100:",
      result: "اعرض: \"مبروك! عدت للمرحلة الجاية\"",
      icon: "🎮",
    },
    {
      scenario: "في بنك",
      condition: "if balance < 100:",
      result: "ابعت رسالة: \"رصيدك منخفض\"",
      icon: "🏦",
    },
    {
      scenario: "في موبايل",
      condition: "if battery < 20:",
      result: "فعّل وضع توفير الطاقة",
      icon: "🔋",
    },
  ],
  builderTitle: "ابنع شرط بنفسك",
  builderSubtitle: "اختار عناصر الشرط وشوف النتيجة على اليمين. جرّب تركيبات مختلفة!",
};

/* ====== Programming Errors Scene ====== */
export const errorsContent: {
  eyebrow: string;
  title: string;
  subtitle: string;
  intro: string;
  typesTitle: string;
  types: { name: string; arabic: string; desc: string; example: string; icon: string; color: string }[];
  challengeTitle: string;
  challengeSubtitle: string;
  buggyCode: { line: string; isBug: boolean; explanation: string }[];
} = {
  eyebrow: "أخطاء البرمجة",
  title: "الغلطة جزء من التعلم",
  subtitle:
    "كل مبرمج في العالم — حتى اللي شغالين في Google و Apple — بيكتب كود فيه أخطاء. الأخطاء مش عيب، دي جزء طبيعي من العملية. اللي يفرّق المبرمج الكويس إنه بيعرف يلاقي الأخطاء ويصلّحها.",
  intro:
    "في البرمجة، بنسمّي الأخطاء \"bugs\" (حشرات). اسم غريب صح؟ السبب إن في أول الكمبيوترات، كان فيه حشرة حقيقية وقعت في الجهاز وخليته يشتغل غلط. من ساعتها، أي خطأ في الكود بنقول عليه \"bug\".",
  typesTitle: "أنواع الأخطاء",
  types: [
    {
      name: "Syntax Error",
      arabic: "خطأ كتابي",
      desc: "لما تكتب كلمة غلط أو تنسى فاصلة. الكمبيوتر مش هيفهم الكود أصلاً.",
      example: 'print("Hello"  ← نسيان القوس اللي يقفل',
      icon: "✍️",
      color: "rose",
    },
    {
      name: "Logic Error",
      arabic: "خطأ منطقي",
      desc: "الكود شغّال، بس النتيجة غلط. أصعب نوع لأنه مش بيطلع رسالة خطأ.",
      example: "if email == password:  ← مقارنة غلط",
      icon: "🧩",
      color: "amber",
    },
    {
      name: "Runtime Error",
      arabic: "خطأ وقت التشغيل",
      desc: "الكود بيتوقف في النص لأن حاجة مش متوقعة حصلت.",
      example: "5 / 0  ← القسمة على صفر مستحيلة",
      icon: "💥",
      color: "violet",
    },
  ],
  challengeTitle: "تحدّي: لاقي الغلطة",
  challengeSubtitle: "في الكود ده فيه غلطة. اضغط على السطر اللي حاسس إنه غلط وصلي إزاي هتصلّحه.",
  buggyCode: [
    { line: 'def login(email, password):', isBug: false, explanation: "سليم — تعريف الدالة صح" },
    { line: '    if not email or not password:', isBug: false, explanation: "سليم — التحقق من الحقول الفاضية" },
    { line: '        return "املأ الحقول"', isBug: false, explanation: "سليم — رسالة الخطأ" },
    { line: '    if email == "ahmed@code.academy" or password == "1234":', isBug: true, explanation: "غلطة! استخدمنا or بدل and. ده معناه لو الإيميل صح بس الباسوورد غلط، هيقبل. لازم الاتنين صح." },
    { line: '        return "أهلًا يا أحمد!"', isBug: false, explanation: "سليم — رسالة الترحيب" },
    { line: '    else:', isBug: false, explanation: "سليم — الحالة البديلة" },
    { line: '        return "بيانات غلط"', isBug: false, explanation: "سليم — رسالة الخطأ" },
  ],
};

/* ====== In-class Activity Scene ====== */
export const activityContent: {
  eyebrow: string;
  title: string;
  subtitle: string;
  intro: string;
  steps: { id: string; label: string; emoji: string; order: number }[];
  successMessage: string;
} = {
  eyebrow: "نشاط تفاعلي",
  title: "رتّب خطوات الـ Login",
  subtitle:
    "دلوقتي دورك! حط خطوات نظام تسجيل الدخول في الترتيب الصح. اسحبها ورتّبها، أو استخدم الأسهم. لما تخلص، اضغط \"تحقّق\".",
  intro:
    "النشاط ده بيشبه بالظبط اللي المبرمج بيعمله — يحلّل المشكلة، يقسّمها لخطوات، ويرتّبها منطقيًا. خد وقتك، ولو غلطت متقلقش — جرّب تاني.",
  steps: [
    { id: "read-email", label: "اقرأ الإيميل", emoji: "📧", order: 1 },
    { id: "read-pass", label: "اقرأ كلمة المرور", emoji: "🔑", order: 2 },
    { id: "check-empty", label: "تأكد إن الحقول مش فاضية", emoji: "🔍", order: 3 },
    { id: "validate", label: "تحقّق من صحة البيانات", emoji: "✓", order: 4 },
    { id: "show-result", label: "اعرض النتيجة", emoji: "📢", order: 5 },
  ],
  successMessage: "ممتاز! رتّبت الخطوات بالترتيب المنطقي الصح. ده بالظبط اللي المبرمج بيعمله قبل ما يكتب كود.",
};

/* ====== Summary Scene ====== */
export const summaryContent: {
  eyebrow: string;
  title: string;
  subtitle: string;
  conceptsTitle: string;
  concepts: { num: string; title: string; desc: string; icon: string }[];
} = {
  eyebrow: "خلصت الحصة!",
  title: "إيه اللي اتعلمناه؟",
  subtitle: "خلونا نراجع كل اللي فاتنا. لو فاكر كل النقط دي، أنت جاهز للحصة الجاية!",
  conceptsTitle: "6 مفاهيم أساسية",
  concepts: [
    {
      num: "01",
      title: "البرمجة = طريقة تفكير",
      desc: "مش حفظ أوامر — هي مهارة حل المشاكل بتفكير منطقي منظّم.",
      icon: "🧠",
    },
    {
      num: "02",
      title: "الكمبيوتر محتاج تعليمات واضحة",
      desc: "مش بيفهم النوايا — لازم نقوله كل خطوة بالظبط وبالترتيب.",
      icon: "💬",
    },
    {
      num: "03",
      title: "Input → Processing → Output",
      desc: "أي برنامج بياخد دخل، بيعالجه، بيطلع نتيجة. ده أساس كل شيء.",
      icon: "⚙️",
    },
    {
      num: "04",
      title: "الشروط بتحكم القرارات",
      desc: "if/else بتخلّي البرنامج ياخد قرارات بناءً على مواقف مختلفة.",
      icon: "🔀",
    },
    {
      num: "05",
      title: "الأخطاء طبيعية",
      desc: "كل مبرمج بيكتب كود فيه bugs. المهم إنك تعرف تلاقيها وتصلّحها.",
      icon: "🐛",
    },
    {
      num: "06",
      title: "البرمجة في كل حاجة",
      desc: "من الموبايل للبنك للذكاء الاصطناعي — كل اللي حولينا مبني ببرمجة.",
      icon: "🌍",
    },
  ],
};

/* ====== Skills Scene ====== */
export const skillsContent: {
  eyebrow: string;
  title: string;
  subtitle: string;
  skills: { num: string; title: string; desc: string; icon: string }[];
} = {
  eyebrow: "مهارات بدأنا نبنيها",
  title: "مش بس معلومات — مهارات!",
  subtitle: "الحصة دي مش بس علّمتك معلومات. بدأنا نبني مهارات حقيقية هتفيدك في البرمجة وفي الحياة.",
  skills: [
    { num: "01", title: "التفكير المنظّم", desc: "تقدر تفكّر بشكل مرتّب ومنطقي، مش عشوائي.", icon: "🧩" },
    { num: "02", title: "تحليل المشاكل", desc: "تقدر تشوف مشكلة وتفهمها من كل جوانبها.", icon: "🔍" },
    { num: "03", title: "تقسيم الأفكار لخطوات", desc: "تقدر تاخد فكرة كبيرة وتقسّمها لخطوات صغيرة.", icon: "📐" },
    { num: "04", title: "فهم العلاقة بين السبب والنتيجة", desc: "تعرف ليه حاجة معينة بتحصل، وإيه نتيجتها.", icon: "🔗" },
    { num: "05", title: "بناء حلول منطقية واضحة", desc: "تقدر تبني حل مظبوط من البداية للنهاية.", icon: "🏗️" },
    { num: "06", title: "مراجعة الأخطاء وتصحيحها", desc: "تقدر تشوف غلطة في شغلك وتصلّحها.", icon: "🔧" },
  ],
};

/* ====== Looking Ahead Scene ====== */
export const aheadContent: {
  eyebrow: string;
  title: string;
  subtitle: string;
  nextLesson: { title: string; desc: string; icon: string }[];
  quote: string;
} = {
  eyebrow: "النظرة للمستقبل",
  title: "الحصة الجاية...",
  subtitle: "الحصة دي كانت الأساس. في الحصة الجاية، هننتقل من الفهم النظري للتطبيق العملي — هنبدأ نكتب كود حقيقي.",
  nextLesson: [
    { title: "المتغيرات", desc: "إزاي نخزّن المعلومات في البرنامج", icon: "📦" },
    { title: "أنواع البيانات", desc: "نصوص، أرقام، قوائم — إيه الفرق", icon: "🔢" },
    { title: "أول كود حقيقي", desc: "هنكتب برنامج Python كامل سوا", icon: "🐍" },
  ],
  quote: "كل مبرمج محترف بدأ من نفس النقط اللي إنت واقف فيها النهارده. الفرق بس إنه ماوقفش.",
};

/* ====== Final Word Scene ====== */
export const finalContent = {
  eyebrow: "كلمة أخيرة",
  title: "مبروك! خلّصت أول حصة",
  subtitle: "إنت دلوقتي بدأت رحلتك في عالم البرمجة. اللي اتعلّمته النهارده هو الأساس اللي كل حاجة تانية هتبني عليه.",
  badge: "أول حصة مكتملة",
  finalText: "في Code Academy، إحنا بنؤمن إن البداية الصح للبرمجة مش في حفظ الأوامر، بس في فهم طريقة التفكير. الحصة دي كانت خطوة تأسيسية مهمة. الطالب لازم يبقى فاهم البرمجة كأداة للفهم والتحليل وحل المشاكل، مش مجرد تقنية معقدة.",
  signature: "Ahmed Farhat",
  role: "Code Academy",
  replayCta: "ابدأ الحصة من الأول",
  homeCta: "ارجع للقمة",
};
