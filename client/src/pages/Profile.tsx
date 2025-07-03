import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { Trophy, Flame, Heart, BookOpen, Target, Calendar } from 'lucide-react';
import { useUser, useUserProgress } from '../hooks/useUserProgress';
import { storage } from '../lib/storage';
import { useMemo } from 'react';

export default function Profile() {
  const { data: user } = useUser();
  const { data: allProgress } = useUserProgress();
  
  const stats = useMemo(() => {
    if (!allProgress) return { totalLessons: 0, completedLessons: 0, totalCourses: 0, activeCourses: 0 };
    
    const allCourses = storage.getAllCourses();
    const totalLessons = allCourses.reduce((sum, course) => sum + course.totalLessons, 0);
    const completedLessons = allProgress.filter(p => p.completed).length;
    
    const activeCourses = allCourses.filter(course => {
      const courseProgress = allProgress.filter(p => {
        const lesson = storage.getLesson(p.lessonId);
        return lesson && lesson.courseId === course.id && p.completed;
      });
      return courseProgress.length > 0;
    }).length;
    
    return {
      totalLessons,
      completedLessons,
      totalCourses: allCourses.length,
      activeCourses
    };
  }, [allProgress]);

  if (!user) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  const overallProgress = stats.totalLessons > 0 ? (stats.completedLessons / stats.totalLessons) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-teal-50 dark:from-gray-900 dark:to-gray-800 pb-20">
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-r from-purple-primary to-teal-primary rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
            {user.username.charAt(0).toUpperCase()}
          </div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            {user.username}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">Learning Explorer</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="glassmorphism border-none">
            <CardHeader className="text-center pb-2">
              <Trophy className="w-8 h-8 mx-auto text-yellow-500 mb-2" />
              <CardTitle className="text-2xl font-bold text-purple-primary">{user.xp}</CardTitle>
              <CardDescription>Total XP</CardDescription>
            </CardHeader>
          </Card>

          <Card className="glassmorphism border-none">
            <CardHeader className="text-center pb-2">
              <Flame className="w-8 h-8 mx-auto text-orange-500 mb-2" />
              <CardTitle className="text-2xl font-bold text-orange-500">{user.streak}</CardTitle>
              <CardDescription>Day Streak</CardDescription>
            </CardHeader>
          </Card>

          <Card className="glassmorphism border-none">
            <CardHeader className="text-center pb-2">
              <Heart className="w-8 h-8 mx-auto text-red-500 mb-2" />
              <CardTitle className="text-2xl font-bold text-red-500">{user.hearts}</CardTitle>
              <CardDescription>Hearts</CardDescription>
            </CardHeader>
          </Card>

          <Card className="glassmorphism border-none">
            <CardHeader className="text-center pb-2">
              <BookOpen className="w-8 h-8 mx-auto text-teal-primary mb-2" />
              <CardTitle className="text-2xl font-bold text-teal-primary">{stats.completedLessons}</CardTitle>
              <CardDescription>Lessons Done</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Progress Overview */}
        <Card className="glassmorphism border-none mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Learning Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <span>Overall Progress</span>
                  <span>{stats.completedLessons}/{stats.totalLessons} lessons</span>
                </div>
                <Progress value={overallProgress} className="h-3" />
                <div className="text-center mt-2">
                  <Badge variant="secondary" className="text-xs">
                    {Math.round(overallProgress)}% Complete
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Course Progress */}
        <Card className="glassmorphism border-none mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Course Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="text-center p-4 rounded-lg bg-purple-primary/10">
                <div className="text-2xl font-bold text-purple-primary">{stats.activeCourses}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Active Courses</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-teal-primary/10">
                <div className="text-2xl font-bold text-teal-primary">{stats.totalCourses}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Courses</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="glassmorphism border-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {user.lastActivityDate ? (
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <div>
                    <div className="font-medium">Last Activity</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(user.lastActivityDate).toLocaleDateString()}
                    </div>
                  </div>
                  <Badge variant="outline">
                    {user.streak > 0 ? `${user.streak} day streak!` : 'Keep going!'}
                  </Badge>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  Start your first lesson to begin tracking your activity!
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}