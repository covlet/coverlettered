'use client';

import React from 'react';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, isLoaded } = useUser();

  const handleManageSubscription = async () => {
    try {
      const response = await fetch('/api/create-portal-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Error creating portal session:', error);
    }
  };

  if (!isLoaded) {
    return <div className="text-white">Loading...</div>;
  }

  if (!user) {
    return <div className="text-white">Not signed in</div>;
  }

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user.firstName}!</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#004080] p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Your Profile</h2>
          <p className="mb-4">Complete your profile to get better cover letter results.</p>
          <Link href="/profile" className="bg-[#ff9966] text-[#003366] py-2 px-4 rounded hover:bg-[#ff8855] transition duration-200">
            Edit Profile
          </Link>
        </div>
        
        <div className="bg-[#004080] p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Generate Cover Letter</h2>
          <p className="mb-4">Create a customized cover letter for your job application.</p>
          <Link href="/generate" className="bg-[#ff9966] text-[#003366] py-2 px-4 rounded hover:bg-[#ff8855] transition duration-200">
            Create Cover Letter
          </Link>
        </div>

        <div className="bg-[#004080] p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Manage Subscription</h2>
          <p className="mb-4">View and manage your current subscription.</p>
          <button 
            onClick={handleManageSubscription}
            className="bg-[#ff9966] text-[#003366] py-2 px-4 rounded hover:bg-[#ff8855] transition duration-200"
          >
            Manage Subscription
          </button>
        </div>
      </div>
    </div>
  );
}