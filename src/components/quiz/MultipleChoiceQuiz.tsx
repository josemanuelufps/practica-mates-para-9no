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
    <div className="border border-slate-200 dark:border-navy-700 rounded-xl p-5 sm:p-6 bg-white dark:bg-navy-800 shadow-subtle dark:shadow-subtle-dark">
      <div className="mb-5">
        <h3 className="text-base sm:text-lg font-bold text-navy-600 dark:text-ice-300 tracking-tight">
          {title}
        </h3>
        {subtitle && (
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
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
              className="p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-navy-700 bg-ice-100/50 dark:bg-navy-900/40"
            >
              {/* Question header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 mb-4">
                <div className="text-sm sm:text-base font-semibold text-navy-600 dark:text-ice-300 leading-snug">
                  <span className="font-semibold text-slate-400 dark:text-slate-500 mr-2 font-mono">
                    {idx + 1}.
                  </span>
                  {item.question}
                </div>
                {item.category && (
                  <span className="self-start sm:self-auto shrink-0 text-xs font-mono uppercase px-2.5 py-0.5 rounded-full bg-navy-50 dark:bg-navy-900 text-navy-600 dark:text-slate-300 border border-slate-200 dark:border-navy-700">
                    {item.category.split(' - ')[0]}
                  </span>
                )}
              </div>

              {/* Options with active tactile feel */}
              <div className="grid grid-cols-1 gap-2.5">
                {item.options.map((opt, optIdx) => {
                  let optStyle =
                    'border-slate-300 dark:border-navy-600 bg-white dark:bg-navy-900 text-slate-800 dark:text-ice-300 hover:border-crimson-400 dark:hover:border-crimson-500 shadow-2xs active:scale-[0.99]';

                  let animationClass = '';

                  if (hasAnswered) {
                    if (optIdx === item.correctIndex) {
                      optStyle =
                        'border-success-500 bg-success-50/90 dark:bg-success-950/60 text-success-900 dark:text-success-100 font-medium ring-2 ring-success-500/40';
                      animationClass = 'animate-pop-in';
                    } else if (optIdx === userChoice && !isCorrect) {
                      optStyle =
                        'border-crimson-500 bg-crimson-50/90 dark:bg-crimson-950/60 text-crimson-900 dark:text-crimson-100 ring-2 ring-crimson-400/40';
                      animationClass = 'animate-shake-soft';
                    } else {
                      optStyle =
                        'opacity-50 border-slate-200 dark:border-navy-700 bg-ice-100/40 dark:bg-navy-950/20 text-slate-400 dark:text-slate-500';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelect(item.id, optIdx)}
                      disabled={hasAnswered}
                      className={`text-left text-xs sm:text-sm min-h-[48px] px-4 py-3 rounded-xl border transition-all flex items-center justify-between gap-3 ${optStyle} ${animationClass}`}
                    >
                      <span className="leading-relaxed">{opt}</span>
                      {hasAnswered && optIdx === item.correctIndex && (
                        <Check className="w-4 h-4 text-success-600 dark:text-success-400 shrink-0 animate-pop-in" />
                      )}
                      {hasAnswered && optIdx === userChoice && !isCorrect && (
                        <X className="w-4 h-4 text-crimson-600 dark:text-crimson-400 shrink-0 animate-pop-in" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback and rationale banner with smooth slide-fade */}
              {hasAnswered && showExplanation[item.id] && (
                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-navy-700 text-xs sm:text-sm flex flex-col gap-2.5 animate-slide-fade">
                  <div
                    className={`p-3.5 rounded-xl border flex items-start gap-3 ${
                      isCorrect
                        ? 'bg-success-50/90 dark:bg-success-950/40 border-success-200 dark:border-success-800 text-success-900 dark:text-success-200'
                        : 'bg-crimson-50/90 dark:bg-crimson-950/40 border-crimson-200 dark:border-crimson-900 text-crimson-900 dark:text-crimson-200'
                    }`}
                  >
                    <Lightbulb className="w-4 h-4 shrink-0 mt-0.5 text-crimson-500 dark:text-crimson-400" />
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
                      className="min-h-[44px] px-3 py-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-ice-300 flex items-center gap-1.5 font-medium transition-all rounded-xl hover:bg-ice-200 dark:hover:bg-navy-700 active:scale-95"
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
