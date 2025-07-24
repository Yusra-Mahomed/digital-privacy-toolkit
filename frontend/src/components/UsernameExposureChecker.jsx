import React, { useState } from 'react';
import axios from 'axios';

export default function UsernameScanner() {
  const [username, setUsername] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const scanUsername = async () => {
    if (!username.trim()) return;
    setLoading(true);
    setResult(null);

    try {
      const res = await axios.post('http://localhost:8000/api/social/username-scan', {
        username
      });
      setResult(res.data);
    } catch (error) {
      setResult({ error: 'Error checking username. Try again later.' });
    }

    setLoading(false);
  };

  return (
    <div className="bg-blue-50 p-6 rounded shadow text-left">
      <h2 className="text-xl font-semibold text-blue-900 mb-2">Public Username Scanner</h2>
      <p className="text-sm text-gray-700 mb-4">
        Check if a username is already taken on popular public websites. Helps reveal how visible someone is across the web.
      </p>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="e.g. johndoe123"
          className="flex-grow px-4 py-2 border rounded"
        />
        <button
          onClick={scanUsername}
          className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
        >
          Check
        </button>
      </div>

      {loading && <p className="text-gray-600">Scanning...</p>}

      {result && (
        <div className="space-y-3 text-sm">
          {result.error && <p className="text-red-500">{result.error}</p>}

          {result.found?.length > 0 && (
            <div>
              <p className="font-semibold text-green-800">Found on (Basic Check):</p>
              <ul className="list-disc ml-6">
                {result.found.map((item, idx) => (
                  <li key={idx}>
                    <a href={item.url} target="_blank" rel="noreferrer" className="text-blue-700 underline">
                      {item.platform}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.not_found?.length > 0 && (
            <div>
              <p className="font-semibold text-gray-800">Not Found:</p>
              <ul className="list-disc ml-6">
                {result.not_found.map((platform, idx) => (
                  <li key={idx}>{platform}</li>
                ))}
              </ul>
            </div>
          )}

          {result.errors?.length > 0 && (
            <div>
              <p className="font-semibold text-yellow-700">Errors:</p>
              <ul className="list-disc ml-6">
                {result.errors.map((err, idx) => (
                  <li key={idx}>{err.platform} – {err.error || `Status ${err.status}`}</li>
                ))}
              </ul>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
