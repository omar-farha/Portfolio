"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { competitions } from "@/data";
import {
  Trophy,
  Medal,
  Calendar,
  MapPin,
  Award,
  Users,
  X,
  ChevronLeft,
  ChevronRight,
  Images,
  ZoomIn,
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Flag } from "./ui/Flag";

type Competition = (typeof competitions)[number];
type Certificate = { src: string; label: string };
type Gallery = { certs: Certificate[]; index: number };

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

const placeStyles: Record<number, { label: string; gradient: string }> = {
  1: { label: "1st", gradient: "from-yellow-200 via-amber-400 to-amber-600" },
  2: { label: "2nd", gradient: "from-slate-100 via-slate-300 to-slate-500" },
  3: { label: "3rd", gradient: "from-orange-200 via-orange-400 to-orange-700" },
};

// Feeds the cursor position to CSS so the card's spotlight follows the mouse
const trackPointer = (e: React.PointerEvent<HTMLElement>) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
};

const MedalBadge = ({ place }: { place: number }) => {
  const p = placeStyles[place];
  return (
    <div
      className={`w-16 h-16 text-xl flex-shrink-0 rounded-full bg-gradient-to-br ${p.gradient} ring-4 ring-black/20 shadow-lg shadow-amber-500/20 flex flex-col items-center justify-center font-black text-gray-900 leading-none`}
    >
      <Medal className="w-5 h-5 mb-0.5" />
      {p.label}
    </div>
  );
};

