import React from 'react';
import UsernameExposureChecker from '../components/UsernameExposureChecker';
import PrivacyChecklist from '../components/PrivacyChecklist';
import OSINTSearchTool from '../components/OSINTSearchTool';
import InfographicLink from '../components/InfographicLink';

export default function SocialPage() {
  return (
    <div className="min-h-screen w-full bg-white pt-28 px-6 text-center flex flex-col items-center">

      {/* Header */}
      <h1 className="text-4xl font-bold text-green-700 mb-4">Social & Public Exposure</h1>
      <p className="text-gray-600 max-w-2xl mb-10">
        What you post publicly can be pieced together to identify you, track your habits, or even trick you. Below are tools to explore your exposure.
      </p>

      {/* Infographic */}
      <InfographicLink
        href="/infographics/social-exposure.pdf"
        title="What Is Public Exposure — And Why Should You Care?"
        description={`Even without a data breach, public posts, reused usernames, and uploaded media can reveal your identity. 
        This infographic breaks down what data you expose, how it's pieced together, and how to protect your digital presence — including OSINT tools, alias strategies, and privacy practices.`}
      />

      {/* Section 1: Username Exposure Checker */}
      <div className="w-full max-w-5xl mb-12">
        <UsernameExposureChecker />
      </div>

      <div className="w-full max-w-5xl mb-12">
        <OSINTSearchTool />
      </div>

      {/* Section 3: Privacy Checklist */}
      <div className="w-full max-w-5xl mb-12">
        <PrivacyChecklist />
      </div>
    </div>
  );
}
