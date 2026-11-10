import React, { useState } from 'react';
import { Check, X, RotateCcw, Lightbulb } from 'lucide-react';
import { MultipleChoiceItem } from '../../types';

interface MultipleChoiceQuizProps {
  title: string;
  subtitle?: string;
  items: MultipleChoiceItem[];
}

export const MultipleChoiceQuiz: React.FC<MultipleChoiceQuizProps> = ({
  title,
  subtitle,
  items,
}) => {
  const [selected, setSelected] = useState<Record<string, number>>({});
  const [showExplanation, setShowExplanation] = useState<Record<string, boolean>>({});

  const handleSelect = (itemId: string, optionIndex: number) => {
    setSelected((prev) => ({ ...prev, [itemId]: optionIndex }));
    setShowExplanation((prev) => ({ ...prev, [itemId]: true }));
  };

  const handleReset = (itemId: string) => {
    setSelected((prev) => {
      const next = { ...prev };
      delete next[itemId];
      return next;
    });
    setShowExplanation((prev) => {
      const next = { ...prev };
      delete next[itemId];
      return next;
    });
  };

  return (
    <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 bg-white dark:bg-zinc-900/60 shadow-sm">
      <div className="mb-4">
        <h3 className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          {title}
        </h3>
        {subtitle && (
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
            {subtitle}
          </p>
        )}
      </div>

      <div className="space-y-5">
        {items.map((item, idx) => {
          const userChoice = selected[item.id];
          const hasAnswered = userChoice !== undefined;
          const isCorrect = userChoice === item.correctIndex;

          return (
            <div
              key={item.id}
              className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40"
            >
              {/* Question header */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100 leading-snug">
                  <span className="font-semibold text-zinc-400 dark:text-zinc-500 mr-2">
                    {idx + 1}.
                  </span>
                  {item.question}
                </div>
                {item.category && (
                  <span className="shrink-0 text-[11px] font-mono uppercase px-2 py-0.5 rounded bg-zinc-200/80 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                    {item.category.split(' - ')[0]}
                  </span>
                )}
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 gap-2">
                {item.options.map((opt, optIdx) => {
                  let optStyle =
                    'border-zinc-200 dark:border-zinc-700/80 bg-white dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 hover:border-zinc-400 dark:hover:border-zinc-600';

                  if (hasAnswered) {
                    if (optIdx === item.correctIndex) {
                      optStyle =
                        'border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100 font-medium ring-1 ring-emerald-500';
                    } else if (optIdx === userChoice && !isCorrect) {
                      optStyle =
                        'border-rose-500 bg-rose-50/80 dark:bg-rose-950/40 text-rose-900 dark:text-rose-100 ring-1 ring-rose-500';
                    } else {
                      optStyle =
                        'opacity-60 border-zinc-200 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-900/20 text-zinc-400 dark:text-zinc-500';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelect(item.id, optIdx)}
                      disabled={hasAnswered}
                      className={`text-left text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border transition-all flex items-center justify-between gap-3 ${optStyle}`}
                    >
                      <span>{opt}</span>
                      {hasAnswered && optIdx === item.correctIndex && (
                        <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      )}
                      {hasAnswered && optIdx === userChoice && !isCorrect && (
                        <X className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback and rationale banner */}
              {hasAnswered && showExplanation[item.id] && (
                <div className="mt-3.5 pt-3 border-t border-zinc-200 dark:border-zinc-800/80 text-xs flex flex-col gap-2">
                  <div
                    className={`p-3 rounded-lg border flex items-start gap-2.5 ${
                      isCorrect
                        ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-900 text-emerald-900 dark:text-emerald-200'
                        : 'bg-rose-50 dark:bg-rose-950/30 border-rose-300 dark:border-rose-900 text-rose-900 dark:text-rose-200'
                    }`}
                  >
                    <Lightbulb className="w-4 h-4 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
                    <div className="space-y-1">
                      <p className="font-semibold">
                        {isCorrect ? '¡Excelente respuesta!' : 'Respuesta a corregir:'}
                      </p>
                      <p className="leading-relaxed opacity-90">{item.explanation}</p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => handleReset(item.id)}
                      className="px-2.5 py-1 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300 flex items-center gap-1 font-medium transition-colors"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Reintentar pregunta
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
