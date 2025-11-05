"use client";
import { projects, projectCategories } from "@/data";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  ExternalLink,
  Github,
  Code2,
  Calendar,
  Star,
  Filter,
} from "lucide-react";
import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";

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
    transition: { staggerChildren: 0.12 },
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

const Projects = () => {
  const { theme } = useTheme();
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

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
            theme === "dark"
              ? "bg-blue-500/10 border-blue-500/20"
              : "bg-blue-500/5 border-blue-500/30"
          }`}>
            <Code2 className="w-5 h-5 text-blue-400" />
            <span className={`text-sm font-medium ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`}>
              Featured Work
            </span>
          </div>
          <h2 className={`text-4xl md:text-5xl font-bold mt-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            Recent{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className={`mt-4 max-w-2xl mx-auto ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            A showcase of my recent work - from full-stack applications to
            beautiful landing pages
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          variants={fadeInUp}
          initial="start"
          whileInView="end"
          viewport={{ once: true }}
          className="flex items-center justify-center mb-12"
        >
          <div className={`inline-flex items-center gap-2 p-2 backdrop-blur-sm border rounded-full ${
            theme === "dark"
              ? "bg-gray-900/50 border-gray-700/50"
              : "bg-white/50 border-gray-300/50 shadow-lg"
          }`}>
            <Filter className={`w-4 h-4 ml-2 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
            <div className="flex flex-wrap gap-2">
              {projectCategories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/50"
                      : theme === "dark"
                      ? "text-gray-400 hover:text-white hover:bg-gray-800/50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  {category}
                  {category !== "All" && (
                    <span className="ml-1 text-xs opacity-70">
                      ({projects.filter((p) => p.category === category).length})
                    </span>
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-8"
        >
          <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            Showing{" "}
            <span className={`font-semibold ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`}>
              {filteredProjects.length}
            </span>{" "}
            {filteredProjects.length === 1 ? "project" : "projects"}
          </p>
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={staggerContainer}
            initial="start"
            animate="end"
            exit={{ opacity: 0, scale: 0.9 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={scaleIn}
                layout
                className="group relative"
              >
                <motion.div
                  whileHover={{ y: -12, transition: { duration: 0.4 } }}
                  className={`relative backdrop-blur-sm border rounded-3xl overflow-hidden hover:border-blue-500/50 transition-all duration-500 h-full ${
                    theme === "dark"
                      ? "bg-gradient-to-br from-gray-900/90 to-gray-800/60 border-gray-700/50"
                      : "bg-gradient-to-br from-slate-50/95 to-slate-200/90 border-slate-400/50 shadow-lg"
                  }`}
                >
                  {/* Gradient overlay on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  />

                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-6 left-6 z-20">
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-md border border-yellow-500/30">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        <span className="text-xs font-semibold text-yellow-300">
                          Featured
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Status & Year Badge */}
                  <div className="absolute top-6 right-6 z-20 flex flex-col gap-2">
                    <div className="px-3 py-1.5 rounded-full bg-green-500/20 backdrop-blur-md border border-green-500/30">
                      <span className="text-xs font-semibold text-green-300">
                        {project.status}
                      </span>
                    </div>
                    <div className={`px-3 py-1.5 rounded-full backdrop-blur-md border flex items-center gap-1.5 ${
                      theme === "dark"
                        ? "bg-black/70 border-gray-700/50"
                        : "bg-white/70 border-gray-300/50"
                    }`}>
                      <Calendar className={`w-3 h-3 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
                      <span className={`text-xs font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                        {project.year}
                      </span>
                    </div>
                  </div>

                  {/* Project Image */}
                  <div className="relative h-[300px] md:h-[350px] overflow-hidden">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20`}
                    />
                    <Image
                      src={project.img}
                      alt={project.title}
                      fill
                      className="object-cover object-top group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Overlay gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${
                      theme === "dark"
                        ? "from-gray-900 via-gray-900/50 to-transparent"
                        : "from-slate-200 via-slate-200/50 to-transparent"
                    }`} />
                  </div>

                  {/* Content */}
                  <div className="relative p-8 -mt-20 z-10">
                    {/* Category Badge */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/20 backdrop-blur-md border border-blue-500/30 mb-4">
                      <Code2 className="w-3 h-3 text-blue-400" />
                      <span className={`text-xs font-medium ${theme === "dark" ? "text-blue-300" : "text-blue-600"}`}>
                        {project.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className={`text-2xl md:text-3xl font-bold mb-3 group-hover:text-blue-400 transition-colors ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}>
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className={`text-sm md:text-base leading-relaxed mb-6 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}>
                      {project.des}
                    </p>

                    {/* Tech Stack */}
                    <div className={`flex flex-wrap items-center gap-3 mb-6 pb-6 border-b ${
                      theme === "dark" ? "border-gray-800/50" : "border-slate-300/50"
                    }`}>
                      {project.iconLists.map((icon, idx) => (
                        <div
                          key={idx}
                          className={`relative w-10 h-10 rounded-lg border p-2 group-hover:border-blue-500/30 transition-colors ${
                            theme === "dark"
                              ? "bg-gray-800/50 border-gray-700/50"
                              : "bg-slate-100/50 border-slate-300/50"
                          }`}
                          title={`Technology ${idx + 1}`}
                        >
                          <Image
                            src={icon}
                            alt={`tech-${idx}`}
                            fill
                            className="object-contain p-1"
                          />
                        </div>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-4">
                      <Link
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 group/btn"
                      >
                        <div className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300">
                          <span>Live Demo</span>
                          <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                        </div>
                      </Link>
                      <Link
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn"
                      >
                        <div className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl border hover:border-blue-500/50 transition-all duration-300 ${
                          theme === "dark"
                            ? "bg-gray-800/50 border-gray-700/50 text-gray-300 hover:bg-gray-700/50 hover:text-white"
                            : "bg-slate-100/50 border-slate-300/50 text-slate-700 hover:bg-slate-200/50 hover:text-slate-900"
                        }`}>
                          <Github className="w-5 h-5 group-hover/btn:rotate-12 transition-transform" />
                          <span className="hidden sm:inline">Code</span>
                        </div>
                      </Link>
                    </div>
                  </div>

                  {/* Decorative corner */}
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-blue-500/5 to-transparent rounded-tl-full" />
                </motion.div>

                {/* Glow effect on hover */}
                <div
                  className={`absolute inset-0 -z-10 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-25 blur-2xl transition-opacity duration-500 rounded-3xl`}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full border mb-4 ${
              theme === "dark"
                ? "bg-gray-800/50 border-gray-700/50"
                : "bg-gray-100/50 border-gray-300/50"
            }`}>
              <Code2 className={`w-8 h-8 ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`} />
            </div>
            <h3 className={`text-xl font-semibold mb-2 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              No projects found
            </h3>
            <p className={`text-sm ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>
              Try selecting a different category
            </p>
          </motion.div>
        )}

        {/* Bottom CTA */}
        <motion.div
          variants={fadeInUp}
          initial="start"
          whileInView="end"
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className={`text-sm mb-6 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            Want to see more? Check out my GitHub for additional projects and contributions
          </p>
          <Link
            href="https://github.com/omar-farha"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl border hover:border-blue-500/50 transition-all duration-300 group ${
              theme === "dark"
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
