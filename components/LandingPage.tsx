
import React from 'react';

interface Props {
    onGetStarted: () => void;
}

const FeatureCard: React.FC<{title: string; description: string; icon: string}> = ({title, description, icon}) => (
    <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 text-center">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
    </div>
);

export const LandingPage: React.FC<Props> = ({ onGetStarted }) => {
    return (
        <div className="text-center animate-fadeIn">
            <div className="max-w-4xl mx-auto mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-200 mb-4">
                    Stop Guessing, Start Achieving.
                </h2>
                <p className="text-lg text-gray-400 mb-8">
                    Our AI-powered planner crafts the perfect workout and diet regimen tailored just for you. We consider your goals, lifestyle, budget, and even your favorite foods to build a plan you can actually stick to.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <FeatureCard 
                    icon="🎯"
                    title="Truly Personalized"
                    description="Plans are generated based on your unique body stats, goals, and preferences."
                />
                <FeatureCard 
                    icon="🥗"
                    title="Budget-Friendly Diets"
                    description="Enjoy healthy meals that respect your cuisine preferences and your wallet."
                />
                 <FeatureCard 
                    icon="💪"
                    title="Effective Workouts"
                    description="From bodyweight to full gym, get workouts that match your available equipment."
                />
            </div>

            <button
                onClick={onGetStarted}
                className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-xl px-10 py-4 text-center transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg shadow-purple-500/20"
            >
                Create My Free Plan
            </button>
        </div>
    );
};
