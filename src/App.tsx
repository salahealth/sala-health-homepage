import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Mission } from './components/Mission';
import { Team } from './components/Team';
import { Impact } from './components/Impact';
import { Embed } from './components/Embed';
import { Footer } from './components/Footer';
import { LandingPage, ReportPage } from './components/PhilHealthEstimatorFlow';

function Homepage() {
  return (
    <div className="w-full bg-bone text-ink">
      <Nav />
      <main>
        <Hero />
        <Mission />
        <Team />
        <Impact />
        <Embed />
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
