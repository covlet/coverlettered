import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/nextjs';
import logoIcon from '@/app/images/logo.png'; // Make sure this path is correct

export default function HeaderSection() {
  return (
    <header className="w-full py-4 bg-background">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src={logoIcon}
              alt="Coverlettered Icon"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <span className="text-primary">Coverlettered</span>
          </Link>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link href="/pricing" className="text-primary hover:text-secondary transition-colors duration-200">
                  Pricing
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-secondary text-background py-2 px-4 rounded hover:bg-accent transition duration-200">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard" className="text-primary hover:text-secondary transition-colors duration-200">
              Dashboard
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}