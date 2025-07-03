import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import type { QuizQuestion } from "@/lib/types";
import { soundManager } from "@/lib/sound";

interface QuizQuestionProps {
  question: QuizQuestion;
  onAnswer: (isCorrect: boolean) => void;
}

export default function QuizQuestion({ question, onAnswer }: QuizQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [answered, setAnswered] = useState(false);

  // Reset state when question changes
  useEffect(() => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    setAnswered(false);
  }, [question]);

  const handleOptionClick = (optionIndex: number) => {
    if (answered) return;

    setSelectedAnswer(optionIndex);
    setShowFeedback(true);
    setAnswered(true);
    
    const isCorrect = optionIndex === question.correct;
    
    // Play sound effect
    soundManager.play(isCorrect ? 'correct' : 'incorrect');
    
    setTimeout(() => {
      onAnswer(isCorrect);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <p className="font-semibold text-gray-800 mb-4">{question.question}</p>
      <div className="space-y-3">
        {question.options.map((option, index) => {
          let buttonClass = "w-full text-left p-5 rounded-xl border-2 transition-all duration-200 cursor-pointer active:scale-95 ";
          
          if (!answered) {
            buttonClass += "border-gray-300 hover:border-purple-primary hover:bg-purple-primary/10 hover:shadow-md";
          } else if (index === question.correct) {
            buttonClass += "border-success-green bg-success-green/10 shadow-md";
          } else if (index === selectedAnswer && index !== question.correct) {
            buttonClass += "border-error-red bg-error-red/10 shadow-md";
          } else {
            buttonClass += "border-gray-200 opacity-50";
          }

          return (
            <button
              key={index}
              className={buttonClass}
              onClick={() => handleOptionClick(index)}
              disabled={answered}
            >
              <div className="flex items-center justify-between w-full">
                <span className="font-semibold text-base">{option}</span>
                {answered && index === question.correct && (
                  <Check className="w-6 h-6 text-success-green" />
                )}
                {answered && index === selectedAnswer && index !== question.correct && (
                  <X className="w-6 h-6 text-error-red" />
                )}
              </div>
            </button>
          );
        })}
      </div>
      
      {showFeedback && (
        <div className={`mt-4 p-4 rounded-xl font-semibold ${
          selectedAnswer === question.correct 
            ? "bg-green-100 text-green-800" 
            : "bg-red-100 text-red-800"
        }`}>
          {selectedAnswer === question.correct 
            ? "Correct! Great job! 🎉" 
            : "Oops! The correct answer is highlighted in green."}
        </div>
      )}
    </div>
  );
}
