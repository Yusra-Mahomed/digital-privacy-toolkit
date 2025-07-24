import React, { useState, useEffect } from 'react';
import axios from 'axios';

// SHA-256 hash function
async function sha256(data) {
  const encoder = new TextEncoder();
  const encoded = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest('SHA-256', encoded);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

// Audio fingerprinting
async function getAudioFingerprintHash() {
  return new Promise((resolve) => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const analyser = audioCtx.createAnalyser();
      const gain = audioCtx.createGain();
      const scriptProcessor = audioCtx.createScriptProcessor(4096, 1, 1);

      oscillator.type = 'triangle';
      oscillator.frequency.setValueAtTime(10000, audioCtx.currentTime);
      gain.gain.setValueAtTime(0, audioCtx.currentTime); // mute

      oscillator.connect(analyser);
      analyser.connect(scriptProcessor);
      scriptProcessor.connect(audioCtx.destination);
      oscillator.start(0);

      setTimeout(async () => {
        const freqData = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(freqData);
        oscillator.stop();
        scriptProcessor.disconnect();
        analyser.disconnect();
        const hash = await sha256(freqData.toString());
        resolve(hash);
      }, 100);
    } catch (e) {
      resolve('error');
    }
  });
}

export default function FingerprintChecker() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [prevCanvas, setPrevCanvas] = useState(localStorage.getItem('prevCanvas') || '');
  const [prevAudio, setPrevAudio] = useState(localStorage.getItem('prevAudio') || '');
  const [canvasChanged, setCanvasChanged] = useState(false);
  const [audioChanged, setAudioChanged] = useState(false);

  const runFingerprint = async () => {
    setLoading(true);
    setResult(null);
    setCanvasChanged(false);
    setAudioChanged(false);

    // Canvas fingerprint
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 50;
    const ctx = canvas.getContext('2d');
    ctx.textBaseline = 'top';
    ctx.font = '16px "Arial"';
    ctx.fillStyle = '#f60';
    ctx.fillRect(0, 0, 200, 50);
    ctx.fillStyle = '#069';
    ctx.fillText('Fingerprint test 🔐🧠', 2, 15);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const canvasFingerprint = await sha256(imageData.data.toString());

    const audioFingerprint = await getAudioFingerprintHash();

    // Compare with stored values
    const canvasChanged = prevCanvas && prevCanvas !== canvasFingerprint;
    const audioChanged = prevAudio && prevAudio !== audioFingerprint;
    setCanvasChanged(canvasChanged);
    setAudioChanged(audioChanged);

    // Save for next run
    localStorage.setItem('prevCanvas', canvasFingerprint);
    localStorage.setItem('prevAudio', audioFingerprint);
    setPrevCanvas(canvasFingerprint);
    setPrevAudio(audioFingerprint);

    const payload = {
      visitorId: "demo-user-123",
      components: {
        userAgent: navigator.userAgent,
        language: navigator.language,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        doNotTrack: navigator.doNotTrack,
        platform: navigator.platform,
        hardwareConcurrency: navigator.hardwareConcurrency,
        touchSupport: 'ontouchstart' in window,
        canvasFingerprint,
        audioFingerprint,
        plugins: Array.from(navigator.plugins || []).map(p => p.name),
        cookieEnabled: navigator.cookieEnabled,
        javaEnabled: navigator.javaEnabled?.(),
        colorDepth: window.screen.colorDepth,
        deviceMemory: navigator.deviceMemory || 'unknown',
        referrer: document.referrer,
        vendor: navigator.vendor
      },
    };

    try {
      const res = await axios.post('http://localhost:8000/api/fingerprint/fingerprint', payload, {
        headers: { 'Content-Type': 'application/json' }
      });
      setResult(res.data);
    } catch (error) {
      setResult({ error: error.message || 'Request failed.' });
    }

    setLoading(false);
  };

  // Auto-run after spoofing reload
  useEffect(() => {
    if (sessionStorage.getItem('autoRunFingerprint') === 'true') {
      sessionStorage.removeItem('autoRunFingerprint');
      runFingerprint();
    }
  }, []);

  return (
    <div className="bg-blue-50 p-6 rounded-lg shadow-sm mb-10 w-full max-w-5xl text-left mx-auto">
      <h2 className="text-xl font-semibold text-blue-900 mb-2">Browser Fingerprinting</h2>
      <p className="text-gray-700 mb-4">
        Even without cookies, websites can identify you using your device, browser, and behavior. Click below to simulate how unique your browser may appear.
      </p>

      <button
        onClick={runFingerprint}
        className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
      >
        Run Fingerprint Check
      </button>

      <button
        onClick={() => {
          sessionStorage.setItem('autoRunFingerprint', 'true');
          window.location.reload();
        }}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-2 ml-2"
      >
        Reload Page for Spoofing
      </button>

      {loading && <p className="text-gray-600 mt-2">Analyzing...</p>}

      {result && (
        <div className="mt-4 text-sm text-gray-800 space-y-2">
          {result.error ? (
            <p className="text-red-500">{result.error}</p>
          ) : (
            <>
              <p><strong>Visitor ID:</strong> {result.visitorId}</p>
              <p><strong>Components Collected:</strong> {result.components_collected}</p>
              <p><strong>Estimated Uniqueness:</strong> {result.estimated_uniqueness}</p>
              <p><strong>Tip:</strong> {result.tip}</p>

              <div className="mt-4">
                <p className="font-semibold mb-2">Collected Components:</p>
                <div className="overflow-x-auto mt-2">
                  <table className="min-w-full table-auto text-xs border border-gray-200">
                    <thead className="bg-blue-100">
                      <tr>
                        <th className="text-left p-2 border-b border-gray-300">Component</th>
                        <th className="text-left p-2 border-b border-gray-300">Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(result.components || {}).map(([key, value]) => (
                        <tr key={key} className="odd:bg-white even:bg-blue-50">
                          <td className="p-2 font-medium text-gray-700 border-b border-gray-100">{key}</td>
                          <td className="p-2 text-gray-800 break-all border-b border-gray-100">
                            {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Change detection visuals */}
              <div className="mt-4 space-y-2">
                {canvasChanged ? (
                  <div className="text-red-700 bg-red-50 border border-red-200 p-3 rounded text-sm font-semibold flex items-center gap-2">
                    <span>⚠️</span>
                    Canvas fingerprint <strong>changed</strong> since last run — possible spoofing or variation detected.
                  </div>
                ) : (
                  <div className="text-green-700 bg-green-50 border border-green-200 p-3 rounded text-sm flex items-center gap-2">
                    <span>✅</span>
                    Canvas fingerprint is <strong>unchanged</strong> since last run.
                  </div>
                )}

                {audioChanged ? (
                  <div className="text-red-700 bg-red-50 border border-red-200 p-3 rounded text-sm font-semibold flex items-center gap-2">
                    <span>⚠️</span>
                    Audio fingerprint <strong>changed</strong> since last run — possible spoofing or variation detected.
                  </div>
                ) : (
                  <div className="text-green-700 bg-green-50 border border-green-200 p-3 rounded text-sm flex items-center gap-2">
                    <span>✅</span>
                    Audio fingerprint is <strong>unchanged</strong> since last run.
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
