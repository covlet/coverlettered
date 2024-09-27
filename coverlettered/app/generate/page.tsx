'use client';

import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Mock function to check subscription status
const checkSubscription = async (userId: string) => {
  // In a real application, this would make an API call to check the user's subscription status
  return Math.random() < 0.5; // Randomly return true or false for demo purposes
};

export default function GeneratePage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const [jobDescription, setJobDescription] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in');
    } else if (user) {
      checkSubscription(user.id).then(setIsSubscribed);
    }
  }, [isLoaded, isSignedIn, router, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSubscribed) {
      setError('You need a subscription to generate cover letters.');
      return;
    }
    setIsLoading(true);
    setError('');
    setCoverLetter('');

    try {
      const response = await fetch('/api/generate-cover-letter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jobDescription }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate cover letter');
      }

      const data = await response.json();
      setCoverLetter(data.coverLetter);
    } catch (err) {
      setError('Failed to generate cover letter. Please try again.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isLoaded || !isSignedIn) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-primary">Generate Your Cover Letter</h1>
      {!isSubscribed && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6" role="alert">
          <p className="font-bold">Subscription Required</p>
          <p>You need a subscription to generate cover letters. <Link href="/pricing" className="underline">Upgrade your plan</Link></p>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="jobDescription" className="block mb-2 text-lg text-primary">
            Job Description:
          </label>
          <textarea
            id="jobDescription"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="w-full p-3 border border-secondary rounded-md bg-background text-primary"
            rows={5}
            required
          />
        </div>
        <button 
          type="submit" 
          className={`bg-accent text-background py-3 px-6 rounded-md text-lg font-semibold hover:bg-secondary transition duration-200 ${!isSubscribed && 'opacity-50 cursor-not-allowed'}`}
          disabled={isLoading || !isSubscribed}
        >
          {isLoading ? 'Generating...' : 'Generate Cover Letter'}
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {coverLetter && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-primary">Your Generated Cover Letter:</h2>
          <pre className="whitespace-pre-wrap bg-primary text-background p-6 rounded-md">
            {coverLetter}
          </pre>
        </div>
      )}
    </div>
  );
}