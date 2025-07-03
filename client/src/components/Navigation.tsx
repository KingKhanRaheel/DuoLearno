import { Home, BookOpen, User, Volume2, VolumeX } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { soundManager } from '../lib/sound';
import { useState } from 'react';

export default function Navigation() {
  const [location] = useLocation();
  const [isMuted, setIsMuted] = useState(soundManager.isMuted());

  const toggleSound = () => {
    const newMutedState = soundManager.toggle();
    setIsMuted(newMutedState);
  };

  const isActive = (path: string) => {
    if (path === '/' && location === '/') return true;
    if (path !== '/' && location.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-50">
      <div className="flex justify-around items-center py-2 px-4 max-w-md mx-auto">
        <Link href="/">
          <div className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
            isActive('/') 
              ? 'text-purple-primary bg-purple-primary/10' 
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
          }`}>
            <Home size={24} />
            <span className="text-xs mt-1">Home</span>
          </div>
        </Link>
        
        <Link href="/courses">
          <div className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
            isActive('/courses') 
              ? 'text-purple-primary bg-purple-primary/10' 
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
          }`}>
            <BookOpen size={24} />
            <span className="text-xs mt-1">Courses</span>
          </div>
        </Link>
        
        <Link href="/profile">
          <div className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
            isActive('/profile') 
              ? 'text-purple-primary bg-purple-primary/10' 
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
          }`}>
            <User size={24} />
            <span className="text-xs mt-1">Profile</span>
          </div>
        </Link>
        
        <button
          onClick={toggleSound}
          className="flex flex-col items-center p-2 rounded-lg transition-colors text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          <span className="text-xs mt-1">Sound</span>
        </button>
      </div>
    </div>
  );
}