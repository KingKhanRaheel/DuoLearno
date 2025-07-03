import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { BookOpen, Play, Clock, Trophy } from 'lucide-react';
import { storage } from '../lib/storage';
import { useUserProgress } from '../hooks/useUserProgress';
import { Link } from 'wouter';

export default function Courses() {
  const { data: allProgress } = useUserProgress();
  const [courses] = useState(() => storage.getAllCourses());

  const getCompletedLessons = (courseId: number) => {
    if (!allProgress) return 0;
    return allProgress.filter(p => {
      const lesson = storage.getLesson(p.lessonId);
      return lesson && lesson.courseId === courseId && p.completed;
    }).length;
  };

  const getCourseProgress = (courseId: number, totalLessons: number) => {
    const completed = getCompletedLessons(courseId);
    return totalLessons > 0 ? (completed / totalLessons) * 100 : 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-teal-50 dark:from-gray-900 dark:to-gray-800 pb-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-primary to-teal-primary bg-clip-text text-transparent mb-4">
            Choose Your Learning Path
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore our interactive courses designed to help you learn and grow at your own pace.
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => {
            const completedLessons = getCompletedLessons(course.id);
            const progress = getCourseProgress(course.id, course.totalLessons);
            const isStarted = completedLessons > 0;

            return (
              <Link key={course.id} href={`/course/${course.id}`}>
                <Card className="glassmorphism border-none hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer active:scale-95 h-full">
                  <CardHeader className="text-center pb-4">
                    <div className="text-5xl mb-4">{course.icon}</div>
                    <CardTitle className="text-xl font-bold mb-2">{course.title}</CardTitle>
                    <CardDescription className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {course.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Progress Bar */}
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-3">
                        <span className="font-medium">Progress</span>
                        <span className="font-semibold">{completedLessons}/{course.totalLessons} lessons</span>
                      </div>
                      <Progress value={progress} className="h-3 bg-gray-200" />
                    </div>

                    {/* Course Stats */}
                    <div className="flex items-center justify-between text-sm bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Clock size={18} />
                        <span className="font-medium">{course.totalLessons} lessons</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Trophy size={18} />
                        <span className="font-medium">{completedLessons * 10} XP</span>
                      </div>
                    </div>

                    {/* Status Badge and Button */}
                    <div className="space-y-3">
                      <div className="flex justify-center">
                        {progress === 100 ? (
                          <Badge className="bg-success-green text-white px-4 py-1 text-sm">
                            ✓ Completed
                          </Badge>
                        ) : isStarted ? (
                          <Badge className="bg-warning-orange text-white px-4 py-1 text-sm">
                            📚 In Progress
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="px-4 py-1 text-sm">
                            🚀 Ready to Start
                          </Badge>
                        )}
                      </div>

                      {/* Action Button */}
                      <Button 
                        className="w-full bg-gradient-to-r from-purple-primary to-teal-primary hover:opacity-90 text-white rounded-xl py-3 text-base font-semibold transition-all duration-200 active:scale-95"
                        size="lg"
                      >
                        <Play size={18} className="mr-2" />
                        {isStarted ? 'Continue Learning' : 'Start Course'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <Card className="glassmorphism border-none max-w-2xl mx-auto">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">
                More Courses Coming Soon!
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We're constantly adding new courses to help you expand your knowledge. 
                Complete existing courses to unlock advanced content and earn bonus XP.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}