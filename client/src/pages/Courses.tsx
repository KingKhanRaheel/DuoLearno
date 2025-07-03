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
              <Card key={course.id} className="glassmorphism border-none hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardHeader className="text-center">
                  <div className="text-4xl mb-3">{course.icon}</div>
                  <CardTitle className="text-xl font-bold">{course.title}</CardTitle>
                  <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <span>Progress</span>
                      <span>{completedLessons}/{course.totalLessons} lessons</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>

                  {/* Course Stats */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                      <Clock size={16} />
                      <span>{course.totalLessons} lessons</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                      <Trophy size={16} />
                      <span>{completedLessons * 10} XP</span>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="flex justify-center">
                    {progress === 100 ? (
                      <Badge className="bg-success-green text-white">
                        Completed
                      </Badge>
                    ) : isStarted ? (
                      <Badge className="bg-warning-orange text-white">
                        In Progress
                      </Badge>
                    ) : (
                      <Badge variant="outline">
                        Not Started
                      </Badge>
                    )}
                  </div>

                  {/* Action Button */}
                  <Link href={`/course/${course.id}`}>
                    <Button 
                      className="w-full bg-gradient-to-r from-purple-primary to-teal-primary hover:opacity-90 text-white rounded-full"
                      size="lg"
                    >
                      <Play size={16} className="mr-2" />
                      {isStarted ? 'Continue' : 'Start Course'}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
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