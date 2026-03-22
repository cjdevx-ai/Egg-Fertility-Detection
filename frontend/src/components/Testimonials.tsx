import React from 'react';

const testimonials = [
  {
    name: 'Dr. Sarah Mitchell',
    title: 'Director of Operations, Global BioHatch',
    quote: "OvoScan AI has completely revolutionized our throughput. We've seen a 14% increase in successful hatch rates within the first quarter.",
    avatar: 'https://i.pravatar.cc/150?u=sarah',
    glowColor: 'hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]',
  },
  {
    name: 'Marcus Chen',
    title: 'Senior Technologist, AvianCore',
    quote: "The non-invasive scanning technology is a game-changer. Our egg mortality rate due to handling has dropped to near zero.",
    avatar: 'https://i.pravatar.cc/150?u=marcus',
    glowColor: 'hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]',
  },
  {
    name: 'Elena Rodriguez',
    title: 'Hatchery Manager, SunnySide Farms',
    quote: "Precision meets simplicity. The smart analytics dashboard gives us insights we never knew we needed. Truly impressive tech.",
    avatar: 'https://i.pravatar.cc/150?u=elena',
    glowColor: 'hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]',
  },
];

const Testimonials: React.FC = () => {
  return (
    <section id="case-studies" className="py-24 px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-6">
          Trusted by <span className="text-gradient">Industry Leaders</span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Join the growing network of high-yield hatcheries leveraging our AI platform to redefine production standards.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className={`glass-card p-8 rounded-[2.5rem] border border-white/10 transition-all duration-500 ${t.glowColor} group`}
          >
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, j) => (
                <iconify-icon key={j} icon="material-symbols:star-rounded" class="text-primary text-xl"></iconify-icon>
              ))}
            </div>
            <p className="text-slate-300 italic mb-8 leading-relaxed">
              "{t.quote}"
            </p>
            <div className="flex items-center gap-4">
              <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border-2 border-primary/20" />
              <div>
                <div className="font-heading font-bold text-white text-sm">{t.name}</div>
                <div className="text-xs text-slate-500 mt-0.5">{t.title}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
