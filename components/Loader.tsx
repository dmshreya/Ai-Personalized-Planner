
import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center my-12">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"></div>
      <p className="mt-4 text-lg text-gray-400">Crafting your personalized plan...</p>
      <p className="mt-2 text-sm text-gray-500">Please wait, this may take a moment.</p>
    </div>
  );
};
