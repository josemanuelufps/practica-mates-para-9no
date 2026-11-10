import React, { useState } from 'react';
import { topicGroups } from '../data/topics';
import { BookOpen, ChevronDown, ChevronRight, CheckCircle2 } from 'lucide-react';
import { KatexMath } from './KatexMath';

export const TopicList: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<'all' | 'ingles' | 'algebra' | 'geoestadistica'>('all');
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    'Sesión 1 (Hoy - 10 Noviembre)': true,
    'Sistemas Numéricos y Radicales': true,
    'Estadística y Probabilidad': true,
    'Cuerpos Redondos (Geometría del Espacio)': true,
  });

  const toggleCategory = (catName: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [catName]: !prev[catName],
    }));
  };

  const filteredGroups = selectedSubject === 'all'
    ? topicGroups
    : topicGroups.filter((g) => g.id === selectedSubject);

  return (
    <div className="space-y-6">
      {/* Subject filter tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mr-2">
          Filtrar Temario:
        </span>
        {[
          { id: 'all', label: 'Todos los Temarios' },
          { id: 'ingles', label: 'Inglés' },
          { id: 'algebra', label: 'Álgebra' },
          { id: 'geoestadistica', label: 'Geoestadística & Cuerpos Redondos' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedSubject(tab.id as any)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              selectedSubject === tab.id
                ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-xs'
                : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:text-zinc-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Cards for each subject */}
      <div className="space-y-6">
        {filteredGroups.map((group) => (
          <div
            key={group.id}
            className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 bg-white dark:bg-zinc-900/50 shadow-xs"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-zinc-100 dark:border-zinc-800/80">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-zinc-900 dark:text-zinc-100">
                    {group.title}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {group.description}
                  </p>
                </div>
              </div>
              <span className="self-start sm:self-auto text-[11px] font-medium px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                {group.badge}
              </span>
            </div>

            {/* Sub-categories */}
            <div className="space-y-3">
              {group.topics.map((cat) => {
                const isOpen = openCategories[cat.category] ?? true;
                return (
                  <div
                    key={cat.category}
                    className="border border-zinc-200/80 dark:border-zinc-800 rounded-lg overflow-hidden bg-zinc-50/50 dark:bg-zinc-900/30"
                  >
                    <button
                      onClick={() => toggleCategory(cat.category)}
                      className="w-full px-4 py-2.5 flex items-center justify-between text-left hover:bg-zinc-100/60 dark:hover:bg-zinc-800/40 transition-colors"
                    >
                      <span className="font-semibold text-xs sm:text-sm text-zinc-800 dark:text-zinc-200">
                        {cat.category}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-zinc-400 font-mono">
                          {cat.items.length} temas
                        </span>
                        {isOpen ? (
                          <ChevronDown className="w-4 h-4 text-zinc-400" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-zinc-400" />
                        )}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-4 py-3 border-t border-zinc-200/80 dark:border-zinc-800 bg-white/60 dark:bg-zinc-950/40 space-y-2">
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                          {cat.items.map((item, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 p-1.5 rounded hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500 mt-0.5 shrink-0" />
                              <span className="leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Special math formula previews for Cuerpos Redondos & Álgebra */}
                        {cat.category.includes('Cuerpos Redondos') && (
                          <div className="mt-3 pt-2 border-t border-zinc-200/60 dark:border-zinc-800/60 grid grid-cols-1 sm:grid-cols-3 gap-2 text-center text-xs text-zinc-600 dark:text-zinc-400">
                            <div className="p-2 rounded bg-zinc-100 dark:bg-zinc-800/50">
                              <span className="font-semibold block text-zinc-800 dark:text-zinc-200">Cilindro</span>
                              <KatexMath math="V = \pi r^2 h" block />
                            </div>
                            <div className="p-2 rounded bg-zinc-100 dark:bg-zinc-800/50">
                              <span className="font-semibold block text-zinc-800 dark:text-zinc-200">Cono</span>
                              <KatexMath math="V = \frac{1}{3}\pi r^2 h" block />
                            </div>
                            <div className="p-2 rounded bg-zinc-100 dark:bg-zinc-800/50">
                              <span className="font-semibold block text-zinc-800 dark:text-zinc-200">Esfera</span>
                              <KatexMath math="V = \frac{4}{3}\pi r^3" block />
                            </div>
                          </div>
                        )}

                        {cat.category.includes('Teoría de Funciones') && (
                          <div className="mt-3 pt-2 border-t border-zinc-200/60 dark:border-zinc-800/60 grid grid-cols-1 sm:grid-cols-3 gap-2 text-center text-xs text-zinc-600 dark:text-zinc-400">
                            <div className="p-2 rounded bg-zinc-100 dark:bg-zinc-800/50">
                              <span className="font-semibold block text-zinc-800 dark:text-zinc-200">Ecuación Recta</span>
                              <KatexMath math="y = mx + b" block />
                            </div>
                            <div className="p-2 rounded bg-zinc-100 dark:bg-zinc-800/50">
                              <span className="font-semibold block text-zinc-800 dark:text-zinc-200">Pendiente</span>
                              <KatexMath math="m = \frac{y_2 - y_1}{x_2 - x_1}" block />
                            </div>
                            <div className="p-2 rounded bg-zinc-100 dark:bg-zinc-800/50">
                              <span className="font-semibold block text-zinc-800 dark:text-zinc-200">Distancia</span>
                              <KatexMath math="d = \sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}" block />
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
