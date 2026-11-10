import { TopicGroup } from '../types';

export const topicGroups: TopicGroup[] = [
  {
    id: 'ingles',
    title: 'Inglés Gramatical',
    badge: 'Prioridad Sesiones 1 & 2',
    description: 'Estructuras temporales pasadas y condicionales (Zero, First, Second & Third Conditional).',
    topics: [
      {
        category: 'Sesión 1 (Hoy - 10 Noviembre)',
        items: [
          'Past Perfect: Fill in the blanks (had + past participle)',
          'Past Perfect: Complete sentences (relación temporal con Past Simple: before, after, by the time)',
          'Zero Conditional: Complete sentences (verdades universales, hechos científicos: If + Present, Present)',
          'First Conditional: Complete sentences (situaciones reales/probables futuras: If + Present, will + Verb)',
          'Discriminación de uso: Fill in the blanks choosing Zero or First Conditional',
        ],
      },
      {
        category: 'Sesión 2 (Mañana - 11 Noviembre)',
        items: [
          'Second Conditional: Fill in the blanks (hipotéticos en presente/futuro: If + Past Simple, would + Verb)',
          'Third Conditional: Fill in the blanks (arrepentimientos/pasados imposibles: If + Past Perfect, would have + V3)',
          'Discriminación de uso: Fill in the blanks choosing Second or Third Conditional',
        ],
      },
    ],
  },
  {
    id: 'algebra',
    title: 'Álgebra de 9° Grado',
    badge: 'Sesiones 2 & 3',
    description: 'Aritmética avanzada de radicales, funciones, geometría analítica y sistemas de ecuaciones.',
    topics: [
      {
        category: 'Sistemas Numéricos y Radicales',
        items: [
          'Números reales: propiedades y estructura',
          'Suma y resta de radicales semejantes',
          'Multiplicación y división de radicales (mismo y diferente índice)',
          'Racionalización (monomio y binomio conjugado)',
          'Números complejos: unidad imaginaria (i = √-1) y forma binómica',
        ],
      },
      {
        category: 'Factorización y Polinomios',
        items: [
          'Factor común monomio y por agrupación',
          'Trinomio cuadrado perfecto y diferencia de cuadrados',
          'Trinomios de la forma x² + bx + c y ax² + bx + c',
          'Suma y diferencia de cubos',
        ],
      },
      {
        category: 'Teoría de Funciones y La Recta',
        items: [
          'Función: definición, dominio y rango',
          'Tipos de funciones: inyectiva (uno a uno), sobreyectiva y biyectiva',
          'Función lineal y función afín (y = mx + b)',
          'La recta: pendiente de una recta, distancia entre dos puntos y ecuación de la recta',
          'Función cuadrática: vértice, eje de simetría y parábola',
        ],
      },
      {
        category: 'Sistemas de Ecuaciones Lineales 2x2',
        items: [
          'Método de Igualación',
          'Método de Reducción (Eliminación)',
          'Método de Sustitución',
          'Método de Cramer (Determinantes)',
          'Profundización y resolución de problemas cotidianos con ecuaciones simultáneas',
        ],
      },
    ],
  },
  {
    id: 'geoestadistica',
    title: 'Geoestadística y Geometría',
    badge: 'Sesión 3',
    description: 'Análisis de datos, probabilidad y geometría espacial de cuerpos redondos.',
    topics: [
      {
        category: 'Estadística y Probabilidad',
        items: [
          'Medidas de dispersión: rango, varianza y desviación estándar',
          'Percentiles: cálculo e interpretación en datos agrupados y no agrupados',
          'Probabilidad clásica y eventos mutuamente excluyentes',
          'Combinatoria: principios multiplicativo y aditivo, permutaciones y combinaciones',
          'Ecuaciones simultáneas aplicadas a balances de frecuencias',
        ],
      },
      {
        category: 'Cuerpos Redondos (Geometría del Espacio)',
        items: [
          'El Cilindro: área lateral, área total y volumen (V = π · r² · h)',
          'El Cono: generatriz, área lateral, total y volumen (V = 1/3 · π · r² · h)',
          'La Esfera: área superficial (4πr²) y volumen (4/3 · π · r³)',
        ],
      },
    ],
  },
];
