# 🚀 Code Academy — Lesson 01: From Giant Computers to Modern Apps

تجربة ويب تفاعلية كاملة للحصة الأولى من كورس برمجة لطلاب 16 سنة.
**Introduction to Programming & Computational Thinking** — رحلة سينمائية تفاعلية بدون خلفية برمجية مطلوبة.

## 🎬 الميزات الرئيسية

- **12 مشهد تفاعلي** بـ scroll-driven cinematic animations
- **5 فواصل سينمائية** (Chapter Dividers) بين الفصول
- **6 لحظات "آها!"** (Aha Moments) — insights سينمائية بعد كل تفاعل ناجح
- **تصميم صوتي محيطي** (procedural ambient drones) — 6 أجواء مختلفة حسب الـ scroll
- **8 أنواع تفاعلات**: quizzes, drag & drop, code playground, debug challenge, live condition builder, IPO demo
- **Animated SVG diagrams** — IPO diagram بـ glowing orb متحرك
- **Code diff comparisons** — before/after side-by-side
- **Apple-tier aesthetic** — solid black + accent blue + glass cards + Lenis smooth scroll
- **متجاوب 100%** على mobile/tablet/desktop

## 🛠️ التقنيات

| التقنية | الاستخدام |
|---------|-----------|
| Next.js 16 | إطار العمل (App Router) |
| TypeScript | اللغة |
| Tailwind CSS 4 | التصميم |
| Framer Motion | الأنيميشن + scroll-driven |
| @dnd-kit | السحب والإفلات |
| Zustand | إدارة الحالة (aha moments + audio) |
| Lenis | Smooth scroll |
| Web Audio API | المؤثرات الصوتية (procedural) |
| Cairo + Tajawal + JetBrains Mono | الخطوط |

## 📦 التشغيل محليًا

```bash
npm install
npm run dev
# افتح المتصفح: http://localhost:3000
```

## 🎬 المشاهد الـ 12

1. **Hero** — Cinematic intro + magnetic button
2. **Intro/Welcome** — مقدمة + 5 أهداف + quiz تفاعلي
3. **What is Programming?** — 5 خطوات تفاعلية + IPO Live Demo + Interactive Login Demo
4. **Computing Timeline** — 5 مراحل تاريخية قابلة للفتح
5. **Login Walkthrough** — شرح تفصيلي لكل سطر كود
6. **Conditions** — if/else builder تفاعلي بـ sliders + split-screen
7. **Programming Errors** — 3 أنواع أخطاء + debug challenge + code diff
8. **In-class Activity** — drag & drop لترتيب 5 خطوات
9. **Summary** — 6 مفاهيم
10. **Skills** — 6 مهارات
11. **Looking Ahead** — الحصة الجاية + quote
12. **Final Word** — شارة "أول حصة مكتملة" + خاتمة

## ☁️ النشر على Vercel

1. ارفع الكود على GitHub
2. اذهب إلى [vercel.com](https://vercel.com) → Sign Up with GitHub
3. Add New Project → Import الـ repo
4. Vercel هيتكشف تلقائيًا كـ Next.js → Deploy 🎉

## 📁 بنية المشروع

```
src/
├── app/
│   ├── layout.tsx           # RTL + خطوط Cairo/Tajawal/JetBrains
│   ├── page.tsx             # Main coordinator
│   └── globals.css          # Apple-tier dark design tokens
├── lib/
│   ├── content/teen-lesson-1.ts   # كل المحتوى التعليمي
│   ├── store/lesson-store.ts      # Zustand (aha + audio)
│   ├── motion.ts                  # Framer Motion variants
│   └── audio.ts                   # SFX procedural
└── components/teen/
    ├── SmoothScroll.tsx           # Lenis
    ├── ScrollProgress.tsx         # Top progress bar
    ├── ChapterDivider.tsx         # Cinematic chapter transitions
    ├── AhaMoment.tsx              # Insight overlay
    ├── AmbientAudioManager.tsx    # Procedural ambient sound
    ├── AudioControl.tsx           # Floating mute/volume
    ├── backgrounds/
    ├── ui/                        # CodeBlock, Terminal, ConceptCard, etc.
    └── scenes/                    # 12 scenes
```

## 🎓 المحتوى التعليمي

كل النصوص في ملف واحد سهل التعديل: `src/lib/content/teen-lesson-1.ts`

## 📄 الترخيص

MIT License — استخدم بحرية لأغراض تعليمية.

---

صنع بـ ❤️ لـ Code Academy · Instructor: Ahmed Farhat
