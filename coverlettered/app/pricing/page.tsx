import React from 'react';
import HeaderSection from '../components/HeaderSection';
import PricingPlansSection from '../components/PricingPlansSection';
import FooterSection from '../components/FooterSection';

export default function PricingPage() {
  return (
    <main className="bg-background">
      <HeaderSection />
      <div className="py-12">
        <PricingPlansSection />
      </div>
      <FooterSection />
    </main>
  );
}