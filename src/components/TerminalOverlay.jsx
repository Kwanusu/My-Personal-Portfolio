import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getHighlighter } from 'shiki';
import { ArrowLeft, X, Terminal as TerminalIcon } from 'lucide-react';

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
    <div className="bg-[#020617] border border-white/10 rounded-2xl p-6 font-mono text-sm h-[500px] flex flex-col shadow-2xl transition-colors duration-300">
      {/* Terminal Header */}
      <div className="flex items-center gap-2 pb-6 border-b border-white/5 mb-6">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        <div className="text-slate-500 text-[10px] tracking-widest uppercase ml-2 flex items-center gap-2">
          <TerminalIcon size={12} />
          deep-dive: {project.title.toLowerCase().replace(/\s+/g, '-')}
        </div>
      </div>

      {/* File Navigation Tabs */}
      <div className="flex gap-1 border-b border-white/5 mb-6 overflow-x-auto no-scrollbar">
        {files.map(file => (
          <button
            key={file.name}
            onClick={() => setActiveFile(file)}
            className={`px-4 py-2 text-[11px] rounded-t-lg border-t border-x transition-all whitespace-nowrap ${
              activeFile.name === file.name 
                ? 'bg-white/5 text-primary border-white/10' 
                : 'text-slate-500 border-transparent hover:text-white'
            }`}
          >
            {file.name}
          </button>
        ))}
      </div>

      {/* Code Area */}
      <div className="flex-1 overflow-auto pr-2 custom-scrollbar">
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeFile.name}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="shiki-container leading-relaxed" 
            dangerouslySetInnerHTML={{ __html: highlightedCode || '<code>Initializing Environment...</code>' }} 
          />
        </AnimatePresence>
      </div>
    </div>
  );
};

const TerminalOverlay = ({ project, onClose }) => {
  // Prevent scrolling on body when overlay is open
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
          className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl p-6 lg:p-12 overflow-y-auto"
        >
          <motion.div 
            initial={{ y: 20, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 20, scale: 0.98 }}
            className="container mx-auto max-w-7xl"
          >
            <button 
              onClick={onClose}
              className="group flex items-center gap-2 text-muted-foreground hover:text-primary transition-all mb-8 font-mono text-[10px] uppercase tracking-[3px]"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              Back_to_System
            </button>

            <div className="flex justify-between items-start mb-16 gap-6">
              <div className="space-y-4">
                <span className="text-primary font-mono text-xs uppercase tracking-[4px]">Documentation // 0{project.id || 1}</span>
                <h2 className="text-4xl lg:text-7xl font-black text-foreground tracking-tighter">
                  {project.title} <span className="text-primary italic">Deep Dive</span>
                </h2>
              </div>
              <button 
                onClick={onClose} 
                className="w-14 h-14 rounded-full bg-card border border-border hover:bg-red-500/20 hover:text-red-500 transition-all flex items-center justify-center text-xl shadow-xl"
              >
                <X size={24} />
              </button>
            </div>

            <div className="grid lg:grid-cols-12 gap-16">
              <div className="lg:col-span-5 space-y-12">
                <div className="space-y-4">
                  <h4 className="text-muted-foreground uppercase tracking-widest text-[10px] font-bold">The Challenge</h4>
                  <p className="text-foreground text-xl lg:text-2xl leading-tight font-medium">
                    {project.problem}
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-muted-foreground uppercase tracking-widest text-[10px] font-bold">Architectural Solution</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.solution}
                  </p>
                </div>

                <div className="space-y-6 pt-6 border-t border-border">
                  <h4 className="text-muted-foreground uppercase tracking-widest text-[10px] font-bold">System Stack</h4>
                  <div className="flex gap-3 flex-wrap">
                    {project.tags?.map(t => (
                      <span key={t} className="font-mono bg-card border border-border text-foreground px-3 py-1.5 rounded-md uppercase text-[10px] tracking-wider">
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TerminalOverlay;