import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { useCourseProgress } from "@/hooks/useUserProgress";
import { storage } from "@/lib/storage";

export default function Course() {
  const params = useParams();
  const [, navigate] = useLocation();
  const courseId = parseInt(params.id || "0");

  const { data: course } = useQuery({
    queryKey: ["course", courseId],
    queryFn: () => storage.getCourse(courseId),
    enabled: courseId > 0,
  });

  const { data: lessons = [] } = useQuery({
    queryKey: ["course", courseId, "lessons"],
    queryFn: () => storage.getLessonsByCourse(courseId),
    enabled: courseId > 0,
  });

  const { data: progress = [] } = useCourseProgress(courseId);

  const goBack = () => {
    navigate("/courses");
  };

  const startLesson = (lessonId: number) => {
    navigate(`/lesson/${lessonId}`);
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[var(--bg-light)]">
      <Header />
      
      <main className="max-w-md mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* Course Header */}
          <div className="flex items-center space-x-4 mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={goBack}
              className="text-gray-600 hover:text-gray-800 transition-colors p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-gray-800">{course.title}</h1>
              <p className="text-sm neutral-gray">{lessons.length} lessons</p>
            </div>
          </div>

          {/* Lessons List */}
          <div className="space-y-4">
            {lessons.map((lesson, index) => {
              const isCompleted = progress.some(p => p.lessonId === lesson.id && p.completed);
              const isUnlocked = index === 0 || progress.some(p => p.lessonId === lessons[index - 1]?.id && p.completed);

              return (
                <button
                  key={lesson.id}
                  onClick={() => isUnlocked && startLesson(lesson.id)}
                  disabled={!isUnlocked}
                  className={`w-full text-left bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transition-all duration-200 ${
                    isUnlocked 
                      ? "hover:shadow-xl hover:scale-102 cursor-pointer active:scale-95" 
                      : "opacity-50 cursor-not-allowed"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        Lesson {index + 1}: {lesson.title}
                      </h3>
                      <div className="flex items-center gap-3">
                        <p className="text-sm text-gray-600">
                          {isCompleted ? "✅ Completed" : isUnlocked ? "🚀 Ready to start" : "🔒 Locked"}
                        </p>
                        {isCompleted && (
                          <span className="text-xs bg-success-green text-white px-2 py-1 rounded-full">
                            +10 XP
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {isCompleted && (
                        <div className="w-10 h-10 bg-success-green rounded-full flex items-center justify-center">
                          <span className="text-white text-lg">✓</span>
                        </div>
                      )}
                      <div className={`px-6 py-3 rounded-xl font-semibold text-base transition-all duration-200 ${
                        !isUnlocked
                          ? "bg-gray-200 text-gray-400"
                          : isCompleted
                            ? "bg-gray-200 text-gray-600 hover:bg-gray-300"
                            : "bg-purple-primary text-white hover:bg-purple-primary/90"
                      }`}>
                        {isCompleted ? "Review" : isUnlocked ? "Start" : "Locked"}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
