import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WhatWeDo } from './components/WhatWeDo';
import { WhoWeServe } from './components/WhoWeServe';
import { Traction } from './components/Traction';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';
import { LandingPage, ReportPage } from './components/PhilHealthEstimatorFlow';
import { PhilHealthSpotlight } from './components/PhilHealthSpotlight';

function Homepage() {
  return (
    <div className="min-h-screen bg-void text-white font-body selection:bg-blue/20 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <WhatWeDo />
        <WhoWeServe />
        <PhilHealthSpotlight />
        <Traction />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/atomix/philhealth" element={<LandingPage />} />
        <Route path="/atomix/philhealth/report" element={<ReportPage />} />
      </Routes>
    </BrowserRouter>
  );
}
