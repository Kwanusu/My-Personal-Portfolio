import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Hero from './Hero';
import SkillsBand from './SkillsBand';
import Projects from './ProjectCard';
import ContactForm from './ContactForm';

const Home = () => {
  return (
    // Swapped bg-[#020617] for bg-background and selection color for primary
    <div className="bg-background text-foreground min-h-screen selection:bg-primary selection:text-black transition-colors duration-300">
      <Navbar />

      <main>
        {/* IDENTITY LAYER */}
        <section id="about" className="relative overflow-hidden">
          {/* Swapped bg-[#d4af37]/5 for bg-primary/5 */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10" />
          <Hero />
        </section>

        {/* TECHNOLOGY LAYER (The Infinite Ticker) */}
        {/* Swapped bg-[#0f172a] for bg-card and border-white/5 for border-border */}
        <div className="border-y border-border bg-card">
          <SkillsBand />
        </div>

        {/* PERFORMANCE LAYER (Case Studies) */}
        <section id="work" className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
              <div className="space-y-4">
                {/* Swapped text-white for text-foreground */}
                <h2 className="text-4xl md:text-5xl font-black text-foreground">
                  Featured <span className="text-primary">Work</span>
                </h2>
                {/* Swapped text-slate-400 for text-muted-foreground (defined in your CSS) */}
                <p className="text-muted-foreground max-w-md">
                  A selection of enterprise projects specializing in full-stack architecture and automated deployments.
                </p>
              </div>
              {/* Swapped bg-white/5 for bg-border */}
              <div className="h-[2px] flex-1 mx-12 bg-border hidden md:block mb-4" />
            </div>
            <Projects />
          </div>
        </section>

        {/* ENGAGEMENT LAYER */}
        <section id="contact" className="py-24 relative">
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 blur-[100px] rounded-full -z-10" />
          <div className="container mx-auto px-6">
            <ContactForm />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;