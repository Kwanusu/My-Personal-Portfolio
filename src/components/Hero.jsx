import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ResumeModal from "./ResumeModal";

const Hero = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('work'); // Updated to match the Projects ID
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleResume = () => {
    setIsResumeOpen(!isResumeOpen);
  };

  return (
    <section 
      id="about" 
      className="relative pt-40 pb-24 container mx-auto px-6 flex flex-col md:flex-row items-center gap-16 overflow-hidden transition-colors duration-300"
    >
      {/* Background Accent Blur */}
      <div className="absolute top-20 left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full -z-10" />

      <div className="flex-1 space-y-8 z-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-primary font-black tracking-[0.4em] text-[10px] uppercase flex items-center gap-3"
        >
          <span className="w-8 h-[1px] bg-primary"></span>
          Fullstack Engineer & Technical Mentor
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter text-foreground"
        >
          Building Scalable <br />
          <span className="text-primary italic">Systems</span> with <br />
          Precision<span className="text-primary">.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-muted-foreground text-lg md:text-xl max-w-xl leading-relaxed font-medium"
        >
          I transform complex architectural requirements into secure, high-performance 
          digital artifacts using Python, React, and DevSecOps practices.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap gap-5 pt-6"
        >
          <button 
            onClick={scrollToProjects}
            className="group relative bg-primary text-black px-10 py-5 rounded-2xl font-black uppercase text-[11px] tracking-widest overflow-hidden transition-all active:scale-95 shadow-xl shadow-primary/20"
          >
            <span className="relative z-10">View Case Studies</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
          
          <button 
            onClick={toggleResume}
            className="group border-2 border-primary/20 text-foreground px-10 py-5 rounded-2xl font-black uppercase text-[11px] tracking-widest hover:border-primary transition-all active:scale-95 flex items-center gap-3"
          >
            Resume.md
            <i className="fa-solid fa-arrow-right -rotate-45 group-hover:rotate-0 transition-transform text-primary"></i>
          </button>
        </motion.div>
      </div>

      {/* Profile Image with Advanced Morphing */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative"
      >
        <div className="absolute inset-0 bg-primary opacity-20 blur-[80px] rounded-full animate-pulse" />
        <div 
          className="relative w-72 h-72 md:w-[450px] md:h-[450px] border-2 border-primary/30
                     shadow-[0_0_80px_rgba(212,175,55,0.15)] bg-[url('./assets/team-1.jpg')] bg-cover bg-center 
                     transition-all duration-1000 grayscale hover:grayscale-0 cursor-pointer"
          style={{ 
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
            animation: 'morph 8s ease-in-out infinite' 
          }}
        />
        
        {/* Floating Badge */}
        <div className="absolute -bottom-6 -right-6 bg-card border border-border p-6 rounded-3xl shadow-2xl backdrop-blur-md hidden md:block">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-xl">
              <i className="fa-solid fa-terminal"></i>
            </div>
            <div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Location</div>
              <div className="text-sm font-black text-foreground uppercase tracking-tighter">Nairobi, KE</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Resume Modal Portal */}
      <ResumeModal 
        isOpen={isResumeOpen} 
        onClose={() => setIsResumeOpen(false)} 
      />

      <style jsx>{`
        @keyframes morph {
          0% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
          100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
        }
      `}</style>
    </section>
  );
};

export default Hero;