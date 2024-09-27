import React from 'react';
import HeaderSection from '../components/HeaderSection';
import TestimonialsSection from '../components/TestimonialsSection';
import FooterSection from '../components/FooterSection';

export default function TestimonialsPage() {
  return (
    <main className="bg-background">
      <HeaderSection />
      <div className="py-12">
        <TestimonialsSection />
      </div>
      <FooterSection />
    </main>
  );
}