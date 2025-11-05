"use client";
import React from "react";
import { motion } from "motion/react";
import { timelineExperience } from "@/data";
import {
  Briefcase,
  MapPin,
  Calendar,
  TrendingUp,
  Sparkles,
} from "lucide-react";
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
    },
  },
};

const slideInLeft = {
  start: {
    x: -50,
    opacity: 0,
  },
  end: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
    },
  },
};

const slideInRight = {
  start: {
    x: 50,
    opacity: 0,
  },
  end: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
    },
  },
};

const getColorClasses = (color: string) => {
  const colors: Record<string, any> = {
    purple: {
      gradient: "from-purple-500 to-pink-500",
      glow: "shadow-purple-500/50",
      border: "border-purple-500",
      text: "text-purple-400",
      bg: "bg-purple-500/10",
      borderLight: "border-purple-500/20",
    },
    blue: {
      gradient: "from-blue-500 to-cyan-500",
      glow: "shadow-blue-500/50",
      border: "border-blue-500",
      text: "text-blue-400",
      bg: "bg-blue-500/10",
      borderLight: "border-blue-500/20",
    },
    green: {
      gradient: "from-green-500 to-emerald-500",
      glow: "shadow-green-500/50",
      border: "border-green-500",
      text: "text-green-400",
      bg: "bg-green-500/10",
      borderLight: "border-green-500/20",
    },
    orange: {
      gradient: "from-orange-500 to-red-500",
      glow: "shadow-orange-500/50",
      border: "border-orange-500",
      text: "text-orange-400",
      bg: "bg-orange-500/10",
      borderLight: "border-orange-500/20",
    },
  };
  return colors[color] || colors.purple;
};

const Experience = () => {
  const { theme } = useTheme();

  return (
    <section className="py-20 relative overflow-hidden" id="experience">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          variants={fadeInUp}
          initial="start"
          whileInView="end"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-4 ${
            theme === "dark"
              ? "bg-blue-500/10 border-blue-500/20"
              : "bg-blue-500/5 border-blue-500/30"
          }`}>
            <Briefcase className="w-5 h-5 text-blue-400" />
            <span className={`text-sm font-medium ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`}>
              Career Journey
            </span>
          </div>
          <h2 className={`text-4xl md:text-5xl font-bold mt-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            Professional{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          <p className={`mt-4 max-w-2xl mx-auto ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            A timeline of my growth, achievements, and contributions in the world
            of frontend development
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-6xl mx-auto">
          {/* Vertical line - Desktop */}
          <div className={`hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-transparent to-transparent ${
            theme === "dark" ? "via-gray-700" : "via-gray-300"
          }`} />

          {/* Timeline Items */}
          <div className="space-y-12 lg:space-y-24">
            {timelineExperience.map((exp, index) => {
              const isEven = index % 2 === 0;
              const colors = getColorClasses(exp.color);

              return (
                <motion.div
                  key={exp.id}
                  variants={isEven ? slideInLeft : slideInRight}
                  initial="start"
                  whileInView="end"
                  viewport={{ once: true, amount: 0.3 }}
                  className={`relative flex flex-col lg:flex-row items-center gap-8 ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Content Card */}
                  <div className="w-full lg:w-5/12">
                    <motion.div
                      whileHover={{ scale: 1.02, y: -5 }}
                      className={`relative backdrop-blur-sm border ${colors.borderLight} rounded-2xl p-6 lg:p-8 group hover:border-opacity-100 transition-all duration-300 ${
                        theme === "dark"
                          ? "bg-gradient-to-br from-gray-900/80 to-gray-800/50"
                          : "bg-gradient-to-br from-slate-50/95 to-slate-200/90 border-slate-400/50 shadow-lg"
                      }`}
                    >
                      {/* Gradient glow effect */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`}
                      />

                      {/* Year Badge */}
                      <div
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${colors.bg} border ${colors.borderLight} mb-4`}
                      >
                        <Calendar className={`w-4 h-4 ${colors.text}`} />
                        <span className={`text-sm font-bold ${colors.text}`}>
                          {exp.year}
                        </span>
                      </div>

                      {/* Job Title */}
                      <h3 className={`text-2xl font-bold mb-2 group-hover:text-purple-400 transition-colors ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}>
                        {exp.title}
                      </h3>

                      {/* Company & Location */}
                      <div className="flex flex-wrap items-center gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <Briefcase className={`w-4 h-4 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
                          <span className={`font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                            {exp.company}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className={`w-4 h-4 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
                          <span className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                            {exp.location}
                          </span>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full ${colors.bg} ${colors.text} text-xs font-medium`}
                        >
                          {exp.type}
                        </span>
                      </div>

                      {/* Description */}
                      <p className={`text-sm leading-relaxed mb-6 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                        {exp.description}
                      </p>

                      {/* Achievements */}
                      <div className="space-y-3 mb-6">
                        <div className={`flex items-center gap-2 text-sm font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                          <TrendingUp className={`w-4 h-4 ${colors.text}`} />
                          <span>Key Achievements</span>
                        </div>
                        <ul className="space-y-2">
                          {exp.achievements.map((achievement, idx) => (
                            <li
                              key={idx}
                              className={`flex items-start gap-2 text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
                            >
                              <Sparkles
                                className={`w-4 h-4 ${colors.text} mt-0.5 flex-shrink-0`}
                              />
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className={`px-3 py-1 rounded-lg border text-xs hover:border-purple-500/50 transition-colors ${
                              theme === "dark"
                                ? "bg-gray-800/50 border-gray-700/50 text-gray-300"
                                : "bg-gray-100/50 border-gray-300/50 text-gray-700"
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Corner decorations */}
                      <div
                        className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${colors.gradient} opacity-5 rounded-bl-full`}
                      />
                    </motion.div>
                  </div>

                  {/* Center Timeline Node */}
                  <div className="hidden lg:flex w-2/12 justify-center relative z-10">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 180 }}
                      className={`w-20 h-20 rounded-full bg-gradient-to-br ${colors.gradient} p-1 shadow-lg ${colors.glow}`}
                    >
                      <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                        <div
                          className={`w-12 h-12 rounded-full bg-gradient-to-br ${colors.gradient} flex items-center justify-center`}
                        >
                          <Briefcase className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden lg:block w-5/12" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom note */}
        <motion.div
          variants={fadeInUp}
          initial="start"
          whileInView="end"
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <span className="text-gray-300">
              Building amazing web experiences since 2021
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
