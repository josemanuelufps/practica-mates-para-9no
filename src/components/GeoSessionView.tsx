import React, { useState } from 'react';
import { geoQuestions } from '../data/geoQuestions';
import { KatexMath } from './KatexMath';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  HelpCircle,
  BarChart3,
  Lightbulb,
  Check,
} from 'lucide-react';

interface GeoSessionViewProps {
  onBackToSessions?: () => void;
}

export const GeoSessionView: React.FC<GeoSessionViewProps> = () => {
  // currentStep: 0 = Introducción & Marco Teórico; 1..10 = Preguntas 1 a 10
  const [currentStep, setCurrentStep] = useState<number>(0);
  // Track open accordion state per question
  const [solutionOpen, setSolutionOpen] = useState<Record<number, boolean>>({});
  // Optional self-assessment answer selection per question
  const [userSelected, setUserSelected] = useState<Record<number, string>>({});

  const toggleSolution = (qId: number) => {
    setSolutionOpen((prev) => ({
      ...prev,
      [qId]: !prev[qId],
    }));
  };

  const handleSelectOption = (qId: number, letter: string) => {
    setUserSelected((prev) => ({
      ...prev,
      [qId]: letter,
    }));
  };

  const currentQuestion = currentStep > 0 ? geoQuestions[currentStep - 1] : null;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Section Header */}
      <div className="rounded-2xl border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-800 p-5 sm:p-6 shadow-subtle dark:shadow-subtle-dark">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
              <BarChart3 className="w-3.5 h-3.5 text-amber-500" />
              <span>Sesión de Geoestadística</span>
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-navy-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-navy-700 font-mono">
              Evaluación Trimestral III Periodo
            </span>
          </div>

          {/* Quick jump to Intro button */}
          {currentStep > 0 && (
            <button
              onClick={() => {
                setCurrentStep(0);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xs font-semibold text-slate-600 hover:text-navy-600 dark:text-slate-400 dark:hover:text-ice-300 flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-navy-700 hover:bg-ice-100 dark:hover:bg-navy-900 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Ver Marco Teórico</span>
            </button>
          )}
        </div>

        <h1 className="text-xl sm:text-2xl font-extrabold text-navy-600 dark:text-ice-300 tracking-tight">
          Probabilidad, Conteo y Geometría Espacial
        </h1>
        <p className="mt-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
          Estructura pedagógica completa: consulta los fundamentos conceptuales de probabilidad y cuerpos redondos, y navega ejercicio a ejercicio con su justificación y procedimientos detallados paso a paso.
        </p>

        {/* Quick Navigation Index Bar */}
        <div className="mt-5 pt-4 border-t border-slate-200 dark:border-navy-700/80">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">
            <span>Índice de Navegación Rápida:</span>
            <span>
              {currentStep === 0
                ? 'Marco Teórico'
                : `Ejercicio ${currentStep} de ${geoQuestions.length}`}
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 pt-0.5 scrollbar-thin">
            {/* Step 0: Intro Tab */}
            <button
              onClick={() => {
                setCurrentStep(0);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 min-h-[42px] ${
                currentStep === 0
                  ? 'bg-amber-600 text-white shadow-xs ring-2 ring-amber-400/50'
                  : 'bg-ice-200 dark:bg-navy-900 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-navy-700'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Teoría</span>
            </button>

            {/* Questions 1 to 10 */}
            {geoQuestions.map((q) => {
              const isActive = currentStep === q.id;
              const hasSelected = userSelected[q.id] !== undefined;
              const hasOpenedSolution = solutionOpen[q.id] === true;

              return (
                <button
                  key={q.id}
                  onClick={() => {
                    setCurrentStep(q.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  title={`Ir al ejercicio ${q.id}: ${q.topic}`}
                  aria-label={`Ejercicio ${q.id}`}
                  className={`rounded-xl text-xs font-bold transition-all shrink-0 flex items-center justify-center min-h-[42px] min-w-[42px] relative font-mono ${
                    isActive
                      ? 'bg-amber-600 text-white shadow-xs ring-2 ring-amber-400/50'
                      : hasOpenedSolution
                      ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                      : hasSelected
                      ? 'bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 border border-sky-300 dark:border-sky-800'
                      : 'bg-ice-200 dark:bg-navy-900 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-navy-700'
                  }`}
                >
                  <span>{q.id}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* STEP 0: MARCO TEÓRICO INTRODUCTORIO                                       */}
      {/* ========================================================================= */}
      {currentStep === 0 && (
        <div className="space-y-6 animate-slide-fade">
          {/* Card: Introducción Conceptual */}
          <div className="rounded-2xl border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-800 p-6 shadow-subtle dark:shadow-subtle-dark">
            <h2 className="text-lg font-bold text-navy-600 dark:text-ice-300 mb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <span>Resumen de Fórmulas y Conceptos Clave de Geoestadística 9°</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              Repasa las definiciones de probabilidad, técnicas de conteo y fórmulas de cuerpos redondos evaluadas en la prueba trimestral. Al finalizar, pulsa en el botón para avanzar a los ejercicios resueltos.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              {/* Concept 1: Espacio Muestral y Laplace */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-navy-700 bg-ice-100/50 dark:bg-navy-900/50 space-y-2">
                <div className="font-bold text-sm text-navy-600 dark:text-ice-300 text-amber-600 dark:text-amber-400">
                  1. Espacio Muestral & Regla de Laplace
                </div>
                <ul className="space-y-1.5 text-slate-700 dark:text-slate-300">
                  <li>
                    <strong>Espacio muestral (S):</strong> Conjunto de todos los resultados posibles. Monedas: <KatexMath math="n(S) = 2^n" />.
                  </li>
                  <li>
                    <strong>Regla de Laplace:</strong> Para eventos equiprobables:
                    <KatexMath math="P(A) = \frac{\text{Casos Favorables}}{\text{Casos Posibles}}" block />
                  </li>
                  <li>
                    <strong>Propiedades:</strong> <KatexMath math="0 \le P(A) \le 1" />. La suma de probabilidades del espacio muestral es 1.
                  </li>
                </ul>
              </div>

              {/* Concept 2: Probabilidad Compuesta e Independencia */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-navy-700 bg-ice-100/50 dark:bg-navy-900/50 space-y-2">
                <div className="font-bold text-sm text-navy-600 dark:text-ice-300 text-amber-600 dark:text-amber-400">
                  2. Regla del Producto (Eventos Independientes)
                </div>
                <ul className="space-y-1.5 text-slate-700 dark:text-slate-300">
                  <li>
                    Dos eventos son independientes si el resultado de uno no altera la probabilidad del otro (ejemplo: moneda y dado).
                  </li>
                  <li>
                    Fórmula de probabilidad compuesta:
                    <KatexMath math="P(A \cap B) = P(A) \times P(B)" block />
                  </li>
                </ul>
              </div>

              {/* Concept 3: Técnicas de Conteo y Combinatoria */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-navy-700 bg-ice-100/50 dark:bg-navy-900/50 space-y-2">
                <div className="font-bold text-sm text-navy-600 dark:text-ice-300 text-amber-600 dark:text-amber-400">
                  3. Combinaciones sin Repetición
                </div>
                <ul className="space-y-1.5 text-slate-700 dark:text-slate-300">
                  <li>
                    Se utilizan cuando <strong>NO importa el orden</strong> de los elementos seleccionados (ej: delegación o comité).
                  </li>
                  <li>
                    Fórmula combinatoria:
                    <KatexMath math="C(n, k) = \binom{n}{k} = \frac{n!}{k!(n - k)!}" block />
                  </li>
                </ul>
              </div>

              {/* Concept 4: Geometría Espacial de Cuerpos Redondos */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-navy-700 bg-ice-100/50 dark:bg-navy-900/50 space-y-2">
                <div className="font-bold text-sm text-navy-600 dark:text-ice-300 text-amber-600 dark:text-amber-400">
                  4. Esfera, Cono y Cilindro
                </div>
                <ul className="space-y-1.5 text-slate-700 dark:text-slate-300">
                  <li>
                    <strong>Esfera:</strong> <KatexMath math="V = \frac{4}{3}\pi r^3, \quad A = 4\pi r^2" />. Recuerda que el radio es <KatexMath math="r = d/2" />.
                  </li>
                  <li>
                    <strong>Cono:</strong> Generatriz <KatexMath math="g = \sqrt{r^2 + h^2}" />, Volumen <KatexMath math="V = \frac{1}{3}\pi r^2 h" />, Área total <KatexMath math="A_T = \pi r(g + r)" />.
                  </li>
                  <li>
                    <strong>Cilindro:</strong> <KatexMath math="V = \pi r^2 h, \quad A_L = 2\pi rh" />.
                  </li>
                </ul>
              </div>
            </div>

            {/* CTA to start questions */}
            <div className="mt-7 pt-4 border-t border-slate-200 dark:border-navy-700 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-slate-500 dark:text-slate-400">
                ¿Listo para practicar? Resuelve los 10 problemas con retroalimentación paso a paso.
              </span>
              <button
                onClick={() => {
                  setCurrentStep(1);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all active:scale-98"
              >
                <span>Comenzar Ejercicios (Pregunta 1 de 10)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEPS 1..10: EJERCICIOS INDIVIDUALES CON PROCEDIMIENTO DESPLEGABLE        */}
      {/* ========================================================================= */}
      {currentQuestion && (
        <div key={currentQuestion.id} className="space-y-6 animate-slide-fade">
          {/* Main Question Card */}
          <div className="rounded-2xl border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-800 p-6 sm:p-7 shadow-subtle dark:shadow-subtle-dark space-y-6">
            {/* Top metadata badges */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-navy-700/80 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-amber-600 text-white flex items-center justify-center font-bold text-xs font-mono shadow-xs">
                  {currentQuestion.id}
                </span>
                <div>
                  <span className="text-xs font-bold text-navy-600 dark:text-ice-300 block">
                    {currentQuestion.category}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {currentQuestion.topic}
                  </span>
                </div>
              </div>

              <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
                Pregunta {currentStep} de {geoQuestions.length}
              </div>
            </div>

            {/* Enunciado */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                Enunciado del problema:
              </div>
              <p className="text-sm sm:text-base font-semibold text-navy-600 dark:text-ice-300 leading-relaxed whitespace-pre-line">
                {currentQuestion.statement}
              </p>
            </div>

            {/* Opciones interactivas de respuesta */}
            <div className="space-y-2.5">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Opciones disponibles (selecciona tu predicción antes de desplegar):
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentQuestion.options.map((opt) => {
                  const isSelected = userSelected[currentQuestion.id] === opt.letter;
                  const isSolutionRevealed = solutionOpen[currentQuestion.id] === true;

                  let optionStyle =
                    'border-slate-200 dark:border-navy-700 bg-ice-50/60 dark:bg-navy-900/50 hover:border-amber-400 text-slate-700 dark:text-slate-300';

                  if (isSelected && !isSolutionRevealed) {
                    optionStyle =
                      'border-amber-500 bg-amber-50 dark:bg-amber-950/60 ring-2 ring-amber-400/40 text-amber-800 dark:text-amber-200';
                  } else if (isSolutionRevealed) {
                    if (opt.isCorrect) {
                      optionStyle =
                        'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 ring-2 ring-emerald-500/50 text-emerald-800 dark:text-emerald-200 font-bold';
                    } else if (isSelected && !opt.isCorrect) {
                      optionStyle =
                        'border-red-400 bg-red-50 dark:bg-red-950/40 text-red-800 dark:text-red-300 opacity-80';
                    }
                  }

                  return (
                    <button
                      key={opt.letter}
                      type="button"
                      onClick={() => handleSelectOption(currentQuestion.id, opt.letter)}
                      className={`p-3.5 rounded-xl border text-left transition-all flex items-center justify-between gap-3 min-h-[44px] ${optionStyle}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-md bg-white dark:bg-navy-800 border border-slate-300 dark:border-navy-700 flex items-center justify-center font-bold text-xs shrink-0 font-mono">
                          {opt.letter}
                        </span>
                        <span className="text-xs sm:text-sm">{opt.text}</span>
                      </div>

                      {isSolutionRevealed && opt.isCorrect && (
                        <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Accordion / Desplegable con Procedimiento y Solución Paso a Paso */}
            <div className="pt-3 border-t border-slate-200 dark:border-navy-700">
              <button
                type="button"
                onClick={() => toggleSolution(currentQuestion.id)}
                className={`w-full min-h-[44px] px-4 py-3 rounded-xl border text-xs sm:text-sm font-bold flex items-center justify-between transition-all ${
                  solutionOpen[currentQuestion.id]
                    ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300'
                    : 'border-slate-300 dark:border-navy-700 bg-ice-100/80 dark:bg-navy-900/80 text-navy-600 dark:text-ice-300 hover:border-amber-400'
                }`}
              >
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>
                    {solutionOpen[currentQuestion.id]
                      ? 'Ocultar Justificación y Procedimiento'
                      : '👁️ Ver Justificación y Procedimiento Paso a Paso'}
                  </span>
                </div>
                {solutionOpen[currentQuestion.id] ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>

              {/* Collapsed/Expanded Content */}
              {solutionOpen[currentQuestion.id] && (
                <div className="mt-4 p-5 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/30 dark:bg-emerald-950/20 space-y-4 animate-slide-fade">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Resolución Pedagógica Paso a Paso:</span>
                  </div>

                  {/* Steps */}
                  <div className="space-y-3">
                    {currentQuestion.steps.map((step, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-lg border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-900 text-xs text-slate-700 dark:text-slate-300 space-y-1.5"
                      >
                        <div className="font-bold text-navy-600 dark:text-ice-300 flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 text-center font-mono leading-none flex items-center justify-center text-xs shrink-0">
                            {idx + 1}
                          </span>
                          <span>{step.title}</span>
                        </div>
                        <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                          {step.explanation}
                        </p>
                        {step.math && (
                          <div className="p-2 rounded bg-ice-100/60 dark:bg-navy-800 text-amber-700 dark:text-amber-300 overflow-x-auto text-center">
                            <KatexMath math={step.math} block />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Highlighted Final Conclusion */}
                  <div className="p-3.5 rounded-lg border border-emerald-300 dark:border-emerald-800 bg-emerald-100/50 dark:bg-emerald-900/40 text-xs sm:text-sm text-emerald-900 dark:text-emerald-200 flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-bold">
                        Respuesta Correcta: Opción {currentQuestion.correctLetter}
                      </strong>
                      <span className="leading-relaxed">{currentQuestion.conclusion}</span>
                    </div>
                  </div>

                  {/* Pedagogical Tip */}
                  {currentQuestion.pedagogicalTip && (
                    <div className="p-3 rounded-lg border border-amber-200 dark:border-amber-900/50 bg-amber-50/60 dark:bg-amber-950/30 text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2">
                      <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <strong>Tip pedagógico para el examen: </strong>
                        <span>{currentQuestion.pedagogicalTip}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Bottom Prev / Next Navigation Bar */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              onClick={() => {
                const prev = currentStep - 1;
                setCurrentStep(prev);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="min-h-[44px] px-4 py-2.5 rounded-xl border border-slate-300 dark:border-navy-700 bg-white dark:bg-navy-800 hover:bg-ice-200 dark:hover:bg-navy-700 text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{currentStep === 1 ? 'Marco Teórico' : 'Pregunta Anterior'}</span>
            </button>

            <span className="text-xs font-mono text-slate-500 dark:text-slate-400 hidden sm:inline">
              Pregunta {currentStep} de {geoQuestions.length}
            </span>

            {currentStep < geoQuestions.length ? (
              <button
                onClick={() => {
                  const next = currentStep + 1;
                  setCurrentStep(next);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="min-h-[44px] px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-xs transition-all active:scale-98"
              >
                <span>Siguiente Pregunta</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => {
                  setCurrentStep(0);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="min-h-[44px] px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-xs transition-all active:scale-98"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Volver al Inicio del Repaso</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
