import React, { useState } from 'react';
import { Check, X, RotateCcw, Lightbulb, MoveHorizontal } from 'lucide-react';
import { DragSlotExercise } from '../../types';

interface WordBankSlotQuizProps {
  exercise: DragSlotExercise;
}

export const WordBankSlotQuiz: React.FC<WordBankSlotQuizProps> = ({ exercise }) => {
  // Slots state: maps slotId -> placed word
  const [placedWords, setPlacedWords] = useState<Record<string, string>>({});
  // Currently clicked word from bank (for click-to-place accessibility)
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  // Evaluated state
  const [isEvaluated, setIsEvaluated] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  // Remaining words in bank
  const usedWords = Object.values(placedWords);
  const availableWords = exercise.pool.filter((word) => !usedWords.includes(word));

  // Drag and drop handlers
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

    // If slot already had a word, it will be replaced
    setPlacedWords((prev) => ({ ...prev, [slotId]: word }));
    setIsEvaluated(false);
  };

  // Click-to-slot handlers
  const handleBankWordClick = (word: string) => {
    if (selectedWord === word) {
      setSelectedWord(null);
    } else {
      setSelectedWord(word);
    }
  };

  const handleSlotClick = (slotId: string) => {
    if (selectedWord) {
      // Place selected word into slot
      setPlacedWords((prev) => ({ ...prev, [slotId]: selectedWord }));
      setSelectedWord(null);
      setIsEvaluated(false);
    } else if (placedWords[slotId]) {
      // Return word back to pool
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
    <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 bg-white dark:bg-zinc-900/60 shadow-sm">
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <MoveHorizontal className="w-4 h-4 text-zinc-500" />
          <h3 className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            {exercise.title}
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
          {exercise.instruction}{' '}
          <span className="italic text-zinc-400 dark:text-zinc-500">
            (Puedes arrastrar cada palabra o hacer clic sobre ella y luego clic en el espacio vacío)
          </span>
        </p>
      </div>

      {/* Word bank pool */}
      <div className="mb-5 p-3 rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/40">
        <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2 font-semibold">
          Banco de palabras disponibles:
        </div>
        <div className="flex flex-wrap gap-2 min-h-9 items-center">
          {availableWords.length === 0 ? (
            <span className="text-xs text-zinc-400 italic">
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
                  className={`cursor-grab active:cursor-grabbing px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium border shadow-xs transition-all select-none ${
                    isSelected
                      ? 'border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 ring-2 ring-zinc-400'
                      : 'border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:border-zinc-400 dark:hover:border-zinc-500 hover:shadow-sm'
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
              className="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/60 dark:bg-zinc-900/20 text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 flex flex-wrap items-center gap-1.5 leading-relaxed"
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
                        ? 'border-emerald-500 bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-100'
                        : 'border-rose-500 bg-rose-100 dark:bg-rose-950 text-rose-900 dark:text-rose-100'
                      : 'border-zinc-400 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xs'
                    : selectedWord
                    ? 'border-dashed border-zinc-500 dark:border-zinc-400 bg-zinc-100 dark:bg-zinc-800 animate-pulse text-zinc-400'
                    : 'border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-100/70 dark:bg-zinc-950 text-zinc-400'
                }`}
              >
                {placed ? (
                  <span className="flex items-center gap-1.5">
                    <span>{placed}</span>
                    {isEvaluated && (
                      isSlotCorrect ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      ) : (
                        <X className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400 shrink-0" />
                      )
                    )}
                  </span>
                ) : (
                  <span className="text-[11px] text-zinc-400 dark:text-zinc-500 italic">
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
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-zinc-200 dark:border-zinc-800 text-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={handleCheck}
            disabled={filledSlots === 0}
            className="px-3.5 py-1.5 rounded bg-zinc-900 hover:bg-zinc-800 disabled:opacity-40 text-white dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 font-medium transition-colors"
          >
            Comprobar ({filledSlots}/{totalSlots})
          </button>
          {filledSlots > 0 && (
            <button
              onClick={handleReset}
              className="px-2.5 py-1.5 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300 flex items-center gap-1 transition-colors"
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
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-amber-600 dark:text-amber-400'
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
        <div className="mt-4 p-3.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800/80 text-xs space-y-2">
          <div className="flex items-start gap-2">
            <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                Solución y justificación gramatical:
              </p>
              <div className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {exercise.explanation}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
