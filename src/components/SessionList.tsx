import React from 'react';
import { sessionsList } from '../data/sessions';
import { Clock, ArrowRight, BookOpen, Layers, Sparkles } from 'lucide-react';
import { SessionInfo } from '../types';

interface SessionListProps {
  onSelectSession: (sessionId: string) => void;
}

export const SessionList: React.FC<SessionListProps> = ({ onSelectSession }) => {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-navy-600 dark:text-ice-300 tracking-tight">
          Temas Clave de Exámenes por Materia
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
          Resúmenes estructurados y guías temáticas organizadas por las 3 materias fundamentales de evaluación de 9° grado.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sessionsList.map((session: SessionInfo) => {
          const isMath = session.id === 'matematicas';
          const isGeo = session.id === 'geoestadistica';

          const badgeLabel = isMath
            ? 'Eje Central'
            : isGeo
            ? 'Eje Complementario'
            : 'Práctica Interactiva';

          const buttonLabel = isMath
            ? 'Ver Sesión de Matemáticas'
            : isGeo
            ? 'Ver Sesión de Geoestadística'
            : 'Abrir Módulo de Inglés';

          return (
            <div
              key={session.id}
              className={`rounded-xl border p-4 sm:p-5 flex flex-col justify-between transition-all ${
                isMath
                  ? 'border-crimson-400 dark:border-crimson-500/80 bg-white dark:bg-navy-800 shadow-subtle dark:shadow-subtle-dark ring-1 ring-crimson-300/40 dark:ring-crimson-500/30'
                  : 'border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-800/80 shadow-subtle dark:shadow-subtle-dark hover:border-slate-400 dark:hover:border-navy-600'
              }`}
            >
              <div>
                {/* Header tag */}
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                      isMath
                        ? 'bg-crimson-50 dark:bg-crimson-900/40 text-crimson-700 dark:text-crimson-300 border border-crimson-200 dark:border-crimson-800'
                        : isGeo
                        ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                        : 'bg-navy-50 dark:bg-navy-900 text-navy-600 dark:text-slate-300 border border-slate-200 dark:border-navy-700'
                    }`}
                  >
                    {isMath ? (
                      <Sparkles className="w-3 h-3 text-crimson-500" />
                    ) : isGeo ? (
                      <Layers className="w-3 h-3 text-amber-500" />
                    ) : (
                      <BookOpen className="w-3 h-3 text-navy-500 dark:text-ice-300" />
                    )}
                    {badgeLabel}
                  </span>

                  <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    Sesión {session.number}
                  </span>
                </div>

                <h3 className="font-bold text-sm sm:text-base text-navy-600 dark:text-ice-300 mb-2 leading-snug">
                  {session.title}
                </h3>

                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-3">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>{session.duration}</span>
                </div>

                <p className="text-xs text-slate-700 dark:text-slate-400 mb-4 leading-relaxed">
                  {session.summary}
                </p>

                {/* Key topics bullets */}
                <div className="space-y-1.5 mb-5 border-t border-slate-200 dark:border-navy-700 pt-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                    Puntos clave de examen:
                  </span>
                  <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1">
                    {session.keyTopics.slice(0, 3).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 line-clamp-1">
                        <span className="text-crimson-500 dark:text-crimson-400 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                    {session.keyTopics.length > 3 && (
                      <li className="text-xs text-slate-400 dark:text-slate-500 italic">
                        + {session.keyTopics.length - 3} puntos adicionales
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              {/* Action button with minimum 44px touch height */}
              <div>
                <button
                  onClick={() => onSelectSession(session.id)}
                  className={`w-full min-h-[44px] py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all active:scale-98 ${
                    isMath
                      ? 'bg-crimson-600 hover:bg-crimson-500 text-white dark:bg-crimson-500 dark:hover:bg-crimson-400 dark:text-white shadow-xs'
                      : 'bg-ice-200 hover:bg-ice-400 text-navy-600 dark:bg-navy-700 dark:hover:bg-navy-600 dark:text-ice-300 border border-slate-200 dark:border-navy-600'
                  }`}
                >
                  <span>{buttonLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
