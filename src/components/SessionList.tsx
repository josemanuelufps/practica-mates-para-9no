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
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100">
            Cronograma de Sesiones de Repaso
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
            Organizadas en 3 sesiones intensivas manuales para cubrir Álgebra, Geoestadística e Inglés.
          </p>
        </div>
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
                  ? 'border-zinc-900 dark:border-zinc-100 bg-white dark:bg-zinc-900 shadow-md ring-1 ring-zinc-900 dark:ring-zinc-100'
                  : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-xs'
              }`}
            >
              <div>
                {/* Header tag */}
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                        : isUpcoming
                        ? 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                    }`}
                  >
                    {isActive && <Sparkles className="w-3 h-3 text-amber-500" />}
                    {isActive ? 'Sesión de Hoy' : isUpcoming ? 'Mañana' : 'Próxima'}
                  </span>

                  <div className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                    <Calendar className="w-3 h-3" />
                    <span>{session.date}</span>
                  </div>
                </div>

                <h3 className="font-bold text-sm sm:text-base text-zinc-900 dark:text-zinc-100 mb-2 leading-snug">
                  {session.title}
                </h3>

                <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 mb-3">
                  <Clock className="w-3 h-3" />
                  <span>Duración: {session.duration}</span>
                </div>

                <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">
                  {session.summary}
                </p>

                {/* Key topics bullets */}
                <div className="space-y-1.5 mb-5 border-t border-zinc-100 dark:border-zinc-800 pt-3">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 block">
                    Puntos clave:
                  </span>
                  <ul className="text-xs text-zinc-700 dark:text-zinc-300 space-y-1">
                    {session.keyTopics.slice(0, 3).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 line-clamp-1">
                        <span className="text-zinc-400">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                    {session.keyTopics.length > 3 && (
                      <li className="text-[11px] text-zinc-400 italic">
                        + {session.keyTopics.length - 3} puntos adicionales
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              {/* Action button */}
              <div>
                <button
                  onClick={() => onSelectSession(session.id)}
                  className={`w-full py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors ${
                    isActive
                      ? 'bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 shadow-xs'
                      : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-200'
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
