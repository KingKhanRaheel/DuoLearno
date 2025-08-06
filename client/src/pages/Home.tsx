import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Zap, Trophy, Flame } from "lucide-react";
import { useUserProgress } from "@/hooks/useUserProgress";

export default function Home() {
  const [, navigate] = useLocation();
  
  const { data: courses = [] } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const response = await fetch("/api/courses");
      return response.json();
    }
  });
  
  const { data: userProgress = [] } = useUserProgress();
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await fetch("/api/user");
      return response.json();
    }
  });

  const handleStartCourse = (courseId: number) => {
    navigate(`/course/${courseId}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-teal-50 dark:from-gray-900 dark:to-gray-800 pb-20">
      <motion.div 
        className="max-w-md mx-auto px-4 py-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header with greeting and streak */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Welcome back! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Ready to master your money today?
          </p>
          
          {/* Streak indicator */}
          <motion.div 
            className="flex items-center justify-center gap-2 mt-4 p-3 bg-orange-100 dark:bg-orange-900 rounded-full"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Flame className="w-5 h-5 text-orange-500" />
            <span className="font-semibold text-orange-700 dark:text-orange-300">
              {user?.streak || 0} day streak
            </span>
          </motion.div>
        </motion.div>

        {/* Daily goal progress */}
        <motion.div 
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Zap className="w-6 h-6 text-yellow-500" />
              <div>
                <h3 className="font-bold text-gray-800 dark:text-white">Daily Goal</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Complete 1 lesson</p>
              </div>
            </div>
            <Trophy className="w-6 h-6 text-yellow-500" />
          </div>
          
          <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-2">
            <motion.div 
              className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "60%" }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400">3 of 5 lessons completed today</p>
        </motion.div>

        {/* Main course section */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            Your Courses
          </h2>
          
          {courses.map((course: any, index: number) => {
            const completedLessons = userProgress.filter((p: any) => p.completed).length;
            const progress = (completedLessons / course.totalLessons) * 100;
            
            return (
              <motion.div
                key={course.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg cursor-pointer"
                onClick={() => handleStartCourse(course.id)}
              >
                <div className="flex items-center gap-4">
                  <motion.div 
                    className="text-4xl"
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3
                    }}
                  >
                    {course.icon}
                  </motion.div>
                  
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 dark:text-white text-lg mb-1">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      {course.description}
                    </p>
                    
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <motion.div 
                            className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 1, delay: index * 0.2 }}
                          />
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                        {completedLessons}/{course.totalLessons}
                      </span>
                    </div>
                  </div>
                  
                  <motion.div
                    className="bg-green-500 text-white px-4 py-2 rounded-full font-semibold text-sm"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {progress === 0 ? "START" : progress === 100 ? "REVIEW" : "CONTINUE"}
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Achievement section */}
        <motion.div 
          variants={itemVariants}
          className="mt-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white"
        >
          <div className="flex items-center gap-4">
            <Trophy className="w-8 h-8" />
            <div>
              <h3 className="font-bold text-lg">Your Progress</h3>
              <p className="text-purple-100">
                {user?.xp || 0} XP earned • {userProgress.filter((p: any) => p.completed).length} lessons completed
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
