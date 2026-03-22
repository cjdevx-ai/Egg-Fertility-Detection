import React from 'react';

const CTA: React.FC = () => {
  return (
    <section id="pricing" className="py-24 px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      <div className="relative glass-card rounded-[4rem] border-white/10 p-12 lg:p-24 overflow-hidden group shadow-[0_0_150px_rgba(6,182,212,0.1)]">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-navy-900/80 to-cyan-900/20 -z-10 group-hover:scale-105 transition-transform duration-700"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/10 blur-[100px] rounded-full group-hover:bg-primary/20 transition-colors duration-500"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-secondary/10 blur-[100px] rounded-full group-hover:bg-secondary/20 transition-colors duration-500"></div>

        <div className="relative text-center max-w-3xl mx-auto">
          <h2 className="text-5xl lg:text-6xl font-heading font-bold mb-8 leading-tight">
            Ready to <span className="text-gradient">Optimize</span> Your Yield?
          </h2>
          <p className="text-xl text-slate-400 mb-12 leading-relaxed">
            Start your 30-day free pilot program and witness the transformation of your hatchery operations. Zero upfront hardware costs for initial deployment.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <button className="bg-primary text-navy-950 px-10 py-5 rounded-full font-bold text-lg shadow-[0_0_40px_rgba(6,182,212,0.5)] hover:scale-105 transition-transform flex items-center gap-2">
              Get Started Now
              <iconify-icon icon="lucide:sparkles" class="text-xl"></iconify-icon>
            </button>
            <button className="glass-card px-10 py-5 rounded-full font-bold text-lg hover:bg-white/10 transition-colors border border-white/10">
              Contact Sales
            </button>
          </div>
          
          <p className="mt-12 text-slate-500 text-sm font-medium tracking-wide uppercase">
            No credit card required • Unlimited scans • Full technical support
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
