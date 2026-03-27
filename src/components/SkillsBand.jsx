import React from 'react';
import { 
  Code2, 
  Terminal, 
  ShieldCheck, 
  Layers, 
  Container, 
  Cloud, 
  Database,
  Cpu
} from "lucide-react";

const SkillsBand = () => {
  const skills = [
    { name: "PYTHON / DJANGO", icon: <Terminal className="w-5 h-5" /> },
    { name: "REACT & NEXT.JS", icon: <Code2 className="w-5 h-5" /> },
    { name: "DOCKER & K8S", icon: <Container className="w-5 h-5" /> },
    { name: "DEVSECOPS", icon: <ShieldCheck className="w-5 h-5" /> },
    { name: "AWS CLOUD", icon: <Cloud className="w-5 h-5" /> },
    { name: "NODE.JS / EXPRESS", icon: <Layers className="w-5 h-5" /> },
    { name: "POSTGRESQL", icon: <Database className="w-5 h-5" /> },
    { name: "CI/CD PIPELINES", icon: <Cpu className="w-5 h-5" /> },
  ];

  // Duplicating for seamless infinite loop
  const duplicatedSkills = [...skills, ...skills, ...skills];

  return (
    <div className="w-full bg-card/50 backdrop-blur-sm py-10 overflow-hidden border-y border-border transition-colors duration-300">
      <div className="flex whitespace-nowrap overflow-hidden">
        {/* The Animation Container */}
        <div className="flex animate-scroll hover:[animation-play-state:paused] cursor-default">
          {duplicatedSkills.map((skill, index) => (
            <div 
              key={index} 
              className="flex items-center gap-5 px-10 text-muted-foreground group transition-colors"
            >
              <span className="text-primary group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
                {skill.icon}
              </span>
              <span className="text-xs font-black tracking-[4px] uppercase group-hover:text-foreground transition-colors">
                {skill.name}
              </span>
              
              {/* Separator Bullet */}
              <div className="ml-10 w-1 h-1 rounded-full bg-primary/20 group-last:hidden" />
            </div>
          ))}
        </div>
      </div>

      {/* Tailwind CSS for the scroll animation if not in your global CSS */}
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-scroll {
          display: flex;
          width: fit-content;
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default SkillsBand;