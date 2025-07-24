import React from 'react';
import UrlAnalyzer from '../components/UrlAnalyzer';
import InfographicLink from '../components/InfographicLink';

export default function TrackingPage() {
  return (
    <div className="min-h-screen w-full bg-white flex flex-col items-center justify-start pt-28 px-6 text-center">
      <div className="w-full max-w-4xl text-center">
        {/* Header */}
        <h1 className="text-4xl font-bold text-green-800 mb-4">Cookie & Script Tracking</h1>
        <p className="text-gray-600 mb-10">
          Websites use scripts and cookies to recognize users, track behavior, and store session data. Even a simple site visit can trigger dozens of requests and trackers.
          Use this tool to analyse how a site uses cookies and third-party scripts.
        </p>
      </div>

      {/* Infographic Link */}
      <InfographicLink
        href="/infographics/cookie-tracking.pdf"
        title="How Cookies Track You — And What You Can Do About It"
        description={`Every time you visit a site, cookies remember who you are. While useful, they’re also used to track your behavior across the web. This infographic explains how tracking works and gives practical tips to reduce it,  including extensions, private browsing, and smarter browser choices.`}
      />

      {/* Cookie + Script Analyzer */}
      <div className="w-full max-w-5xl text-center">
        <UrlAnalyzer />
      </div>
    </div>
  );
}
