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
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-ice-300/90 backdrop-blur-md dark:border-navy-700 dark:bg-navy-950/90 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <button
          onClick={() => setActiveTab('landing')}
          className="flex items-center gap-2.5 text-left group"
        >
          <div className="w-8 h-8 rounded-lg bg-navy-600 text-white dark:bg-crimson-600 dark:text-white flex items-center justify-center font-bold text-sm shadow-xs transition-transform group-hover:scale-105">
            9°
          </div>
          <div>
            <span className="font-semibold text-sm sm:text-base tracking-tight text-navy-600 dark:text-ice-300 group-hover:text-crimson-600 dark:group-hover:text-crimson-400 transition-colors">
              Apoyo Académico 9°
            </span>
            <span className="hidden sm:inline-block ml-2 text-xs px-2 py-0.5 rounded-full bg-navy-50 dark:bg-navy-900 text-navy-600 dark:text-slate-300 border border-slate-200 dark:border-navy-700">
              Guía de Repaso
            </span>
          </div>
        </button>

        {/* Navigation links & Theme toggle */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => setActiveTab('landing')}
            className={`min-h-[38px] px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5 ${
              activeTab === 'landing'
                ? 'bg-navy-600 text-white dark:bg-navy-700 dark:text-ice-300 shadow-xs'
                : 'text-slate-600 hover:text-navy-600 dark:text-slate-400 dark:hover:text-ice-300 hover:bg-ice-200 dark:hover:bg-navy-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Temarios & Sesiones</span>
          </button>

          <button
            onClick={() => setActiveTab('sesion-1')}
            className={`min-h-[38px] px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5 ${
              activeTab === 'sesion-1'
                ? 'bg-crimson-600 text-white dark:bg-crimson-500 dark:text-white shadow-xs'
                : 'text-slate-600 hover:text-crimson-600 dark:text-slate-400 dark:hover:text-crimson-400 hover:bg-ice-200 dark:hover:bg-navy-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-crimson-500 dark:text-crimson-300" />
            <span className="font-semibold">Sesión Hoy (Inglés)</span>
            <span className="hidden md:inline text-[10px] uppercase font-bold px-1.5 py-0.5 bg-crimson-100 dark:bg-crimson-900/60 text-crimson-700 dark:text-crimson-200 rounded">
              10 Nov
            </span>
          </button>

          <button
            onClick={() => setActiveTab('sesion-2')}
            className={`hidden sm:flex min-h-[38px] px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors items-center gap-1.5 ${
              activeTab === 'sesion-2'
                ? 'bg-navy-600 text-white dark:bg-navy-700 dark:text-ice-300 shadow-xs'
                : 'text-slate-600 hover:text-navy-600 dark:text-slate-400 dark:hover:text-ice-300 hover:bg-ice-200 dark:hover:bg-navy-800'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Sesión 2</span>
          </button>

          <div className="h-4 w-px bg-slate-300 dark:border-navy-700 mx-1" />

          {/* Theme switcher */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Alternar modo oscuro"
            className="p-2 rounded-lg text-slate-600 hover:text-navy-600 dark:text-slate-400 dark:hover:text-ice-300 hover:bg-ice-200 dark:hover:bg-navy-800 transition-colors"
            title={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          >
            {darkMode ? <Sun className="w-4 h-4 text-crimson-400" /> : <Moon className="w-4 h-4 text-navy-600" />}
          </button>
        </div>
      </div>
    </header>
  );
};
