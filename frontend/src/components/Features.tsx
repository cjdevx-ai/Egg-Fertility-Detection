import React from 'react';

const features = [
  {
    title: 'Ultra-Fast Processing',
    description: 'Analyze each specimen in under 1.2 seconds with real-time feedback loops.',
    icon: 'lucide:zap',
    color: 'text-cyan-400',
    borderColor: 'border-cyan-500/30',
    shadowColor: 'shadow-cyan-500/20',
  },
  {
    title: 'Non-Invasive Scanning',
    description: 'Bioluminescent technology ensures 100% safety for the embryo during analysis.',
    icon: 'lucide:shield-check',
    color: 'text-purple-400',
    borderColor: 'border-purple-500/30',
    shadowColor: 'shadow-purple-500/20',
  },
  {
    title: 'Smart Analytics',
    description: 'Comprehensive dashboard for tracking fertility trends and hatchery performance.',
    icon: 'lucide:bar-chart-3',
    color: 'text-blue-400',
    borderColor: 'border-blue-500/30',
    shadowColor: 'shadow-blue-500/20',
  },
  {
    title: 'Self-Learning AI',
    description: 'Neural networks that continuously evolve and improve accuracy with every scan.',
    icon: 'lucide:refresh-ccw',
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500/30',
    shadowColor: 'shadow-emerald-500/20',
  },
];

const Features: React.FC = () => {
  return (
    <section id="technology" className="py-24 px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-6">
          Precision Technology, <span className="text-primary">Zero Effort</span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Our proprietary AI-driven scanning system eliminates human error and maximizes production efficiency through advanced computer vision.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature) => (
          <div
            key={feature.title}
            className={`glass-card p-8 rounded-[2.5rem] border ${feature.borderColor} hover:-translate-y-2 transition-all duration-300 group hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:${feature.shadowColor}`}
          >
            <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              <iconify-icon icon={feature.icon} class={`${feature.color} text-3xl`}></iconify-icon>
            </div>
            <h3 className="text-xl font-heading font-bold mb-4">{feature.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
