import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { SessionList } from './components/SessionList';
import { TopicList } from './components/TopicList';
import { EnglishSessionView } from './components/EnglishSessionView';
import { Sparkles, ArrowRight, BookOpen, Layers } from 'lucide-react';

export function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [activeTab, setActiveTab] = useState<'landing' | 'sesion-1' | 'sesion-2'>('landing');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleSelectSession = (sessionId: string) => {
    if (sessionId === 'sesion-1') {
      setActiveTab('sesion-1');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sessionId === 'sesion-2') {
      setActiveTab('sesion-2');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setActiveTab('landing');
      setTimeout(() => {
        const el = document.getElementById('temarios-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream-50 dark:bg-moss-950 text-forest-900 dark:text-[#ECF3EF] transition-colors">
      {/* Sticky Top Navbar */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeTab === 'landing' && (
          <div className="space-y-10">
            {/* Hero Banner */}
            <section className="relative overflow-hidden rounded-2xl border border-cream-200 dark:border-moss-800 bg-white dark:bg-moss-900 p-6 sm:p-8 shadow-subtle dark:shadow-subtle-dark">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-forest-50 dark:bg-moss-850 text-forest-700 dark:text-forest-300 border border-forest-100 dark:border-moss-800 mb-4">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Guía & Práctica Libre de 9° Grado</span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-forest-900 dark:text-[#ECF3EF]">
                  Repaso y Acompañamiento Académico
                </h1>

                <p className="mt-2.5 text-sm sm:text-base text-stone-600 dark:text-[#92A49B] leading-relaxed">
                  Espacio de práctica interactiva diseñado para afianzar los conceptos fundamentales de{' '}
                  <strong className="text-forest-900 dark:text-[#ECF3EF] font-semibold">
                    Álgebra, Geoestadística e Inglés
                  </strong>
                  . Ejercicios con retroalimentación inmediata, justificaciones paso a paso y banco de palabras táctil.
                </p>

                {/* Priority CTA for Today's Session */}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setActiveTab('sesion-1')}
                    className="px-4 py-2.5 rounded-xl bg-forest-600 hover:bg-forest-500 text-white dark:bg-forest-400 dark:hover:bg-forest-300 dark:text-moss-950 font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-xs transition-all"
                  >
                    <Sparkles className="w-4 h-4 text-terracotta-300 dark:text-terracotta-700" />
                    <span>Empezar Sesión de Hoy (10 Nov)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href="#temarios-section"
                    className="px-4 py-2.5 rounded-xl border border-cream-200 dark:border-moss-800 hover:bg-cream-100 dark:hover:bg-moss-850 text-stone-700 dark:text-[#92A49B] font-medium text-xs sm:text-sm transition-colors flex items-center gap-1.5"
                  >
                    <Layers className="w-4 h-4 text-forest-600 dark:text-forest-400" />
                    <span>Ver Temario Completo</span>
                  </a>
                </div>
              </div>
            </section>

            {/* Section 1: Sessions */}
            <section id="sesiones-section" className="space-y-4">
              <SessionList onSelectSession={handleSelectSession} />
            </section>

            {/* Section 2: Full Syllabus */}
            <section id="temarios-section" className="space-y-4 pt-4 border-t border-cream-200 dark:border-moss-800">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-forest-900 dark:text-[#ECF3EF]">
                  Temario Detallado de Estudio
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-[#92A49B] mt-0.5">
                  Lista completa de los temas a cubrir durante las sesiones de refuerzo.
                </p>
              </div>
              <TopicList />
            </section>
          </div>
        )}

        {/* Dedicated English Session 1 View */}
        {activeTab === 'sesion-1' && (
          <EnglishSessionView
            sessionDay={1}
            onBackToLanding={() => setActiveTab('landing')}
          />
        )}

        {/* Dedicated English Session 2 View */}
        {activeTab === 'sesion-2' && (
          <EnglishSessionView
            sessionDay={2}
            onBackToLanding={() => setActiveTab('landing')}
          />
        )}
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-cream-200 dark:border-moss-800 bg-white dark:bg-moss-900 py-6 text-center text-xs text-stone-500 dark:text-[#92A49B] transition-colors">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <span>Guía de Refuerzo Académico - 9° Grado</span>
            <span className="mx-2">•</span>
            <span>Recurso público y libre para el estudiante</span>
          </div>
          <div className="font-mono text-[11px] text-stone-400 dark:text-stone-500">
            Desplegado en GitHub Pages
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
