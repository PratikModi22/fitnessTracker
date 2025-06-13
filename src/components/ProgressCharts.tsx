
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Activity, Calendar } from 'lucide-react';

interface Workout {
  id: string;
  type: string;
  duration: number;
  calories: number;
  date: string;
}

interface ProgressChartsProps {
  workouts: Workout[];
}

const ProgressCharts = ({ workouts }: ProgressChartsProps) => {
  // Process data for weekly view
  const getWeeklyData = () => {
    const weeklyData: { [key: string]: { duration: number; calories: number; date: string } } = {};
    
    workouts.forEach(workout => {
      const date = workout.date;
      if (!weeklyData[date]) {
        weeklyData[date] = { duration: 0, calories: 0, date };
      }
      weeklyData[date].duration += workout.duration;
      weeklyData[date].calories += workout.calories;
    });
    
    return Object.values(weeklyData).slice(-7);
  };

  // Process data for workout types
  const getWorkoutTypeData = () => {
    const typeData: { [key: string]: number } = {};
    
    workouts.forEach(workout => {
      typeData[workout.type] = (typeData[workout.type] || 0) + workout.duration;
    });
    
    return Object.entries(typeData).map(([type, duration]) => ({
      type,
      duration
    }));
  };

  const weeklyData = getWeeklyData();
  const workoutTypeData = getWorkoutTypeData();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-green-600" />
            Weekly Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Bar yAxisId="left" dataKey="duration" fill="#3B82F6" name="Duration (min)" />
              <Line yAxisId="right" type="monotone" dataKey="calories" stroke="#10B981" strokeWidth={3} name="Calories" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-purple-600" />
            Workout Types Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={workoutTypeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="duration" fill="#8B5CF6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressCharts;
