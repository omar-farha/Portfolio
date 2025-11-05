"use client";
import React from "react";
import { testimonials } from "@/data";
import { InfiniteMovingCards } from "./ui/InfiniteCards";
import { motion } from "motion/react";
import { MessageSquareQuote } from "lucide-react";
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

const Clients = () => {
  const { theme } = useTheme();
  return (
    <section className="py-20 relative overflow-hidden" id="testimonials">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl" />
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
                ? "bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border-orange-500/20"
                : "bg-gradient-to-r from-orange-500/5 to-yellow-500/5 border-orange-500/30"
            }`}
          >
            <MessageSquareQuote className="w-5 h-5 text-orange-400" />
            <span className={`text-sm font-medium ${theme === "dark" ? "text-orange-400" : "text-orange-600"}`}>
              Client Feedback
            </span>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className={`text-4xl md:text-5xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
          >
            Kind words from{" "}
            <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
              satisfied clients
            </span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className={`max-w-2xl mx-auto ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
          >
            Don't just take my word for it - hear what clients have to say about working with me
          </motion.p>
        </motion.div>

        {/* Testimonials Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center"
        >
          <div className="h-[50vh] md:h-[30rem] rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden w-full">
            <InfiniteMovingCards
              items={testimonials}
              direction="right"
              speed="slow"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Clients;
