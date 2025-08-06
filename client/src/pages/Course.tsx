import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Play, CheckCircle, Lock } from "lucide-react";
import { useCourseProgress } from "@/hooks/useUserProgress";

export default function Course() {
  const params = useParams();
  const [, navigate] = useLocation();
  const courseId = parseInt(params.id || "0");

  const { data: course } = useQuery({
    queryKey: ["course", courseId],
    queryFn: async () => {
      const response = await fetch(`/api/courses/${courseId}`);
      return response.json();
    },
    enabled: courseId > 0,
  });

  const { data: lessons = [] } = useQuery({
    queryKey: ["course", courseId, "lessons"],
    queryFn: async () => {
      const response = await fetch(`/api/courses/${courseId}/lessons`);
      return response.json();
    },
    enabled: courseId > 0,
  });

  const { data: progress = [] } = useCourseProgress(courseId);

  const goBack = () => {
    navigate("/");
  };

  const startLesson = (lessonId: number) => {
    navigate(`/lesson/${lessonId}`);
  };

  const getChapters = () => {
    const chapters = [
      {
        title: "Understanding Money",
        description: "Why money matters, and how to take control of it",
        lessonRange: [0, 3],
        color: "from-blue-400 to-blue-600",
        icon: "💡"
      },
      {
        title: "Budgeting Like a Boss", 
        description: "Control where your money goes instead of wondering where it went",
        lessonRange: [4, 7],
        color: "from-green-400 to-green-600",
        icon: "📊"
      },
      {
        title: "Smart Saving Habits",
        description: "Save to buy freedom, not just things",
        lessonRange: [8, 11],
        color: "from-purple-400 to-purple-600",
        icon: "🏦"
      },
      {
        title: "Intro to Investing",
        description: "Your money should work while you sleep",
        lessonRange: [12, 16],
        color: "from-orange-400 to-orange-600",
        icon: "📈"
      },
      {
        title: "Spending Wisely & Financial Hygiene",
        description: "A budget without discipline is just a wishlist",
        lessonRange: [17, 21],
        color: "from-pink-400 to-pink-600",
        icon: "🛡️"
      }
    ];

    return chapters.map((chapter, chapterIndex) => {
      const chapterLessons = lessons
        .filter((_: any, index: number) => index >= chapter.lessonRange[0] && index <= chapter.lessonRange[1])
        .map((lesson: any) => ({
          ...lesson,
          completed: progress.some((p: any) => p.lessonId === lesson.id && p.completed)
        }));
      
      const completedCount = chapterLessons.filter((l: any) => l.completed).length;
      const isChapterUnlocked = chapterIndex === 0 || 
        (chapterIndex > 0 && chapters[chapterIndex - 1] && 
         lessons.filter((_: any, index: number) => index >= chapters[chapterIndex - 1].lessonRange[0] && index <= chapters[chapterIndex - 1].lessonRange[1])
              .every((lesson: any, i: number) => progress.some((p: any) => p.lessonId === lesson.id && p.completed)));

      return {
        ...chapter,
        lessons: chapterLessons,
        completedCount,
        totalCount: chapterLessons.length,
        isUnlocked: isChapterUnlocked
      };
    });
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-teal-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full"
        />
      </div>
    );
  }

  const chapters = getChapters();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-teal-50 dark:from-gray-900 dark:to-gray-800">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-md mx-auto px-4 py-6"
      >
        {/* Header */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center gap-4 mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={goBack}
            className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </motion.button>
          
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{course.title}</h1>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{course.description}</p>
          </div>
        </motion.div>

        {/* Chapters */}
        <div className="space-y-6">
          {chapters.map((chapter, chapterIndex) => (
            <motion.div
              key={chapterIndex}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: chapterIndex * 0.1 }}
              className={`relative ${!chapter.isUnlocked ? 'opacity-60' : ''}`}
            >
              {/* Chapter Header */}
              <motion.div 
                className={`bg-gradient-to-r ${chapter.color} rounded-2xl p-6 text-white mb-4 relative overflow-hidden`}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-4">
                  <motion.div 
                    className="text-3xl"
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 4 + chapterIndex
                    }}
                  >
                    {chapter.icon}
                  </motion.div>
                  
                  <div className="flex-1">
                    <h2 className="text-xl font-bold mb-1">Chapter {chapterIndex + 1}</h2>
                    <h3 className="text-lg font-semibold mb-2">{chapter.title}</h3>
                    <p className="text-white/90 text-sm mb-3">{chapter.description}</p>
                    
                    <div className="flex items-center gap-3">
                      <div className="bg-white/20 rounded-full h-2 flex-1">
                        <motion.div 
                          className="bg-white h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${(chapter.completedCount / chapter.totalCount) * 100}%` }}
                          transition={{ duration: 1, delay: chapterIndex * 0.2 }}
                        />
                      </div>
                      <span className="text-sm font-medium">
                        {chapter.completedCount}/{chapter.totalCount}
                      </span>
                    </div>
                  </div>

                  {!chapter.isUnlocked && (
                    <Lock className="w-6 h-6 text-white/80" />
                  )}
                </div>
              </motion.div>

              {/* Chapter Lessons */}
              {chapter.isUnlocked && (
                <motion.div 
                  className="space-y-3"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ delay: chapterIndex * 0.1 + 0.2 }}
                >
                  {chapter.lessons.map((lesson: any, lessonIndex: number) => {
                    const globalIndex = chapter.lessonRange[0] + lessonIndex;
                    const isUnlocked = globalIndex === 0 || 
                      progress.some((p: any) => p.lessonId === lessons[globalIndex - 1]?.id && p.completed);
                    
                    return (
                      <motion.button
                        key={lesson.id}
                        onClick={() => isUnlocked && startLesson(lesson.id)}
                        disabled={!isUnlocked}
                        className={`w-full text-left bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm transition-all duration-200 ${
                          isUnlocked 
                            ? "hover:shadow-lg cursor-pointer" 
                            : "opacity-50 cursor-not-allowed"
                        }`}
                        whileHover={isUnlocked ? { scale: 1.02 } : {}}
                        whileTap={isUnlocked ? { scale: 0.98 } : {}}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            lesson.completed 
                              ? "bg-green-500 text-white" 
                              : isUnlocked 
                                ? "bg-blue-100 text-blue-600" 
                                : "bg-gray-200 text-gray-400"
                          }`}>
                            {lesson.completed ? (
                              <CheckCircle className="w-5 h-5" />
                            ) : isUnlocked ? (
                              <Play className="w-4 h-4" />
                            ) : (
                              <Lock className="w-4 h-4" />
                            )}
                          </div>
                          
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800 dark:text-white">
                              {lesson.title}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              {lesson.completed ? "Completed ✨" : isUnlocked ? "Ready to start" : "Locked"}
                            </p>
                          </div>

                          {lesson.completed && (
                            <motion.div 
                              className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                            >
                              +15 XP
                            </motion.div>
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
