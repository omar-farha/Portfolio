"use client";
import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Menu, X, Sun, Moon, Download, Mail } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

// Define the type for the navItem
interface NavItem {
  name: string;
  link: string;
}

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: NavItem[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const { theme, toggleTheme } = useTheme();
  const [visible, setVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current - (scrollYProgress.getPrevious() ?? 0);

      if (scrollYProgress.get() < 0.05) {
        setVisible(false);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  // Track active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.5 }
    );

    navItems.forEach((item) => {
      const element = document.querySelector(item.link);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [navItems]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 1, y: -100 }}
          animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "hidden md:flex max-w-fit md:min-w-[70vw] lg:min-w-fit fixed z-[5000] top-10 inset-x-0 mx-auto px-6 py-4 rounded-xl border items-center justify-center gap-6",
            className
          )}
          style={{
            backdropFilter: "blur(16px) saturate(180%)",
            backgroundColor:
              theme === "dark"
                ? "rgba(17, 25, 40, 0.75)"
                : "rgba(255, 255, 255, 0.75)",
            border:
              theme === "dark"
                ? "1px solid rgba(255, 255, 255, 0.125)"
                : "1px solid rgba(0, 0, 0, 0.125)",
          }}
        >
          {navItems.map((navItem, idx) => (
            <Link
              key={`link=${idx}`}
              href={navItem.link}
              className={cn(
                "relative items-center flex space-x-1 transition-colors duration-200",
                activeSection === navItem.link
                  ? theme === "dark"
                    ? "text-purple-400"
                    : "text-purple-600"
                  : theme === "dark"
                  ? "text-neutral-50 hover:text-purple-300"
                  : "text-neutral-900 hover:text-purple-600"
              )}
            >
              <span className="text-sm font-medium !cursor-pointer">
                {navItem.name}
              </span>
              {activeSection === navItem.link && (
                <motion.div
                  layoutId="activeSection"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={cn(
              "p-2 rounded-lg transition-all duration-200",
              theme === "dark"
                ? "bg-gray-800/50 hover:bg-gray-700/50 text-yellow-400"
                : "bg-gray-200/50 hover:bg-gray-300/50 text-blue-600"
            )}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>
        </motion.div>
      </AnimatePresence>

      {/* Mobile Header - Always Visible */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="md:hidden fixed top-0 left-0 right-0 z-[5000] px-4 py-4"
        style={{
          backdropFilter: "blur(16px) saturate(180%)",
          backgroundColor:
            theme === "dark"
              ? "rgba(17, 25, 40, 0.95)"
              : "rgba(255, 255, 255, 0.95)",
          borderBottom:
            theme === "dark"
              ? "1px solid rgba(255, 255, 255, 0.1)"
              : "1px solid rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="flex items-center justify-between">
          <Link
            href="#home"
            className={cn(
              "text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            )}
          >
            Omar Farha
          </Link>

          <div className="flex items-center gap-3">
            {/* Theme Toggle Mobile */}
            <button
              onClick={toggleTheme}
              className={cn(
                "p-2 rounded-lg transition-all duration-200",
                theme === "dark"
                  ? "bg-gray-800/50 text-yellow-400"
                  : "bg-gray-200/50 text-blue-600"
              )}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn(
                "p-2 rounded-lg transition-all duration-200",
                theme === "dark"
                  ? "bg-gray-800/50 text-white"
                  : "bg-gray-200/50 text-gray-900"
              )}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[4999] md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={cn(
                "fixed top-0 right-0 bottom-0 w-[85vw] max-w-sm z-[5000] md:hidden overflow-y-auto",
                theme === "dark" ? "bg-gray-900" : "bg-white"
              )}
              style={{
                boxShadow:
                  theme === "dark"
                    ? "-4px 0 24px rgba(0, 0, 0, 0.5)"
                    : "-4px 0 24px rgba(0, 0, 0, 0.1)",
              }}
            >
              {/* Menu Header */}
              <div
                className={cn(
                  "p-6 border-b",
                  theme === "dark" ? "border-gray-800" : "border-gray-200"
                )}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2
                    className={cn(
                      "text-xl font-bold",
                      theme === "dark" ? "text-white" : "text-gray-900"
                    )}
                  >
                    Menu
                  </h2>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "p-2 rounded-lg transition-colors",
                      theme === "dark"
                        ? "hover:bg-gray-800 text-gray-400"
                        : "hover:bg-gray-100 text-gray-600"
                    )}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="p-6 space-y-2">
                {navItems.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.link}
                    onClick={handleNavClick}
                    className={cn(
                      "flex items-center gap-3 px-4 py-4 rounded-xl transition-all duration-200 text-base font-medium",
                      activeSection === item.link
                        ? theme === "dark"
                          ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                          : "bg-purple-100 text-purple-600 border border-purple-200"
                        : theme === "dark"
                        ? "text-gray-300 hover:bg-gray-800/50 border border-transparent"
                        : "text-gray-700 hover:bg-gray-100 border border-transparent"
                    )}
                  >
                    <span>{item.name}</span>
                    {activeSection === item.link && (
                      <motion.div
                        layoutId="activeMobileSection"
                        className="ml-auto w-2 h-2 rounded-full bg-purple-400"
                      />
                    )}
                  </Link>
                ))}
              </nav>

              {/* Quick Actions */}
              <div
                className={cn(
                  "p-6 border-t",
                  theme === "dark" ? "border-gray-800" : "border-gray-200"
                )}
              >
                <div className="space-y-3">
                  <a
                    href="/resume.pdf"
                    download
                    className={cn(
                      "flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl font-medium transition-all duration-200",
                      theme === "dark"
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500"
                        : "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
                    )}
                  >
                    <Download className="w-5 h-5" />
                    <span>Download Resume</span>
                  </a>

                  <a
                    href="#contact"
                    onClick={handleNavClick}
                    className={cn(
                      "flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl font-medium border transition-all duration-200",
                      theme === "dark"
                        ? "border-gray-700 text-gray-300 hover:bg-gray-800/50"
                        : "border-gray-300 text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    <Mail className="w-5 h-5" />
                    <span>Get in Touch</span>
                  </a>
                </div>
              </div>

              {/* Social Links */}
              <div
                className={cn(
                  "p-6 border-t",
                  theme === "dark" ? "border-gray-800" : "border-gray-200"
                )}
              >
                <p
                  className={cn(
                    "text-sm font-medium mb-3",
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  )}
                >
                  Connect with me
                </p>
                <div className="flex gap-3">
                  {[
                    { name: "GitHub", url: "https://github.com/omarfarha123" },
                    {
                      name: "LinkedIn",
                      url: "https://www.linkedin.com/in/omar-farha/",
                    },
                    { name: "Twitter", url: "#" },
                  ].map((social, idx) => (
                    <a
                      key={idx}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                        theme === "dark"
                          ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      )}
                    >
                      {social.name}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
