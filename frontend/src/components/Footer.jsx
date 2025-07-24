// src/components/Footer.jsx
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 px-4 py-10">
      <div className="flex flex-col items-start space-y-6">

        <p className="max-w-md text-left text-gray-500">
          Empowering you with tools and knowledge to protect your digital footprint.
        </p>

        {/* Social Icons */}
        <div className="flex space-x-6">
          <a href="#" className="text-gray-700 hover:opacity-75">
            <span className="sr-only">Facebook</span>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M22 12..." clipRule="evenodd"/>
            </svg>
          </a>
          <a href="#" className="text-gray-700 hover:opacity-75">
            <span className="sr-only">Instagram</span>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12.315..." clipRule="evenodd"/>
            </svg>
          </a>
          <a href="#" className="text-gray-700 hover:opacity-75">
            <span className="sr-only">Twitter</span>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.29 20.251..."/>
            </svg>
          </a>
          <a href="#" className="text-gray-700 hover:opacity-75">
            <span className="sr-only">GitHub</span>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477..." clipRule="evenodd"/>
            </svg>
          </a>
        </div>

        {/* Links Row */}
        <div className="flex space-x-8">
          <a href="/" className="text-gray-700 hover:text-gray-900">Home</a>
          <a href="/resources" className="text-gray-700 hover:text-gray-900">Resources</a>
          <a href="/privacy" className="text-gray-700 hover:text-gray-900">Privacy Policy</a>
          <a href="/contact" className="text-gray-700 hover:text-gray-900">Contact</a>
        </div>

        {/* Footer Note */}
        <p className="text-xs text-left text-gray-500 w-full">
          &copy; {new Date().getFullYear()} TraceMe. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
