"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import MagicButton from "./MagicButton";
import { Copy, Check } from "lucide-react";
import { motion } from "motion/react";
import { fadeIn, fadeInUp } from "@/lib/motionVariants";
import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";

const staggerContainer = {
  start: {},
  end: {
    transition: { staggerChildren: 0.1 },
  },
};

const scaleIn = {
  start: { scale: 0.95, opacity: 0 },
  end: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <motion.div
      variants={staggerContainer}
      initial="start"
      whileInView="end"
      viewport={{ once: true }}
      className={cn(
        "grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 md:grid-row-7 gap-4 lg:gap-8 mx-auto",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export const BentoGridItem = ({
  className,
  id,
  title,
  description,
  img,
  imgClassName,
  titleClassName,
  spareImg,
}: {
  className?: string;
  id: number;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  img?: string;
  imgClassName?: string;
  titleClassName?: string;
  spareImg?: string;
}) => {
  const { theme } = useTheme();
  const leftLists = ["ReactJS", "Express", "Typescript"];
  const rightLists = ["NodeJs", "NextJS", "GraphQL"];

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = "farha.omar2008@gmail.com";
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className={cn(
        "group/bento row-span-1 relative overflow-hidden rounded-3xl border transition-all duration-300 shadow-lg hover:shadow-2xl hover:border-green-500/50 flex flex-col space-y-4",
        theme === "dark"
          ? "border-gray-700/50"
          : "border-gray-300/50",
        className
      )}
      style={{
        background: theme === "dark"
          ? "linear-gradient(135deg, rgba(4,7,29,0.95) 0%, rgba(12,14,35,0.9) 100%)"
          : "linear-gradient(135deg, rgba(248,250,252,0.95) 0%, rgba(226,232,240,0.9) 100%)",
      }}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover/bento:opacity-100 transition-opacity duration-500" />

      {/* Glow effect on hover */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-green-500 to-emerald-500 opacity-0 group-hover/bento:opacity-20 blur-2xl transition-opacity duration-500 rounded-3xl" />

      <div className={`${id === 6 && "flex justify-center"} h-full relative`}>
        {/* Background images */}
        <div className="w-full h-full absolute">
          {img && (
            <Image
              src={img}
              alt={img}
              width={100}
              height={100}
              className={cn(imgClassName, "object-cover object-center transition-transform duration-500 group-hover/bento:scale-110")}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
        </div>
        <div
          className={`absolute right-0 -bottom-5 ${
            id === 5 && "w-full opacity-80"
          }`}
        >
          {spareImg && (
            <Image
              src={spareImg}
              alt={spareImg}
              width={220}
              height={220}
              className="object-cover object-center w-full h-full transition-transform duration-500 group-hover/bento:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
        </div>

        {/* Special background for card 6 (contact) */}
        {id === 6 && (
          <div className="bg-gradient-to-br from-green-900/40 via-emerald-900/30 to-blue-900/40 w-full h-full absolute overflow-hidden top-0 left-0 rounded-3xl">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-green-500 rounded-full blur-3xl" />
              <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-blue-500 rounded-full blur-3xl" />
            </div>
          </div>
        )}

        {/* Content */}
        <div
          className={cn(
            titleClassName,
            "group-hover/bento:translate-x-2 transition-all duration-300 relative md:h-full min-h-40 flex flex-col px-5 p-5 lg:p-10"
          )}
        >
          {/* Description */}
          <motion.div
            variants={fadeIn}
            initial="start"
            whileInView="end"
            viewport={{ once: true }}
            className={`font-sans font-extralight md:max-w-32 md:text-xs lg:text-base text-sm z-10 mb-2 ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {description}
          </motion.div>

          {/* Title */}
          <motion.div
            variants={fadeInUp}
            initial="start"
            whileInView="end"
            viewport={{ once: true }}
            className={`font-sans text-lg lg:text-3xl max-w-96 font-bold z-10 leading-tight ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            {title}
          </motion.div>

          {/* Tech Stack Lists (Card 3) */}
          {id === 3 && (
            <div className="flex gap-1 lg:gap-5 w-fit absolute -right-3 lg:-right-2">
              <div className="flex flex-col gap-3 md:gap-3 lg:gap-8">
                {leftLists.map((item, i) => (
                  <motion.span
                    key={i}
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className={`lg:py-4 lg:px-3 py-2 px-3 text-xs lg:text-base opacity-50 lg:opacity-100 rounded-lg text-center backdrop-blur-sm border hover:border-green-500/50 transition-colors ${
                      theme === "dark"
                        ? "bg-gradient-to-br from-gray-900/90 to-gray-800/80 border-gray-700/50"
                        : "bg-gradient-to-br from-white/95 to-slate-100/90 border-slate-300/50"
                    }`}
                  >
                    {item}
                  </motion.span>
                ))}
                <span className={`lg:py-4 lg:px-3 py-4 px-3 rounded-lg text-center backdrop-blur-sm border ${
                  theme === "dark"
                    ? "bg-gradient-to-br from-gray-900/50 to-gray-800/30 border-gray-700/30"
                    : "bg-gradient-to-br from-white/50 to-slate-100/30 border-slate-300/30"
                }`}></span>
              </div>
              <div className="flex flex-col gap-3 md:gap-3 lg:gap-8">
                <span className={`lg:py-4 lg:px-3 py-4 px-3 rounded-lg text-center backdrop-blur-sm border ${
                  theme === "dark"
                    ? "bg-gradient-to-br from-gray-900/50 to-gray-800/30 border-gray-700/30"
                    : "bg-gradient-to-br from-white/50 to-slate-100/30 border-slate-300/30"
                }`}></span>
                {rightLists.map((item, i) => (
                  <motion.span
                    key={i}
                    initial={{ x: 20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 + 0.1 }}
                    viewport={{ once: true }}
                    className={`lg:py-4 lg:px-3 py-2 px-3 text-xs lg:text-base opacity-50 lg:opacity-100 rounded-lg text-center backdrop-blur-sm border hover:border-green-500/50 transition-colors ${
                      theme === "dark"
                        ? "bg-gradient-to-br from-gray-900/90 to-gray-800/80 border-gray-700/50"
                        : "bg-gradient-to-br from-white/95 to-slate-100/90 border-slate-300/50"
                    }`}
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </div>
          )}

          {/* Copy Email Button (Card 6) */}
          {id === 6 && (
            <div className="mt-5 relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MagicButton
                  title={copied ? "Email Copied!" : "Copy my email address"}
                  icon={copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  position="left"
                  handelClick={handleCopy}
                  otherClasses={cn(
                    theme === "dark"
                      ? "!bg-gradient-to-r from-gray-900/90 to-gray-800/80 border border-gray-700/50"
                      : "!bg-gradient-to-r from-white/95 to-slate-100/90 border border-slate-300/50",
                    "backdrop-blur-sm hover:border-green-500/50 transition-all duration-300",
                    copied && "!bg-gradient-to-r from-green-500/20 to-emerald-500/20 !border-green-500/50"
                  )}
                />
              </motion.div>

              {/* Email text below button */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: copied ? 1 : 0, y: copied ? 0 : 10 }}
                className="text-center text-sm text-green-400 mt-3 font-medium"
              >
                farha.omar2008@gmail.com
              </motion.p>
            </div>
          )}
        </div>
      </div>

      {/* Decorative corner gradient */}
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-green-500/5 to-transparent rounded-tl-full opacity-0 group-hover/bento:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
};
