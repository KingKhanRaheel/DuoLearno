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

// Detailed tips and explanations for each question topic
const getDetailedTip = (question: string, correctAnswer: string) => {
  // Personal Finance basics
  if (question.toLowerCase().includes('personal finance')) {
    return {
      title: "Understanding Personal Finance",
      explanation: "Personal finance encompasses all aspects of managing your money throughout your life. It includes earning income through work or investments, creating budgets to control spending, saving for emergencies and goals, investing for long-term growth, and protecting your wealth through insurance. Mastering these skills gives you financial freedom and peace of mind."
    };
  }
  
  // Needs vs Wants
  if (question.toLowerCase().includes('need')) {
    return {
      title: "Mastering Needs vs Wants",
      explanation: "Distinguishing between needs and wants is fundamental to financial success. Needs are essentials for survival and basic functioning - food, shelter, utilities, transportation to work, and basic healthcare. Wants are everything else - entertainment, dining out, luxury items, and upgrades. Smart spenders prioritize needs first, then allocate a reasonable portion for wants."
    };
  }
  
  // Saving early
  if (question.toLowerCase().includes('save') || question.toLowerCase().includes('early')) {
    return {
      title: "The Power of Starting Early",
      explanation: "Time is your greatest asset when saving money. Thanks to compound interest, money grows exponentially over time. Starting early means your money has more time to multiply. Even small amounts saved in your 20s can become substantial wealth by retirement. The key is consistency - regular small contributions often outperform large irregular ones."
    };
  }
  
  // Mindsets
  if (question.toLowerCase().includes('mindset') || question.toLowerCase().includes('abundance')) {
    return {
      title: "Developing an Abundance Mindset",
      explanation: "Your mindset about money shapes your financial reality. A scarcity mindset focuses on limitations and creates anxiety around spending. An abundance mindset focuses on opportunities and solutions. People with abundance mindsets are more likely to invest in themselves, take calculated risks, and find creative ways to increase income while managing expenses wisely."
    };
  }
  
  // 50-30-20 Rule
  if (question.toLowerCase().includes('50-30-20') || question.toLowerCase().includes('percentage')) {
    return {
      title: "The 50-30-20 Budget Framework",
      explanation: "This simple rule provides a balanced approach to money management. 50% for needs ensures you cover essentials without stress. 30% for wants allows you to enjoy life while staying disciplined. 20% for savings and debt payment builds your financial future. This framework adapts to any income level and provides clear spending guidelines."
    };
  }
  
  // Expense tracking
  if (question.toLowerCase().includes('track') || question.toLowerCase().includes('expenses')) {
    return {
      title: "The Importance of Expense Tracking",
      explanation: "Expense tracking reveals spending patterns you might not notice otherwise. It helps identify money leaks, shows where your priorities really are (vs. where you think they are), and creates awareness before spending decisions. Consistent tracking, even imperfect, beats perfect tracking done inconsistently."
    };
  }
  
  // Budgeting
  if (question.toLowerCase().includes('budget')) {
    return {
      title: "Building Effective Budgets",
      explanation: "A budget is your money's roadmap. It's not about restriction - it's about intentional spending aligned with your values and goals. Good budgets are realistic, flexible, and reviewed regularly. They account for both fixed expenses (rent, subscriptions) and variable ones (groceries, entertainment). The best budget is one you'll actually follow."
    };
  }
  
  // Fixed vs Variable costs
  if (question.toLowerCase().includes('fixed') || question.toLowerCase().includes('variable')) {
    return {
      title: "Understanding Cost Types",
      explanation: "Fixed costs like rent and insurance stay constant each month, making them predictable but hard to change quickly. Variable costs like groceries and entertainment fluctuate and offer more control. Understanding this helps you identify where you have flexibility in tough months and where you need consistent planning."
    };
  }
  
  // Emergency funds
  if (question.toLowerCase().includes('emergency')) {
    return {
      title: "Building Your Financial Safety Net",
      explanation: "Emergency funds protect you from life's unexpected events - job loss, medical bills, car repairs, or family emergencies. Having 3-6 months of expenses saved means you won't need to rely on credit cards or loans during crises. Keep this money easily accessible but separate from daily spending accounts."
    };
  }
  
  // Short-term goals
  if (question.toLowerCase().includes('short-term') || question.toLowerCase().includes('target')) {
    return {
      title: "Setting Achievable Financial Goals",
      explanation: "Short-term goals (under 2 years) should be specific, measurable, and time-bound. Breaking larger goals into monthly or weekly targets makes them more manageable and builds momentum. Success with short-term goals builds confidence and habits that help with longer-term financial objectives."
    };
  }
  
  // Automation
  if (question.toLowerCase().includes('automat')) {
    return {
      title: "The Power of Financial Automation",
      explanation: "Automation removes willpower from the equation. When money moves to savings before you see it, you adapt your spending to what's left. This 'pay yourself first' approach ensures savings happen consistently, regardless of your mood, busy schedule, or spending temptations."
    };
  }
  
  // Smart saving vs hoarding
  if (question.toLowerCase().includes('hoarding') || question.toLowerCase().includes('balanced')) {
    return {
      title: "Healthy Saving vs. Hoarding",
      explanation: "Healthy saving is purposeful - you save for specific goals and maintain balance between present enjoyment and future security. Hoarding stems from fear and prevents you from enjoying life or investing in growth opportunities. The goal is financial security, not maximum bank balance."
    };
  }
  
  // Investing vs saving
  if (question.toLowerCase().includes('investing') || question.toLowerCase().includes('inflation')) {
    return {
      title: "Why Investing Beats Pure Saving",
      explanation: "While savings accounts offer safety, they often can't keep up with inflation. Over time, your purchasing power decreases. Investing in assets like stocks, bonds, or real estate typically provides higher returns that outpace inflation, helping your money grow in real terms. The key is balancing growth potential with your risk tolerance."
    };
  }
  
  // Compound interest
  if (question.toLowerCase().includes('compound')) {
    return {
      title: "Compound Interest: The 8th Wonder",
      explanation: "Compound interest means earning returns on your returns. Your initial investment grows, then you earn returns on the larger amount, creating a snowball effect. This is why starting early is so powerful - even small amounts have time to compound into significant wealth."
    };
  }
  
  // Investment types
  if (question.toLowerCase().includes('stocks') || question.toLowerCase().includes('investment')) {
    return {
      title: "Understanding Investment Options",
      explanation: "Different investments serve different purposes. Stocks offer growth potential but with volatility. Bonds provide steady income with lower risk. Real estate offers both income and appreciation. Mutual funds provide diversification. The key is matching your investment choice to your timeline, risk tolerance, and goals."
    };
  }
  
  // Risk vs return
  if (question.toLowerCase().includes('risk') || question.toLowerCase().includes('return')) {
    return {
      title: "The Risk-Return Relationship",
      explanation: "Higher potential returns almost always come with higher risk. This isn't about gambling - it's about understanding that safer investments typically offer lower returns, while growth investments can be more volatile. Your risk tolerance should match your timeline and financial situation."
    };
  }
  
  // Starting small
  if (question.toLowerCase().includes('consistency') || question.toLowerCase().includes('small')) {
    return {
      title: "The Power of Starting Small",
      explanation: "You don't need thousands to start investing. Small, consistent investments often outperform large, irregular ones due to dollar-cost averaging. Starting small also lets you learn and build confidence without risking large amounts. The most important step is simply starting."
    };
  }
  
  // Impulse buying
  if (question.toLowerCase().includes('impulse') || question.toLowerCase().includes('24 hours')) {
    return {
      title: "Conquering Impulse Spending",
      explanation: "Impulse purchases are often driven by emotion, not need. The 24-48 hour rule gives your rational mind time to evaluate whether you really want or need something. Most impulse desires fade with time. This simple pause can save hundreds or thousands annually."
    };
  }
  
  // Credit cards
  if (question.toLowerCase().includes('credit') || question.toLowerCase().includes('full amount')) {
    return {
      title: "Smart Credit Card Management",
      explanation: "Credit cards are powerful tools when used responsibly. Paying the full balance each month avoids interest charges and builds credit history. Think of credit as a convenience for purchases you can already afford, not as extra money to spend. Good credit habits open doors to better rates on loans and mortgages."
    };
  }
  
  // Good vs bad debt
  if (question.toLowerCase().includes('debt') || question.toLowerCase().includes('education loan')) {
    return {
      title: "Understanding Good vs Bad Debt",
      explanation: "Good debt helps you build wealth or increase income - education loans, business loans, or mortgages. These investments typically appreciate or generate returns over time. Bad debt finances consumption - credit cards for vacations, luxury car loans, or retail financing. Good debt builds your future; bad debt mortgages it."
    };
  }
  
  // Scams and safety
  if (question.toLowerCase().includes('scam') || question.toLowerCase().includes('verify')) {
    return {
      title: "Protecting Yourself from Financial Scams",
      explanation: "Financial scams prey on urgency and greed. Legitimate institutions never ask for passwords or PIN numbers via text or email. Always verify suspicious communications by contacting the organization directly using official contact information. Remember: if it sounds too good to be true, it probably is."
    };
  }
  
  // Financial routine
  if (question.toLowerCase().includes('routine') || question.toLowerCase().includes('confidence')) {
    return {
      title: "Building Financial Discipline",
      explanation: "Regular financial check-ins build awareness and control. Weekly expense reviews help catch problems early. Monthly budget reviews let you adjust spending. Quarterly goal reviews keep you on track. These habits transform money management from a stressful event into a manageable routine."
    };
  }
  
  // Default tip for any unmatched questions
  return {
    title: "Great Financial Thinking!",
    explanation: "You're building strong financial knowledge that will serve you throughout life. Each concept you master brings you closer to financial independence and the freedom to make choices based on your values rather than your bank balance."
  };
};

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

  const getPersonalizedTip = () => {
    const tip = getDetailedTip(question.question, question.options[question.correct]);
    return tip;
  };

  const isCorrect = selectedAnswer === question.correct;

  return (
    <motion.div 
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 relative"
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
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-2xl p-6 z-10"
            style={{ backdropFilter: "blur(10px)" }}
          >
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`h-full flex flex-col justify-center ${
                isCorrect ? "text-green-800" : "text-red-800"
              }`}
            >
              <div className="text-center mb-6">
                <motion.div 
                  className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                    isCorrect ? "bg-green-500" : "bg-red-500"
                  }`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                >
                  {isCorrect ? (
                    <Check className="w-8 h-8 text-white" />
                  ) : (
                    <X className="w-8 h-8 text-white" />
                  )}
                </motion.div>
                
                <motion.h3 
                  className={`text-2xl font-bold mb-2 ${
                    isCorrect ? "text-green-800" : "text-red-800"
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {isCorrect ? "Excellent!" : "Not quite right"}
                </motion.h3>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex-1"
              >
                {isCorrect ? (
                  <div className="space-y-4">
                    <h4 className="text-xl font-bold text-green-800">
                      {getPersonalizedTip().title}
                    </h4>
                    <p className="text-green-700 leading-relaxed text-base">
                      {getPersonalizedTip().explanation}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h4 className="text-xl font-bold text-red-800">
                      Let's learn from this
                    </h4>
                    <p className="text-red-700 leading-relaxed text-base">
                      The correct answer is <span className="font-semibold">"{question.options[question.correct]}"</span>. 
                    </p>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h5 className="font-bold text-blue-800 mb-2">{getPersonalizedTip().title}</h5>
                      <p className="text-blue-700 text-sm leading-relaxed">
                        {getPersonalizedTip().explanation}
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showContinueButton && showFeedback && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-6 left-6 right-6 z-20"
          >
            <Button
              onClick={handleContinue}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-4 rounded-xl font-bold text-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
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
