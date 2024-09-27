import Link from 'next/link';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import HowItWorksSection from './components/HowitWorks';
import PricingPlansSection from './components/PricingPlansSection';
import TestimonialsSection from './components/TestimonialsSection';
import FAQSection from './components/FAQSection';
import CTASection from './components/CTASection';
import FooterSection from './components/FooterSection';
import HeaderSection from './components/HeaderSection';

export default function HomePage() {
  return (
    <main>
      <HeaderSection />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <PricingPlansSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <FooterSection />
    </main>
  );
}