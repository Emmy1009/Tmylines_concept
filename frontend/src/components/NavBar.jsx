import React, { useState } from "react";
import { Link } from "react-router"; // Updated to the more common web import

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          
          {/* Logo & Brand Name */}
          <Link to="/" className="flex items-center gap-4 group">
            <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-slate-900 shadow-md group-hover:scale-110 transition-transform duration-300">
              <img 
                src="https://www.image2url.com/r2/default/images/1776383996260-24bd13ae-f23c-4f43-9bbc-f4898980db48.jpg" 
                alt="TMYLINES Logo" 
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-xl font-black tracking-[0.3em] text-slate-900 hidden sm:block">
              TMYLINES
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-12">
            <div className="flex space-x-8">
              <Link to="/" className="text-xs font-bold text-gray-500 hover:text-slate-900 transition-colors uppercase tracking-widest relative group">
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-slate-900 transition-all group-hover:w-full"></span>
              </Link>
              <Link to="/about" className="text-xs font-bold text-gray-500 hover:text-slate-900 transition-colors uppercase tracking-widest relative group">
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-slate-900 transition-all group-hover:w-full"></span>
              </Link>
              <Link to="/projects" className="text-xs font-bold text-gray-500 hover:text-slate-900 transition-colors uppercase tracking-widest relative group">
                Projects
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-slate-900 transition-all group-hover:w-full"></span>
              </Link>
            </div>
            <Link to="/contact" className="px-6 py-3 bg-slate-900 text-white text-[10px] font-black rounded-full hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-100 transition-all uppercase tracking-[0.2em]">
              Start a Project
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-900 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 8h16M4 16h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`${isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"} absolute top-full left-0 w-full bg-white border-b border-gray-100 transition-all duration-300 ease-in-out md:hidden -z-10`}>
        <div className="px-6 py-10 space-y-6 text-center">
          <Link to="/" onClick={() => setIsOpen(false)} className="block text-lg font-bold text-slate-900 uppercase tracking-widest">Home</Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="block text-lg font-bold text-slate-900 uppercase tracking-widest">About</Link>
          <Link to="/projects" onClick={() => setIsOpen(false)} className="block text-lg font-bold text-slate-900 uppercase tracking-widest">Projects</Link>
          <div className="pt-4">
            <Link 
              to="/contact" 
              onClick={() => setIsOpen(false)} 
              className="inline-block w-full py-4 bg-slate-900 text-white font-black rounded-xl uppercase tracking-widest text-sm"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
