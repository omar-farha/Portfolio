"use client";
import AboutMe from "@/components/AboutMe";
import Grid from "@/components/Gride";
import Hero from "@/components/Hero";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import GetStore from "@/components/GetStore";
import Projects from "@/components/Projects";
import { navItems } from "@/data";
import Clients from "@/components/Clients";
import Approach from "@/components/Approach";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className=" relative bg-[#000319] flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5 ">
      <div className=" max-w-7xl w-full">
        <FloatingNav navItems={navItems} />
        <Hero />
        <AboutMe />
        <Grid />
        <Projects />
        <GetStore />
        <Clients />
        <Approach />
        <Footer />
      </div>
    </div>
  );
}
