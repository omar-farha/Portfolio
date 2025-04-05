import AboutMe from "@/components/AboutMe";
import Grid from "@/components/Grid";
import Hero from "@/components/Hero";
import { FloatingNav } from "@/components/ui/FloatingNavbar";

export default function Home() {
  return (
    <div className=" relative bg-[#000319] flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5 ">
      <div className=" max-w-7xl w-full">
        <FloatingNav navItems={[{ name: "Home", link: "/" }]} />
        <Hero />
        <AboutMe />
        <Grid />
      </div>
    </div>
  );
}
