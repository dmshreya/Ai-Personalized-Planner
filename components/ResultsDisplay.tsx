
import React, { useState } from 'react';
import type { GeneratedPlan } from '../types';
import { WorkoutPlanDisplay } from './WorkoutPlanDisplay';
import { DietPlanDisplay } from './DietPlanDisplay';

interface Props {
  plan: GeneratedPlan;
  onStartOver: () => void;
}

type ActiveTab = 'workout' | 'diet';

export const ResultsDisplay: React.FC<Props> = ({ plan, onStartOver }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('workout');

  const TabButton: React.FC<{
    label: string;
    tabName: ActiveTab;
    isActive: boolean;
    onClick: (tabName: ActiveTab) => void;
  }> = ({ label, tabName, isActive, onClick }) => {
    const baseClasses = "w-full py-3 px-4 text-lg font-bold rounded-t-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800";
    const activeClasses = "bg-gray-800 text-white shadow-inner";
    const inactiveClasses = "bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-white";
    const ringColor = tabName === 'workout' ? 'focus:ring-cyan-500' : 'focus:ring-green-500';

    return (
      <button
        onClick={() => onClick(tabName)}
        className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses} ${ringColor}`}
        aria-selected={isActive}
        role="tab"
      >
        {label}
      </button>
    );
  };

  return (
    <div className="animate-fadeIn space-y-8">
      <div className="bg-gray-700 p-1 rounded-lg grid grid-cols-2 gap-1" role="tablist">
        <TabButton
          label="Workout Plan"
          tabName="workout"
          isActive={activeTab === 'workout'}
          onClick={setActiveTab}
        />
        <TabButton
          label="Diet Plan"
          tabName="diet"
          isActive={activeTab === 'diet'}
          onClick={setActiveTab}
        />
      </div>

      <div className="bg-gray-800 shadow-2xl rounded-b-2xl p-6 md:p-8">
        {activeTab === 'workout' && (
          <div role="tabpanel" className="animate-fadeIn">
            <WorkoutPlanDisplay plan={plan.workoutPlan} />
          </div>
        )}
        {activeTab === 'diet' && (
          <div role="tabpanel" className="animate-fadeIn">
            <DietPlanDisplay plan={plan.dietPlan} />
          </div>
        )}
      </div>

      <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-xl shadow-lg text-center animate-fadeIn">
        <h3 className="text-2xl font-bold mb-2">Motivational Tip!</h3>
        <p className="text-lg italic text-white/90">"{plan.motivationalTip}"</p>
      </div>

      <div className="text-center">
        <button
          onClick={onStartOver}
          className="text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-800 font-medium rounded-lg text-lg px-8 py-3 text-center transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Start Over
        </button>
      </div>
    </div>
  );
};
