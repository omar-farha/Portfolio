import React from "react";
import { testimonials } from "@/data";
import { InfiniteMovingCards } from "./ui/InfiniteCards";
import { motion } from "motion/react";

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

const Clients = () => {
  return (
    <div className="py-10 text-white" id="projects">
      <motion.h1
        variants={fadeInUp}
        initial="start"
        whileInView="end"
        viewport={{ once: true }}
        className="font-bold text-4xl md:text-5xl text-center"
      >
        Kind words from
        <br />
        <span className="text-purple-400">satisfied clients</span>
      </motion.h1>
      <div className="flex flex-col items-center max-lg:mt-10">
        <div
          // remove bg-white dark:bg-black dark:bg-grid-white/[0.05], h-[40rem] to 30rem , md:h-[30rem] are for the responsive design
          className="h-[50vh] md:h-[30rem] rounded-md flex flex-col antialiased  items-center justify-center relative overflow-hidden"
        >
          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="slow"
          />
        </div>
      </div>
    </div>
  );
};

export default Clients;
