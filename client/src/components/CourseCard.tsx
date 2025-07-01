import { Button } from "@/components/ui/button";
import type { CourseWithProgress } from "@/lib/types";

interface CourseCardProps {
  course: CourseWithProgress;
  onStart: (courseId: number) => void;
}

export default function CourseCard({ course, onStart }: CourseCardProps) {
  const circumference = 2 * Math.PI * 20;
  const strokeDashoffset = circumference - (course.progress / 100) * circumference;
  
  const colorClass = course.color === "duolingo-green" ? "duolingo-green" : "duolingo-blue";
  const bgColorClass = course.color === "duolingo-green" ? "bg-duolingo-green" : "bg-duolingo-blue";

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 transform hover:scale-105 cursor-pointer">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="relative w-16 h-16">
            <svg className="w-16 h-16 progress-ring" viewBox="0 0 50 50">
              <circle 
                cx="25" 
                cy="25" 
                r="20" 
                fill="none" 
                stroke="#E5E7EB" 
                strokeWidth="4"
              />
              <circle 
                cx="25" 
                cy="25" 
                r="20" 
                fill="none" 
                stroke={course.color === "duolingo-green" ? "var(--duolingo-green)" : "var(--duolingo-blue)"} 
                strokeWidth="4" 
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="progress-ring-circle"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <i className={`${course.icon} ${colorClass} text-xl`} />
            </div>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-gray-800 mb-1">{course.title}</h3>
          <p className="text-sm neutral-gray mb-3 leading-relaxed">{course.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold neutral-gray">
              {course.completedLessons}/{course.totalLessons} lessons • {Math.round(course.progress)}% complete
            </span>
            <Button 
              className={`${bgColorClass} text-white px-4 py-2 rounded-xl font-bold text-sm hover:opacity-90 transition-all duration-200 transform hover:scale-105`}
              onClick={() => onStart(course.id)}
            >
              {course.completedLessons > 0 ? "Continue" : "Start"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
