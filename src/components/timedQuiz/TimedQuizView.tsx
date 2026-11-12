import React, { useState, useEffect, useRef } from 'react';
import { TimedQuestion, TimedQuizAttemptResult, TimedTopicCategory } from '../../types/timedQuiz';
import { fireMasteryCelebration, fireCorrectAnswerConfetti } from '../../utils/confetti';
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
  Award,
  SlidersHorizontal,
  X,
  Calculator,
  BarChart3,
  BookOpen,
  AlertCircle
} from 'lucide-react';

interface TimedQuizViewProps {
  onBackToLanding: () => void;
}

const DEFAULT_QUESTIONS_COUNT = 10;
const DEFAULT_TIME_PER_QUESTION = 20;
const FEEDBACK_DELAY_SECONDS = 5; // 5 seconds review

// In-memory module cache so the 200 questions are only fetched once per browser session
let cachedQuizPool: TimedQuestion[] | null = null;

// True Fisher-Yates uniform shuffle algorithm
function fisherYatesShuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Guarantee sentence tokens are strictly non-trivial and never in solved sequence on mount
function shuffleSentenceTokens(
  tokens: { id: string; text: string }[],
  correctSequence: string[]
): { id: string; text: string }[] {
  let shuffled = fisherYatesShuffle(tokens);
  let attempts = 0;
  while (
    attempts < 10 &&
    shuffled.map((t) => t.id).join(',') === correctSequence.join(',')
  ) {
    shuffled = fisherYatesShuffle(tokens);
    attempts++;
  }
  if (shuffled.length > 1 && shuffled.map((t) => t.id).join(',') === correctSequence.join(',')) {
    [shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]];
  }
  return shuffled;
}

