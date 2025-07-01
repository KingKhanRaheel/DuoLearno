import { useUser } from "@/hooks/useUserProgress";
import { Flame, Heart, Zap } from "lucide-react";

export default function Header() {
  const { data: user } = useUser();

  if (!user) return null;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-md mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 warning-orange">
            <Flame className="w-5 h-5" />
            <span className="font-bold text-sm">{user.streak}</span>
          </div>
          <div className="flex items-center space-x-1 duolingo-blue">
            <Heart className="w-5 h-5" />
            <span className="font-bold text-sm">{user.hearts}</span>
          </div>
        </div>
        <div className="flex items-center space-x-1 duolingo-green">
          <Zap className="w-5 h-5" />
          <span className="font-bold text-sm">{user.xp.toLocaleString()} XP</span>
        </div>
      </div>
    </header>
  );
}
