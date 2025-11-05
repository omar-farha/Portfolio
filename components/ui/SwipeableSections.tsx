"use client";
import React, { useState, useEffect } from "react";
import { motion, useAnimation, PanInfo } from "motion/react";

interface SwipeableSectionsProps {
  children: React.ReactNode;
  sections: string[];
}

export const SwipeableSections = ({
  children,
  sections,
}: SwipeableSectionsProps) => {
  const [currentSection, setCurrentSection] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    // Listen for section changes from intersection observer
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          const index = sections.findIndex((s) => s === `#${sectionId}`);
          if (index !== -1) {
            setCurrentSection(index);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5,
      rootMargin: "-20% 0px",
    });

    sections.forEach((section) => {
      const element = document.querySelector(section);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  const handleSwipe = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const swipeThreshold = 50;

    if (Math.abs(info.offset.y) > swipeThreshold) {
      if (info.offset.y < 0 && currentSection < sections.length - 1) {
        // Swipe up - go to next section
        const nextSection = document.querySelector(sections[currentSection + 1]);
        nextSection?.scrollIntoView({ behavior: "smooth" });
      } else if (info.offset.y > 0 && currentSection > 0) {
        // Swipe down - go to previous section
        const prevSection = document.querySelector(sections[currentSection - 1]);
        prevSection?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      {/* Swipe indicator - Mobile only */}
      <motion.div
        className="md:hidden fixed right-4 top-1/2 -translate-y-1/2 z-[4997] flex flex-col gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {sections.map((_, index) => (
          <motion.div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSection
                ? "bg-purple-400 h-8"
                : "bg-gray-600"
            }`}
            onClick={() => {
              const section = document.querySelector(sections[index]);
              section?.scrollIntoView({ behavior: "smooth" });
            }}
          />
        ))}
      </motion.div>

      {/* Swipeable container - Mobile only */}
      <motion.div
        className="md:hidden"
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.1}
        onDragEnd={handleSwipe}
      >
        {children}
      </motion.div>

      {/* Normal container - Desktop */}
      <div className="hidden md:block">{children}</div>
    </>
  );
};
