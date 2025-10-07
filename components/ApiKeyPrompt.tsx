
import React, { useState } from 'react';

interface Props {
  onKeySubmit: (key: string) => void;
}

export const ApiKeyPrompt: React.FC<Props> = ({ onKeySubmit }) => {
  const [key, setKey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (key.trim()) {
      onKeySubmit(key.trim());
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-800 shadow-2xl rounded-2xl p-6 md:p-10 text-center animate-fadeIn">
      <h2 className="text-2xl font-bold mb-4 text-gray-200">Enter Your API Key</h2>
      <p className="text-gray-400 mb-6">
        To use this application, you need a Google AI API key. Your key will be saved securely in your browser's local storage and will not be shared.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="apiKey" className="sr-only">API Key</label>
          <input
            id="apiKey"
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
            placeholder="Enter your Google AI API key"
            required
            autoComplete="off"
          />
        </div>
        <button
          type="submit"
          className="w-full text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-800 font-medium rounded-lg text-lg px-8 py-3 text-center transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Save and Continue
        </button>
      </form>
      <div className="mt-6 text-sm text-gray-500">
        <p>You can get your free API key from <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">Google AI Studio</a>.</p>
        <p className="mt-2 font-bold text-yellow-500/80">
          ⚠️ Important: Never commit your API key to GitHub or share it publicly.
        </p>
      </div>
    </div>
  );
};
