import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check localStorage first, then system preference
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const shouldUseDark = storedTheme === 'dark' || (!storedTheme && prefersDark);
    setIsDark(shouldUseDark);
    document.documentElement.classList.toggle('dark', shouldUseDark);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);

    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center justify-center w-full max-w-14 h-8 rounded-full transition-all duration-300 ease-in-out bg-red hover:bg-gray-300 dark:hover:bg-gray-600"
      aria-label="Toggle dark mode"
    >
      {/* Toggle track */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 dark:from-blue-600 dark:to-purple-600 opacity-20" />
      
      {/* Toggle slider */}
      <div
        className={`absolute w-6 h-6 rounded-full transition-all duration-300 ease-in-out transform ${
          isDark ? 'translate-x-3' : '-translate-x-3'
        } bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center z-100`}
      >
        {isDark ? (
          <Moon className="w-3 h-3 text-blue-400" />
        ) : (
          <Sun className="w-3 h-3 text-yellow-500" />
        )}
      </div>
      
      {/* Background icons */}
      <div className="absolute inset-0 flex items-center justify-between px-1.5">
        <Sun className={`w-3 h-3 transition-opacity duration-300 ${
          !isDark ? 'opacity-0' : 'opacity-40 text-gray-400'
        }`} />
        <Moon className={`w-3 h-3 transition-opacity duration-300 ${
          isDark ? 'opacity-0' : 'opacity-40 text-gray-400'
        }`} />
      </div>
    </button>
  );
}
