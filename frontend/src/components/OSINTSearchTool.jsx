import React, { useState } from 'react';
import axios from 'axios';

export default function OSINTSearchTool() {
  const [form, setForm] = useState({ username: '', email: '', full_name: '' });
  const [results, setResults] = useState(null);
  const [previewResults, setPreviewResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const runSearch = async () => {
    if (!form.username && !form.email && !form.full_name) return;
    setLoading(true);
    setResults(null);
    setPreviewResults(null);

    try {
      const res = await axios.post('http://localhost:8000/api/social/osint-search', form);
      setResults(res.data);
    } catch (err) {
      setResults({ error: 'Search failed.' });
    }

    setLoading(false);
  };

  const runLivePreview = async () => {
    if (!form.username && !form.email && !form.full_name) return;
  
    setLoading(true);
    setPreviewResults(null);
  
    try {
      const res = await axios.post('http://localhost:8000/api/social/osint-preview', {
        username: form.username,
        email: form.email,
        full_name: form.full_name,
        max_results: 5
      });
      setPreviewResults(res.data);
    } catch (err) {
      setPreviewResults({});
    }
  
    setLoading(false);
  };
  

  return (
    <div className="bg-blue-50 p-6 rounded shadow text-left max-w-7xl mx-auto">

      <h2 className="text-xl font-semibold text-blue-900 mb-2">OSINT Search Tool</h2>
      <p className="text-sm text-gray-700 mb-4">Search across usernames, emails, or full names. You can open raw results or view inline previews.</p>
  
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Column */}
        <div className="flex-1 space-y-4">
          {/* Input Form */}
          <div className="grid gap-2">
            <input
              name="username"
              placeholder="Username (e.g. johndoe123)"
              value={form.username}
              onChange={handleInput}
              className="px-3 py-2 border rounded"
            />
            <input
              name="email"
              placeholder="Email (e.g. john@email.com)"
              value={form.email}
              onChange={handleInput}
              className="px-3 py-2 border rounded"
            />
            <input
              name="full_name"
              placeholder="Full Name (e.g. John Doe)"
              value={form.full_name}
              onChange={handleInput}
              className="px-3 py-2 border rounded"
            />
  
            <div className="flex gap-2 mt-2">
              <button
                onClick={runSearch}
                className="bg-blue-900 text-white py-2 px-4 rounded hover:bg-blue-800"
              >
                Generate Links
              </button>
  
              <button
                onClick={runLivePreview}
                className="bg-blue-900 text-white py-2 px-4 rounded hover:bg-blue-900"
              >
                Live Preview
              </button>
            </div>
          </div>
  
          {/* Loading */}
          {loading && <p className="text-gray-600">Loading...</p>}
  
          {/* Generated Search Links */}
          {results?.search_links && (
            <div className="space-y-2 text-sm mt-4">
              <h3 className="text-md font-semibold text-blue-900 mb-2">Generated Search Links</h3>
              {results.search_links.map((item, idx) => (
                <div key={idx}>
                  <p className="font-medium">
                    {item.type} → <span className="text-gray-700">{item.query}</span>
                  </p>
                  <a
                    href={item.search_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-700 underline"
                  >
                    Open Search
                  </a>
                </div>
              ))}
            </div>
          )}
  
          {/* Error */}
          {results?.error && <p className="text-red-500 mt-4">{results.error}</p>}
        </div>
  
        {/* Right Column: Preview Results */}
        <div className="w-full lg:w-[60%] mt-4 lg:mt-0">


          {previewResults && (
            <div className="bg-blue-60 border rounded shadow p-4 h-[500px] overflow-y-auto space-y-4 text-sm">
              <h3 className="text-md font-semibold text-blue-900 mb-2">Inline Search Preview</h3>

              {["full_name", "username", "email"].map((type) => (
                previewResults[type]?.length > 0 && (
                  <div key={type}>
                    <h4 className="text-blue-700 font-semibold capitalize mb-1">{type.replace('_', ' ')} Results</h4>
                    {previewResults[type].map((item, idx) => (
                      <div key={idx} className="bg-white p-3 rounded shadow border mb-2">
                        <a href={item.href} target="_blank" rel="noreferrer" className="text-blue-800 font-semibold underline">
                          {item.title}
                        </a>
                        <p className="text-gray-700">{item.body}</p>
                      </div>
                    ))}
                  </div>
                )
              ))}

              {Object.values(previewResults).every(r => r?.length === 0) && (
                <p className="text-gray-600">No results found for any field.</p>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
  
}
