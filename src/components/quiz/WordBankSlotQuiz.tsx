import React, { useState } from 'react';
import { Check, X, RotateCcw, Lightbulb, MoveHorizontal } from 'lucide-react';
import { DragSlotExercise } from '../../types';

import { fireMasteryCelebration } from '../../utils/confetti';

interface WordBankSlotQuizProps {
  exercise: DragSlotExercise;
}

export const WordBankSlotQuiz: React.FC<WordBankSlotQuizProps> = ({ exercise }) => {
  const [placedWords, setPlacedWords] = useState<Record<string, string>>({});
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [isEvaluated, setIsEvaluated] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  const usedWords = Object.values(placedWords);
  const availableWords = exercise.pool.filter((word) => !usedWords.includes(word));

  const handleDragStart = (e: React.DragEvent, word: string) => {
    e.dataTransfer.setData('text/plain', word);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, slotId: string) => {
    e.preventDefault();
    const word = e.dataTransfer.getData('text/plain');
    if (!word) return;

    setPlacedWords((prev) => ({ ...prev, [slotId]: word }));
    setIsEvaluated(false);
  };

  const handleBankWordClick = (word: string) => {
    if (selectedWord === word) {
      setSelectedWord(null);
    } else {
      setSelectedWord(word);
    }
  };

  const handleSlotClick = (slotId: string) => {
    if (selectedWord) {
      setPlacedWords((prev) => ({ ...prev, [slotId]: selectedWord }));
      setSelectedWord(null);
      setIsEvaluated(false);
    } else if (placedWords[slotId]) {
      setPlacedWords((prev) => {
        const next = { ...prev };
        delete next[slotId];
        return next;
      });
      setIsEvaluated(false);
    }
  };

  const totalSlots = Object.keys(exercise.correctAnswers).length;
  const filledSlots = Object.keys(placedWords).length;
  const correctCount = Object.entries(exercise.correctAnswers).filter(
    ([slotId, correctWord]) => placedWords[slotId] === correctWord
  ).length;
  const allCorrect = isEvaluated && correctCount === totalSlots;

  const handleCheck = () => {
    setIsEvaluated(true);
    setShowSolution(true);

    const willBeAllCorrect =
      Object.entries(exercise.correctAnswers).filter(
        ([slotId, correctWord]) => placedWords[slotId] === correctWord
      ).length === totalSlots;

    if (willBeAllCorrect) {
      fireMasteryCelebration();
    }
  };

  const handleReset = () => {
    setPlacedWords({});
    setSelectedWord(null);
    setIsEvaluated(false);
    setShowSolution(false);
  };

  return (
    <div className="border border-cream-200 dark:border-moss-800 rounded-xl p-5 sm:p-6 bg-white dark:bg-moss-900 shadow-subtle dark:shadow-subtle-dark">
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-1">
          <MoveHorizontal className="w-4 h-4 text-forest-600 dark:text-forest-400" />
          <h3 className="text-base sm:text-lg font-bold text-forest-900 dark:text-[#ECF3EF] tracking-tight">
            {exercise.title}
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-[#92A49B] leading-relaxed">
          {exercise.instruction}{' '}
          <span className="italic text-stone-400 dark:text-stone-500">
            (Arrastra la palabra o haz clic en ella y luego en el espacio vacío)
          </span>
        </p>
      </div>

      {/* Word bank pool */}
      <div className="mb-6 p-4 rounded-xl border border-dashed border-cream-300 dark:border-moss-700 bg-cream-50/70 dark:bg-moss-950/40">
        <div className="text-[11px] font-mono uppercase tracking-wider text-stone-500 dark:text-[#92A49B] mb-2.5 font-semibold">
          Banco de palabras disponibles:
        </div>
        <div className="flex flex-wrap gap-2.5 min-h-[44px] items-center">
          {availableWords.length === 0 ? (
            <span className="text-xs text-stone-400 italic py-1 animate-fade-in">
              Todas las palabras han sido colocadas en los espacios.
            </span>
          ) : (
            availableWords.map((word) => {
              const isSelected = selectedWord === word;
              return (
                <div
                  key={word}
                  draggable
                  onDragStart={(e) => handleDragStart(e, word)}
                  onClick={() => handleBankWordClick(word)}
                  className={`cursor-grab active:cursor-grabbing min-h-[38px] px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold border shadow-2xs transition-all select-none flex items-center justify-center ${
                    isSelected
                      ? 'border-forest-600 bg-forest-600 text-white dark:border-forest-400 dark:bg-forest-400 dark:text-moss-950 ring-2 ring-forest-300 scale-105'
                      : 'border-cream-300 dark:border-moss-700 bg-white dark:bg-moss-850 text-stone-800 dark:text-[#ECF3EF] hover:border-forest-400 dark:hover:border-forest-500 hover:shadow-xs active:scale-95'
                  }`}
                >
                  {word}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Sentences with slots */}
      <div className="space-y-4 mb-6">
        {exercise.template.map((row) => {
          const placed = placedWords[row.slotId];
          const isSlotCorrect = isEvaluated && placed === exercise.correctAnswers[row.slotId];
          const isSlotWrong = isEvaluated && placed && placed !== exercise.correctAnswers[row.slotId];

          return (
            <div
              key={row.slotId}
              className={`p-4 rounded-xl border border-cream-200 dark:border-moss-800 bg-cream-50/40 dark:bg-moss-950/30 text-sm sm:text-base text-stone-800 dark:text-[#ECF3EF] flex flex-wrap items-center gap-2.5 leading-relaxed ${
                isSlotWrong ? 'animate-shake-soft' : ''
              }`}
            >
              <span>{row.beforeSlot}</span>

              {/* Drop slot (animates on word placement) */}
              <div
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, row.slotId)}
                onClick={() => handleSlotClick(row.slotId)}
                title={placed ? 'Clic para regresar al banco' : 'Arrastra o haz clic aquí para insertar'}
                className={`min-w-32 sm:min-w-40 min-h-[42px] px-3 rounded-lg border text-center inline-flex items-center justify-center font-medium transition-all cursor-pointer ${
                  placed
                    ? isEvaluated
                      ? isSlotCorrect
                        ? 'border-forest-500 bg-forest-100 dark:bg-forest-950 text-forest-900 dark:text-forest-100 font-semibold animate-pop-in'
                        : 'border-rose-400 bg-rose-100 dark:bg-rose-950 text-rose-900 dark:text-rose-100 font-semibold'
                      : 'border-forest-300 dark:border-forest-700 bg-white dark:bg-moss-850 text-forest-900 dark:text-[#ECF3EF] shadow-2xs font-semibold animate-snap-in'
                    : selectedWord
                    ? 'border-dashed border-terracotta-400 bg-terracotta-50/60 dark:bg-terracotta-950/40 animate-pulse text-terracotta-700'
                    : 'border-dashed border-cream-300 dark:border-moss-700 bg-cream-100/60 dark:bg-moss-950/60 text-stone-400 hover:border-forest-400'
                }`}
              >
                {placed ? (
                  <span className="flex items-center gap-1.5 animate-snap-in">
                    <span>{placed}</span>
                    {isEvaluated &&
                      (isSlotCorrect ? (
                        <Check className="w-3.5 h-3.5 text-forest-600 dark:text-forest-400 shrink-0 animate-pop-in" />
                      ) : (
                        <X className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400 shrink-0 animate-pop-in" />
                      ))}
                  </span>
                ) : (
                  <span className="text-[11px] text-stone-400 dark:text-stone-500 italic">
                    [Soltar aquí]
                  </span>
                )}
              </div>

              <span>{row.afterSlot}</span>
            </div>
          );
        })}
      </div>

      {/* Control buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3.5 border-t border-cream-200 dark:border-moss-800 text-xs sm:text-sm">
        <div className="flex items-center gap-2">
          <button
            onClick={handleCheck}
            disabled={filledSlots === 0}
            className="min-h-[38px] px-4 py-2 rounded-lg bg-forest-600 hover:bg-forest-500 disabled:opacity-40 text-white dark:bg-forest-400 dark:hover:bg-forest-300 dark:text-moss-950 font-semibold transition-all shadow-xs active:scale-95"
          >
            Comprobar ({filledSlots}/{totalSlots})
          </button>
          {filledSlots > 0 && (
            <button
              onClick={handleReset}
              className="min-h-[38px] px-3 py-1.5 text-stone-500 hover:text-stone-800 dark:hover:text-[#ECF3EF] flex items-center gap-1.5 rounded-lg hover:bg-cream-100 dark:hover:bg-moss-800 transition-all active:scale-95"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reiniciar ejercicio
            </button>
          )}
        </div>

        {isEvaluated && (
          <span
            className={`font-semibold text-xs sm:text-sm animate-pop-in ${
              allCorrect
                ? 'text-forest-600 dark:text-forest-400'
                : 'text-terracotta-600 dark:text-terracotta-400'
            }`}
          >
            {allCorrect
              ? '¡Perfecto! Todos los slots correctos'
              : `${correctCount} de ${totalSlots} correctos`}
          </span>
        )}
      </div>

      {/* Solution & Justification */}
      {showSolution && (
        <div className="mt-4 p-4 rounded-xl border border-cream-200 dark:border-moss-700 bg-cream-100/90 dark:bg-moss-850 text-xs sm:text-sm space-y-2 animate-slide-fade">
          <div className="flex items-start gap-2.5">
            <Lightbulb className="w-4 h-4 text-terracotta-500 dark:text-terracotta-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-forest-900 dark:text-[#ECF3EF] mb-1">
                Solución y justificación gramatical:
              </p>
              <div className="text-stone-700 dark:text-[#92A49B] leading-relaxed">
                {exercise.explanation}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
