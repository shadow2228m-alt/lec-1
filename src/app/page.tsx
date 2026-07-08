"use client";

import { useEffect, useCallback } from "react";
import { HeroScene } from "@/components/teen/scenes/HeroScene";
import { IntroScene } from "@/components/teen/scenes/IntroScene";
import { WhatIsScene } from "@/components/teen/scenes/WhatIsScene";
import { TimelineScene } from "@/components/teen/scenes/TimelineScene";
import { LoginWalkthroughScene } from "@/components/teen/scenes/LoginWalkthroughScene";
import { ConditionsScene } from "@/components/teen/scenes/ConditionsScene";
import { ErrorsScene } from "@/components/teen/scenes/ErrorsScene";
import { ActivityScene } from "@/components/teen/scenes/ActivityScene";
import { SummaryScene, SkillsScene, AheadScene, FinalScene } from "@/components/teen/scenes/ClosingScenes";
import { SmoothScroll } from "@/components/teen/SmoothScroll";
import { ScrollProgress } from "@/components/teen/ScrollProgress";
import { ChapterDivider } from "@/components/teen/ChapterDivider";
import { AhaMoment } from "@/components/teen/AhaMoment";
import { AmbientAudioManager } from "@/components/teen/AmbientAudioManager";
import { AudioControl } from "@/components/teen/AudioControl";
import { chapters } from "@/lib/content/teen-lesson-1";
import { useAudioPrimer, playSound } from "@/lib/audio";

export default function Home() {
  useAudioPrimer();

  const scrollToNext = useCallback(() => {
    playSound("whoosh");
    document.getElementById("intro")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const replay = useCallback(() => {
    playSound("whoosh");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" && e.altKey) {
        e.preventDefault();
        scrollToNext();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [scrollToNext]);

  // Helper to find chapter by scene id
  const getChapter = (sceneId: string) => chapters.find((c) => c.beforeScene === sceneId);

  return (
    <SmoothScroll>
      <ScrollProgress />
      <AudioControl />
      <AmbientAudioManager />
      <AhaMoment />
      <main className="relative min-h-screen">
        <HeroScene onStart={scrollToNext} />

        {getChapter("intro") && <ChapterDivider chapter={getChapter("intro")!} />}
        <IntroScene />

        {getChapter("what-is") && <ChapterDivider chapter={getChapter("what-is")!} />}
        <WhatIsScene />

        {getChapter("timeline") && <ChapterDivider chapter={getChapter("timeline")!} />}
        <TimelineScene />

        <LoginWalkthroughScene />

        {getChapter("conditions") && <ChapterDivider chapter={getChapter("conditions")!} />}
        <ConditionsScene />

        <ErrorsScene />
        <ActivityScene />

        {getChapter("summary") && <ChapterDivider chapter={getChapter("summary")!} />}
        <SummaryScene />
        <SkillsScene />
        <AheadScene />
        <FinalScene onReplay={replay} />
      </main>
    </SmoothScroll>
  );
}
