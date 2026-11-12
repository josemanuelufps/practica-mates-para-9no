import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { SessionList } from './components/SessionList';
import { TopicList } from './components/TopicList';
import { SessionsView } from './components/SessionsView';
import { TimedQuizView } from './components/timedQuiz/TimedQuizView';
import { Sparkles, ArrowRight, BookOpen, Layers, CheckCircle2, Zap } from 'lucide-react';

export function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [activeTab, setActiveTab] = useState<'landing' | 'sesiones' | 'quices-contrarreloj'>('landing');
  const [sessionsSubject, setSessionsSubject] = useState<'matematicas' | 'geoestadistica' | 'ingles'>('matematicas');

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
    if (sessionId === 'matematicas') {
      setSessionsSubject('matematicas');
      setActiveTab('sesiones');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sessionId === 'geoestadistica') {
      setSessionsSubject('geoestadistica');
      setActiveTab('sesiones');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sessionId === 'ingles') {
      setSessionsSubject('ingles');
      setActiveTab('sesiones');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setActiveTab('sesiones');
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
            <section className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-800 p-5 sm:p-8 lg:p-9 shadow-subtle dark:shadow-subtle-dark">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                {/* Left: Main intro & actions */}
                <div className="lg:col-span-7">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-navy-50 dark:bg-navy-900 text-navy-600 dark:text-slate-300 border border-slate-200 dark:border-navy-700 mb-3 sm:mb-4">
                    <BookOpen className="w-3.5 h-3.5 text-crimson-600 dark:text-crimson-400 shrink-0" />
                    <span>Guía de Estudio & Práctica de 9° Grado</span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-navy-600 dark:text-ice-300 leading-tight">
                    Repaso y Acompañamiento Académico
                  </h1>

                  <p className="mt-2.5 sm:mt-3 text-sm sm:text-base text-slate-700 dark:text-slate-400 leading-relaxed max-w-prose">
                    Espacio de estudio integral centrado en{' '}
                    <strong className="text-navy-600 dark:text-ice-300 font-semibold">
                      Matemáticas
                    </strong>
                    , con cobertura complementaria de{' '}
                    <strong className="text-navy-600 dark:text-ice-300 font-semibold">
                      Geoestadística e Inglés
                    </strong>
                    . Fórmulas de examen, retroalimentación inmediata, justificaciones paso a paso y quices contrarreloj.
                  </p>

                  <div className="mt-5 sm:mt-7 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3">
                    <button
                      onClick={() => {
                        setSessionsSubject('matematicas');
                        setActiveTab('sesiones');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="min-h-[44px] px-5 py-2.5 rounded-xl bg-crimson-600 hover:bg-crimson-500 text-white dark:bg-crimson-500 dark:hover:bg-crimson-400 dark:text-white font-semibold text-xs sm:text-sm flex items-center justify-center sm:justify-start gap-2 shadow-xs transition-all active:scale-98 w-full sm:w-auto"
                    >
                      <Sparkles className="w-4 h-4 text-crimson-200 shrink-0" />
                      <span>Ver Sesiones de Repaso</span>
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('quices-contrarreloj');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="min-h-[44px] px-5 py-2.5 rounded-xl bg-navy-600 hover:bg-navy-700 text-white dark:bg-navy-700 dark:hover:bg-navy-600 dark:text-ice-300 font-semibold text-xs sm:text-sm flex items-center justify-center sm:justify-start gap-2 shadow-xs transition-all active:scale-98 w-full sm:w-auto"
                    >
                      <Zap className="w-4 h-4 text-crimson-400 shrink-0" />
                      <span>Quices Contrarreloj</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        document.getElementById('temarios-section')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="min-h-[44px] px-5 py-2.5 rounded-xl border border-slate-300 dark:border-navy-700 hover:bg-ice-200 dark:hover:bg-navy-700 text-slate-700 dark:text-slate-300 font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center sm:justify-start gap-2 active:scale-98 w-full sm:w-auto"
                    >
                      <Layers className="w-4 h-4 text-navy-600 dark:text-slate-400 shrink-0" />
                      <span>Ver Temario Completo</span>
                    </button>
                  </div>
                </div>

                {/* Right: Quick-access feature card focusing on Mathematics */}
                <div className="lg:col-span-5 mt-2 lg:mt-0">
                  <div className="p-4 sm:p-5 rounded-xl border border-crimson-200/80 dark:border-crimson-900/60 bg-crimson-50/40 dark:bg-navy-900/70 shadow-2xs">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-3.5 h-3.5 text-crimson-600 dark:text-crimson-400 shrink-0" />
                      <span className="text-xs font-mono uppercase font-bold tracking-wider text-crimson-700 dark:text-crimson-300">
                        Eje Prioritario de Estudio
                      </span>
                    </div>

                    <h2 className="text-base font-bold text-navy-600 dark:text-ice-300 leading-snug">
                      Matemáticas: Álgebra & Sistemas 2x2
                    </h2>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 mb-3.5">
                      Repaso modular con operaciones de radicales, racionalización, factorización y resolución analítica de sistemas de ecuaciones.
                    </p>

                    <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 mb-4 border-t border-crimson-100 dark:border-navy-800 pt-3">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-crimson-600 dark:text-crimson-400 shrink-0" />
                        <span>Operaciones con radicales y racionalización</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-crimson-600 dark:text-crimson-400 shrink-0" />
                        <span>Sistemas 2x2: Igualación, Reducción, Sustitución, Cramer</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-crimson-600 dark:text-crimson-400 shrink-0" />
                        <span>Geoestadística e Inglés organizados</span>
                      </li>
                    </ul>

                    <button
                      onClick={() => {
                        setSessionsSubject('matematicas');
                        setActiveTab('sesiones');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="w-full min-h-[40px] px-3.5 py-2 rounded-lg bg-navy-600 hover:bg-navy-700 text-white dark:bg-crimson-600 dark:hover:bg-crimson-500 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs active:scale-98"
                    >
                      <span>Explorar Sesión de Matemáticas</span>
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

        {/* Dedicated Unified Sessions View (Math, Geo, English) */}
        {activeTab === 'sesiones' && (
          <SessionsView
            initialSubject={sessionsSubject}
            onBackToLanding={() => {
              setActiveTab('landing');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenTimedQuiz={() => {
              setActiveTab('quices-contrarreloj');
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
          <div className="font-mono text-xs text-slate-500 dark:text-slate-400">
            Desplegado en GitHub Pages
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
