import React, { useState } from 'react';
import { EnglishSessionView } from './EnglishSessionView';
import { KatexMath } from './KatexMath';
import {
  ArrowLeft,
  Sparkles,
  BookOpen,
  Calculator,
  BarChart3,
  AlertCircle,
  Zap,
} from 'lucide-react';

interface SessionsViewProps {
  initialSubject?: 'matematicas' | 'geoestadistica' | 'ingles';
  onBackToLanding: () => void;
  onOpenTimedQuiz: () => void;
}

export const SessionsView: React.FC<SessionsViewProps> = ({
  initialSubject = 'matematicas',
  onBackToLanding,
  onOpenTimedQuiz,
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
            <span className="hidden md:inline text-xs uppercase font-bold px-1.5 py-0.2 rounded bg-black/15">
              Prioridad
            </span>
          </button>

          <button
            onClick={() => setActiveSubject('geoestadistica')}
            className={`min-h-[38px] px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 shrink-0 ${
              activeSubject === 'geoestadistica'
                ? 'bg-navy-600 text-white dark:bg-navy-700 dark:text-ice-300 shadow-xs'
                : 'text-slate-700 dark:text-slate-300 hover:text-navy-600 dark:hover:text-ice-300 hover:bg-white/60 dark:hover:bg-navy-800'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 text-amber-400" />
            <span>Geoestadística</span>
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
            <span className="text-xs font-bold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">
              Interactivo
            </span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. MATEMÁTICAS VIEW (Static Structured Exam Review)                       */}
      {/* ========================================================================= */}
      {activeSubject === 'matematicas' && (
        <div className="space-y-8 animate-slide-fade">
          {/* Header Banner */}
          <div className="rounded-2xl border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-800 p-6 sm:p-7 shadow-subtle dark:shadow-subtle-dark">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-crimson-100 dark:bg-crimson-900/50 text-crimson-700 dark:text-crimson-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-crimson-500" />
                <span>Sesión Central • Álgebra y Funciones</span>
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-navy-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-navy-700">
                9° Grado
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-600 dark:text-ice-300 tracking-tight">
              Matemáticas: Álgebra, Ecuaciones y Funciones
            </h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
              Estructura curricular de estudio y preparación para el examen. Contiene la sistematización de operaciones con radicales, los métodos de resolución de sistemas 2x2, los casos fundamentales de factorización y la geometría analítica de la recta.
            </p>

            {/* Note banner: interactive in progress */}
            <div className="mt-5 p-3.5 sm:p-4 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/60 dark:bg-amber-950/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
                  <strong>Estructura temática de referencia:</strong> El temario y las fórmulas están organizados para tu consulta directa. Los ejercicios interactivos paso a paso y el banco de preguntas contrarreloj para matemáticas se encuentran actualmente en desarrollo pedagógico.
                </div>
              </div>
              <button
                type="button"
                onClick={onOpenTimedQuiz}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs transition-colors shrink-0 self-start sm:self-auto shadow-2xs"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Quices Contrarreloj</span>
              </button>
            </div>
          </div>

          {/* Core Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Block 1: Radicales y Operaciones */}
            <div className="rounded-2xl border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-800 p-5 sm:p-6 shadow-subtle dark:shadow-subtle-dark flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-crimson-600 dark:text-crimson-400">
                    Módulo 1
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-ice-200 dark:bg-navy-900 text-slate-600 dark:text-slate-400 font-mono">
                    Aritmética
                  </span>
                </div>
                <h2 className="text-lg font-bold text-navy-600 dark:text-ice-300 mb-2">
                  Operaciones con Radicales & Racionalización
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                  Simplificación mediante descomposición en factores primos, suma de radicales semejantes y eliminación de raíces del denominador.
                </p>

                <div className="space-y-3 border-t border-slate-200 dark:border-navy-700 pt-3 text-xs text-slate-700 dark:text-slate-300">
                  <div className="p-3 rounded-lg bg-ice-100/60 dark:bg-navy-900/60">
                    <div className="font-semibold text-navy-600 dark:text-ice-300 mb-1">
                      Radicales semejantes (mismo índice y radicando):
                    </div>
                    <div className="font-mono text-xs text-crimson-600 dark:text-crimson-400">
                      <KatexMath math="a\sqrt[n]{x} \pm b\sqrt[n]{x} = (a \pm b)\sqrt[n]{x}" block />
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Ejemplo: <KatexMath math="\sqrt{18} + \sqrt{50} = 3\sqrt{2} + 5\sqrt{2} = 8\sqrt{2}" />
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-ice-100/60 dark:bg-navy-900/60">
                    <div className="font-semibold text-navy-600 dark:text-ice-300 mb-1">
                      Racionalización de Monomios y Binomios:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                      <div className="p-2 rounded bg-white dark:bg-navy-800 border border-slate-200 dark:border-navy-700">
                        <span className="text-xs font-bold block mb-1">Monomio:</span>
                        <KatexMath math="\frac{a}{\sqrt{b}} = \frac{a\sqrt{b}}{b}" block />
                      </div>
                      <div className="p-2 rounded bg-white dark:bg-navy-800 border border-slate-200 dark:border-navy-700">
                        <span className="text-xs font-bold block mb-1">Conjugado:</span>
                        <KatexMath math="\frac{c}{a + \sqrt{b}} = \frac{c(a - \sqrt{b})}{a^2 - b}" block />
                      </div>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg border border-slate-200 dark:border-navy-700">
                    <span className="font-semibold text-navy-600 dark:text-ice-300 block mb-1">
                      Unidad imaginaria y números complejos:
                    </span>
                    <KatexMath math="i = \sqrt{-1}, \quad i^2 = -1, \quad z = a + bi \quad (a, b \in \mathbb{R})" block />
                  </div>
                </div>
              </div>
            </div>

            {/* Block 2: Factorización */}
            <div className="rounded-2xl border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-800 p-5 sm:p-6 shadow-subtle dark:shadow-subtle-dark flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-crimson-600 dark:text-crimson-400">
                    Módulo 2
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-ice-200 dark:bg-navy-900 text-slate-600 dark:text-slate-400 font-mono">
                    Álgebra
                  </span>
                </div>
                <h2 className="text-lg font-bold text-navy-600 dark:text-ice-300 mb-2">
                  Factorización Clave para 9° Grado
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                  Técnicas algebraicas fundamentales para transformar polinomios en productos de factores irreducibles.
                </p>

                <div className="space-y-2.5 border-t border-slate-200 dark:border-navy-700 pt-3 text-xs text-slate-700 dark:text-slate-300">
                  <div className="p-2.5 rounded-lg bg-ice-100/60 dark:bg-navy-900/60 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-navy-600 dark:text-ice-300">Diferencia de Cuadrados</div>
                      <div className="text-xs text-slate-500">Dos términos con raíz cuadrada exacta</div>
                    </div>
                    <KatexMath math="a^2 - b^2 = (a - b)(a + b)" />
                  </div>

                  <div className="p-2.5 rounded-lg bg-ice-100/60 dark:bg-navy-900/60 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-navy-600 dark:text-ice-300">Trinomio Cuadrado Perfecto</div>
                      <div className="text-xs text-slate-500">Doble producto del 1° por el 2°</div>
                    </div>
                    <KatexMath math="a^2 \pm 2ab + b^2 = (a \pm b)^2" />
                  </div>

                  <div className="p-2.5 rounded-lg bg-ice-100/60 dark:bg-navy-900/60">
                    <div className="font-semibold text-navy-600 dark:text-ice-300 mb-0.5">
                      Trinomio de la forma <KatexMath math="x^2 + bx + c" />
                    </div>
                    <div className="text-xs text-slate-500 mb-1">
                      Buscar dos números <KatexMath math="p, q" /> tales que <KatexMath math="p + q = b" /> y <KatexMath math="p \cdot q = c" />
                    </div>
                    <KatexMath math="x^2 + bx + c = (x + p)(x + q)" block />
                  </div>

                  <div className="p-2.5 rounded-lg bg-ice-100/60 dark:bg-navy-900/60">
                    <div className="font-semibold text-navy-600 dark:text-ice-300 mb-0.5">
                      Suma y Diferencia de Cubos
                    </div>
                    <KatexMath math="a^3 \pm b^3 = (a \pm b)(a^2 \mp ab + b^2)" block />
                  </div>
                </div>
              </div>
            </div>

            {/* Block 3: Sistemas de Ecuaciones 2x2 */}
            <div className="rounded-2xl border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-800 p-5 sm:p-6 shadow-subtle dark:shadow-subtle-dark">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-crimson-600 dark:text-crimson-400">
                  Módulo 3
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-ice-200 dark:bg-navy-900 text-slate-600 dark:text-slate-400 font-mono">
                  Sistemas Lineales
                </span>
              </div>
              <h2 className="text-lg font-bold text-navy-600 dark:text-ice-300 mb-2">
                Sistemas de Ecuaciones Lineales 2x2
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                Cuatro métodos analíticos para encontrar la intersección <KatexMath math="(x, y)" /> de dos rectas en el plano.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-slate-200 dark:border-navy-700 pt-3 text-xs">
                <div className="p-3 rounded-lg border border-slate-200 dark:border-navy-700 bg-ice-100/40 dark:bg-navy-900/40">
                  <div className="font-bold text-navy-600 dark:text-ice-300 mb-1">1. Igualación</div>
                  <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                    Despejar la misma incógnita en ambas ecuaciones e igualar las expresiones: <KatexMath math="x = x \implies f(y) = g(y)" />.
                  </p>
                </div>

                <div className="p-3 rounded-lg border border-slate-200 dark:border-navy-700 bg-ice-100/40 dark:bg-navy-900/40">
                  <div className="font-bold text-navy-600 dark:text-ice-300 mb-1">2. Sustitución</div>
                  <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                    Despejar una incógnita en una ecuación y reemplazarla directamente en la segunda ecuación.
                  </p>
                </div>

                <div className="p-3 rounded-lg border border-slate-200 dark:border-navy-700 bg-ice-100/40 dark:bg-navy-900/40">
                  <div className="font-bold text-navy-600 dark:text-ice-300 mb-1">3. Reducción</div>
                  <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                    Multiplicar las ecuaciones por coeficientes adecuados para que los términos de una incógnita sean opuestos y se cancelen al sumar.
                  </p>
                </div>

                <div className="p-3 rounded-lg border border-slate-200 dark:border-navy-700 bg-ice-100/40 dark:bg-navy-900/40">
                  <div className="font-bold text-navy-600 dark:text-ice-300 mb-1">4. Regla de Cramer</div>
                  <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed mb-1">
                    Cálculo mediante determinantes <KatexMath math="\Delta, \Delta x, \Delta y" />:
                  </p>
                  <KatexMath math="x = \frac{\Delta x}{\Delta}, \quad y = \frac{\Delta y}{\Delta}" block />
                </div>
              </div>
            </div>

            {/* Block 4: Funciones y La Recta */}
            <div className="rounded-2xl border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-800 p-5 sm:p-6 shadow-subtle dark:shadow-subtle-dark">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-crimson-600 dark:text-crimson-400">
                  Módulo 4
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-ice-200 dark:bg-navy-900 text-slate-600 dark:text-slate-400 font-mono">
                  Geometría Analítica
                </span>
              </div>
              <h2 className="text-lg font-bold text-navy-600 dark:text-ice-300 mb-2">
                Teoría de Funciones y La Recta
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                Relaciones, tipos de correspondencia funcional y modelado geométrico en el plano cartesiano.
              </p>

              <div className="space-y-3 border-t border-slate-200 dark:border-navy-700 pt-3 text-xs text-slate-700 dark:text-slate-300">
                <div className="p-3 rounded-lg bg-ice-100/60 dark:bg-navy-900/60">
                  <div className="font-semibold text-navy-600 dark:text-ice-300 mb-1">
                    Pendiente y Ecuación de la Recta:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                    <div className="p-2 rounded bg-white dark:bg-navy-800 border border-slate-200 dark:border-navy-700">
                      <span className="text-xs font-bold block mb-1">Pendiente (m):</span>
                      <KatexMath math="m = \frac{y_2 - y_1}{x_2 - x_1}" block />
                    </div>
                    <div className="p-2 rounded bg-white dark:bg-navy-800 border border-slate-200 dark:border-navy-700">
                      <span className="text-xs font-bold block mb-1">Ecuación explícita:</span>
                      <KatexMath math="y = mx + b" block />
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-ice-100/60 dark:bg-navy-900/60">
                  <div className="font-semibold text-navy-600 dark:text-ice-300 mb-1">
                    Distancia entre dos puntos:
                  </div>
                  <KatexMath math="d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}" block />
                </div>

                <div className="p-2.5 rounded-lg border border-slate-200 dark:border-navy-700">
                  <span className="font-semibold text-navy-600 dark:text-ice-300 block mb-1">
                    Clasificación de Funciones:
                  </span>
                  <div className="grid grid-cols-3 gap-2 text-xs text-slate-600 dark:text-slate-400 text-center">
                    <div className="p-1.5 rounded bg-slate-50 dark:bg-navy-900">
                      <strong className="block text-navy-600 dark:text-ice-300">Inyectiva</strong>
                      1 a 1 (imágenes distintas)
                    </div>
                    <div className="p-1.5 rounded bg-slate-50 dark:bg-navy-900">
                      <strong className="block text-navy-600 dark:text-ice-300">Sobreyectiva</strong>
                      Rango = Codominio
                    </div>
                    <div className="p-1.5 rounded bg-slate-50 dark:bg-navy-900">
                      <strong className="block text-navy-600 dark:text-ice-300">Biyectiva</strong>
                      Inyectiva + Sobreyectiva
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. GEOESTADÍSTICA VIEW (Static Structured Exam Review)                    */}
      {/* ========================================================================= */}
      {activeSubject === 'geoestadistica' && (
        <div className="space-y-8 animate-slide-fade">
          {/* Header Banner */}
          <div className="rounded-2xl border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-800 p-6 sm:p-7 shadow-subtle dark:shadow-subtle-dark">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                <BarChart3 className="w-3.5 h-3.5 text-amber-500" />
                <span>Sesión Complementaria • Estadística y Cuerpos Redondos</span>
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-navy-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-navy-700">
                9° Grado
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-600 dark:text-ice-300 tracking-tight">
              Geoestadística: Dispersión, Probabilidad y Cuerpos Redondos
            </h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
              Guía temática y fórmulas estructuradas de estadística descriptiva e inferencial (medidas de dispersión, percentiles, probabilidad clásica) combinadas con el cálculo de áreas y volúmenes de cuerpos geométricos de revolución.
            </p>

            {/* Note banner: interactive in progress */}
            <div className="mt-5 p-3.5 sm:p-4 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/60 dark:bg-amber-950/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
                  <strong>Estructura temática de referencia:</strong> Las fórmulas y conceptos clave están organizados para tu consulta directa. Los ejercicios interactivos y preguntas contrarreloj para geoestadística se encuentran actualmente en desarrollo pedagógico.
                </div>
              </div>
              <button
                type="button"
                onClick={onOpenTimedQuiz}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs transition-colors shrink-0 self-start sm:self-auto shadow-2xs"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Quices Contrarreloj</span>
              </button>
            </div>
          </div>

          {/* Core Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Block 1: Medidas de Dispersión */}
            <div className="rounded-2xl border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-800 p-5 sm:p-6 shadow-subtle dark:shadow-subtle-dark flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    Estadística
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-ice-200 dark:bg-navy-900 text-slate-600 dark:text-slate-400 font-mono">
                    Dispersión
                  </span>
                </div>
                <h2 className="text-lg font-bold text-navy-600 dark:text-ice-300 mb-2">
                  Medidas de Dispersión
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                  Cuantifican el grado de alejamiento o concentración de los datos respecto a la media aritmética (<KatexMath math="\bar{x}" />).
                </p>

                <div className="space-y-3 border-t border-slate-200 dark:border-navy-700 pt-3 text-xs text-slate-700 dark:text-slate-300">
                  <div className="p-3 rounded-lg bg-ice-100/60 dark:bg-navy-900/60">
                    <div className="font-semibold text-navy-600 dark:text-ice-300 mb-1">
                      1. Rango estadístico:
                    </div>
                    <KatexMath math="R = x_{\max} - x_{\min}" block />
                  </div>

                  <div className="p-3 rounded-lg bg-ice-100/60 dark:bg-navy-900/60">
                    <div className="font-semibold text-navy-600 dark:text-ice-300 mb-1">
                      2. Varianza (<KatexMath math="\sigma^2" /> o <KatexMath math="s^2" />):
                    </div>
                    <p className="text-xs text-slate-500 mb-1">Promedio de las desviaciones al cuadrado:</p>
                    <KatexMath math="\sigma^2 = \frac{\sum_{i=1}^{N} (x_i - \bar{x})^2}{N}" block />
                  </div>

                  <div className="p-3 rounded-lg bg-ice-100/60 dark:bg-navy-900/60">
                    <div className="font-semibold text-navy-600 dark:text-ice-300 mb-1">
                      3. Desviación Estándar (<KatexMath math="\sigma" />):
                    </div>
                    <p className="text-xs text-slate-500 mb-1">Raíz cuadrada de la varianza (mismas unidades):</p>
                    <KatexMath math="\sigma = \sqrt{\sigma^2}" block />
                  </div>
                </div>
              </div>
            </div>

            {/* Block 2: Medidas de Posición (Percentiles) */}
            <div className="rounded-2xl border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-800 p-5 sm:p-6 shadow-subtle dark:shadow-subtle-dark flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    Estadística
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-ice-200 dark:bg-navy-900 text-slate-600 dark:text-slate-400 font-mono">
                    Posición
                  </span>
                </div>
                <h2 className="text-lg font-bold text-navy-600 dark:text-ice-300 mb-2">
                  Percentiles y Cuartiles
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                  Valores que dividen un conjunto ordenado de datos en partes porcentualmente equivalentes.
                </p>

                <div className="space-y-3 border-t border-slate-200 dark:border-navy-700 pt-3 text-xs text-slate-700 dark:text-slate-300">
                  <div className="p-3 rounded-lg bg-ice-100/60 dark:bg-navy-900/60">
                    <div className="font-semibold text-navy-600 dark:text-ice-300 mb-1">
                      Fórmula de posición para el percentil <KatexMath math="k" />:
                    </div>
                    <KatexMath math="\text{Posición}(P_k) = \frac{k \cdot N}{100}" block />
                    <p className="text-xs text-slate-500 mt-1">
                      Donde <KatexMath math="k \in [1, 99]" /> y <KatexMath math="N" /> es el total de observaciones.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-ice-100/60 dark:bg-navy-900/60">
                    <div className="font-semibold text-navy-600 dark:text-ice-300 mb-1">
                      Equivalencias Fundamentales:
                    </div>
                    <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                      <li className="flex items-center justify-between">
                        <span>Primer cuartil (<KatexMath math="Q_1" />):</span>
                        <KatexMath math="Q_1 = P_{25}" />
                      </li>
                      <li className="flex items-center justify-between">
                        <span>Mediana (<KatexMath math="Me" /> o <KatexMath math="Q_2" />):</span>
                        <KatexMath math="Q_2 = P_{50}" />
                      </li>
                      <li className="flex items-center justify-between">
                        <span>Tercer cuartil (<KatexMath math="Q_3" />):</span>
                        <KatexMath math="Q_3 = P_{75}" />
                      </li>
                      <li className="flex items-center justify-between border-t border-slate-200 dark:border-navy-700 pt-1">
                        <span>Rango Intercuartílico:</span>
                        <KatexMath math="IQR = Q_3 - Q_1" />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Block 3: Probabilidad y Combinatoria */}
            <div className="rounded-2xl border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-800 p-5 sm:p-6 shadow-subtle dark:shadow-subtle-dark">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  Probabilidad
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-ice-200 dark:bg-navy-900 text-slate-600 dark:text-slate-400 font-mono">
                  Combinatoria
                </span>
              </div>
              <h2 className="text-lg font-bold text-navy-600 dark:text-ice-300 mb-2">
                Probabilidad Clásica & Técnicas de Conteo
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                Regla de Laplace, eventos mutuamente excluyentes y principios fundamentales de combinatoria.
              </p>

              <div className="space-y-3 border-t border-slate-200 dark:border-navy-700 pt-3 text-xs text-slate-700 dark:text-slate-300">
                <div className="p-3 rounded-lg bg-ice-100/60 dark:bg-navy-900/60">
                  <div className="font-semibold text-navy-600 dark:text-ice-300 mb-1">
                    Regla de Laplace:
                  </div>
                  <KatexMath math="P(A) = \frac{\text{Número de casos favorables}}{\text{Número total de casos posibles}}" block />
                </div>

                <div className="p-3 rounded-lg bg-ice-100/60 dark:bg-navy-900/60">
                  <div className="font-semibold text-navy-600 dark:text-ice-300 mb-1">
                    Técnicas de Conteo:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                    <div className="p-2 rounded bg-white dark:bg-navy-800 border border-slate-200 dark:border-navy-700">
                      <span className="text-xs font-bold block mb-1">Permutación (Importa orden):</span>
                      <KatexMath math="P(n, r) = \frac{n!}{(n - r)!}" block />
                    </div>
                    <div className="p-2 rounded bg-white dark:bg-navy-800 border border-slate-200 dark:border-navy-700">
                      <span className="text-xs font-bold block mb-1">Combinación (No importa orden):</span>
                      <KatexMath math="C(n, r) = \frac{n!}{r!(n - r)!}" block />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Block 4: Cuerpos Redondos */}
            <div className="rounded-2xl border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-800 p-5 sm:p-6 shadow-subtle dark:shadow-subtle-dark">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  Geometría Espacial
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-ice-200 dark:bg-navy-900 text-slate-600 dark:text-slate-400 font-mono">
                  Cuerpos Redondos
                </span>
              </div>
              <h2 className="text-lg font-bold text-navy-600 dark:text-ice-300 mb-2">
                Cilindro, Cono y Esfera
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                Fórmulas de área superficial y volumen para sólidos de revolución.
              </p>

              <div className="space-y-2.5 border-t border-slate-200 dark:border-navy-700 pt-3 text-xs text-slate-700 dark:text-slate-300">
                <div className="p-2.5 rounded-lg bg-ice-100/60 dark:bg-navy-900/60 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-navy-600 dark:text-ice-300">Cilindro</div>
                    <div className="text-xs text-slate-500">Radio <KatexMath math="r" /> y altura <KatexMath math="h" /></div>
                  </div>
                  <KatexMath math="V = \pi r^2 h, \quad A_L = 2\pi rh" />
                </div>

                <div className="p-2.5 rounded-lg bg-ice-100/60 dark:bg-navy-900/60 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-navy-600 dark:text-ice-300">Cono</div>
                    <div className="text-xs text-slate-500">Generatriz <KatexMath math="g = \sqrt{r^2 + h^2}" /></div>
                  </div>
                  <KatexMath math="V = \frac{1}{3}\pi r^2 h, \quad A_L = \pi rg" />
                </div>

                <div className="p-2.5 rounded-lg bg-ice-100/60 dark:bg-navy-900/60 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-navy-600 dark:text-ice-300">Esfera</div>
                    <div className="text-xs text-slate-500">Superficie curva continua</div>
                  </div>
                  <KatexMath math="V = \frac{4}{3}\pi r^3, \quad A = 4\pi r^2" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. INGLÉS VIEW (Complete Interactive English Module)                      */}
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
