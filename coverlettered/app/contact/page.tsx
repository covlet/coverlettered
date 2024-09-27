'use client';

import React, { useState } from 'react';
import HeaderSection from '../components/HeaderSection';
import FooterSection from '../components/FooterSection';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');

    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, message }),
    });

    if (response.ok) {
      setStatus('Message sent successfully! You will receive a confirmation email shortly.');
      setName('');
      setEmail('');
      setMessage('');
    } else {
      setStatus('Failed to send message. Please try again.');
    }
  };

  return (
    <main className="bg-background">
      <HeaderSection />
      <div className="py-12 max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-primary mb-8">Contact Us</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-primary mb-2">Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
              className="w-full p-2 border border-secondary rounded bg-background text-primary" 
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-primary mb-2">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              className="w-full p-2 border border-secondary rounded bg-background text-primary" 
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-primary mb-2">Message</label>
            <textarea 
              id="message" 
              name="message" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required 
              rows={4} 
              className="w-full p-2 border border-secondary rounded bg-background text-primary"
            ></textarea>
          </div>
          <button type="submit" className="bg-accent text-background py-2 px-4 rounded hover:bg-secondary transition duration-200">Send Message</button>
        </form>
        {status && <p className="mt-4 text-center text-primary">{status}</p>}
      </div>
      <FooterSection />
    </main>
  );
}