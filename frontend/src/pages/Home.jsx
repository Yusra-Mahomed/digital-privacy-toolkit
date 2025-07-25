import React from 'react';
import Card from '../components/Card';
import passwordImg from '../assets/password.png';
import trackingImg from '../assets/tracking.png';
import socialImg from '../assets/social.png';
import cleanupImg from '../assets/clean.png';
import Footer from '../components/footer';

export default function Home() {
  return (
    <div className="min-h-screen w-screen bg-white flex flex-col justify-start text-center px-4 py-10">
      {/* Header above the block */}
      <div className="mb-8">
        <p className="text-gray-600 max-w-xl mx-auto">
          Learn how to protect your digital footprint...
        </p>
      </div>

      {/* Centered scrollable card container */}
      <div className="mx-auto w-full max-w-5xl h-[65%] bg-blue-50 rounded-lg py-6 px-4 overflow-x-auto overflow-y-hidden mb-12">
        <div className="flex gap-6 w-max">
          <Card
            title="Protect Your Accounts"
            description="Learn how to create strong passwords, avoid breaches, and keep your logins safe."
            imgSrc={passwordImg}
            altText="Account Security"
            link="/passwords"
          />
          <Card
            title="How Cookies Track You"
            description="See how websites set cookies to store your identity, behavior, and login sessions."
            imgSrc={cleanupImg} // Same image for now
            altText="Cookie Tracking"
            link="/tracking"
          />
          <Card
            title="What Is Fingerprinting?"
            description="Learn how your device can be uniquely identified — even without cookies."
            imgSrc={trackingImg} // Same image for now
            altText="Fingerprinting Explained"
            link="/fingerprinting"
          />
          <Card
            title="Think Before You Post"
            description="Understand how public posts and shared data can put your privacy at risk."
            imgSrc={socialImg}
            altText="Social Exposure"
            link="/social"
          />
        </div>
      </div>
      
      
      
      
      <Footer />
      
    </div>
  );
}
