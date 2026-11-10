import React, { useState } from 'react';
import { Check, X, RotateCcw, Lightbulb, MoveHorizontal } from 'lucide-react';
import { DragSlotExercise } from '../../types';

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

  const handleCheck = () => {
    setIsEvaluated(true);
    setShowSolution(true);
  };

  const handleReset = () => {
    setPlacedWords({});
    setSelectedWord(null);
    setIsEvaluated(false);
    setShowSolution(false);
  };

  const totalSlots = Object.keys(exercise.correctAnswers).length;
  const filledSlots = Object.keys(placedWords).length;
  const correctCount = Object.entries(exercise.correctAnswers).filter(
    ([slotId, correctWord]) => placedWords[slotId] === correctWord
  ).length;
  const allCorrect = isEvaluated && correctCount === totalSlots;

  return (
    <div className="border border-cream-200 dark:border-moss-800 rounded-xl p-5 bg-white dark:bg-moss-900 shadow-subtle dark:shadow-subtle-dark">
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <MoveHorizontal className="w-4 h-4 text-forest-600 dark:text-forest-400" />
          <h3 className="text-base sm:text-lg font-semibold text-forest-900 dark:text-[#ECF3EF] tracking-tight">
            {exercise.title}
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-[#92A49B]">
          {exercise.instruction}{' '}
          <span className="italic text-stone-400 dark:text-stone-500">
            (Arrastra la palabra o haz clic en ella y luego en el espacio vacío)
          </span>
        </p>
      </div>

      {/* Word bank pool */}
      <div className="mb-5 p-3.5 rounded-lg border border-dashed border-cream-300 dark:border-moss-700 bg-cream-50/70 dark:bg-moss-950/40">
        <div className="text-[11px] font-mono uppercase tracking-wider text-stone-500 dark:text-[#92A49B] mb-2 font-semibold">
          Banco de palabras disponibles:
        </div>
        <div className="flex flex-wrap gap-2 min-h-9 items-center">
          {availableWords.length === 0 ? (
            <span className="text-xs text-stone-400 italic">
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
                  className={`cursor-grab active:cursor-grabbing px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium border shadow-2xs transition-all select-none ${
                    isSelected
                      ? 'border-forest-600 bg-forest-600 text-white dark:border-forest-400 dark:bg-forest-400 dark:text-moss-950 ring-2 ring-forest-300'
                      : 'border-cream-300 dark:border-moss-700 bg-white dark:bg-moss-850 text-stone-800 dark:text-[#ECF3EF] hover:border-forest-400 dark:hover:border-forest-500 hover:shadow-xs'
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
      <div className="space-y-3.5 mb-5">
        {exercise.template.map((row) => {
          const placed = placedWords[row.slotId];
          const isSlotCorrect = isEvaluated && placed === exercise.correctAnswers[row.slotId];

          return (
            <div
              key={row.slotId}
              className="p-3.5 rounded-lg border border-cream-200 dark:border-moss-800 bg-cream-50/40 dark:bg-moss-950/30 text-sm sm:text-base text-stone-800 dark:text-[#ECF3EF] flex flex-wrap items-center gap-2 leading-relaxed"
            >
              <span>{row.beforeSlot}</span>

              {/* Drop slot */}
              <div
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, row.slotId)}
                onClick={() => handleSlotClick(row.slotId)}
                title={placed ? 'Clic para regresar al banco' : 'Arrastra o haz clic aquí para insertar'}
                className={`min-w-28 sm:min-w-36 h-8 px-2.5 rounded-md border text-center flex items-center justify-center font-medium transition-all cursor-pointer ${
                  placed
                    ? isEvaluated
                      ? isSlotCorrect
                        ? 'border-forest-500 bg-forest-100 dark:bg-forest-950 text-forest-900 dark:text-forest-100'
                        : 'border-rose-400 bg-rose-100 dark:bg-rose-950 text-rose-900 dark:text-rose-100'
                      : 'border-forest-300 dark:border-forest-700 bg-white dark:bg-moss-850 text-forest-900 dark:text-[#ECF3EF] shadow-2xs'
                    : selectedWord
                    ? 'border-dashed border-terracotta-400 bg-terracotta-50/50 dark:bg-terracotta-950/30 animate-pulse text-terracotta-700'
                    : 'border-dashed border-cream-300 dark:border-moss-700 bg-cream-100/60 dark:bg-moss-950/60 text-stone-400'
                }`}
              >
                {placed ? (
                  <span className="flex items-center gap-1.5">
                    <span>{placed}</span>
                    {isEvaluated && (
                      isSlotCorrect ? (
                        <Check className="w-3.5 h-3.5 text-forest-600 dark:text-forest-400 shrink-0" />
                      ) : (
                        <X className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400 shrink-0" />
                      )
                    )}
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
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-cream-200 dark:border-moss-800 text-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={handleCheck}
            disabled={filledSlots === 0}
            className="px-3.5 py-1.5 rounded-md bg-forest-600 hover:bg-forest-500 disabled:opacity-40 text-white dark:bg-forest-400 dark:hover:bg-forest-300 dark:text-moss-950 font-medium transition-colors shadow-xs"
          >
            Comprobar ({filledSlots}/{totalSlots})
          </button>
          {filledSlots > 0 && (
            <button
              onClick={handleReset}
              className="px-2.5 py-1.5 text-stone-500 hover:text-stone-800 dark:hover:text-[#ECF3EF] flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reiniciar ejercicio
            </button>
          )}
        </div>

        {isEvaluated && (
          <span
            className={`font-semibold ${
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
        <div className="mt-4 p-3.5 rounded-lg border border-cream-200 dark:border-moss-700 bg-cream-100/90 dark:bg-moss-850 text-xs space-y-2">
          <div className="flex items-start gap-2">
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
