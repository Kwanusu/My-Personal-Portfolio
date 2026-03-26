import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  // Hide Navbar if the path starts with /admin
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <nav className="fixed w-full z-50 bg-background/80 backdrop-blur-md border-b border-primary/10 py-4 font-inter">
      <div className="container mx-auto px-6 flex justify-between items-center">
        
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-2 text-primary font-black text-xl tracking-tighter">
          <i className="fa-solid fa-terminal text-xl"></i>
          JOSEPH<span className="text-foreground">.</span>ENGINEER
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-8 items-center text-sm font-medium">
          {['About', 'Work', 'Contact'].map(item => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="text-muted-foreground hover:text-primary transition-colors hover:text-foreground"
            >
              {item}
            </a>
          ))}

          {/* Theme Toggle Button */}
          <button 
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")} 
            className="p-2.5 rounded-xl bg-secondary/50 border border-border hover:border-primary/50 transition-all active:scale-95"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? (
              <i className="fa-solid fa-sun text-primary text-sm"></i>
            ) : (
              <i className="fa-solid fa-moon text-primary text-sm"></i>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;