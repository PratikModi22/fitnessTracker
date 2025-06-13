
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, Activity, TrendingUp, Calendar } from 'lucide-react';
import StatCard from './StatCard';

interface Workout {
  id: string;
  type: string;
  duration: number;
  calories: number;
  date: string;
}

interface AdminDashboardProps {
  workouts: Workout[];
}

const AdminDashboard = ({ workouts }: AdminDashboardProps) => {
  // Calculate aggregate statistics
  const totalWorkouts = workouts.length;
  const totalUsers = 1; // Simulated - in real app would come from user data
  const avgWorkoutDuration = workouts.length > 0 ? Math.round(workouts.reduce((sum, w) => sum + w.duration, 0) / workouts.length) : 0;
  const totalCaloriesBurned = workouts.reduce((sum, w) => sum + w.calories, 0);

  // Most popular workout types
  const workoutTypeStats = workouts.reduce((acc: { [key: string]: number }, workout) => {
    acc[workout.type] = (acc[workout.type] || 0) + 1;
    return acc;
  }, {});

  const popularWorkouts = Object.entries(workoutTypeStats)
    .map(([type, count]) => ({ type, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Weekly activity data
  const weeklyActivity = workouts.reduce((acc: { [key: string]: { workouts: number, duration: number, calories: number } }, workout) => {
    const week = getWeekStart(new Date(workout.date));
    if (!acc[week]) {
      acc[week] = { workouts: 0, duration: 0, calories: 0 };
    }
    acc[week].workouts += 1;
    acc[week].duration += workout.duration;
    acc[week].calories += workout.calories;
    return acc;
  }, {});

  const weeklyData = Object.entries(weeklyActivity)
    .map(([week, data]) => ({ week, ...data }))
    .sort((a, b) => a.week.localeCompare(b.week))
    .slice(-8);

  // Color scheme for pie chart
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  function getWeekStart(date: Date): string {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day;
    const weekStart = new Date(d.setDate(diff));
    return weekStart.toISOString().split('T')[0];
  }

  return (
    <div className="space-y-6">
      {/* Admin Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={totalUsers.toString()}
          subtitle="Active users"
          icon={Users}
          color="bg-blue-600"
        />
        <StatCard
          title="Total Workouts"
          value={totalWorkouts.toString()}
          subtitle="All time"
          icon={Activity}
          color="bg-green-600"
        />
        <StatCard
          title="Avg Duration"
          value={`${avgWorkoutDuration}m`}
          subtitle="Per workout"
          icon={TrendingUp}
          color="bg-orange-600"
        />
        <StatCard
          title="Total Calories"
          value={totalCaloriesBurned.toString()}
          subtitle="Burned"
          icon={Calendar}
          color="bg-purple-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Weekly Activity Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="workouts" fill="#3B82F6" name="Workouts" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Popular Workout Types */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-green-600" />
              Popular Workout Types
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={popularWorkouts}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ type, percent }) => `${type} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {popularWorkouts.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Statistics Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-600" />
            Workout Statistics Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Workout Type</TableHead>
                <TableHead>Total Sessions</TableHead>
                <TableHead>Avg Duration</TableHead>
                <TableHead>Total Calories</TableHead>
                <TableHead>Avg Calories/Session</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(workoutTypeStats).map(([type, count]) => {
                const typeWorkouts = workouts.filter(w => w.type === type);
                const totalDuration = typeWorkouts.reduce((sum, w) => sum + w.duration, 0);
                const totalCalories = typeWorkouts.reduce((sum, w) => sum + w.calories, 0);
                const avgDuration = Math.round(totalDuration / count);
                const avgCalories = Math.round(totalCalories / count);
                
                return (
                  <TableRow key={type}>
                    <TableCell className="font-medium">{type}</TableCell>
                    <TableCell>{count}</TableCell>
                    <TableCell>{avgDuration}m</TableCell>
                    <TableCell>{totalCalories}</TableCell>
                    <TableCell>{avgCalories}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
