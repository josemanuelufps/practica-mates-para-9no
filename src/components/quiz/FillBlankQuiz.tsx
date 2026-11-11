import React, { useState } from 'react';
import { Check, X, HelpCircle, RotateCcw } from 'lucide-react';
import { FillBlankItem } from '../../types';
import { fireMasteryCelebration } from '../../utils/confetti';

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
    const newChecked = { ...checked, [id]: true };
    setChecked(newChecked);
    setShowExplanation((prev) => ({ ...prev, [id]: true }));

    // Check if all items are now answered correctly
    const allAnswered = items.every((it) => it.id === id || newChecked[it.id]);
    if (allAnswered) {
      const allCorrect = items.every((it) => {
        const val = normalize(answers[it.id] || (it.id === id ? answers[id] : ''));
        return it.acceptedAnswers.some((acc) => normalize(acc) === val);
      });
      if (allCorrect) {
        fireMasteryCelebration();
      }
    }

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
    <div className="border border-slate-200 dark:border-navy-700 rounded-xl p-5 sm:p-6 bg-white dark:bg-navy-800 shadow-subtle dark:shadow-subtle-dark transition-shadow">
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

      <div className="space-y-5">
        {items.map((item, idx) => {
          const isEvaluated = !!checked[item.id];
          const userVal = normalize(answers[item.id] || '');
          const isCorrect =
            isEvaluated &&
            item.acceptedAnswers.some((acc) => normalize(acc) === userVal);

          return (
            <div
              key={item.id}
              className={`p-4 rounded-xl border transition-all duration-200 ${
                isEvaluated
                  ? isCorrect
                    ? 'border-success-500 bg-success-50/70 dark:border-success-700/80 dark:bg-success-950/30'
                    : 'border-crimson-400 bg-crimson-50/60 dark:border-crimson-800/60 dark:bg-crimson-950/40 animate-shake-soft'
                  : 'border-slate-200 dark:border-navy-700 bg-ice-100/50 dark:bg-navy-900/30'
              }`}
            >
              <div className="flex flex-wrap items-center gap-2.5 text-sm sm:text-base text-slate-800 dark:text-ice-300 leading-relaxed">
                <span className="font-semibold text-slate-400 dark:text-slate-500 text-xs sm:text-sm font-mono shrink-0">
                  {idx + 1}.
                </span>
                <span>{item.sentenceBefore}</span>

                {/* Input field with accessible aria-label and smooth feedback */}
                <span className="inline-flex items-center gap-1.5 relative">
                  <input
                    type="text"
                    value={answers[item.id] || ''}
                    aria-label={`Completar oración ${idx + 1} con conjugación del verbo ${item.verbHint}`}
                    onChange={(e) => handleInputChange(item.id, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleCheck(item.id, item.acceptedAnswers);
                      }
                    }}
                    placeholder={`[${item.verbHint}]`}
                    className={`h-10 w-40 sm:w-48 px-3 text-sm rounded-lg border font-medium focus:outline-none transition-all duration-150 ${
                      isEvaluated
                        ? isCorrect
                          ? 'border-success-500 bg-success-50 dark:bg-success-950/60 text-success-900 dark:text-success-100 ring-2 ring-success-400/30'
                          : 'border-crimson-500 bg-crimson-50 dark:bg-crimson-950/60 text-crimson-900 dark:text-crimson-100 ring-2 ring-crimson-400/30'
                        : 'border-slate-300 dark:border-navy-600 bg-white dark:bg-navy-950 text-navy-600 dark:text-ice-300 focus:border-crimson-500 focus:ring-2 focus:ring-crimson-400/20 shadow-2xs'
                    }`}
                  />
                  {isEvaluated && (
                    <span className="absolute right-2.5 top-3 pointer-events-none animate-pop-in">
                      {isCorrect ? (
                        <Check className="w-4 h-4 text-success-600 dark:text-success-400" />
                      ) : (
                        <X className="w-4 h-4 text-crimson-600 dark:text-crimson-400" />
                      )}
                    </span>
                  )}
                </span>

                <span>{item.sentenceAfter}</span>
              </div>

              {/* Action buttons bar with standard 44px min-touch height */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200/80 dark:border-navy-700 text-xs">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCheck(item.id, item.acceptedAnswers)}
                    className="min-h-[44px] px-4 py-2 rounded-xl bg-crimson-600 hover:bg-crimson-500 text-white dark:bg-crimson-500 dark:hover:bg-crimson-400 dark:text-white font-semibold transition-all shadow-xs active:scale-95"
                  >
                    Comprobar
                  </button>
                  {isEvaluated && (
                    <button
                      onClick={() => handleReset(item.id)}
                      className="min-h-[44px] px-3 py-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-ice-300 transition-all flex items-center gap-1.5 rounded-xl hover:bg-ice-200 dark:hover:bg-navy-700 active:scale-95"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
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
                  className="min-h-[44px] px-2 text-slate-600 hover:text-navy-600 dark:text-slate-400 dark:hover:text-ice-300 flex items-center gap-1.5 underline underline-offset-4 transition-colors"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  {showExplanation[item.id] ? 'Ocultar solución' : 'Ver solución & por qué'}
                </button>
              </div>

              {/* Solution & Explanation Card with slide-fade */}
              {showExplanation[item.id] && (
                <div className="mt-3.5 p-3.5 rounded-xl bg-ice-200/90 dark:bg-navy-900 border border-slate-300 dark:border-navy-700 text-xs sm:text-sm space-y-2 animate-slide-fade">
                  <div className="flex items-baseline gap-2">
                    <span className="font-semibold text-navy-600 dark:text-ice-300">
                      {isCorrect ? 'Respuesta correcta:' : 'Solución recomendada:'}
                    </span>
                    <span
                      className={`font-mono px-2.5 py-0.5 rounded-md font-bold ${
                        isCorrect
                          ? 'bg-success-100 dark:bg-success-900/80 text-success-800 dark:text-success-200'
                          : 'bg-crimson-100 dark:bg-crimson-900/80 text-crimson-800 dark:text-crimson-200'
                      }`}
                    >
                      {item.acceptedAnswers.join(' / ')}
                    </span>
                  </div>
                  <div className="text-slate-700 dark:text-slate-400 leading-relaxed">
                    <span className="font-semibold text-navy-600 dark:text-ice-300">
                      {isCorrect ? '¿Por qué es correcto? ' : 'Pista para recordar: '}
                    </span>
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
