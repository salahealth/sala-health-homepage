import React, { useEffect, useState } from 'react';
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-void/80 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <a href="#" className="text-2xl font-heading font-bold text-white tracking-tight">
            Sala Health
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#solutions" className="text-sm font-medium text-gray-400 hover:text-white transition-colors relative group">
            Solutions
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#sectors" className="text-sm font-medium text-gray-400 hover:text-white transition-colors relative group">
      
      
            Sectors
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#about" className="text-sm font-medium text-gray-400 hover:text-white transition-colors relative group">
            About
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#contact" className="text-sm font-medium text-gray-400 hover:text-white transition-colors relative group">
            Contact
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue transition-all duration-300 group-hover:w-full"></span>
          </a>
        </nav>

        {/* CTAs */}
        <div className="flex items-center space-x-4">
          <a href="#contact" className="hidden sm:inline-flex items-center justify-center px-5 py-2 text-sm font-medium text-white border border-white/20 hover:bg-white/5 rounded-full transition-colors">
            Request Demo
          </a>
          <a href="#contact" className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-white bg-blue hover:bg-blue-bright rounded-full transition-all shadow-lg shadow-blue/20">
            Try Sala
          </a>
        </div>
      </div>
    </header>;
}