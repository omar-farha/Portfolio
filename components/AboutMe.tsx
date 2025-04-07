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
  start: {
    y: 30,
    opacity: 0,
  },
  end: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      delay: 0.2,
    },
  },
};
const fadeInRight = {
  start: {
    x: -30,
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
const staggerContainer = {
  start: {},
  end: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

function AboutMe() {
  return (
    <div className="container" id="about">
      <div className="w-full px-4 sm:px-8 lg:px-[12%] py-10 scroll-mt-20 text-white">
        <motion.h4
          variants={fadeInUp}
          initial="start"
          whileInView="end"
          viewport={{ once: true }}
          className="text-center mb-2 text-lg"
        >
          Introduction
        </motion.h4>

        <motion.h2
          variants={fadeInUp}
          initial="start"
          whileInView="end"
          viewport={{ once: true }}
          className="text-center text-5xl"
        >
          About me
        </motion.h2>

        <div className="flex w-full flex-col lg:flex-row items-center gap-20 my-20">
          <motion.div
            variants={fadeInRight}
            initial="start"
            whileInView="end"
            viewport={{ once: true }}
            className="w-64 sm:w-80 rounded-3xl max-w-none"
          >
            <Image src={omar} alt="omar" className="w-full rounded-3xl" />
          </motion.div>

          <div className="flex-1">
            <TextAnimate
              duration={2.3}
              animation="slideUp"
              by="word"
              className="mb-10 max-w-2xl"
            >
              I&apos;m a passionate frontend developer with a focus on creating
              responsive, user-friendly websites and web applications. I enjoy
              turning ideas into clean, functional designs that offer a smooth
              and intuitive user experience. With a strong understanding of
              modern web practices and a commitment to continuous learning, I
              strive to deliver high-quality digital solutions that balance both
              visual appeal and performance.
            </TextAnimate>

            <motion.ul
              variants={staggerContainer}
              initial="start"
              whileInView="end"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl"
            >
              <motion.li
                variants={fadeInUp}
                className="border-[0.5px] border-gray-400 rounded-xl p-6 cursor-pointer hover:bg-[rgb(50,54,83)] hover:scale-105 duration-500 hover:shadow-[4px_4px_0_#fff]"
              >
                <GraduationCap className="mt-3" size={35} />
                <h3 className="my-4 text-gray-300">Education</h3>
                <p className="text-gray-300 text-sm">
                  Meta Front-End Developer
                </p>
              </motion.li>

              <motion.li
                variants={fadeInUp}
                className="border-[0.5px] border-gray-400 rounded-xl p-6 cursor-pointer hover:bg-[rgb(50,54,83)] hover:scale-105 duration-500 hover:shadow-[4px_4px_0_#fff]"
              >
                <User className="mt-3" size={35} />
                <h3 className="my-4 text-gray-300">Clients</h3>
                <p className="text-gray-300 text-sm">Over 12 clients</p>
              </motion.li>

              <motion.li
                variants={fadeInUp}
                className="border-[0.5px] border-gray-400 rounded-xl p-6 cursor-pointer hover:bg-[rgb(50,54,83)] hover:scale-105 duration-500 hover:shadow-[4px_4px_0_#fff]"
              >
                <BriefcaseBusiness className="mt-3" size={35} />
                <h3 className="my-4 text-gray-300">Projects</h3>
                <p className="text-gray-300 text-sm">
                  Build more than 30 projects
                </p>
              </motion.li>
            </motion.ul>

            <motion.h4
              variants={fadeInUp}
              initial="start"
              whileInView="end"
              viewport={{ once: true }}
              className="my-6 text-white"
            >
              My Skills
            </motion.h4>

            <motion.ul
              variants={staggerContainer}
              initial="start"
              whileInView="end"
              viewport={{ once: true }}
              className="flex items-center gap-3 sm:gap-5"
            >
              <motion.li
                variants={fadeInUp}
                className="flex items-center justify-center w-12 sm:w-14 aspect-square border border-gray-400 rounded-lg cursor-pointer hover:scale-125 duration-500"
              >
                <Image src={js} alt="JavaScript" width={20} height={20} />
              </motion.li>

              <motion.li
                variants={fadeInUp}
                className="flex items-center justify-center w-12 sm:w-14 aspect-square border border-gray-400 rounded-lg cursor-pointer hover:scale-125 duration-500"
              >
                <Image src={ts} alt="TypeScript" width={20} height={20} />
              </motion.li>

              <motion.li
                variants={fadeInUp}
                className="flex items-center justify-center w-12 sm:w-14 aspect-square border border-gray-400 rounded-lg cursor-pointer hover:scale-125 duration-500"
              >
                <Image
                  src={tailwind}
                  alt="Tailwind CSS"
                  width={20}
                  height={20}
                />
              </motion.li>

              <motion.li
                variants={fadeInUp}
                className="flex items-center justify-center w-12 sm:w-14 aspect-square border border-gray-400 rounded-lg cursor-pointer hover:scale-125 duration-500"
              >
                <Image src={react} alt="React" width={20} height={20} />
              </motion.li>

              <motion.li
                variants={fadeInUp}
                className="flex items-center justify-center w-12 sm:w-14 aspect-square border border-gray-400 rounded-lg cursor-pointer hover:scale-125 duration-500"
              >
                <Image src={redux} alt="Redux" width={20} height={20} />
              </motion.li>

              <motion.li
                variants={fadeInUp}
                className="flex items-center justify-center w-12 sm:w-14 aspect-square border border-gray-400 rounded-lg cursor-pointer hover:scale-125 duration-500"
              >
                <Image src={next} alt="Next.js" width={20} height={20} />
              </motion.li>

              <motion.li
                variants={fadeInUp}
                className="flex items-center justify-center w-12 sm:w-14 aspect-square border border-gray-400 rounded-lg cursor-pointer hover:scale-125 duration-500"
              >
                <Image src={git} alt="Git" width={20} height={20} />
              </motion.li>
            </motion.ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutMe;
