export interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
}

export interface CourseWithProgress {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  totalLessons: number;
  completedLessons: number;
  progress: number;
}

export interface LessonWithProgress {
  id: number;
  courseId: number;
  title: string;
  content: string;
  orderIndex: number;
  questions: QuizQuestion[];
  completed: boolean;
}
