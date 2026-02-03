const EXERCISES = {
    upper: [
        "Bench Press", "Push-Ups", "Overhead Press",
        "Pull-Ups", "Dumbbell Rows", "Incline Press"
    ],
    lower: [
        "Squats", "Lunges", "Deadlifts",
        "Leg Press", "Calf Raises", "Step-Ups"
    ],
    full: [
        "Burpees", "Kettlebell Swings", "Thrusters",
        "Mountain Climbers", "Jump Squats"
    ],
    core: [
        "Plank", "Hanging Leg Raises", "Russian Twists",
        "Sit-Ups", "Ab Wheel Rollouts"
    ]
};

function pick(arr, count) {
    return [...arr].sort(() => 0.5 - Math.random()).slice(0, count);
}

export function generatePlan({ goal, level, days }) {
    if (!goal || !level || !days) {
        throw new Error("Missing input data");
    }

    const intensity = level === "beginner" ? 3 : level === "intermediate" ? 4 : 5;

    const split =
        days <= 3 ? ["full"] :
            days === 4 ? ["upper", "lower", "upper", "lower"] :
                ["upper", "lower", "full", "upper", "lower"];

    const plan = split.map((day, index) => {
        const exercises = [
            ...pick(EXERCISES[day], intensity),
            ...pick(EXERCISES.core, 2)
        ];

        return {
            day: `Day ${index + 1}`,
            focus: day.toUpperCase(),
            exercises: exercises.map(e => ({
                name: e,
                sets: intensity,
                reps: goal === "strength" ? "4–6" :
                    goal === "muscle" ? "8–12" : "12–20"
            }))
        };
    });

    return {
        goal,
        level,
        days,
        program: plan
    };
}
