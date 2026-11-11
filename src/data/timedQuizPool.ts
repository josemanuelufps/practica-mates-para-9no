import { TimedQuestion } from '../types/timedQuiz';
import { newTimedQuizPool } from './timedQuizNewPool';

const baseTimedQuizPool: TimedQuestion[] = [
  // ==========================================
  // PAST PERFECT (1-20)
  // ==========================================
  {
    id: 'pp-01',
    topic: 'past-perfect',
    type: 'multiple-choice',
    prompt: 'Elige la opción que completa la oración en Past Perfect:',
    sentence: 'When we arrived at the cinema, the movie ______ already ______.',
    options: ['had / started', 'has / started', 'have / start', 'did / started'],
    correctIndex: 0,
    explanation: 'La película empezó ANTES de llegar al cine, por eso se usa had + participio (had started).'
  },
  {
    id: 'pp-02',
    topic: 'past-perfect',
    type: 'quick-slot',
    prompt: 'Completa la estructura del Past Perfect:',
    sentenceBefore: 'She could not open the door because she',
    sentenceAfter: 'her keys.',
    options: ['had lost', 'has lost', 'did lose'],
    correctAnswer: 'had lost',
    explanation: 'Se usa had + participio pasado (had lost) para la causa anterior en el pasado.'
  },
  {
    id: 'pp-03',
    topic: 'past-perfect',
    type: 'correct-incorrect',
    prompt: '¿La siguiente oración gramaticalmente es correcta?',
    sentence: 'Before he went to sleep, Carlos had brushed his teeth.',
    isCorrect: true,
    explanation: 'Correcto: lavarse los dientes ocurrió primero (had brushed) antes de ir a dormir (went).'
  },
  {
    id: 'pp-04',
    topic: 'past-perfect',
    type: 'correct-incorrect',
    prompt: '¿La siguiente oración gramaticalmente es correcta?',
    sentence: 'By the time the bus arrived, they had already wait for an hour.',
    isCorrect: false,
    correctionIfWrong: 'had already waited',
    explanation: 'Incorrecto: Past Perfect requiere el participio del verbo (waited), no la forma base (wait).'
  },
  {
    id: 'pp-05',
    topic: 'past-perfect',
    type: 'multiple-choice',
    prompt: 'Selecciona la forma correcta para completar el espacio:',
    sentence: 'By the time Mom called, Daniel ______ his homework.',
    options: ['had finished', 'have finished', 'finishing', 'did finished'],
    correctIndex: 0,
    explanation: '"By the time" introduce la segunda acción (called); la primera debe ir en Past Perfect (had finished).'
  },
  {
    id: 'pp-06',
    topic: 'past-perfect',
    type: 'binary-classify',
    prompt: '¿Qué acción ocurrió PRIMERO en el tiempo?',
    phrase: 'The train had left when we reached the station.',
    categoryA: 'El tren partió (Train left)',
    categoryB: 'Llegamos a la estación (Reached)',
    correctCategory: 'A',
    explanation: 'La acción en Past Perfect (had left) siempre ocurrió antes que el Past Simple (reached).'
  },
  {
    id: 'pp-07',
    topic: 'past-perfect',
    type: 'quick-slot',
    prompt: 'Elige el auxiliar correcto para esta negación:',
    sentenceBefore: 'I was very hungry because I',
    sentenceAfter: 'breakfast.',
    options: ['had not eaten', 'did not ate', 'have not eaten'],
    correctAnswer: 'had not eaten',
    explanation: 'Past Perfect negativo se forma con had not + participio (had not eaten).'
  },
  {
    id: 'pp-08',
    topic: 'past-perfect',
    type: 'multiple-choice',
    prompt: '¿Cuál es la forma interrogativa correcta en Past Perfect?',
    sentence: '______ you ______ the email before the teacher asked for it?',
    options: ['Had / sent', 'Did / send', 'Have / sent', 'Were / send'],
    correctIndex: 0,
    explanation: 'Las preguntas en Past Perfect inician con Had + sujeto + participio (Had you sent...?).'
  },
  {
    id: 'pp-09',
    topic: 'past-perfect',
    type: 'binary-classify',
    prompt: 'Clasifica el tiempo verbal de la frase resaltada:',
    phrase: 'Lucas HAD NEVER SEEN snow before his trip to Canada.',
    categoryA: 'Past Perfect',
    categoryB: 'Past Simple',
    correctCategory: 'A',
    explanation: 'had + never + seen (participio de see) corresponde a Past Perfect.'
  },
  {
    id: 'pp-10',
    topic: 'past-perfect',
    type: 'quick-slot',
    prompt: 'Selecciona la opción correcta:',
    sentenceBefore: 'They told me that they',
    sentenceAfter: 'to Paris three years earlier.',
    options: ['had traveled', 'have traveled', 'did travel'],
    correctAnswer: 'had traveled',
    explanation: 'En estilo indirecto sobre un hecho anterior se emplea Past Perfect (had traveled).'
  },
  {
    id: 'pp-11',
    topic: 'past-perfect',
    type: 'multiple-choice',
    prompt: 'Completa la oración:',
    sentence: 'The grass was wet because it ______ all night.',
    options: ['had rained', 'was rain', 'has rained', 'did rain'],
    correctIndex: 0,
    explanation: 'Llover durante la noche fue la causa previa a que el pasto estuviera mojado en el pasado.'
  },
  {
    id: 'pp-12',
    topic: 'past-perfect',
    type: 'correct-incorrect',
    prompt: '¿Es correcta esta oración?',
    sentence: 'After we had ate dinner, we watched a movie.',
    isCorrect: false,
    correctionIfWrong: 'had eaten',
    explanation: 'Incorrecto: el participio de eat es eaten, no ate (ate es pasado simple).'
  },
  {
    id: 'pp-13',
    topic: 'past-perfect',
    type: 'binary-classify',
    prompt: '¿Qué acción ocurrió SEGUNDO (después)?',
    phrase: 'After Sofia had studied hard, she passed the exam.',
    categoryA: 'Estudió (had studied)',
    categoryB: 'Aprobó el examen (passed)',
    correctCategory: 'B',
    explanation: 'Aprobó (passed) ocurrió en segundo lugar; primero había estudiado (had studied).'
  },
  {
    id: 'pp-14',
    topic: 'past-perfect',
    type: 'quick-slot',
    prompt: 'Elige la conjugación adecuada:',
    sentenceBefore: 'I recognized him because I',
    sentenceAfter: 'him at summer camp.',
    options: ['had met', 'have met', 'did met'],
    correctAnswer: 'had met',
    explanation: 'Conocerlo en el campamento ocurrió antes de reconocerlo en el pasado.'
  },
  {
    id: 'pp-15',
    topic: 'past-perfect',
    type: 'multiple-choice',
    prompt: 'Selecciona la opción correcta:',
    sentence: 'The house was completely dark because everyone ______ to bed.',
    options: ['had gone', 'has went', 'had went', 'were gone'],
    correctIndex: 0,
    explanation: 'La estructura correcta es had + participio irregular (had gone, nunca had went).'
  },
  {
    id: 'pp-16',
    topic: 'past-perfect',
    type: 'correct-incorrect',
    prompt: '¿La siguiente oración gramaticalmente es correcta?',
    sentence: 'He failed the quiz because he hadn’t studied the notes.',
    isCorrect: true,
    explanation: 'Correcto: hadn’t studied es la contracción estándar de had not studied.'
  },
  {
    id: 'pp-17',
    topic: 'past-perfect',
    type: 'multiple-choice',
    prompt: 'Completa la pregunta:',
    sentence: 'Why ______ she ______ crying before you spoke to her?',
    options: ['had / started', 'did / started', 'has / start', 'was / started'],
    correctIndex: 0,
    explanation: 'Pregunta en Past Perfect: Why had she started...?'
  },
  {
    id: 'pp-18',
    topic: 'past-perfect',
    type: 'binary-classify',
    prompt: '¿Esta frase expresa una acción antes de otra en el pasado?',
    phrase: 'They had already sold all tickets when we logged in.',
    categoryA: 'Sí, acción anterior (Past Perfect)',
    categoryB: 'No, acción simultánea',
    correctCategory: 'A',
    explanation: 'Ya habían vendido las entradas antes de iniciar sesión.'
  },
  {
    id: 'pp-19',
    topic: 'past-perfect',
    type: 'quick-slot',
    prompt: 'Completa la oración:',
    sentenceBefore: 'She was nervous because she',
    sentenceAfter: 'in public before.',
    options: ['had never spoken', 'had never spoke', 'did never spoke'],
    correctAnswer: 'had never spoken',
    explanation: 'El participio de speak es spoken: had never spoken.'
  },
  {
    id: 'pp-20',
    topic: 'past-perfect',
    type: 'multiple-choice',
    prompt: 'Identifica la forma correcta del verbo to write:',
    sentence: 'Camila ______ three essays before the semester ended.',
    options: ['had written', 'had wrote', 'has written', 'had writing'],
    correctIndex: 0,
    explanation: 'El participio del verbo irregular write es written (had written).'
  },

  // ==========================================
  // ZERO CONDITIONAL (21-35)
  // ==========================================
  {
    id: 'zc-01',
    topic: 'zero-conditional',
    type: 'multiple-choice',
    prompt: 'Completa con la regla del Zero Conditional:',
    sentence: 'If you ______ ice, it ______.',
    options: ['heat / melts', 'heats / melt', 'will heat / melts', 'heat / will melt'],
    correctIndex: 0,
    explanation: 'Zero Conditional usa Present Simple en ambas cláusulas (you heat / it melts).'
  },
  {
    id: 'zc-02',
    topic: 'zero-conditional',
    type: 'quick-slot',
    prompt: 'Completa la ley natural en Present Simple:',
    sentenceBefore: 'If water reaches 100°C, it',
    sentenceAfter: '.',
    options: ['boils', 'will boil', 'boiled'],
    correctAnswer: 'boils',
    explanation: 'Es un hecho científico universal, por lo que ambas cláusulas van en Present Simple.'
  },
  {
    id: 'zc-03',
    topic: 'zero-conditional',
    type: 'correct-incorrect',
    prompt: '¿Es correcta esta oración de Zero Conditional?',
    sentence: 'If people don’t drink water, they die.',
    isCorrect: true,
    explanation: 'Correcto: hecho biológico universal expresado con Present Simple en ambas partes.'
  },
  {
    id: 'zc-04',
    topic: 'zero-conditional',
    type: 'multiple-choice',
    prompt: 'Atención a la tercera persona en Zero Conditional:',
    sentence: 'If it rains, the grass ______ wet.',
    options: ['gets', 'will get', 'got', 'is getting'],
    correctIndex: 0,
    explanation: 'En verdades generales constantes se usa Present Simple (the grass gets).'
  },
  {
    id: 'zc-05',
    topic: 'zero-conditional',
    type: 'binary-classify',
    prompt: '¿Esta afirmación describe una ley científica general o un plan futuro?',
    phrase: 'If you mix red and blue, you get purple.',
    categoryA: 'Hecho constante / Ley física (Zero)',
    categoryB: 'Plan futuro probable (First)',
    correctCategory: 'A',
    explanation: 'Es una verdad científica y universal sobre los colores: Zero Conditional.'
  },
  {
    id: 'zc-06',
    topic: 'zero-conditional',
    type: 'quick-slot',
    prompt: 'Completa con el verbo correcto en Present Simple:',
    sentenceBefore: 'Plants die if they',
    sentenceAfter: 'enough sunlight.',
    options: ['do not get', 'will not get', 'did not get'],
    correctAnswer: 'do not get',
    explanation: 'En Zero Conditional la cláusula condicional lleva Present Simple (they do not get).'
  },
  {
    id: 'zc-07',
    topic: 'zero-conditional',
    type: 'correct-incorrect',
    prompt: '¿Es correcto el uso del verbo auxiliar en esta regla?',
    sentence: 'If babies are hungry, they will cry.',
    isCorrect: false,
    correctionIfWrong: 'they cry',
    explanation: 'Para hechos biológicos universales se usa Present Simple (they cry), no will cry.'
  },
  {
    id: 'zc-08',
    topic: 'zero-conditional',
    type: 'multiple-choice',
    prompt: 'Selecciona la opción adecuada:',
    sentence: 'If you touch a hot stove, you ______ burned.',
    options: ['get', 'will get', 'got', 'getting'],
    correctIndex: 0,
    explanation: 'Zero Conditional expresa consecuencias inmediatas y ciertas con Present Simple.'
  },
  {
    id: 'zc-09',
    topic: 'zero-conditional',
    type: 'binary-classify',
    prompt: '¿Qué estructura gramatical tiene el Zero Conditional?',
    phrase: 'If + Present Simple, [ ??? ]',
    categoryA: 'Present Simple',
    categoryB: 'will + Verb',
    correctCategory: 'A',
    explanation: 'Zero Conditional = If + Present Simple, Present Simple.'
  },
  {
    id: 'zc-10',
    topic: 'zero-conditional',
    type: 'quick-slot',
    prompt: 'Completa la oración:',
    sentenceBefore: 'When you press this red button, the engine',
    sentenceAfter: 'immediately.',
    options: ['stops', 'will stop', 'stopped'],
    correctAnswer: 'stops',
    explanation: 'Una instrucción de máquina directa sigue la regla del Zero Conditional (engine stops).'
  },
  {
    id: 'zc-11',
    topic: 'zero-conditional',
    type: 'multiple-choice',
    prompt: 'Cuidado con la concordancia de tercera persona:',
    sentence: 'If my sister ______ coffee late at night, she does not sleep.',
    options: ['drinks', 'drink', 'will drink', 'drinking'],
    correctIndex: 0,
    explanation: 'Con My sister (she) en Present Simple se añade -s: drinks.'
  },
  {
    id: 'zc-12',
    topic: 'zero-conditional',
    type: 'correct-incorrect',
    prompt: '¿La siguiente oración gramaticalmente es correcta?',
    sentence: 'Wood floats if you put it on water.',
    isCorrect: true,
    explanation: 'Correcto: ley física con Present Simple en ambas cláusulas (floats / put).'
  },
  {
    id: 'zc-13',
    topic: 'zero-conditional',
    type: 'quick-slot',
    prompt: 'Completa con la forma correcta:',
    sentenceBefore: 'If an apple falls, gravity',
    sentenceAfter: 'it toward the ground.',
    options: ['pulls', 'will pull', 'pulled'],
    correctAnswer: 'pulls',
    explanation: 'La ley de la gravedad es una verdad física invariable (gravity pulls).'
  },
  {
    id: 'zc-14',
    topic: 'zero-conditional',
    type: 'multiple-choice',
    prompt: 'Selecciona la forma correcta:',
    sentence: 'Iron ______ if you leave it in humid air.',
    options: ['rusts', 'rust', 'will rust', 'rusted'],
    correctIndex: 0,
    explanation: 'Iron (it) lleva verbo con -s en Present Simple: rusts.'
  },
  {
    id: 'zc-15',
    topic: 'zero-conditional',
    type: 'binary-classify',
    prompt: '¿En el Zero Conditional se puede sustituir IF por WHEN sin cambiar el sentido?',
    phrase: 'IF water reaches 0°C, it freezes. = WHEN water reaches 0°C, it freezes.',
    categoryA: 'Sí, totalmente equivalente',
    categoryB: 'No, altera el significado',
    correctCategory: 'A',
    explanation: 'En Zero Conditional "if" y "when" son intercambiables porque el resultado es 100% seguro.'
  },

  // ==========================================
  // FIRST CONDITIONAL (36-50)
  // ==========================================
  {
    id: 'fc-01',
    topic: 'first-conditional',
    type: 'multiple-choice',
    prompt: 'Completa la oración de First Conditional:',
    sentence: 'If it rains this afternoon, we ______ our soccer match.',
    options: ['will cancel', 'cancel', 'would cancel', 'cancelled'],
    correctIndex: 0,
    explanation: 'First Conditional: If + Present Simple, will + Verbo base.'
  },
  {
    id: 'fc-02',
    topic: 'first-conditional',
    type: 'quick-slot',
    prompt: 'Elige el verbo para la cláusula IF:',
    sentenceBefore: 'If Mateo',
    sentenceAfter: 'hard, he will pass his English exam tomorrow.',
    options: ['studies', 'will study', 'studied'],
    correctAnswer: 'studies',
    explanation: 'La cláusula que lleva "If" NUNCA lleva "will"; se conjuga en Present Simple (studies).'
  },
  {
    id: 'fc-03',
    topic: 'first-conditional',
    type: 'correct-incorrect',
    prompt: '¿Es correcta esta oración de First Conditional?',
    sentence: 'If she will arrive early, I will tell her the news.',
    isCorrect: false,
    correctionIfWrong: 'If she arrives early',
    explanation: 'Error común: la condición con IF nunca lleva will. Debe ser "If she arrives".'
  },
  {
    id: 'fc-04',
    topic: 'first-conditional',
    type: 'multiple-choice',
    prompt: 'Selecciona el resultado futuro en First Conditional:',
    sentence: 'If we hurry up, we ______ the last train home.',
    options: ['will catch', 'caught', 'would catch', 'catch'],
    correctIndex: 0,
    explanation: 'Consecuencia probable futura en First Conditional: will catch.'
  },
  {
    id: 'fc-05',
    topic: 'first-conditional',
    type: 'binary-classify',
    prompt: '¿Dónde se ubica "will" en el First Conditional?',
    phrase: 'If you wake up late, you will miss breakfast.',
    categoryA: 'En la cláusula de resultado',
    categoryB: 'En la cláusula del IF',
    correctCategory: 'A',
    explanation: 'Will siempre acompaña al resultado (you will miss), jamás a la cláusula del IF.'
  },
  {
    id: 'fc-06',
    topic: 'first-conditional',
    type: 'quick-slot',
    prompt: 'Completa la negación futura:',
    sentenceBefore: 'If you do not wear a coat, you',
    sentenceAfter: 'cold tonight.',
    options: ['will catch a', 'catch a', 'would catch a'],
    correctAnswer: 'will catch a',
    explanation: 'Resultado probable en el futuro: will catch.'
  },
  {
    id: 'fc-07',
    topic: 'first-conditional',
    type: 'multiple-choice',
    prompt: '¿Cuál es la forma negativa de will en el resultado?',
    sentence: 'If I have too much homework, I ______ to the party.',
    options: ['won’t go', 'don’t go', 'wouldn’t go', 'not will go'],
    correctIndex: 0,
    explanation: 'La contracción negativa estándar de will not es won’t (won’t go).'
  },
  {
    id: 'fc-08',
    topic: 'first-conditional',
    type: 'correct-incorrect',
    prompt: '¿La siguiente oración gramaticalmente es correcta?',
    sentence: 'They will be late if the traffic is heavy.',
    isCorrect: true,
    explanation: 'Correcto: la cláusula principal (will be) puede ir al inicio sin coma intermedia.'
  },
  {
    id: 'fc-09',
    topic: 'first-conditional',
    type: 'quick-slot',
    prompt: 'Selecciona la opción correcta:',
    sentenceBefore: 'What',
    sentenceAfter: 'if you lose your phone today?',
    options: ['will you do', 'do you do', 'would you do'],
    correctAnswer: 'will you do',
    explanation: 'Pregunta sobre posibilidad futura real (First): What will you do if...?'
  },
  {
    id: 'fc-10',
    topic: 'first-conditional',
    type: 'multiple-choice',
    prompt: 'Elige la opción correcta:',
    sentence: 'If Valentina ______ enough money, she will buy the new backpack.',
    options: ['saves', 'will save', 'saved', 'saving'],
    correctIndex: 0,
    explanation: 'Cláusula con IF en Present Simple (Valentina saves).'
  },
  {
    id: 'fc-11',
    topic: 'first-conditional',
    type: 'binary-classify',
    prompt: '¿Qué tipo de situación expresa el First Conditional?',
    phrase: 'If the weather is sunny tomorrow, we will go to the pool.',
    categoryA: 'Situación real y probable en el futuro',
    categoryB: 'Situación imposible en el pasado',
    correctCategory: 'A',
    explanation: 'El First Conditional habla de posibilidades reales en el futuro cercano.'
  },
  {
    id: 'fc-12',
    topic: 'first-conditional',
    type: 'correct-incorrect',
    prompt: '¿Es correcta esta oración con UNLESS (a menos que)?',
    sentence: 'Unless you hurry, you will miss the flight.',
    isCorrect: true,
    explanation: 'Correcto: Unless significa "If you do not" y se usa comúnmente en First Conditional.'
  },
  {
    id: 'fc-13',
    topic: 'first-conditional',
    type: 'multiple-choice',
    prompt: 'Completa la oración:',
    sentence: 'If you ______ attention in class, you will understand the topic.',
    options: ['pay', 'will pay', 'paid', 'paying'],
    correctIndex: 0,
    explanation: 'If + Present Simple (you pay attention).'
  },
  {
    id: 'fc-14',
    topic: 'first-conditional',
    type: 'quick-slot',
    prompt: 'Completa con la forma futura:',
    sentenceBefore: 'The dog will bark if someone',
    sentenceAfter: 'at the gate.',
    options: ['knocks', 'will knock', 'knocked'],
    correctAnswer: 'knocks',
    explanation: 'En la parte con IF/condition se usa Present Simple (someone knocks).'
  },
  {
    id: 'fc-15',
    topic: 'first-conditional',
    type: 'multiple-choice',
    prompt: 'Selecciona la opción correcta:',
    sentence: 'If we do not protect the forest, many animals ______ their habitat.',
    options: ['will lose', 'lose', 'would lose', 'lost'],
    correctIndex: 0,
    explanation: 'Consecuencia futura en First Conditional: will lose.'
  },

  // ==========================================
  // ZERO VS FIRST CONDITIONAL (51-65)
  // ==========================================
  {
    id: 'zvf-01',
    topic: 'zero-vs-first',
    type: 'binary-classify',
    prompt: 'Clasifica el tipo de condicional:',
    phrase: 'If you drop glass on concrete, it breaks.',
    categoryA: 'Zero Conditional (Hecho universal)',
    categoryB: 'First Conditional (Posibilidad futura)',
    correctCategory: 'A',
    explanation: 'Present + Present describe un hecho físico general: Zero Conditional.'
  },
  {
    id: 'zvf-02',
    topic: 'zero-vs-first',
    type: 'binary-classify',
    prompt: 'Clasifica el tipo de condicional:',
    phrase: 'If I drop this specific glass, it will break on the floor.',
    categoryA: 'Zero Conditional',
    categoryB: 'First Conditional (Caso particular en futuro)',
    correctCategory: 'B',
    explanation: 'Usa "will break" para referirse a un evento futuro concreto: First Conditional.'
  },
  {
    id: 'zvf-03',
    topic: 'zero-vs-first',
    type: 'multiple-choice',
    prompt: 'Identifica si es Zero o First Conditional según el contexto:',
    sentence: 'When the sun sets, it ______ dark everywhere.',
    options: ['gets (Zero)', 'will get (First)', 'got', 'is getting'],
    correctIndex: 0,
    explanation: 'Fenómeno natural constante que ocurre siempre: Zero Conditional (gets).'
  },
  {
    id: 'zvf-04',
    topic: 'zero-vs-first',
    type: 'multiple-choice',
    prompt: 'Identifica si es Zero o First Conditional según el contexto:',
    sentence: 'If you come to my house this evening, I ______ you my new video game.',
    options: ['will show (First)', 'show (Zero)', 'showed', 'showing'],
    correctIndex: 0,
    explanation: 'Plan futuro contingente específico: First Conditional (will show).'
  },
  {
    id: 'zvf-05',
    topic: 'zero-vs-first',
    type: 'binary-classify',
    prompt: '¿Zero o First Conditional?',
    phrase: 'If you freeze water, it expands.',
    categoryA: 'Zero Conditional',
    categoryB: 'First Conditional',
    correctCategory: 'A',
    explanation: 'Ley física de expansión del agua: Zero Conditional (Presente + Presente).'
  },
  {
    id: 'zvf-06',
    topic: 'zero-vs-first',
    type: 'binary-classify',
    prompt: '¿Zero o First Conditional?',
    phrase: 'If you eat all that cake now, you will feel sick later.',
    categoryA: 'Zero Conditional',
    categoryB: 'First Conditional',
    correctCategory: 'B',
    explanation: 'Predicción sobre una acción futura particular: First Conditional.'
  },
  {
    id: 'zvf-07',
    topic: 'zero-vs-first',
    type: 'quick-slot',
    prompt: 'Elige la opción que convierte la frase en First Conditional:',
    sentenceBefore: 'If it snows tomorrow morning, we',
    sentenceAfter: 'a snowman.',
    options: ['will build', 'build', 'built'],
    correctAnswer: 'will build',
    explanation: 'Al hablar de "tomorrow morning" es un plan futuro condicionado: will build.'
  },
  {
    id: 'zvf-08',
    topic: 'zero-vs-first',
    type: 'quick-slot',
    prompt: 'Elige la opción que convierte la frase en Zero Conditional (regla general):',
    sentenceBefore: 'If people exercise regularly, their health',
    sentenceAfter: '.',
    options: ['improves', 'will improve', 'improved'],
    correctAnswer: 'improves',
    explanation: 'Hábito constante con resultado fisiológico comprobado: Zero Conditional (improves).'
  },
  {
    id: 'zvf-09',
    topic: 'zero-vs-first',
    type: 'correct-incorrect',
    prompt: '¿Es correcta esta distinción gramatical?',
    sentence: 'Zero Conditional always uses "will" in the main clause.',
    isCorrect: false,
    correctionIfWrong: 'Zero Conditional uses Present Simple, not will.',
    explanation: 'Falso: el Zero Conditional usa Present Simple en ambas cláusulas, NUNCA "will".'
  },
  {
    id: 'zvf-10',
    topic: 'zero-vs-first',
    type: 'multiple-choice',
    prompt: 'Elige la opción adecuada:',
    sentence: 'If you touch fire, you ______ burned. (Verdad universal)',
    options: ['get', 'will get', 'getting', 'got'],
    correctIndex: 0,
    explanation: 'Para verdades universales donde la consecuencia es 100% segura se usa Present Simple (get).'
  },
  {
    id: 'zvf-11',
    topic: 'zero-vs-first',
    type: 'binary-classify',
    prompt: 'Clasifica la oración:',
    phrase: 'If Sofia calls me, I will tell her to join us.',
    categoryA: 'First Conditional (will)',
    categoryB: 'Zero Conditional',
    correctCategory: 'A',
    explanation: 'Lleva "will tell", indicando consecuencia futura particular: First Conditional.'
  },
  {
    id: 'zvf-12',
    topic: 'zero-vs-first',
    type: 'binary-classify',
    prompt: 'Clasifica la oración:',
    phrase: 'Oil floats if you pour it into water.',
    categoryA: 'Zero Conditional (Densidad física)',
    categoryB: 'First Conditional',
    correctCategory: 'A',
    explanation: 'Ley física de densidad de líquidos: Zero Conditional.'
  },
  {
    id: 'zvf-13',
    topic: 'zero-vs-first',
    type: 'multiple-choice',
    prompt: 'Completa para First Conditional:',
    sentence: 'If we win the tournament on Saturday, we ______ with pizza.',
    options: ['will celebrate', 'celebrate', 'would celebrate', 'celebrating'],
    correctIndex: 0,
    explanation: 'Plan futuro concreto para el sábado: First Conditional (will celebrate).'
  },
  {
    id: 'zvf-14',
    topic: 'zero-vs-first',
    type: 'correct-incorrect',
    prompt: '¿Es correcto el tiempo verbal para esta verdad general?',
    sentence: 'If you multiply any number by zero, the result is zero.',
    isCorrect: true,
    explanation: 'Correcto: regla matemática universal con Present Simple (is).'
  },
  {
    id: 'zvf-15',
    topic: 'zero-vs-first',
    type: 'quick-slot',
    prompt: 'Completa la advertencia futura:',
    sentenceBefore: 'If you touch that wet paint, your hands',
    sentenceAfter: 'dirty.',
    options: ['will get', 'get', 'got'],
    correctAnswer: 'will get',
    explanation: 'Advertencia sobre una acción específica inminente: First Conditional (will get).'
  },

  // ==========================================
  // SECOND CONDITIONAL (66-77)
  // ==========================================
  {
    id: 'sc-01',
    topic: 'second-conditional',
    type: 'multiple-choice',
    prompt: 'Estructura del Second Conditional (situaciones hipotéticas):',
    sentence: 'If I ______ a million dollars, I ______ around the world.',
    options: ['had / would travel', 'have / will travel', 'had / will travel', 'have / would travel'],
    correctIndex: 0,
    explanation: 'Second Conditional: If + Past Simple, would + Verbo base.'
  },
  {
    id: 'sc-02',
    topic: 'second-conditional',
    type: 'binary-classify',
    prompt: '¿Qué tipo de situación expresa el Second Conditional?',
    phrase: 'If I were invisible, I would explore the city at night.',
    categoryA: 'Hipotética / Imaginaria en el presente',
    categoryB: 'Hecho real comprobado',
    correctCategory: 'A',
    explanation: 'No soy invisible; es una fantasía o situación imaginaria en el presente.'
  },
  {
    id: 'sc-03',
    topic: 'second-conditional',
    type: 'quick-slot',
    prompt: 'Atención a la regla formal de "were" en Second Conditional:',
    sentenceBefore: 'If I',
    sentenceAfter: 'you, I would accept that job offer.',
    options: ['were', 'was', 'am'],
    correctAnswer: 'were',
    explanation: 'En inglés formal, en el Second Conditional se usa "were" para todos los pronombres (If I were you).'
  },
  {
    id: 'sc-04',
    topic: 'second-conditional',
    type: 'multiple-choice',
    prompt: 'Completa la oración hipotética:',
    sentence: 'If she knew the answer, she ______ us right now.',
    options: ['would tell', 'will tell', 'told', 'tells'],
    correctIndex: 0,
    explanation: 'Resultado hipotético en Second Conditional: would + base verb (would tell).'
  },
  {
    id: 'sc-05',
    topic: 'second-conditional',
    type: 'correct-incorrect',
    prompt: '¿Es correcta esta oración de Second Conditional?',
    sentence: 'If we lived near the beach, we would swim every day.',
    isCorrect: true,
    explanation: 'Correcto: If + Past Simple (lived), would + Verbo base (would swim).'
  },
  {
    id: 'sc-06',
    topic: 'second-conditional',
    type: 'quick-slot',
    prompt: 'Completa la cláusula condicional:',
    sentenceBefore: 'I would buy that electric car if I',
    sentenceAfter: 'enough money.',
    options: ['had', 'have', 'would have'],
    correctAnswer: 'had',
    explanation: 'La cláusula del IF en Second Conditional va en Past Simple (had).'
  },
  {
    id: 'sc-07',
    topic: 'second-conditional',
    type: 'multiple-choice',
    prompt: 'Selecciona la opción correcta:',
    sentence: 'What ______ you ______ if you saw an alien in your garden?',
    options: ['would / do', 'will / do', 'did / do', 'do / do'],
    correctIndex: 0,
    explanation: 'Pregunta hipotética: What would you do if you saw...?'
  },
  {
    id: 'sc-08',
    topic: 'second-conditional',
    type: 'binary-classify',
    prompt: '¿Qué auxiliar es característico del resultado en Second Conditional?',
    phrase: 'If he trained harder, he [ ??? ] win the race.',
    categoryA: 'would',
    categoryB: 'will',
    correctCategory: 'A',
    explanation: 'El Second Conditional utiliza "would" en la cláusula de resultado.'
  },
  {
    id: 'sc-09',
    topic: 'second-conditional',
    type: 'correct-incorrect',
    prompt: '¿Es correcto el uso de los tiempos verbales?',
    sentence: 'If I would win the lottery, I bought a house.',
    isCorrect: false,
    correctionIfWrong: 'If I won the lottery, I would buy a house',
    explanation: 'Error: la cláusula del IF nunca lleva "would"; debe ser "If I won ... I would buy".'
  },
  {
    id: 'sc-10',
    topic: 'second-conditional',
    type: 'quick-slot',
    prompt: 'Completa la oración:',
    sentenceBefore: 'If humans had wings, they',
    sentenceAfter: 'need airplanes.',
    options: ['would not', 'will not', 'did not'],
    correctAnswer: 'would not',
    explanation: 'Resultado hipotético negativo: would not (wouldn’t).'
  },
  {
    id: 'sc-11',
    topic: 'second-conditional',
    type: 'multiple-choice',
    prompt: 'Selecciona la forma correcta:',
    sentence: 'If Santiago ______ more free time, he would learn to play the violin.',
    options: ['had', 'has', 'would have', 'having'],
    correctIndex: 0,
    explanation: 'If + Past Simple (Santiago had).'
  },
  {
    id: 'sc-12',
    topic: 'second-conditional',
    type: 'binary-classify',
    prompt: '¿La siguiente oración se refiere al presente o al pasado?',
    phrase: 'If I spoke fluent Japanese, I would move to Tokyo.',
    categoryA: 'Presente hipotético (no hablo japonés ahora)',
    categoryB: 'Pasado histórico',
    correctCategory: 'A',
    explanation: 'Aunque usa verbos en forma pasada (spoke), describe una hipótesis en el presente.'
  },

  // ==========================================
  // THIRD CONDITIONAL (78-90)
  // ==========================================
  {
    id: 'tc-01',
    topic: 'third-conditional',
    type: 'multiple-choice',
    prompt: 'Estructura del Third Conditional (pasado imposible / arrepentimiento):',
    sentence: 'If I ______ harder, I ______ the test.',
    options: ['had studied / would have passed', 'studied / would pass', 'had studied / will pass', 'have studied / would passed'],
    correctIndex: 0,
    explanation: 'Third Conditional: If + Past Perfect, would have + participio pasado.'
  },
  {
    id: 'tc-02',
    topic: 'third-conditional',
    type: 'binary-classify',
    prompt: '¿Qué expresa esta oración?',
    phrase: 'If we had left earlier, we would have caught the flight.',
    categoryA: 'Un pasado que ya no se puede cambiar (arrepentimiento)',
    categoryB: 'Un plan para mañana',
    correctCategory: 'A',
    explanation: 'El vuelo ya se perdió en el pasado; describe lo que habría ocurrido en una situación contraria.'
  },
  {
    id: 'tc-03',
    topic: 'third-conditional',
    type: 'quick-slot',
    prompt: 'Completa la cláusula del resultado:',
    sentenceBefore: 'If she had checked the map, she',
    sentenceAfter: 'lost.',
    options: ['would not have gotten', 'would not get', 'will not get'],
    correctAnswer: 'would not have gotten',
    explanation: 'Third Conditional negativo: would not have + participio (gotten).'
  },
  {
    id: 'tc-04',
    topic: 'third-conditional',
    type: 'correct-incorrect',
    prompt: '¿Es correcta esta oración de Third Conditional?',
    sentence: 'If you had told me, I would have helped you.',
    isCorrect: true,
    explanation: 'Correcto: If + had told (Past Perfect), would have helped (resultado).'
  },
  {
    id: 'tc-05',
    topic: 'third-conditional',
    type: 'multiple-choice',
    prompt: 'Elige la opción correcta:',
    sentence: 'They ______ the game if their goalkeeper ______ injured.',
    options: ['would have won / had not been', 'will win / was not', 'would win / were not', 'won / had been'],
    correctIndex: 0,
    explanation: 'Third Conditional: would have won if their goalkeeper had not been injured.'
  },
  {
    id: 'tc-06',
    topic: 'third-conditional',
    type: 'quick-slot',
    prompt: 'Completa la condición en el pasado:',
    sentenceBefore: 'If the alarm',
    sentenceAfter: ', I would not have arrived late to the exam.',
    options: ['had gone off', 'went off', 'has gone off'],
    correctAnswer: 'had gone off',
    explanation: 'La condición en Third Conditional requiere Past Perfect (had gone off).'
  },
  {
    id: 'tc-07',
    topic: 'third-conditional',
    type: 'binary-classify',
    prompt: '¿Ocurrió realmente la acción en el pasado?',
    phrase: 'If Felipe had worn his helmet, he wouldn’t have hurt his head.',
    categoryA: 'No usó casco y se lastimó',
    categoryB: 'Sí usó casco y no le pasó nada',
    correctCategory: 'A',
    explanation: 'Third Conditional habla de lo contrario a lo que ocurrió en realidad en el pasado.'
  },
  {
    id: 'tc-08',
    topic: 'third-conditional',
    type: 'multiple-choice',
    prompt: 'Selecciona la forma correcta del verbo:',
    sentence: 'We would have called you if we ______ your phone number.',
    options: ['had had', 'had', 'would have had', 'have had'],
    correctIndex: 0,
    explanation: 'Past Perfect del verbo "have" es had (auxiliar) + had (participio): had had.'
  },
  {
    id: 'tc-09',
    topic: 'third-conditional',
    type: 'correct-incorrect',
    prompt: '¿Es correcta esta oración?',
    sentence: 'If I would have known, I had warned you.',
    isCorrect: false,
    correctionIfWrong: 'If I had known, I would have warned you',
    explanation: 'Error: la cláusula del IF lleva "had known", y el resultado lleva "would have warned".'
  },
  {
    id: 'tc-10',
    topic: 'third-conditional',
    type: 'quick-slot',
    prompt: 'Completa la oración:',
    sentenceBefore: 'If she had practiced more, she',
    sentenceAfter: 'first place in the race.',
    options: ['would have taken', 'would take', 'will take'],
    correctAnswer: 'would have taken',
    explanation: 'Resultado en Third Conditional: would have + participio (taken).'
  },
  {
    id: 'tc-11',
    topic: 'third-conditional',
    type: 'multiple-choice',
    prompt: '¿Cuál es la forma interrogativa correcta?',
    sentence: '______ you ______ differently if you had known the truth?',
    options: ['Would / have acted', 'Will / have acted', 'Did / act', 'Had / acted'],
    correctIndex: 0,
    explanation: 'Pregunta en Third Conditional: Would you have acted differently...?'
  },
  {
    id: 'tc-12',
    topic: 'third-conditional',
    type: 'binary-classify',
    prompt: '¿Qué tiempo verbal va dentro de la cláusula IF en el Third Conditional?',
    phrase: 'If + [ ??? ], would have + V3',
    categoryA: 'Past Perfect (had + V3)',
    categoryB: 'Past Simple (V2)',
    correctCategory: 'A',
    explanation: 'La regla del Third Conditional exige Past Perfect en la cláusula condicional.'
  },
  {
    id: 'tc-13',
    topic: 'third-conditional',
    type: 'quick-slot',
    prompt: 'Completa con el verbo correcto:',
    sentenceBefore: 'If the driver had stopped at the red light, the accident',
    sentenceAfter: '.',
    options: ['would not have happened', 'would not happen', 'did not happen'],
    correctAnswer: 'would not have happened',
    explanation: 'Hecho hipotético no ocurrido en el pasado: would not have happened.'
  },

  // ==========================================
  // SECOND VS THIRD CONDITIONAL (91-100)
  // ==========================================
  {
    id: 'svt-01',
    topic: 'second-vs-third',
    type: 'binary-classify',
    prompt: 'Clasifica la oración:',
    phrase: 'If I were taller, I would play basketball.',
    categoryA: 'Second Conditional (Presente hipotético)',
    categoryB: 'Third Conditional (Pasado imposible)',
    correctCategory: 'A',
    explanation: 'Habla de una característica actual hipotética (were / would play): Second Conditional.'
  },
  {
    id: 'svt-02',
    topic: 'second-vs-third',
    type: 'binary-classify',
    prompt: 'Clasifica la oración:',
    phrase: 'If I had been taller back in high school, I would have played in that final.',
    categoryA: 'Second Conditional',
    categoryB: 'Third Conditional (Pasado imposible)',
    correctCategory: 'B',
    explanation: 'had been / would have played se refiere a una situación pasada que no se puede cambiar.'
  },
  {
    id: 'svt-03',
    topic: 'second-vs-third',
    type: 'multiple-choice',
    prompt: 'Identifica si es Second o Third Conditional:',
    sentence: 'If we had an umbrella right now, we ______ wet. (Presente)',
    options: ['would not get (Second)', 'would not have gotten (Third)', 'will not get', 'do not get'],
    correctIndex: 0,
    explanation: 'Como se refiere al momento actual ("right now"), es Second Conditional: would not get.'
  },
  {
    id: 'svt-04',
    topic: 'second-vs-third',
    type: 'multiple-choice',
    prompt: 'Identifica si es Second o Third Conditional:',
    sentence: 'If we had brought an umbrella yesterday, we ______ soaked. (Pasado)',
    options: ['would not have gotten (Third)', 'would not get (Second)', 'will not get', 'did not get'],
    correctIndex: 0,
    explanation: 'Al referirse a un hecho de ayer ("yesterday"), es Third Conditional: would not have gotten.'
  },
  {
    id: 'svt-05',
    topic: 'second-vs-third',
    type: 'binary-classify',
    prompt: '¿A qué tiempo se refiere?',
    phrase: 'If I had studied, I would have passed the test.',
    categoryA: 'Al pasado (Third Conditional)',
    categoryB: 'Al presente o futuro (Second Conditional)',
    correctCategory: 'A',
    explanation: 'had studied / would have passed es Third Conditional y se refiere al pasado.'
  },
  {
    id: 'svt-06',
    topic: 'second-vs-third',
    type: 'quick-slot',
    prompt: 'Completa la hipótesis en presente (Second):',
    sentenceBefore: 'If she had time today, she',
    sentenceAfter: 'us at the cafe.',
    options: ['would join', 'would have joined', 'will join'],
    correctAnswer: 'would join',
    explanation: 'Para una hipótesis hoy en presente: would + verbo base (would join).'
  },
  {
    id: 'svt-07',
    topic: 'second-vs-third',
    type: 'quick-slot',
    prompt: 'Completa el arrepentimiento del pasado (Third):',
    sentenceBefore: 'If she had had time yesterday, she',
    sentenceAfter: 'us at the cafe.',
    options: ['would have joined', 'would join', 'will join'],
    correctAnswer: 'would have joined',
    explanation: 'Para un evento pasado no ocurrido: would have + participio (would have joined).'
  },
  {
    id: 'svt-08',
    topic: 'second-vs-third',
    type: 'correct-incorrect',
    prompt: '¿Es correcta esta distinción?',
    sentence: 'Second Conditional uses "would + base verb", while Third Conditional uses "would have + past participle".',
    isCorrect: true,
    explanation: 'Verdadero: esa es la diferencia clave entre Second (would + V) y Third (would have + V3).'
  },
  {
    id: 'svt-09',
    topic: 'second-vs-third',
    type: 'binary-classify',
    prompt: '¿Second o Third Conditional?',
    phrase: 'If humans lived on Mars today, life would be very different.',
    categoryA: 'Second Conditional (Hipotético en presente)',
    categoryB: 'Third Conditional (Pasado)',
    correctCategory: 'A',
    explanation: 'Habla de cómo sería la vida hoy: Second Conditional (lived / would be).'
  },
  {
    id: 'svt-10',
    topic: 'second-vs-third',
    type: 'multiple-choice',
    prompt: 'Selecciona la opción correcta para esta hipótesis presente:',
    sentence: 'If I ______ a superhero, I ______ save people every day.',
    options: ['were / would', 'had been / would have', 'am / will', 'was / will'],
    correctIndex: 0,
    explanation: 'Second Conditional formal: If I were a superhero, I would save people.'
  }
];

export const timedQuizPool: TimedQuestion[] = [
  ...baseTimedQuizPool,
  ...newTimedQuizPool
];