const Competitions = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [gallery, setGallery] = useState<Gallery | null>(null);
  const closeGallery = useCallback(() => setGallery(null), []);

  const winners = competitions.filter((c) => c.place);
  const [featured, ...rest] = [...winners, ...competitions.filter((c) => !c.place)];

  const stats = [
    { value: competitions.filter((c) => c.place === 1).length, label: "Gold Medals", icon: Trophy },
    { value: winners.length, label: "Podium Finishes", icon: Medal },
    { value: competitions.length, label: "Competitions", icon: Award },
  ];

  const muted = isDark ? "text-gray-400" : "text-gray-600";
  const heading = isDark ? "text-white" : "text-gray-900";
  const panel = isDark
    ? "bg-gray-900/70 border-gray-800 hover:border-amber-400/40"
    : "bg-white/80 border-slate-300 shadow-lg hover:border-amber-500/50";
  const spotlight = isDark
    ? "radial-gradient(420px circle at var(--x) var(--y), rgba(251,191,36,0.10), transparent 40%)"
    : "radial-gradient(420px circle at var(--x) var(--y), rgba(245,158,11,0.12), transparent 40%)";

  const Spotlight = () => (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      style={{ background: spotlight }}
    />
  );

  const ResultPill = ({ c }: { c: Competition }) => (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold backdrop-blur-md border ${
        c.place
          ? "bg-amber-400/90 border-amber-300 text-gray-900"
          : "bg-black/60 border-white/15 text-white"
      }`}
    >
      {c.place ? <Trophy className="w-3 h-3" /> : <Award className="w-3 h-3" />}
      {c.result}
    </span>
  );

  const Meta = ({ c }: { c: Competition }) => (
    <div className={`flex items-center gap-3 text-xs ${muted}`}>
      <span className="inline-flex items-center gap-1 flex-shrink-0">
        <Calendar className="w-3.5 h-3.5" />
        {c.date}
      </span>
      <span className="inline-flex items-center gap-1 min-w-0">
        <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
        <span className="truncate">{c.location}</span>
      </span>
    </div>
  );

  return (
    <section className="py-20 relative overflow-hidden" id="competitions">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
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
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-4 ${
              isDark ? "bg-amber-500/10 border-amber-500/20" : "bg-amber-500/5 border-amber-500/30"
            }`}
          >
            <Trophy className="w-5 h-5 text-amber-400" />
            <span className={`text-sm font-medium ${isDark ? "text-amber-400" : "text-amber-600"}`}>
              Competitions & Hackathons
            </span>
          </div>
          <h2 className={`text-4xl md:text-5xl font-bold mt-4 ${heading}`}>
            Building Under{" "}
            <span className="bg-gradient-to-r from-amber-300 to-orange-500 bg-clip-text text-transparent">
              Pressure
            </span>
          </h2>
          <p className={`mt-4 max-w-2xl mx-auto ${muted}`}>
            National and international competitions where I designed, built and
            presented solutions against the clock
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto space-y-6">
          {/* Stats */}
          <motion.div
            variants={fadeInUp}
            initial="start"
            whileInView="end"
            viewport={{ once: true }}
            className={`grid grid-cols-3 rounded-2xl border divide-x ${
              isDark ? "bg-gray-900/70 border-gray-800 divide-gray-800" : "bg-white/80 border-slate-300 divide-slate-300"
            }`}
          >
            {stats.map(({ value, label, icon: Icon }) => (
              <div key={label} className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3 py-5 px-2">
                <Icon className="w-5 h-5 text-amber-400" />
                <span className="text-3xl font-bold bg-gradient-to-r from-amber-300 to-orange-500 bg-clip-text text-transparent">
                  {value}
                </span>
                <span className={`text-xs sm:text-sm text-center ${muted}`}>{label}</span>
              </div>
            ))}
          </motion.div>

          {/* Featured win */}
          {featured && (
            <motion.article
              variants={fadeInUp}
              initial="start"
              whileInView="end"
              viewport={{ once: true }}
              onPointerMove={trackPointer}
              className={`group relative overflow-hidden rounded-3xl border transition-colors duration-300 ${panel}`}
            >
              <Spotlight />
              {/* Gold accent line */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-300 via-amber-500 to-orange-500" />

              {/* Country watermark */}
              {featured.country && (
                <span
                  aria-hidden="true"
                  className={`hidden md:block pointer-events-none select-none absolute -bottom-6 right-4 text-[7rem] md:text-[10rem] font-black leading-none tracking-tighter ${
                    isDark ? "text-white/[0.03]" : "text-slate-900/[0.04]"
                  }`}
                >
                  {featured.country.toUpperCase()}
                </span>
              )}

              <div className="relative z-10 grid md:grid-cols-[1fr_auto] gap-6 md:gap-10 items-center p-5 md:p-10">
                <div className="min-w-0">
                  <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
                    {featured.place && <div className="scale-75 sm:scale-100 -m-2 sm:m-0"><MedalBadge place={featured.place} /></div>}
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.12em] sm:tracking-[0.2em] text-amber-500">
                        International Winner
                      </p>
                      <p className={`text-sm font-medium mt-1 ${heading}`}>{featured.result}</p>
                    </div>
                  </div>

                  {featured.country ? (
                    <>
                      <h3 className={`text-[1.7rem] sm:text-3xl md:text-5xl font-black leading-tight ${heading}`}>
                        Gold Medal in{" "}
                        <span className="whitespace-nowrap">
                          <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-orange-500 bg-clip-text text-transparent">
                            {featured.country}
                          </span>
                          <Flag country={featured.country} className="inline-block align-middle ml-3 w-9 h-[18px] md:w-14 md:h-7" />
                        </span>
                      </h3>
                      <p className={`text-sm sm:text-lg md:text-xl font-semibold mt-2 ${isDark ? "text-gray-200" : "text-gray-800"}`}>
                        {featured.title}
                      </p>
                    </>
                  ) : (
                    <h3 className={`text-2xl md:text-3xl font-bold leading-tight ${heading}`}>{featured.title}</h3>
                  )}
                  <p className="text-sm font-semibold text-amber-500 mt-2">{featured.category}</p>

                  {featured.representing && featured.country && (
                    <div className={`inline-flex flex-wrap items-center gap-2 mt-4 px-3 py-2 rounded-xl border text-xs sm:text-sm font-medium max-w-full ${
                      isDark ? "bg-gray-800/60 border-gray-700 text-gray-200" : "bg-slate-100 border-slate-300 text-slate-700"
                    }`}>
                      <span className="hidden sm:inline text-xs uppercase tracking-wider text-amber-500 font-bold">Represented</span>
                      <Flag country={featured.representing} className="w-6 h-4" />
                      {featured.representing}
                      <span className={muted}>→</span>
                      <Flag country={featured.country} className="w-6 h-3" />
                      {featured.country}
                    </div>
                  )}

                  <div className="mt-3">
                    <Meta c={featured} />
                  </div>

                  <p className={`hidden sm:block mt-4 text-base leading-relaxed ${muted}`}>{featured.description}</p>

                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-4 sm:mt-5">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-medium border ${
                      isDark ? "bg-gray-800/60 border-gray-700 text-gray-200" : "bg-slate-100 border-slate-300 text-slate-700"
                    }`}>
                      <Users className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                      {featured.stat}
                    </span>
                    {featured.highlights.map((h) => (
                      <span
                        key={h}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-medium border ${
                          isDark ? "bg-gray-800/60 border-gray-700 text-gray-200" : "bg-slate-100 border-slate-300 text-slate-700"
                        }`}
                      >
                        <Medal className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                        {h}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Certificate stack — fans out on hover */}
                {featured.certificates.length > 0 && (
                  <div className="relative mx-auto w-full max-w-[220px] h-[150px] sm:max-w-[340px] sm:h-[250px]">
                    {featured.certificates
                      .map((cert, i) => ({ cert, i }))
                      .reverse()
                      .map(({ cert, i }) => (
                        <button
                          key={cert.src}
                          type="button"
                          onClick={() => setGallery({ certs: featured.certificates, index: i })}
                          aria-label={`View certificate: ${cert.label}`}
                          className={`absolute left-1/2 top-1/2 w-[70%] sm:w-[290px] aspect-[1.414] rounded-xl overflow-hidden border-4 border-white shadow-2xl transition-transform duration-500 ease-out hover:!z-20 ${
                            i === 0
                              ? "-translate-x-1/2 -translate-y-1/2 rotate-0 z-10 group-hover:-translate-y-[60%]"
                              : i === 1
                              ? "-translate-x-[42%] -translate-y-[46%] rotate-6 group-hover:-translate-x-[20%] group-hover:rotate-[10deg]"
                              : "-translate-x-[58%] -translate-y-[54%] -rotate-6 group-hover:-translate-x-[80%] group-hover:-rotate-[10deg]"
                          }`}
                        >
                          <Image src={cert.src} alt={cert.label} fill sizes="300px" className="object-cover" />
                        </button>
                      ))}
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-20 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 text-white text-xs whitespace-nowrap">
                      <Images className="w-3.5 h-3.5" />
                      {featured.certificates.length} certificates
                    </span>
                  </div>
                )}
              </div>
            </motion.article>
          )}

          {/* All other competitions — uniform cards, last row centered */}
          <motion.div
            variants={staggerContainer}
            initial="start"
            whileInView="end"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-wrap justify-center gap-6"
          >
            {rest.map((c) => {
              const cover = c.certificates[0];
              return (
                <motion.article
                  key={c.id}
                  variants={fadeInUp}
                  whileHover={{ y: -6 }}
                  onPointerMove={trackPointer}
                  className={`group relative flex flex-col overflow-hidden rounded-3xl border transition-colors duration-300 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] ${panel}`}
                >
                  <Spotlight />

                  {/* Cover */}
                  <div className="relative h-44 overflow-hidden">
                    {cover ? (
                      <button
                        type="button"
                        onClick={() => setGallery({ certs: c.certificates, index: 0 })}
                        aria-label={`View certificates for ${c.title}`}
                        className="absolute inset-0 w-full h-full"
                      >
                        <Image
                          src={cover.src}
                          alt={cover.label}
                          fill
                          sizes="(max-width: 768px) 100vw, 380px"
                          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        />
                        <span className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-colors">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 text-gray-900 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                            <ZoomIn className="w-3.5 h-3.5" />
                            View certificate{c.certificates.length > 1 ? "s" : ""}
                          </span>
                        </span>
                      </button>
                    ) : (
                      <div
                        className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br ${
                          isDark ? "from-amber-500/20 via-gray-900 to-gray-900" : "from-amber-200/70 via-white to-slate-100"
                        }`}
                      >
                        <Trophy className="w-20 h-20 text-amber-400/40" strokeWidth={1.25} />
                      </div>
                    )}

                    {/* Fade cover into card body */}
                    <div className={`pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t ${
                      isDark ? "from-gray-900" : "from-white"
                    } to-transparent`} />

                    <div className="pointer-events-none absolute top-3 left-3">
                      <ResultPill c={c} />
                    </div>
                    {c.certificates.length > 1 && (
                      <span className="pointer-events-none absolute bottom-3 right-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/70 text-white text-[11px] font-medium">
                        <Images className="w-3 h-3" />
                        {c.certificates.length}
                      </span>
                    )}
                  </div>

                  {/* Body */}
                  <div className="relative z-10 flex flex-col flex-1 p-6 pt-3">
                    <Meta c={c} />
                    <h3 className={`text-lg font-bold leading-snug mt-3 ${heading}`}>{c.title}</h3>
                    <p className="text-sm font-medium text-amber-500 mt-1">{c.category}</p>
                    <p className={`text-sm leading-relaxed mt-3 line-clamp-3 ${muted}`}>{c.description}</p>

                    {c.highlights.length > 0 && (
                      <ul className="mt-3 space-y-1">
                        {c.highlights.map((h) => (
                          <li key={h} className={`flex items-center gap-2 text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                            <Medal className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className={`mt-auto pt-4 border-t flex items-center gap-1.5 text-xs font-medium ${
                      isDark ? "border-gray-800 text-gray-300" : "border-slate-200 text-slate-700"
                    }`}>
                      <Users className="w-3.5 h-3.5 text-amber-400" />
                      {c.stat}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </div>

      <CertificateGallery gallery={gallery} setGallery={setGallery} onClose={closeGallery} />
    </section>
  );
};

const CertificateGallery = ({
  gallery,
  setGallery,
  onClose,
}: {
  gallery: Gallery | null;
  setGallery: React.Dispatch<React.SetStateAction<Gallery | null>>;
  onClose: () => void;
}) => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const total = gallery?.certs.length ?? 0;

  const step = useCallback(
    (dir: 1 | -1) =>
      setGallery((g) => (g ? { ...g, index: (g.index + dir + g.certs.length) % g.certs.length } : g)),
    [setGallery]
  );

  const isOpen = gallery !== null;
  useEffect(() => {
    if (!isOpen) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, step]);

  const cert = gallery?.certs[gallery.index];

  return (
    <AnimatePresence>
      {gallery && cert && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={cert.label}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[6000] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
        >
          <motion.figure
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 250 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close certificate"
              className="absolute -top-12 right-0 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative aspect-[1.414] w-full overflow-hidden rounded-2xl shadow-2xl bg-white">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={cert.src}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0"
                >
                  <Image src={cert.src} alt={cert.label} fill sizes="(max-width: 1024px) 100vw, 900px" className="object-contain" />
                </motion.div>
              </AnimatePresence>
            </div>

            {total > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous certificate"
                  className="absolute left-2 md:-left-14 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 md:bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next certificate"
                  className="absolute right-2 md:-right-14 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 md:bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            <figcaption className="mt-4 flex items-center justify-center gap-3 text-sm text-gray-300">
              <span>{cert.label}</span>
              {total > 1 && (
                <span className="px-2 py-0.5 rounded-md bg-white/10 text-xs">
                  {gallery.index + 1} / {total}
                </span>
              )}
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Competitions;
