"use client";
import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { CanvasRevealEffect } from "./ui/CanvasRevealEffect";
import { Workflow } from "lucide-react";
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

const scaleIn = {
  start: { scale: 0.9, opacity: 0 },
  end: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

const Approach = () => {
  const { theme } = useTheme();
  return (
    <section className="w-full py-20 relative overflow-hidden" id="approach">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial="start"
          whileInView="end"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            variants={scaleIn}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-4 ${
              theme === "dark"
                ? "bg-gradient-to-r from-pink-500/10 to-purple-500/10 border-pink-500/20"
                : "bg-gradient-to-r from-pink-500/5 to-purple-500/5 border-pink-500/30"
            }`}
          >
            <Workflow className="w-5 h-5 text-pink-400" />
            <span className={`text-sm font-medium ${theme === "dark" ? "text-pink-400" : "text-pink-600"}`}>
              My Process
            </span>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className={`text-4xl md:text-5xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
          >
            My{" "}
            <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Approach
            </span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className={`max-w-2xl mx-auto ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
          >
            A streamlined process that ensures quality, communication, and results at every stage
          </motion.p>
        </motion.div>

        {/* Cards */}
        <div className="my-20 flex flex-col lg:flex-row items-center justify-center w-full gap-8">
          <Card
            title="Planning & Strategy"
            icon={<AceternityIcon order="01" />}
            des="We'll collaborate to map out your website's goals, target audience, and key functionalities. We'll discuss things like site structure, navigation, and content requirements."
            phase="Phase 1"
          >
            <CanvasRevealEffect
              animationSpeed={5.1}
              containerClassName="bg-emerald-900 rounded-3xl overflow-hidden"
            />
          </Card>
          <Card
            title="Development & Progress Update"
            icon={<AceternityIcon order="02" />}
            des="Once we agree on the plan, I cue my lofi playlist and dive into coding. From initial sketches to polished code, I keep you updated every step of the way."
            phase="Phase 2"
          >
            <CanvasRevealEffect
              animationSpeed={3}
              containerClassName="bg-pink-900 rounded-3xl overflow-hidden"
              colors={[
                [255, 166, 158],
                [221, 255, 247],
              ]}
              dotSize={2}
            />
          </Card>
          <Card
            title="Development & Launch"
            icon={<AceternityIcon order="03" />}
            des="This is where the magic happens! Based on the approved design, I'll translate everything into functional code, building your website from the ground up."
            phase="Phase 3"
          >
            <CanvasRevealEffect
              animationSpeed={3}
              containerClassName="bg-sky-600 rounded-3xl overflow-hidden"
              colors={[[125, 211, 252]]}
            />
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Approach;

const Card = ({
  title,
  icon,
  children,
  des,
  phase,
}: {
  title: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
  des: string;
  phase: string;
}) => {
  const { theme } = useTheme();
  const [hovered, setHovered] = React.useState(false);
  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className={`group/canvas-card relative border hover:border-pink-500/50 flex items-center justify-center max-w-sm w-full mx-auto p-8 lg:h-[35rem] rounded-3xl transition-all duration-500 hover:shadow-2xl ${
        theme === "dark" ? "border-gray-700/50" : "border-gray-300/50"
      }`}
      style={{
        background: theme === "dark"
          ? "linear-gradient(135deg, rgba(4,7,29,0.95) 0%, rgba(12,14,35,0.9) 100%)"
          : "linear-gradient(135deg, rgba(248,250,252,0.95) 0%, rgba(226,232,240,0.9) 100%)",
      }}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5 opacity-0 group-hover/canvas-card:opacity-100 transition-opacity duration-500 rounded-3xl" />

      {/* Glow effect */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-pink-500 to-purple-500 opacity-0 group-hover/canvas-card:opacity-20 blur-2xl transition-opacity duration-500 rounded-3xl" />

      {/* Corner icons */}
      <Icon className="absolute h-10 w-10 -top-3 -left-3 text-white opacity-20 group-hover/canvas-card:opacity-40 transition-opacity" />
      <Icon className="absolute h-10 w-10 -bottom-3 -left-3 text-white opacity-20 group-hover/canvas-card:opacity-40 transition-opacity" />
      <Icon className="absolute h-10 w-10 -top-3 -right-3 text-white opacity-20 group-hover/canvas-card:opacity-40 transition-opacity" />
      <Icon className="absolute h-10 w-10 -bottom-3 -right-3 text-white opacity-20 group-hover/canvas-card:opacity-40 transition-opacity" />

      {/* Phase badge (top-left) */}
      <div className="absolute top-6 left-6 z-30">
        <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-md border border-pink-500/30">
          <span className="text-xs font-semibold text-pink-300">{phase}</span>
        </div>
      </div>

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full w-full absolute inset-0"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20 px-10">
        {/* Icon/Number - visible when not hovered */}
        <div className="text-center group-hover/canvas-card:-translate-y-4 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] group-hover/canvas-card:opacity-0 transition duration-200 min-w-40 mx-auto flex items-center justify-center">
          {icon}
        </div>

        {/* Title - visible on hover */}
        <h2 className={`text-center text-2xl md:text-3xl opacity-0 group-hover/canvas-card:opacity-100 relative z-10 mt-4 font-bold group-hover/canvas-card:-translate-y-2 transition duration-200 ${
          theme === "dark" ? "text-white" : "text-gray-900"
        }`}>
          {title}
        </h2>

        {/* Description - visible on hover */}
        <p
          className={`text-sm opacity-0 group-hover/canvas-card:opacity-100 relative z-10 mt-4 text-center group-hover/canvas-card:-translate-y-2 transition duration-200 leading-relaxed ${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}
        >
          {des}
        </p>
      </div>

      {/* Decorative corner */}
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-pink-500/10 to-transparent rounded-tl-full opacity-0 group-hover/canvas-card:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
};

const AceternityIcon = ({ order }: { order: string }) => {
  return (
    <div className="relative">
      <button className="relative inline-flex overflow-hidden rounded-full p-[1px]">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-8 py-4 text-purple backdrop-blur-3xl font-bold text-4xl">
          {order}
        </span>
      </button>
    </div>
  );
};

export const Icon = ({ className, ...rest }: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};
