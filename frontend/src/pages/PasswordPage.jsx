import React, { useState } from 'react';
import zxcvbn from 'zxcvbn';
import sha1 from 'js-sha1';
import InfographicLink from '../components/InfographicLink';

export default function PasswordPage() {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState(null);
  const [pwnedResult, setPwnedResult] = useState(null);
  const [generated, setGenerated] = useState('');

  const handlePasswordChange = (e) => {
    const pwd = e.target.value;
    setPassword(pwd);
    const result = zxcvbn(pwd);
    setStrength(result);
    setPwnedResult(null);
  };

  const checkPwned = async () => {
    if (!password) {
      setPwnedResult('Please enter a password first.');
      return;
    }

    const hash = sha1(password).toUpperCase();
    const prefix = hash.slice(0, 5);
    const suffix = hash.slice(5);

    try {
      const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
      const text = await response.text();

      const lines = text.split('\n');
      const match = lines.find(line => line.startsWith(suffix));

      if (match) {
        const count = match.split(':')[1].trim();
        setPwnedResult(`This password has been found in ${count} breaches. Avoid using it.`);
      } else {
        setPwnedResult('Good news! This password has not been found in known breaches.');
      }
    } catch (error) {
      setPwnedResult(`Error checking password: ${error.message}`);
    }
  };

  const generatePassword = (length = 14) => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    const charsetLength = charset.length;
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
  
    const pwd = Array.from(array)
      .map((val) => charset[val % charsetLength])
      .join('');
  
    setGenerated(pwd);
  };
  

  return (
    <div className="min-h-screen w-full bg-white flex flex-col items-center justify-start pt-28 px-6 text-center">
      
      
      {/* Intro */}
      <h1 className="text-5xl font-bold text-green-800 mb-4">Password Safety Hub</h1>
      <p className="text-gray-600 max-w-2xl mb-10">
        Learn how to build strong passwords and avoid reuse. This tool checks how easy your password is to guess — and whether it's been found in public data breaches.
      </p>

      <InfographicLink
        href="/infographics/password-safety.pdf"
        title="View the Password Safety Infographic"
        description={`A quick, visual breakdown of why strong passwords matter, including how they're cracked, what "entropy" really means, and how to protect your accounts better. Click to view or download (PDF).`}
      />




      {/* Side-by-side: Password Input + Breach Checker */}
      <div className="flex flex-col lg:flex-row gap-6 mb-10 w-full max-w-5xl">

        {/* Left Block: Password Entry + Strength */}
        <div className="bg-blue-50 flex-1 rounded-lg p-6 shadow-sm text-left">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Enter a Password</h2>
          <p className="text-sm text-gray-700 mb-2">
            Your password will be tested for strength and checked against real breach data.
          </p>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Type your password..."
            className="w-full px-4 py-2 border rounded mb-3"
          />
          {strength && (
            <div className="space-y-1">
              <p className="font-medium text-blue-800">Score: {strength.score} / 4</p>
              <p className="text-gray-700">{strength.feedback.warning || "Looks strong!"}</p>
              <p className="text-sm text-gray-500">
                Estimated crack time: {strength.crack_times_display.offline_slow_hashing_1e4_per_second}
              </p>
            </div>
          )}
          <p className="text-sm text-gray-500 mt-3">
            Try examples like <code className="bg-white px-1">password123</code>, <code className="bg-white px-1">Qwerty!23</code>, or <code className="bg-white px-1">N0w$tr0nger</code>
          </p>
        </div>

        {/* Right Block: Pwned Check */}
        <div className="bg-blue-50 flex-1 rounded-lg p-6 shadow-sm text-left">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Check for Breaches</h2>
          <p className="text-sm text-gray-700 mb-3">
            This checks whether your password has appeared in any real-world data breaches (using Have I Been Pwned API).
          </p>
          <button
            onClick={checkPwned}
            className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
          >
            Check If Breached
          </button>
          {pwnedResult && (
            <p className="mt-4 text-gray-800 bg-white p-2 rounded border border-gray-200">
              {pwnedResult}
            </p>
          )}
        </div>
      </div>

      {/* Generator Section */}
      <div className="bg-blue-50 rounded-lg p-6 mb-20 w-full max-w-5xl shadow-sm text-left">
        <h2 className="text-xl font-semibold text-blue-900 mb-2">Generate a Secure Password</h2>
        <p className="text-sm text-gray-700 mb-3">
          Click below to generate a strong random password. Ideal for use with a password manager.
        </p>
        <button
          onClick={() => generatePassword()}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Generate Password
        </button>
        {generated && (
          <p className="mt-4 text-blue-900 font-mono break-words bg-white p-2 rounded border border-gray-300">
            {generated}
          </p>
        )}
      </div>

    </div>
  );
}
