"use client";
import Image from "next/image";
import React from "react";
import omar from "@/public/omar.jpg";
import { BriefcaseBusiness, GraduationCap, User } from "lucide-react";
import js from "@/public/js.png";
import ts from "@/public/typescript.png";
import tailwind from "@/public/Tailwind CSS.png";
import react from "@/public/React.png";
import redux from "@/public/Redux.png";
import next from "@/public/icons8-nextjs-48.png";
import git from "@/public/Git.png";
import { motion } from "framer-motion";
import { TextAnimate } from "./magicui/text-animate";

const fadeInUp = {
  start: { y: 30, opacity: 0 },
  end: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, delay: 0.2 },
  },
};

const fadeInRight = {
  start: { x: -30, opacity: 0 },
  end: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.7 },
  },
};

const staggerContainer = {
  start: {},
  end: {
    transition: { staggerChildren: 0.1 },
  },
};

function AboutMe() {
  return (
    <section
      id="about"
      className="scroll-mt-20 bg-gradient-to-b pt-36 lg:pt-20 pb-16"
    >
      <div className="container mx-auto px-4 mt-16  ">
        {/* Header Section */}
        <motion.div
          initial="start"
          whileInView="end"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.h4
            variants={fadeInUp}
            initial="start"
            whileInView="end"
            viewport={{ once: true }}
            className="text-lg text-purple-400 mb-2"
          >
            Introduction
          </motion.h4>
          <motion.h2
            variants={fadeInUp}
            initial="start"
            whileInView="end"
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white"
          >
            About Me
          </motion.h2>
        </motion.div>

        {/* Content Section */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Profile Image */}
          <motion.div
            variants={fadeInRight}
            initial="start"
            whileInView="end"
            viewport={{ once: true }}
            className="w-full max-w-xs sm:max-w-sm mx-auto lg:mx-0"
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden border-4  border-white/[0.1] shadow-lg">
              <Image
                src={omar}
                alt="Omar"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </motion.div>

          {/* Text Content */}
          <div className="flex-1">
            {/* Bio */}
            <TextAnimate
              duration={2.3}
              animation="slideUp"
              by="word"
              className="mb-10 text-lg text-gray-300 leading-relaxed"
            >
              I&apos;m a passionate frontend developer with a focus on creating
              responsive, user-friendly websites and web applications. I enjoy
              turning ideas into clean, functional designs that offer a smooth
              and intuitive user experience. With a strong understanding of
              modern web practices and a commitment to continuous learning, I
              strive to deliver high-quality digital solutions that balance both
              visual appeal and performance.
            </TextAnimate>

            {/* Stats Cards */}
            <motion.ul
              variants={staggerContainer}
              initial="start"
              whileInView="end"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12"
            >
              {[
                {
                  icon: <GraduationCap size={30} className="text-purple-400" />,
                  title: "Education",
                  text: "Meta Front-End Developer",
                },
                {
                  icon: <User size={30} className="text-purple-400" />,
                  title: "Clients",
                  text: "12+ happy clients",
                },
                {
                  icon: (
                    <BriefcaseBusiness size={30} className="text-purple-400" />
                  ),
                  title: "Projects",
                  text: "30+ completed",
                },
              ].map((item, index) => (
                <motion.li
                  key={index}
                  variants={fadeInUp}
                  className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-5 hover:bg-gray-700/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-3">{item.icon}</div>
                    <h3 className="text-white font-medium mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-300">{item.text}</p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>

            {/* Skills Section */}
            <div className="space-y-4">
              <motion.h4
                variants={fadeInUp}
                initial="start"
                whileInView="end"
                viewport={{ once: true }}
                className="text-xl font-semibold text-white"
              >
                My Tech Stack
              </motion.h4>

              <motion.ul
                variants={staggerContainer}
                initial="start"
                whileInView="end"
                viewport={{ once: true }}
                className="flex flex-wrap gap-3"
              >
                {[
                  { src: js, alt: "JavaScript" },
                  { src: ts, alt: "TypeScript" },
                  { src: tailwind, alt: "Tailwind CSS" },
                  { src: react, alt: "React" },
                  { src: redux, alt: "Redux" },
                  { src: next, alt: "Next.js" },
                  { src: git, alt: "Git" },
                ].map((skill, index) => (
                  <motion.li
                    key={index}
                    variants={fadeInUp}
                    className="flex items-center justify-center w-14 h-14 bg-gray-800 rounded-lg border border-gray-700 hover:bg-blue-900/20 hover:border-blue-400 transition-all duration-300 hover:scale-110"
                    whileHover={{ y: -5 }}
                  >
                    <Image
                      src={skill.src}
                      alt={skill.alt}
                      width={28}
                      height={28}
                      className="object-contain"
                    />
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
