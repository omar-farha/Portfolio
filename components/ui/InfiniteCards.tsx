"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Quote, Star } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string;
    name: string;
    title: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const { theme } = useTheme();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 w-screen overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-8 py-4 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            className={`group w-[90vw] max-w-full relative rounded-3xl border hover:border-orange-500/50 flex-shrink-0 p-8 md:p-12 md:w-[60vw] transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
              theme === "dark" ? "border-gray-700/50" : "border-gray-300/50"
            }`}
            style={{
              background: theme === "dark"
                ? "linear-gradient(135deg, rgba(4,7,29,0.95) 0%, rgba(12,14,35,0.9) 100%)"
                : "linear-gradient(135deg, rgba(248,250,252,0.95) 0%, rgba(226,232,240,0.9) 100%)",
            }}
            key={idx}
          >
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

            {/* Glow effect */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-orange-500 to-yellow-500 opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500 rounded-3xl" />

            <blockquote className="relative z-10">
              {/* Quote icon */}
              <div className="mb-6 flex items-center justify-between">
                <Quote className="w-10 h-10 text-orange-400/50 group-hover:text-orange-400 transition-colors" />
                {/* Star Rating */}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
              </div>

              {/* Quote text */}
              <p className={`relative z-20 text-base md:text-lg leading-relaxed mb-8 italic ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}>
                "{item.quote}"
              </p>

              {/* Author info */}
              <div className="relative z-20 flex flex-row items-center gap-4">
                {/* Profile image */}
                <div className="relative">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 p-[2px]">
                    <div className={`w-full h-full rounded-full flex items-center justify-center overflow-hidden ${
                      theme === "dark" ? "bg-gray-900" : "bg-white"
                    }`}>
                      <img
                        src="/profile.svg"
                        alt={item.name}
                        className="w-12 h-12 object-cover"
                      />
                    </div>
                  </div>
                  {/* Verified badge */}
                  <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-green-500 border-2 flex items-center justify-center ${
                    theme === "dark" ? "border-gray-900" : "border-white"
                  }`}>
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>

                {/* Name and title */}
                <div className="flex flex-col gap-1">
                  <span className={`text-xl font-bold group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-yellow-400 group-hover:bg-clip-text transition-all ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}>
                    {item.name}
                  </span>
                  <span className={`text-sm font-medium ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                    {item.title}
                  </span>
                </div>
              </div>
            </blockquote>

            {/* Decorative corner */}
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-orange-500/10 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </li>
        ))}
      </ul>
    </div>
  );
};
