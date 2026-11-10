import React from 'react';
import { Moon, Sun, BookOpen, Calendar, Sparkles } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  activeTab: 'landing' | 'sesion-1' | 'sesion-2';
  setActiveTab: (tab: 'landing' | 'sesion-1' | 'sesion-2') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  setDarkMode,
  activeTab,
  setActiveTab,
}) => {
  return (
    <header className="sticky top-0 z-50 border-b border-cream-200 bg-cream-50/90 backdrop-blur-md dark:border-moss-800 dark:bg-moss-950/90 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <button
          onClick={() => setActiveTab('landing')}
          className="flex items-center gap-2.5 text-left group"
        >
          <div className="w-8 h-8 rounded-lg bg-forest-600 text-white dark:bg-forest-400 dark:text-forest-900 flex items-center justify-center font-bold text-sm shadow-xs transition-transform group-hover:scale-105">
            9°
          </div>
          <div>
            <span className="font-semibold text-sm sm:text-base tracking-tight text-forest-900 dark:text-[#ECF3EF] group-hover:text-forest-600 dark:group-hover:text-forest-300 transition-colors">
              Apoyo Académico 9°
            </span>
            <span className="hidden sm:inline-block ml-2 text-xs px-2 py-0.5 rounded-full bg-forest-50 dark:bg-moss-850 text-forest-700 dark:text-forest-300 border border-forest-100 dark:border-moss-800">
              Guía de Repaso
            </span>
          </div>
        </button>

        {/* Navigation links & Theme toggle */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => setActiveTab('landing')}
            className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5 ${
              activeTab === 'landing'
                ? 'bg-forest-600 text-white dark:bg-forest-400 dark:text-forest-900 shadow-xs'
                : 'text-stone-600 hover:text-forest-900 dark:text-[#92A49B] dark:hover:text-[#ECF3EF] hover:bg-cream-100 dark:hover:bg-moss-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Temarios & Sesiones</span>
          </button>

          <button
            onClick={() => setActiveTab('sesion-1')}
            className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5 ${
              activeTab === 'sesion-1'
                ? 'bg-terracotta-600 text-white dark:bg-terracotta-400 dark:text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-terracotta-700 dark:text-[#92A49B] dark:hover:text-terracotta-300 hover:bg-cream-100 dark:hover:bg-moss-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-terracotta-500 dark:text-terracotta-400" />
            <span className="font-medium">Sesión Hoy (Inglés)</span>
            <span className="hidden md:inline text-[10px] uppercase font-bold px-1.5 py-0.2 bg-terracotta-100 dark:bg-terracotta-900/60 text-terracotta-800 dark:text-terracotta-200 rounded">
              10 Nov
            </span>
          </button>

          <button
            onClick={() => setActiveTab('sesion-2')}
            className={`hidden sm:flex px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors items-center gap-1.5 ${
              activeTab === 'sesion-2'
                ? 'bg-forest-600 text-white dark:bg-forest-400 dark:text-forest-900 shadow-xs'
                : 'text-stone-600 hover:text-forest-900 dark:text-[#92A49B] dark:hover:text-[#ECF3EF] hover:bg-cream-100 dark:hover:bg-moss-900'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Sesión 2</span>
          </button>

          <div className="h-4 w-px bg-cream-200 dark:bg-moss-800 mx-1" />

          {/* Theme switcher */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Alternar modo oscuro"
            className="p-2 rounded-md text-stone-600 hover:text-forest-900 dark:text-[#92A49B] dark:hover:text-[#ECF3EF] hover:bg-cream-100 dark:hover:bg-moss-900 transition-colors"
            title={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          >
            {darkMode ? <Sun className="w-4 h-4 text-terracotta-300" /> : <Moon className="w-4 h-4 text-forest-700" />}
          </button>
        </div>
      </div>
    </header>
  );
};
