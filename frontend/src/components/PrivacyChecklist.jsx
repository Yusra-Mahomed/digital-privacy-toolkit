import React, { useState } from 'react';

const items = [
  { label: "My Instagram or Twitter is public." },
  { label: "I post my location or routine regularly." },
  { label: "My full name is visible on social media." },
  { label: "Photos I've posted include my house, license plate, etc." },
  { label: "My birthday or age is visible publicly." },
  { label: "My posts reveal info that could help someone impersonate me." },
];

export default function PrivacyChecklist() {
  const [exposed, setExposed] = useState(Array(items.length).fill(false));

  const toggleItem = (index) => {
    const updated = [...exposed];
    updated[index] = !updated[index];
    setExposed(updated);
  };

  const exposedCount = exposed.filter(Boolean).length;

  let exposureLevel = '';
  let message = '';
  let tips = [];

  if (exposedCount === 0) {
    exposureLevel = '🟢 No public exposure';
    message = "Awesome! You’ve kept sensitive personal details private.";
  } else if (exposedCount <= 2) {
    exposureLevel = '🟡 Low exposure';
    message = "Good job overall — just be mindful of those exposed items.";
    tips = ["Consider making your accounts private.", "Be cautious about sharing location info."];
  } else if (exposedCount <= 4) {
    exposureLevel = '🟠 Moderate exposure';
    message = "You’re publicly sharing a fair bit — this may be enough to track or profile you.";
    tips = ["Use initials or nicknames.", "Blur out home/address info in photos.", "Hide birthdates from profiles."];
  } else {
    exposureLevel = '🔴 High exposure';
    message = "Your online presence reveals a lot — someone could build a detailed profile or impersonate you.";
    tips = ["Lock down social media visibility.", "Scrub old posts for personal info.", "Avoid revealing patterns or daily habits."];
  }

  return (
    <div className="bg-green-50 p-6 rounded shadow text-left">
      <h2 className="text-xl font-semibold text-green-900 mb-2">Public Exposure Self-Check</h2>
      <p className="text-sm text-gray-700 mb-4">
        Check the boxes below to indicate what personal info you currently share publicly. We’ll assess your exposure risk and give tips.
      </p>

      <ul className="text-sm text-gray-800 space-y-2">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <input
              type="checkbox"
              checked={exposed[idx]}
              onChange={() => toggleItem(idx)}
              className="mt-1"
            />
            <span>{item.label}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 text-sm">
        <p className="font-semibold text-red-900">Exposure Level: {exposureLevel}</p>
        <p className="text-gray-700 mt-1 mb-2">{message}</p>

        {tips.length > 0 && (
          <div>
            <p className="font-medium text-red-800">Recommended Actions:</p>
            <ul className="list-disc ml-5 mt-1">
              {tips.map((tip, idx) => (
                <li key={idx}>{tip}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
