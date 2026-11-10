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
    <div className="border border-cream-200 dark:border-moss-800 rounded-xl p-5 sm:p-6 bg-white dark:bg-moss-900 shadow-subtle dark:shadow-subtle-dark">
      <div className="mb-5">
        <h3 className="text-base sm:text-lg font-bold text-forest-900 dark:text-[#ECF3EF] tracking-tight">
          {title}
        </h3>
        {subtitle && (
          <p className="text-xs sm:text-sm text-stone-600 dark:text-[#92A49B] mt-1 leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      <div className="space-y-6">
        {items.map((item, idx) => {
          const userChoice = selected[item.id];
          const hasAnswered = userChoice !== undefined;
          const isCorrect = userChoice === item.correctIndex;

          return (
            <div
              key={item.id}
              className="p-4 sm:p-5 rounded-xl border border-cream-200 dark:border-moss-800 bg-cream-50/50 dark:bg-moss-950/40"
            >
              {/* Question header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 mb-4">
                <div className="text-sm sm:text-base font-semibold text-forest-900 dark:text-[#ECF3EF] leading-snug">
                  <span className="font-semibold text-stone-400 dark:text-stone-500 mr-2 font-mono">
                    {idx + 1}.
                  </span>
                  {item.question}
                </div>
                {item.category && (
                  <span className="self-start sm:self-auto shrink-0 text-[11px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-forest-50 dark:bg-moss-850 text-forest-700 dark:text-forest-300 border border-forest-100 dark:border-moss-800">
                    {item.category.split(' - ')[0]}
                  </span>
                )}
              </div>

              {/* Options with min 48px touch height */}
              <div className="grid grid-cols-1 gap-2.5">
                {item.options.map((opt, optIdx) => {
                  let optStyle =
                    'border-cream-300 dark:border-moss-750 bg-white dark:bg-moss-900 text-stone-800 dark:text-[#ECF3EF] hover:border-forest-400 dark:hover:border-forest-600 shadow-2xs';

                  if (hasAnswered) {
                    if (optIdx === item.correctIndex) {
                      optStyle =
                        'border-forest-500 bg-forest-50/90 dark:bg-forest-950/60 text-forest-900 dark:text-forest-100 font-medium ring-1 ring-forest-500';
                    } else if (optIdx === userChoice && !isCorrect) {
                      optStyle =
                        'border-rose-400 bg-rose-50/90 dark:bg-rose-950/60 text-rose-900 dark:text-rose-100 ring-1 ring-rose-400';
                    } else {
                      optStyle =
                        'opacity-60 border-cream-200 dark:border-moss-800 bg-cream-100/40 dark:bg-moss-950/20 text-stone-400 dark:text-stone-500';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelect(item.id, optIdx)}
                      disabled={hasAnswered}
                      className={`text-left text-xs sm:text-sm min-h-[48px] px-4 py-3 rounded-xl border transition-all flex items-center justify-between gap-3 ${optStyle}`}
                    >
                      <span className="leading-relaxed">{opt}</span>
                      {hasAnswered && optIdx === item.correctIndex && (
                        <Check className="w-4 h-4 text-forest-600 dark:text-forest-400 shrink-0" />
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
                <div className="mt-4 pt-4 border-t border-cream-200 dark:border-moss-800 text-xs sm:text-sm flex flex-col gap-2.5">
                  <div
                    className={`p-3.5 rounded-xl border flex items-start gap-3 ${
                      isCorrect
                        ? 'bg-forest-50/90 dark:bg-forest-950/40 border-forest-200 dark:border-forest-800 text-forest-900 dark:text-forest-200'
                        : 'bg-rose-50/90 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900 text-rose-900 dark:text-rose-200'
                    }`}
                  >
                    <Lightbulb className="w-4 h-4 shrink-0 mt-0.5 text-terracotta-500 dark:text-terracotta-400" />
                    <div className="space-y-1">
                      <p className="font-semibold text-xs sm:text-sm">
                        {isCorrect ? '¡Excelente respuesta!' : 'Respuesta a corregir:'}
                      </p>
                      <p className="leading-relaxed opacity-90">{item.explanation}</p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => handleReset(item.id)}
                      className="min-h-[36px] px-3 py-1.5 text-stone-500 hover:text-stone-800 dark:hover:text-[#ECF3EF] flex items-center gap-1.5 font-medium transition-colors rounded-lg hover:bg-cream-100 dark:hover:bg-moss-800"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
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
