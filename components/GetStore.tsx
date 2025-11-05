"use client";
import React from "react";
import { ContainerScroll } from "./ui/ContainerScroll";
import Image from "next/image";
import shop from "@/public/original-4172ed9d2db71dfebb894800c368b8e3.png";
import { motion } from "motion/react";
import {
  ShoppingBag,
  ExternalLink,
  Sparkles,
  Zap,
  Shield,
  Rocket,
} from "lucide-react";
import Link from "next/link";

const scaleIn = {
  start: { scale: 0.9, opacity: 0 },
  end: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

const fadeInUp = {
  start: { y: 30, opacity: 0 },
  end: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7 },
  },
};

function GetStore() {
  const features = [
    {
      icon: <Zap className="w-5 h-5" />,
      text: "Fast & Responsive",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: <Shield className="w-5 h-5" />,
      text: "Secure Payment",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Rocket className="w-5 h-5" />,
      text: "Quick Launch",
      color: "from-blue-500 to-cyan-500",
    },
  ];

  return (
    <section className="py-14 relative overflow-hidden" id="store">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      {/* Scroll Container with Image */}
      <div className="flex flex-col overflow-hidden relative">
        <ContainerScroll
          titleComponent={
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="flex items-center gap-2 mb-4"
              >
                <Sparkles className="w-6 h-6 text-cyan-400" />
                <span className="text-cyan-400 font-semibold text-lg">
                  Featured Project
                </span>
              </motion.div>
              <h3 className="text-3xl md:text-5xl font-bold text-white text-center mb-6">
                Modern E-commerce Platform
              </h3>
              <p className="text-gray-400 text-center max-w-2xl mb-8">
                A showcase of what's possible - complete with product
                management, shopping cart, secure checkout, and admin dashboard
              </p>
              <Link
                href="#contact"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
              >
                <span>Get Your Store</span>
                <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </div>
          }
        >
          <div className="relative group">
            {/* Glow effect */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-500 to-cyan-500 opacity-20 group-hover:opacity-30 blur-3xl transition-opacity duration-500 rounded-2xl" />

            <Image
              src={shop}
              alt="Modern E-commerce Store"
              height={720}
              width={1400}
              className="mx-auto rounded-2xl object-cover h-full object-left-top border-4 border-gray-700/50 group-hover:border-blue-500/50 transition-all duration-500 shadow-2xl"
              draggable={false}
              priority
            />

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 via-transparent to-transparent rounded-2xl pointer-events-none" />
          </div>
        </ContainerScroll>
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mt-16"
      >
        <p className="text-gray-400 mb-4">Ready to start selling online?</p>
        <Link
          href="#contact"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-900/50 border border-gray-700/50 text-white hover:bg-gray-800/50 hover:border-blue-500/50 transition-all duration-300 group"
        >
          <span>Let's discuss your project</span>
          <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </Link>
      </motion.div>
    </section>
  );
}

export default GetStore;
