import { Trophy, Flame, Heart } from 'lucide-react';
import { useUser } from '../hooks/useUserProgress';

export default function FloatingStats() {
  const { data: user } = useUser();
  
  if (!user) return null;

  return (
    <div className="fixed top-4 right-4 z-40">
      {/* Combined Stats in one compact container */}
      <div className="glassmorphism px-4 py-3 rounded-2xl shadow-lg cursor-pointer hover:shadow-xl transition-all duration-200 active:scale-95">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Trophy className="text-yellow-500" size={18} />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              {user.xp}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Flame className="text-orange-500" size={18} />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              {user.streak}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Heart className="text-red-500" size={18} />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              {user.hearts}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}