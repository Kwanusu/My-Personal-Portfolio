import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { X, Download, FileText, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ResumeModal = ({ isOpen, onClose }) => {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      // Fetching directly from the public folder
      fetch('/resume.md')
        .then((res) => {
          if (!res.ok) throw new Error("Resume mapping failed");
          return res.text();
        })
        .then((text) => {
          setContent(text);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Link Failure:", err);
          setIsLoading(false);
        });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[150] bg-black/95 backdrop-blur-xl p-4 lg:p-12 overflow-y-auto custom-scrollbar"
      >
        <div className="max-w-4xl mx-auto relative">
          {/* Header */}
          <div className="sticky top-0 bg-[#020617]/90 backdrop-blur-md py-6 mb-8 border-b border-white/5 flex justify-between items-center z-10">
            <div className="flex items-center gap-3">
              <FileText className="text-[#d4af37]" size={20} />
              <h2 className="text-sm font-black uppercase tracking-[4px] text-white">
                CORE_RESUME<span className="text-[#d4af37]">.MD</span>
              </h2>
            </div>
            <div className="flex gap-3">
              <a 
                href="/resume.md" 
                download 
                className="p-3 bg-white/5 hover:bg-[#d4af37] hover:text-black rounded-xl transition-all"
              >
                <Download size={18} />
              </a>
              <button 
                onClick={onClose} 
                className="p-3 bg-white/5 hover:bg-red-500/20 hover:text-red-500 rounded-xl transition-all"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="min-h-[60vh] flex flex-col">
            {isLoading ? (
              <div className="flex-1 flex items-center justify-center">
                <Loader2 className="animate-spin text-[#d4af37]" size={32} />
              </div>
            ) : (
              <div className="prose prose-invert prose-slate max-w-none 
                prose-headings:text-[#d4af37] prose-headings:font-black prose-headings:tracking-tighter
                prose-strong:text-white prose-a:text-[#d4af37] prose-code:text-primary
                pb-24 font-mono text-sm leading-relaxed"
              >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {content}
                </ReactMarkdown>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ResumeModal;