import React, { useState } from 'react';
import {
  pastPerfectFillBlanks,
  pastPerfectSentenceCompletion,
  zeroConditionalSentences,
  firstConditionalSentences,
  zeroVsFirstMultipleChoice,
  dragSlotExercises,
  secondThirdConditionalExercises,
  secondVsThirdMultipleChoice,
} from '../data/englishExercises';
import { FillBlankQuiz } from './quiz/FillBlankQuiz';
import { MultipleChoiceQuiz } from './quiz/MultipleChoiceQuiz';
import { WordBankSlotQuiz } from './quiz/WordBankSlotQuiz';
import { Sparkles, ArrowLeft, BookmarkCheck, GitCommitHorizontal, Split } from 'lucide-react';

interface EnglishSessionViewProps {
  sessionDay?: 1 | 2;
  onBackToLanding: () => void;
}

export const EnglishSessionView: React.FC<EnglishSessionViewProps> = ({
  sessionDay = 1,
  onBackToLanding,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'past-perfect' | 'conditionals' | 'drag-drop' | 'second-third'>(
    sessionDay === 1 ? 'past-perfect' : 'second-third'
  );

  return (
    <div className="space-y-6">
      {/* Top breadcrumb & back button */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToLanding}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Temario & Sesiones</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-900 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            {sessionDay === 1 ? 'Sesión 1 (10 de Noviembre)' : 'Sesión 2 (11 de Noviembre)'}
          </span>
        </div>
      </div>

      {/* Hero header */}
      <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 sm:p-6 bg-white dark:bg-zinc-900/60 shadow-xs">
        <div className="max-w-3xl">
          <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
            {sessionDay === 1
              ? 'Módulo de Inglés - Sesión 1: Past Perfect & Zero/First Conditional'
              : 'Módulo de Inglés - Sesión 2: Second & Third Conditional'}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
            {sessionDay === 1
              ? 'Aprende a ubicar acciones anteriores en el pasado con el Past Perfect y domina las relaciones lógicas de causa-efecto con el Zero y First Conditional mediante explicaciones breves y ejercicios interactivos.'
              : 'Domina las situaciones hipotéticas del presente (Second Conditional) y los pasados imposibles o arrepentimientos (Third Conditional).'}
          </p>
        </div>

        {/* Navigation sub-tabs */}
        <div className="flex flex-wrap items-center gap-2 mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800">
          <button
            onClick={() => setActiveSubTab('past-perfect')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              activeSubTab === 'past-perfect'
                ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-300'
            }`}
          >
            <GitCommitHorizontal className="w-3.5 h-3.5" />
            <span>1. Past Perfect</span>
          </button>

          <button
            onClick={() => setActiveSubTab('conditionals')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              activeSubTab === 'conditionals'
                ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-300'
            }`}
          >
            <Split className="w-3.5 h-3.5" />
            <span>2. Zero & First Conditional</span>
          </button>

          <button
            onClick={() => setActiveSubTab('drag-drop')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              activeSubTab === 'drag-drop'
                ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-300'
            }`}
          >
            <BookmarkCheck className="w-3.5 h-3.5 text-amber-500" />
            <span>3. Arrastrar Palabras a Slots</span>
          </button>

          <button
            onClick={() => setActiveSubTab('second-third')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              activeSubTab === 'second-third'
                ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-300'
            }`}
          >
            <span className="opacity-70">4. Sesión 2 (Second & Third)</span>
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* SUB-TAB 1: PAST PERFECT                                   */}
      {/* ========================================================= */}
      {activeSubTab === 'past-perfect' && (
        <div className="space-y-6">
          {/* Visual Timeline Diagram */}
          <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 bg-zinc-50/50 dark:bg-zinc-900/30">
            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
              Diagrama Conceptual: Línea de Tiempo del Past Perfect
            </h2>

            <div className="p-4 rounded-lg bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center">
                {/* Step 1: Past Perfect */}
                <div className="flex-1 p-3 rounded-lg border-2 border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/30 text-emerald-950 dark:text-emerald-100">
                  <span className="text-[10px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-200 dark:bg-emerald-800 text-emerald-900 dark:text-emerald-100">
                    Ocurrió Primero
                  </span>
                  <div className="font-bold text-sm sm:text-base mt-2">Past Perfect</div>
                  <div className="font-mono text-xs mt-1 text-emerald-800 dark:text-emerald-300">
                    had + [Past Participle]
                  </div>
                  <div className="text-[11px] text-zinc-600 dark:text-zinc-400 mt-1 italic">
                    "Sara had lost her keys..."
                  </div>
                </div>

                <div className="text-zinc-400 font-bold hidden sm:block">➔</div>

                {/* Step 2: Past Simple */}
                <div className="flex-1 p-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
                  <span className="text-[10px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                    Ocurrió Después
                  </span>
                  <div className="font-bold text-sm sm:text-base mt-2">Past Simple</div>
                  <div className="font-mono text-xs mt-1 text-zinc-700 dark:text-zinc-300">
                    [Verbo en Pasado -ed / Irreg.]
                  </div>
                  <div className="text-[11px] text-zinc-600 dark:text-zinc-400 mt-1 italic">
                    "...before she arrived home."
                  </div>
                </div>

                <div className="text-zinc-400 font-bold hidden sm:block">➔</div>

                {/* Step 3: Now */}
                <div className="w-24 sm:w-28 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100/60 dark:bg-zinc-900/40 text-zinc-500 text-xs font-semibold">
                  <span>Presente</span>
                  <span className="block text-[11px] font-normal text-zinc-400 mt-0.5">Ahora (Now)</span>
                </div>
              </div>

              {/* Clues */}
              <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex flex-wrap gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                  Palabras clave de enlace:
                </span>
                <span className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 font-mono">before</span>
                <span className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 font-mono">after</span>
                <span className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 font-mono">by the time</span>
                <span className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 font-mono">already</span>
                <span className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 font-mono">because</span>
              </div>
            </div>
          </div>

          {/* Exercise 1: Fill in the blanks with Past Perfect */}
          <FillBlankQuiz
            title="Actividad 1: Fill in the blanks using the PAST PERFECT"
            subtitle="Conjuga el verbo en paréntesis usando la estructura correcta (had + participio pasado)."
            items={pastPerfectFillBlanks}
          />

          {/* Exercise 2: Complete the sentences (Multiple Choice) */}
          <MultipleChoiceQuiz
            title="Actividad 2: Complete the sentences using the PAST PERFECT"
            subtitle="Elige la opción que complete correctamente la oración respetando el orden cronológico en el pasado."
            items={pastPerfectSentenceCompletion}
          />
        </div>
      )}

      {/* ========================================================= */}
      {/* SUB-TAB 2: CONDITIONALS (ZERO & FIRST)                    */}
      {/* ========================================================= */}
      {activeSubTab === 'conditionals' && (
        <div className="space-y-6">
          {/* Comparison table */}
          <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 bg-zinc-50/50 dark:bg-zinc-900/30">
            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
              Cuadro Comparativo: Zero vs First Conditional
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400">
                    <th className="py-2.5 px-3 font-semibold">Condicional</th>
                    <th className="py-2.5 px-3 font-semibold">¿Para qué se usa?</th>
                    <th className="py-2.5 px-3 font-semibold">Cláusula "If"</th>
                    <th className="py-2.5 px-3 font-semibold">Cláusula Principal (Resultado)</th>
                    <th className="py-2.5 px-3 font-semibold">Ejemplo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200/60 dark:divide-zinc-800/60 text-zinc-800 dark:text-zinc-200">
                  <tr className="bg-white/50 dark:bg-zinc-950/40">
                    <td className="py-3 px-3 font-bold text-zinc-900 dark:text-zinc-100">
                      Zero Conditional
                    </td>
                    <td className="py-3 px-3 text-zinc-600 dark:text-zinc-400">
                      Hechos científicos, leyes físicas y verdades generales 100% seguras.
                    </td>
                    <td className="py-3 px-3 font-mono text-xs text-emerald-600 dark:text-emerald-400">
                      If + Present Simple
                    </td>
                    <td className="py-3 px-3 font-mono text-xs text-emerald-600 dark:text-emerald-400">
                      Present Simple
                    </td>
                    <td className="py-3 px-3 italic text-zinc-600 dark:text-zinc-400">
                      If you heat water, it boils.
                    </td>
                  </tr>
                  <tr className="bg-white/50 dark:bg-zinc-950/40">
                    <td className="py-3 px-3 font-bold text-zinc-900 dark:text-zinc-100">
                      First Conditional
                    </td>
                    <td className="py-3 px-3 text-zinc-600 dark:text-zinc-400">
                      Situaciones reales o planes con consecuencia probable en el futuro.
                    </td>
                    <td className="py-3 px-3 font-mono text-xs text-blue-600 dark:text-blue-400">
                      If + Present Simple
                    </td>
                    <td className="py-3 px-3 font-mono text-xs text-blue-600 dark:text-blue-400">
                      will + Verbo base
                    </td>
                    <td className="py-3 px-3 italic text-zinc-600 dark:text-zinc-400">
                      If you study today, you will pass tomorrow.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Exercise 3: Zero Conditional */}
          <FillBlankQuiz
            title="Actividad 3: Complete the sentences using ZERO CONDITIONAL"
            subtitle="Escribe el verbo en Present Simple. Recuerda agregar -s/-es en tercera persona singular (he, she, it)."
            items={zeroConditionalSentences}
          />

          {/* Exercise 4: First Conditional */}
          <FillBlankQuiz
            title="Actividad 4: Complete the sentences using FIRST CONDITIONAL"
            subtitle="Aplica la estructura: If + Present Simple, will + Verbo en infinitivo."
            items={firstConditionalSentences}
          />

          {/* Exercise 5: Zero vs First Discrimination */}
          <MultipleChoiceQuiz
            title="Actividad 5: Fill in the blanks using ZERO or FIRST CONDITIONAL depending on the use"
            subtitle="Analiza si la oración es una verdad general constante (Zero) o una situación futura probable (First)."
            items={zeroVsFirstMultipleChoice}
          />
        </div>
      )}

      {/* ========================================================= */}
      {/* SUB-TAB 3: DRAG AND DROP SLOTS                            */}
      {/* ========================================================= */}
      {activeSubTab === 'drag-drop' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60">
            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-1">
              Práctica de Arrastrar Palabras a Espacios (Word Bank)
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
              En estos ejercicios arrastras directamente los verbos o conectores a los slots dentro del párrafo.
              Si estás en un celular o tablet, también puedes simplemente tocar la palabra y luego tocar el slot vacío.
            </p>
          </div>

          <WordBankSlotQuiz exercise={dragSlotExercises[0]} />
          <WordBankSlotQuiz exercise={dragSlotExercises[1]} />
        </div>
      )}

      {/* ========================================================= */}
      {/* SUB-TAB 4: SECOND & THIRD CONDITIONAL (SESIÓN 2)          */}
      {/* ========================================================= */}
      {activeSubTab === 'second-third' && (
        <div className="space-y-6">
          {/* Guide banner for Session 2 */}
          <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
                Material para Mañana (11 de Noviembre)
              </span>
            </div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2">
              Second vs Third Conditional: Hipotéticos e Imposibles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm mt-3">
              <div className="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40">
                <div className="font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                  Second Conditional (Imaginario en Presente)
                </div>
                <div className="font-mono text-xs text-purple-600 dark:text-purple-400 mb-1">
                  If + Past Simple, would + Verbo base
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 text-xs">
                  "If I had wings, I would fly." (No tengo alas ahora, es solo una fantasía).
                </p>
              </div>

              <div className="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40">
                <div className="font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                  Third Conditional (Pasado Imposible / Lamento)
                </div>
                <div className="font-mono text-xs text-amber-600 dark:text-amber-400 mb-1">
                  If + Past Perfect (had + V3), would have + V3
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 text-xs">
                  "If I had studied, I would have passed." (Ya ocurrió el examen en el pasado, no se puede cambiar).
                </p>
              </div>
            </div>
          </div>

          {/* Exercise: Second & Third Conditional Fill in blanks */}
          <FillBlankQuiz
            title="Actividad: Fill in the blanks using SECOND or THIRD CONDITIONAL"
            subtitle="Completa las oraciones reconociendo si es una hipótesis en presente (Second) o un lamento sobre el pasado (Third)."
            items={secondThirdConditionalExercises}
          />

          {/* Exercise: Discrimination Second vs Third */}
          <MultipleChoiceQuiz
            title="Actividad: Fill in the blanks using SECOND or THIRD CONDITIONAL depending on the use"
            subtitle="Identifica la estructura correcta según el contexto temporal de la oración."
            items={secondVsThirdMultipleChoice}
          />
        </div>
      )}
    </div>
  );
};
