
import { GoogleGenAI, Type } from "@google/genai";
import type { UserData, GeneratedPlan } from '../types';

export const generatePlan = async (userData: UserData, apiKey: string): Promise<GeneratedPlan> => {
    const ai = new GoogleGenAI({ apiKey });
    
    const prompt = `
You are an expert AI fitness and nutrition coach specializing in creating plans for students.
Your task is to create a comprehensive, personalized, and actionable 7-day workout and diet plan based on the user's details.
The plan must be practical, budget-friendly, and tailored to their specific cultural background and available resources.
Adhere strictly to the JSON schema provided.

User Details:
- Age: ${userData.age}
- Gender: ${userData.gender}
- Height: ${userData.height} cm
- Weight: ${userData.weight} kg
- Primary Goal: ${userData.goal.replace('_', ' ')}
- Weekly Activity Level: ${userData.activityLevel.replace('_', ' ')}
- Dietary Preference: ${userData.dietPreference.replace('_', ' ')}
- Preferred Cuisine: ${userData.cuisine}
- Food Budget: ${userData.budget}
- Available Equipment: ${userData.equipment}
- Workout Days per Week: ${userData.daysPerWeek}

Workout Plan Instructions:
- Create a schedule for the number of days the user specified. Include rest days for the remainder of the week.
- For each workout day, specify a clear focus (e.g., 'Full Body Strength', 'Cardio & Core').
- List 5-6 exercises per workout, appropriate for the user's available equipment.
- For each exercise, provide the name, number of sets, and number of repetitions (e.g., '3 sets', '10-12 reps').

Diet Plan Instructions:
- Create a 7-day meal plan.
- For each day, provide suggestions for Breakfast, Lunch, Dinner, and one Snack.
- Meals should align with the user's dietary preferences, preferred cuisine, and budget.
- For each meal, list the food items and provide an estimated calorie count.
- Calculate and provide a total estimated daily calorie intake.

Tone:
- The tone should be encouraging and motivational.
- Provide a unique, short motivational tip.
`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    workoutPlan: {
                        type: Type.ARRAY,
                        description: "A 7-day workout plan including rest days.",
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                day: { type: Type.STRING, description: "Day of the week (e.g., Monday)." },
                                focus: { type: Type.STRING, description: "Focus of the workout or 'Rest Day'." },
                                exercises: {
                                    type: Type.ARRAY,
                                    description: "List of exercises for the day. Empty if it's a rest day.",
                                    items: {
                                        type: Type.OBJECT,
                                        properties: {
                                            name: { type: Type.STRING, description: "Name of the exercise." },
                                            sets: { type: Type.STRING, description: "Number of sets (e.g., '3 sets')." },
                                            reps: { type: Type.STRING, description: "Number of repetitions (e.g., '10-12 reps')." }
                                        },
                                        required: ["name", "sets", "reps"]
                                    }
                                }
                            },
                            required: ["day", "focus", "exercises"]
                        }
                    },
                    dietPlan: {
                        type: Type.ARRAY,
                        description: "A 7-day diet plan.",
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                day: { type: Type.STRING, description: "Day of the week (e.g., Monday)." },
                                meals: {
                                    type: Type.ARRAY,
                                    description: "List of meals for the day.",
                                    items: {
                                        type: Type.OBJECT,
                                        properties: {
                                            name: { type: Type.STRING, description: "Meal name (e.g., Breakfast, Lunch)." },
                                            items: { type: Type.STRING, description: "Food items for the meal." },
                                            calories: { type: Type.INTEGER, description: "Estimated calories for the meal." }
                                        },
                                        required: ["name", "items", "calories"]
                                    }
                                },
                                totalCalories: { type: Type.INTEGER, description: "Total estimated calories for the day." }
                            },
                            required: ["day", "meals", "totalCalories"]
                        }
                    },
                    motivationalTip: {
                        type: Type.STRING,
                        description: "A short, encouraging motivational tip."
                    }
                },
                required: ["workoutPlan", "dietPlan", "motivationalTip"]
            }
        },
    });
    
    const jsonStr = response.text.trim();
    return JSON.parse(jsonStr);
};
