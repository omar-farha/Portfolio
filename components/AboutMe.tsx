"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import omar from "@/public/omar.jpg";
import {
  User,
  Download,
  GraduationCap,
  Briefcase,
  Award,
} from "lucide-react";
import js from "@/public/js.png";
import ts from "@/public/typescript.png";
import tailwind from "@/public/Tailwind CSS.png";
import react from "@/public/React.png";
import redux from "@/public/Redux.png";
import next from "@/public/icons8-nextjs-48.png";
import git from "@/public/Git.png";
import { motion } from "motion/react";
import { useTheme } from "@/contexts/ThemeContext";
import { projects, certifications, competitions } from "@/data";

const fadeInUp = {
  start: { y: 30, opacity: 0 },
  end: {
    y: 0,
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

const scaleIn = {
  start: { scale: 0.9, opacity: 0 },
  end: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const startTime = Date.now();
          const animate = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(easeOutQuart * end));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          animate();
        }
      },
      { threshold: 0.5 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return <div ref={countRef}>{count}{suffix}</div>;
};

function AboutMe() {
  const { theme } = useTheme();

  const stats = [
    {
      icon: <Briefcase className="w-5 h-5" />,
      title: "Gold Medals",
      count: competitions.filter((c) => c.place === 1).length,
      suffix: "",
      color: "from-purple-500 to-pink-500",
      iconBg: "bg-purple-500/10",
      iconColor: "text-purple-400",
    },
    {
      icon: <Award className="w-5 h-5" />,
      title: "Projects Built",
      count: projects.length,
      suffix: "",
      color: "from-blue-500 to-cyan-500",
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-400",
    },
    {
      icon: <GraduationCap className="w-5 h-5" />,
      title: "Certifications",
      count: certifications.length,
      suffix: "",
      color: "from-green-500 to-emerald-500",
      iconBg: "bg-green-500/10",
      iconColor: "text-green-400",
    },
  ];

  const techStack = [
    { src: js, alt: "JavaScript", name: "JavaScript" },
    { src: ts, alt: "TypeScript", name: "TypeScript" },
    { src: react, alt: "React", name: "React" },
    { src: next, alt: "Next.js", name: "Next.js" },
    { src: tailwind, alt: "Tailwind CSS", name: "Tailwind" },
    { src: redux, alt: "Redux", name: "Redux" },
    { src: git, alt: "Git", name: "Git" },
  ];

  const highlights = [
    "Full-Stack web applications with Next.js & Supabase",
    "Responsive & mobile-first design principles",
    "Modern React patterns & performance optimization",
    "Teaching & mentoring aspiring developers",
  ];

  return (
    <section
      id="about"
      className="scroll-mt-20 py-20 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          variants={fadeInUp}
          initial="start"
          whileInView="end"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-4 ${
            theme === "dark"
              ? "bg-purple-500/10 border-purple-500/20"
              : "bg-purple-500/5 border-purple-500/30"
          }`}>
            <User className="w-5 h-5 text-purple-400" />
            <span className={`text-sm font-medium ${theme === "dark" ? "text-purple-400" : "text-purple-600"}`}>
              Get to Know Me
            </span>
          </div>
          <h2 className={`text-4xl md:text-5xl font-bold mt-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            About{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Me
            </span>
          </h2>
          <p className={`mt-4 max-w-2xl mx-auto ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            Full-Stack Developer & Educator building impactful digital solutions
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          {/* Profile Card */}
          <motion.div
            variants={fadeInUp}
            initial="start"
            whileInView="end"
            viewport={{ once: true }}
            className={`relative border-2 rounded-3xl overflow-hidden mb-8 ${
              theme === "dark"
                ? "bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700/60 shadow-xl shadow-black/50"
                : "bg-gradient-to-br from-white to-slate-50 border-slate-300/60 shadow-xl shadow-slate-300/50"
            }`}
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 opacity-[0.03]" />

            <div className="relative z-10 grid grid-cols-[88px_1fr] sm:flex sm:flex-col lg:flex-row items-center sm:items-stretch gap-x-4 gap-y-4 sm:gap-6 lg:gap-8 p-5 sm:p-8">
              {/* Profile Image */}
              <div className="flex-shrink-0 sm:mx-auto lg:mx-0 row-span-1">
                <div className={`relative w-[88px] h-[110px] sm:w-[280px] sm:h-[350px] rounded-xl sm:rounded-2xl overflow-hidden border-2 ${
                  theme === "dark" ? "border-gray-700/60" : "border-slate-300/60"
                }`}>
                  <Image
                    src={omar}
                    alt="Omar Farha"
                    fill
                    className="object-cover"
                    sizes="280px"
                    priority
                  />
                </div>
              </div>

              {/* Bio & Info */}
              <div className="contents sm:block sm:flex-1 sm:space-y-6 sm:text-center lg:text-left">
                <div className="min-w-0">
                  <h3 className={`text-xl sm:text-2xl font-bold mb-1 sm:mb-3 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    Omar Farha
                  </h3>
                  <p className={`text-sm sm:text-lg font-semibold sm:mb-4 ${theme === "dark" ? "text-purple-400" : "text-purple-600"}`}>
                    Full-Stack Developer & Educator
                  </p>
                  <p className={`hidden sm:block leading-relaxed mb-4 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                    Passionate developer specializing in modern web technologies. I create responsive, user-centric applications while teaching the next generation of developers. Currently building full-stack solutions with Next.js and empowering 30+ students to start their coding journey.
                  </p>
                </div>

                {/* Short bio — mobile only */}
                <p className={`sm:hidden col-span-2 text-sm leading-relaxed ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                  Building full-stack web apps with Next.js and teaching 30+ students to start coding.
                </p>

                {/* Highlights */}
                <div className="hidden sm:grid sm:grid-cols-2 gap-3 text-left max-w-md mx-auto lg:max-w-none lg:mx-0">
                  {highlights.map((highlight, index) => (
                    <div
                      key={index}
                      className={`flex items-start gap-2 text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 mt-1.5 flex-shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* Download Resume Button */}
                <a
                  href="/Final-CV-Omar.pdf"
                  download
                  className={`col-span-2 justify-center sm:justify-start inline-flex items-center gap-2 whitespace-nowrap px-6 py-3 rounded-xl border-2 font-semibold transition-all duration-300 hover:scale-105 ${
                    theme === "dark"
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 border-purple-500 text-white shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70"
                      : "bg-gradient-to-r from-purple-500 to-pink-500 border-purple-500 text-white shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70"
                  }`}
                >
                  <Download className="w-5 h-5" />
                  <span>Download Resume</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            variants={staggerContainer}
            initial="start"
            whileInView="end"
            viewport={{ once: true }}
            className="grid grid-cols-3 gap-3 sm:gap-4 mb-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`relative border-2 rounded-2xl p-3 sm:p-6 transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700/60 hover:border-purple-500/60 shadow-xl shadow-black/50"
                    : "bg-gradient-to-br from-white to-slate-50 border-slate-300/60 hover:border-purple-500/60 shadow-lg"
                }`}
              >
                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
                  <div className={`p-2.5 sm:p-3 rounded-xl ${stat.iconBg} ${stat.iconColor}`}>
                    {stat.icon}
                  </div>
                  <div>
                    <p className={`text-xs sm:text-sm font-medium mb-1 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                      {stat.title}
                    </p>
                    <div className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                      <AnimatedCounter end={stat.count} suffix={stat.suffix} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            variants={fadeInUp}
            initial="start"
            whileInView="end"
            viewport={{ once: true }}
            className={`relative border-2 rounded-3xl p-5 sm:p-8 ${
              theme === "dark"
                ? "bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700/60 shadow-xl shadow-black/50"
                : "bg-gradient-to-br from-white to-slate-50 border-slate-300/60 shadow-xl shadow-slate-300/50"
            }`}
          >
            <div className="text-center mb-8">
              <h3 className={`text-2xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                Tech Stack
              </h3>
              <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                Technologies I work with daily
              </p>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="start"
              whileInView="end"
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-3 sm:grid sm:grid-cols-7 sm:gap-4"
            >
              {techStack.map((tech, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  whileHover={{ y: -8, scale: 1.1 }}
                  className={`group relative w-14 sm:w-auto aspect-square rounded-xl border-2 transition-all duration-300 cursor-pointer p-3 sm:p-4 flex items-center justify-center ${
                    theme === "dark"
                      ? "bg-gray-800 border-gray-700/60 hover:border-purple-500/60"
                      : "bg-white border-slate-300/60 hover:border-purple-500/60 shadow"
                  }`}
                >
                  <Image
                    src={tech.src}
                    alt={tech.alt}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                  {/* Tooltip */}
                  <div className={`absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg border text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg z-10 ${
                    theme === "dark"
                      ? "bg-gray-900 border-gray-700 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}>
                    {tech.name}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
