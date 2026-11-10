import React, { useState } from 'react';
import { Check, X, HelpCircle, RotateCcw } from 'lucide-react';
import { FillBlankItem } from '../../types';

interface FillBlankQuizProps {
  title: string;
  subtitle?: string;
  items: FillBlankItem[];
}

export const FillBlankQuiz: React.FC<FillBlankQuizProps> = ({
  title,
  subtitle,
  items,
}) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [showExplanation, setShowExplanation] = useState<Record<string, boolean>>({});

  const handleInputChange = (id: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    if (checked[id]) {
      setChecked((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }
  };

  const normalize = (text: string) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[’`]/g, "'")
      .replace(/\s+/g, ' ');

  const handleCheck = (id: string, accepted: string[]) => {
    const userVal = normalize(answers[id] || '');
    const isCorrect = accepted.some((acc) => normalize(acc) === userVal);
    setChecked((prev) => ({ ...prev, [id]: true }));
    setShowExplanation((prev) => ({ ...prev, [id]: true }));
    return isCorrect;
  };

  const handleReset = (id: string) => {
    setAnswers((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    setChecked((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    setShowExplanation((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  return (
    <div className="border border-cream-200 dark:border-moss-800 rounded-xl p-5 bg-white dark:bg-moss-900 shadow-subtle dark:shadow-subtle-dark">
      <div className="mb-4">
        <h3 className="text-base sm:text-lg font-semibold text-forest-900 dark:text-[#ECF3EF] tracking-tight">
          {title}
        </h3>
        {subtitle && (
          <p className="text-xs sm:text-sm text-stone-600 dark:text-[#92A49B] mt-0.5">
            {subtitle}
          </p>
        )}
      </div>

      <div className="space-y-4">
        {items.map((item, idx) => {
          const isEvaluated = !!checked[item.id];
          const userVal = normalize(answers[item.id] || '');
          const isCorrect =
            isEvaluated &&
            item.acceptedAnswers.some((acc) => normalize(acc) === userVal);

          return (
            <div
              key={item.id}
              className={`p-3.5 rounded-lg border transition-colors ${
                isEvaluated
                  ? isCorrect
                    ? 'border-forest-300 bg-forest-50/70 dark:border-forest-700/80 dark:bg-forest-900/30'
                    : 'border-rose-200 bg-rose-50/60 dark:border-rose-900/60 dark:bg-rose-950/30'
                  : 'border-cream-200 dark:border-moss-800 bg-cream-50/60 dark:bg-moss-950/30'
              }`}
            >
              <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base text-stone-800 dark:text-[#ECF3EF] leading-relaxed">
                <span className="font-semibold text-stone-400 dark:text-stone-500 text-xs sm:text-sm font-mono">
                  {idx + 1}.
                </span>
                <span>{item.sentenceBefore}</span>

                {/* Input field */}
                <span className="inline-flex items-center gap-1.5 relative">
                  <input
                    type="text"
                    value={answers[item.id] || ''}
                    onChange={(e) => handleInputChange(item.id, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleCheck(item.id, item.acceptedAnswers);
                      }
                    }}
                    placeholder={`[${item.verbHint}]`}
                    className={`w-36 sm:w-44 px-2.5 py-1 text-sm rounded-md border font-medium focus:outline-none transition-all ${
                      isEvaluated
                        ? isCorrect
                          ? 'border-forest-500 bg-forest-50 dark:bg-forest-950/60 text-forest-900 dark:text-forest-100 ring-1 ring-forest-400'
                          : 'border-rose-400 bg-rose-50 dark:bg-rose-950/60 text-rose-900 dark:text-rose-100 ring-1 ring-rose-400'
                        : 'border-cream-300 dark:border-moss-700 bg-white dark:bg-moss-950 text-stone-900 dark:text-[#ECF3EF] focus:border-forest-500 focus:ring-1 focus:ring-forest-400'
                    }`}
                  />
                  {isEvaluated && (
                    <span className="absolute right-2 top-1.5 pointer-events-none">
                      {isCorrect ? (
                        <Check className="w-4 h-4 text-forest-600 dark:text-forest-400" />
                      ) : (
                        <X className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                      )}
                    </span>
                  )}
                </span>

                <span>{item.sentenceAfter}</span>
              </div>

              {/* Action buttons */}
              <div className="mt-3 flex items-center justify-between gap-2 pt-2 border-t border-cream-200/80 dark:border-moss-800 text-xs">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCheck(item.id, item.acceptedAnswers)}
                    className="px-3 py-1.5 rounded-md bg-forest-600 hover:bg-forest-500 text-white dark:bg-forest-400 dark:hover:bg-forest-300 dark:text-moss-950 font-medium transition-colors shadow-xs"
                  >
                    Comprobar
                  </button>
                  {isEvaluated && (
                    <button
                      onClick={() => handleReset(item.id)}
                      className="px-2 py-1 text-stone-500 hover:text-stone-800 dark:hover:text-[#ECF3EF] transition-colors flex items-center gap-1"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Reiniciar
                    </button>
                  )}
                </div>

                <button
                  onClick={() =>
                    setShowExplanation((prev) => ({
                      ...prev,
                      [item.id]: !prev[item.id],
                    }))
                  }
                  className="text-stone-600 hover:text-forest-900 dark:text-[#92A49B] dark:hover:text-[#ECF3EF] flex items-center gap-1 underline underline-offset-2"
                >
                  <HelpCircle className="w-3 h-3" />
                  {showExplanation[item.id] ? 'Ocultar solución' : 'Ver solución & por qué'}
                </button>
              </div>

              {/* Solution & Explanation Card */}
              {showExplanation[item.id] && (
                <div className="mt-3 p-3 rounded-lg bg-cream-100/90 dark:bg-moss-850 border border-cream-200 dark:border-moss-700 text-xs space-y-1.5">
                  <div className="flex items-baseline gap-2">
                    <span className="font-semibold text-forest-900 dark:text-[#ECF3EF]">
                      Respuesta correcta:
                    </span>
                    <span className="font-mono px-2 py-0.5 rounded bg-forest-100 dark:bg-forest-900/80 text-forest-800 dark:text-forest-200 font-bold">
                      {item.acceptedAnswers.join(' / ')}
                    </span>
                  </div>
                  <div className="text-stone-700 dark:text-[#92A49B] leading-relaxed">
                    <span className="font-medium text-forest-900 dark:text-[#ECF3EF]">Justificación: </span>
                    {item.explanation}
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