export const TimedQuizView: React.FC<TimedQuizViewProps> = ({ onBackToLanding }) => {
  // Game states: 'intro' | 'active' | 'feedback' | 'summary'
  const [gameState, setGameState] = useState<'intro' | 'active' | 'feedback' | 'summary'>('intro');

  // Question bank loaded dynamically from public/data/timedQuizBank.json
  const [quizPool, setQuizPool] = useState<TimedQuestion[]>(cachedQuizPool || []);
  const [isLoadingBank, setIsLoadingBank] = useState<boolean>(!cachedQuizPool);
  const [loadError, setLoadError] = useState<string | null>(null);

  // User custom parameters for round
  const [selectedSubject, setSelectedSubject] = useState<'ingles' | 'matematicas' | 'geoestadistica'>('ingles');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerSubjectToast = (subjectName: string) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToastMessage(`El banco de preguntas para ${subjectName} se encuentra en preparación pedagógica. Por ahora puedes practicar con el banco de Inglés.`);
    toastTimerRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const [timePerQuestion, setTimePerQuestion] = useState<number>(DEFAULT_TIME_PER_QUESTION);
  const [questionsCount, setQuestionsCount] = useState<number>(DEFAULT_QUESTIONS_COUNT);

  const [activeDeck, setActiveDeck] = useState<TimedQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [timeRemaining, setTimeRemaining] = useState<number>(DEFAULT_TIME_PER_QUESTION);
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

  // 3. Dynamic options shuffle for multiple-choice & quick-slot (never predictable order)
  const [shuffledMCOptions, setShuffledMCOptions] = useState<string[]>([]);
  const [shuffledQuickSlotOptions, setShuffledQuickSlotOptions] = useState<string[]>([]);

  // Winning streak of consecutive correct answers in active round
  const [streak, setStreak] = useState<number>(0);

  // Timers refs
  const slideTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const feedbackTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Helper: Sentence-builder gets +5 bonus seconds to allow cognitive reading before syntax arrangement
  const getQuestionTimeLimit = (question?: TimedQuestion) => {
    if (!question) return timePerQuestion;
    return timePerQuestion + (question.type === 'sentence-builder' ? 5 : 0);
  };

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

  // Shuffle and pick questions from loaded pool based on user options
  const startNewQuiz = () => {
    if (quizPool.length === 0) return;
    const shuffled = fisherYatesShuffle(quizPool);
    const selected = shuffled.slice(0, questionsCount);

    setActiveDeck(selected);
    setCurrentIndex(0);
    setResults([]);
    setSelectedAnswer(null);
    setStreak(0);
    setTimeRemaining(getQuestionTimeLimit(selected[0]));
    setGameState('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExitQuiz = () => {
    if (window.confirm('¿Deseas salir de la ronda actual y volver a las opciones?')) {
      clearAllTimers();
      setStreak(0);
      setGameState('intro');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleGoToQuizConfig = () => {
    clearAllTimers();
    setStreak(0);
    setGameState('intro');
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      setShuffledLeft(fisherYatesShuffle(leftItems));
      setShuffledRight(fisherYatesShuffle(rightItems));
    } else if (currentQuestion.type === 'sentence-builder') {
      setBuilderAvailable(
        shuffleSentenceTokens(currentQuestion.tokens, currentQuestion.correctSequence)
      );
      setBuilderPlaced([]);
    } else if (currentQuestion.type === 'multiple-choice') {
      setShuffledMCOptions(fisherYatesShuffle(currentQuestion.options));
    } else if (currentQuestion.type === 'quick-slot') {
      setShuffledQuickSlotOptions(fisherYatesShuffle(currentQuestion.options));
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
    if (gameState !== 'active' || !currentQuestion) return;

    const currentSlideTimeLimit = getQuestionTimeLimit(currentQuestion);
    setTimeRemaining(currentSlideTimeLimit);

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
  }, [gameState, currentIndex, timePerQuestion, currentQuestion]);

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

    const currentSlideTimeLimit = getQuestionTimeLimit(currentQuestion);
    const timeSpent = currentSlideTimeLimit - timeRemaining;

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

    if (isCorrect) {
      setStreak((prev) => {
        const nextStreak = prev + 1;
        fireCorrectAnswerConfetti(nextStreak >= 3);
        return nextStreak;
      });
    } else {
      setStreak(0);
    }

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

    if (currentIndex + 1 < activeDeck.length) {
      setCurrentIndex((prev) => prev + 1);
      setGameState('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Quiz Finished
      setGameState('summary');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const allResults = results; // latest added
      const totalCorrect = allResults.filter((r) => r.isCorrect).length;
      if (totalCorrect === activeDeck.length && activeDeck.length > 0) {
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
            Descargando las {quizPool.length || 280} slides interactivas desde el archivo de datos JSON independiente (timedQuizBank.json).
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
            Quices Contrarreloj
          </h1>

          <p className="mt-3 text-sm text-slate-700 dark:text-slate-400 leading-relaxed max-w-prose">
            Pon a prueba tu agilidad mental y dominio de los temas de inglés con 8 mecánicas dinámicas (Opción múltiple, Clasificación rápida, Match Pairs, Sentence Builder, Bug Hunter, Timeline Sorter y más).
          </p>

          {/* Live Overview Cards */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl border border-slate-200 dark:border-navy-700 bg-ice-100/60 dark:bg-navy-900/50">
              <Clock className="w-4 h-4 text-crimson-600 dark:text-crimson-400 mb-1.5" />
              <div className="font-bold text-sm text-navy-600 dark:text-ice-300">{timePerQuestion} Segundos</div>
              <div className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                Tiempo límite por slide (+5s en construcción de oraciones).
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-navy-700 bg-ice-100/60 dark:bg-navy-900/50">
              <Sparkles className="w-4 h-4 text-crimson-600 dark:text-crimson-400 mb-1.5" />
              <div className="font-bold text-sm text-navy-600 dark:text-ice-300">{questionsCount} Preguntas</div>
              <div className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                Seleccionadas al azar del pool de {quizPool.length || 280} slides.
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

          {/* Options / Customization Card */}
          <div className="mt-6 border border-slate-200 dark:border-navy-700 rounded-2xl p-5 bg-ice-100/40 dark:bg-navy-900/40 space-y-5">
            <div className="flex items-center justify-between gap-2 border-b border-slate-200 dark:border-navy-700/80 pb-3">
              <div className="flex items-center gap-2 text-navy-600 dark:text-ice-300 font-bold text-sm">
                <SlidersHorizontal className="w-4 h-4 text-crimson-600 dark:text-crimson-400" />
                <span>Configuración de la Ronda</span>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Ajusta la materia y la dificultad
              </span>
            </div>

            {/* Subject Selector */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Materia del Quiz:
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Banco activo: Inglés
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {/* Inglés */}
                <button
                  type="button"
                  onClick={() => setSelectedSubject('ingles')}
                  aria-pressed={selectedSubject === 'ingles'}
                  className={`p-3 rounded-xl border text-left transition-all active:scale-98 focus-visible:ring-2 focus-visible:ring-crimson-500 focus-visible:outline-hidden ${
                    selectedSubject === 'ingles'
                      ? 'border-sky-500 bg-sky-50/80 dark:bg-sky-950/50 ring-2 ring-sky-400/50 shadow-xs'
                      : 'border-slate-300 dark:border-navy-700 bg-white dark:bg-navy-900 hover:border-sky-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5 font-bold text-xs text-navy-600 dark:text-ice-300">
                      <BookOpen className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                      <span>Inglés Gramatical</span>
                    </div>
                    <span className="text-xs font-bold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300">
                      Disponible
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    281 preguntas • Past Perfect y Condicionales
                  </div>
                </button>

                {/* Matemáticas */}
                <button
                  type="button"
                  onClick={() => triggerSubjectToast('Matemáticas')}
                  aria-label="Matemáticas (En preparación pedagógica)"
                  className="p-3 rounded-xl border border-slate-300 dark:border-navy-700 bg-white/70 dark:bg-navy-900/60 hover:border-amber-400 dark:hover:border-amber-600 text-left transition-all active:scale-98 relative group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5 font-bold text-xs text-slate-700 dark:text-slate-300 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      <Calculator className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>Matemáticas</span>
                    </div>
                    <span className="text-xs font-bold px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300">
                      En preparación
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Radicales, Sistemas 2x2, Funciones
                  </div>
                </button>

                {/* Geoestadística */}
                <button
                  type="button"
                  onClick={() => triggerSubjectToast('Geoestadística')}
                  aria-label="Geoestadística (En preparación pedagógica)"
                  className="p-3 rounded-xl border border-slate-300 dark:border-navy-700 bg-white/70 dark:bg-navy-900/60 hover:border-amber-400 dark:hover:border-amber-600 text-left transition-all active:scale-98 relative group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5 font-bold text-xs text-slate-700 dark:text-slate-300 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      <BarChart3 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>Geoestadística</span>
                    </div>
                    <span className="text-xs font-bold px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300">
                      En preparación
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Dispersión, Probabilidad, Cuerpos
                  </div>
                </button>
              </div>
            </div>

            {/* Quick Difficulty Presets */}
            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Modos predeterminados:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { label: 'Fácil / Guiado', desc: '25s • 8 preguntas', time: 25, count: 8 },
                  { label: 'Estándar', desc: '20s • 10 preguntas', time: 20, count: 10 },
                  { label: 'Desafío Rápido', desc: '15s • 15 preguntas', time: 15, count: 15 },
                ].map((preset) => {
                  const isActive = timePerQuestion === preset.time && questionsCount === preset.count;
                  return (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => {
                        setTimePerQuestion(preset.time);
                        setQuestionsCount(preset.count);
                      }}
                      aria-pressed={isActive}
                      aria-label={`Modo ${preset.label}: ${preset.desc}`}
                      className={`p-3 rounded-xl border text-left transition-all active:scale-98 focus-visible:ring-2 focus-visible:ring-crimson-500 focus-visible:outline-hidden ${
                        isActive
                          ? 'border-crimson-500 bg-crimson-50 dark:bg-crimson-950/60 ring-2 ring-crimson-400/50 shadow-xs'
                          : 'border-slate-300 dark:border-navy-700 bg-white dark:bg-navy-900 hover:border-crimson-300'
                      }`}
                    >
                      <div className={`text-xs font-bold ${isActive ? 'text-crimson-700 dark:text-crimson-300' : 'text-navy-600 dark:text-ice-300'}`}>
                        {preset.label}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {preset.desc}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Granular Adjustments */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 border-t border-slate-200/80 dark:border-navy-700/60">
              {/* Time per slide */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-crimson-600 dark:text-crimson-400" />
                    <span>Tiempo por pregunta:</span>
                  </span>
                  <span className="font-mono font-bold text-crimson-600 dark:text-crimson-400">
                    {timePerQuestion}s
                  </span>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {[10, 15, 20, 25, 30].map((sec) => (
                    <button
                      key={sec}
                      type="button"
                      onClick={() => setTimePerQuestion(sec)}
                      aria-pressed={timePerQuestion === sec}
                      aria-label={`${sec} segundos por pregunta`}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all min-h-[36px] focus-visible:ring-2 focus-visible:ring-crimson-500 focus-visible:outline-hidden ${
                        timePerQuestion === sec
                          ? 'bg-crimson-600 text-white shadow-2xs'
                          : 'border border-slate-300 dark:border-navy-700 bg-white dark:bg-navy-900 text-slate-700 dark:text-slate-300 hover:border-crimson-400'
                      }`}
                    >
                      {sec}s
                    </button>
                  ))}
                </div>
              </div>

              {/* Questions count */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-crimson-600 dark:text-crimson-400" />
                    <span>Cantidad de preguntas:</span>
                  </span>
                  <span className="font-mono font-bold text-crimson-600 dark:text-crimson-400">
                    {questionsCount} preguntas
                  </span>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {[5, 8, 10, 15, 20].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setQuestionsCount(num)}
                      aria-pressed={questionsCount === num}
                      aria-label={`${num} preguntas en la ronda`}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all min-h-[36px] focus-visible:ring-2 focus-visible:ring-crimson-500 focus-visible:outline-hidden ${
                        questionsCount === num
                          ? 'bg-crimson-600 text-white shadow-2xs'
                          : 'border border-slate-300 dark:border-navy-700 bg-white dark:bg-navy-900 text-slate-700 dark:text-slate-300 hover:border-crimson-400'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={startNewQuiz}
              className="min-h-[48px] px-6 py-3 rounded-xl bg-crimson-600 hover:bg-crimson-500 text-white dark:bg-crimson-500 dark:hover:bg-crimson-400 font-bold text-sm flex items-center gap-2 shadow-xs transition-all active:scale-95"
            >
              <Zap className="w-4 h-4" />
              <span>Empezar Quiz de Inglés ({timePerQuestion}s • {questionsCount} Preguntas)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <span className="text-xs text-slate-500 dark:text-slate-400">
              Intentos ilimitados • Práctica 100% libre
            </span>
          </div>

          {/* Floating Sonner/Toast for in-progress subject notice */}
          {toastMessage && (
            <div
              role="alert"
              aria-live="polite"
              className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 max-w-sm w-full p-4 rounded-xl border border-amber-300 dark:border-amber-700 bg-white dark:bg-navy-900 text-slate-800 dark:text-slate-100 shadow-xl flex items-start gap-3 animate-slide-fade"
            >
              <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div className="flex-1 text-xs sm:text-sm leading-snug">
                {toastMessage}
              </div>
              <button
                type="button"
                onClick={() => setToastMessage(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 -mr-1 -mt-1 rounded-md"
                aria-label="Cerrar notificación"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // =========================================================================
  // RENDER: SUMMARY VIEW (Results after completing round)
  // =========================================================================
  if (gameState === 'summary') {
    const totalRounds = activeDeck.length || results.length || questionsCount;
    const totalCorrect = results.filter((r) => r.isCorrect).length;
    const totalFailed = totalRounds - totalCorrect;
    const percentage = totalRounds > 0 ? Math.round((totalCorrect / totalRounds) * 100) : 0;

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
            {totalCorrect === totalRounds
              ? `¡Desempeño Impecable! ${totalCorrect} de ${totalRounds}`
              : totalCorrect >= Math.ceil(totalRounds * 0.7)
              ? '¡Excelente Trabajo de Velocidad!'
              : totalCorrect >= Math.ceil(totalRounds * 0.5)
              ? 'Buen Intento • Sigue Afianzando'
              : 'Buen Entrenamiento • Repasemos las Claves'}
          </h2>

          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-prose mx-auto">
            Completaste las {totalRounds} preguntas contrarreloj ({timePerQuestion}s por slide). A continuación tienes tu resumen y desglose:
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
              <span>Jugar otra ronda ({questionsCount} Preguntas • {timePerQuestion}s)</span>
            </button>

            <button
              onClick={handleGoToQuizConfig}
              className="min-h-[48px] px-5 py-3 rounded-xl bg-navy-600 hover:bg-navy-700 text-white dark:bg-navy-700 dark:hover:bg-navy-600 dark:text-ice-300 font-bold text-sm flex items-center gap-2 shadow-xs transition-all active:scale-95"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Configurar nuevo quiz</span>
            </button>

            <button
              onClick={onBackToLanding}
              className="min-h-[48px] px-5 py-3 rounded-xl border border-slate-300 dark:border-navy-700 hover:bg-ice-200 dark:hover:bg-navy-700 text-slate-700 dark:text-slate-300 font-semibold text-sm transition-colors flex items-center gap-1.5 active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver al Inicio</span>
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

        {/* Bottom Actions after review list */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={startNewQuiz}
            className="min-h-[44px] px-5 py-2.5 rounded-xl bg-crimson-600 hover:bg-crimson-500 text-white dark:bg-crimson-500 dark:hover:bg-crimson-400 font-bold text-sm flex items-center gap-2 shadow-xs transition-all active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Jugar otra ronda</span>
          </button>

          <button
            onClick={handleGoToQuizConfig}
            className="min-h-[44px] px-5 py-2.5 rounded-xl bg-navy-600 hover:bg-navy-700 text-white dark:bg-navy-700 dark:hover:bg-navy-600 dark:text-ice-300 font-bold text-sm flex items-center gap-2 shadow-xs transition-all active:scale-95"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Configurar nuevo quiz</span>
          </button>

          <button
            onClick={onBackToLanding}
            className="min-h-[44px] px-4 py-2.5 rounded-xl border border-slate-300 dark:border-navy-700 hover:bg-ice-200 dark:hover:bg-navy-700 text-slate-700 dark:text-slate-300 font-semibold text-sm transition-colors flex items-center gap-1.5 active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al Inicio</span>
          </button>
        </div>
      </div>
    );
  }

  // =========================================================================
  // RENDER: ACTIVE / FEEDBACK SLIDE
  // =========================================================================
  const currentSlideTimeLimit = getQuestionTimeLimit(currentQuestion);
  const isTimeCritical = timeRemaining <= 5;
  const isFeedbackState = gameState === 'feedback';

  return (
    <div className="animate-slide-fade">
      {/* Sticky Docked Bar under Navbar */}
      <div className="sticky top-16 z-40 -mx-4 sm:-mx-6 -mt-6 sm:-mt-8 mb-6 bg-white/95 dark:bg-navy-900/95 backdrop-blur-md border-b sm:border-x sm:rounded-b-2xl border-slate-200 dark:border-navy-700 shadow-subtle dark:shadow-subtle-dark transition-all">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-3">
          {/* Left: Exit button & Question counter */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExitQuiz}
              aria-label="Salir de la ronda y volver a opciones"
              title="Salir de la ronda"
              className="p-1.5 -ml-1 rounded-lg text-slate-400 hover:text-crimson-600 dark:hover:text-crimson-400 hover:bg-slate-100 dark:hover:bg-navy-800 transition-colors focus-visible:ring-2 focus-visible:ring-crimson-500 focus-visible:outline-hidden"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
            <span
              className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-navy-50 dark:bg-navy-950 text-navy-600 dark:text-slate-300 border border-slate-200 dark:border-navy-700"
              aria-label={`Pregunta número ${currentIndex + 1} de un total de ${activeDeck.length || questionsCount}`}
            >
              Pregunta {currentIndex + 1} de {activeDeck.length || questionsCount}
            </span>
          </div>

          {/* Center: Winning streak badge */}
          {streak >= 2 && (
            <div
              role="status"
              aria-label={`Racha de ${streak} aciertos seguidos`}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-500 text-white shadow-xs animate-pop-in shrink-0"
            >
              <span>🔥</span>
              <span>{streak} seguidas</span>
            </div>
          )}

          {/* Right: Dynamic Countdown badge */}
          <div className="flex items-center gap-2">
            <div
              role="timer"
              aria-live="off"
              aria-label={`Tiempo restante: ${timeRemaining} segundos`}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono tabular-nums font-bold transition-colors ${
                isTimeCritical
                  ? 'bg-crimson-600 text-white animate-pulse'
                  : 'bg-ice-200 dark:bg-navy-950 text-navy-600 dark:text-ice-300 border border-slate-200 dark:border-navy-700'
              }`}
            >
              <Timer className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{timeRemaining}s</span>
              {currentQuestion?.type === 'sentence-builder' && (
                <span className="text-xs font-sans font-semibold text-crimson-700 dark:text-crimson-300 bg-crimson-100 dark:bg-crimson-900/60 px-2 py-0.5 rounded-full border border-crimson-200 dark:border-crimson-800">
                  +5s<span className="hidden sm:inline"> lectura</span>
                </span>
              )}
            </div>
          </div>

          {/* Critical countdown announcement for screen readers */}
          <div className="sr-only" role="status" aria-live="assertive" aria-atomic="true">
            {isTimeCritical && timeRemaining > 0 && `Atención: quedan ${timeRemaining} segundos`}
          </div>
        </div>

        {/* Linear progress bar attached to bottom edge */}
        <div
          role="progressbar"
          aria-valuenow={Math.round((timeRemaining / currentSlideTimeLimit) * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Tiempo restante de la diapositiva actual"
          className="w-full bg-ice-200 dark:bg-navy-950 h-1.5 sm:h-2 overflow-hidden sm:rounded-b-2xl"
        >
          <div
            className={`h-full transition-all duration-1000 ease-linear ${
              isTimeCritical ? 'bg-crimson-600' : 'bg-navy-600 dark:bg-crimson-500'
            }`}
            style={{ width: `${(timeRemaining / currentSlideTimeLimit) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Slide Card Container */}
      <div className="max-w-3xl mx-auto space-y-6">
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
                {(shuffledMCOptions.length > 0 ? shuffledMCOptions : currentQuestion.options).map((opt, optIdx) => {
                  const isOptionSelected = selectedAnswer === opt;
                  const isCorrectOption = opt === currentQuestion.options[currentQuestion.correctIndex];

                  let btnStyle =
                    'border-slate-300 dark:border-navy-600 bg-white dark:bg-navy-900 text-slate-800 dark:text-ice-300 hover:border-crimson-400';

                  if (isFeedbackState) {
                    if (isCorrectOption) {
                      btnStyle = 'border-success-500 bg-success-50 dark:bg-success-950/60 text-success-900 dark:text-success-100 font-bold ring-2 ring-success-500/40 animate-pop-in';
                    } else if (isOptionSelected && !lastAnswerWasCorrect) {
                      btnStyle = 'border-crimson-500 bg-crimson-50 dark:bg-crimson-950/60 text-crimson-900 dark:text-crimson-100 font-bold ring-2 ring-crimson-400/40 animate-shake-soft';
                    } else {
                      btnStyle = 'opacity-40 border-slate-200 dark:border-navy-800 text-slate-400';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={isFeedbackState}
                      onClick={() => handleAnswerSubmitted(opt)}
                      aria-pressed={isOptionSelected}
                      aria-label={`${opt}${isFeedbackState && isCorrectOption ? ' (Respuesta correcta)' : ''}${isFeedbackState && isOptionSelected && !lastAnswerWasCorrect ? ' (Tu respuesta, incorrecta)' : ''}`}
                      className={`min-h-[50px] px-4 py-3 rounded-xl border text-left text-sm font-medium transition-all shadow-2xs active:scale-98 flex items-center justify-between focus-visible:ring-2 focus-visible:ring-crimson-500 focus-visible:outline-hidden ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {isFeedbackState && isCorrectOption && (
                        <CheckCircle2 className="w-4 h-4 text-success-600 dark:text-success-400 shrink-0" aria-hidden="true" />
                      )}
                      {isFeedbackState && isOptionSelected && !lastAnswerWasCorrect && (
                        <XCircle className="w-4 h-4 text-crimson-600 dark:text-crimson-400 shrink-0" aria-hidden="true" />
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
                      btnStyle = 'border-success-500 bg-success-50 dark:bg-success-950/60 text-success-900 dark:text-success-100 font-bold ring-2 ring-success-500/40 animate-pop-in';
                    } else if (isSelected && !lastAnswerWasCorrect) {
                      btnStyle = 'border-crimson-500 bg-crimson-50 dark:bg-crimson-950/60 text-crimson-900 dark:text-crimson-100 font-bold ring-2 ring-crimson-400/40 animate-shake-soft';
                    } else {
                      btnStyle = 'opacity-40 border-slate-200 dark:border-navy-800 text-slate-400';
                    }
                  }

                  return (
                    <button
                      key={cat.key}
                      disabled={isFeedbackState}
                      onClick={() => handleAnswerSubmitted(cat.key)}
                      aria-pressed={isSelected}
                      aria-label={`Clasificar como ${cat.label}`}
                      className={`min-h-[64px] px-5 py-4 rounded-xl border text-center font-bold text-sm sm:text-base transition-all shadow-xs active:scale-98 flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-crimson-500 focus-visible:outline-hidden ${btnStyle}`}
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
                <span
                  role="status"
                  aria-label="Espacio para completar"
                  className="font-mono px-3 py-1 rounded-lg border-2 border-dashed border-crimson-400 bg-crimson-50/40 dark:bg-crimson-950/40 text-crimson-700 dark:text-crimson-300 font-bold"
                >
                  {selectedAnswer ? (selectedAnswer === '__TIMEOUT__' ? '[Tiempo]' : selectedAnswer) : '[ ? ]'}
                </span>
                <span>{currentQuestion.sentenceAfter}</span>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                {(shuffledQuickSlotOptions.length > 0 ? shuffledQuickSlotOptions : currentQuestion.options).map((opt) => {
                  const isCorrect = opt === currentQuestion.correctAnswer;
                  const isSelected = selectedAnswer === opt;

                  let btnStyle =
                    'border-slate-300 dark:border-navy-600 bg-white dark:bg-navy-900 text-slate-800 dark:text-ice-300 hover:border-crimson-500';

                  if (isFeedbackState) {
                    if (isCorrect) {
                      btnStyle = 'border-success-500 bg-success-50 dark:bg-success-950/60 text-success-900 dark:text-success-100 font-bold ring-2 ring-success-500/40 animate-pop-in';
                    } else if (isSelected && !lastAnswerWasCorrect) {
                      btnStyle = 'border-crimson-500 bg-crimson-50 dark:bg-crimson-950/60 text-crimson-900 dark:text-crimson-100 font-bold ring-2 ring-crimson-400/40 animate-shake-soft';
                    } else {
                      btnStyle = 'opacity-40 border-slate-200 dark:border-navy-800 text-slate-400';
                    }
                  }

                  return (
                    <button
                      key={opt}
                      disabled={isFeedbackState}
                      onClick={() => handleAnswerSubmitted(opt)}
                      aria-pressed={isSelected}
                      aria-label={`Opción: ${opt}`}
                      className={`min-h-[48px] px-5 py-2.5 rounded-xl border font-bold text-sm transition-all shadow-xs active:scale-95 focus-visible:ring-2 focus-visible:ring-crimson-500 focus-visible:outline-hidden ${btnStyle}`}
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
                      btnStyle = 'border-success-500 bg-success-50 dark:bg-success-950/60 text-success-900 dark:text-success-100 font-bold ring-2 ring-success-500/40 animate-pop-in';
                    } else if (isSelected && !lastAnswerWasCorrect) {
                      btnStyle = 'border-crimson-500 bg-crimson-50 dark:bg-crimson-950/60 text-crimson-900 dark:text-crimson-100 font-bold ring-2 ring-crimson-400/40 animate-shake-soft';
                    } else {
                      btnStyle = 'opacity-40 border-slate-200 dark:border-navy-800 text-slate-400';
                    }
                  }

                  return (
                    <button
                      key={item.val}
                      disabled={isFeedbackState}
                      onClick={() => handleAnswerSubmitted(item.val)}
                      aria-pressed={isSelected}
                      aria-label={item.label}
                      className={`min-h-[58px] px-5 py-3 rounded-xl border text-center font-bold text-sm sm:text-base transition-all shadow-xs active:scale-98 focus-visible:ring-2 focus-visible:ring-crimson-500 focus-visible:outline-hidden ${btnStyle}`}
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
                <span
                  role="status"
                  aria-live="polite"
                  className="font-mono font-bold text-crimson-600 dark:text-crimson-400"
                >
                  {matchedPairs.length} / {currentQuestion.pairs.length} parejas
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Left Column */}
                <div className="space-y-2.5" role="group" aria-label="Condición o antecedente">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1">
                    Condición / Antecedente
                  </div>
                  {shuffledLeft.map((item) => {
                    const isMatched = matchedPairs.includes(item.id);
                    const isSelected = selectedLeft === item.id;

                    let cardStyle =
                      'border-slate-300 dark:border-navy-600 bg-white dark:bg-navy-900 text-slate-800 dark:text-ice-300 hover:border-crimson-400';

                    if (isMatched) {
                      cardStyle =
                        'border-success-500 bg-success-50 dark:bg-success-950/60 text-success-900 dark:text-success-100 font-bold opacity-90 animate-pop-in';
                    } else if (isSelected) {
                      cardStyle = mismatchError
                        ? 'border-crimson-500 bg-crimson-100 dark:bg-crimson-950/80 text-crimson-900 dark:text-crimson-100 ring-2 ring-crimson-500 animate-shake-soft'
                        : 'border-crimson-500 bg-crimson-50 dark:bg-crimson-950/50 text-crimson-900 dark:text-crimson-200 ring-2 ring-crimson-400 font-semibold';
                    }

                    return (
                      <button
                        key={item.id}
                        disabled={isMatched || isFeedbackState}
                        onClick={() => handleSelectLeft(item.id)}
                        aria-pressed={isSelected}
                        aria-disabled={isMatched}
                        aria-label={`${item.text}${isMatched ? ' (Emparejado correctamente)' : isSelected ? ' (Seleccionado)' : ''}`}
                        className={`w-full min-h-[54px] p-3 rounded-xl border text-left text-xs sm:text-sm transition-all shadow-2xs active:scale-98 flex items-center justify-between gap-2 focus-visible:ring-2 focus-visible:ring-crimson-500 focus-visible:outline-hidden ${cardStyle}`}
                      >
                        <span>{item.text}</span>
                        {isMatched && (
                          <CheckCircle2 className="w-4 h-4 text-success-600 dark:text-success-400 shrink-0" aria-hidden="true" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Right Column */}
                <div className="space-y-2.5" role="group" aria-label="Resultado o consecuencia">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1">
                    Resultado / Consecuencia
                  </div>
                  {shuffledRight.map((item) => {
                    const isMatched = matchedPairs.includes(item.id);
                    const isSelected = selectedRight === item.id;

                    let cardStyle =
                      'border-slate-300 dark:border-navy-600 bg-white dark:bg-navy-900 text-slate-800 dark:text-ice-300 hover:border-crimson-400';

                    if (isMatched) {
                      cardStyle =
                        'border-success-500 bg-success-50 dark:bg-success-950/60 text-success-900 dark:text-success-100 font-bold opacity-90 animate-pop-in';
                    } else if (isSelected) {
                      cardStyle = mismatchError
                        ? 'border-crimson-500 bg-crimson-100 dark:bg-crimson-950/80 text-crimson-900 dark:text-crimson-100 ring-2 ring-crimson-500 animate-shake-soft'
                        : 'border-crimson-500 bg-crimson-50 dark:bg-crimson-950/50 text-crimson-900 dark:text-crimson-200 ring-2 ring-crimson-400 font-semibold';
                    }

                    return (
                      <button
                        key={item.id}
                        disabled={isMatched || isFeedbackState}
                        onClick={() => handleSelectRight(item.id)}
                        aria-pressed={isSelected}
                        aria-disabled={isMatched}
                        aria-label={`${item.text}${isMatched ? ' (Emparejado correctamente)' : isSelected ? ' (Seleccionado)' : ''}`}
                        className={`w-full min-h-[54px] p-3 rounded-xl border text-left text-xs sm:text-sm transition-all shadow-2xs active:scale-98 flex items-center justify-between gap-2 focus-visible:ring-2 focus-visible:ring-crimson-500 focus-visible:outline-hidden ${cardStyle}`}
                      >
                        <span>{item.text}</span>
                        {isMatched && (
                          <CheckCircle2 className="w-4 h-4 text-success-600 dark:text-success-400 shrink-0" aria-hidden="true" />
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
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span className="font-semibold uppercase tracking-wider">Ordena los bloques sintácticos:</span>
                <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-md bg-crimson-100 dark:bg-crimson-950/60 text-crimson-700 dark:text-crimson-300 border border-crimson-200 dark:border-crimson-800">
                  +5s lectura incluidos
                </span>
              </div>

              {/* Dropzone container */}
              <div
                role="region"
                aria-label="Oración en construcción"
                aria-live="polite"
                className={`p-4 sm:p-5 rounded-xl border-2 border-dashed min-h-[90px] flex flex-wrap items-center gap-2 transition-all ${
                  isFeedbackState
                    ? lastAnswerWasCorrect
                      ? 'border-success-500 bg-success-50/50 dark:bg-success-950/40 ring-2 ring-success-500/30 animate-pop-in'
                      : 'border-crimson-500 bg-crimson-50/50 dark:bg-crimson-950/40 ring-2 ring-crimson-500/30 animate-shake-soft'
                    : 'border-slate-300 dark:border-navy-600 bg-ice-100/40 dark:bg-navy-900/40'
                }`}
              >
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
                      aria-label={`Quitar palabra "${token.text}" de la oración`}
                      className="px-3.5 py-2 rounded-lg bg-navy-600 hover:bg-navy-700 text-white dark:bg-ice-200 dark:text-navy-900 dark:hover:bg-ice-300 font-semibold text-xs sm:text-sm shadow-xs transition-all active:scale-95 flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-crimson-500 focus-visible:outline-hidden animate-snap-in"
                      title="Toca para devolver al banco de palabras"
                    >
                      <span>{token.text}</span>
                      <span className="text-xs opacity-60" aria-hidden="true">✕</span>
                    </button>
                  ))
                )}
              </div>

              {/* Token bank */}
              <div className="space-y-2 pt-1" role="group" aria-label="Banco de palabras disponibles">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Bloques disponibles:
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {builderAvailable.map((token) => (
                    <button
                      key={token.id}
                      disabled={isFeedbackState}
                      onClick={() => handlePlaceToken(token)}
                      aria-label={`Colocar palabra "${token.text}"`}
                      className="min-h-[44px] px-4 py-2.5 rounded-xl border border-slate-300 dark:border-navy-600 bg-white dark:bg-navy-900 text-slate-800 dark:text-ice-300 font-medium text-xs sm:text-sm hover:border-crimson-500 hover:bg-crimson-50/20 active:scale-95 transition-all shadow-xs focus-visible:ring-2 focus-visible:ring-crimson-500 focus-visible:outline-hidden"
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
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                  Toca el fragmento que contenga un error:
                </div>
                <div className="flex flex-wrap gap-2.5" role="group" aria-label="Fragmentos de la oración">
                  {currentQuestion.segments.map((segment) => {
                    const isSelected = selectedAnswer === segment.text;
                    const isThisTheError = segment.isError;

                    let segStyle =
                      'border-slate-300 dark:border-navy-600 bg-white dark:bg-navy-900 text-slate-800 dark:text-ice-300 hover:border-crimson-500 hover:bg-crimson-50/20';

                    if (isFeedbackState) {
                      if (isThisTheError) {
                        segStyle =
                          'border-success-500 bg-success-50 dark:bg-success-950/60 text-success-900 dark:text-success-100 font-bold ring-2 ring-success-500/40 animate-pop-in';
                      } else if (isSelected && !lastAnswerWasCorrect) {
                        segStyle =
                          'border-crimson-500 bg-crimson-50 dark:bg-crimson-950/60 text-crimson-900 dark:text-crimson-100 font-bold ring-2 ring-crimson-400/40 animate-shake-soft';
                      } else {
                        segStyle = 'opacity-40 border-slate-200 dark:border-navy-800 text-slate-400';
                      }
                    }

                    return (
                      <button
                        key={segment.id}
                        disabled={isFeedbackState}
                        onClick={() => handleSelectBugSegment(segment.id)}
                        aria-pressed={isSelected}
                        aria-label={`Fragmento: "${segment.text}"${isFeedbackState && isThisTheError ? ' (Fragmento con error)' : ''}`}
                        className={`min-h-[46px] px-4 py-2 rounded-xl border font-semibold text-sm sm:text-base transition-all shadow-xs active:scale-95 flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-crimson-500 focus-visible:outline-hidden ${segStyle}`}
                      >
                        <span>{segment.text}</span>
                        {isFeedbackState && isThisTheError && (
                          <CheckCircle2 className="w-4 h-4 text-success-600 dark:text-success-400 shrink-0" aria-hidden="true" />
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
                        'border-success-500 bg-success-50 dark:bg-success-950/60 text-success-900 dark:text-success-100 font-bold ring-2 ring-success-500/40 animate-pop-in';
                    } else if (isSelected && !lastAnswerWasCorrect) {
                      btnStyle =
                        'border-crimson-500 bg-crimson-50 dark:bg-crimson-950/60 text-crimson-900 dark:text-crimson-100 font-bold ring-2 ring-crimson-400/40 animate-shake-soft';
                    } else {
                      btnStyle = 'opacity-40 border-slate-200 dark:border-navy-800 text-slate-400';
                    }
                  }

                  return (
                    <button
                      disabled={isFeedbackState}
                      onClick={handleSelectBugNoError}
                      aria-pressed={isSelected}
                      aria-label="La oración es correcta (Sin error gramatical)"
                      className={`w-full min-h-[48px] px-5 py-3 rounded-xl border font-bold text-xs sm:text-sm transition-all shadow-xs active:scale-98 flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-crimson-500 focus-visible:outline-hidden ${btnStyle}`}
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
                        'border-success-500 bg-success-50 dark:bg-success-950/60 text-success-900 dark:text-success-100 font-bold ring-2 ring-success-500/40 animate-pop-in';
                    } else if (isSelected && !lastAnswerWasCorrect) {
                      cardStyle =
                        'border-crimson-500 bg-crimson-50 dark:bg-crimson-950/60 text-crimson-900 dark:text-crimson-100 font-bold ring-2 ring-crimson-400/40 animate-shake-soft';
                    } else {
                      cardStyle = 'opacity-40 border-slate-200 dark:border-navy-800 text-slate-400';
                    }
                  }

                  return (
                    <button
                      key={evt.choice}
                      disabled={isFeedbackState}
                      onClick={() => handleSelectTimelineEvent(evt.choice)}
                      aria-pressed={isSelected}
                      aria-label={`${evt.label}: ${evt.text}${isFeedbackState && isCorrect ? ' (Ocurrió primero en la línea temporal)' : ''}`}
                      className={`min-h-[72px] p-4 rounded-xl border text-left transition-all shadow-xs active:scale-98 flex flex-col justify-between gap-2 focus-visible:ring-2 focus-visible:ring-crimson-500 focus-visible:outline-hidden ${cardStyle}`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          {evt.label}
                        </span>
                        {isFeedbackState && isCorrect && (
                          <span className="text-xs font-bold text-success-600 dark:text-success-400 inline-flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" /> Ocurrió Primero
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
          <div
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            className={`mt-6 pt-4 border-t border-slate-200 dark:border-navy-700 space-y-3 ${
              lastAnswerWasCorrect ? 'animate-pop-in' : 'animate-shake-soft'
            }`}
          >
            <div
              className={`p-4 rounded-xl border flex items-start gap-3 transition-all ${
                lastAnswerWasCorrect
                  ? 'bg-success-50 dark:bg-success-950/40 border-success-200 dark:border-success-800 text-success-900 dark:text-success-200 ring-2 ring-success-500/20'
                  : 'bg-crimson-50 dark:bg-crimson-950/40 border-crimson-200 dark:border-crimson-900 text-crimson-900 dark:text-crimson-200 ring-2 ring-crimson-500/20'
              }`}
            >
              {lastAnswerWasCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-success-600 dark:text-success-400 shrink-0 mt-0.5 animate-pop-in" aria-hidden="true" />
              ) : (
                <XCircle className="w-5 h-5 text-crimson-600 dark:text-crimson-400 shrink-0 mt-0.5 animate-shake-soft" aria-hidden="true" />
              )}
              <div className="space-y-1 text-xs sm:text-sm">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-bold text-sm sm:text-base">
                    {lastAnswerWasCorrect
                      ? '¡Respuesta Correcta!'
                      : selectedAnswer === '__TIMEOUT__'
                      ? '¡Tiempo agotado!'
                      : 'Respuesta incorrecta'}
                  </p>
                  {lastAnswerWasCorrect && streak >= 2 && (
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-amber-500 text-white animate-pop-in flex items-center gap-1 shadow-2xs">
                      🔥 ¡{streak} seguidas!
                    </span>
                  )}
                </div>
                <p className="leading-relaxed opacity-90">{currentQuestion.explanation}</p>
              </div>
            </div>

            {/* Auto-advance progress + manual Skip button */}
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1">
              <span aria-live="off">Siguiente slide en {feedbackCountdown}s...</span>
              <button
                onClick={advanceToNextSlide}
                aria-label="Avanzar de inmediato a la siguiente slide"
                className="font-semibold text-crimson-600 dark:text-crimson-400 hover:underline flex items-center gap-1 min-h-[36px] px-2 focus-visible:ring-2 focus-visible:ring-crimson-500 focus-visible:outline-hidden"
              >
                <span>Continuar ahora</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
  );
};
