"use client";
import { projects, projectCategories } from "@/data";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  ExternalLink,
  Github,
  Code2,
  Star,
  Trophy,
  Briefcase,
  Lock,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";

const INITIAL_COUNT = 6;

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
    transition: { staggerChildren: 0.06 },
  },
};

const cardIn = {
  start: { y: 24, opacity: 0 },
  end: { y: 0, opacity: 1, transition: { duration: 0.45 } },
};

// Client work first, then award-winning, then featured, otherwise keep data order
const rank = (p: (typeof projects)[number]) => (p.client ? 0 : p.award ? 1 : p.featured ? 2 : 3);
const orderedProjects = [...projects].sort((a, b) => rank(a) - rank(b));

// A project shows under its main category and under any extra tags (e.g. "Systems")
const inCategory = (p: (typeof projects)[number], category: string) =>
  category === "All" || p.category === category || (p.tags ?? []).includes(category);

const Projects = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [activeCategory, setActiveCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const filteredProjects = orderedProjects.filter((project) => inCategory(project, activeCategory));

  // Only "All" is long enough to need collapsing
  const collapsible = activeCategory === "All" && filteredProjects.length > INITIAL_COUNT;
  const visibleProjects = collapsible && !showAll ? filteredProjects.slice(0, INITIAL_COUNT) : filteredProjects;

  const selectCategory = (category: string) => {
    setActiveCategory(category);
    setShowAll(false);
  };

  const muted = isDark ? "text-gray-400" : "text-gray-600";

  return (
    <section className="py-20 relative overflow-hidden" id="projects">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
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
            isDark ? "bg-blue-500/10 border-blue-500/20" : "bg-blue-500/5 border-blue-500/30"
          }`}>
            <Code2 className="w-5 h-5 text-blue-400" />
            <span className={`text-sm font-medium ${isDark ? "text-blue-400" : "text-blue-600"}`}>
              Featured Work
            </span>
          </div>
          <h2 className={`text-4xl md:text-5xl font-bold mt-4 ${isDark ? "text-white" : "text-gray-900"}`}>
            Recent{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className={`mt-4 max-w-2xl mx-auto ${muted}`}>
            {projects.length} shipped projects — from award-winning full-stack
            platforms to e-commerce stores and booking systems for real clients
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          variants={fadeInUp}
          initial="start"
          whileInView="end"
          viewport={{ once: true }}
          className="flex justify-center mb-10"
        >
          <div
            role="tablist"
            aria-label="Filter projects by category"
            className={`flex flex-wrap justify-center gap-1 p-1.5 backdrop-blur-sm border rounded-3xl sm:rounded-full ${
              isDark ? "bg-gray-900/50 border-gray-700/50" : "bg-white/60 border-gray-300/50 shadow-lg"
            }`}
          >
            {projectCategories.map((category) => {
              const count = projects.filter((p) => inCategory(p, category)).length;
              const active = activeCategory === category;
              return (
                <button
                  key={category}
                  role="tab"
                  aria-selected={active}
                  onClick={() => selectCategory(category)}
                  className={`relative flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                    active
                      ? "text-white"
                      : isDark
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="activeProjectFilter"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/30"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative">
                    {category}
                    <span className="ml-1.5 text-xs opacity-70">{count}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          key={activeCategory}
          variants={staggerContainer}
          initial="start"
          animate="end"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence initial={false}>
            {visibleProjects.map((project) => {
              const [name, kind] = project.title.split(" — ");
              return (
                <motion.article
                  key={project.id}
                  variants={cardIn}
                  initial="start"
                  animate="end"
                  exit={{ opacity: 0, y: 12, transition: { duration: 0.2 } }}
                  whileHover={{ y: -6 }}
                  className={`group relative flex flex-col overflow-hidden rounded-3xl border transition-colors duration-300 ${
                    isDark
                      ? "bg-gray-900/70 border-gray-800 hover:border-blue-500/40"
                      : "bg-white/80 border-slate-300 shadow-lg hover:border-blue-500/50"
                  }`}
                >
                  {/* Screenshot */}
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={project.img}
                      alt={`${name} screenshot`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-15 transition-opacity duration-500`} />

                    <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                      {project.award ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-400/95 text-gray-900 text-[11px] font-semibold shadow-lg">
                          <Trophy className="w-3 h-3" />
                          {project.award}
                        </span>
                      ) : project.featured ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-yellow-300 text-[11px] font-semibold">
                          <Star className="w-3 h-3 fill-yellow-300" />
                          Featured
                        </span>
                      ) : project.client ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[11px] font-semibold">
                          <Briefcase className="w-3 h-3" />
                          Client Project
                        </span>
                      ) : null}
                    </div>
                    <span className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-white text-[11px] font-medium">
                      {project.year}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-6">
                    <p className={`text-xs font-semibold uppercase tracking-wider ${isDark ? "text-blue-400" : "text-blue-600"}`}>
                      {kind ?? project.category}
                    </p>
                    <h3 className={`text-xl font-bold mt-1.5 group-hover:text-blue-400 transition-colors ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}>
                      {name}
                    </h3>
                    <p className={`text-sm leading-relaxed mt-2 line-clamp-3 ${muted}`}>{project.des}</p>

                    {project.iconLists.length > 0 && (
                      <div className="flex items-center gap-2 mt-4">
                        {project.iconLists.map((icon) => (
                          <div
                            key={icon}
                            className={`relative w-8 h-8 rounded-lg border p-1.5 ${
                              isDark ? "bg-gray-800/60 border-gray-700/50" : "bg-slate-800 border-slate-700"
                            }`}
                          >
                            <Image src={icon} alt="" width={20} height={20} className="w-full h-full object-contain" />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Actions */}
                    <div className={`flex items-center gap-3 mt-auto pt-5`}>
                      {project.link ? (
                        <Link
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/btn flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-medium hover:shadow-lg hover:shadow-blue-500/40 transition-shadow"
                        >
                          Live Site
                          <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                        </Link>
                      ) : (
                        <span className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-sm ${
                          isDark ? "border-gray-800 text-gray-500" : "border-slate-200 text-slate-500"
                        }`}>
                          <Lock className="w-4 h-4" />
                          Private Project
                        </span>
                      )}
                      {project.githubLink && (
                        <Link
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${name} source code on GitHub`}
                          className={`inline-flex items-center justify-center p-2.5 rounded-xl border transition-colors ${
                            isDark
                              ? "bg-gray-800/50 border-gray-700/50 text-gray-300 hover:text-white hover:border-blue-500/50"
                              : "bg-slate-50 border-slate-300 text-slate-700 hover:text-slate-900 hover:border-blue-500/50"
                          }`}
                        >
                          <Github className="w-5 h-5" />
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Show more / less */}
        {collapsible && (
          <div className="flex justify-center mt-10">
            <button
              type="button"
              onClick={() => {
                if (showAll) document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                setShowAll((v) => !v);
              }}
              aria-expanded={showAll}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl border font-medium transition-colors ${
                isDark
                  ? "bg-gray-900/60 border-gray-700 text-white hover:border-blue-500/50"
                  : "bg-white/70 border-slate-300 text-slate-900 hover:border-blue-500/50 shadow-lg"
              }`}
            >
              {showAll ? "Show less" : `Show all ${filteredProjects.length} projects`}
              <ChevronDown className={`w-4 h-4 transition-transform ${showAll ? "rotate-180" : ""}`} />
            </button>
          </div>
        )}

        {/* Bottom CTA */}
        <motion.div
          variants={fadeInUp}
          initial="start"
          whileInView="end"
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <p className={`text-sm mb-6 ${muted}`}>
            Want to see more? Check out my GitHub for additional projects and contributions
          </p>
          <Link
            href="https://github.com/omar-farha"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl border hover:border-blue-500/50 transition-all duration-300 group ${
              isDark
                ? "bg-gray-900/50 border-gray-700/50 text-white hover:bg-gray-800/50"
                : "bg-white/50 border-slate-300/50 text-slate-900 hover:bg-slate-100/50 shadow-lg"
            }`}
          >
            <Github className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span>Visit My GitHub</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
