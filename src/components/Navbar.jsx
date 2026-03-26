import { useState } from 'react';
import { Sun, Moon, Terminal } from 'lucide-react';

const Navbar = () => {
  const [isDark, setIsDark] = useState(true);

  return (
    <nav className="fixed w-full z-50 bg-[#020617]/80 backdrop-blur-md border-b border-yellow-600/10 py-4">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 text-[#d4af37] font-black text-xl tracking-tighter">
          <Terminal size={24} /> JOSEPH<span>.</span>ENGINEER
        </div>
        <div className="hidden md:flex gap-8 items-center text-sm font-medium">
          {['About', 'Work', 'Contact'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-[#d4af37] transition-colors">{item}</a>
          ))}
          <button onClick={() => setIsDark(!isDark)} className="p-2 rounded-full bg-slate-800 text-[#d4af37]">
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;