import React from 'react';
import FingerprintChecker from '../components/FingerprintChecker';
import InfographicLink from '../components/InfographicLink';

export default function FingerprintPage() {
  return (
    <div className="min-h-screen w-full bg-white pt-28 px-6 text-center flex flex-col items-center">
      
      {/* Header */}
      <h1 className="text-4xl font-bold text-green-800 mb-4">Device Fingerprinting</h1>
      <p className="text-gray-600 max-w-2xl mb-10">
        Fingerprinting collects subtle details about your device — screen size, browser version, time zone, fonts — to build a unique identity. 
        This works even if you use private mode or clear cookies. Try the demo below to see what makes your device unique.
      </p>

      {/* Infographic Link */}
      <InfographicLink
        href="/infographics/fingerprinting.pdf"
        title="Fingerprinting — The Invisible Way You’re Tracked"
        description={`Fingerprinting allows websites to identify you without cookies by using your browser, device, and graphics data. 
        This infographic explains how it works, why it's harder to block than cookies, and how to protect yourself using tools like Tor, Brave, and spoofing extensions.`}
      />

      {/* Fingerprint Info Display */}
      <FingerprintChecker />
    </div>
  );
}
