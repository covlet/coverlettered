import React from 'react';
import HeaderSection from '../components/HeaderSection';
import FooterSection from '../components/FooterSection';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#003366]">
      <HeaderSection />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <FooterSection />
    </div>
  );
}