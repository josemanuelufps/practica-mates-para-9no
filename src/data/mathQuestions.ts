export interface StepItem {
  title: string;
  explanation: string;
  math?: string;
}

export interface QuestionItem {
  id: number;
  category: string;
  topic: string;
  statement: string;
  options: {
    letter: string;
    text: string;
    isCorrect: boolean;
  }[];
  correctLetter: string;
  steps: StepItem[];
  conclusion: string;
  pedagogicalTip?: string;
}

export const mathQuestions: QuestionItem[] = [
  {
    id: 1,
    category: 'Sistemas de Ecuaciones 2x2',
    topic: 'Problemas de Proporciones y Cantidades',
    statement: 'Entre Sandra y Carlos reúnen 1500 caramelos. Si Sandra tiene el triple de lo que tiene Carlos. ¿Cuántos caramelos tiene Sandra?',
    options: [
      { letter: 'A', text: '1125', isCorrect: true },
      { letter: 'B', text: '375', isCorrect: false },
      { letter: 'C', text: '584', isCorrect: false },
      { letter: 'D', text: '845', isCorrect: false },
    ],
    correctLetter: 'A',
    steps: [
      {
        title: 'Paso 1: Definición de variables',
        explanation: 'Asignamos una variable a la cantidad de caramelos que posee cada persona:',
        math: 'S = \\text{Caramelos de Sandra}, \\quad C = \\text{Caramelos de Carlos}',
      },
      {
        title: 'Paso 2: Planteamiento del sistema de ecuaciones',
        explanation: 'La suma total es 1500 caramelos, y Sandra tiene el triple de lo que tiene Carlos:',
        math: '\\begin{cases} S + C = 1500 \\\\ S = 3C \\end{cases}',
      },
      {
        title: 'Paso 3: Método de sustitución',
        explanation: 'Reemplazamos la expresión de Sandra (S = 3C) en la primera ecuación:',
        math: '3C + C = 1500 \\implies 4C = 1500 \\implies C = \\frac{1500}{4} = 375',
      },
      {
        title: 'Paso 4: Cálculo de los caramelos de Sandra',
        explanation: 'Multiplicamos los caramelos de Carlos por 3:',
        math: 'S = 3 \\cdot 375 = 1125',
      },
    ],
    conclusion: 'Sandra tiene 1125 caramelos (mientras que Carlos tiene 375 caramelos). La suma es 1125 + 375 = 1500.',
    pedagogicalTip: 'Ojo con responder apresuradamente los 375 de Carlos. La pregunta indaga específicamente por la cantidad de Sandra.',
  },
  {
    id: 2,
    category: 'Sistemas de Ecuaciones 2x2',
    topic: 'Problemas de Proporciones y Cantidades',
    statement: 'Según el problema anterior ¿Cuántos caramelos tiene Carlos?',
    options: [
      { letter: 'A', text: '655', isCorrect: false },
      { letter: 'B', text: '916', isCorrect: false },
      { letter: 'C', text: '1125', isCorrect: false },
      { letter: 'D', text: '375', isCorrect: true },
    ],
    correctLetter: 'D',
    steps: [
      {
        title: 'Paso 1: Recuperación del sistema planteado',
        explanation: 'Teníamos el sistema donde S es el triple de C y la suma es 1500:',
        math: 'S + C = 1500, \\quad S = 3C',
      },
      {
        title: 'Paso 2: Resolución para la incógnita C',
        explanation: 'Al sustituir S = 3C en la suma total obtenemos el valor directo de Carlos:',
        math: '4C = 1500 \\implies C = \\frac{1500}{4} = 375',
      },
    ],
    conclusion: 'Carlos tiene exactamente 375 caramelos.',
    pedagogicalTip: 'Comprobación inmediata: 375 (Carlos) + 1125 (Sandra) = 1500 caramelos en total.',
  },
  {
    id: 3,
    category: 'Sistemas de Ecuaciones 2x2',
    topic: 'Problemas con Monedas y Denominaciones',
    statement: 'El cajero de un banco tiene al iniciar la jornada $88.000 en monedas de $100, $200 y $500; se sabe que tiene 110 monedas de $500. Si había en total 320 monedas. ¿Cuántas monedas de $100 y $200, respectivamente, podría tener el cajero?',
    options: [
      { letter: 'A', text: '110 y 150', isCorrect: false },
      { letter: 'B', text: '100 y 200', isCorrect: false },
      { letter: 'C', text: '90 y 120', isCorrect: true },
      { letter: 'D', text: '50 y 50', isCorrect: false },
    ],
    correctLetter: 'C',
    steps: [
      {
        title: 'Paso 1: Descontar la cantidad y valor conocido ($500)',
        explanation: 'Calculamos el dinero y las monedas que representan las 110 monedas de $500:',
        math: '\\text{Dinero en } \\$500 = 110 \\times 500 = \\$55.000',
      },
      {
        title: 'Paso 2: Determinar el remanente en monedas y dinero',
        explanation: 'Restamos las monedas y el dinero conocido del total:',
        math: '\\begin{aligned} \\text{Monedas restantes} &= 320 - 110 = 210 \\\\ \\text{Dinero restante} &= 88.000 - 55.000 = \\$33.000 \\end{aligned}',
      },
      {
        title: 'Paso 3: Plantear el sistema de 2x2 con $100 (x) y $200 (y)',
        explanation: 'Planteamos una ecuación para la cantidad de monedas y otra para su valor monetario:',
        math: '\\begin{cases} x + y = 210 \\\\ 100x + 200y = 33000 \\implies x + 2y = 330 \\end{cases}',
      },
      {
        title: 'Paso 4: Resolver por método de reducción (eliminación)',
        explanation: 'Restamos la primera ecuación de la segunda ecuación simplificada:',
        math: '(x + 2y) - (x + y) = 330 - 210 \\implies y = 120',
      },
      {
        title: 'Paso 5: Hallar el valor de x',
        explanation: 'Sustituimos y = 120 en x + y = 210:',
        math: 'x = 210 - 120 = 90',
      },
    ],
    conclusion: 'El cajero tiene 90 monedas de $100 y 120 monedas de $200.',
    pedagogicalTip: 'Comprobación: 90 ($100) + 120 ($200) + 110 ($500) = 320 monedas. Valor: $9.000 + $24.000 + $55.000 = $88.000.',
  },
  {
    id: 4,
    category: 'Sistemas de Ecuaciones 2x2',
    topic: 'Problemas de Transporte y Ruedas',
    statement: 'En un parqueadero hay 55 vehículos entre coches y motos. Si el total de ruedas es de 170. ¿Cuántos coches y cuántas motos hay respectivamente?',
    options: [
      { letter: 'A', text: '30 y 25', isCorrect: true },
      { letter: 'B', text: '20 y 35', isCorrect: false },
      { letter: 'C', text: '40 y 15', isCorrect: false },
      { letter: 'D', text: '10 y 45', isCorrect: false },
    ],
    correctLetter: 'A',
    steps: [
      {
        title: 'Paso 1: Identificación de variables y constantes físicas',
        explanation: 'Cada coche aporta 4 ruedas y cada moto aporta 2 ruedas:',
        math: 'c = \\text{Número de coches}, \\quad m = \\text{Número de motos}',
      },
      {
        title: 'Paso 2: Sistema de ecuaciones',
        explanation: 'Una ecuación para el total de vehículos y otra para el total de ruedas:',
        math: '\\begin{cases} c + m = 55 \\\\ 4c + 2m = 170 \\end{cases}',
      },
      {
        title: 'Paso 3: Simplificación y reducción',
        explanation: 'Dividimos la segunda ecuación por 2:',
        math: '2c + m = 85',
      },
      {
        title: 'Paso 4: Resta de ecuaciones',
        explanation: 'Restamos (c + m = 55) de (2c + m = 85):',
        math: '(2c + m) - (c + m) = 85 - 55 \\implies c = 30',
      },
      {
        title: 'Paso 5: Hallar la cantidad de motos',
        explanation: 'Reemplazamos c = 30 en la primera ecuación:',
        math: 'm = 55 - 30 = 25',
      },
    ],
    conclusion: 'Hay 30 coches y 25 motos.',
    pedagogicalTip: 'Comprobación de ruedas: 30 × 4 = 120 ruedas de coche; 25 × 2 = 50 ruedas de moto. Total: 120 + 50 = 170 ruedas.',
  },
  {
    id: 5,
    category: 'Sistemas de Ecuaciones 2x2',
    topic: 'Problemas de Edades',
    statement: 'Las edades de Juan y César suman 35 años. Si el doble de la edad de Juan más el triple de la edad de César es 90. Las edades de Juan y César son:',
    options: [
      { letter: 'A', text: 'Juan 20 años y César 15 años', isCorrect: false },
      { letter: 'B', text: 'Juan 17 años y César 18 años', isCorrect: false },
      { letter: 'C', text: 'Juan 14 años y César 21 años', isCorrect: false },
      { letter: 'D', text: 'Juan 15 años y César 20 años', isCorrect: true },
    ],
    correctLetter: 'D',
    steps: [
      {
        title: 'Paso 1: Definición de variables',
        explanation: 'Sea J la edad de Juan y C la edad de César:',
        math: 'J = \\text{Edad de Juan}, \\quad C = \\text{Edad de César}',
      },
      {
        title: 'Paso 2: Traducción al lenguaje algebraico',
        explanation: 'Suman 35 años, y 2 veces la edad de Juan más 3 veces la de César da 90:',
        math: '\\begin{cases} J + C = 35 \\\\ 2J + 3C = 90 \\end{cases}',
      },
      {
        title: 'Paso 3: Método de sustitución',
        explanation: 'Despejamos J de la primera ecuación: J = 35 - C, y sustituimos en la segunda:',
        math: '2(35 - C) + 3C = 90 \\implies 70 - 2C + 3C = 90 \\implies 70 + C = 90',
      },
      {
        title: 'Paso 4: Solución de las incógnitas',
        explanation: 'Despejamos C y luego calculamos J:',
        math: 'C = 90 - 70 = 20, \\quad J = 35 - 20 = 15',
      },
    ],
    conclusion: 'Juan tiene 15 años y César tiene 20 años.',
    pedagogicalTip: 'Comprobación: 15 + 20 = 35. Y 2(15) + 3(20) = 30 + 60 = 90 años.',
  },
  {
    id: 6,
    category: 'Sistemas de Ecuaciones 2x2',
    topic: 'Problemas de Taquilla y Recaudación',
    statement: 'Para la obra de teatro del grado 9 asistieron 90 personas. La entrada para adultos se pagó a $8000 y para niños $5000. Si se recaudaron $570.000. ¿Cuántos adultos entraron a la obra?',
    options: [
      { letter: 'A', text: '40', isCorrect: true },
      { letter: 'B', text: '20', isCorrect: false },
      { letter: 'C', text: '70', isCorrect: false },
      { letter: 'D', text: '50', isCorrect: false },
    ],
    correctLetter: 'A',
    steps: [
      {
        title: 'Paso 1: Variables y ecuaciones',
        explanation: 'Sea a = adultos y n = niños asistentes a la obra:',
        math: '\\begin{cases} a + n = 90 \\\\ 8000a + 5000n = 570000 \\implies 8a + 5n = 570 \\end{cases}',
      },
      {
        title: 'Paso 2: Multiplicación para igualar coeficientes',
        explanation: 'Multiplicamos la primera ecuación por 5 para eliminar la variable n:',
        math: '5a + 5n = 450',
      },
      {
        title: 'Paso 3: Resta y despeje de adultos (a)',
        explanation: 'Restamos (5a + 5n = 450) de (8a + 5n = 570):',
        math: '3a = 120 \\implies a = \\frac{120}{3} = 40',
      },
    ],
    conclusion: 'Entraron 40 adultos a la obra de teatro.',
    pedagogicalTip: 'Comprueba el valor recaudado de adultos: 40 × $8.000 = $320.000.',
  },
  {
    id: 7,
    category: 'Sistemas de Ecuaciones 2x2',
    topic: 'Problemas de Taquilla y Recaudación',
    statement: 'Según el problema anterior ¿Cuántos niños entraron a la obra?',
    options: [
      { letter: 'A', text: '70', isCorrect: false },
      { letter: 'B', text: '50', isCorrect: true },
      { letter: 'C', text: '40', isCorrect: false },
      { letter: 'D', text: '20', isCorrect: false },
    ],
    correctLetter: 'B',
    steps: [
      {
        title: 'Paso 1: Utilizar el total de asistentes y el resultado anterior',
        explanation: 'Sabemos que asistieron 90 personas en total y ya calculamos que entraron 40 adultos:',
        math: 'a + n = 90, \\quad a = 40',
      },
      {
        title: 'Paso 2: Despejar la cantidad de niños (n)',
        explanation: 'Restamos la cantidad de adultos del total de personas:',
        math: 'n = 90 - 40 = 50',
      },
    ],
    conclusion: 'Entraron 50 niños a la obra.',
    pedagogicalTip: 'Comprobación de caja: 40 adultos ($320.000) + 50 niños ($250.000) = $570.000 recaudados.',
  },
  {
    id: 8,
    category: 'Sistemas de Ecuaciones 2x2',
    topic: 'Método de Sustitución',
    statement: 'Al resolver el siguiente sistema de ecuaciones lineales por el método de sustitución, la solución es:\n\n2x – 5y = 7\n4x + 2y = 2',
    options: [
      { letter: 'A', text: 'x = 1, y = -1', isCorrect: true },
      { letter: 'B', text: 'x = 2, y = 1', isCorrect: false },
      { letter: 'C', text: 'x = 0, y = -2', isCorrect: false },
      { letter: 'D', text: 'x = 3, y = 0,5', isCorrect: false },
    ],
    correctLetter: 'A',
    steps: [
      {
        title: 'Paso 1: Despejar una variable sencilla',
        explanation: 'De la ecuación (2) [4x + 2y = 2], dividimos entre 2 y despejamos y:',
        math: '2x + y = 1 \\implies y = 1 - 2x',
      },
      {
        title: 'Paso 2: Sustituir en la ecuación (1)',
        explanation: 'Reemplazamos y = (1 - 2x) en 2x - 5y = 7:',
        math: '2x - 5(1 - 2x) = 7 \\implies 2x - 5 + 10x = 7 \\implies 12x - 5 = 7',
      },
      {
        title: 'Paso 3: Despejar x',
        explanation: 'Sumamos 5 a ambos lados y dividimos por 12:',
        math: '12x = 12 \\implies x = 1',
      },
      {
        title: 'Paso 4: Calcular el valor de y',
        explanation: 'Sustituimos x = 1 en la expresión de y:',
        math: 'y = 1 - 2(1) = 1 - 2 = -1',
      },
    ],
    conclusion: 'La solución del sistema es x = 1, y = -1.',
    pedagogicalTip: 'Verificación en ambas ecuaciones: 2(1) - 5(-1) = 2 + 5 = 7 (Cumple). 4(1) + 2(-1) = 4 - 2 = 2 (Cumple).',
  },
  {
    id: 9,
    category: 'Sistemas de Ecuaciones 2x2',
    topic: 'Método de Igualación',
    statement: 'Al resolver el siguiente sistema de ecuaciones lineales por el método de igualación, la solución es:\n\n5x - 3y = -1\n2x + 4y = 10',
    options: [
      { letter: 'A', text: 'x = 3, y = -1', isCorrect: false },
      { letter: 'B', text: 'x = 5, y = -4', isCorrect: false },
      { letter: 'C', text: 'x = -2, y = 0', isCorrect: false },
      { letter: 'D', text: 'x = 1, y = 2', isCorrect: true },
    ],
    correctLetter: 'D',
    steps: [
      {
        title: 'Paso 1: Despejar la misma incógnita en ambas ecuaciones',
        explanation: 'Despejamos x en las dos ecuaciones:',
        math: '\\begin{aligned} \\text{De (1): } 5x = 3y - 1 &\\implies x = \\frac{3y - 1}{5} \\\\ \\text{De (2): } 2x = 10 - 4y &\\implies x = \\frac{10 - 4y}{2} = 5 - 2y \\end{aligned}',
      },
      {
        title: 'Paso 2: Igualar las expresiones',
        explanation: 'Establecemos la igualdad entre ambas expresiones de x:',
        math: '\\frac{3y - 1}{5} = 5 - 2y',
      },
      {
        title: 'Paso 3: Resolver para y',
        explanation: 'Multiplicamos todo por 5 para eliminar el denominador:',
        math: '3y - 1 = 5(5 - 2y) \\implies 3y - 1 = 25 - 10y \\implies 13y = 26 \\implies y = 2',
      },
      {
        title: 'Paso 4: Calcular x',
        explanation: 'Sustituimos y = 2 en la expresión simplificada x = 5 - 2y:',
        math: 'x = 5 - 2(2) = 5 - 4 = 1',
      },
    ],
    conclusion: 'La solución del sistema es x = 1, y = 2.',
    pedagogicalTip: 'Comprobación: 5(1) - 3(2) = 5 - 6 = -1. Y 2(1) + 4(2) = 2 + 8 = 10.',
  },
  {
    id: 10,
    category: 'Sistemas de Ecuaciones 2x2',
    topic: 'Clasificación de Sistemas y Determinantes',
    statement: 'El sistema de ecuaciones:\n\n2x - 3y = 22\n5x + 2y = 13',
    options: [
      { letter: 'A', text: 'Su solución es el par (1, 2)', isCorrect: false },
      { letter: 'B', text: 'Tiene solución única.', isCorrect: true },
      { letter: 'C', text: 'No tiene solución.', isCorrect: false },
      { letter: 'D', text: 'Tiene infinitas soluciones', isCorrect: false },
    ],
    correctLetter: 'B',
    steps: [
      {
        title: 'Paso 1: Análisis del determinante principal (Δ)',
        explanation: 'Calculamos el determinante formado por los coeficientes de x e y:',
        math: '\\Delta = \\begin{vmatrix} 2 & -3 \\\\ 5 & 2 \\end{vmatrix} = (2)(2) - (-3)(5) = 4 - (-15) = 4 + 15 = 19',
      },
      {
        title: 'Paso 2: Criterio de compatibilidad',
        explanation: 'Como el determinante del sistema es diferente de cero (Δ = 19 ≠ 0), las rectas se cortan en un único punto (no son paralelas ni coincidentes):',
        math: '\\Delta \\neq 0 \\implies \\text{Sistema Compatible Determinado (Solución Única)}',
      },
      {
        title: 'Paso 3: Descarte de la opción A',
        explanation: 'Si probamos (1, 2) en 2(1) - 3(2) = 2 - 6 = -4 ≠ 22, confirmamos que el par (1,2) no es su solución.',
      },
    ],
    conclusion: 'El sistema tiene solución única.',
    pedagogicalTip: 'Regla de oro: Si el determinante de coeficientes Δ ≠ 0, el sistema SIEMPRE tiene solución única.',
  },
  {
    id: 11,
    category: 'Álgebra y Ecuaciones Lineales',
    topic: 'Despeje de Variables',
    statement: 'Dada la ecuación lineal 2x - 4y = -6, al despejar la variable x se obtiene:',
    options: [
      { letter: 'A', text: 'x = 2y - 3', isCorrect: true },
      { letter: 'B', text: 'x = 4y', isCorrect: false },
      { letter: 'C', text: 'x = -3y + 1', isCorrect: false },
      { letter: 'D', text: 'Ninguna de las anteriores', isCorrect: false },
    ],
    correctLetter: 'A',
    steps: [
      {
        title: 'Paso 1: Aislar el término con la variable x',
        explanation: 'Pasamos el término -4y al lado derecho sumando:',
        math: '2x - 4y = -6 \\implies 2x = 4y - 6',
      },
      {
        title: 'Paso 2: Dividir entre el coeficiente de x',
        explanation: 'Dividimos ambos miembros de la ecuación entre 2:',
        math: 'x = \\frac{4y - 6}{2} = \\frac{4y}{2} - \\frac{6}{2} = 2y - 3',
      },
    ],
    conclusion: 'La variable x despejada equivale a x = 2y - 3.',
    pedagogicalTip: 'Siempre simplifica cada término del numerador individualmente entre el denominador.',
  },
  {
    id: 12,
    category: 'Álgebra Lineal y Determinantes',
    topic: 'Determinantes de Segundo Orden',
    statement: 'El valor de x para que el determinante sea igual a 20 en la matriz dada es:\n\n| x   2 |\n| 2   4 | = 20',
    options: [
      { letter: 'A', text: 'x = 7', isCorrect: false },
      { letter: 'B', text: 'x = 8', isCorrect: false },
      { letter: 'C', text: 'x = 6', isCorrect: true },
      { letter: 'D', text: 'x = 3', isCorrect: false },
    ],
    correctLetter: 'C',
    steps: [
      {
        title: 'Paso 1: Fórmula de un determinante 2x2',
        explanation: 'El determinante de una matriz 2x2 se calcula como el producto de la diagonal principal menos el producto de la diagonal secundaria:',
        math: '\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix} = a \\cdot d - b \\cdot c',
      },
      {
        title: 'Paso 2: Planteamiento algebraico con el valor 20',
        explanation: 'Aplicamos la fórmula al determinante del ejercicio:',
        math: '(x)(4) - (2)(2) = 20 \\implies 4x - 4 = 20',
      },
      {
        title: 'Paso 3: Despeje de la incógnita x',
        explanation: 'Sumamos 4 y dividimos por 4:',
        math: '4x = 20 + 4 \\implies 4x = 24 \\implies x = \\frac{24}{4} = 6',
      },
    ],
    conclusion: 'El valor de x debe ser 6.',
    pedagogicalTip: 'Comprobación: (6)(4) - (2)(2) = 24 - 4 = 20.',
  },
  {
    id: 13,
    category: 'Teoría de Funciones',
    topic: 'Función Cuadrática: Propiedades y Clasificación',
    statement: 'Teniendo en cuenta la función f(x) = 4x², es FALSO afirmar que:',
    options: [
      { letter: 'A', text: 'Tiene vértice (0, 0)', isCorrect: false },
      { letter: 'B', text: 'Es una función cúbica', isCorrect: true },
      { letter: 'C', text: 'Su parábola abre hacia arriba', isCorrect: false },
      { letter: 'D', text: 'Es incompleta', isCorrect: false },
    ],
    correctLetter: 'B',
    steps: [
      {
        title: 'Paso 1: Análisis del grado de la función',
        explanation: 'La variable x tiene exponente 2, lo que define una función cuadrática de segundo grado, NO una función cúbica (cuyo grado sería 3):',
        math: 'f(x) = 4x^2 \\implies \\text{Grado 2 (Cuadrática) } \\neq \\text{Cúbica}',
      },
      {
        title: 'Paso 2: Verificación de las otras afirmaciones',
        explanation: '• Vértice: Para f(x) = ax², el vértice está en el origen (0, 0) [Verdadera].\n• Apertura: Como a = 4 > 0, las ramas abren hacia arriba [Verdadera].\n• Es incompleta porque le faltan los términos bx y c [Verdadera].',
      },
    ],
    conclusion: 'La afirmación falsa es "Es una función cúbica", ya que es estrictamente cuadrática.',
    pedagogicalTip: 'Recuerda: Grado 1 = lineal, Grado 2 = cuadrática, Grado 3 = cúbica.',
  },
  {
    id: 14,
    category: 'Teoría de Funciones',
    topic: 'Vértice de una Parábola',
    statement: 'El vértice de la función cuadrática f(x) = 5x² - 3 es:',
    options: [
      { letter: 'A', text: '(0, -3)', isCorrect: true },
      { letter: 'B', text: '(5, 8)', isCorrect: false },
      { letter: 'C', text: '(-2, 6)', isCorrect: false },
      { letter: 'D', text: '(-1, 2)', isCorrect: false },
    ],
    correctLetter: 'A',
    steps: [
      {
        title: 'Paso 1: Identificación de coeficientes',
        explanation: 'En la forma estándar f(x) = ax² + bx + c:',
        math: 'a = 5, \\quad b = 0, \\quad c = -3',
      },
      {
        title: 'Paso 2: Coordenada x del vértice',
        explanation: 'Aplicamos la fórmula del vértice:',
        math: 'x_v = -\\frac{b}{2a} = -\\frac{0}{2(5)} = 0',
      },
      {
        title: 'Paso 3: Coordenada y del vértice',
        explanation: 'Evaluamos la función en x = 0:',
        math: 'y_v = f(0) = 5(0)^2 - 3 = -3',
      },
    ],
    conclusion: 'El vértice de la parábola se encuentra en el punto (0, -3).',
    pedagogicalTip: 'En toda función de la forma f(x) = ax² + c (donde b = 0), el vértice siempre tiene coordenadas (0, c).',
  },
  {
    id: 15,
    category: 'Teoría de Funciones',
    topic: 'Identificación de la Ecuación a partir de la Gráfica',
    statement: 'La función cuadrática que pasa por el origen (0, 0) y por el punto (2, 0), con vértice en el punto (1, -1), corresponde a:',
    options: [
      { letter: 'A', text: 'x² – 4x – 3', isCorrect: false },
      { letter: 'B', text: '5x² + 7', isCorrect: false },
      { letter: 'C', text: 'x²', isCorrect: false },
      { letter: 'D', text: 'x² – 2x', isCorrect: true },
    ],
    correctLetter: 'D',
    steps: [
      {
        title: 'Paso 1: Análisis de los ceros o raíces',
        explanation: 'La parábola corta al eje horizontal en x = 0 y x = 2:',
        math: 'f(x) = a(x - 0)(x - 2) = a(x^2 - 2x)',
      },
      {
        title: 'Paso 2: Determinación del coeficiente a con el vértice',
        explanation: 'El vértice es (1, -1). Evaluamos f(1) = -1:',
        math: 'a(1^2 - 2(1)) = -1 \\implies a(1 - 2) = -1 \\implies -a = -1 \\implies a = 1',
      },
      {
        title: 'Paso 3: Expresión algebraica final',
        explanation: 'Sustituyendo a = 1:',
        math: 'f(x) = 1(x^2 - 2x) = x^2 - 2x',
      },
    ],
    conclusion: 'La función representada es f(x) = x² - 2x.',
    pedagogicalTip: 'Para comprobar: f(0) = 0, f(2) = 4 - 4 = 0, y f(1) = 1 - 2 = -1 (el vértice exacto).',
  },
  {
    id: 16,
    category: 'Ecuaciones Cuadráticas',
    topic: 'Forma General Canónica ax² + bx + c = 0',
    statement: 'La ecuación cuadrática equivalente en su forma estándar de 2x² – 20x + 40 = 2x - 8 es:',
    options: [
      { letter: 'A', text: '2x² – 22x + 48 = 0', isCorrect: true },
      { letter: 'B', text: '2x² + 22x + 48 = 0', isCorrect: false },
      { letter: 'C', text: '2x² + 22x - 48 = 0', isCorrect: false },
      { letter: 'D', text: '2x² - 22x - 48 = 0', isCorrect: false },
    ],
    correctLetter: 'A',
    steps: [
      {
        title: 'Paso 1: Transposición de términos al miembro izquierdo',
        explanation: 'Para llevar la ecuación a la forma ax² + bx + c = 0, pasamos 2x restando y -8 sumando:',
        math: '2x^2 - 20x + 40 - (2x - 8) = 0',
      },
      {
        title: 'Paso 2: Reducción de términos semejantes',
        explanation: 'Agrupamos los términos en x y los términos independientes:',
        math: '2x^2 + (-20x - 2x) + (40 + 8) = 0 \\implies 2x^2 - 22x + 48 = 0',
      },
    ],
    conclusion: 'La ecuación cuadrática equivalente es 2x² – 22x + 48 = 0.',
    pedagogicalTip: 'Cuidado con los signos al trasponer: el término 2x pasa como -2x (dando -22x) y -8 pasa como +8 (dando +48).',
  },
  {
    id: 17,
    category: 'Ecuaciones Cuadráticas',
    topic: 'Resolución por Factor Común',
    statement: 'Las soluciones de la ecuación cuadrática incompleta 25x² – 625x = 0 son:',
    options: [
      { letter: 'A', text: 'x₁ = -25  y  x₂ = 25', isCorrect: false },
      { letter: 'B', text: 'x₁ = -5  y  x₂ = 5', isCorrect: false },
      { letter: 'C', text: 'x₁ = 0  y  x₂ = 25', isCorrect: true },
      { letter: 'D', text: 'x₁ = 1  y  x₂ = -5', isCorrect: false },
    ],
    correctLetter: 'C',
    steps: [
      {
        title: 'Paso 1: Factorización por factor común',
        explanation: 'Extraemos el máximo factor común numérico y literal, que es 25x:',
        math: '25x(x - 25) = 0',
      },
      {
        title: 'Paso 2: Propiedad del producto cero',
        explanation: 'Si el producto de dos factores es cero, al menos uno de ellos debe ser cero:',
        math: '25x = 0 \\implies x_1 = 0 \\quad \\text{o} \\quad x - 25 = 0 \\implies x_2 = 25',
      },
    ],
    conclusion: 'Las soluciones son x₁ = 0 y x₂ = 25.',
    pedagogicalTip: 'Nunca dividas la ecuación entre x para eliminarla, porque perderías la solución fundamental x = 0.',
  },
  {
    id: 18,
    category: 'Geometría Analítica: La Recta',
    topic: 'Pendiente y Rectas Paralelas',
    statement: 'Una recta L₁ pasa por los puntos A(2, 5) y B(6, 13) en el plano cartesiano. Si una segunda recta L₂ es paralela a L₁, ¿cuál es el valor de la pendiente de L₂?',
    options: [
      { letter: 'A', text: '1/2', isCorrect: false },
      { letter: 'B', text: '2', isCorrect: true },
      { letter: 'C', text: '-2', isCorrect: false },
      { letter: 'D', text: '4', isCorrect: false },
    ],
    correctLetter: 'B',
    steps: [
      {
        title: 'Paso 1: Cálculo de la pendiente de L₁',
        explanation: 'Usamos la fórmula de la pendiente con los puntos A(2, 5) y B(6, 13):',
        math: 'm_1 = \\frac{y_2 - y_1}{x_2 - x_1} = \\frac{13 - 5}{6 - 2} = \\frac{8}{4} = 2',
      },
      {
        title: 'Paso 2: Condición de paralelismo entre rectas',
        explanation: 'Dos rectas en el plano son paralelas si y solo si sus pendientes son exactamente iguales:',
        math: 'L_1 \\parallel L_2 \\iff m_2 = m_1 \\implies m_2 = 2',
      },
    ],
    conclusion: 'La pendiente de la recta paralela L₂ es igual a 2.',
    pedagogicalTip: 'Si la pregunta hubiera pedido una recta perpendicular, su pendiente sería el opuesto inverso: m = -1/2.',
  },
  {
    id: 19,
    category: 'Números Complejos',
    topic: 'Adición de Números Complejos en Forma Binómica',
    statement: 'Sean los números complejos z₁ = 4 + 3i y z₂ = 2 - 5i. ¿Cuál es el resultado de realizar la operación de adición z₁ + z₂?',
    options: [
      { letter: 'A', text: '6 - 8i', isCorrect: false },
      { letter: 'B', text: '6 - 2i', isCorrect: true },
      { letter: 'C', text: '2 + 8i', isCorrect: false },
      { letter: 'D', text: '6 + 2i', isCorrect: false },
    ],
    correctLetter: 'B',
    steps: [
      {
        title: 'Paso 1: Agrupar partes reales y partes imaginarias',
        explanation: 'Sumamos las componentes reales entre sí y las componentes imaginarias entre sí:',
        math: 'z_1 + z_2 = (4 + 3i) + (2 - 5i) = (4 + 2) + (3 - 5)i',
      },
      {
        title: 'Paso 2: Reducción aritmética',
        explanation: 'Calculamos 4 + 2 = 6 y 3 - 5 = -2:',
        math: 'z_1 + z_2 = 6 - 2i',
      },
    ],
    conclusion: 'El resultado de la adición es 6 - 2i.',
    pedagogicalTip: 'La parte imaginaria se comporta algebraicamente como un término semejante con la letra i.',
  },
  {
    id: 20,
    category: 'Números Complejos',
    topic: 'Multiplicación de Números Complejos',
    statement: '¿Cuál es el resultado exacto de la multiplicación de los números complejos (3 + 2i) y (1 - 4i)?',
    options: [
      { letter: 'A', text: '11 - 10i', isCorrect: true },
      { letter: 'B', text: '3 - 8i', isCorrect: false },
      { letter: 'C', text: '11 + 10i', isCorrect: false },
      { letter: 'D', text: '-5 - 10i', isCorrect: false },
    ],
    correctLetter: 'A',
    steps: [
      {
        title: 'Paso 1: Aplicación de la propiedad distributiva',
        explanation: 'Multiplicamos cada término del primer binomio por cada término del segundo binomio:',
        math: '(3 + 2i)(1 - 4i) = 3(1) + 3(-4i) + 2i(1) + 2i(-4i)',
      },
      {
        title: 'Paso 2: Simplificación de productos intermedios',
        explanation: 'Efectuamos los productos numéricos:',
        math: '= 3 - 12i + 2i - 8i^2',
      },
      {
        title: 'Paso 3: Aplicación de la identidad fundamental i² = -1',
        explanation: 'Reemplazamos i² por -1 en el término -8i²:',
        math: '-8i^2 = -8(-1) = +8',
      },
      {
        title: 'Paso 4: Reducción final de términos reales e imaginarios',
        explanation: 'Sumamos las partes reales (3 + 8 = 11) y las imaginarias (-12i + 2i = -10i):',
        math: '= (3 + 8) + (-12 + 2)i = 11 - 10i',
      },
    ],
    conclusion: 'El resultado de la multiplicación es 11 - 10i.',
    pedagogicalTip: 'El error más habitual es olvidar cambiar el signo de i² (-8i² se transforma en +8).',
  },
];
