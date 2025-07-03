import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { BookOpen, CheckCircle } from 'lucide-react';

interface ChapterProgressProps {
  chapters: Array<{
    title: string;
    lessons: Array<{
      id: number;
      title: string;
      completed: boolean;
    }>;
  }>;
}

export default function ChapterProgress({ chapters }: ChapterProgressProps) {
  return (
    <div className="space-y-4 mb-8">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
        Course Chapters
      </h2>
      
      {chapters.map((chapter, chapterIndex) => {
        const completedLessons = chapter.lessons.filter(lesson => lesson.completed).length;
        const progress = chapter.lessons.length > 0 ? (completedLessons / chapter.lessons.length) * 100 : 0;
        
        return (
          <Card key={chapterIndex} className="glassmorphism border-none">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <BookOpen size={20} className="text-purple-primary" />
                  {chapter.title}
                </CardTitle>
                <Badge variant="outline" className="text-sm">
                  {completedLessons}/{chapter.lessons.length} lessons
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <span>Progress</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {chapter.lessons.map((lesson) => (
                    <div 
                      key={lesson.id}
                      className={`flex items-center gap-2 text-sm p-2 rounded-lg transition-colors ${
                        lesson.completed 
                          ? 'bg-success-green/10 text-success-green' 
                          : 'bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      {lesson.completed ? (
                        <CheckCircle size={16} />
                      ) : (
                        <div className="w-4 h-4 border-2 border-gray-300 rounded-full" />
                      )}
                      <span className="truncate">{lesson.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}