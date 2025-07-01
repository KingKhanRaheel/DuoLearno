import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Trophy } from "lucide-react";

interface XPModalProps {
  isOpen: boolean;
  xpEarned: number;
  totalXP: number;
  onClose: () => void;
}

export default function XPModal({ isOpen, xpEarned, totalXP, onClose }: XPModalProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const createConfetti = () => {
    const colors = ['var(--duolingo-green)', 'var(--duolingo-blue)', 'var(--warning-orange)', 'var(--error-red)', 'var(--success-green)'];
    const pieces = [];
    
    for (let i = 0; i < 50; i++) {
      pieces.push(
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-sm"
          style={{
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
            left: `${Math.random() * 100}%`,
          }}
          initial={{ y: 0, rotate: 0, opacity: 1 }}
          animate={{ 
            y: -100, 
            rotate: 720, 
            opacity: 0,
            x: Math.random() * 200 - 100
          }}
          transition={{ 
            duration: 0.6, 
            delay: Math.random() * 0.3,
            ease: "easeOut"
          }}
        />
      );
    }
    return pieces;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-3xl p-8 mx-4 max-w-sm w-full text-center relative overflow-hidden"
          >
            {showConfetti && (
              <div className="absolute inset-0 pointer-events-none">
                {createConfetti()}
              </div>
            )}
            
            <div className="relative z-10">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-20 h-20 bg-duolingo-green rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Trophy className="text-white text-2xl" />
              </motion.div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Lesson Complete!</h2>
              <p className="neutral-gray mb-6">Great job! You earned some XP.</p>
              
              <div className="bg-green-50 rounded-2xl p-4 mb-6">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="text-3xl font-bold duolingo-green mb-1"
                >
                  +{xpEarned} XP
                </motion.div>
                <div className="text-sm neutral-gray">
                  Total: <span className="font-semibold">{totalXP.toLocaleString()} XP</span>
                </div>
              </div>
              
              <Button 
                onClick={onClose}
                className="w-full bg-duolingo-green text-white py-4 rounded-2xl font-bold text-lg hover:opacity-90 transition-all duration-200"
              >
                Continue Learning
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
