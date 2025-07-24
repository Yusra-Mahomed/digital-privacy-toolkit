import React from 'react';
import InfographicLink from '../components/InfographicLink';

export default function ResourcesPage() {
  return (
    <div className="min-h-screen w-full bg-white pt-28 px-6 flex flex-col items-center text-center">
      <h1 className="text-4xl font-bold text-green-800 mb-4">Infographic Library</h1>
      <p className="text-gray-600 max-w-2xl mb-10">
        Download or view visual guides on key digital privacy concepts. Each infographic breaks down complex topics into clear, actionable advice.
      </p>

      <InfographicLink
        href="/infographics/password-safety.pdf"
        title="Password Safety Infographic"
        description="How attackers guess passwords, what entropy means, and how to build stronger ones. Includes examples and tips for avoiding reuse."
      />

      <InfographicLink
        href="/infographics/cookie-tracking.pdf"
        title="How Cookies Track You — And What You Can Do About It"
        description="Understand how cookies track you across websites and how to reduce tracking using browser tools, extensions, and settings."
      />

      <InfographicLink
        href="/infographics/fingerprinting.pdf"
        title="Fingerprinting — The Invisible Way You're Tracked"
        description="See how device fingerprinting works without cookies, and what tools can help defend against it."
      />

      <InfographicLink
        href="/infographics/social-exposure.pdf"
        title="What Is Public Exposure — And Why It Matters"
        description="Learn how OSINT tools can find reused usernames, photos, metadata, and social info, and how to reduce your footprint."
      />
    </div>
  );
}
