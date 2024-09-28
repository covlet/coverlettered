'use client';

import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const plan = {
  name: "Pro",
  price: "$19.99",
  period: "per month",
  features: [
    "Unlimited cover letters",
    "Advanced AI customization",
    "Real-time editing and feedback",
    "AI-powered job description analysis",
    "Priority email support",
  ]
};

export default function PricingPlansSection() {
  const handleSubscribe = async () => {
    console.log('Subscribe button clicked');
    try {
      const stripe = await stripePromise;
      console.log('Stripe loaded:', !!stripe);

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const { sessionId } = await response.json();
      console.log('Received session ID:', sessionId);

      if (!stripe) {
        console.error('Stripe has not loaded correctly');
        // Fallback to direct URL
        window.location.href = `https://checkout.stripe.com/pay/${sessionId}`;
        return;
      }

      const result = await stripe.redirectToCheckout({ sessionId });
      console.log('Redirect result:', result);

      if (result.error) {
        console.error('Stripe redirect error:', result.error);
        // Fallback to direct URL if there's an error
        window.location.href = `https://checkout.stripe.com/pay/${sessionId}`;
      }
    } catch (error) {
      console.error('Error in handleSubscribe:', error);
    }
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-primary">Choose Your Plan</h2>
        <div className="max-w-md mx-auto">
          <div className="bg-primary p-8 rounded-lg shadow-lg flex flex-col">
            <h3 className="text-2xl font-bold mb-4 text-background">{plan.name}</h3>
            <div className="text-4xl font-bold mb-2 text-background">{plan.price}</div>
            <div className="text-background mb-6">{plan.period}</div>
            <ul className="mb-8 flex-grow">
              {plan.features.map((feature, i) => (
                <li key={i} className="mb-2 flex items-center text-background">
                  <svg className="w-5 h-5 mr-2 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <button 
              onClick={handleSubscribe}
              className="w-full bg-accent text-background py-2 px-4 rounded hover:bg-secondary transition duration-200"
            >
              Subscribe Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}