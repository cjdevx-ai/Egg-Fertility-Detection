import React from 'react';

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="glass-card rounded-[3rem] border-white/10 p-8 lg:p-16 flex flex-col lg:flex-row gap-16 items-center shadow-[0_0_100px_rgba(6,182,212,0.05)]">
        {/* Left Side */}
        <div className="lg:w-1/2 flex flex-col gap-8">
          <div className="text-sm font-bold text-primary uppercase tracking-[0.2em]">The Evolution</div>
          <h2 className="text-4xl lg:text-5xl font-heading font-bold leading-tight">
            Designed for Precision <br /> Built for Scale.
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed">
            Transitioning from manual inspection to automated AI-scanning transforms hatchery operations from labor-intensive guesswork to data-driven precision.
          </p>
          
          <ul className="flex flex-col gap-5 mt-4">
            {[
              'Seamless integration with existing conveyor lines',
              'Real-time data synchronization with ERP systems',
              'Advanced reporting on embryo development stages',
              'Global remote management and monitoring'
            ].map((benefit) => (
              <li key={benefit} className="flex items-start gap-4 group">
                <div className="bg-primary/10 p-1 rounded-full group-hover:bg-primary/20 transition-colors">
                  <iconify-icon icon="lucide:check" class="text-primary text-sm"></iconify-icon>
                </div>
                <span className="text-slate-300 font-medium">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side - Image Grid */}
        <div className="lg:w-1/2 grid grid-cols-2 gap-4">
          {[
            'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=400',
            'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400',
            'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=400',
            'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400',
          ].map((url, i) => (
            <div key={i} className={`relative rounded-3xl overflow-hidden aspect-square border border-white/5 ${i % 2 !== 0 ? 'mt-8' : '-mt-8'}`}>
              <img 
                src={url} 
                alt="Product visual" 
                className="w-full h-full object-cover opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-500 grayscale hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
