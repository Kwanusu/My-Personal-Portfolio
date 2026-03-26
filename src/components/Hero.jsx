import React, { useState } from 'react'; // Added useState
import ResumeModal from "./ResumeModal";

const Hero = () => {
  // 1. Add state to control modal visibility
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 2. Update this to trigger the modal instead of window.open
  const toggleResume = () => {
    setIsResumeOpen(!isResumeOpen);
  };

  return (
    <section 
      id="about" 
      className="pt-32 pb-20 container mx-auto px-6 flex flex-col md:flex-row items-center gap-12"
    >
      <div className="flex-1 space-y-6">
        <div className="text-[#d4af37] font-bold tracking-[0.3em] text-sm uppercase animate-pulse">
          Fullstack & DevSecOps
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
          Building Scalable <span className="text-[#d4af37]">Digital Systems</span> with Precision.
        </h1>
        
        <p className="text-slate-400 text-lg max-w-xl">
          I transform complex architectural requirements into secure, high-performance 
          web applications using Python, React, and Cloud Infrastructure.
        </p>
        
        <div className="flex flex-wrap gap-4 pt-4">
          <button 
            onClick={scrollToProjects}
            className="bg-[#d4af37] text-black px-8 py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_10px_20px_rgba(212,175,55,0.2)]"
          >
            View Case Studies
          </button>
          
          <button 
            onClick={toggleResume} // Linked to state toggle
            className="border border-[#d4af37] text-[#d4af37] px-8 py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-[#d4af37]/10 active:scale-95 transition-all"
          >
            Resume
          </button>
        </div>
      </div>

      {/* Profile Image */}
      <div className="relative group">
        <div className="absolute inset-0 bg-[#d4af37] opacity-20 blur-3xl rounded-full group-hover:opacity-40 transition-opacity" />
        <div 
          className="relative w-80 h-80 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] border-4 border-[#d4af37] 
                     shadow-[0_0_50px_rgba(212,175,55,0.2)] bg-[url('./assets/team-1.jpg')] bg-cover bg-center 
                     animate-morph hover:pause transition-all duration-700"
          style={{ 
            animation: 'morph 8s ease-in-out infinite, float 6s ease-in-out infinite' 
          }}
        />
      </div>

      {/* 3. Render the Modal component */}
      <ResumeModal 
        isOpen={isResumeOpen} 
        onClose={() => setIsResumeOpen(false)} 
      />
    </section>
  );
};

export default Hero;