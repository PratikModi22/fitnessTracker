import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import WorkoutForm from '@/components/WorkoutForm';
import ProgressCharts from '@/components/ProgressCharts';
import GoalsManager from '@/components/GoalsManager';
import HealthTips from '@/components/HealthTips';
import AdminDashboard from '@/components/AdminDashboard';
import StatCard from '@/components/StatCard';
import { Activity, Calendar, Flame, Goal } from 'lucide-react';

interface Workout {
  id: string;
  type: string;
  duration: number;
  calories: number;
  date: string;
}

const Index = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([
    {
      id: '1',
      type: 'Running',
      duration: 30,
      calories: 300,
      date: '2024-06-10'
    },
    {
      id: '2',
      type: 'Weightlifting',
      duration: 45,
      calories: 200,
      date: '2024-06-11'
    },
    {
      id: '3',
      type: 'Yoga',
      duration: 60,
      calories: 150,
      date: '2024-06-12'
    }
  ]);

  const handleWorkoutAdded = (workout: Workout) => {
    setWorkouts([...workouts, workout]);
  };

  // Calculate stats
  const totalWorkouts = workouts.length;
  const totalDuration = workouts.reduce((sum, workout) => sum + workout.duration, 0);
  const totalCalories = workouts.reduce((sum, workout) => sum + workout.calories, 0);
  const thisWeekWorkouts = workouts.filter(workout => {
    const workoutDate = new Date(workout.date);
    const now = new Date();
    const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
    return workoutDate >= weekStart;
  }).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Fitness Tracker
          </h1>
          <p className="text-lg text-gray-600">
            Track your workouts, achieve your goals, and stay healthy
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Workouts"
            value={totalWorkouts.toString()}
            subtitle="All time"
            icon={Activity}
            color="bg-blue-600"
          />
          <StatCard
            title="Total Duration"
            value={`${totalDuration}m`}
            subtitle="All time"
            icon={Calendar}
            color="bg-green-600"
          />
          <StatCard
            title="Calories Burned"
            value={totalCalories.toString()}
            subtitle="All time"
            icon={Flame}
            color="bg-orange-600"
          />
          <StatCard
            title="This Week"
            value={thisWeekWorkouts.toString()}
            subtitle="Workouts"
            icon={Goal}
            color="bg-purple-600"
          />
        </div>

        {/* Main Content */}
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="tips">Tips & Suggestions</TabsTrigger>
            <TabsTrigger value="admin">Admin</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <WorkoutForm onWorkoutAdded={handleWorkoutAdded} />
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Recent Workouts</h2>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {workouts.slice(-5).reverse().map((workout) => (
                    <div key={workout.id} className="p-4 bg-white rounded-lg border shadow-sm">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">{workout.type}</h3>
                          <p className="text-sm text-muted-foreground">{workout.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm">{workout.duration} minutes</p>
                          <p className="text-sm text-muted-foreground">{workout.calories} calories</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="goals">
            <GoalsManager workouts={workouts} />
          </TabsContent>

          <TabsContent value="analytics">
            <ProgressCharts workouts={workouts} />
          </TabsContent>

          <TabsContent value="tips">
            <HealthTips />
          </TabsContent>

          <TabsContent value="admin">
            <AdminDashboard workouts={workouts} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
