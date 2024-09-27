import React from 'react';

export default function CTASection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-4 text-primary">Ready to Land Your Dream Job?</h2>
        <p className="max-w-[600px] mx-auto mb-8 text-xl text-primary">
          Start creating professional, tailored cover letters today and boost your chances of getting hired.
        </p>
        <button className="bg-accent text-background py-3 px-8 rounded-md text-lg font-semibold hover:bg-secondary transition duration-200">
          Get Started Now
        </button>
      </div>
    </section>
  );
}