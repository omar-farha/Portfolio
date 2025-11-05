"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Download, ArrowUp, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

export const FloatingActionButton = () => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const actions = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email Me",
      href: "#contact",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Download className="w-5 h-5" />,
      label: "Resume",
      href: "/resume.pdf",
      download: true,
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <>
      {/* FAB - Visible on all screen sizes */}
      <div className="fixed bottom-6 right-6 z-[4998] flex flex-col-reverse items-end gap-3">
        {/* Action Buttons */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col-reverse gap-3"
            >
              {actions.map((action, index) => (
                <motion.a
                  key={index}
                  href={action.href}
                  download={action.download}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: 20, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 20, scale: 0.8 }}
                  transition={{ delay: index * 0.05 }}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-full shadow-lg backdrop-blur-sm text-white font-medium whitespace-nowrap",
                    `bg-gradient-to-r ${action.color}`
                  )}
                >
                  {action.icon}
                  <span className="text-sm">{action.label}</span>
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main FAB Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.9 }}
          className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white transition-all duration-300 ${
            theme === "dark"
              ? "bg-gradient-to-r from-purple-600 to-pink-600"
              : "bg-gradient-to-r from-purple-500 to-pink-500 shadow-xl"
          }`}
          aria-label="Contact menu"
        >
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Mail className="w-6 h-6" />}
          </motion.div>
        </motion.button>
      </div>

      {/* Scroll to Top Button - Visible on both mobile and desktop */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            whileTap={{ scale: 0.9 }}
            className={`fixed bottom-6 left-6 z-[4998] w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 ${
              theme === "dark"
                ? "bg-gradient-to-r from-gray-800 to-gray-700 text-white border border-gray-600/50 hover:from-gray-700 hover:to-gray-600"
                : "bg-gradient-to-r from-slate-200 to-slate-100 text-gray-700 border border-slate-300/50 hover:from-slate-300 hover:to-slate-200 shadow-xl"
            }`}
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};
