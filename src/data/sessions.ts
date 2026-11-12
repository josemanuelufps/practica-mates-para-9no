import { SessionInfo } from '../types';

export const sessionsList: SessionInfo[] = [
  {
    id: 'matematicas',
    number: 1,
    title: 'Sesión de Matemáticas: Álgebra, Ecuaciones y Funciones',
    status: 'active',
    focus: 'matematicas',
    duration: 'Temas Clave de Examen',
    summary: 'Repaso integral de operaciones con radicales, racionalización, métodos de factorización, sistemas de ecuaciones lineales 2x2, geometría de la recta y tipos de funciones.',
    keyTopics: [
      'Radicales: Operaciones con semejantes y racionalización (monomio y conjugado)',
      'Factorización esencial: Factor común, TCP, diferencia de cuadrados y trinomios',
      'Sistemas de ecuaciones 2x2: Métodos de igualación, reducción, sustitución y regla de Cramer',
      'La recta: Pendiente (m), distancia entre puntos y ecuación y = mx + b',
      'Teoría de funciones: Inyectiva, sobreyectiva, biyectiva y función cuadrática',
    ],
  },
  {
    id: 'geoestadistica',
    number: 2,
    title: 'Sesión de Geoestadística: Dispersión, Probabilidad y Cuerpos Redondos',
    status: 'active',
    focus: 'geoestadistica',
    duration: 'Temas Clave de Examen',
    summary: 'Medidas de dispersión poblacionales y muestrales, cálculo e interpretación de percentiles, fundamentos de combinatoria y fórmulas de área/volumen de cilindro, cono y esfera.',
    keyTopics: [
      'Medidas de dispersión: Rango, varianza (σ²) y desviación estándar (σ)',
      'Percentiles y cuartiles: Fórmula de posición k(N/100) e interpretación',
      'Probabilidad clásica (Laplace), principios aditivo/multiplicativo y combinatoria',
      'El Cilindro y el Cono: Áreas laterales, totales y volúmenes (V = πr²h y V = 1/3 πr²h)',
      'La Esfera: Área superficial (4πr²) y volumen (4/3 πr³)',
    ],
  },
  {
    id: 'ingles',
    number: 3,
    title: 'Sesión de Inglés: Past Perfect y Condicionales (0, 1, 2, 3)',
    status: 'active',
    focus: 'ingles',
    duration: 'Módulo Práctico Interactivo',
    summary: 'Acciones pasadas previas a otra (Past Perfect) y el sistema condicional completo con retroalimentación inmediata, línea temporal visual y banco de palabras táctil.',
    keyTopics: [
      'Past Perfect: Estructura had + V3 y conectores temporales (before, after, by the time)',
      'Zero & First Conditional: Hechos científicos y planes reales futuros',
      'Second & Third Conditional: Hipótesis imaginarias y arrepentimientos pasados',
      'Ejercicios interactivos con justificación gramatical paso a paso',
      'Minijuegos de construcción de oraciones (Click-to-slot) con banco de palabras',
    ],
  },
];
