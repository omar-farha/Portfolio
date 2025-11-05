"use client";
import AboutMe from "@/components/AboutMe";
import Grid from "@/components/Gride";
import Hero from "@/components/Hero";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import { FloatingActionButton } from "@/components/ui/FloatingActionButton";
import GetStore from "@/components/GetStore";
import Projects from "@/components/Projects";
import { navItems } from "@/data";
import Clients from "@/components/Clients";
import Approach from "@/components/Approach";
import Footer from "@/components/Footer";
import Experience from "@/components/Experience";
import Certifications from "@/components/Certifications";
import { useTheme } from "@/contexts/ThemeContext";

export default function Home() {
  const { theme } = useTheme();

  return (
    <div
      className={`relative flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5 transition-colors duration-300 ${
        theme === "dark" ? "bg-[#000319]" : "bg-[#E2E8F0]"
      }`}
    >
      <div className="max-w-7xl w-full">
        <FloatingNav navItems={navItems} />
        <FloatingActionButton />
        <main>
          <Hero />
          <AboutMe />
          <Experience />
          <Certifications />
          <Projects />
          <Grid />
          <GetStore />
          <Clients />
          <Approach />
        </main>
        <Footer />
      </div>
    </div>
  );
}
