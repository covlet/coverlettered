import React from 'react';
import HeaderSection from '../components/HeaderSection';
import FeaturesSection from '../components/FeaturesSection';
import FooterSection from '../components/FooterSection';

export default function FeaturesPage() {
  return (
    <main className="bg-background">
      <HeaderSection />
      <div className="py-12">
        <FeaturesSection />
      </div>
      <FooterSection />
    </main>
  );
}