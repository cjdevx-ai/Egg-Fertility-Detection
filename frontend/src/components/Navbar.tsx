import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 mx-auto max-w-7xl">
      <div className="absolute inset-0 bg-navy-900/80 backdrop-blur-xl border-b border-white/10 -z-10"></div>
      
      <div className="flex items-center gap-2 group cursor-pointer">
        <div className="bg-primary p-1.5 rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.5)]">
          <iconify-icon icon="remix:eye-scan-line" class="text-navy-950 text-xl block"></iconify-icon>
        </div>
        <span className="text-xl font-heading font-bold tracking-tight">
          OvoScan <span className="text-primary">AI</span>
        </span>
      </div>

      <div className="hidden md:flex items-center gap-8">
        {['How it Works', 'Technology', 'Case Studies', 'Pricing'].map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase().replace(/ /g, '-')}`}
            className="text-slate-400 hover:text-primary transition-colors text-sm font-medium"
          >
            {link}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-6">
        <button className="text-slate-400 hover:text-white transition-colors text-sm font-medium">
          Log In
        </button>
        <button className="bg-primary text-navy-950 px-6 py-2.5 rounded-full font-bold text-sm shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:scale-105 transition-transform active:scale-95">
          Get Started
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
