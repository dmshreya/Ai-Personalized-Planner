
import React, { useState } from 'react';
import type { UserData } from '../types';

interface Props {
  onSubmit: (userData: UserData) => void;
}

const initialFormData: UserData = {
  age: '20',
  gender: 'male',
  height: '175',
  weight: '70',
  goal: 'muscle_gain',
  activityLevel: 'moderately_active',
  dietPreference: 'any',
  cuisine: 'Any',
  budget: 'medium',
  equipment: 'gym',
  daysPerWeek: '4',
};

const FormField: React.FC<{ children: React.ReactNode; label: string; htmlFor: string }> = ({ children, label, htmlFor }) => (
    <div>
      <label htmlFor={htmlFor} className="block mb-2 text-sm font-medium text-gray-300">
        {label}
      </label>
      {children}
    </div>
);

const TextInput: React.FC<{id: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; type?: string; placeholder: string;}> = ({id, name, value, onChange, type = "number", placeholder}) => (
    <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
        placeholder={placeholder}
        required
    />
);

const SelectInput: React.FC<{id: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; children: React.ReactNode;}> = ({ id, name, value, onChange, children }) => (
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
    >
      {children}
    </select>
);

const TOTAL_STEPS = 3;

export const UserInputForm: React.FC<Props> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<UserData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const nextStep = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Progress Bar */}
      <div>
        <h3 className="text-lg font-medium text-gray-400 mb-2 text-center">Step {currentStep} of {TOTAL_STEPS}</h3>
        <div className="w-full bg-gray-700 rounded-full h-2.5">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2.5 rounded-full" style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}></div>
        </div>
      </div>
      
      {currentStep === 1 && (
        <section className="space-y-6 animate-fadeIn">
          <h2 className="text-2xl font-bold text-center text-gray-200">Personal Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FormField label="Age" htmlFor="age">
              <TextInput id="age" name="age" value={formData.age} onChange={handleChange} placeholder="e.g., 20" />
            </FormField>
            <FormField label="Gender" htmlFor="gender">
              <SelectInput id="gender" name="gender" value={formData.gender} onChange={handleChange}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </SelectInput>
            </FormField>
            <FormField label="Height (cm)" htmlFor="height">
              <TextInput id="height" name="height" value={formData.height} onChange={handleChange} placeholder="e.g., 175" />
            </FormField>
            <FormField label="Weight (kg)" htmlFor="weight">
              <TextInput id="weight" name="weight" value={formData.weight} onChange={handleChange} placeholder="e.g., 70" />
            </FormField>
          </div>
        </section>
      )}

      {currentStep === 2 && (
        <section className="space-y-6 animate-fadeIn">
          <h2 className="text-2xl font-bold text-center text-gray-200">Fitness Goals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            <FormField label="Primary Goal" htmlFor="goal">
              <SelectInput id="goal" name="goal" value={formData.goal} onChange={handleChange}>
                <option value="weight_loss">Weight Loss</option>
                <option value="muscle_gain">Muscle Gain</option>
                <option value="maintenance">Maintenance</option>
                <option value="endurance">Improve Endurance</option>
              </SelectInput>
            </FormField>
            <FormField label="Workout Days Per Week" htmlFor="daysPerWeek">
                <SelectInput id="daysPerWeek" name="daysPerWeek" value={formData.daysPerWeek} onChange={handleChange}>
                    <option value="2">2 days</option>
                    <option value="3">3 days</option>
                    <option value="4">4 days</option>
                    <option value="5">5 days</option>
                    <option value="6">6 days</option>
                </SelectInput>
            </FormField>
          </div>
          <FormField label="Activity Level" htmlFor="activityLevel">
            <SelectInput id="activityLevel" name="activityLevel" value={formData.activityLevel} onChange={handleChange}>
              <option value="sedentary">Sedentary (little to no exercise)</option>
              <option value="lightly_active">Lightly Active (light exercise/sports 1-3 days/week)</option>
              <option value="moderately_active">Moderately Active (moderate exercise/sports 3-5 days/week)</option>
              <option value="very_active">Very Active (hard exercise/sports 6-7 days a week)</option>
            </SelectInput>
          </FormField>
          <FormField label="Available Equipment" htmlFor="equipment">
            <SelectInput id="equipment" name="equipment" value={formData.equipment} onChange={handleChange}>
              <option value="none">No Equipment (Bodyweight)</option>
              <option value="basic">Basic (Dumbbells, Bands)</option>
              <option value="gym">Full Gym Access</option>
            </SelectInput>
          </FormField>
        </section>
      )}
      
      {currentStep === 3 && (
        <section className="space-y-6 animate-fadeIn">
          <h2 className="text-2xl font-bold text-center text-gray-200">Diet & Lifestyle</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField label="Dietary Preference" htmlFor="dietPreference">
              <SelectInput id="dietPreference" name="dietPreference" value={formData.dietPreference} onChange={handleChange}>
                <option value="any">Any</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="non_vegetarian">Non-Vegetarian</option>
              </SelectInput>
            </FormField>
            <FormField label="Preferred Cuisine" htmlFor="cuisine">
              <TextInput id="cuisine" name="cuisine" value={formData.cuisine} onChange={handleChange} type="text" placeholder="e.g., Indian, Italian" />
            </FormField>
            <FormField label="Food Budget" htmlFor="budget">
              <SelectInput id="budget" name="budget" value={formData.budget} onChange={handleChange}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </SelectInput>
            </FormField>
          </div>
        </section>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center pt-4">
        <button 
          type="button" 
          onClick={prevStep}
          className="text-white bg-gray-600 hover:bg-gray-700 font-medium rounded-lg text-lg px-8 py-3 text-center transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={currentStep === 1}
        >
          Back
        </button>

        {currentStep < TOTAL_STEPS && (
           <button 
              type="button" 
              onClick={nextStep}
              className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-lg px-8 py-3 text-center transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Next
            </button>
        )}

        {currentStep === TOTAL_STEPS && (
          <button 
            type="submit" 
            className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-lg px-8 py-3 text-center transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Create My Plan
          </button>
        )}
      </div>
    </form>
  );
};
