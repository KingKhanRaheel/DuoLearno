import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import CourseCard from "@/components/CourseCard";
import { useUserProgress } from "@/hooks/useUserProgress";
import { storage } from "@/lib/storage";
import type { CourseWithProgress } from "@/lib/types";

export default function Home() {
  const [, navigate] = useLocation();
  const { data: courses = [] } = useQuery({
    queryKey: ["courses"],
    queryFn: () => storage.getAllCourses()
  });
  const { data: userProgress = [] } = useUserProgress();

  const coursesWithProgress: CourseWithProgress[] = courses.map(course => {
    // Get lessons for this course to calculate total
    const courseLessons = storage.getLessonsByCourse(course.id);
    const totalLessons = courseLessons.length;
    
    // Calculate completed lessons from progress
    const courseProgress = userProgress.filter(p => {
      const lesson = storage.getLesson(p.lessonId);
      return lesson && lesson.courseId === course.id && p.completed;
    });
    const completedLessons = courseProgress.length;
    const progress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

    return {
      ...course,
      totalLessons,
      completedLessons,
      progress
    };
  });

  const handleStartCourse = (courseId: number) => {
    navigate(`/course/${courseId}`);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-light)]">
      <Header />
      
      <main className="max-w-md mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* Welcome Section */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-gray-800">Welcome back!</h1>
            <p className="neutral-gray">Ready to learn something new today?</p>
          </div>

          {/* Course List */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Choose a course</h2>
            
            <div className="space-y-4">
              {coursesWithProgress.map(course => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onStart={handleStartCourse}
                />
              ))}
            </div>
          </div>

          {/* Daily Goal */}
          <div className="bg-gradient-to-r from-[var(--warning-orange)] to-yellow-400 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg mb-1">Daily Goal</h3>
                <p className="text-sm opacity-90">Complete 1 lesson today</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">1/1</div>
                <div className="text-xs opacity-90">lessons</div>
              </div>
            </div>
            <div className="mt-4 bg-white bg-opacity-20 rounded-full h-2">
              <div className="bg-white h-2 rounded-full w-full"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
