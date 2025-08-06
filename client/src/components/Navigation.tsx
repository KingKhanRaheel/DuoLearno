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

  // Hide sidebar on lesson pages for better UX
  if (location.includes('/lesson/')) {
    return null;
  }

  return (
    <>
      <style>{`:root { --sidebar-width: 80px; }`}</style>
      <div className="fixed left-0 top-0 h-full w-20 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-40 shadow-lg">
      <div className="flex flex-col items-center py-6 space-y-6">
        <Link href="/">
          <button className={`flex flex-col items-center p-4 rounded-xl transition-all duration-200 cursor-pointer active:scale-95 ${
            isActive('/') 
              ? 'text-purple-primary bg-purple-primary/10 shadow-sm' 
              : 'text-gray-500 hover:text-purple-primary hover:bg-purple-primary/5 dark:text-gray-400 dark:hover:text-purple-primary'
          }`}>
            <Home size={24} />
            <span className="text-xs mt-1 font-medium">Home</span>
          </button>
        </Link>
        
        <Link href="/courses">
          <button className={`flex flex-col items-center p-4 rounded-xl transition-all duration-200 cursor-pointer active:scale-95 ${
            isActive('/courses') 
              ? 'text-purple-primary bg-purple-primary/10 shadow-sm' 
              : 'text-gray-500 hover:text-purple-primary hover:bg-purple-primary/5 dark:text-gray-400 dark:hover:text-purple-primary'
          }`}>
            <BookOpen size={24} />
            <span className="text-xs mt-1 font-medium">Courses</span>
          </button>
        </Link>
        
        <Link href="/profile">
          <button className={`flex flex-col items-center p-4 rounded-xl transition-all duration-200 cursor-pointer active:scale-95 ${
            isActive('/profile') 
              ? 'text-purple-primary bg-purple-primary/10 shadow-sm' 
              : 'text-gray-500 hover:text-purple-primary hover:bg-purple-primary/5 dark:text-gray-400 dark:hover:text-purple-primary'
          }`}>
            <User size={24} />
            <span className="text-xs mt-1 font-medium">Profile</span>
          </button>
        </Link>
        
        <button
          onClick={toggleSound}
          className="flex flex-col items-center p-4 rounded-xl transition-all duration-200 cursor-pointer active:scale-95 text-gray-500 hover:text-purple-primary hover:bg-purple-primary/5 dark:text-gray-400 dark:hover:text-purple-primary"
        >
          {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          <span className="text-xs mt-1 font-medium">Sound</span>
        </button>
      </div>
      </div>
    </>
  );
}