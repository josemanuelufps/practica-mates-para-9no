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
    <div className="border border-slate-200 dark:border-navy-700 rounded-xl p-5 sm:p-6 bg-white dark:bg-navy-800 shadow-subtle dark:shadow-subtle-dark">
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-1">
          <MoveHorizontal className="w-4 h-4 text-crimson-600 dark:text-crimson-400" />
          <h3 className="text-base sm:text-lg font-bold text-navy-600 dark:text-ice-300 tracking-tight">
            {exercise.title}
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          {exercise.instruction}{' '}
          <span className="italic text-slate-400 dark:text-slate-500">
            (Arrastra la palabra o haz clic en ella y luego en el espacio vacío)
          </span>
        </p>
      </div>

      {/* Word bank pool */}
      <div className="mb-6 p-4 rounded-xl border border-dashed border-slate-300 dark:border-navy-600 bg-ice-100/70 dark:bg-navy-900/40">
        <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5 font-semibold">
          Banco de palabras disponibles:
        </div>
        <div className="flex flex-wrap gap-2.5 min-h-[44px] items-center">
          {availableWords.length === 0 ? (
            <span className="text-xs text-slate-400 italic py-1 animate-fade-in">
              Todas las palabras han sido colocadas en los espacios.
            </span>
          ) : (
            availableWords.map((word) => {
              const isSelected = selectedWord === word;
              return (
                <button
                  key={word}
                  type="button"
                  draggable
                  onDragStart={(e) => handleDragStart(e, word)}
                  onClick={() => handleBankWordClick(word)}
                  aria-pressed={isSelected}
                  className={`cursor-grab active:cursor-grabbing min-h-[44px] px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border shadow-2xs transition-all select-none flex items-center justify-center ${
                    isSelected
                      ? 'border-crimson-600 bg-crimson-600 text-white dark:border-crimson-400 dark:bg-crimson-500 dark:text-white ring-2 ring-crimson-300 scale-105'
                      : 'border-slate-300 dark:border-navy-600 bg-white dark:bg-navy-700 text-slate-800 dark:text-ice-300 hover:border-crimson-400 dark:hover:border-crimson-500 hover:shadow-xs active:scale-95'
                  }`}
                >
                  {word}
                </button>
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
              className={`p-4 rounded-xl border border-slate-200 dark:border-navy-700 bg-ice-100/40 dark:bg-navy-900/30 text-sm sm:text-base text-slate-800 dark:text-ice-300 flex flex-wrap items-center gap-2.5 leading-relaxed ${
                isSlotWrong ? 'animate-shake-soft' : ''
              }`}
            >
              <span>{row.beforeSlot}</span>

              {/* Accessible drop slot button */}
              <button
                type="button"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, row.slotId)}
                onClick={() => handleSlotClick(row.slotId)}
                title={placed ? 'Clic para regresar al banco' : 'Arrastra o haz clic aquí para insertar'}
                aria-label={placed ? `Slot ocupado por ${placed}. Clic para vaciar` : 'Slot vacío. Clic para colocar la palabra seleccionada'}
                className={`min-w-32 sm:min-w-40 min-h-[44px] px-3 rounded-xl border text-center inline-flex items-center justify-center font-medium transition-all cursor-pointer ${
                  placed
                    ? isEvaluated
                      ? isSlotCorrect
                        ? 'border-success-500 bg-success-100 dark:bg-success-950 text-success-900 dark:text-success-100 font-semibold animate-pop-in'
                        : 'border-crimson-500 bg-crimson-100 dark:bg-crimson-950 text-crimson-900 dark:text-crimson-100 font-semibold'
                      : 'border-navy-300 dark:border-navy-600 bg-white dark:bg-navy-700 text-navy-600 dark:text-ice-300 shadow-2xs font-semibold animate-snap-in'
                    : selectedWord
                    ? 'border-dashed border-crimson-400 bg-crimson-50/60 dark:bg-crimson-950/40 animate-pulse text-crimson-700 dark:text-crimson-300'
                    : 'border-dashed border-slate-300 dark:border-navy-600 bg-ice-200/60 dark:bg-navy-900/60 text-slate-400 hover:border-crimson-400'
                }`}
              >
                {placed ? (
                  <span className="flex items-center gap-1.5 animate-snap-in">
                    <span>{placed}</span>
                    {isEvaluated &&
                      (isSlotCorrect ? (
                        <Check className="w-3.5 h-3.5 text-success-600 dark:text-success-400 shrink-0 animate-pop-in" />
                      ) : (
                        <X className="w-3.5 h-3.5 text-crimson-600 dark:text-crimson-400 shrink-0 animate-pop-in" />
                      ))}
                  </span>
                ) : (
                  <span className="text-xs text-slate-400 dark:text-slate-500 italic">
                    [Soltar aquí]
                  </span>
                )}
              </button>

              <span>{row.afterSlot}</span>
            </div>
          );
        })}
      </div>

      {/* Control buttons with standard 44px min-touch height */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3.5 border-t border-slate-200 dark:border-navy-700 text-xs sm:text-sm">
        <div className="flex items-center gap-2">
          <button
            onClick={handleCheck}
            disabled={filledSlots === 0}
            className="min-h-[44px] px-4 py-2 rounded-xl bg-crimson-600 hover:bg-crimson-500 disabled:opacity-40 text-white dark:bg-crimson-500 dark:hover:bg-crimson-400 dark:text-white font-semibold transition-all shadow-xs active:scale-95"
          >
            Comprobar ({filledSlots}/{totalSlots})
          </button>
          {filledSlots > 0 && (
            <button
              onClick={handleReset}
              className="min-h-[44px] px-3 py-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-ice-300 flex items-center gap-1.5 rounded-xl hover:bg-ice-200 dark:hover:bg-navy-700 transition-all active:scale-95"
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
                ? 'text-success-600 dark:text-success-400'
                : 'text-crimson-600 dark:text-crimson-400'
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
        <div className="mt-4 p-4 rounded-xl border border-slate-300 dark:border-navy-600 bg-ice-200/90 dark:bg-navy-900 text-xs sm:text-sm space-y-2 animate-slide-fade">
          <div className="flex items-start gap-2.5">
            <Lightbulb className="w-4 h-4 text-crimson-500 dark:text-crimson-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-navy-600 dark:text-ice-300 mb-1">
                Solución y justificación gramatical:
              </p>
              <div className="text-slate-700 dark:text-slate-400 leading-relaxed">
                {exercise.explanation}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
