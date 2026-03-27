import React from 'react';
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background text-muted-foreground pt-24 pb-12 border-t border-border font-inter transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <h2 className="text-primary text-2xl font-black tracking-tighter">
              JOSEPH<span className="text-foreground">.</span>
            </h2>
            <p className="leading-relaxed text-sm max-w-xs">
              Lead Architect & Technical Mentor specializing in high-availability systems and secure cloud infrastructure. Based in Nairobi, working globally.
            </p>
            <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-600 dark:text-green-400 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider border border-green-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Available for new projects
            </div>
          </div>

          {/* Sitemap */}
          <div>
            <h4 className="text-foreground font-bold uppercase text-[11px] tracking-[2px] mb-8">Sitemap</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#about" className="hover:text-primary transition-all hover:translate-x-1 inline-block">Home</a></li>
              <li><a href="#expertise" className="hover:text-primary transition-all hover:translate-x-1 inline-block">Expertise</a></li>
              <li><a href="#work" className="hover:text-primary transition-all hover:translate-x-1 inline-block">Featured Work</a></li>
              <li><a href="#contact" className="hover:text-primary transition-all hover:translate-x-1 inline-block">Contact</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-foreground font-bold uppercase text-[11px] tracking-[2px] mb-8">Social Ecosystem</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <a href="https://github.com/Kwanusu" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-primary transition-colors">
                  <i className="fa-brands fa-github w-4"></i> GitHub
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/joseph-kwanusu-009576b7" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-primary transition-colors">
                  <i className="fa-brands fa-linkedin w-4"></i> LinkedIn
                </a>
              </li>
              <li>
                <a href="https://x.com/kwanusujoseph" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-primary transition-colors">
                  <i className="fa-brands fa-x-twitter w-4"></i> X / Twitter
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Contact */}
          <div>
            <h4 className="text-foreground font-bold uppercase text-[11px] tracking-[2px] mb-8">Direct Transmission</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <a href="mailto:kwanusujoseph@gmail.com" className="flex items-center gap-3 hover:text-primary transition-colors group">
                  <i className="fa-solid fa-envelope w-4 group-hover:-rotate-12 transition-transform"></i> 
                  kwanusujoseph@gmail.com
                </a>
              </li>
              <li>
                <a href="/resume.md" download className="flex items-center gap-3 hover:text-primary transition-colors group">
                  <i className="fa-solid fa-file-pdf w-4 group-hover:scale-110 transition-transform"></i> 
                  Download_CV.md
                </a>
              </li>
              <li>
                <a 
                  href="https://calendly.com/kwanusujoseph/30min" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-primary transition-colors group"
                >
                  <i className="fa-solid fa-calendar-days w-4 group-hover:rotate-12 transition-transform"></i> 
                  Schedule_Sync
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="bg-border mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] font-mono tracking-wider uppercase">
          <p>
            &copy; {currentYear} Joseph Kwanusu. Built with <span className="text-primary">Django & React</span>.
          </p>
          <p className="text-muted-foreground/60">
            Nairobi, Kenya • 1.2864° S, 36.8172° E
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;