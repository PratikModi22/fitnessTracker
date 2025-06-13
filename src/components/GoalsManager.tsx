
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Flag, Goal } from 'lucide-react';

interface Goal {
  id: string;
  title: string;
  target: number;
  current: number;
  unit: string;
  type: 'weekly' | 'monthly';
}

interface Workout {
  id: string;
  type: string;
  duration: number;
  calories: number;
  date: string;
}

interface GoalsManagerProps {
  workouts: Workout[];
}

const GoalsManager = ({ workouts }: GoalsManagerProps) => {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Weekly Workout Duration',
      target: 300,
      current: 0,
      unit: 'minutes',
      type: 'weekly'
    },
    {
      id: '2',
      title: 'Monthly Calories Burned',
      target: 8000,
      current: 0,
      unit: 'calories',
      type: 'monthly'
    }
  ]);

  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalTarget, setNewGoalTarget] = useState('');
  const [newGoalUnit, setNewGoalUnit] = useState('');

  // Calculate current progress for goals
  const calculateProgress = (goal: Goal) => {
    const now = new Date();
    let startDate: Date;
    
    if (goal.type === 'weekly') {
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
    } else {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    }
    
    const relevantWorkouts = workouts.filter(workout => 
      new Date(workout.date) >= startDate
    );
    
    if (goal.unit === 'minutes') {
      return relevantWorkouts.reduce((sum, workout) => sum + workout.duration, 0);
    } else if (goal.unit === 'calories') {
      return relevantWorkouts.reduce((sum, workout) => sum + workout.calories, 0);
    }
    
    return 0;
  };

  const addGoal = () => {
    if (!newGoalTitle || !newGoalTarget || !newGoalUnit) return;
    
    const newGoal: Goal = {
      id: Date.now().toString(),
      title: newGoalTitle,
      target: parseInt(newGoalTarget),
      current: 0,
      unit: newGoalUnit,
      type: 'weekly'
    };
    
    setGoals([...goals, newGoal]);
    setNewGoalTitle('');
    setNewGoalTarget('');
    setNewGoalUnit('');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Goal className="w-5 h-5 text-orange-600" />
            Your Goals
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {goals.map((goal) => {
            const current = calculateProgress(goal);
            const progress = Math.min((current / goal.target) * 100, 100);
            
            return (
              <div key={goal.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{goal.title}</h3>
                  <span className="text-sm text-muted-foreground">
                    {current} / {goal.target} {goal.unit}
                  </span>
                </div>
                <Progress value={progress} className="h-2" />
                <div className="text-sm text-muted-foreground">
                  {progress.toFixed(1)}% complete
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flag className="w-5 h-5 text-red-600" />
            Add New Goal
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="goal-title">Goal Title</Label>
            <Input
              id="goal-title"
              value={newGoalTitle}
              onChange={(e) => setNewGoalTitle(e.target.value)}
              placeholder="e.g., Weekly Running Distance"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="goal-target">Target</Label>
            <Input
              id="goal-target"
              type="number"
              value={newGoalTarget}
              onChange={(e) => setNewGoalTarget(e.target.value)}
              placeholder="100"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="goal-unit">Unit</Label>
            <Input
              id="goal-unit"
              value={newGoalUnit}
              onChange={(e) => setNewGoalUnit(e.target.value)}
              placeholder="e.g., minutes, calories, miles"
            />
          </div>
          
          <Button onClick={addGoal} className="w-full bg-orange-600 hover:bg-orange-700">
            Add Goal
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default GoalsManager;
