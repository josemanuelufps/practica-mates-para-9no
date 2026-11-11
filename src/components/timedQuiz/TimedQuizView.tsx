import React, { useState, useEffect, useRef } from 'react';
import { timedQuizPool } from '../../data/timedQuizPool';
import { TimedQuestion, TimedQuizAttemptResult, TimedTopicCategory } from '../../types/timedQuiz';
import { fireMasteryCelebration } from '../../utils/confetti';
import {
  Timer,
  Sparkles,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Zap,
  Clock,
  ArrowLeft,
  Award
} from 'lucide-react';

interface TimedQuizViewProps {
  onBackToLanding: () => void;
}

const TOTAL_QUESTIONS_PER_ROUND = 10;
const TIME_LIMIT_PER_SLIDE = 20; // 20 seconds
const FEEDBACK_DELAY_SECONDS = 5; // 5 seconds review

export const TimedQuizView: React.FC<TimedQuizViewProps> = ({ onBackToLanding }) => {
  // Game states: 'intro' | 'active' | 'feedback' | 'summary'
  const [gameState, setGameState] = useState<'intro' | 'active' | 'feedback' | 'summary'>('intro');

  const [activeDeck, setActiveDeck] = useState<TimedQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [timeRemaining, setTimeRemaining] = useState<number>(TIME_LIMIT_PER_SLIDE);
  const [feedbackCountdown, setFeedbackCountdown] = useState<number>(FEEDBACK_DELAY_SECONDS);

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [lastAnswerWasCorrect, setLastAnswerWasCorrect] = useState<boolean>(false);
  const [results, setResults] = useState<TimedQuizAttemptResult[]>([]);

  // Timers refs
  const slideTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const feedbackTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Shuffle and pick 10 random questions
  const startNewQuiz = () => {
    const shuffled = [...timedQuizPool].sort(() => 0.5 - Math.random());
    const selectedTen = shuffled.slice(0, TOTAL_QUESTIONS_PER_ROUND);

    setActiveDeck(selectedTen);
    setCurrentIndex(0);
    setResults([]);
    setSelectedAnswer(null);
    setTimeRemaining(TIME_LIMIT_PER_SLIDE);
    setGameState('active');
  };

  const currentQuestion = activeDeck[currentIndex];

  // Clean all timers
  const clearAllTimers = () => {
    if (slideTimerRef.current) clearInterval(slideTimerRef.current);
    if (feedbackTimerRef.current) clearInterval(feedbackTimerRef.current);
  };

  useEffect(() => {
    return () => clearAllTimers();
  }, []);

  // Timer loop during active slide
  useEffect(() => {
    if (gameState !== 'active') return;

    setTimeRemaining(TIME_LIMIT_PER_SLIDE);

    slideTimerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          // Time expired
          clearInterval(slideTimerRef.current!);
          handleAnswerSubmitted('__TIMEOUT__');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (slideTimerRef.current) clearInterval(slideTimerRef.current);
    };
  }, [gameState, currentIndex]);

  // Answer handler
  const handleAnswerSubmitted = (answer: string) => {
    if (gameState !== 'active' || !currentQuestion) return;

    clearAllTimers();

    let isCorrect = false;
    let correctAnswerStr = '';

    if (currentQuestion.type === 'multiple-choice') {
      correctAnswerStr = currentQuestion.options[currentQuestion.correctIndex];
      isCorrect = answer === correctAnswerStr;
    } else if (currentQuestion.type === 'binary-classify') {
      correctAnswerStr =
        currentQuestion.correctCategory === 'A'
          ? currentQuestion.categoryA
          : currentQuestion.categoryB;
      isCorrect = answer === currentQuestion.correctCategory;
    } else if (currentQuestion.type === 'quick-slot') {
      correctAnswerStr = currentQuestion.correctAnswer;
      isCorrect = answer === correctAnswerStr;
    } else if (currentQuestion.type === 'correct-incorrect') {
      correctAnswerStr = currentQuestion.isCorrect ? 'Correcto' : 'Incorrecto';
      isCorrect = (answer === 'true') === currentQuestion.isCorrect;
    }

    const timeSpent = TIME_LIMIT_PER_SLIDE - timeRemaining;

    const attemptResult: TimedQuizAttemptResult = {
      questionId: currentQuestion.id,
      topic: currentQuestion.topic,
      prompt: currentQuestion.prompt,
      userAnswer: answer === '__TIMEOUT__' ? 'Tiempo agotado' : answer,
      correctAnswer: correctAnswerStr,
      isCorrect,
      timeSpentSeconds: timeSpent,
      explanation: currentQuestion.explanation,
    };

    setResults((prev) => [...prev, attemptResult]);
    setSelectedAnswer(answer);
    setLastAnswerWasCorrect(isCorrect);
    setGameState('feedback');
    setFeedbackCountdown(FEEDBACK_DELAY_SECONDS);

    // Feedback countdown timer (5 seconds)
    feedbackTimerRef.current = setInterval(() => {
      setFeedbackCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(feedbackTimerRef.current!);
          advanceToNextSlide();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const advanceToNextSlide = () => {
    clearAllTimers();
    setSelectedAnswer(null);

    if (currentIndex + 1 < TOTAL_QUESTIONS_PER_ROUND) {
      setCurrentIndex((prev) => prev + 1);
      setGameState('active');
    } else {
      // Quiz Finished
      setGameState('summary');
      const allResults = results; // latest added
      const totalCorrect = allResults.filter((r) => r.isCorrect).length;
      if (totalCorrect === TOTAL_QUESTIONS_PER_ROUND) {
        fireMasteryCelebration();
      }
    }
  };

  // Helper labels for internal topics (for developer / tutor stats summary)
  const topicLabels: Record<TimedTopicCategory, string> = {
    'past-perfect': 'Past Perfect',
    'zero-conditional': 'Zero Conditional',
    'first-conditional': 'First Conditional',
    'zero-vs-first': 'Zero vs First',
    'second-conditional': 'Second Conditional',
    'third-conditional': 'Third Conditional',
    'second-vs-third': 'Second vs Third',
  };

  // =========================================================================
  // RENDER: INTRO VIEW
  // =========================================================================
  if (gameState === 'intro') {
    return (
      <div className="space-y-8 animate-slide-fade">
        {/* Breadcrumb */}
        <button
          onClick={onBackToLanding}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-600 hover:text-navy-600 dark:text-slate-400 dark:hover:text-ice-300 transition-colors py-1.5 px-2 -ml-2 rounded-lg hover:bg-ice-200 dark:hover:bg-navy-800"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Inicio</span>
        </button>

        {/* Intro Card */}
        <div className="border border-slate-200 dark:border-navy-700 rounded-2xl p-6 sm:p-9 bg-white dark:bg-navy-800 shadow-subtle dark:shadow-subtle-dark max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <span className="p-2 rounded-xl bg-crimson-50 dark:bg-crimson-900/50 text-crimson-600 dark:text-crimson-400">
              <Zap className="w-5 h-5" />
            </span>
            <span className="text-xs font-mono uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-crimson-50 dark:bg-crimson-900/40 text-crimson-700 dark:text-crimson-300 border border-crimson-200 dark:border-crimson-800">
              Desafío de Velocidad • Inglés 9°
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-600 dark:text-ice-300 tracking-tight leading-tight">
            Quices Contrarreloj (20 Segundos por Pregunta)
          </h1>

          <p className="mt-3 text-sm text-slate-700 dark:text-slate-400 leading-relaxed max-w-prose">
            Pon a prueba tu agilidad mental y dominio de los temas de inglés: Past Perfect, Zero, First, Second y Third Conditional.
            Cada ronda toma 10 preguntas aleatorias de nuestro banco de 100 ejercicios.
          </p>

          {/* Rules overview */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl border border-slate-200 dark:border-navy-700 bg-ice-100/60 dark:bg-navy-900/50">
              <Clock className="w-4 h-4 text-crimson-600 dark:text-crimson-400 mb-1.5" />
              <div className="font-bold text-sm text-navy-600 dark:text-ice-300">20 Segundos</div>
              <div className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                Tiempo límite por slide para leer y responder.
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-navy-700 bg-ice-100/60 dark:bg-navy-900/50">
              <Sparkles className="w-4 h-4 text-crimson-600 dark:text-crimson-400 mb-1.5" />
              <div className="font-bold text-sm text-navy-600 dark:text-ice-300">10 Preguntas</div>
              <div className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                Seleccionadas al azar del pool de 100 slides.
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-navy-700 bg-ice-100/60 dark:bg-navy-900/50">
              <HelpCircle className="w-4 h-4 text-crimson-600 dark:text-crimson-400 mb-1.5" />
              <div className="font-bold text-sm text-navy-600 dark:text-ice-300">5s de Solución</div>
              <div className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                Revisión pedagógica antes de pasar a la siguiente.
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={startNewQuiz}
              className="min-h-[48px] px-6 py-3 rounded-xl bg-crimson-600 hover:bg-crimson-500 text-white dark:bg-crimson-500 dark:hover:bg-crimson-400 font-bold text-sm flex items-center gap-2 shadow-xs transition-all active:scale-95"
            >
              <Zap className="w-4 h-4" />
              <span>Empezar Quiz Contrarreloj</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <span className="text-xs text-slate-500 dark:text-slate-400">
              Intentos ilimitados • Práctica 100% libre
            </span>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // RENDER: SUMMARY VIEW (Results after 10 questions)
  // =========================================================================
  if (gameState === 'summary') {
    const totalCorrect = results.filter((r) => r.isCorrect).length;
    const totalFailed = TOTAL_QUESTIONS_PER_ROUND - totalCorrect;
    const percentage = Math.round((totalCorrect / TOTAL_QUESTIONS_PER_ROUND) * 100);

    // Group stats by topic category for internal dev / tutor visibility
    const topicStats: Record<string, { correct: number; total: number }> = {};
    results.forEach((r) => {
      if (!topicStats[r.topic]) {
        topicStats[r.topic] = { correct: 0, total: 0 };
      }
      topicStats[r.topic].total += 1;
      if (r.isCorrect) {
        topicStats[r.topic].correct += 1;
      }
    });

    return (
      <div className="space-y-8 animate-slide-fade max-w-3xl mx-auto">
        {/* Score banner */}
        <div className="border border-slate-200 dark:border-navy-700 rounded-2xl p-6 sm:p-8 bg-white dark:bg-navy-800 shadow-subtle dark:shadow-subtle-dark text-center">
          <div className="w-14 h-14 rounded-2xl bg-crimson-50 dark:bg-crimson-900/50 text-crimson-600 dark:text-crimson-400 flex items-center justify-center mx-auto mb-3">
            <Award className="w-8 h-8" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-600 dark:text-ice-300">
            {totalCorrect === 10
              ? '¡Desempeño Impecable! 10 de 10'
              : totalCorrect >= 7
              ? '¡Excelente Trabajo de Velocidad!'
              : totalCorrect >= 5
              ? 'Buen Intento • Sigue Afianzando'
              : 'Buen Entrenamiento • Repasemos las Claves'}
          </h2>

          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-prose mx-auto">
            Completaste las 10 preguntas contrarreloj. A continuación tienes tu resumen y desglose por temas:
          </p>

          <div className="mt-6 flex items-center justify-center gap-6">
            <div className="text-center p-3 rounded-xl bg-success-50 dark:bg-success-950/40 border border-success-200 dark:border-success-800 min-w-28">
              <span className="block text-2xl font-extrabold text-success-600 dark:text-success-400">
                {totalCorrect}
              </span>
              <span className="text-xs font-semibold text-success-700 dark:text-success-300">
                Aprobadas
              </span>
            </div>

            <div className="text-center p-3 rounded-xl bg-crimson-50 dark:bg-crimson-950/40 border border-crimson-200 dark:border-crimson-900 min-w-28">
              <span className="block text-2xl font-extrabold text-crimson-600 dark:text-crimson-400">
                {totalFailed}
              </span>
              <span className="text-xs font-semibold text-crimson-700 dark:text-crimson-300">
                Falladas
              </span>
            </div>

            <div className="text-center p-3 rounded-xl bg-ice-200 dark:bg-navy-900 border border-slate-300 dark:border-navy-700 min-w-28">
              <span className="block text-2xl font-extrabold text-navy-600 dark:text-ice-300">
                {percentage}%
              </span>
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                Efectividad
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={startNewQuiz}
              className="min-h-[48px] px-6 py-3 rounded-xl bg-crimson-600 hover:bg-crimson-500 text-white dark:bg-crimson-500 dark:hover:bg-crimson-400 font-bold text-sm flex items-center gap-2 shadow-xs transition-all active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Jugar otra ronda (10 Nuevas)</span>
            </button>

            <button
              onClick={onBackToLanding}
              className="min-h-[48px] px-5 py-3 rounded-xl border border-slate-300 dark:border-navy-700 hover:bg-ice-200 dark:hover:bg-navy-700 text-slate-700 dark:text-slate-300 font-semibold text-sm transition-colors"
            >
              Volver al Temario & Sesiones
            </button>
          </div>
        </div>

        {/* Breakdown by internal topic (for student, tutor & devs) */}
        <div className="border border-slate-200 dark:border-navy-700 rounded-xl p-5 bg-white dark:bg-navy-800 shadow-subtle dark:shadow-subtle-dark">
          <h3 className="font-bold text-sm sm:text-base text-navy-600 dark:text-ice-300 mb-3">
            Desglose Pedagógico de esta Ronda:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {Object.entries(topicStats).map(([topicKey, stat]) => {
              const label = topicLabels[topicKey as TimedTopicCategory] || topicKey;
              const isAllGood = stat.correct === stat.total;
              return (
                <div
                  key={topicKey}
                  className="p-3 rounded-lg border border-slate-200 dark:border-navy-700 bg-ice-100/50 dark:bg-navy-900/40 flex items-center justify-between text-xs sm:text-sm"
                >
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    {label}
                  </span>
                  <span
                    className={`font-mono font-bold px-2 py-0.5 rounded ${
                      isAllGood
                        ? 'bg-success-100 text-success-800 dark:bg-success-950/80 dark:text-success-200'
                        : 'bg-crimson-100 text-crimson-800 dark:bg-crimson-950/80 dark:text-crimson-200'
                    }`}
                  >
                    {stat.correct} / {stat.total} aciertos
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Question by question detail review */}
        <div className="border border-slate-200 dark:border-navy-700 rounded-xl p-5 bg-white dark:bg-navy-800 shadow-subtle dark:shadow-subtle-dark space-y-4">
          <h3 className="font-bold text-sm sm:text-base text-navy-600 dark:text-ice-300">
            Revisión Detallada de Respuestas:
          </h3>

          <div className="space-y-3">
            {results.map((res, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-xl border text-xs sm:text-sm ${
                  res.isCorrect
                    ? 'border-success-200 dark:border-success-800 bg-success-50/40 dark:bg-success-950/20'
                    : 'border-crimson-200 dark:border-crimson-900 bg-crimson-50/40 dark:bg-crimson-950/20'
                }`}
              >
                <div className="flex items-start gap-2 justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-400">
                      #{idx + 1}
                    </span>
                    <span className="font-semibold text-navy-600 dark:text-ice-300">
                      {res.prompt}
                    </span>
                  </div>
                  {res.isCorrect ? (
                    <span className="inline-flex items-center gap-1 text-success-600 dark:text-success-400 font-bold shrink-0 text-xs">
                      <CheckCircle2 className="w-4 h-4" /> Aprobada
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-crimson-600 dark:text-crimson-400 font-bold shrink-0 text-xs">
                      <XCircle className="w-4 h-4" /> Fallada
                    </span>
                  )}
                </div>

                <div className="text-slate-700 dark:text-slate-300 space-y-1">
                  <div>
                    <span className="font-semibold">Tu respuesta: </span>
                    <span className={res.isCorrect ? 'text-success-700 dark:text-success-300 font-medium' : 'text-crimson-700 dark:text-crimson-300 font-medium'}>
                      {res.userAnswer}
                    </span>
                  </div>
                  {!res.isCorrect && (
                    <div>
                      <span className="font-semibold text-navy-600 dark:text-ice-300">Respuesta correcta: </span>
                      <span className="font-mono font-bold text-success-700 dark:text-success-300">
                        {res.correctAnswer}
                      </span>
                    </div>
                  )}
                  <p className="text-slate-600 dark:text-slate-400 italic text-[11px] pt-1">
                    {res.explanation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // RENDER: ACTIVE / FEEDBACK SLIDE
  // =========================================================================
  const isTimeCritical = timeRemaining <= 5;
  const isFeedbackState = gameState === 'feedback';

  return (
    <div className="space-y-6 max-w-3xl mx-auto animate-slide-fade">
      {/* Top Header & Timer Bar */}
      <div className="border border-slate-200 dark:border-navy-700 rounded-2xl p-5 bg-white dark:bg-navy-800 shadow-subtle dark:shadow-subtle-dark">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-navy-50 dark:bg-navy-900 text-navy-600 dark:text-slate-300 border border-slate-200 dark:border-navy-700">
              Pregunta {currentIndex + 1} de {TOTAL_QUESTIONS_PER_ROUND}
            </span>
          </div>

          {/* 20-second Countdown badge */}
          <div
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold transition-colors ${
              isTimeCritical
                ? 'bg-crimson-600 text-white animate-pulse'
                : 'bg-ice-200 dark:bg-navy-900 text-navy-600 dark:text-ice-300 border border-slate-200 dark:border-navy-700'
            }`}
          >
            <Timer className="w-3.5 h-3.5" />
            <span>{timeRemaining}s</span>
          </div>
        </div>

        {/* Linear progress bar */}
        <div className="w-full bg-ice-200 dark:bg-navy-900 h-2 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-1000 ease-linear ${
              isTimeCritical ? 'bg-crimson-600' : 'bg-navy-600 dark:bg-crimson-500'
            }`}
            style={{ width: `${(timeRemaining / TIME_LIMIT_PER_SLIDE) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Slide Card */}
      <div className="border border-slate-200 dark:border-navy-700 rounded-2xl p-6 sm:p-8 bg-white dark:bg-navy-800 shadow-subtle dark:shadow-subtle-dark min-h-[360px] flex flex-col justify-between">
        <div>
          {/* Prompt */}
          <h2 className="text-base sm:text-lg font-bold text-navy-600 dark:text-ice-300 mb-6 leading-snug">
            {currentQuestion.prompt}
          </h2>

          {/* TYPE 1: MULTIPLE CHOICE */}
          {currentQuestion.type === 'multiple-choice' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-navy-700 bg-ice-100/50 dark:bg-navy-900/40 text-base sm:text-lg font-semibold text-navy-600 dark:text-ice-300 leading-relaxed">
                {currentQuestion.sentence}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {currentQuestion.options.map((opt, optIdx) => {
                  const isOptionSelected = selectedAnswer === opt;
                  const isCorrectOption = optIdx === currentQuestion.correctIndex;

                  let btnStyle =
                    'border-slate-300 dark:border-navy-600 bg-white dark:bg-navy-900 text-slate-800 dark:text-ice-300 hover:border-crimson-400';

                  if (isFeedbackState) {
                    if (isCorrectOption) {
                      btnStyle = 'border-success-500 bg-success-50 dark:bg-success-950/60 text-success-900 dark:text-success-100 font-bold ring-2 ring-success-500/40';
                    } else if (isOptionSelected && !lastAnswerWasCorrect) {
                      btnStyle = 'border-crimson-500 bg-crimson-50 dark:bg-crimson-950/60 text-crimson-900 dark:text-crimson-100 font-bold ring-2 ring-crimson-400/40';
                    } else {
                      btnStyle = 'opacity-40 border-slate-200 dark:border-navy-800 text-slate-400';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={isFeedbackState}
                      onClick={() => handleAnswerSubmitted(opt)}
                      className={`min-h-[50px] px-4 py-3 rounded-xl border text-left text-sm font-medium transition-all shadow-2xs active:scale-98 flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {isFeedbackState && isCorrectOption && (
                        <CheckCircle2 className="w-4 h-4 text-success-600 dark:text-success-400 shrink-0" />
                      )}
                      {isFeedbackState && isOptionSelected && !lastAnswerWasCorrect && (
                        <XCircle className="w-4 h-4 text-crimson-600 dark:text-crimson-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* TYPE 2: BINARY CLASSIFY (Box A vs Box B) */}
          {currentQuestion.type === 'binary-classify' && (
            <div className="space-y-5">
              <div className="p-5 rounded-xl border border-slate-200 dark:border-navy-700 bg-ice-100/50 dark:bg-navy-900/40 text-base sm:text-lg font-semibold text-navy-600 dark:text-ice-300 text-center leading-relaxed">
                "{currentQuestion.phrase}"
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
                {[
                  { key: 'A' as const, label: currentQuestion.categoryA },
                  { key: 'B' as const, label: currentQuestion.categoryB },
                ].map((cat) => {
                  const isCorrect = currentQuestion.correctCategory === cat.key;
                  const isSelected = selectedAnswer === cat.key;

                  let btnStyle =
                    'border-slate-300 dark:border-navy-600 bg-white dark:bg-navy-900 text-slate-800 dark:text-ice-300 hover:border-crimson-500 hover:bg-crimson-50/20 dark:hover:bg-navy-700/60';

                  if (isFeedbackState) {
                    if (isCorrect) {
                      btnStyle = 'border-success-500 bg-success-50 dark:bg-success-950/60 text-success-900 dark:text-success-100 font-bold ring-2 ring-success-500/40';
                    } else if (isSelected && !lastAnswerWasCorrect) {
                      btnStyle = 'border-crimson-500 bg-crimson-50 dark:bg-crimson-950/60 text-crimson-900 dark:text-crimson-100 font-bold ring-2 ring-crimson-400/40';
                    } else {
                      btnStyle = 'opacity-40 border-slate-200 dark:border-navy-800 text-slate-400';
                    }
                  }

                  return (
                    <button
                      key={cat.key}
                      disabled={isFeedbackState}
                      onClick={() => handleAnswerSubmitted(cat.key)}
                      className={`min-h-[64px] px-5 py-4 rounded-xl border text-center font-bold text-sm sm:text-base transition-all shadow-xs active:scale-98 flex items-center justify-center gap-2 ${btnStyle}`}
                    >
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* TYPE 3: QUICK SLOT */}
          {currentQuestion.type === 'quick-slot' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-navy-700 bg-ice-100/50 dark:bg-navy-900/40 text-base sm:text-lg text-slate-800 dark:text-ice-300 flex flex-wrap items-center gap-2 leading-relaxed font-medium">
                <span>{currentQuestion.sentenceBefore}</span>
                <span className="font-mono px-3 py-1 rounded-lg border-2 border-dashed border-crimson-400 bg-crimson-50/40 dark:bg-crimson-950/40 text-crimson-700 dark:text-crimson-300 font-bold">
                  {selectedAnswer ? (selectedAnswer === '__TIMEOUT__' ? '[Tiempo]' : selectedAnswer) : '[ ? ]'}
                </span>
                <span>{currentQuestion.sentenceAfter}</span>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                {currentQuestion.options.map((opt) => {
                  const isCorrect = opt === currentQuestion.correctAnswer;
                  const isSelected = selectedAnswer === opt;

                  let btnStyle =
                    'border-slate-300 dark:border-navy-600 bg-white dark:bg-navy-900 text-slate-800 dark:text-ice-300 hover:border-crimson-500';

                  if (isFeedbackState) {
                    if (isCorrect) {
                      btnStyle = 'border-success-500 bg-success-50 dark:bg-success-950/60 text-success-900 dark:text-success-100 font-bold ring-2 ring-success-500/40';
                    } else if (isSelected && !lastAnswerWasCorrect) {
                      btnStyle = 'border-crimson-500 bg-crimson-50 dark:bg-crimson-950/60 text-crimson-900 dark:text-crimson-100 font-bold';
                    } else {
                      btnStyle = 'opacity-40 border-slate-200 dark:border-navy-800 text-slate-400';
                    }
                  }

                  return (
                    <button
                      key={opt}
                      disabled={isFeedbackState}
                      onClick={() => handleAnswerSubmitted(opt)}
                      className={`min-h-[48px] px-5 py-2.5 rounded-xl border font-bold text-sm transition-all shadow-xs active:scale-95 ${btnStyle}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* TYPE 4: CORRECT / INCORRECT */}
          {currentQuestion.type === 'correct-incorrect' && (
            <div className="space-y-5">
              <div className="p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-navy-700 bg-ice-100/50 dark:bg-navy-900/40 text-base sm:text-lg font-semibold text-navy-600 dark:text-ice-300 text-center leading-relaxed">
                "{currentQuestion.sentence}"
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {[
                  { val: 'true', label: 'Correcto (Bien estructurada)' },
                  { val: 'false', label: 'Incorrecto (Tiene error gramatical)' },
                ].map((item) => {
                  const isOptionCorrect = (item.val === 'true') === currentQuestion.isCorrect;
                  const isSelected = selectedAnswer === item.val;

                  let btnStyle =
                    'border-slate-300 dark:border-navy-600 bg-white dark:bg-navy-900 text-slate-800 dark:text-ice-300 hover:border-crimson-500';

                  if (isFeedbackState) {
                    if (isOptionCorrect) {
                      btnStyle = 'border-success-500 bg-success-50 dark:bg-success-950/60 text-success-900 dark:text-success-100 font-bold ring-2 ring-success-500/40';
                    } else if (isSelected && !lastAnswerWasCorrect) {
                      btnStyle = 'border-crimson-500 bg-crimson-50 dark:bg-crimson-950/60 text-crimson-900 dark:text-crimson-100 font-bold';
                    } else {
                      btnStyle = 'opacity-40 border-slate-200 dark:border-navy-800 text-slate-400';
                    }
                  }

                  return (
                    <button
                      key={item.val}
                      disabled={isFeedbackState}
                      onClick={() => handleAnswerSubmitted(item.val)}
                      className={`min-h-[58px] px-5 py-3 rounded-xl border text-center font-bold text-sm sm:text-base transition-all shadow-xs active:scale-98 ${btnStyle}`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* FEEDBACK BANNER (During 5 seconds) */}
        {isFeedbackState && (
          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-navy-700 space-y-3 animate-slide-fade">
            <div
              className={`p-4 rounded-xl border flex items-start gap-3 ${
                lastAnswerWasCorrect
                  ? 'bg-success-50 dark:bg-success-950/40 border-success-200 dark:border-success-800 text-success-900 dark:text-success-200'
                  : 'bg-crimson-50 dark:bg-crimson-950/40 border-crimson-200 dark:border-crimson-900 text-crimson-900 dark:text-crimson-200'
              }`}
            >
              {lastAnswerWasCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-success-600 dark:text-success-400 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-crimson-600 dark:text-crimson-400 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1 text-xs sm:text-sm">
                <p className="font-bold">
                  {lastAnswerWasCorrect
                    ? '¡Respuesta Correcta!'
                    : selectedAnswer === '__TIMEOUT__'
                    ? '¡Tiempo agotado!'
                    : 'Respuesta incorrecta'}
                </p>
                <p className="leading-relaxed opacity-90">{currentQuestion.explanation}</p>
              </div>
            </div>

            {/* Auto-advance progress + manual Skip button */}
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1">
              <span>Siguiente slide en {feedbackCountdown}s...</span>
              <button
                onClick={advanceToNextSlide}
                className="font-semibold text-crimson-600 dark:text-crimson-400 hover:underline flex items-center gap-1 min-h-[36px] px-2"
              >
                <span>Continuar ahora</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
