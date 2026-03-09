import React from 'react';
export function Footer() {
  return <footer className="bg-void text-white py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between">
        <div className="mb-6 md:mb-0 flex flex-col items-center md:items-start">
          <span className="text-xl font-heading font-bold tracking-tight mb-2 text-white">
            Sala Health
          </span>
          <span className="text-sm text-gray-500 font-body">
            © 2025 Sala Health. All rights reserved.
          </span>
        </div>

        <nav className="flex items-center space-x-8">
          <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">
            Privacy
          </a>
          <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">
            Terms
          </a>
          <a href="#contact" className="text-sm text-gray-500 hover:text-white transition-colors">
            Contact
          </a>
        </nav>
      </div>
    </footer>;
}