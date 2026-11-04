import { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Included from '@/components/Included';
import Pricing from '@/components/Pricing';
import Program from '@/components/Program';
import Hotels from '@/components/Hotels';
import Reviews from '@/components/Reviews';
import Faq from '@/components/Faq';
import RequestSection from '@/components/RequestSection';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import type { PlanName } from '@/data/tour';

function App() {
  const [selectedPlan, setSelectedPlan] = useState<PlanName>('Стандарт');

  return (
    <div className="min-h-screen bg-white font-sans text-navy-900 antialiased">
      <Header />
      <main>
        <Hero />
        <Included />
        <Pricing onSelectPlan={setSelectedPlan} />
        <Program />
        <Hotels />
        <Reviews />
        <Faq />
        <RequestSection selectedPlan={selectedPlan} onPlanChange={setSelectedPlan} />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;
