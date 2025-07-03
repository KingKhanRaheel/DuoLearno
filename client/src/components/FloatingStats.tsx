import { Trophy, Flame, Heart } from 'lucide-react';
import { useUser } from '../hooks/useUserProgress';

export default function FloatingStats() {
  const { data: user } = useUser();
  
  if (!user) return null;

  return (
    <div className="fixed top-4 right-4 z-40 flex flex-col gap-2">
      {/* XP Counter */}
      <div className="glassmorphism px-3 py-2 rounded-full shadow-lg">
        <div className="flex items-center gap-2">
          <Trophy className="text-yellow-500" size={20} />
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            {user.xp} XP
          </span>
        </div>
      </div>

      {/* Streak Counter */}
      <div className="glassmorphism px-3 py-2 rounded-full shadow-lg">
        <div className="flex items-center gap-2">
          <Flame className="text-orange-500" size={20} />
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            {user.streak} days
          </span>
        </div>
      </div>

      {/* Hearts */}
      <div className="glassmorphism px-3 py-2 rounded-full shadow-lg">
        <div className="flex items-center gap-2">
          <Heart className="text-red-500" size={20} />
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            {user.hearts}
          </span>
        </div>
      </div>
    </div>
  );
}