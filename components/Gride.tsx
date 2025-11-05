"use client";
import React from "react";
import { BentoGrid, BentoGridItem } from "./ui/BentoGrid";
import { gridItems } from "@/data";
import { motion } from "motion/react";
import { Boxes } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const fadeInUp = {
  start: { y: 30, opacity: 0 },
  end: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7 },
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

function Parallax() {
  const { theme } = useTheme();
  return (
    <section id="grid" className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
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
          <motion.div
            variants={scaleIn}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-4 ${
              theme === "dark"
                ? "bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/20"
                : "bg-gradient-to-r from-green-500/5 to-emerald-500/5 border-green-500/30"
            }`}
          >
            <Boxes className="w-5 h-5 text-green-400" />
            <span className={`text-sm font-medium ${theme === "dark" ? "text-green-400" : "text-green-600"}`}>
              What I Do
            </span>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className={`text-4xl md:text-5xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
          >
            Skills &{" "}
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Expertise
            </span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className={`max-w-2xl mx-auto ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
          >
            A comprehensive overview of my technical skills, development approach, and what drives me as a developer
          </motion.p>
        </motion.div>

        {/* Bento Grid */}
        <BentoGrid>
          {gridItems.map((item) => (
            <BentoGridItem
              id={item.id}
              key={item.id}
              title={item.title}
              description={item.description}
              className={item.className}
              img={item.img}
              imgClassName={item.imgClassName}
              titleClassName={item.titleClassName}
              spareImg={item.spareImg}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}

export default Parallax;
