import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WhatWeDo } from './components/WhatWeDo';
import { WhoWeServe } from './components/WhoWeServe';
import { Traction } from './components/Traction';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';
export function App() {
  return <div className="min-h-screen bg-void text-white font-body selection:bg-blue/20 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <WhatWeDo />
        <WhoWeServe />
        <Traction />
        <CTASection />
      </main>
      <Footer />
    </div>;
}