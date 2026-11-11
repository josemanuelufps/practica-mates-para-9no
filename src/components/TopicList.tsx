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
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-navy-700 pb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mr-2">
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
            className={`min-h-[36px] px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              selectedSubject === tab.id
                ? 'bg-navy-600 text-white dark:bg-crimson-600 dark:text-white shadow-xs'
                : 'bg-ice-200 hover:bg-ice-400 text-slate-700 dark:bg-navy-800 dark:hover:bg-navy-700 dark:text-slate-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Cards for each subject */}
      <div className="space-y-5">
        {filteredGroups.map((group) => (
          <div
            key={group.id}
            className="border border-slate-200 dark:border-navy-700 rounded-xl p-5 bg-white dark:bg-navy-800 shadow-subtle dark:shadow-subtle-dark"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-navy-700">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-navy-50 dark:bg-navy-900 text-navy-600 dark:text-crimson-400">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-navy-600 dark:text-ice-300">
                    {group.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    {group.description}
                  </p>
                </div>
              </div>
              <span className="self-start sm:self-auto text-[11px] font-medium px-2.5 py-1 rounded-full bg-navy-50 dark:bg-navy-900 text-navy-600 dark:text-slate-300 border border-slate-200 dark:border-navy-700">
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
                    className="border border-slate-200 dark:border-navy-700 rounded-lg overflow-hidden bg-ice-100/60 dark:bg-navy-900/40"
                  >
                    <button
                      onClick={() => toggleCategory(cat.category)}
                      aria-expanded={isOpen}
                      className="w-full px-4 py-2.5 flex items-center justify-between text-left hover:bg-ice-200/60 dark:hover:bg-navy-800/60 transition-colors"
                    >
                      <span className="font-semibold text-xs sm:text-sm text-navy-600 dark:text-ice-300">
                        {cat.category}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-slate-500 font-mono">
                          {cat.items.length} temas
                        </span>
                        {isOpen ? (
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-4 py-3 border-t border-slate-200 dark:border-navy-700 bg-white/70 dark:bg-navy-800/60 space-y-2">
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                          {cat.items.map((item, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 p-1.5 rounded hover:bg-ice-50 dark:hover:bg-navy-700/40"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-crimson-500 dark:text-crimson-400 mt-0.5 shrink-0" />
                              <span className="leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Special math formula previews for Cuerpos Redondos & Álgebra */}
                        {cat.category.includes('Cuerpos Redondos') && (
                          <div className="mt-3 pt-2 border-t border-slate-200 dark:border-navy-700 grid grid-cols-1 sm:grid-cols-3 gap-2 text-center text-xs">
                            <div className="p-2.5 rounded-lg bg-ice-200 dark:bg-navy-900 border border-slate-200 dark:border-navy-700">
                              <span className="font-semibold block text-navy-600 dark:text-ice-300">Cilindro</span>
                              <KatexMath math="V = \pi r^2 h" block />
                            </div>
                            <div className="p-2.5 rounded-lg bg-ice-200 dark:bg-navy-900 border border-slate-200 dark:border-navy-700">
                              <span className="font-semibold block text-navy-600 dark:text-ice-300">Cono</span>
                              <KatexMath math="V = \frac{1}{3}\pi r^2 h" block />
                            </div>
                            <div className="p-2.5 rounded-lg bg-ice-200 dark:bg-navy-900 border border-slate-200 dark:border-navy-700">
                              <span className="font-semibold block text-navy-600 dark:text-ice-300">Esfera</span>
                              <KatexMath math="V = \frac{4}{3}\pi r^3" block />
                            </div>
                          </div>
                        )}

                        {cat.category.includes('Teoría de Funciones') && (
                          <div className="mt-3 pt-2 border-t border-slate-200 dark:border-navy-700 grid grid-cols-1 sm:grid-cols-3 gap-2 text-center text-xs">
                            <div className="p-2.5 rounded-lg bg-ice-200 dark:bg-navy-900 border border-slate-200 dark:border-navy-700">
                              <span className="font-semibold block text-navy-600 dark:text-ice-300">Ecuación Recta</span>
                              <KatexMath math="y = mx + b" block />
                            </div>
                            <div className="p-2.5 rounded-lg bg-ice-200 dark:bg-navy-900 border border-slate-200 dark:border-navy-700">
                              <span className="font-semibold block text-navy-600 dark:text-ice-300">Pendiente</span>
                              <KatexMath math="m = \frac{y_2 - y_1}{x_2 - x_1}" block />
                            </div>
                            <div className="p-2.5 rounded-lg bg-ice-200 dark:bg-navy-900 border border-slate-200 dark:border-navy-700">
                              <span className="font-semibold block text-navy-600 dark:text-ice-300">Distancia</span>
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
