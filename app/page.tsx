"use client";
import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import HowItWorks from "../components/home/HowItWorks";
import DemoMock from "../components/home/DemoMock";
import FinalCTA from "../components/home/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen text-fg-100 relative overflow-hidden">
      <Hero />
      <main>
        <Features />
        <HowItWorks />
        <DemoMock />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
