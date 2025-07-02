import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import QuizQuestion from "@/components/QuizQuestion";
import XPModal from "@/components/XPModal";
import { useCompleteLesson, useUpdateHearts, useUser } from "@/hooks/useUserProgress";
import { storage } from "@/lib/storage";
import type { QuizQuestion as QuizQuestionType } from "@/lib/types";

export default function Lesson() {
  const params = useParams();
  const [, navigate] = useLocation();
  const lessonId = parseInt(params.id || "0");

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [showContinue, setShowContinue] = useState(false);
  const [showXPModal, setShowXPModal] = useState(false);
  const [earnedXP, setEarnedXP] = useState(0);

  const { data: lesson } = useQuery({
    queryKey: ["lesson", lessonId],
    queryFn: () => storage.getLesson(lessonId),
    enabled: lessonId > 0,
  });

  const { data: user } = useUser();
  const completeLesson = useCompleteLesson();
  const updateHearts = useUpdateHearts();

  const questions: QuizQuestionType[] = lesson?.questions as QuizQuestionType[] || [];
  const totalQuestions = questions.length;
  const progress = totalQuestions > 0 ? ((questionsAnswered + 1) / totalQuestions) * 100 : 0;

  const goBack = () => {
    if (lesson) {
      navigate(`/course/${lesson.courseId}`);
    } else {
      navigate("/");
    }
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (!isCorrect && user) {
      // Lose a heart for wrong answer
      const newHearts = Math.max(0, user.hearts - 1);
      updateHearts.mutate(newHearts);
    }

    const newQuestionsAnswered = questionsAnswered + 1;
    setQuestionsAnswered(newQuestionsAnswered);

    if (newQuestionsAnswered >= totalQuestions) {
      setTimeout(() => {
        setShowContinue(true);
      }, 1500);
    } else {
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
      }, 1500);
    }
  };

  const handleCompleteLesson = () => {
    const xp = 15;
    setEarnedXP(xp);
    
    completeLesson.mutate(
      { lessonId, xpEarned: xp },
      {
        onSuccess: () => {
          setShowXPModal(true);
        }
      }
    );
  };

  const handleCloseXPModal = () => {
    setShowXPModal(false);
    goBack();
  };

  if (!lesson) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[var(--bg-light)]">
      <Header />
      <ProgressBar progress={progress} />
      
      <main className="max-w-md mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* Lesson Header */}
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
              <h1 className="text-xl font-bold text-gray-800">{lesson.title}</h1>
              <p className="text-sm neutral-gray">
                Question {Math.min(currentQuestionIndex + 1, totalQuestions)} of {totalQuestions}
              </p>
            </div>
          </div>

          {/* Lesson Content */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-4">{lesson.title}</h2>
            <p className="neutral-gray leading-relaxed">{lesson.content}</p>
          </div>

          {/* Quiz Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Quick Check</h3>
            
            {currentQuestionIndex < questions.length && (
              <QuizQuestion
                question={questions[currentQuestionIndex]}
                onAnswer={handleAnswer}
              />
            )}

            {showContinue && (
              <Button
                onClick={handleCompleteLesson}
                disabled={completeLesson.isPending}
                className="w-full bg-duolingo-green text-white py-4 rounded-2xl font-bold text-lg hover:opacity-90 transition-all duration-200"
              >
                {completeLesson.isPending ? "Completing..." : "Complete Lesson"}
              </Button>
            )}
          </div>
        </div>
      </main>

      <XPModal
        isOpen={showXPModal}
        xpEarned={earnedXP}
        totalXP={user?.xp || 0}
        onClose={handleCloseXPModal}
      />
    </div>
  );
}
