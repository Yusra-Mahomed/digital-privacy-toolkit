// components/InfographicLink.js or InfographicLink.jsx
import React from 'react';
export default function InfographicLink({ href, title, description }) {
  return (
    <div className="w-full max-w-5xl mb-10">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-start gap-4 bg-white border border-blue-300 p-5 rounded-lg shadow-sm hover:bg-blue-50 transition text-left"
      >
        {/* PDF-style Icon Box */}
        <div className="flex-shrink-0">
          <div className="w-16 h-20 bg-blue-100 text-blue-600 rounded-md flex flex-col items-center justify-center font-bold">
            <span className="text-base">PDF</span>
            <svg
              className="w-7 h-7 mt-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M13 2H6a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V6l-3-4zM6 0h7l5 5v11a4 4 0 01-4 4H6a4 4 0 01-4-4V2a2 2 0 012-2z" />
            </svg>
          </div>
        </div>

        {/* Text Content */}
        <div className="flex-grow">
          <h3 className="font-semibold text-blue-800 text-lg mb-1">
            {title}
          </h3>
          <p className="text-gray-700 text-sm leading-snug">
            {description}
          </p>
        </div>
      </a>
    </div>
  );
}
