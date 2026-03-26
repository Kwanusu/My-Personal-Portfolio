import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Hero from './Hero';
import SkillsBand from './SkillsBand';
import Projects from './ProjectCard';
import ContactForm from './ContactForm';

const Home = () => {
  return (
    <div className="bg-[#020617] min-h-screen selection:bg-[#d4af37] selection:text-black">
      {/* 1. NAVIGATION LAYER */}
      <Navbar />

      <main>
        {/* 2. IDENTITY LAYER */}
        <section id="about" className="relative overflow-hidden">
          {/* Subtle gold radial glow background to match your HTML's CSS */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#d4af37]/5 blur-[120px] rounded-full -z-10" />
          <Hero />
        </section>

        {/* 3. TECHNOLOGY LAYER (The Infinite Ticker) */}
        <div className="border-y border-white/5 bg-[#0f172a]">
          <SkillsBand />
        </div>

        {/* 4. PERFORMANCE LAYER (Case Studies) */}
        <section id="work" className="py-24 bg-[#020617]">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-black text-white">
                  Featured <span className="text-[#d4af37]">Work</span>
                </h2>
                <p className="text-slate-400 max-w-md">
                  A selection of enterprise projects specializing in full-stack architecture and automated deployments.
                </p>
              </div>
              <div className="h-[2px] flex-1 mx-12 bg-white/5 hidden md:block mb-4" />
            </div>
            <Projects />
          </div>
        </section>

        {/* 5. ENGAGEMENT LAYER */}
        <section id="contact" className="py-24 relative">
          {/* Lower radial glow for visual balance */}
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#d4af37]/5 blur-[100px] rounded-full -z-10" />
          <div className="container mx-auto px-6">
            <ContactForm />
          </div>
        </section>
      </main>

      {/* 6. PERSISTENCE LAYER */}
      <Footer />
    </div>
  );
};

export default Home;