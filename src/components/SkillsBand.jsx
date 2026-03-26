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

  // Double the array to create a seamless loop
  const duplicatedSkills = [...skills, ...skills];

  return (
    <div className="w-full bg-[#0f172a] py-8 overflow-hidden border-y border-[#d4af37]/10">
      <div className="flex whitespace-nowrap">
        <div className="flex animate-scroll hover:[animation-play-state:paused] cursor-default">
          {duplicatedSkills.map((skill, index) => (
            <div 
              key={index} 
              className="flex items-center gap-4 px-12 text-[#94a3b8] group transition-colors"
            >
              <span className="text-[#d4af37] group-hover:scale-110 transition-transform duration-300">
                {skill.icon}
              </span>
              <span className="text-sm font-black tracking-[3px] uppercase group-hover:text-white transition-colors">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsBand;