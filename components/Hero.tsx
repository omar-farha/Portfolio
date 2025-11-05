"use client";
import React from "react";
import { cn } from "@/lib/utils";

import { Spotlight } from "./ui/Spotlight";
import { TextAnimate } from "./magicui/text-animate";
import MagicButton from "./ui/MagicButton";
import { motion, useScroll, useTransform } from "motion/react";
import { Send, Sparkles, ArrowDown } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const fadeInUp = {
  start: {
    y: 30,
    opacity: 0,
  },
  end: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      delay: 1.5,
    },
  },
};
const fadeIn = {
  start: {
    opacity: 0,
  },
  end: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};
const fadeIn2 = {
  start: {
    opacity: 0,
  },
  end: {
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 1.9,
    },
  },
};

const scaleIn = {
  start: {
    scale: 0.8,
    opacity: 0,
  },
  end: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.7,
      delay: 0.3,
    },
  },
};

const Hero = () => {
  const { scrollYProgress } = useScroll();
  const { theme } = useTheme();

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <section className="pb-20 pt-36" aria-label="Hero section">
      {/* Spotlight Effects */}
      <div aria-hidden="true">
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="white"
        />
        <Spotlight
          className="top-10 left-full h-[80vh] w-[50vw]"
          fill="purple"
        />
        <Spotlight className="top-28 left-80 h-[80vh] w-[50vw]" fill="blue" />
      </div>

      {/* Background Grid Pattern */}
      <motion.div
        style={{ y }}
        className={`absolute top-0 left-0 flex h-screen w-full items-center justify-center ${theme === "dark" ? "bg-[#000319]" : "bg-[#E2E8F0]"}`}
        aria-hidden="true"
      >
        <div
          className={cn(
            "absolute inset-0",
            "[background-size:60px_60px]",
            theme === "dark"
              ? "[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
              : "[background-image:linear-gradient(to_right,#CBD5E1_1px,transparent_1px),linear-gradient(to_bottom,#CBD5E1_1px,transparent_1px)]"
          )}
        />
        {/* Radial gradient for the container to give a faded look */}
        <div className={`pointer-events-none absolute inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] ${theme === "dark" ? "bg-[#000319]" : "bg-[#E2E8F0]"}`}></div>
      </motion.div>

      {/* Hero Content */}
      <motion.div
        style={{ opacity, scale }}
        className="flex justify-center relative my-20 z-10"
      >
        <div className="max-w-[90vw] md:max-w-3xl lg:max-w-[65vw] flex flex-col items-center justify-center">
          {/* Badge */}
          <motion.div
            variants={scaleIn}
            initial="start"
            whileInView="end"
            viewport={{ once: true }}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm mb-6 ${
              theme === "dark"
                ? "bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20"
                : "bg-gradient-to-r from-purple-500/5 to-blue-500/5 border border-purple-500/30"
            }`}
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className={`text-sm font-medium tracking-wide ${theme === "dark" ? "text-purple-300" : "text-purple-600"}`}>
              Welcome to my digital space
            </span>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={fadeIn}
            initial="start"
            whileInView="end"
            viewport={{ once: true }}
            className={`uppercase tracking-[0.3em] text-xs text-center max-w-md mb-2 ${theme === "dark" ? "text-blue-100/80" : "text-blue-600/80"}`}
          >
            Frontend Developer & UI Enthusiast
          </motion.p>

          {/* Main Heading */}
          <h1 className={`text-center text-[40px] md:text-6xl lg:text-7xl font-bold my-6 leading-[1.1] tracking-tight ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            <TextAnimate
              duration={0.9}
              delay={0.5}
              animation="slideUp"
              by="word"
            >
              Turning Ideas into Smooth and Impactful User Experiences
            </TextAnimate>
          </h1>

          {/* Description */}
          <motion.p
            variants={fadeInUp}
            initial="start"
            whileInView="end"
            viewport={{ once: true }}
            className={`text-center md:tracking-wide my-6 text-base md:text-xl lg:text-2xl max-w-3xl ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
          >
            Hi! I&apos;m{" "}
            <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text font-semibold">
              Omar Farha
            </span>
            , a passionate Frontend developer crafting beautiful web experiences
            from{" "}
            <span className="text-blue-400 font-medium">Egypt</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeIn2}
            initial="start"
            whileInView="end"
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center gap-4 mt-4"
          >
            <a href="#projects" className="inline-block">
              <MagicButton
                title="View My Work"
                icon={<Send size={17} />}
                position="right"
              />
            </a>
            <a
              href="#contact"
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg border backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300 group ${
                theme === "dark"
                  ? "border-gray-700/50 bg-gray-900/50 text-white hover:bg-gray-800/50"
                  : "border-gray-300 bg-white/50 text-gray-900 hover:bg-gray-100"
              }`}
            >
              <span>Get in Touch</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeIn2}
            initial="start"
            whileInView="end"
            viewport={{ once: true }}
            className={`flex flex-wrap items-center justify-center gap-8 mt-16 pt-8 border-t ${theme === "dark" ? "border-gray-800/50" : "border-gray-300/50"}`}
          >
            {[
              { label: "Years Experience", value: "3+" },
              { label: "Projects Completed", value: "30+" },
              { label: "Happy Clients", value: "12+" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text mb-1">
                  {stat.value}
                </div>
                <div className={`text-xs md:text-sm tracking-wide ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
