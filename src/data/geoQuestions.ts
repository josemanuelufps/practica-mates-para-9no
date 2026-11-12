import { QuestionItem } from './mathQuestions';

export const geoQuestions: QuestionItem[] = [
  {
    id: 1,
    category: 'Probabilidad y Espacio Muestral',
    topic: 'Espacio Muestral de Experimentos Aleatorios',
    statement: 'Al lanzar dos monedas al aire al mismo tiempo, ¿cuál es el espacio muestral correcto?',
    options: [
      { letter: 'A', text: 'S = {(Cara, Cara), (Cruz, Cruz)}', isCorrect: false },
      { letter: 'B', text: 'S = {(Cara, Cruz), (Cruz, Cara)}', isCorrect: false },
      { letter: 'C', text: 'S = {(Cara, Cara), (Cara, Cruz), (Cruz, Cara), (Cruz, Cruz)}', isCorrect: true },
      { letter: 'D', text: 'S = {Cara, Cruz}', isCorrect: false },
    ],
    correctLetter: 'C',
    steps: [
      {
        title: 'Paso 1: Definición de Espacio Muestral (S)',
        explanation: 'El espacio muestral es el conjunto de todos los resultados posibles e indivisibles de un experimento aleatorio.',
      },
      {
        title: 'Paso 2: Principio fundamental del conteo',
        explanation: 'La primera moneda tiene 2 resultados posibles {Cara, Cruz} y la segunda tiene 2 resultados posibles {Cara, Cruz}:',
        math: 'n(S) = 2 \\times 2 = 4 \\text{ resultados posibles}',
      },
      {
        title: 'Paso 3: Listado de pares ordenados (Moneda 1, Moneda 2)',
        explanation: 'Construimos todas las combinaciones posibles en pares ordenados:',
        math: 'S = \\{(\\text{Cara, Cara}), (\\text{Cara, Cruz}), (\\text{Cruz, Cara}), (\\text{Cruz, Cruz})\\}',
      },
    ],
    conclusion: 'El espacio muestral contiene 4 elementos: C = {(Cara, Cara), (Cara, Cruz), (Cruz, Cara), (Cruz, Cruz)}.',
    pedagogicalTip: '(Cara, Cruz) y (Cruz, Cara) son sucesos distintos porque corresponden a monedas diferentes.',
  },
  {
    id: 2,
    category: 'Probabilidad y Espacio Muestral',
    topic: 'Cardinalidad del Espacio Muestral',
    statement: 'Si se lanzan tres monedas al aire al mismo tiempo, ¿cuántos elementos en total componen su espacio muestral (S)?',
    options: [
      { letter: 'A', text: '3', isCorrect: false },
      { letter: 'B', text: '6', isCorrect: false },
      { letter: 'C', text: '8', isCorrect: true },
      { letter: 'D', text: '9', isCorrect: false },
    ],
    correctLetter: 'C',
    steps: [
      {
        title: 'Paso 1: Principio multiplicativo para eventos independientes',
        explanation: 'Cada moneda tiene 2 resultados posibles independientes (Cara o Cruz). Para n monedas lanzadas al tiempo:',
        math: 'n(S) = 2^n',
      },
      {
        title: 'Paso 2: Aplicación para n = 3 monedas',
        explanation: 'Multiplicamos las posibilidades de cada moneda:',
        math: 'n(S) = 2 \\times 2 \\times 2 = 2^3 = 8 \\text{ elementos}',
      },
      {
        title: 'Paso 3: Verificación por extensión',
        explanation: 'Los 8 sucesos son: (CCC), (CCX), (CXC), (XCC), (CXX), (XCX), (XXC) y (XXX).',
      },
    ],
    conclusion: 'El espacio muestral está compuesto por exactamente 8 elementos.',
    pedagogicalTip: 'Error común: Sumar 2 + 2 + 2 = 6. Recuerda que las opciones de eventos independientes se MULTIPLICAN (2³ = 8).',
  },
  {
    id: 3,
    category: 'Probabilidad Clásica',
    topic: 'Regla de Laplace en un Dado de Seis Caras',
    statement: 'Si se lanza un dado común de seis caras, ¿cuál es la probabilidad simple de obtener un número menor o igual a 2?',
    options: [
      { letter: 'A', text: '1/6', isCorrect: false },
      { letter: 'B', text: '1/3', isCorrect: true },
      { letter: 'C', text: '1/2', isCorrect: false },
      { letter: 'D', text: '2/3', isCorrect: false },
    ],
    correctLetter: 'B',
    steps: [
      {
        title: 'Paso 1: Determinar el espacio muestral del dado',
        explanation: 'Un dado de seis caras numeradas del 1 al 6 tiene como espacio muestral:',
        math: 'S = \\{1, 2, 3, 4, 5, 6\\} \\implies n(S) = 6',
      },
      {
        title: 'Paso 2: Identificar el suceso favorable (A)',
        explanation: 'El evento A es "número menor o igual a 2" (≤ 2), que incluye al 1 y al 2:',
        math: 'A = \\{1, 2\\} \\implies n(A) = 2',
      },
      {
        title: 'Paso 3: Aplicar la regla de Laplace y simplificar',
        explanation: 'Dividimos los casos favorables entre los casos posibles:',
        math: 'P(A) = \\frac{n(A)}{n(S)} = \\frac{2}{6} = \\frac{1}{3}',
      },
    ],
    conclusion: 'La probabilidad es 2/6, que al simplificarse da 1/3 (aproximadamente 33,3%).',
    pedagogicalTip: '"Menor o igual a 2" incluye al número 2. Si dijera "estrictamente menor a 2", solo incluiría al 1 (1/6).',
  },
  {
    id: 4,
    category: 'Probabilidad Clásica',
    topic: 'Probabilidad Simple con Baraja Española / Estándar',
    statement: 'En una baraja estándar de 52 cartas, ¿cuál es la probabilidad de extraer una carta al azar y que esta sea un As?',
    options: [
      { letter: 'A', text: '1/52', isCorrect: false },
      { letter: 'B', text: '1/13', isCorrect: true },
      { letter: 'C', text: '3/13', isCorrect: false },
      { letter: 'D', text: '1/2', isCorrect: false },
    ],
    correctLetter: 'B',
    steps: [
      {
        title: 'Paso 1: Total de cartas en el mazo (casos posibles)',
        explanation: 'La baraja estándar contiene 52 cartas en total distribuidas en 4 palos (Corazones, Diamantes, Tréboles, Picas):',
        math: 'n(S) = 52',
      },
      {
        title: 'Paso 2: Conteo de Ases (casos favorables)',
        explanation: 'Cada uno de los 4 palos contiene exactamente un As:',
        math: 'n(\\text{Ases}) = 4',
      },
      {
        title: 'Paso 3: Aplicación de la regla de Laplace y simplificación',
        explanation: 'Calculamos la razón y simplificamos sacando cuarta parte:',
        math: 'P(\\text{As}) = \\frac{4}{52} = \\frac{4 \\div 4}{52 \\div 4} = \\frac{1}{13}',
      },
    ],
    conclusion: 'La probabilidad de extraer un As es 1/13.',
    pedagogicalTip: '1 de cada 13 cartas de cualquier palo es un As. Por eso 4/52 = 1/13.',
  },
  {
    id: 5,
    category: 'Probabilidad Clásica',
    topic: 'Problemas Contextualizados de Decisión al Azar',
    statement: 'Sebastián y Florencia están a cargo de un grupo de excursión en el Parque Nac. Alerce Andino. Llegaron a un cruce con dos caminos posibles: Florencia quiere ir por la izquierda (río) y Sebastián por la derecha (alerce milenario). Florencia llevaba un dado de 6 caras y acordaron que si salía un número mayor de 2 gana ella, y si no ganaba él. ¿Cuál es la probabilidad de que gane Florencia?',
    options: [
      { letter: 'A', text: '1/6', isCorrect: false },
      { letter: 'B', text: '1/3', isCorrect: false },
      { letter: 'C', text: '3/6', isCorrect: false },
      { letter: 'D', text: '4/6', isCorrect: true },
    ],
    correctLetter: 'D',
    steps: [
      {
        title: 'Paso 1: Espacio muestral del dado',
        explanation: 'El dado común tiene 6 caras equiprobables:',
        math: 'S = \\{1, 2, 3, 4, 5, 6\\} \\implies n(S) = 6',
      },
      {
        title: 'Paso 2: Condición de victoria de Florencia',
        explanation: 'Florencia gana con un número estrictamente "mayor de 2" (> 2), es decir los números 3, 4, 5 y 6:',
        math: 'F = \\{3, 4, 5, 6\\} \\implies n(F) = 4 \\text{ casos favorables}',
      },
      {
        title: 'Paso 3: Cálculo de la probabilidad',
        explanation: 'Aplicamos la regla de Laplace:',
        math: 'P(\\text{Gane Florencia}) = \\frac{n(F)}{n(S)} = \\frac{4}{6}',
      },
    ],
    conclusion: 'La probabilidad de que gane Florencia es 4/6 (o 2/3).',
    pedagogicalTip: 'Sebastián solo ganaría con {1, 2}, teniendo una probabilidad de 2/6. Por tanto, Florencia tiene el doble de probabilidad de ganar.',
  },
  {
    id: 6,
    category: 'Probabilidad y Espacio Muestral',
    topic: 'Combinatoria de Opciones Binarias (Verdadero o Falso)',
    statement: 'Gabriel no estudió dos preguntas de una prueba de química y, como eran de "Verdadero o Falso", se vio obligado a responder al azar. ¿Cuáles son las posibles combinaciones de respuestas de Gabriel para esas dos preguntas?',
    options: [
      { letter: 'A', text: '{(V, F), (F, F)}', isCorrect: false },
      { letter: 'B', text: '{(V, F), (F, V), (F, F)}', isCorrect: false },
      { letter: 'C', text: '{(V, V), (V, F), (F, V)}', isCorrect: false },
      { letter: 'D', text: '{(V, F), (F, V), (F, F)}', isCorrect: false },
      { letter: 'E', text: '{(V, V), (V, F), (F, V), (F, F)}', isCorrect: true },
    ],
    correctLetter: 'E',
    steps: [
      {
        title: 'Paso 1: Identificación de opciones por pregunta',
        explanation: 'Para la Pregunta 1 hay 2 opciones {V, F}. Para la Pregunta 2 hay 2 opciones {V, F}.',
        math: 'n(\\text{Combinaciones}) = 2 \\times 2 = 4',
      },
      {
        title: 'Paso 2: Diagrama de árbol / Listado exhaustivo',
        explanation: 'Las combinaciones ordenadas (Pregunta 1, Pregunta 2) son:',
        math: '\\begin{aligned} \\text{Si P1 es V: } & (V, V), (V, F) \\\\ \\text{Si P1 es F: } & (F, V), (F, F) \\end{aligned}',
      },
      {
        title: 'Paso 3: Conjunto total de resultados',
        explanation: 'Uniendo todos los resultados posibles obtenemos el espacio muestral completo:',
        math: 'S = \\{(V, V), (V, F), (F, V), (F, F)\\}',
      },
    ],
    conclusion: 'Las posibles respuestas son {(V, V), (V, F), (F, V), (F, F)}.',
    pedagogicalTip: 'Cualquier conjunto con menos de 4 elementos está incompleto porque omite alguna de las combinaciones posibles.',
  },
  {
    id: 7,
    category: 'Probabilidad Compuesta',
    topic: 'Regla del Producto para Eventos Independientes',
    statement: 'Si se lanza una moneda y un dado de seis caras al mismo tiempo, ¿cuál es la probabilidad compuesta de obtener "Cara" en la moneda y un número "5" en el dado?',
    options: [
      { letter: 'A', text: '1/2', isCorrect: false },
      { letter: 'B', text: '1/6', isCorrect: false },
      { letter: 'C', text: '1/8', isCorrect: false },
      { letter: 'D', text: '1/12', isCorrect: true },
    ],
    correctLetter: 'D',
    steps: [
      {
        title: 'Paso 1: Análisis de independencia de los sucesos',
        explanation: 'El resultado de la moneda no afecta ni influye en el resultado del dado, son eventos estadísticamente independientes.',
      },
      {
        title: 'Paso 2: Probabilidad individual de cada suceso',
        explanation: 'Calculamos la probabilidad simple para cada experimento:',
        math: 'P(\\text{Cara}) = \\frac{1}{2}, \\quad P(5) = \\frac{1}{6}',
      },
      {
        title: 'Paso 3: Aplicación de la regla de la multiplicación',
        explanation: 'Para eventos independientes, la probabilidad conjunta P(A ∩ B) = P(A) · P(B):',
        math: 'P(\\text{Cara y 5}) = P(\\text{Cara}) \\times P(5) = \\frac{1}{2} \\times \\frac{1}{6} = \\frac{1}{12}',
      },
    ],
    conclusion: 'La probabilidad compuesta es 1/12 (hay 1 caso favorable de 12 combinaciones posibles en total).',
    pedagogicalTip: 'El espacio muestral conjunto tiene 2 × 6 = 12 resultados: {(C,1), (C,2), ..., (C,5), ..., (X,6)}. Solo (C,5) cumple la condición.',
  },
  {
    id: 8,
    category: 'Cuerpos Redondos (Geometría Espacial)',
    topic: 'Volumen de la Esfera',
    statement: 'Si el diámetro de una esfera es 12 cm, ¿cuál es su volumen exacto?',
    options: [
      { letter: 'A', text: 'El volumen de la esfera es 200π cm³.', isCorrect: false },
      { letter: 'B', text: 'El volumen de la esfera es 288π cm³.', isCorrect: true },
      { letter: 'C', text: 'El volumen de la esfera es 100π cm³.', isCorrect: false },
      { letter: 'D', text: 'El volumen de la esfera es 144π cm³.', isCorrect: false },
    ],
    correctLetter: 'B',
    steps: [
      {
        title: 'Paso 1: Obtención del radio a partir del diámetro',
        explanation: 'El radio es exactamente la mitad del diámetro:',
        math: 'r = \\frac{d}{2} = \\frac{12\\text{ cm}}{2} = 6\\text{ cm}',
      },
      {
        title: 'Paso 2: Fórmula del volumen de una esfera',
        explanation: 'La fórmula que relaciona el radio con el volumen espacial de la esfera es:',
        math: 'V = \\frac{4}{3}\\pi r^3',
      },
      {
        title: 'Paso 3: Sustitución y cálculo algebraico',
        explanation: 'Elevamos el radio al cubo: 6³ = 216:',
        math: 'V = \\frac{4}{3}\\pi (6)^3 = \\frac{4}{3}\\pi (216) = 4\\pi \\left(\\frac{216}{3}\\right) = 4\\pi (72) = 288\\pi\\text{ cm}^3',
      },
    ],
    conclusion: 'El volumen de la esfera es exactamente 288π cm³.',
    pedagogicalTip: '¡Cuidado con usar el diámetro 12 en vez del radio 6 en la fórmula! Ese es el despiste más común en exámenes.',
  },
  {
    id: 9,
    category: 'Cuerpos Redondos (Geometría Espacial)',
    topic: 'Área Total del Cono (Generatriz, Área Lateral y Base)',
    statement: 'En la figura geométrica el radio de la base mide 10 cm y la altura mide 24 cm. ¿Cuánto mide el área total del cono correspondiente? (Considerar π = 3,14)',
    options: [
      { letter: 'A', text: '2525,2 cm²', isCorrect: false },
      { letter: 'B', text: '2135,2 cm²', isCorrect: false },
      { letter: 'C', text: '816,4 cm²', isCorrect: false },
      { letter: 'D', text: '1130,4 cm²', isCorrect: true },
    ],
    correctLetter: 'D',
    steps: [
      {
        title: 'Paso 1: Cálculo de la generatriz (g) con Teorema de Pitágoras',
        explanation: 'El radio (r), la altura (h) y la generatriz (g) forman un triángulo rectángulo:',
        math: 'g = \\sqrt{r^2 + h^2} = \\sqrt{10^2 + 24^2} = \\sqrt{100 + 576} = \\sqrt{676} = 26\\text{ cm}',
      },
      {
        title: 'Paso 2: Cálculo del área lateral (A_L)',
        explanation: 'El área lateral del cono es el producto de π por el radio y por la generatriz:',
        math: 'A_L = \\pi \\cdot r \\cdot g = 3{,}14 \\times 10 \\times 26 = 31{,}4 \\times 26 = 816{,}4\\text{ cm}^2',
      },
      {
        title: 'Paso 3: Cálculo del área de la base circular (A_B)',
        explanation: 'La base es un círculo de radio 10 cm:',
        math: 'A_B = \\pi \\cdot r^2 = 3{,}14 \\times 10^2 = 3{,}14 \\times 100 = 314\\text{ cm}^2',
      },
      {
        title: 'Paso 4: Suma para obtener el área total (A_T)',
        explanation: 'Sumamos el área lateral más el área de la base:',
        math: 'A_T = A_L + A_B = 816{,}4 + 314 = 1130{,}4\\text{ cm}^2',
      },
    ],
    conclusion: 'El área total del cono mide 1130,4 cm².',
    pedagogicalTip: 'También puedes usar la fórmula agrupada: A_T = π · r · (g + r) = 3,14 × 10 × (26 + 10) = 31,4 × 36 = 1130,4 cm².',
  },
  {
    id: 10,
    category: 'Técnicas de Conteo y Combinatoria',
    topic: 'Combinaciones sin Repetición',
    statement: 'Un comité de estudiantes está conformado por un grupo de 8 candidatos finalistas. Para asistir a un congreso académico regional, el docente encargado debe seleccionar una delegación de exactamente 3 estudiantes. ¿De cuántas formas diferentes se puede conformar esta delegación?',
    options: [
      { letter: 'A', text: '24', isCorrect: false },
      { letter: 'B', text: '56', isCorrect: true },
      { letter: 'C', text: '336', isCorrect: false },
      { letter: 'D', text: '40.320', isCorrect: false },
    ],
    correctLetter: 'B',
    steps: [
      {
        title: 'Paso 1: ¿Importa el orden en la delegación?',
        explanation: 'Los 3 estudiantes seleccionados van como una delegación en conjunto; ningún cargo es jerárquico ni diferenciado (no hay presidente, tesorero, etc.). Por tanto, NO importa el orden.',
        math: '\\text{No importa el orden } \\implies \\text{Es una COMBINACIÓN } C(n, k)',
      },
      {
        title: 'Paso 2: Identificación de los parámetros',
        explanation: 'Tenemos n = 8 candidatos en total y tomamos k = 3 estudiantes:',
        math: 'n = 8, \\quad k = 3',
      },
      {
        title: 'Paso 3: Aplicación de la fórmula de combinaciones',
        explanation: 'Fórmula de coeficientes binomiales C(n, k) = n! / (k! · (n - k)!):',
        math: 'C(8, 3) = \\frac{8!}{3!(8 - 3)!} = \\frac{8!}{3! \\cdot 5!} = \\frac{8 \\times 7 \\times 6 \\times 5!}{3 \\times 2 \\times 1 \\times 5!}',
      },
      {
        title: 'Paso 4: Simplificación de factores',
        explanation: 'Cancelamos 5! y simplificamos 3 × 2 × 1 = 6 con el 6 del numerador:',
        math: 'C(8, 3) = \\frac{8 \\times 7 \\times 6}{6} = 8 \\times 7 = 56',
      },
    ],
    conclusion: 'La delegación se puede conformar de 56 formas diferentes.',
    pedagogicalTip: 'Si el orden importara (por ejemplo Presidente, Secretario y Tesorero), sería una variación: V(8,3) = 8 × 7 × 6 = 336 (Opción C). Como es un grupo colegiado, se divide entre 3! = 6.',
  },
];
