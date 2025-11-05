"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { certifications, certificationCategories } from "@/data";
import {
  Award,
  ExternalLink,
  Calendar,
  CheckCircle2,
  Filter,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";
import { useRouter } from "next/navigation";

const fadeInUp = {
  start: { y: 30, opacity: 0 },
  end: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7 },
  },
};

const staggerContainer = {
  start: {},
  end: {
    transition: { staggerChildren: 0.08 },
  },
};

const scaleIn = {
  start: { scale: 0.9, opacity: 0 },
  end: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.4 },
  },
};

const Certifications = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentScrollIndex, setCurrentScrollIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filteredCertifications =
    activeCategory === "All"
      ? certifications
      : certifications.filter((cert) => cert.category === activeCategory);

  const handleCertificateClick = (certId: number) => {
    router.push(`/certificate/${certId}`);
  };

  // Track scroll position for pagination indicators
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const containerWidth = container.offsetWidth;

      // Find which card is most visible in the viewport
      const cards = container.querySelectorAll('.certificate-card');
      let closestIndex = 0;
      let closestDistance = Infinity;

      cards.forEach((card, index) => {
        const cardElement = card as HTMLElement;
        const cardLeft = cardElement.offsetLeft;
        const cardCenter = cardLeft + (cardElement.offsetWidth / 2);
        const viewportCenter = scrollLeft + (containerWidth / 2);
        const distance = Math.abs(cardCenter - viewportCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setCurrentScrollIndex(closestIndex);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [filteredCertifications.length]);

  // Reset scroll when category changes
  useEffect(() => {
    setCurrentScrollIndex(0);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
    }
  }, [activeCategory]);

  return (
    <section className="py-20 relative overflow-hidden" id="certifications">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          variants={fadeInUp}
          initial="start"
          whileInView="end"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-4 ${
            theme === "dark"
              ? "bg-purple-500/10 border-purple-500/20"
              : "bg-purple-500/5 border-purple-500/30"
          }`}>
            <Award className="w-5 h-5 text-purple-400" />
            <span className={`text-sm font-medium ${theme === "dark" ? "text-purple-400" : "text-purple-600"}`}>
              Credentials & Learning
            </span>
          </div>
          <h2 className={`text-4xl md:text-5xl font-bold mt-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            Professional{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Certifications
            </span>
          </h2>
          <p className={`mt-4 max-w-2xl mx-auto ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            Continuously learning and staying updated with the latest
            technologies and best practices in web development
          </p>
        </motion.div>

        {/* Filter Buttons - Desktop */}
        <motion.div
          variants={fadeInUp}
          initial="start"
          whileInView="end"
          viewport={{ once: true }}
          className="hidden md:flex items-center justify-center mb-12"
        >
          <div className={`inline-flex items-center gap-2 p-2 backdrop-blur-sm border rounded-full ${
            theme === "dark"
              ? "bg-gray-900/50 border-gray-700/50"
              : "bg-white/50 border-gray-300/50 shadow-lg"
          }`}>
            <Filter className={`w-4 h-4 ml-2 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
            <div className="flex flex-wrap gap-2">
              {certificationCategories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50"
                      : theme === "dark"
                      ? "text-gray-400 hover:text-white hover:bg-gray-800/50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  {category}
                  {category !== "All" && (
                    <span className="ml-1 text-xs opacity-70">
                      (
                      {
                        certifications.filter((c) => c.category === category)
                          .length
                      }
                      )
                    </span>
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Filter Buttons - Mobile (Horizontal Scroll) */}
        <motion.div
          variants={fadeInUp}
          initial="start"
          whileInView="end"
          viewport={{ once: true }}
          className="md:hidden mb-8"
        >
          <div className="flex items-center gap-2 mb-3 px-4">
            <Filter className={`w-4 h-4 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`} />
            <span className={`text-sm font-medium ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              Filter by category
            </span>
          </div>
          <div className="overflow-x-auto pb-2 -mx-4 px-4 scroll-smooth">
            <div className="flex gap-2 min-w-max">
              {certificationCategories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  whileTap={{ scale: 0.95 }}
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 whitespace-nowrap border-2 ${
                    activeCategory === category
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50 border-purple-500"
                      : theme === "dark"
                      ? "bg-gray-800/80 text-gray-300 hover:text-white hover:bg-gray-800 border-gray-700/60"
                      : "bg-white/80 text-gray-700 hover:text-gray-900 hover:bg-white border-slate-300/60 shadow"
                  }`}
                >
                  {category}
                  {category !== "All" && (
                    <span className="ml-1.5 text-xs opacity-80">
                      ({certifications.filter((c) => c.category === category).length})
                    </span>
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-8"
        >
          <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            Showing{" "}
            <span className="text-purple-400 font-semibold">
              {filteredCertifications.length}
            </span>{" "}
            {filteredCertifications.length === 1
              ? "certification"
              : "certifications"}
          </p>
        </motion.div>

        {/* Certifications Display */}
        {/* Mobile: Horizontal Scroll */}
        <div className="md:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeCategory}-mobile`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
              ref={scrollContainerRef}
              className="overflow-x-auto pb-6 -mx-4 px-4 scroll-smooth snap-x snap-mandatory"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              <div className="flex gap-5">
                {filteredCertifications.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative cursor-pointer w-[85vw] max-w-[380px] flex-shrink-0 snap-center certificate-card"
                  onClick={() => handleCertificateClick(cert.id)}
                >
                  {/* Mobile Card - Match Desktop Design */}
                  <div className={`relative backdrop-blur-md border-2 rounded-3xl overflow-hidden active:border-purple-500/60 active:shadow-2xl transition-all duration-500 h-full flex flex-col ${
                    theme === "dark"
                      ? "bg-gradient-to-br from-gray-900/95 to-gray-800/90 border-gray-700/60 shadow-xl shadow-black/50"
                      : "bg-gradient-to-br from-white/95 to-slate-50/95 border-slate-300/60 shadow-xl shadow-slate-300/50"
                  }`}>
                    {/* Gradient overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-[0.03] active:opacity-[0.12] transition-opacity duration-500`}
                    />

                    {/* Image Header */}
                    <div className={`relative h-64 overflow-hidden ${
                      theme === "dark"
                        ? "bg-gradient-to-br from-gray-800 to-gray-900"
                        : "bg-gradient-to-br from-slate-100 to-slate-200"
                    }`}>
                      <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-[0.08]`} />
                      <div className="relative z-10 flex items-center justify-center h-full p-5">
                        <div className="relative w-full h-full">
                          <Image
                            src={cert.image}
                            alt={cert.title}
                            fill
                            className="object-cover rounded-xl shadow-2xl"
                          />
                        </div>
                      </div>

                      {/* Floating Date Badge */}
                      <div className={`absolute top-4 right-4 flex items-center gap-2 px-3 py-2 rounded-xl backdrop-blur-xl border shadow-lg transition-all duration-300 ${
                        theme === "dark"
                          ? "bg-black/80 border-gray-700/60"
                          : "bg-white/90 border-slate-300/60"
                      }`}>
                        <Calendar className={`w-3.5 h-3.5 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`} />
                        <span className={`text-xs font-semibold ${theme === "dark" ? "text-gray-200" : "text-gray-800"}`}>
                          {cert.date}
                        </span>
                      </div>

                      {/* Category Badge */}
                      <div className={`absolute top-4 left-4 px-4 py-2 rounded-xl backdrop-blur-xl border shadow-lg transition-all duration-300 ${
                        theme === "dark"
                          ? "bg-purple-500/25 border-purple-400/40"
                          : "bg-purple-500/20 border-purple-500/40"
                      }`}>
                        <span className={`text-xs font-bold ${theme === "dark" ? "text-purple-200" : "text-purple-700"}`}>
                          {cert.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 p-6 flex-1 flex flex-col">
                      {/* Title & Issuer */}
                      <h3 className={`text-xl font-bold mb-2.5 transition-colors duration-300 line-clamp-2 leading-tight ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}>
                        {cert.title}
                      </h3>
                      <p className={`font-semibold mb-4 text-sm ${
                        theme === "dark" ? "text-purple-400" : "text-purple-600"
                      }`}>
                        {cert.issuer}
                      </p>

                      {/* Description */}
                      <p className={`text-sm leading-relaxed mb-5 line-clamp-3 flex-1 ${
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}>
                        {cert.description}
                      </p>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-2 mb-5">
                        {cert.skills.slice(0, 3).map((skill, idx) => (
                          <span
                            key={idx}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all duration-300 ${
                              theme === "dark"
                                ? "bg-gray-800/70 border-gray-700/60 text-gray-300"
                                : "bg-white/70 border-slate-300/60 text-gray-700"
                            }`}
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                            {skill}
                          </span>
                        ))}
                        {cert.skills.length > 3 && (
                          <span className={`inline-flex items-center px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all duration-300 ${
                            theme === "dark"
                              ? "bg-purple-500/15 border-purple-500/40 text-purple-300"
                              : "bg-purple-500/10 border-purple-500/40 text-purple-600"
                          }`}>
                            +{cert.skills.length - 3} more
                          </span>
                        )}
                      </div>

                      {/* View Details Text */}
                      <div className={`inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 mt-auto ${
                        theme === "dark"
                          ? "text-purple-400"
                          : "text-purple-600"
                      }`}>
                        <span>View Full Details</span>
                        <ExternalLink className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Decorative corner elements */}
                    <div className={`absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl ${cert.color} opacity-[0.08] rounded-tl-full transition-opacity duration-500`} />
                    <div className="absolute top-0 left-0 w-2 h-16 bg-gradient-to-b from-purple-500/30 to-transparent rounded-r" />
                  </div>

                  {/* Glow effect */}
                  <div
                    className={`absolute inset-0 -z-10 bg-gradient-to-br ${cert.color} opacity-0 blur-2xl transition-all duration-500 rounded-3xl`}
                  />
                </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Working Scroll Indicator with Pagination - Outside AnimatePresence */}
          {filteredCertifications.length > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {filteredCertifications.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (scrollContainerRef.current) {
                      const container = scrollContainerRef.current;
                      const cards = container.querySelectorAll('.certificate-card');
                      const targetCard = cards[idx] as HTMLElement;

                      if (targetCard) {
                        const containerLeft = container.offsetLeft;
                        const cardLeft = targetCard.offsetLeft;
                        const containerWidth = container.offsetWidth;
                        const cardWidth = targetCard.offsetWidth;

                        // Center the card in the viewport
                        const scrollPosition = cardLeft - containerLeft - (containerWidth / 2) + (cardWidth / 2);

                        container.scrollTo({
                          left: scrollPosition,
                          behavior: 'smooth'
                        });
                      }
                    }
                  }}
                  className={`rounded-full transition-all duration-300 ${
                    idx === currentScrollIndex
                      ? "w-8 h-2 bg-gradient-to-r from-purple-500 to-pink-500"
                      : theme === "dark"
                      ? "w-2 h-2 bg-gray-600 hover:bg-gray-500"
                      : "w-2 h-2 bg-gray-400 hover:bg-gray-500"
                  }`}
                  aria-label={`Go to certificate ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Desktop/Tablet: Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={staggerContainer}
            initial="start"
            animate="end"
            exit={{ opacity: 0, scale: 0.9 }}
            className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredCertifications.map((cert) => (
              <motion.div
                key={cert.id}
                variants={scaleIn}
                layout
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative cursor-pointer"
                onClick={() => handleCertificateClick(cert.id)}
              >
                {/* Card */}
                <div className={`relative backdrop-blur-md border-2 rounded-3xl overflow-hidden hover:border-purple-500/60 hover:shadow-2xl transition-all duration-500 h-full flex flex-col ${
                  theme === "dark"
                    ? "bg-gradient-to-br from-gray-900/95 to-gray-800/90 border-gray-700/60 shadow-xl shadow-black/50"
                    : "bg-gradient-to-br from-white/95 to-slate-50/95 border-slate-300/60 shadow-xl shadow-slate-300/50"
                }`}>
                  {/* Gradient overlay on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-[0.03] group-hover:opacity-[0.12] transition-opacity duration-500`}
                  />

                  {/* Shimmer effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </div>

                  {/* Image Header */}
                  <div className={`relative h-64 overflow-hidden ${
                    theme === "dark"
                      ? "bg-gradient-to-br from-gray-800 to-gray-900"
                      : "bg-gradient-to-br from-slate-100 to-slate-200"
                  }`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-[0.08]`} />
                    <div className="relative z-10 flex items-center justify-center h-full p-6">
                      <div className="relative w-full h-full">
                        <Image
                          src={cert.image}
                          alt={cert.title}
                          fill
                          className="object-cover group-hover:scale-[1.08] transition-transform duration-500 rounded-xl shadow-2xl"
                        />
                      </div>
                    </div>

                    {/* Floating Date Badge */}
                    <div className={`absolute top-4 right-4 flex items-center gap-2 px-3 py-2 rounded-xl backdrop-blur-xl border shadow-lg group-hover:scale-105 transition-all duration-300 ${
                      theme === "dark"
                        ? "bg-black/80 border-gray-700/60"
                        : "bg-white/90 border-slate-300/60"
                    }`}>
                      <Calendar className={`w-3.5 h-3.5 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`} />
                      <span className={`text-xs font-semibold ${theme === "dark" ? "text-gray-200" : "text-gray-800"}`}>
                        {cert.date}
                      </span>
                    </div>

                    {/* Category Badge */}
                    <div className={`absolute top-4 left-4 px-4 py-2 rounded-xl backdrop-blur-xl border shadow-lg group-hover:scale-105 transition-all duration-300 ${
                      theme === "dark"
                        ? "bg-purple-500/25 border-purple-400/40"
                        : "bg-purple-500/20 border-purple-500/40"
                    }`}>
                      <span className={`text-xs font-bold ${theme === "dark" ? "text-purple-200" : "text-purple-700"}`}>
                        {cert.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 p-7 flex-1 flex flex-col">
                    {/* Title & Issuer */}
                    <h3 className={`text-xl font-bold mb-2.5 group-hover:text-purple-400 transition-colors duration-300 line-clamp-2 leading-tight ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}>
                      {cert.title}
                    </h3>
                    <p className={`font-semibold mb-4 text-sm ${
                      theme === "dark" ? "text-purple-400" : "text-purple-600"
                    }`}>
                      {cert.issuer}
                    </p>

                    {/* Description */}
                    <p className={`text-sm leading-relaxed mb-5 line-clamp-3 flex-1 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}>
                      {cert.description}
                    </p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {cert.skills.slice(0, 3).map((skill, idx) => (
                        <span
                          key={idx}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium group-hover:border-purple-500/40 group-hover:scale-105 transition-all duration-300 ${
                            theme === "dark"
                              ? "bg-gray-800/70 border-gray-700/60 text-gray-300"
                              : "bg-white/70 border-slate-300/60 text-gray-700"
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                          {skill}
                        </span>
                      ))}
                      {cert.skills.length > 3 && (
                        <span className={`inline-flex items-center px-3 py-1.5 rounded-lg border text-xs font-semibold group-hover:scale-105 transition-all duration-300 ${
                          theme === "dark"
                            ? "bg-purple-500/15 border-purple-500/40 text-purple-300"
                            : "bg-purple-500/10 border-purple-500/40 text-purple-600"
                        }`}>
                          +{cert.skills.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* View Credential Link */}
                    <Link
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 text-sm font-semibold group/link transition-all duration-300 mt-auto ${
                        theme === "dark"
                          ? "text-purple-400 hover:text-purple-300"
                          : "text-purple-600 hover:text-purple-500"
                      }`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span className="group-hover/link:underline underline-offset-4">View Full Details</span>
                      <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform duration-300" />
                    </Link>
                  </div>

                  {/* Decorative corner elements */}
                  <div className={`absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl ${cert.color} opacity-[0.08] rounded-tl-full transition-opacity duration-500 group-hover:opacity-20`} />
                  <div className="absolute top-0 left-0 w-2 h-16 bg-gradient-to-b from-purple-500/30 to-transparent rounded-r" />
                </div>

                {/* Glow effect on hover */}
                <div
                  className={`absolute inset-0 -z-10 bg-gradient-to-br ${cert.color} opacity-0 group-hover:opacity-25 blur-2xl transition-all duration-500 rounded-3xl`}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredCertifications.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800/50 border border-gray-700/50 mb-4">
              <Award className="w-8 h-8 text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              No certifications found
            </h3>
            <p className="text-gray-500 text-sm">
              Try selecting a different category
            </p>
          </motion.div>
        )}

        {/* Bottom CTA */}
        <motion.div
          variants={fadeInUp}
          initial="start"
          whileInView="end"
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            Always learning and exploring new technologies to stay ahead in the
            ever-evolving web development landscape
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;
