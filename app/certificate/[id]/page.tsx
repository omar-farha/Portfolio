"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { certifications } from "@/data";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Calendar,
  Award,
  CheckCircle,
  ExternalLink,
  Share2,
} from "lucide-react";
import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";

const CertificatePage = () => {
  const params = useParams();
  const router = useRouter();
  const { theme } = useTheme();
  const certificateId = parseInt(params.id as string);

  const certificate = certifications.find((cert) => cert.id === certificateId);

  if (!certificate) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          theme === "dark" ? "bg-[#000319]" : "bg-[#E2E8F0]"
        }`}
      >
        <div className="text-center">
          <h1
            className={`text-4xl font-bold mb-4 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Certificate Not Found
          </h1>
          <button
            onClick={() => router.push("/#certifications")}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg border transition-all duration-200 ${
              theme === "dark"
                ? "bg-gray-900/50 border-gray-700/50 text-white hover:bg-gray-800/50"
                : "bg-white/50 border-gray-300 text-gray-900 hover:bg-gray-100"
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Certifications
          </button>
        </div>
      </div>
    );
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: certificate.title,
          text: `Check out my ${certificate.title} certificate from ${certificate.issuer}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark" ? "bg-[#000319]" : "bg-[#E2E8F0]"
      }`}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-20 left-10 w-72 h-72 bg-gradient-to-br ${certificate.color} opacity-10 blur-3xl rounded-full`}
        />
        <div
          className={`absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br ${certificate.color} opacity-10 blur-3xl rounded-full`}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.push("/#certifications")}
          className={`inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-lg border backdrop-blur-sm transition-all duration-200 ${
            theme === "dark"
              ? "bg-gray-900/50 border-gray-700/50 text-white hover:bg-gray-800/50"
              : "bg-white/50 border-slate-300 text-gray-900 hover:bg-gray-100"
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Certifications
        </motion.button>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Certificate Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Category Badge */}
            <div className="flex items-center gap-3">
              <span
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm border ${
                  theme === "dark"
                    ? "bg-gray-900/80 border-gray-700/50 text-white"
                    : "bg-white/90 border-slate-300/50 text-gray-900"
                }`}
              >
                <Award className="w-4 h-4" />
                {certificate.category}
              </span>
              <button
                onClick={handleShare}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm border transition-all duration-200 ${
                  theme === "dark"
                    ? "bg-gray-900/80 border-gray-700/50 text-white hover:bg-gray-800/80"
                    : "bg-white/90 border-slate-300/50 text-gray-900 hover:bg-gray-100"
                }`}
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>

            {/* Certificate Image */}
            <div
              className={`relative rounded-3xl overflow-hidden border backdrop-blur-sm ${
                theme === "dark"
                  ? "border-gray-700/50 bg-gray-900/50"
                  : "border-slate-400/50 bg-white/50 shadow-2xl"
              }`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${certificate.color} opacity-5`}
              />
              <div className="relative p-8">
                <Image
                  src={certificate.image}
                  alt={certificate.title}
                  width={800}
                  height={600}
                  className="w-full h-auto rounded-xl shadow-lg"
                  priority
                />
              </div>
            </div>

            {/* View Credential Button */}
            {certificate.credentialUrl !== "#" && (
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                href={certificate.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-2 w-full px-6 py-4 rounded-xl font-semibold transition-all duration-200 ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white"
                    : "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg"
                }`}
              >
                <span>View Official Credential</span>
                <ExternalLink className="w-5 h-5" />
              </motion.a>
            )}
          </motion.div>

          {/* Right Column - Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
            {/* Title & Issuer */}
            <div className="space-y-4">
              <h1
                className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                {certificate.title}
              </h1>

              <div className="flex items-center gap-3">
                <div
                  className={`w-3 h-3 rounded-full bg-gradient-to-r ${certificate.color}`}
                />
                <p
                  className={`text-xl md:text-2xl font-semibold ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {certificate.issuer}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Calendar
                  className={`w-5 h-5 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                />
                <p
                  className={`text-lg ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Completed in {certificate.date}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div
              className={`h-px ${
                theme === "dark" ? "bg-gray-800" : "bg-gray-300"
              }`}
            />

            {/* Description */}
            <div className="space-y-3">
              <h2
                className={`text-xl font-bold uppercase tracking-wider ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                About This Certificate
              </h2>
              <p
                className={`text-lg leading-relaxed ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {certificate.description}
              </p>
            </div>

            {/* Divider */}
            <div
              className={`h-px ${
                theme === "dark" ? "bg-gray-800" : "bg-gray-300"
              }`}
            />

            {/* Skills Section */}
            <div className="space-y-4">
              <h2
                className={`text-xl font-bold uppercase tracking-wider ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Skills Acquired
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {certificate.skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-sm ${
                      theme === "dark"
                        ? "bg-gray-900/50 border-gray-700/50"
                        : "bg-white/50 border-slate-300/50"
                    }`}
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span
                      className={`text-sm font-medium ${
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {skill}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Additional Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className={`p-6 rounded-2xl border backdrop-blur-sm ${
                theme === "dark"
                  ? "bg-gray-900/50 border-gray-700/50"
                  : "bg-white/50 border-slate-300/50"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`p-3 rounded-xl bg-gradient-to-br ${certificate.color}`}
                >
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3
                    className={`text-lg font-bold mb-2 ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Professional Achievement
                  </h3>
                  <p
                    className={`text-sm leading-relaxed ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    This certification demonstrates expertise and commitment to
                    continuous learning in the field of web development and
                    technology.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CertificatePage;
