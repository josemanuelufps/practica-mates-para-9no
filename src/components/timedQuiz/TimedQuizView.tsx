import React, { useState, useEffect, useRef } from 'react';
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

// In-memory module cache so the 200 questions are only fetched once per browser session
let cachedQuizPool: TimedQuestion[] | null = null;

export const TimedQuizView: React.FC<TimedQuizViewProps> = ({ onBackToLanding }) => {
  // Game states: 'intro' | 'active' | 'feedback' | 'summary'
  const [gameState, setGameState] = useState<'intro' | 'active' | 'feedback' | 'summary'>('intro');

  // Question bank loaded dynamically from public/data/timedQuizBank.json
  const [quizPool, setQuizPool] = useState<TimedQuestion[]>(cachedQuizPool || []);
  const [isLoadingBank, setIsLoadingBank] = useState<boolean>(!cachedQuizPool);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [activeDeck, setActiveDeck] = useState<TimedQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [timeRemaining, setTimeRemaining] = useState<number>(TIME_LIMIT_PER_SLIDE);
  const [feedbackCountdown, setFeedbackCountdown] = useState<number>(FEEDBACK_DELAY_SECONDS);

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [lastAnswerWasCorrect, setLastAnswerWasCorrect] = useState<boolean>(false);
  const [results, setResults] = useState<TimedQuizAttemptResult[]>([]);

  // Minigame specific states (reset per question mount)
  // 1. Match Pairs
  const [shuffledLeft, setShuffledLeft] = useState<{ id: string; text: string }[]>([]);
  const [shuffledRight, setShuffledRight] = useState<{ id: string; text: string }[]>([]);
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [mismatchError, setMismatchError] = useState<boolean>(false);

  // 2. Sentence Builder
  const [builderAvailable, setBuilderAvailable] = useState<{ id: string; text: string }[]>([]);
  const [builderPlaced, setBuilderPlaced] = useState<{ id: string; text: string }[]>([]);

  // Timers refs
  const slideTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const feedbackTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Fetch JSON question bank on mount if not already cached
  const fetchQuestionBank = async () => {
    if (cachedQuizPool && cachedQuizPool.length > 0) {
      setQuizPool(cachedQuizPool);
      setIsLoadingBank(false);
      return;
    }

    try {
      setIsLoadingBank(true);
      setLoadError(null);
      const url = `${import.meta.env.BASE_URL}data/timedQuizBank.json`;
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }
      const data: TimedQuestion[] = await res.json();
      cachedQuizPool = data;
      setQuizPool(data);
    } catch (err) {
      console.error('Error cargando el banco de slides JSON:', err);
      setLoadError('No se pudo descargar el banco de slides. Por favor, revisa tu conexión y reintenta.');
    } finally {
      setIsLoadingBank(false);
    }
  };

  useEffect(() => {
    if (!cachedQuizPool || cachedQuizPool.length === 0) {
      fetchQuestionBank();
    }
  }, []);

  // Shuffle and pick 10 random questions from loaded pool
  const startNewQuiz = () => {
    if (quizPool.length === 0) return;
    const shuffled = [...quizPool].sort(() => 0.5 - Math.random());
    const selectedTen = shuffled.slice(0, TOTAL_QUESTIONS_PER_ROUND);

    setActiveDeck(selectedTen);
    setCurrentIndex(0);
    setResults([]);
    setSelectedAnswer(null);
    setTimeRemaining(TIME_LIMIT_PER_SLIDE);
    setGameState('active');
  };

  const currentQuestion = activeDeck[currentIndex];

  // Reset minigame states when new question mounts
  useEffect(() => {
    if (!currentQuestion) return;

    setSelectedLeft(null);
    setSelectedRight(null);
    setMatchedPairs([]);
    setMismatchError(false);

    if (currentQuestion.type === 'match-pairs') {
      const leftItems = currentQuestion.pairs.map((p) => ({ id: p.id, text: p.left }));
      const rightItems = currentQuestion.pairs.map((p) => ({ id: p.id, text: p.right }));
      setShuffledLeft([...leftItems].sort(() => 0.5 - Math.random()));
      setShuffledRight([...rightItems].sort(() => 0.5 - Math.random()));
    } else if (currentQuestion.type === 'sentence-builder') {
      setBuilderAvailable([...currentQuestion.tokens].sort(() => 0.5 - Math.random()));
      setBuilderPlaced([]);
    }
  }, [currentIndex, currentQuestion]);

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

  // Unified answer handler supporting all minigame types
  const handleAnswerSubmitted = (
    answer: string,
    explicitIsCorrect?: boolean,
    explicitCorrectAnswerStr?: string
  ) => {
    if (gameState !== 'active' || !currentQuestion) return;

    clearAllTimers();

    let isCorrect = false;
    let correctAnswerStr = '';

    if (explicitIsCorrect !== undefined) {
      isCorrect = explicitIsCorrect;
      correctAnswerStr = explicitCorrectAnswerStr || answer;
    } else if (currentQuestion.type === 'multiple-choice') {
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
    } else if (currentQuestion.type === 'timeline-sorter') {
      correctAnswerStr = currentQuestion.firstEvent === 'A' ? currentQuestion.eventA : currentQuestion.eventB;
      isCorrect = answer === currentQuestion.firstEvent;
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

  // Match Pairs handlers
  const handleSelectLeft = (id: string) => {
    if (gameState !== 'active' || matchedPairs.includes(id) || mismatchError) return;

    if (selectedLeft === id) {
      setSelectedLeft(null);
      return;
    }

    setSelectedLeft(id);

    if (selectedRight) {
      if (id === selectedRight) {
        const newMatched = [...matchedPairs, id];
        setMatchedPairs(newMatched);
        setSelectedLeft(null);
        setSelectedRight(null);

        if (currentQuestion && currentQuestion.type === 'match-pairs' && newMatched.length === currentQuestion.pairs.length) {
          handleAnswerSubmitted('3 de 3 parejas conectadas', true, 'Todas las parejas conectadas correctamente');
        }
      } else {
        setMismatchError(true);
        setTimeout(() => {
          setSelectedLeft(null);
          setSelectedRight(null);
          setMismatchError(false);
        }, 500);
      }
    }
  };

  const handleSelectRight = (id: string) => {
    if (gameState !== 'active' || matchedPairs.includes(id) || mismatchError) return;

    if (selectedRight === id) {
      setSelectedRight(null);
      return;
    }

    setSelectedRight(id);

    if (selectedLeft) {
      if (selectedLeft === id) {
        const newMatched = [...matchedPairs, id];
        setMatchedPairs(newMatched);
        setSelectedLeft(null);
        setSelectedRight(null);

        if (currentQuestion && currentQuestion.type === 'match-pairs' && newMatched.length === currentQuestion.pairs.length) {
          handleAnswerSubmitted('3 de 3 parejas conectadas', true, 'Todas las parejas conectadas correctamente');
        }
      } else {
        setMismatchError(true);
        setTimeout(() => {
          setSelectedLeft(null);
          setSelectedRight(null);
          setMismatchError(false);
        }, 500);
      }
    }
  };

  // Sentence Builder handlers
  const handlePlaceToken = (token: { id: string; text: string }) => {
    if (gameState !== 'active' || currentQuestion?.type !== 'sentence-builder') return;

    const newAvailable = builderAvailable.filter((t) => t.id !== token.id);
    const newPlaced = [...builderPlaced, token];

    setBuilderAvailable(newAvailable);
    setBuilderPlaced(newPlaced);

    if (newPlaced.length === currentQuestion.tokens.length) {
      const isCorrect = newPlaced.map((t) => t.id).join(',') === currentQuestion.correctSequence.join(',');
      const fullPlacedSentence = newPlaced.map((t) => t.text).join(' ');
      handleAnswerSubmitted(fullPlacedSentence, isCorrect, currentQuestion.fullSentence);
    }
  };

  const handleReturnToken = (token: { id: string; text: string }) => {
    if (gameState !== 'active') return;

    const newPlaced = builderPlaced.filter((t) => t.id !== token.id);
    const newAvailable = [...builderAvailable, token];

    setBuilderPlaced(newPlaced);
    setBuilderAvailable(newAvailable);
  };

  // Bug Hunter handlers
  const handleSelectBugSegment = (segmentId: string) => {
    if (gameState !== 'active' || currentQuestion?.type !== 'bug-hunter') return;

    const segment = currentQuestion.segments.find((s) => s.id === segmentId);
    if (!segment) return;

    const isCorrect = segment.isError;
    const errorSegment = currentQuestion.segments.find((s) => s.isError);
    const correctStr = currentQuestion.hasNoError
      ? 'Sin error gramatical'
      : errorSegment
      ? `Error en "${errorSegment.text}" → Corregido: ${errorSegment.correction || errorSegment.text}`
      : 'Error identificado';

    handleAnswerSubmitted(segment.text, isCorrect, correctStr);
  };

  const handleSelectBugNoError = () => {
    if (gameState !== 'active' || currentQuestion?.type !== 'bug-hunter') return;

    const isCorrect = currentQuestion.hasNoError;
    const errorSegment = currentQuestion.segments.find((s) => s.isError);
    const correctStr = currentQuestion.hasNoError
      ? 'Sin error gramatical'
      : errorSegment
      ? `Error en "${errorSegment.text}" → Corregido: ${errorSegment.correction || errorSegment.text}`
      : 'Tiene un error gramatical';

    handleAnswerSubmitted('Sin error gramatical', isCorrect, correctStr);
  };

  // Timeline Sorter handler
  const handleSelectTimelineEvent = (choice: 'A' | 'B') => {
    if (gameState !== 'active' || currentQuestion?.type !== 'timeline-sorter') return;

    const isCorrect = choice === currentQuestion.firstEvent;
    const userChoiceText = choice === 'A' ? currentQuestion.eventA : currentQuestion.eventB;
    const correctChoiceText = currentQuestion.firstEvent === 'A' ? currentQuestion.eventA : currentQuestion.eventB;

    handleAnswerSubmitted(userChoiceText, isCorrect, `Ocurrió 1º: ${correctChoiceText}`);
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
  // RENDER: LOADING & ERROR STATES FOR DYNAMIC QUESTION BANK
  // =========================================================================
  if (isLoadingBank) {
    return (
      <div className="space-y-8 animate-slide-fade max-w-3xl mx-auto">
        <button
          onClick={onBackToLanding}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-600 hover:text-navy-600 dark:text-slate-400 dark:hover:text-ice-300 transition-colors py-1.5 px-2 -ml-2 rounded-lg hover:bg-ice-200 dark:hover:bg-navy-800"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Inicio</span>
        </button>

        <div className="border border-slate-200 dark:border-navy-700 rounded-2xl p-9 bg-white dark:bg-navy-800 shadow-subtle dark:shadow-subtle-dark text-center space-y-4">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-crimson-50 dark:bg-crimson-900/40 text-crimson-600 dark:text-crimson-400 animate-spin">
            <RotateCcw className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-navy-600 dark:text-ice-300">
            Cargando banco de preguntas...
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-prose mx-auto">
            Descargando las 200 slides interactivas desde el archivo de datos JSON independiente (timedQuizBank.json).
          </p>
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="space-y-8 animate-slide-fade max-w-3xl mx-auto">
        <button
          onClick={onBackToLanding}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-600 hover:text-navy-600 dark:text-slate-400 dark:hover:text-ice-300 transition-colors py-1.5 px-2 -ml-2 rounded-lg hover:bg-ice-200 dark:hover:bg-navy-800"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Inicio</span>
        </button>

        <div className="border border-crimson-200 dark:border-crimson-900/60 rounded-2xl p-8 bg-white dark:bg-navy-800 shadow-subtle dark:shadow-subtle-dark text-center space-y-4">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-crimson-50 dark:bg-crimson-900/40 text-crimson-600 dark:text-crimson-400">
            <XCircle className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-navy-600 dark:text-ice-300">
            Error al cargar el banco de preguntas
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 max-w-prose mx-auto">
            {loadError}
          </p>
          <button
            onClick={fetchQuestionBank}
            className="min-h-[44px] px-5 py-2.5 rounded-xl bg-crimson-600 text-white font-bold text-xs hover:bg-crimson-500 transition-all inline-flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reintentar descarga</span>
          </button>
        </div>
      </div>
    );
  }

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
            Cada ronda toma 10 preguntas aleatorias de nuestro banco de 200 ejercicios con 8 mecánicas dinámicas (Opción múltiple, Clasificación rápida, Match Pairs, Sentence Builder, Bug Hunter, Timeline Sorter y más).
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
                Seleccionadas al azar del pool de 200 slides.
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
                  <p className="text-slate-600 dark:text-slate-400 italic text-xs pt-1">
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

          {/* TYPE 5: MATCH PAIRS */}
          {currentQuestion.type === 'match-pairs' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400 pb-1">
                <span>Conecta cada cláusula izquierda con su resultado derecho:</span>
                <span className="font-mono font-bold text-crimson-600 dark:text-crimson-400">
                  {matchedPairs.length} / {currentQuestion.pairs.length} parejas
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Left Column */}
                <div className="space-y-2.5">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-1">
                    Condición / Antecedente
                  </div>
                  {shuffledLeft.map((item) => {
                    const isMatched = matchedPairs.includes(item.id);
                    const isSelected = selectedLeft === item.id;

                    let cardStyle =
                      'border-slate-300 dark:border-navy-600 bg-white dark:bg-navy-900 text-slate-800 dark:text-ice-300 hover:border-crimson-400';

                    if (isMatched) {
                      cardStyle =
                        'border-success-500 bg-success-50 dark:bg-success-950/60 text-success-900 dark:text-success-100 font-bold opacity-90';
                    } else if (isSelected) {
                      cardStyle = mismatchError
                        ? 'border-crimson-500 bg-crimson-100 dark:bg-crimson-950/80 text-crimson-900 dark:text-crimson-100 ring-2 ring-crimson-500'
                        : 'border-crimson-500 bg-crimson-50 dark:bg-crimson-950/50 text-crimson-900 dark:text-crimson-200 ring-2 ring-crimson-400 font-semibold';
                    }

                    return (
                      <button
                        key={item.id}
                        disabled={isMatched || isFeedbackState}
                        onClick={() => handleSelectLeft(item.id)}
                        className={`w-full min-h-[54px] p-3 rounded-xl border text-left text-xs sm:text-sm transition-all shadow-2xs active:scale-98 flex items-center justify-between gap-2 ${cardStyle}`}
                      >
                        <span>{item.text}</span>
                        {isMatched && (
                          <CheckCircle2 className="w-4 h-4 text-success-600 dark:text-success-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Right Column */}
                <div className="space-y-2.5">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-1">
                    Resultado / Consecuencia
                  </div>
                  {shuffledRight.map((item) => {
                    const isMatched = matchedPairs.includes(item.id);
                    const isSelected = selectedRight === item.id;

                    let cardStyle =
                      'border-slate-300 dark:border-navy-600 bg-white dark:bg-navy-900 text-slate-800 dark:text-ice-300 hover:border-crimson-400';

                    if (isMatched) {
                      cardStyle =
                        'border-success-500 bg-success-50 dark:bg-success-950/60 text-success-900 dark:text-success-100 font-bold opacity-90';
                    } else if (isSelected) {
                      cardStyle = mismatchError
                        ? 'border-crimson-500 bg-crimson-100 dark:bg-crimson-950/80 text-crimson-900 dark:text-crimson-100 ring-2 ring-crimson-500'
                        : 'border-crimson-500 bg-crimson-50 dark:bg-crimson-950/50 text-crimson-900 dark:text-crimson-200 ring-2 ring-crimson-400 font-semibold';
                    }

                    return (
                      <button
                        key={item.id}
                        disabled={isMatched || isFeedbackState}
                        onClick={() => handleSelectRight(item.id)}
                        className={`w-full min-h-[54px] p-3 rounded-xl border text-left text-xs sm:text-sm transition-all shadow-2xs active:scale-98 flex items-center justify-between gap-2 ${cardStyle}`}
                      >
                        <span>{item.text}</span>
                        {isMatched && (
                          <CheckCircle2 className="w-4 h-4 text-success-600 dark:text-success-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TYPE 6: SENTENCE BUILDER */}
          {currentQuestion.type === 'sentence-builder' && (
            <div className="space-y-5">
              {/* Dropzone container */}
              <div className="p-4 sm:p-5 rounded-xl border-2 border-dashed border-slate-300 dark:border-navy-600 bg-ice-100/40 dark:bg-navy-900/40 min-h-[90px] flex flex-wrap items-center gap-2">
                {builderPlaced.length === 0 ? (
                  <span className="text-xs sm:text-sm text-slate-400 dark:text-slate-500 italic">
                    Toca los bloques de abajo en orden sintáctico para construir la oración...
                  </span>
                ) : (
                  builderPlaced.map((token) => (
                    <button
                      key={token.id}
                      disabled={isFeedbackState}
                      onClick={() => handleReturnToken(token)}
                      className="px-3.5 py-2 rounded-lg bg-navy-600 hover:bg-navy-700 text-white dark:bg-ice-200 dark:text-navy-900 dark:hover:bg-ice-300 font-semibold text-xs sm:text-sm shadow-xs transition-all active:scale-95 flex items-center gap-1.5"
                      title="Toca para devolver al banco de palabras"
                    >
                      <span>{token.text}</span>
                      <span className="text-xs opacity-60">✕</span>
                    </button>
                  ))
                )}
              </div>

              {/* Token bank */}
              <div className="space-y-2 pt-1">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Bloques disponibles:
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {builderAvailable.map((token) => (
                    <button
                      key={token.id}
                      disabled={isFeedbackState}
                      onClick={() => handlePlaceToken(token)}
                      className="min-h-[44px] px-4 py-2.5 rounded-xl border border-slate-300 dark:border-navy-600 bg-white dark:bg-navy-900 text-slate-800 dark:text-ice-300 font-medium text-xs sm:text-sm hover:border-crimson-500 hover:bg-crimson-50/20 active:scale-95 transition-all shadow-xs"
                    >
                      {token.text}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TYPE 7: BUG HUNTER */}
          {currentQuestion.type === 'bug-hunter' && (
            <div className="space-y-5">
              {/* Segmented sentence banner */}
              <div className="p-5 rounded-xl border border-slate-200 dark:border-navy-700 bg-ice-100/50 dark:bg-navy-900/40">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
                  Toca el fragmento que contenga un error:
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {currentQuestion.segments.map((segment) => {
                    const isSelected = selectedAnswer === segment.text;
                    const isThisTheError = segment.isError;

                    let segStyle =
                      'border-slate-300 dark:border-navy-600 bg-white dark:bg-navy-900 text-slate-800 dark:text-ice-300 hover:border-crimson-500 hover:bg-crimson-50/20';

                    if (isFeedbackState) {
                      if (isThisTheError) {
                        segStyle =
                          'border-success-500 bg-success-50 dark:bg-success-950/60 text-success-900 dark:text-success-100 font-bold ring-2 ring-success-500/40';
                      } else if (isSelected && !lastAnswerWasCorrect) {
                        segStyle =
                          'border-crimson-500 bg-crimson-50 dark:bg-crimson-950/60 text-crimson-900 dark:text-crimson-100 font-bold ring-2 ring-crimson-400/40';
                      } else {
                        segStyle = 'opacity-40 border-slate-200 dark:border-navy-800 text-slate-400';
                      }
                    }

                    return (
                      <button
                        key={segment.id}
                        disabled={isFeedbackState}
                        onClick={() => handleSelectBugSegment(segment.id)}
                        className={`min-h-[46px] px-4 py-2 rounded-xl border font-semibold text-sm sm:text-base transition-all shadow-xs active:scale-95 flex items-center gap-2 ${segStyle}`}
                      >
                        <span>{segment.text}</span>
                        {isFeedbackState && isThisTheError && (
                          <CheckCircle2 className="w-4 h-4 text-success-600 dark:text-success-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Alternative: Sin error button */}
              <div className="pt-2">
                {(() => {
                  const isSelected = selectedAnswer === 'Sin error gramatical';
                  const isCorrectNoError = currentQuestion.hasNoError;

                  let btnStyle =
                    'border-slate-300 dark:border-navy-600 bg-white dark:bg-navy-900 text-slate-700 dark:text-slate-300 hover:border-crimson-500';

                  if (isFeedbackState) {
                    if (isCorrectNoError) {
                      btnStyle =
                        'border-success-500 bg-success-50 dark:bg-success-950/60 text-success-900 dark:text-success-100 font-bold ring-2 ring-success-500/40';
                    } else if (isSelected && !lastAnswerWasCorrect) {
                      btnStyle =
                        'border-crimson-500 bg-crimson-50 dark:bg-crimson-950/60 text-crimson-900 dark:text-crimson-100 font-bold ring-2 ring-crimson-400/40';
                    } else {
                      btnStyle = 'opacity-40 border-slate-200 dark:border-navy-800 text-slate-400';
                    }
                  }

                  return (
                    <button
                      disabled={isFeedbackState}
                      onClick={handleSelectBugNoError}
                      className={`w-full min-h-[48px] px-5 py-3 rounded-xl border font-bold text-xs sm:text-sm transition-all shadow-xs active:scale-98 flex items-center justify-center gap-2 ${btnStyle}`}
                    >
                      <span>✓ La oración es correcta (Sin error gramatical)</span>
                    </button>
                  );
                })()}
              </div>
            </div>
          )}

          {/* TYPE 8: TIMELINE SORTER */}
          {currentQuestion.type === 'timeline-sorter' && (
            <div className="space-y-5">
              {/* Sentence Context */}
              <div className="p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-navy-700 bg-ice-100/50 dark:bg-navy-900/40 text-base sm:text-lg font-semibold text-navy-600 dark:text-ice-300 text-center leading-relaxed">
                "{currentQuestion.sentenceContext}"
              </div>

              {/* Two large cards: Event A vs Event B */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {[
                  { choice: 'A' as const, text: currentQuestion.eventA, label: 'Acción A' },
                  { choice: 'B' as const, text: currentQuestion.eventB, label: 'Acción B' },
                ].map((evt) => {
                  const isCorrect = currentQuestion.firstEvent === evt.choice;
                  const isSelected = selectedAnswer === evt.text;

                  let cardStyle =
                    'border-slate-300 dark:border-navy-600 bg-white dark:bg-navy-900 text-slate-800 dark:text-ice-300 hover:border-crimson-500 hover:bg-crimson-50/20';

                  if (isFeedbackState) {
                    if (isCorrect) {
                      cardStyle =
                        'border-success-500 bg-success-50 dark:bg-success-950/60 text-success-900 dark:text-success-100 font-bold ring-2 ring-success-500/40';
                    } else if (isSelected && !lastAnswerWasCorrect) {
                      cardStyle =
                        'border-crimson-500 bg-crimson-50 dark:bg-crimson-950/60 text-crimson-900 dark:text-crimson-100 font-bold ring-2 ring-crimson-400/40';
                    } else {
                      cardStyle = 'opacity-40 border-slate-200 dark:border-navy-800 text-slate-400';
                    }
                  }

                  return (
                    <button
                      key={evt.choice}
                      disabled={isFeedbackState}
                      onClick={() => handleSelectTimelineEvent(evt.choice)}
                      className={`min-h-[72px] p-4 rounded-xl border text-left transition-all shadow-xs active:scale-98 flex flex-col justify-between gap-2 ${cardStyle}`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                          {evt.label}
                        </span>
                        {isFeedbackState && isCorrect && (
                          <span className="text-xs font-bold text-success-600 dark:text-success-400 inline-flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Ocurrió Primero
                          </span>
                        )}
                      </div>
                      <div className="font-semibold text-sm sm:text-base leading-snug">
                        {evt.text}
                      </div>
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
