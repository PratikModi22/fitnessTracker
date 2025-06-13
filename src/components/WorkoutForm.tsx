
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Activity, Clock, Flame } from 'lucide-react';

interface Workout {
  id: string;
  type: string;
  duration: number;
  calories: number;
  date: string;
}

interface WorkoutFormProps {
  onWorkoutAdded: (workout: Workout) => void;
}

const WorkoutForm = ({ onWorkoutAdded }: WorkoutFormProps) => {
  const [type, setType] = useState('');
  const [duration, setDuration] = useState('');
  const [calories, setCalories] = useState('');

  const workoutTypes = [
    'Running', 'Cycling', 'Swimming', 'Weightlifting', 'Yoga', 
    'Pilates', 'Basketball', 'Soccer', 'Tennis', 'Dancing', 'Walking', 'Other'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!type || !duration || !calories) return;

    const newWorkout: Workout = {
      id: Date.now().toString(),
      type,
      duration: parseInt(duration),
      calories: parseInt(calories),
      date: new Date().toISOString().split('T')[0]
    };

    onWorkoutAdded(newWorkout);
    setType('');
    setDuration('');
    setCalories('');
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-600" />
          Log Workout
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="workout-type">Workout Type</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue placeholder="Select workout type" />
              </SelectTrigger>
              <SelectContent>
                {workoutTypes.map((workoutType) => (
                  <SelectItem key={workoutType} value={workoutType}>
                    {workoutType}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="duration" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Duration (minutes)
            </Label>
            <Input
              id="duration"
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="30"
              min="1"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="calories" className="flex items-center gap-2">
              <Flame className="w-4 h-4" />
              Calories Burned
            </Label>
            <Input
              id="calories"
              type="number"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              placeholder="300"
              min="1"
            />
          </div>
          
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
            Add Workout
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default WorkoutForm;
