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
import { Sparkles, ArrowLeft, BookmarkCheck, GitCommitHorizontal, Split, Copy, Check } from 'lucide-react';

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
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyRule = (key: string, ruleText: string) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(ruleText);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2200);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top breadcrumb & back button */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToLanding}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-stone-600 hover:text-forest-900 dark:text-[#92A49B] dark:hover:text-[#ECF3EF] transition-colors py-1.5 px-2 -ml-2 rounded-lg hover:bg-cream-100 dark:hover:bg-moss-900"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Temario & Sesiones</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-terracotta-50 dark:bg-terracotta-900/40 text-terracotta-700 dark:text-terracotta-300 border border-terracotta-200 dark:border-terracotta-800 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-terracotta-500" />
            {sessionDay === 1 ? 'Sesión 1 (10 de Noviembre)' : 'Sesión 2 (11 de Noviembre)'}
          </span>
        </div>
      </div>

      {/* Hero header */}
      <div className="border border-cream-200 dark:border-moss-800 rounded-2xl p-6 sm:p-7 bg-white dark:bg-moss-900 shadow-subtle dark:shadow-subtle-dark">
        <div className="max-w-3xl">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-forest-900 dark:text-[#ECF3EF] tracking-tight">
            {sessionDay === 1
              ? 'Módulo de Inglés - Sesión 1: Past Perfect & Zero/First Conditional'
              : 'Módulo de Inglés - Sesión 2: Second & Third Conditional'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-[#92A49B] mt-2 leading-relaxed">
            {sessionDay === 1
              ? 'Aprende a ubicar acciones anteriores en el pasado con el Past Perfect y domina las relaciones lógicas de causa-efecto con el Zero y First Conditional mediante explicaciones breves y ejercicios interactivos.'
              : 'Domina las situaciones hipotéticas del presente (Second Conditional) y los pasados imposibles o arrepentimientos (Third Conditional).'}
          </p>
        </div>

        {/* Navigation sub-tabs with generous touch area */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-5 border-t border-cream-200 dark:border-moss-800">
          <button
            onClick={() => setActiveSubTab('past-perfect')}
            className={`min-h-[40px] px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
              activeSubTab === 'past-perfect'
                ? 'bg-forest-600 text-white dark:bg-forest-400 dark:text-moss-950 shadow-xs'
                : 'bg-cream-100 hover:bg-cream-200 text-stone-700 dark:bg-moss-850 dark:hover:bg-moss-800 dark:text-[#92A49B]'
            }`}
          >
            <GitCommitHorizontal className="w-4 h-4" />
            <span>1. Past Perfect</span>
          </button>

          <button
            onClick={() => setActiveSubTab('conditionals')}
            className={`min-h-[40px] px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
              activeSubTab === 'conditionals'
                ? 'bg-forest-600 text-white dark:bg-forest-400 dark:text-moss-950 shadow-xs'
                : 'bg-cream-100 hover:bg-cream-200 text-stone-700 dark:bg-moss-850 dark:hover:bg-moss-800 dark:text-[#92A49B]'
            }`}
          >
            <Split className="w-4 h-4" />
            <span>2. Zero & First Conditional</span>
          </button>

          <button
            onClick={() => setActiveSubTab('drag-drop')}
            className={`min-h-[40px] px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
              activeSubTab === 'drag-drop'
                ? 'bg-forest-600 text-white dark:bg-forest-400 dark:text-moss-950 shadow-xs'
                : 'bg-cream-100 hover:bg-cream-200 text-stone-700 dark:bg-moss-850 dark:hover:bg-moss-800 dark:text-[#92A49B]'
            }`}
          >
            <BookmarkCheck className="w-4 h-4 text-terracotta-500" />
            <span>3. Arrastrar Palabras a Slots</span>
          </button>

          <button
            onClick={() => setActiveSubTab('second-third')}
            className={`min-h-[40px] px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
              activeSubTab === 'second-third'
                ? 'bg-forest-600 text-white dark:bg-forest-400 dark:text-moss-950 shadow-xs'
                : 'bg-cream-100 hover:bg-cream-200 text-stone-700 dark:bg-moss-850 dark:hover:bg-moss-800 dark:text-[#92A49B]'
            }`}
          >
            <span className="opacity-80">4. Sesión 2 (Second & Third)</span>
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: PAST PERFECT */}
      {activeSubTab === 'past-perfect' && (
        <div key="past-perfect" className="space-y-8 animate-slide-fade">
          {/* Visual Timeline Diagram */}
          <div className="border border-cream-200 dark:border-moss-800 rounded-2xl p-5 sm:p-6 bg-white dark:bg-moss-900 shadow-subtle dark:shadow-subtle-dark">
            <h2 className="text-sm font-bold text-forest-900 dark:text-[#ECF3EF] mb-3.5">
              Línea de Tiempo del Past Perfect
            </h2>

            <div className="p-4 sm:p-5 rounded-xl bg-cream-50/70 dark:bg-moss-950/60 border border-cream-200 dark:border-moss-800">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-center">
                {/* Step 1: Past Perfect */}
                <div className="w-full sm:flex-1 p-4 rounded-xl border-2 border-forest-500 bg-forest-50/80 dark:bg-forest-950/40 text-forest-900 dark:text-[#ECF3EF]">
                  <span className="text-[10px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-forest-200 dark:bg-forest-800 text-forest-900 dark:text-forest-100">
                    Ocurrió Primero
                  </span>
                  <div className="font-bold text-sm sm:text-base mt-2">Past Perfect</div>
                  <div className="font-mono text-xs mt-1 text-forest-700 dark:text-forest-300 font-semibold">
                    had + [Past Participle]
                  </div>
                  <div className="text-[11px] text-stone-600 dark:text-[#92A49B] mt-1.5 italic">
                    "Sara had lost her keys..."
                  </div>
                </div>

                {/* Arrow: down on mobile, right on desktop */}
                <div className="text-forest-400 dark:text-forest-600 font-bold py-1 sm:py-0">
                  <span className="sm:hidden">↓</span>
                  <span className="hidden sm:inline">➔</span>
                </div>

                {/* Step 2: Past Simple */}
                <div className="w-full sm:flex-1 p-4 rounded-xl border border-cream-300 dark:border-moss-700 bg-white dark:bg-moss-900 text-forest-900 dark:text-[#ECF3EF]">
                  <span className="text-[10px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-cream-200 dark:bg-moss-800 text-stone-700 dark:text-[#92A49B]">
                    Ocurrió Después
                  </span>
                  <div className="font-bold text-sm sm:text-base mt-2">Past Simple</div>
                  <div className="font-mono text-xs mt-1 text-stone-700 dark:text-[#92A49B] font-semibold">
                    [Verbo en Pasado -ed / Irreg.]
                  </div>
                  <div className="text-[11px] text-stone-600 dark:text-[#92A49B] mt-1.5 italic">
                    "...before she arrived home."
                  </div>
                </div>

                {/* Arrow */}
                <div className="text-forest-400 dark:text-forest-600 font-bold py-1 sm:py-0">
                  <span className="sm:hidden">↓</span>
                  <span className="hidden sm:inline">➔</span>
                </div>

                {/* Step 3: Now */}
                <div className="w-full sm:w-28 p-3.5 rounded-xl border border-cream-200 dark:border-moss-800 bg-cream-100/60 dark:bg-moss-900/40 text-stone-500 dark:text-stone-400 text-xs font-semibold">
                  <span>Presente</span>
                  <span className="block text-[11px] font-normal text-stone-400 mt-0.5">Ahora (Now)</span>
                </div>
              </div>

              {/* Clues & Copy cheat-sheet */}
              <div className="mt-4 pt-3.5 border-t border-cream-200 dark:border-moss-800 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-600 dark:text-[#92A49B]">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-forest-900 dark:text-[#ECF3EF]">
                    Palabras clave de enlace:
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-cream-100 dark:bg-moss-850 font-mono text-forest-700 dark:text-forest-300">before</span>
                  <span className="px-2.5 py-0.5 rounded-md bg-cream-100 dark:bg-moss-850 font-mono text-forest-700 dark:text-forest-300">after</span>
                  <span className="px-2.5 py-0.5 rounded-md bg-cream-100 dark:bg-moss-850 font-mono text-forest-700 dark:text-forest-300">by the time</span>
                  <span className="px-2.5 py-0.5 rounded-md bg-cream-100 dark:bg-moss-850 font-mono text-forest-700 dark:text-forest-300">already</span>
                  <span className="px-2.5 py-0.5 rounded-md bg-cream-100 dark:bg-moss-850 font-mono text-forest-700 dark:text-forest-300">because</span>
                </div>

                <button
                  onClick={() => copyRule('past-perfect', 'Past Perfect: had + [Past Participle]. Se usa para la acción que ocurrió ANTES de otra en el pasado.')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-cream-300 dark:border-moss-700 bg-white dark:bg-moss-900 hover:bg-cream-50 dark:hover:bg-moss-850 text-forest-900 dark:text-[#ECF3EF] font-medium transition-all shadow-2xs active:scale-95"
                >
                  {copiedKey === 'past-perfect' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-forest-600 dark:text-forest-400 animate-pop-in" />
                      <span className="text-forest-700 dark:text-forest-300 font-semibold">¡Regla copiada!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-stone-500" />
                      <span>Copiar regla nemotécnica</span>
                    </>
                  )}
                </button>
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

      {/* SUB-TAB 2: CONDITIONALS */}
      {activeSubTab === 'conditionals' && (
        <div key="conditionals" className="space-y-8 animate-slide-fade">
          {/* Comparison table */}
          <div className="border border-cream-200 dark:border-moss-800 rounded-2xl p-5 sm:p-6 bg-white dark:bg-moss-900 shadow-subtle dark:shadow-subtle-dark">
            <h2 className="text-sm font-bold text-forest-900 dark:text-[#ECF3EF] mb-3.5">
              Cuadro Comparativo: Zero vs First Conditional
            </h2>

            <div className="overflow-x-auto rounded-xl border border-cream-200 dark:border-moss-800">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-cream-100/70 dark:bg-moss-850 border-b border-cream-200 dark:border-moss-800 text-stone-600 dark:text-[#92A49B]">
                    <th className="py-3 px-4 font-semibold">Condicional</th>
                    <th className="py-3 px-4 font-semibold">¿Para qué se usa?</th>
                    <th className="py-3 px-4 font-semibold">Cláusula "If"</th>
                    <th className="py-3 px-4 font-semibold">Cláusula Principal (Resultado)</th>
                    <th className="py-3 px-4 font-semibold">Ejemplo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cream-100 dark:divide-moss-800 text-stone-800 dark:text-[#ECF3EF]">
                  <tr className="bg-cream-50/40 dark:bg-moss-950/30">
                    <td className="py-3.5 px-4 font-bold text-forest-900 dark:text-[#ECF3EF]">
                      Zero Conditional
                    </td>
                    <td className="py-3.5 px-4 text-stone-600 dark:text-[#92A49B]">
                      Hechos científicos, leyes físicas y verdades generales 100% seguras.
                    </td>
                    <td className="py-3.5 px-4 font-mono text-xs text-forest-600 dark:text-forest-400 font-semibold">
                      If + Present Simple
                    </td>
                    <td className="py-3.5 px-4 font-mono text-xs text-forest-600 dark:text-forest-400 font-semibold">
                      Present Simple
                    </td>
                    <td className="py-3.5 px-4 italic text-stone-600 dark:text-[#92A49B]">
                      If you heat water, it boils.
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-moss-900">
                    <td className="py-3.5 px-4 font-bold text-terracotta-600 dark:text-terracotta-400">
                      First Conditional
                    </td>
                    <td className="py-3.5 px-4 text-stone-600 dark:text-[#92A49B]">
                      Situaciones reales o planes con consecuencia probable en el futuro.
                    </td>
                    <td className="py-3.5 px-4 font-mono text-xs text-terracotta-600 dark:text-terracotta-400 font-semibold">
                      If + Present Simple
                    </td>
                    <td className="py-3.5 px-4 font-mono text-xs text-terracotta-600 dark:text-terracotta-400 font-semibold">
                      will + Verbo base
                    </td>
                    <td className="py-3.5 px-4 italic text-stone-600 dark:text-[#92A49B]">
                      If you study today, you will pass tomorrow.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() =>
                  copyRule(
                    'conditionals-summary',
                    'Zero Conditional: If + Present, Present (Leyes científicas y hechos seguros)\nFirst Conditional: If + Present, will + Verb (Planes y consecuencias reales futuras)'
                  )
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-cream-300 dark:border-moss-700 bg-white dark:bg-moss-900 hover:bg-cream-50 dark:hover:bg-moss-850 text-forest-900 dark:text-[#ECF3EF] text-xs font-medium transition-all shadow-2xs active:scale-95"
              >
                {copiedKey === 'conditionals-summary' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-forest-600 dark:text-forest-400 animate-pop-in" />
                    <span className="text-forest-700 dark:text-forest-300 font-semibold">¡Resumen copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-stone-500" />
                    <span>Copiar resumen Zero vs First</span>
                  </>
                )}
              </button>
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

      {/* SUB-TAB 3: DRAG AND DROP */}
      {activeSubTab === 'drag-drop' && (
        <div key="drag-drop" className="space-y-8 animate-slide-fade">
          <div className="p-5 sm:p-6 rounded-2xl border border-cream-200 dark:border-moss-800 bg-white dark:bg-moss-900 shadow-subtle dark:shadow-subtle-dark">
            <h2 className="text-base sm:text-lg font-bold text-forest-900 dark:text-[#ECF3EF] mb-1.5">
              Práctica de Arrastrar Palabras a Espacios (Word Bank)
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-[#92A49B] leading-relaxed">
              En estos ejercicios arrastras directamente los verbos o conectores a los slots dentro del párrafo.
              Si estás en un celular o tablet, también puedes simplemente tocar la palabra y luego tocar el slot vacío.
            </p>
          </div>

          <WordBankSlotQuiz exercise={dragSlotExercises[0]} />
          <WordBankSlotQuiz exercise={dragSlotExercises[1]} />
        </div>
      )}

      {/* SUB-TAB 4: SECOND & THIRD */}
      {activeSubTab === 'second-third' && (
        <div key="second-third" className="space-y-8 animate-slide-fade">
          {/* Guide banner for Session 2 */}
          <div className="p-5 sm:p-6 rounded-2xl border border-cream-200 dark:border-moss-800 bg-white dark:bg-moss-900 shadow-subtle dark:shadow-subtle-dark">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-terracotta-100 dark:bg-terracotta-900/40 text-terracotta-800 dark:text-terracotta-300">
                Material para Mañana (11 de Noviembre)
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-forest-900 dark:text-[#ECF3EF] mb-2">
              Second vs Third Conditional: Hipotéticos e Imposibles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm mt-4">
              <div className="p-4 rounded-xl border border-cream-200 dark:border-moss-800 bg-cream-50/60 dark:bg-moss-950/40">
                <div className="font-bold text-forest-900 dark:text-[#ECF3EF] mb-1 text-sm">
                  Second Conditional (Imaginario en Presente)
                </div>
                <div className="font-mono text-xs text-forest-600 dark:text-forest-400 mb-1.5 font-semibold">
                  If + Past Simple, would + Verbo base
                </div>
                <p className="text-stone-600 dark:text-[#92A49B] text-xs leading-relaxed">
                  "If I had wings, I would fly." (No tengo alas ahora, es solo una fantasía).
                </p>
              </div>

              <div className="p-4 rounded-xl border border-cream-200 dark:border-moss-800 bg-cream-50/60 dark:bg-moss-950/40">
                <div className="font-bold text-terracotta-600 dark:text-terracotta-400 mb-1 text-sm">
                  Third Conditional (Pasado Imposible / Lamento)
                </div>
                <div className="font-mono text-xs text-terracotta-600 dark:text-terracotta-400 mb-1.5 font-semibold">
                  If + Past Perfect (had + V3), would have + V3
                </div>
                <p className="text-stone-600 dark:text-[#92A49B] text-xs leading-relaxed">
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
