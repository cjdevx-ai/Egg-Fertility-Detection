import React from 'react';

interface HeroProps {
  onStartDemo: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartDemo }) => {
  return (
    <section className="relative pt-32 pb-20 px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Content */}
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 w-fit">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-xs font-medium tracking-wide text-slate-300 uppercase">Next-Gen Avian Intelligence</span>
          </div>

          <h1 className="text-6xl lg:text-7xl font-heading font-bold leading-[1.1] tracking-tight">
            Unlock the Future of <span className="text-gradient">Egg Fertility</span> Detection.
          </h1>

          <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
            Harness the power of bioluminescent scanning and computer vision to identify fertile embryos with 99.8% accuracy. Optimize your hatchery yield with instant, non-invasive intelligence.
          </p>

          <div className="flex flex-wrap gap-4 mt-4">
            <button 
              onClick={onStartDemo}
              className="bg-primary text-navy-950 px-8 py-4 rounded-full font-bold shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:scale-105 transition-transform flex items-center gap-2 group"
            >
              Experience the Demo
              <iconify-icon icon="lucide:arrow-right" class="group-hover:translate-x-1 transition-transform"></iconify-icon>
            </button>
            <button className="glass-card px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-white/10 transition-colors border border-white/10">
              <iconify-icon icon="lucide:play" class="text-primary"></iconify-icon>
              Watch Video
            </button>
          </div>

          <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-white/5">
            {[
              { label: 'Accuracy', value: '99.8%' },
              { label: 'Scan Time', value: '1.2s' },
              { label: 'Eggs Scanned', value: '50M+' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-heading font-bold text-white">{stat.value}</div>
                <div className="text-xs text-slate-500 uppercase tracking-widest mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Content - Product Showcase */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[500px] animate-float">
            {/* Main Glass Card */}
            <div className="relative aspect-square rounded-[3rem] glass-card overflow-hidden border-primary/20 shadow-[0_0_50px_rgba(6,182,212,0.1)]">
              {/* Animated Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 opacity-40"></div>
              
              {/* Scanning Animation */}
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_20px_#06b6d4] z-10 animate-scan"></div>
              
              {/* Product Visual - Modern Tech Egg */}
              <div className="absolute inset-0 flex items-center justify-center scale-110">
                <div className="relative w-64 h-80 flex items-center justify-center">
                  {/* Outer Shell Glow */}
                  <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full animate-pulse-slow"></div>
                  
                  {/* The Tech Egg SVG */}
                  <svg viewBox="0 0 200 260" className="w-full h-full drop-shadow-[0_0_30px_rgba(6,182,212,0.4)]">
                    <defs>
                      <linearGradient id="eggShell" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
                        <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
                      </linearGradient>
                      <radialGradient id="embryoGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#06b6d4" />
                        <stop offset="70%" stopColor="#a855f7" />
                        <stop offset="100%" stopColor="transparent" />
                      </radialGradient>
                    </defs>
                    
                    {/* Shell Outline */}
                    <path 
                      d="M100,10 C50,10 10,80 10,150 C10,210 50,250 100,250 C150,250 190,210 190,150 C190,80 150,10 100,10 Z" 
                      fill="url(#eggShell)" 
                      stroke="white" 
                      strokeWidth="0.5" 
                      strokeOpacity="0.3"
                    />
                    
                    {/* Embryo Core */}
                    <circle cx="100" cy="160" r="35" fill="url(#embryoGlow)" className="animate-pulse">
                      <animate attributeName="r" values="32;38;32" dur="4s" repeatCount="indefinite" />
                    </circle>
                    
                    {/* Tech Accents */}
                    <circle cx="100" cy="160" r="55" fill="none" stroke="#06b6d4" strokeWidth="0.5" strokeDasharray="4 8" strokeOpacity="0.5" className="animate-spin-slow" />
                    <circle cx="100" cy="160" r="75" fill="none" stroke="#a855f7" strokeWidth="0.5" strokeDasharray="10 20" strokeOpacity="0.3" />
                    
                    {/* Scan Points */}
                    <rect x="98" y="20" width="4" height="4" fill="#06b6d4" opacity="0.8" />
                    <rect x="98" y="236" width="4" height="4" fill="#06b6d4" opacity="0.8" />
                    <rect x="20" y="148" width="4" height="4" fill="#06b6d4" opacity="0.8" />
                    <rect x="176" y="148" width="4" height="4" fill="#06b6d4" opacity="0.8" />
                  </svg>
                </div>
              </div>

              {/* Badges */}
              <div className="absolute top-8 left-8 glass-card px-4 py-2 rounded-2xl flex items-center gap-2 border-white/10">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-xs font-bold text-white uppercase tracking-wider">Fertile Detected</span>
                <iconify-icon icon="lucide:check-circle" class="text-emerald-500"></iconify-icon>
              </div>

              <div className="absolute bottom-8 right-8 glass-card p-4 rounded-3xl border-white/10 min-w-[200px]">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Confidence Score</span>
                  <span className="text-sm font-heading font-bold text-primary">98.8%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-secondary w-[98.8%] rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary/20 blur-[80px] rounded-full"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/20 blur-[80px] rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
