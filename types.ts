
export interface UserData {
  age: string;
  gender: 'male' | 'female' | 'other';
  height: string;
  weight: string;
  goal: 'weight_loss' | 'muscle_gain' | 'maintenance' | 'endurance';
  activityLevel: 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active';
  dietPreference: 'vegetarian' | 'vegan' | 'non_vegetarian' | 'any';
  cuisine: string;
  budget: 'low' | 'medium' | 'high';
  equipment: 'none' | 'basic' | 'gym';
  daysPerWeek: string;
}

export interface Exercise {
  name: string;
  sets: string;
  reps: string;
}

export interface DailyWorkout {
  day: string;
  focus: string;
  exercises: Exercise[];
}

export interface Meal {
  name: string;
  items: string;
  calories: number;
}

export interface DailyDiet {
  day: string;
  meals: Meal[];
  totalCalories: number;
}

export interface GeneratedPlan {
  workoutPlan: DailyWorkout[];
  dietPlan: DailyDiet[];
  motivationalTip: string;
}
