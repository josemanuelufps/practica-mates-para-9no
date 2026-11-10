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
        <h2 className="text-lg sm:text-xl font-bold text-forest-900 dark:text-[#ECF3EF] tracking-tight">
          Cronograma de Sesiones de Repaso
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-[#92A49B] mt-0.5">
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
                  ? 'border-terracotta-400/80 dark:border-terracotta-500/60 bg-white dark:bg-moss-900 shadow-subtle dark:shadow-subtle-dark ring-1 ring-terracotta-300/40 dark:ring-terracotta-500/30'
                  : 'border-cream-200 dark:border-moss-800 bg-white dark:bg-moss-900/60 shadow-subtle dark:shadow-subtle-dark hover:border-forest-200 dark:hover:border-moss-700'
              }`}
            >
              <div>
                {/* Header tag */}
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-terracotta-50 dark:bg-terracotta-900/40 text-terracotta-700 dark:text-terracotta-300 border border-terracotta-200 dark:border-terracotta-800'
                        : isUpcoming
                        ? 'bg-forest-50 dark:bg-forest-900/40 text-forest-700 dark:text-forest-300 border border-forest-100 dark:border-forest-800'
                        : 'bg-cream-100 dark:bg-moss-850 text-stone-600 dark:text-[#92A49B] border border-cream-200 dark:border-moss-800'
                    }`}
                  >
                    {isActive && <Sparkles className="w-3 h-3 text-terracotta-500" />}
                    {isActive ? 'Sesión de Hoy' : isUpcoming ? 'Mañana' : 'Próxima'}
                  </span>

                  <div className="flex items-center gap-1 text-xs text-stone-500 dark:text-[#92A49B] font-mono">
                    <Calendar className="w-3 h-3" />
                    <span>{session.date}</span>
                  </div>
                </div>

                <h3 className="font-bold text-sm sm:text-base text-forest-900 dark:text-[#ECF3EF] mb-2 leading-snug">
                  {session.title}
                </h3>

                <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-[#92A49B] mb-3">
                  <Clock className="w-3 h-3" />
                  <span>Duración: {session.duration}</span>
                </div>

                <p className="text-xs text-stone-600 dark:text-[#92A49B] mb-4 leading-relaxed">
                  {session.summary}
                </p>

                {/* Key topics bullets */}
                <div className="space-y-1.5 mb-5 border-t border-cream-200 dark:border-moss-800 pt-3">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500 block">
                    Puntos clave:
                  </span>
                  <ul className="text-xs text-stone-700 dark:text-[#92A49B] space-y-1">
                    {session.keyTopics.slice(0, 3).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 line-clamp-1">
                        <span className="text-terracotta-500 dark:text-terracotta-400">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                    {session.keyTopics.length > 3 && (
                      <li className="text-[11px] text-stone-400 dark:text-stone-500 italic">
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
                  className={`w-full py-2.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    isActive
                      ? 'bg-forest-600 hover:bg-forest-500 text-white dark:bg-forest-400 dark:hover:bg-forest-300 dark:text-moss-950 shadow-xs'
                      : 'bg-cream-100 hover:bg-cream-200 text-forest-900 dark:bg-moss-800 dark:hover:bg-moss-700 dark:text-[#ECF3EF]'
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
