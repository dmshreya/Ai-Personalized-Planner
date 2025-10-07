
import React from 'react';
import type { DailyDiet } from '../types';
import { CutleryIcon } from './icons/CutleryIcon';

interface Props {
  plan: DailyDiet[];
}

export const DietPlanDisplay: React.FC<Props> = ({ plan }) => {
  return (
    <section>
       <div className="flex items-center gap-4 mb-6">
        <CutleryIcon />
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-600">
          Your Weekly Diet Plan
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plan.map((dayPlan) => (
          <div key={dayPlan.day} className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700 hover:border-green-500 transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex justify-between items-baseline mb-4">
                <h3 className="text-xl font-bold text-green-400">{dayPlan.day}</h3>
                <p className="text-sm font-semibold text-gray-400">~{dayPlan.totalCalories} kcal</p>
            </div>
            <div className="space-y-4">
                {dayPlan.meals.map((meal) => (
                    <div key={meal.name} className="bg-gray-700/50 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-1">
                            <h4 className="font-bold text-gray-200">{meal.name}</h4>
                            <p className="text-xs text-green-300 font-mono">~{meal.calories} kcal</p>
                        </div>
                        <p className="text-sm text-gray-300">{meal.items}</p>
                    </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
