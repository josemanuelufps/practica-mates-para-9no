import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { SessionList } from './components/SessionList';
import { TopicList } from './components/TopicList';
import { EnglishSessionView } from './components/EnglishSessionView';
import { TimedQuizView } from './components/timedQuiz/TimedQuizView';
import { Sparkles, ArrowRight, BookOpen, Layers, CheckCircle2, Zap } from 'lucide-react';

export function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [activeTab, setActiveTab] = useState<'landing' | 'sesion-1' | 'sesion-2' | 'quices-contrarreloj'>('landing');

  // Ensure fresh page load always starts at top and cleans up any lingering hash
  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

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
    <div className="min-h-screen flex flex-col bg-ice-300 dark:bg-navy-950 text-navy-600 dark:text-ice-300 transition-colors">
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
          <div className="space-y-10 sm:space-y-14">
            {/* Hero Section with balanced 2-column layout */}
            <section className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-800 p-6 sm:p-8 lg:p-9 shadow-subtle dark:shadow-subtle-dark">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left: Main intro & actions */}
                <div className="lg:col-span-7">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-navy-50 dark:bg-navy-900 text-navy-600 dark:text-slate-300 border border-slate-200 dark:border-navy-700 mb-4">
                    <BookOpen className="w-3.5 h-3.5 text-crimson-600 dark:text-crimson-400" />
                    <span>Guía & Práctica Libre de 9° Grado</span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-navy-600 dark:text-ice-300 leading-tight">
                    Repaso y Acompañamiento Académico
                  </h1>

                  <p className="mt-3 text-sm sm:text-base text-slate-700 dark:text-slate-400 leading-relaxed max-w-prose">
                    Espacio de práctica interactiva diseñado para afianzar los conceptos fundamentales de{' '}
                    <strong className="text-navy-600 dark:text-ice-300 font-semibold">
                      Álgebra, Geoestadística e Inglés
                    </strong>
                    . Ejercicios con retroalimentación inmediata, justificaciones paso a paso y banco de palabras táctil.
                  </p>

                  <div className="mt-7 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => {
                        setActiveTab('sesion-1');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="min-h-[44px] px-5 py-2.5 rounded-xl bg-crimson-600 hover:bg-crimson-500 text-white dark:bg-crimson-500 dark:hover:bg-crimson-400 dark:text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-xs transition-all active:scale-98"
                    >
                      <Sparkles className="w-4 h-4 text-crimson-200" />
                      <span>Empezar Sesión de Hoy (10 Nov)</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('quices-contrarreloj');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="min-h-[44px] px-5 py-2.5 rounded-xl bg-navy-600 hover:bg-navy-700 text-white dark:bg-navy-700 dark:hover:bg-navy-600 dark:text-ice-300 font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-xs transition-all active:scale-98"
                    >
                      <Zap className="w-4 h-4 text-crimson-400" />
                      <span>Quices Contrarreloj (20s)</span>
                      <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 bg-crimson-600 text-white rounded">
                        Nuevo
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        document.getElementById('temarios-section')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="min-h-[44px] px-5 py-2.5 rounded-xl border border-slate-300 dark:border-navy-700 hover:bg-ice-200 dark:hover:bg-navy-700 text-slate-700 dark:text-slate-300 font-semibold text-xs sm:text-sm transition-colors flex items-center gap-2 active:scale-98"
                    >
                      <Layers className="w-4 h-4 text-navy-600 dark:text-slate-400" />
                      <span>Ver Temario Completo</span>
                    </button>
                  </div>
                </div>

                {/* Right: Quick-access active session feature card */}
                <div className="lg:col-span-5">
                  <div className="p-5 rounded-xl border border-crimson-200/80 dark:border-crimson-900/60 bg-crimson-50/40 dark:bg-navy-900/70 shadow-2xs">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-crimson-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-crimson-600"></span>
                      </span>
                      <span className="text-[11px] font-mono uppercase font-bold tracking-wider text-crimson-700 dark:text-crimson-300">
                        Práctica Activa de Hoy
                      </span>
                    </div>

                    <h2 className="text-base font-bold text-navy-600 dark:text-ice-300 leading-snug">
                      Sesión 1: Past Perfect & Condicionales
                    </h2>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 mb-3.5">
                      10 de Noviembre • Módulo de Inglés interactivo listo para resolver en clase o individualmente.
                    </p>

                    <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 mb-4 border-t border-crimson-100 dark:border-navy-800 pt-3">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-crimson-600 dark:text-crimson-400 shrink-0" />
                        <span>Línea temporal visual del Past Perfect</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-crimson-600 dark:text-crimson-400 shrink-0" />
                        <span>Quizzes interactivos con justificación</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-crimson-600 dark:text-crimson-400 shrink-0" />
                        <span>Banco de palabras táctil (Click-to-slot)</span>
                      </li>
                    </ul>

                    <button
                      onClick={() => {
                        setActiveTab('sesion-1');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="w-full min-h-[40px] px-3.5 py-2 rounded-lg bg-navy-600 hover:bg-navy-700 text-white dark:bg-crimson-600 dark:hover:bg-crimson-500 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs active:scale-98"
                    >
                      <span>Abrir Módulo de Inglés</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 1: Sessions */}
            <section id="sesiones-section" className="space-y-4">
              <SessionList onSelectSession={handleSelectSession} />
            </section>

            {/* Section 2: Full Syllabus */}
            <section id="temarios-section" className="space-y-4 pt-4 border-t border-slate-200 dark:border-navy-700">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-navy-600 dark:text-ice-300">
                    Temario Detallado de Estudio
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                    Lista completa de los temas a cubrir durante las sesiones de refuerzo de 9° grado.
                  </p>
                </div>
              </div>
              <TopicList />
            </section>
          </div>
        )}

        {/* Dedicated English Session 1 View */}
        {activeTab === 'sesion-1' && (
          <EnglishSessionView
            sessionDay={1}
            onBackToLanding={() => {
              setActiveTab('landing');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Dedicated English Session 2 View */}
        {activeTab === 'sesion-2' && (
          <EnglishSessionView
            sessionDay={2}
            onBackToLanding={() => {
              setActiveTab('landing');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Dedicated Timed Quiz View */}
        {activeTab === 'quices-contrarreloj' && (
          <TimedQuizView
            onBackToLanding={() => {
              setActiveTab('landing');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-800 py-6 text-center text-xs text-slate-600 dark:text-slate-400 transition-colors">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <span>Guía de Refuerzo Académico - 9° Grado</span>
            <span className="mx-2">•</span>
            <span>Recurso público y libre para el estudiante</span>
          </div>
          <div className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
            Desplegado en GitHub Pages
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
