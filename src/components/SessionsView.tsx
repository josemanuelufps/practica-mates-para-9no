import React, { useState } from 'react';
import { EnglishSessionView } from './EnglishSessionView';
import { MathSessionView } from './MathSessionView';
import { GeoSessionView } from './GeoSessionView';
import {
  ArrowLeft,
  BookOpen,
  Calculator,
  BarChart3,
} from 'lucide-react';

interface SessionsViewProps {
  initialSubject?: 'matematicas' | 'geoestadistica' | 'ingles';
  onBackToLanding: () => void;
  onOpenTimedQuiz: () => void;
}

export const SessionsView: React.FC<SessionsViewProps> = ({
  initialSubject = 'matematicas',
  onBackToLanding,
  onOpenTimedQuiz: _onOpenTimedQuiz,
}) => {
  const [activeSubject, setActiveSubject] = useState<'matematicas' | 'geoestadistica' | 'ingles'>(initialSubject);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Top Bar with Navigation & Subject Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-navy-700 pb-4">
        <button
          onClick={onBackToLanding}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-600 hover:text-navy-600 dark:text-slate-400 dark:hover:text-ice-300 transition-colors py-1.5 px-2 -ml-2 rounded-lg hover:bg-ice-200 dark:hover:bg-navy-800 self-start"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Inicio</span>
        </button>

        {/* 3 Subject Switcher Pills */}
        <div className="flex items-center gap-1.5 sm:gap-2 p-1 rounded-xl bg-ice-200 dark:bg-navy-900 border border-slate-200 dark:border-navy-700 self-stretch sm:self-auto overflow-x-auto">
          <button
            onClick={() => setActiveSubject('matematicas')}
            className={`min-h-[38px] px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 shrink-0 ${
              activeSubject === 'matematicas'
                ? 'bg-crimson-600 text-white dark:bg-crimson-500 shadow-xs'
                : 'text-slate-700 dark:text-slate-300 hover:text-navy-600 dark:hover:text-ice-300 hover:bg-white/60 dark:hover:bg-navy-800'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Matemáticas</span>
            <span className="hidden md:inline text-xs uppercase font-bold px-1.5 py-0.5 rounded bg-black/15">
              20 Ejercicios
            </span>
          </button>

          <button
            onClick={() => setActiveSubject('geoestadistica')}
            className={`min-h-[38px] px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 shrink-0 ${
              activeSubject === 'geoestadistica'
                ? 'bg-amber-600 text-white dark:bg-amber-500 shadow-xs'
                : 'text-slate-700 dark:text-slate-300 hover:text-navy-600 dark:hover:text-ice-300 hover:bg-white/60 dark:hover:bg-navy-800'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Geoestadística</span>
            <span className="hidden md:inline text-xs uppercase font-bold px-1.5 py-0.5 rounded bg-black/15">
              10 Ejercicios
            </span>
          </button>

          <button
            onClick={() => setActiveSubject('ingles')}
            className={`min-h-[38px] px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 shrink-0 ${
              activeSubject === 'ingles'
                ? 'bg-navy-600 text-white dark:bg-navy-700 dark:text-ice-300 shadow-xs'
                : 'text-slate-700 dark:text-slate-300 hover:text-navy-600 dark:hover:text-ice-300 hover:bg-white/60 dark:hover:bg-navy-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-sky-400" />
            <span>Inglés</span>
            <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">
              Gramática
            </span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. MATEMÁTICAS VIEW (Marco Teórico + 20 Preguntas con Desplegables)       */}
      {/* ========================================================================= */}
      {activeSubject === 'matematicas' && (
        <MathSessionView />
      )}

      {/* ========================================================================= */}
      {/* 2. GEOESTADÍSTICA VIEW (Marco Teórico + 10 Preguntas con Desplegables)    */}
      {/* ========================================================================= */}
      {activeSubject === 'geoestadistica' && (
        <GeoSessionView />
      )}

      {/* ========================================================================= */}
      {/* 3. INGLÉS VIEW (Módulo Interactivo Completo)                              */}
      {/* ========================================================================= */}
      {activeSubject === 'ingles' && (
        <div className="animate-slide-fade">
          <EnglishSessionView
            sessionDay={1}
            onBackToLanding={onBackToLanding}
          />
        </div>
      )}
    </div>
  );
};
