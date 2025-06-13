
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Calendar, Flag } from 'lucide-react';

const HealthTips = () => {
  const healthTips = [
    {
      id: 1,
      title: "Stay Hydrated",
      content: "Drink at least 8 glasses of water daily, especially before, during, and after workouts.",
      category: "Nutrition",
      icon: <Activity className="w-4 h-4" />
    },
    {
      id: 2,
      title: "Progressive Overload",
      content: "Gradually increase the weight, frequency, or intensity of your workouts to continue seeing progress.",
      category: "Training",
      icon: <Flag className="w-4 h-4" />
    },
    {
      id: 3,
      title: "Rest and Recovery",
      content: "Allow at least one full rest day per week and get 7-9 hours of quality sleep each night.",
      category: "Recovery",
      icon: <Calendar className="w-4 h-4" />
    },
    {
      id: 4,
      title: "Warm-Up Properly",
      content: "Always start with 5-10 minutes of light cardio and dynamic stretching before intense exercise.",
      category: "Safety",
      icon: <Activity className="w-4 h-4" />
    },
    {
      id: 5,
      title: "Protein Intake",
      content: "Consume 0.8-1g of protein per kg of body weight daily to support muscle recovery and growth.",
      category: "Nutrition",
      icon: <Activity className="w-4 h-4" />
    }
  ];

  const workoutSuggestions = [
    {
      id: 1,
      name: "HIIT Cardio",
      duration: "20 minutes",
      description: "High-intensity intervals: 30 seconds work, 30 seconds rest",
      difficulty: "Intermediate"
    },
    {
      id: 2,
      name: "Full Body Strength",
      duration: "45 minutes",
      description: "Compound movements: squats, deadlifts, push-ups, rows",
      difficulty: "Beginner"
    },
    {
      id: 3,
      name: "Yoga Flow",
      duration: "30 minutes",
      description: "Gentle stretching and mindfulness for flexibility and recovery",
      difficulty: "All Levels"
    },
    {
      id: 4,
      name: "Running Intervals",
      duration: "35 minutes",
      description: "5 min warm-up, 20 min intervals, 10 min cool-down",
      difficulty: "Intermediate"
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Nutrition': 'bg-green-100 text-green-800',
      'Training': 'bg-blue-100 text-blue-800',
      'Recovery': 'bg-purple-100 text-purple-800',
      'Safety': 'bg-orange-100 text-orange-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors: { [key: string]: string } = {
      'Beginner': 'bg-green-100 text-green-800',
      'Intermediate': 'bg-yellow-100 text-yellow-800',
      'Advanced': 'bg-red-100 text-red-800',
      'All Levels': 'bg-blue-100 text-blue-800'
    };
    return colors[difficulty] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-green-600" />
            Health Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {healthTips.map((tip) => (
              <div key={tip.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {tip.icon}
                    <h3 className="font-medium">{tip.title}</h3>
                  </div>
                  <Badge className={getCategoryColor(tip.category)}>
                    {tip.category}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{tip.content}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flag className="w-5 h-5 text-purple-600" />
            Workout Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {workoutSuggestions.map((workout) => (
              <div key={workout.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium">{workout.name}</h3>
                  <Badge className={getDifficultyColor(workout.difficulty)}>
                    {workout.difficulty}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{workout.description}</p>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>{workout.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthTips;
