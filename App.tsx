
import React, { useState } from 'react';
import { UserData, GeneratedPlan } from './types';
import { UserInputForm } from './components/UserInputForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { Loader } from './components/Loader';
import { generatePlan } from './services/geminiService';
import { SparklesIcon } from './components/icons/SparklesIcon';
import { LandingPage } from './components/LandingPage';
import { ApiKeyPrompt } from './components/ApiKeyPrompt';
import { KeyResetIcon } from './components/icons/KeyResetIcon';

type View = 'landing' | 'form' | 'results' | 'error';

const API_KEY_STORAGE_ITEM = 'gemini-api-key';

function App() {
  const [plan, setPlan] = useState<GeneratedPlan | null>(null);
  const [view, setView] = useState<View>('landing');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(() => localStorage.getItem(API_KEY_STORAGE_ITEM));

  const handleKeySubmit = (key: string) => {
    localStorage.setItem(API_KEY_STORAGE_ITEM, key);
    setApiKey(key);
  };

  const handleKeyReset = () => {
    localStorage.removeItem(API_KEY_STORAGE_ITEM);
    setApiKey(null);
    setView('landing');
  };
  
  const handleFormSubmit = async (userData: UserData) => {
    if (!apiKey) {
      setError("API Key is missing. Please set your API key to continue.");
      setView('error');
      return;
    }
    setIsLoading(true);
    setError(null);
    setPlan(null);
    try {
      const generatedPlan = await generatePlan(userData, apiKey);
      setPlan(generatedPlan);
      setView('results');
    } catch (err) {
      setError('Failed to generate a plan. Please check your API key and try again.');
      console.error(err);
      setView('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartOver = () => {
    setPlan(null);
    setError(null);
    setView('landing');
  };

  const renderContent = () => {
    switch (view) {
      case 'landing':
        return <LandingPage onGetStarted={() => setView('form')} />;
      case 'form':
        return (
          <div className="bg-gray-800 shadow-2xl rounded-2xl p-6 md:p-10 mb-10">
            <UserInputForm onSubmit={handleFormSubmit} />
          </div>
        );
      case 'results':
        return (
          plan && (
            <ResultsDisplay plan={plan} onStartOver={handleStartOver} />
          )
        );
      case 'error':
        return (
          <div className="text-center">
            <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg" role="alert">
              <strong className="font-bold">Oops! </strong>
              <span className="block sm:inline">{error}</span>
            </div>
            <button
              onClick={handleStartOver}
              className="mt-6 text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-800 font-medium rounded-lg text-lg px-8 py-3 text-center transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Try Again
            </button>
          </div>
        );
    }
  };

  const renderAppContent = () => {
    if (!apiKey) {
        return <ApiKeyPrompt onKeySubmit={handleKeySubmit} />;
    }
    if (isLoading) {
        return <Loader />;
    }
    return renderContent();
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-10 relative">
          <button onClick={handleStartOver} className="inline-flex items-center justify-center gap-3 cursor-pointer">
            <SparklesIcon />
            <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              AI Fitness Planner
            </h1>
          </button>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Your personalized workout and diet plan, crafted by AI to fit your student lifestyle.
          </p>
          {apiKey && (
            <div className="absolute top-0 right-0">
                <button 
                    onClick={handleKeyReset} 
                    className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-300 transition-colors"
                    title="Reset API Key"
                >
                    <KeyResetIcon />
                    <span>Reset Key</span>
                </button>
            </div>
          )}
        </header>

        <main>
          {renderAppContent()}
        </main>
      </div>
    </div>
  );
}

export default App;
