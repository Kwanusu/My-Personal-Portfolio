import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getHighlighter } from 'shiki';
import { ArrowLeft, X, Terminal as TerminalIcon, Hash } from 'lucide-react';

const Terminal = ({ project }) => {
  const [highlightedCode, setHighlightedCode] = useState('');
  const [activeFile, setActiveFile] = useState(project.terminalFiles[0]);
  const highlighterRef = useRef(null);

  const files = project.terminalFiles || [];

  useEffect(() => {
    async function highlight() {
      if (!highlighterRef.current) {
        highlighterRef.current = await getHighlighter({
          themes: ['one-dark-pro'],
          langs: ['bash', 'yaml', 'javascript', 'python'],
        });
      }

      const html = highlighterRef.current.codeToHtml(activeFile.code, {
        lang: activeFile.language,
        theme: 'one-dark-pro',
      });
      setHighlightedCode(html);
    }
    highlight();
  }, [activeFile]);

  return (
    <div className="bg-[#020617] border border-white/10 rounded-[2rem] p-8 font-mono text-sm h-[600px] flex flex-col shadow-2xl transition-all duration-500 hover:border-white/20">
      {/* Terminal Header */}
      <div className="flex items-center justify-between pb-6 border-b border-white/5 mb-6">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40" />
          <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/40" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/40" />
        </div>
        <div className="text-stone-500 text-[9px] tracking-[4px] uppercase flex items-center gap-2 font-black italic">
          <TerminalIcon size={12} />
          {project.title.toLowerCase().replace(/\s+/g, '_')}.sh
        </div>
      </div>

      {/* File Navigation Tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto no-scrollbar">
        {files.map(file => (
          <button
            key={file.name}
            onClick={() => setActiveFile(file)}
            className={`px-5 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl border transition-all whitespace-nowrap ${
              activeFile.name === file.name 
                ? 'bg-white/5 text-amber-500 border-amber-500/20' 
                : 'text-stone-500 border-white/5 hover:text-white hover:bg-white/[0.02]'
            }`}
          >
            {file.name}
          </button>
        ))}
      </div>

      {/* Code Area */}
      <div className="flex-1 overflow-auto pr-4 custom-scrollbar">
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeFile.name}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
            className="shiki-container leading-relaxed opacity-90" 
            dangerouslySetInnerHTML={{ __html: highlightedCode || '<code>// Initializing_Environment...</code>' }} 
          />
        </AnimatePresence>
      </div>
    </div>
  );
};

const TerminalOverlay = ({ project, onClose }) => {
  useEffect(() => {
    if (project) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          // Ensure this container is the ONLY one handling scroll
          className="fixed inset-0 z-[100] bg-[#0c0a09]/98 backdrop-blur-3xl overflow-y-auto overflow-x-hidden"
        >
          {/* 1. THE VIEWPORT BUFFER: 
              Using padding-top on a wrapper instead of a spacer div 
              to ensure 100% view height starts with a gap. */}
          <div className="relative min-h-screen w-full py-24 lg:py-40">
            
            <motion.div 
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              // container mx-auto handles the horizontal centering
              className="container mx-auto max-w-7xl px-8 lg:px-12" 
            >
              {/* Header Controls */}
              <div className="flex justify-between items-center mb-24">
                <button 
                  onClick={onClose}
                  className="group flex items-center gap-3 text-stone-500 hover:text-white transition-all font-black text-[10px] uppercase tracking-[5px]"
                >
                  <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform text-amber-500" />
                  System_Return
                </button>
                
                <button 
                  onClick={onClose} 
                  className="w-14 h-14 rounded-full bg-white/[0.03] border border-white/10 hover:border-amber-500/50 hover:text-amber-500 transition-all flex items-center justify-center shadow-2xl"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Title Section */}
              <div className="mb-32 space-y-10">
                <div className="flex items-center gap-4">
                  <div className="h-[1px] w-12 bg-amber-500/50" />
                  <span className="text-amber-500 font-black text-[11px] uppercase tracking-[8px]">
                    Technical_Manifest // 0{project.id || 1}
                  </span>
                </div>
                
                <h2 className="text-7xl lg:text-[10rem] font-black text-white tracking-tighter leading-[0.8] uppercase italic">
                  {project.title} <br/>
                  <span className="text-stone-700/40 block">Deep_Dive_Protocol</span>
                </h2>
              </div>

              {/* Grid Layout */}
              <div className="grid lg:grid-cols-12 gap-24 items-start">
                <div className="lg:col-span-5 space-y-24">
                  
                  <div className="space-y-8">
                    <h4 className="text-stone-500 uppercase tracking-[4px] text-[10px] font-black">
                      [01] Context_Challenge
                    </h4>
                    <p className="text-white text-3xl lg:text-4xl leading-tight font-black tracking-tighter italic">
                      {project.problem}
                    </p>
                  </div>

                  <div className="space-y-8">
                    <h4 className="text-stone-500 uppercase tracking-[4px] text-[10px] font-black">
                      [02] Architecture_Logic
                    </h4>
                    <p className="text-stone-400 text-lg leading-relaxed font-medium italic border-l-2 border-amber-500/20 pl-8">
                      {project.solution}
                    </p>
                  </div>

                  <div className="pt-12 border-t border-white/5">
                    <h4 className="text-stone-600 uppercase tracking-[4px] text-[9px] font-black mb-10 italic">Core_Dependencies</h4>
                    <div className="flex gap-4 flex-wrap">
                      {project.tags?.map(t => (
                        <span key={t} className="font-mono bg-white/[0.02] border border-white/10 text-stone-400 px-6 py-3 rounded-2xl uppercase text-[9px] tracking-widest hover:border-amber-500/50 hover:text-amber-500 transition-all cursor-default">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Terminal Viewport */}
                <div className="lg:col-span-7 lg:sticky lg:top-32">
                  <Terminal project={project} />
                  <div className="mt-8 flex justify-between items-center px-6 opacity-30">
                    <span className="text-[8px] font-black text-stone-500 uppercase tracking-[4px]">System_Stable</span>
                    <Hash size={12} className="text-amber-500" />
                  </div>
                </div>
              </div>

              {/* Extra Bottom Padding to ensure the scroll feels finished */}
              <div className="h-32" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TerminalOverlay;