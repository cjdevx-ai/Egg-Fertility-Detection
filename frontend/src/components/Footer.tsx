import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-950 pt-24 pb-12 px-6 lg:px-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-1 flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <div className="bg-primary p-1.5 rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                <iconify-icon icon="remix:eye-scan-line" class="text-navy-950 text-xl block"></iconify-icon>
              </div>
              <span className="text-xl font-heading font-bold tracking-tight">
                OvoScan <span className="text-primary">AI</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Leading the global transition to AI-powered avian intelligence. Empowering hatcheries with precision data and bioluminescent detection.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-primary/20 transition-colors group">
                <iconify-icon icon="ri:twitter-x-fill" class="text-slate-400 group-hover:text-primary transition-colors"></iconify-icon>
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-primary/20 transition-colors group">
                <iconify-icon icon="ri:linkedin-box-fill" class="text-slate-400 group-hover:text-primary transition-colors"></iconify-icon>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold mb-6 text-sm uppercase tracking-widest text-white">Platform</h4>
            <ul className="flex flex-col gap-4">
              {['Technology', 'Dashboard', 'Case Studies', 'API Docs'].map((item) => (
                <li key={item}><a href="#" className="text-slate-500 hover:text-primary text-sm transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold mb-6 text-sm uppercase tracking-widest text-white">Company</h4>
            <ul className="flex flex-col gap-4">
              {['About Us', 'Careers', 'Contact', 'Blog'].map((item) => (
                <li key={item}><a href="#" className="text-slate-500 hover:text-primary text-sm transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold mb-6 text-sm uppercase tracking-widest text-white">Legal</h4>
            <ul className="flex flex-col gap-4">
              {['Terms of Service', 'Privacy Policy', 'Cookie Policy', 'Security'].map((item) => (
                <li key={item}><a href="#" className="text-slate-500 hover:text-primary text-sm transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-sm">
            © 2024 OvoScan AI Technologies Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <iconify-icon icon="lucide:globe" class="text-slate-600"></iconify-icon>
            <span>Global Operations | English (US)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
