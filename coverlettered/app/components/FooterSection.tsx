import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logoImage from '@/app/images/logowtext.png';

export default function FooterSection() {
  return (
    <footer className="w-full py-12 bg-background text-primary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image
              src={logoImage}
              alt="Coverlettered Logo"
              width={200}
              height={50}
              className="mb-4"
            />
            <p className="mt-4 text-primary">
              AI-powered cover letters to help you land your dream job.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-accent">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-primary hover:text-secondary">Home</Link></li>
              <li><Link href="/pricing" className="text-primary hover:text-secondary">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-accent">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/privacy-policy" className="text-primary hover:text-secondary">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="text-primary hover:text-secondary">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-accent">Connect</h4>
            <ul className="space-y-2">
              <li><Link href="/contact" className="text-primary hover:text-secondary">Contact</Link></li>
              <li><a href="#" className="text-primary hover:text-secondary">Instagram</a></li>
              <li><a href="#" className="text-primary hover:text-secondary">Youtube</a></li>
              <li><a href="#" className="text-primary hover:text-secondary">TikTok</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-secondary text-center text-primary">
          © 2024 Coverlettered. All rights reserved.
        </div>
      </div>
    </footer>
  );
}