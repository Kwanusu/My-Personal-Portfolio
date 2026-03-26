const Hero = () => (
  <section id="about" className="pt-32 pb-20 container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
    <div className="flex-1 space-y-6">
      <div className="text-[#d4af37] font-bold tracking-[0.3em] text-sm uppercase">Fullstack & DevSecOps</div>
      <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
        Building Scalable <span className="text-[#d4af37]">Digital Systems</span> with Precision.
      </h1>
      <p className="text-slate-400 text-lg max-w-xl">
        I transform complex architectural requirements into secure, high-performance web applications using Python, React, and Cloud Infrastructure.
      </p>
      <div className="flex gap-4">
        <button className="bg-[#d4af37] text-black px-8 py-4 rounded-xl font-bold hover:scale-105 transition-all">View Case Studies</button>
        <button className="border border-[#d4af37] text-[#d4af37] px-8 py-4 rounded-xl font-bold hover:bg-[#d4af37]/10 transition-all">Resume</button>
      </div>
    </div>
    <div className="w-80 h-80 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] border-4 border-[#d4af37] shadow-[0_0_50px_rgba(212,175,55,0.2)] bg-[url('/profile.jpg')] bg-cover animate-morph"></div>
  </section>
);
export default Hero;