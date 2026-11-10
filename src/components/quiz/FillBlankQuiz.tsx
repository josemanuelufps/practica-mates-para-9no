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
    // reset checked state on edit
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
                    ? 'border-emerald-300 bg-emerald-50/50 dark:border-emerald-800 dark:bg-emerald-950/20'
                    : 'border-rose-300 bg-rose-50/50 dark:border-rose-800 dark:bg-rose-950/20'
                  : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30'
              }`}
            >
              <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed">
                <span className="font-semibold text-zinc-500 text-xs">
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
                    className={`w-36 sm:w-44 px-2.5 py-1 text-sm rounded border font-medium focus:outline-none transition-colors ${
                      isEvaluated
                        ? isCorrect
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-100'
                          : 'border-rose-500 bg-rose-50 dark:bg-rose-950/50 text-rose-900 dark:text-rose-100'
                        : 'border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:border-zinc-500'
                    }`}
                  />
                  {isEvaluated && (
                    <span className="absolute right-2 top-1.5 pointer-events-none">
                      {isCorrect ? (
                        <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <X className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                      )}
                    </span>
                  )}
                </span>

                <span>{item.sentenceAfter}</span>
              </div>

              {/* Action buttons */}
              <div className="mt-3 flex items-center justify-between gap-2 pt-2 border-t border-zinc-200/60 dark:border-zinc-800/60 text-xs">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCheck(item.id, item.acceptedAnswers)}
                    className="px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 font-medium transition-colors"
                  >
                    Comprobar
                  </button>
                  {isEvaluated && (
                    <button
                      onClick={() => handleReset(item.id)}
                      className="px-2 py-1 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors flex items-center gap-1"
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
                  className="text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300 flex items-center gap-1 underline underline-offset-2"
                >
                  <HelpCircle className="w-3 h-3" />
                  {showExplanation[item.id] ? 'Ocultar solución' : 'Ver solución & por qué'}
                </button>
              </div>

              {/* Solution & Explanation Card */}
              {showExplanation[item.id] && (
                <div className="mt-3 p-3 rounded bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80 text-xs space-y-1.5">
                  <div className="flex items-baseline gap-2">
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                      Respuesta correcta:
                    </span>
                    <span className="font-mono px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold">
                      {item.acceptedAnswers.join(' / ')}
                    </span>
                  </div>
                  <div className="text-zinc-600 dark:text-zinc-300 leading-normal">
                    <span className="font-medium text-zinc-800 dark:text-zinc-200">Justificación: </span>
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
