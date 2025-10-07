
import React from 'react';
import type { DailyWorkout } from '../types';
import { DumbbellIcon } from './icons/DumbbellIcon';

interface Props {
  plan: DailyWorkout[];
}

export const WorkoutPlanDisplay: React.FC<Props> = ({ plan }) => {
  return (
    <section>
      <div className="flex items-center gap-4 mb-6">
        <DumbbellIcon />
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
          Your Weekly Workout Plan
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {plan.map((dayPlan) => (
          <div key={dayPlan.day} className="bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col border border-gray-700 hover:border-cyan-500 transition-all duration-300 transform hover:-translate-y-1">
            <h3 className="text-xl font-bold mb-1 text-cyan-400">{dayPlan.day}</h3>
            <p className="text-gray-400 mb-4 font-semibold">{dayPlan.focus}</p>
            {dayPlan.exercises.length > 0 ? (
              <ul className="space-y-3 text-gray-300 flex-grow">
                {dayPlan.exercises.map((exercise) => (
                  <li key={exercise.name} className="flex justify-between items-center bg-gray-700/50 p-3 rounded-md">
                    <span className="font-medium">{exercise.name}</span>
                    <span className="text-sm text-cyan-300 font-mono">{exercise.sets} x {exercise.reps}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex-grow flex items-center justify-center">
                <p className="text-gray-500 italic">Enjoy your rest!</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
