"use client";
import { socialMedia } from "@/data";
import MagicButton from "./ui/MagicButton";
import { Send, CheckCircle, XCircle, Loader2 } from "lucide-react";
import Image from "next/image";
import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";

const Footer = () => {
  const { theme } = useTheme();
  const form = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});

  const validateForm = () => {
    const formData = new FormData(form.current!);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    const newErrors: typeof errors = {};

    if (!name || name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!message || message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setSubmitStatus("idle");

    if (form.current) {
      try {
        await emailjs.sendForm(
          "service_lupckuk",
          "template_sytjikp",
          form.current,
          {
            publicKey: "EZscLU7fLWxc4TtnM",
          }
        );
        setSubmitStatus("success");
        form.current.reset();
        setErrors({});
        setTimeout(() => setSubmitStatus("idle"), 5000);
      } catch (error) {
        console.error("FAILED...", error);
        setSubmitStatus("error");
        setTimeout(() => setSubmitStatus("idle"), 5000);
      } finally {
        setIsLoading(false);
      }
    }
  };
  const fadeIn = {
    start: {
      opacity: 0,
    },
    end: {
      opacity: 1,
      transition: {
        duration: 0.7,
      },
    },
  };
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

  return (
    <footer className="w-full pt-20 pb-6" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contact Section */}
        <div className="flex flex-col items-center mb-16">
          <motion.h1
            variants={fadeIn}
            initial="start"
            whileInView="end"
            viewport={{ once: true }}
            className={`font-bold text-4xl md:text-5xl lg:text-6xl text-center max-w-4xl mb-6 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Let's Work{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Together
            </span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            initial="start"
            whileInView="end"
            viewport={{ once: true }}
            className={`text-lg md:text-xl text-center max-w-2xl mb-12 ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Have a project in mind? Let's discuss how I can help bring your ideas to life.
          </motion.p>

          {/* Contact Form */}
          <div className="w-full max-w-2xl">
            <form
              className="space-y-6"
              onSubmit={sendEmail}
              ref={form}
              noValidate
            >
            {/* Success/Error Notifications */}
            <AnimatePresence>
              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex items-center gap-2 p-4 bg-green-500/10 border border-green-500/50 rounded-lg text-green-400"
                  role="alert"
                  aria-live="polite"
                >
                  <CheckCircle size={20} />
                  <span>Message sent successfully! I&apos;ll get back to you soon.</span>
                </motion.div>
              )}
              {submitStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400"
                  role="alert"
                  aria-live="polite"
                >
                  <XCircle size={20} />
                  <span>Failed to send message. Please try again or email me directly.</span>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <motion.input
                variants={fadeInUp}
                initial="start"
                whileInView="end"
                viewport={{ once: true }}
                type="text"
                className={`w-full border-2 rounded-xl px-5 py-4 text-base focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-300 backdrop-blur-sm ${
                  errors.name
                    ? "border-red-500"
                    : theme === "dark"
                    ? "border-gray-700/50 bg-gray-900/50 text-white placeholder:text-gray-500"
                    : "border-slate-300 bg-white/50 text-gray-900 placeholder:text-gray-500"
                }`}
                placeholder="Your Name *"
                name="name"
                aria-label="Your name"
                aria-required="true"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                disabled={isLoading}
              />
              {errors.name && (
                <p
                  id="name-error"
                  className="text-red-400 text-sm mt-2"
                  role="alert"
                >
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <motion.input
                variants={fadeInUp}
                initial="start"
                whileInView="end"
                viewport={{ once: true }}
                type="email"
                className={`w-full border-2 rounded-xl px-5 py-4 text-base focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-300 backdrop-blur-sm ${
                  errors.email
                    ? "border-red-500"
                    : theme === "dark"
                    ? "border-gray-700/50 bg-gray-900/50 text-white placeholder:text-gray-500"
                    : "border-slate-300 bg-white/50 text-gray-900 placeholder:text-gray-500"
                }`}
                placeholder="Your Email *"
                name="email"
                aria-label="Your email address"
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                disabled={isLoading}
              />
              {errors.email && (
                <p
                  id="email-error"
                  className="text-red-400 text-sm mt-2"
                  role="alert"
                >
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <motion.textarea
                variants={fadeInUp}
                initial="start"
                whileInView="end"
                viewport={{ once: true }}
                rows={6}
                className={`w-full border-2 rounded-xl px-5 py-4 text-base focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-300 resize-none backdrop-blur-sm ${
                  errors.message
                    ? "border-red-500"
                    : theme === "dark"
                    ? "border-gray-700/50 bg-gray-900/50 text-white placeholder:text-gray-500"
                    : "border-slate-300 bg-white/50 text-gray-900 placeholder:text-gray-500"
                }`}
                placeholder="Your Message *"
                name="message"
                aria-label="Your message"
                aria-required="true"
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
                disabled={isLoading}
              />
              {errors.message && (
                <p
                  id="message-error"
                  className="text-red-400 text-sm mt-2"
                  role="alert"
                >
                  {errors.message}
                </p>
              )}
            </div>

            <div className="text-center pt-2">
              <MagicButton
                type="submit"
                disabled={isLoading}
                aria-busy={isLoading}
                title={isLoading ? "Sending..." : "Send Message"}
                icon={
                  isLoading ? (
                    <Loader2 size={17} className="animate-spin" />
                  ) : (
                    <Send size={17} />
                  )
                }
                position="right"
              />
            </div>
          </form>
          </div>
        </div>

        {/* Divider */}
        <div className={`h-px w-full mb-8 ${theme === "dark" ? "bg-gray-800" : "bg-gray-300"}`} />

        {/* Footer Bottom */}
        <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-6 pb-2">
          <p className={`text-sm text-center md:text-left ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}>
            © 2025{" "}
            <Link
              href="#about"
              className="text-purple-400 hover:text-purple-300 transition-colors font-semibold"
            >
              Omar Farha
            </Link>
            . All rights reserved.
          </p>

          <nav className="flex items-center gap-4" aria-label="Social media links">
            {socialMedia.map((info, index) => {
              const socialNames = ["GitHub", "LinkedIn", "WhatsApp"];
              return (
                <Link
                  key={info.id}
                  href={info.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-11 h-11 flex justify-center items-center backdrop-filter backdrop-blur-lg rounded-xl border-2 transition-all duration-300 hover:scale-110 ${
                    theme === "dark"
                      ? "bg-gray-900/50 border-gray-700/50 hover:bg-purple-500/20 hover:border-purple-500/50"
                      : "bg-white/50 border-slate-300 hover:bg-purple-100 hover:border-purple-400"
                  }`}
                  aria-label={`Visit my ${socialNames[index]} profile`}
                >
                  <Image
                    src={info.img}
                    alt={`${socialNames[index]} icon`}
                    width={22}
                    height={22}
                  />
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
