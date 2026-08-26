import CommandCenter from "../components/background/CommandCenter";

import Navbar from "../components/layout/Navbar";
import Hero from "../components/sections/Hero";
import Features from "../components/sections/Features";
import HowItWorks from "../components/sections/HowItWorks";
import Stats from "../components/sections/Stats";
import Footer from "../components/layout/Footer";

export default function HomePage() {
  return (
    <div className="relative bg-slate-950 overflow-x-hidden">

      {/* Global Animated Background */}
      <CommandCenter />

      {/* Website Content */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Features />
        <HowItWorks />
        <Stats />
        <Footer />
      </div>
      

    </div>
  );
}