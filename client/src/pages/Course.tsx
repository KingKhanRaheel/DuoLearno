import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { useCourseProgress } from "@/hooks/useUserProgress";
import { storage } from "@/lib/storage";
import ChapterProgress from "@/components/ChapterProgress";

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

  // Group lessons by chapters for Personal Finance 101
  const getChapters = () => {
    if (courseId !== 1) return null; // Only for Personal Finance 101
    
    const chapters = [
      {
        title: "Chapter 1: Understanding Money",
        lessonRange: [0, 3] // lessons 1-4
      },
      {
        title: "Chapter 2: Budgeting Like a Boss", 
        lessonRange: [4, 7] // lessons 5-8
      },
      {
        title: "Chapter 3: Smart Saving Habits",
        lessonRange: [8, 11] // lessons 9-12
      },
      {
        title: "Chapter 4: Intro to Investing",
        lessonRange: [12, 16] // lessons 13-17
      },
      {
        title: "Chapter 5: Spending Wisely & Financial Hygiene",
        lessonRange: [17, 20] // lessons 18-21
      }
    ];

    return chapters.map(chapter => ({
      title: chapter.title,
      lessons: lessons
        .filter((_, index) => index >= chapter.lessonRange[0] && index <= chapter.lessonRange[1])
        .map(lesson => ({
          ...lesson,
          completed: progress.some(p => p.lessonId === lesson.id && p.completed)
        }))
    }));
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  const chapters = getChapters();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-teal-50 dark:from-gray-900 dark:to-gray-800 pb-20">
      <div className="container mx-auto px-4 py-8">
        {/* Course Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={goBack}
            className="text-gray-600 hover:text-purple-primary transition-colors p-3 rounded-full hover:bg-purple-primary/10"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">{course.title}</h1>
            <p className="text-gray-600 dark:text-gray-400">{course.description}</p>
            <p className="text-sm text-purple-primary font-semibold mt-1">{lessons.length} lessons • Master your money step by step</p>
          </div>
        </div>

        {/* Chapter Progress for Personal Finance 101 */}
        {chapters && <ChapterProgress chapters={chapters} />}

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
      </div>
    );
}
