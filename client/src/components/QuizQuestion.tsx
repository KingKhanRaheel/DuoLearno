import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Check, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { QuizQuestion } from "@/lib/types";
import { soundManager } from "@/lib/sound";

interface QuizQuestionProps {
  question: QuizQuestion;
  onAnswer: (isCorrect: boolean) => void;
}

// Tips and advice for correct answers
const correctTips = [
  "Smart thinking! Understanding the basics sets you up for financial success.",
  "Excellent! This knowledge will help you make better money decisions.",
  "Great job! You're building a strong foundation for financial literacy.",
  "Perfect! This concept is key to managing money effectively.",
  "Fantastic! You're on your way to mastering personal finance.",
  "Well done! This understanding will serve you throughout life.",
  "Brilliant! Financial knowledge is one of the best investments you can make.",
  "Outstanding! You're developing excellent financial instincts."
];

export default function QuizQuestion({ question, onAnswer }: QuizQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [showContinueButton, setShowContinueButton] = useState(false);

  // Reset state when question changes
  useEffect(() => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    setAnswered(false);
    setShowContinueButton(false);
  }, [question]);

  const handleOptionClick = (optionIndex: number) => {
    if (answered) return;

    setSelectedAnswer(optionIndex);
    setShowFeedback(true);
    setAnswered(true);
    
    const isCorrect = optionIndex === question.correct;
    
    // Play sound effect
    soundManager.play(isCorrect ? 'correct' : 'incorrect');
    
    // Show continue button after feedback
    setTimeout(() => {
      setShowContinueButton(true);
    }, 1500);
  };

  const handleContinue = () => {
    const isCorrect = selectedAnswer === question.correct;
    onAnswer(isCorrect);
  };

  const getRandomTip = () => {
    return correctTips[Math.floor(Math.random() * correctTips.length)];
  };

  const isCorrect = selectedAnswer === question.correct;

  return (
    <motion.div 
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <p className="font-semibold text-gray-800 mb-6 text-lg">{question.question}</p>
      
      <div className="space-y-3 mb-6">
        {question.options.map((option, index) => {
          let buttonClass = "w-full text-left p-5 rounded-xl border-2 transition-all duration-200 cursor-pointer active:scale-95 ";
          
          if (!answered) {
            buttonClass += "border-gray-300 hover:border-purple-500 hover:bg-purple-50 hover:shadow-md";
          } else if (index === question.correct) {
            buttonClass += "border-green-500 bg-green-50 shadow-md";
          } else if (index === selectedAnswer && index !== question.correct) {
            buttonClass += "border-red-500 bg-red-50 shadow-md";
          } else {
            buttonClass += "border-gray-200 opacity-50";
          }

          return (
            <motion.button
              key={index}
              className={buttonClass}
              onClick={() => handleOptionClick(index)}
              disabled={answered}
              whileHover={!answered ? { scale: 1.02 } : {}}
              whileTap={!answered ? { scale: 0.98 } : {}}
            >
              <div className="flex items-center justify-between w-full">
                <span className="font-medium text-base">{option}</span>
                <AnimatePresence>
                  {answered && index === question.correct && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
                    >
                      <Check className="w-5 h-5 text-white" />
                    </motion.div>
                  )}
                  {answered && index === selectedAnswer && index !== question.correct && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center"
                    >
                      <X className="w-5 h-5 text-white" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.button>
          );
        })}
      </div>
      
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`p-4 rounded-xl mb-4 ${
              isCorrect 
                ? "bg-gradient-to-r from-green-100 to-green-50 border border-green-200" 
                : "bg-gradient-to-r from-red-100 to-red-50 border border-red-200"
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                isCorrect ? "bg-green-500" : "bg-red-500"
              }`}>
                {isCorrect ? (
                  <Check className="w-5 h-5 text-white" />
                ) : (
                  <X className="w-5 h-5 text-white" />
                )}
              </div>
              
              <div className="flex-1">
                <h4 className={`font-bold text-lg mb-2 ${
                  isCorrect ? "text-green-800" : "text-red-800"
                }`}>
                  {isCorrect ? "Correct!" : "Not quite right"}
                </h4>
                
                <p className={`text-sm leading-relaxed ${
                  isCorrect ? "text-green-700" : "text-red-700"
                }`}>
                  {isCorrect 
                    ? getRandomTip()
                    : `The correct answer is "${question.options[question.correct]}". This is important to understand for managing your finances effectively.`
                  }
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showContinueButton && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Button
              onClick={handleContinue}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-4 rounded-xl font-bold text-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              Continue
              <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
