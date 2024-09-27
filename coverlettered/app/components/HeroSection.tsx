'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth, SignInButton } from '@clerk/nextjs';
import logoImage from '@/app/images/logo.png';

export default function HeroSection() {
  const router = useRouter();
  const { isSignedIn } = useAuth();

  const handleCreateCoverLetter = () => {
    if (isSignedIn) {
      router.push('/dashboard');
    }
    // If not signed in, the SignInButton will handle the sign-in process
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center">
          <Image
            src={logoImage}
            alt="Coverlettered Logo"
            width={100}
            height={100}
            className="mb-8"
          />
          <h1 className="mt-8 text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-primary">
            Elevate Your Job Applications with Coverlettered
          </h1>
          <p className="mt-4 max-w-[600px] text-primary md:text-xl">
            Craft tailored, professional cover letters in minutes. Stand out to employers and land your dream job.
          </p>
          <div className="mt-8 flex flex-col gap-4 min-[400px]:flex-row">
            {isSignedIn ? (
              <button 
                onClick={handleCreateCoverLetter}
                className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-secondary text-background hover:bg-accent transition-colors duration-200 ease-in-out"
              >
                Create Your Cover Letter
              </button>
            ) : (
              <SignInButton mode="modal">
                <button className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-secondary text-background hover:bg-accent transition-colors duration-200 ease-in-out">
                  Create Your Cover Letter
                </button>
              </SignInButton>
            )}
            <button className="inline-flex items-center justify-center px-4 py-2 rounded-md border border-primary text-primary hover:bg-primary hover:text-background transition-colors duration-200 ease-in-out">
              View Examples
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}