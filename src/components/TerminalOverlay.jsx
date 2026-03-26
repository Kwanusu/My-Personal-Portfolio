import { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { getHighlighter } from 'shiki';
import { ArrowLeft } from 'lucide-react';

const Terminal = ({ project }) => {
  const [highlightedCode, setHighlightedCode] = useState('');
  const [activeFile, setActiveFile] = useState(project.terminalFiles[0]);
  const highlighterRef = useRef(null); // Cache the highlighter

  const files = project.terminalFiles || [];

  useEffect(() => {
    async function highlight() {
      // Only initialize the engine if it doesn't exist
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
    <div className="bg-[#020617] border border-white/10 rounded-2xl p-6 font-mono text-sm h-[500px] flex flex-col shadow-2xl">
      {/* Terminal Header */}
      <div className="flex items-center gap-2 pb-6 border-b border-white/5 mb-6">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        <div className="text-slate-500 text-xs tracking-widest uppercase ml-2">
          $ project-deep-dive: {project.title}
        </div>
      </div>

      {/* File Navigation Tabs */}
      <div className="flex gap-1 border-b border-white/5 mb-6 overflow-x-auto">
        {files.map(file => (
          <button
            key={file.name}
            onClick={() => setActiveFile(file)}
            className={`px-4 py-2 text-xs rounded-t-lg border-t border-x transition-colors whitespace-nowrap ${
              activeFile.name === file.name 
                ? 'bg-white/5 text-[#d4af37] border-white/10' 
                : 'text-slate-500 border-transparent hover:text-white'
            }`}
          >
            {file.name}
          </button>
        ))}
      </div>

      {/* Code Area */}
      <div className="flex-1 overflow-auto pr-2 custom-scrollbar">
        <div 
          className="shiki-container leading-relaxed" 
          dangerouslySetInnerHTML={{ __html: highlightedCode || '<code>Initializing Environment...</code>' }} 
        />
      </div>
    </div>
  );
};

const TerminalOverlay = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[100] bg-[#020617]/95 backdrop-blur-xl p-6 lg:p-12 overflow-y-auto"
      >
        <div className="container mx-auto max-w-7xl">
          <button 
          onClick={onClose}
          className="group flex items-center gap-2 text-slate-500 hover:text-[#d4af37] transition-all mb-8 font-mono text-xs uppercase tracking-[3px]"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back_to_System
        </button>
          <div className="flex justify-between items-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-black text-white tracking-tighter">
              {project.title} <span className="text-[#d4af37] italic">Deep Dive</span>
            </h2>
            <button 
              onClick={onClose} 
              className="w-12 h-12 rounded-full bg-white/5 hover:bg-[#d4af37] hover:text-dark transition-all flex items-center justify-center text-xl"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 space-y-12">
              <div className="space-y-4">
                <h4 className="text-slate-500 uppercase tracking-widest text-xs font-bold">The Problem</h4>
                <p className="text-white text-xl leading-relaxed">
                  {project.problem}
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-slate-500 uppercase tracking-widest text-xs font-bold">Architectural Solution</h4>
                <p className="text-slate-400 leading-relaxed">
                  {project.solution}
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-slate-500 uppercase tracking-widest text-xs font-bold">Stack Breakdown</h4>
                <div className="flex gap-2 flex-wrap">
                  {project.tags?.map(t => (
                    <span key={t} className="font-mono bg-white/5 border border-white/10 text-slate-300 px-3 py-1.5 rounded-lg uppercase text-[11px]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <Terminal project={project} />
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TerminalOverlay;