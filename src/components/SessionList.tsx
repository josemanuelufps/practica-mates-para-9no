import React from 'react';
import { sessionsList } from '../data/sessions';
import { Calendar, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { SessionInfo } from '../types';

interface SessionListProps {
  onSelectSession: (sessionId: string) => void;
}

export const SessionList: React.FC<SessionListProps> = ({ onSelectSession }) => {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-navy-600 dark:text-ice-300 tracking-tight">
          Cronograma de Sesiones de Repaso
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
          Organizadas en 3 sesiones intensivas para cubrir Álgebra, Geoestadística e Inglés.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sessionsList.map((session: SessionInfo) => {
          const isActive = session.status === 'active';
          const isUpcoming = session.status === 'upcoming';

          return (
            <div
              key={session.id}
              className={`rounded-xl border p-5 flex flex-col justify-between transition-all ${
                isActive
                  ? 'border-crimson-400 dark:border-crimson-500/80 bg-white dark:bg-navy-800 shadow-subtle dark:shadow-subtle-dark ring-1 ring-crimson-300/40 dark:ring-crimson-500/30'
                  : 'border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-800/80 shadow-subtle dark:shadow-subtle-dark hover:border-slate-400 dark:hover:border-navy-600'
              }`}
            >
              <div>
                {/* Header tag */}
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-crimson-50 dark:bg-crimson-900/40 text-crimson-700 dark:text-crimson-300 border border-crimson-200 dark:border-crimson-800'
                        : isUpcoming
                        ? 'bg-navy-50 dark:bg-navy-900 text-navy-600 dark:text-slate-300 border border-slate-200 dark:border-navy-700'
                        : 'bg-ice-200 dark:bg-navy-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-navy-700'
                    }`}
                  >
                    {isActive && <Sparkles className="w-3 h-3 text-crimson-500" />}
                    {isActive ? 'Sesión de Hoy' : isUpcoming ? 'Mañana' : 'Próxima'}
                  </span>

                  <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 font-mono">
                    <Calendar className="w-3 h-3" />
                    <span>{session.date}</span>
                  </div>
                </div>

                <h3 className="font-bold text-sm sm:text-base text-navy-600 dark:text-ice-300 mb-2 leading-snug">
                  {session.title}
                </h3>

                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-3">
                  <Clock className="w-3 h-3" />
                  <span>Duración: {session.duration}</span>
                </div>

                <p className="text-xs text-slate-700 dark:text-slate-400 mb-4 leading-relaxed">
                  {session.summary}
                </p>

                {/* Key topics bullets */}
                <div className="space-y-1.5 mb-5 border-t border-slate-200 dark:border-navy-700 pt-3">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                    Puntos clave:
                  </span>
                  <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1">
                    {session.keyTopics.slice(0, 3).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 line-clamp-1">
                        <span className="text-crimson-500 dark:text-crimson-400 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                    {session.keyTopics.length > 3 && (
                      <li className="text-[11px] text-slate-400 dark:text-slate-500 italic">
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
                    isActive
                      ? 'bg-crimson-600 hover:bg-crimson-500 text-white dark:bg-crimson-500 dark:hover:bg-crimson-400 dark:text-white shadow-xs'
                      : 'bg-ice-200 hover:bg-ice-400 text-navy-600 dark:bg-navy-700 dark:hover:bg-navy-600 dark:text-ice-300 border border-slate-200 dark:border-navy-600'
                  }`}
                >
                  <span>{isActive ? 'Entrar a la Práctica de Hoy' : 'Ver Temas y Ejercicios'}</span>
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
