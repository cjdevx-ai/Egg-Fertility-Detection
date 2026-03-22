import React, { useState } from 'react';
import BackgroundCanvas from './components/BackgroundCanvas';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Footer from './components/Footer';
import DemoMode from './components/DemoMode';

const App: React.FC = () => {
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  return (
    <div className="font-sans antialiased">
      <BackgroundCanvas />
      <Navbar />
      <main>
        <Hero onStartDemo={() => setIsDemoOpen(true)} />
        <Features />
        <HowItWorks />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
      <DemoMode isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </div>
  );
};

export default App;
