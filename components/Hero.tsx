"use client";
import React from "react";
import { cn } from "@/lib/utils";

import { Spotlight } from "./ui/Spotlight";
import { TextAnimate } from "./magicui/text-animate";
import MagicButton from "./ui/MagicButton";
import { motion } from "motion/react";
import { Send } from "lucide-react";

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

const Hero = () => {
  return (
    <div className="pb-20 pt-36">
      <div>
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="white"
        />
        <Spotlight
          className="top-10 left-full h-[80vh] w-[50vw]"
          fill="purple"
        />
        <Spotlight className="top-28 left-80  h-[80vh] w-[50vw]" fill="blue" />
      </div>
      {/* ############# */}
      <div className=" absolute top-0 left-0 flex h-screen w-full items-center justify-center bg-white dark:bg-[#000319]">
        <div
          className={cn(
            "absolute inset-0",
            "[background-size:60px_60px]",
            "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
            "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
          )}
        />
        {/* Radial gradient for the container to give a faded look */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-[#000319]"></div>
      </div>
      {/* ############# */}
      <div className="flex justify-center relative my-20 z-10">
        <div className="max-w-[86vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center ">
          <motion.h2
            variants={fadeIn}
            initial="start"
            whileInView="end"
            viewport={{ once: true }}
            className=" uppercase tracking-widest text-xs text-center text-blue-100 max-w-80"
          >
            Designing Stunning Digital Interfaces
          </motion.h2>
          <TextAnimate
            duration={0.9}
            delay={0.5}
            animation="slideUp"
            by="word"
            className="text-center text-[40px] md:text-5xl lg:text-6xl text-white my-4 leading-snug tracking-wide"
          >
            Turning Ideas into Smooth and Impactful User Experiences
          </TextAnimate>
          <motion.p
            variants={fadeInUp}
            initial="start"
            whileInView="end"
            viewport={{ once: true }}
            className="text-center md:tracking-wider my-6 sm:my-4 text-sm md:text-lg lg:text-2xl text-white"
          >
            Hi!{" "}
            <span className="text-purple-400 leading-snug tracking-wide">
              I&apos;m Omar{" "}
            </span>
            , a Frontend developer based in Egypt.
          </motion.p>
          <motion.a
            variants={fadeIn2}
            initial="start"
            whileInView="end"
            viewport={{ once: true }}
            href="#about"
          >
            <MagicButton
              title="Show my work"
              icon={<Send size={17} />}
              position="right"
            />
          </motion.a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
