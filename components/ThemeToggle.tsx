
import React from 'react';
import { Theme } from '../types';
import { SunIcon, MoonIcon } from './icons';

interface ThemeToggleProps {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, toggleTheme }) => {
  const isDark = theme === Theme.DARK;

  return (
    // Add z-10 to ensure it's on top of other content
    <div className="absolute top-4 right-4 z-10">
      <button
        onClick={toggleTheme}
        className={`relative w-16 h-8 flex items-center justify-between px-2 rounded-full
                   bg-cyan-200 dark:bg-gray-800
                   transition-colors duration-500 ease-in-out
                   focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900
                   focus:ring-cyan-500 dark:focus:ring-pink-500`}
        aria-label={`Mudar para tema ${isDark ? 'claro' : 'escuro'}`}
      >
        {/* Static icons */}
        <SunIcon className="w-5 h-5 text-yellow-400 drop-shadow-[0_0_4px_rgba(250,204,21,0.9)]" />
        <MoonIcon className="w-5 h-5 text-slate-300 drop-shadow-[0_0_5px_rgba(203,213,225,0.8)]" />

        {/* Sliding thumb */}
        <span
          className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-lg
                      transform transition-transform duration-300 ease-in-out
                      ${isDark ? 'translate-x-8' : 'translate-x-0'}`}
          aria-hidden="true"
        />
      </button>
    </div>
  );
};

export default ThemeToggle;