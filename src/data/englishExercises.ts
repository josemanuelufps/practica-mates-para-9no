import { FillBlankItem, MultipleChoiceItem, DragSlotExercise } from '../types';

// ==========================================
// SESIÓN 1 (HOY): PAST PERFECT
// ==========================================

export const pastPerfectFillBlanks: FillBlankItem[] = [
  {
    id: 'pp-fb-1',
    sentenceBefore: 'When the teacher arrived, the students',
    sentenceAfter: 'their homework already.',
    verbHint: 'finish',
    acceptedAnswers: ['had finished', 'had already finished'],
    explanation: 'Usamos Past Perfect ("had finished") porque la acción de terminar la tarea ocurrió ANTES de que el profesor llegara en el pasado.',
  },
  {
    id: 'pp-fb-2',
    sentenceBefore: 'Sara could not enter her house because she',
    sentenceAfter: 'her keys at school.',
    verbHint: 'lose',
    acceptedAnswers: ['had lost', "'d lost"],
    explanation: 'El participio de "lose" es "lost". Perdió las llaves antes de intentar entrar a la casa ("had lost").',
  },
  {
    id: 'pp-fb-3',
    sentenceBefore: 'The train',
    sentenceAfter: 'before we reached the station.',
    verbHint: 'leave',
    acceptedAnswers: ['had left', "'d left"],
    explanation: '"leave" tiene participio irregular "left". El tren se fue primero ("had left") y luego llegamos a la estación.',
  },
  {
    id: 'pp-fb-4',
    sentenceBefore: 'Lucas was very tired because he',
    sentenceAfter: 'all night for the math test.',
    verbHint: 'study',
    acceptedAnswers: ['had studied', "'d studied"],
    explanation: 'Causa previa en el pasado: estudiar toda la noche ("had studied") provocó el cansancio posterior.',
  },
  {
    id: 'pp-fb-5',
    sentenceBefore: 'By the time I called my friend, he',
    sentenceAfter: 'to bed.',
    verbHint: 'go',
    acceptedAnswers: ['had gone', "'d gone"],
    explanation: 'El participio de "go" es "gone". Ya se había ido a dormir ("had gone") antes de la llamada.',
  },
];

export const pastPerfectSentenceCompletion: MultipleChoiceItem[] = [
  {
    id: 'pp-sc-1',
    category: 'Past Perfect - Complete the sentences',
    question: 'She felt confident during the English exam because she ________ all the irregular verbs.',
    options: [
      'had reviewed',
      'has reviewed',
      'reviewed',
      'was reviewing'
    ],
    correctIndex: 0,
    explanation: 'Correcto: "had reviewed". El repaso se completó antes del momento del examen.',
  },
  {
    id: 'pp-sc-2',
    category: 'Past Perfect - Complete the sentences',
    question: 'By the time the movie started, we ________ all the popcorn.',
    options: [
      'ate',
      'had eaten',
      'have eaten',
      'were eating'
    ],
    correctIndex: 1,
    explanation: 'Correcto: "had eaten". La frase "By the time..." indica que la comida de palomitas sucedió primero.',
  },
  {
    id: 'pp-sc-3',
    category: 'Past Perfect - Complete the sentences',
    question: 'I recognized the boy immediately because I ________ him at the summer camp two years earlier.',
    options: [
      'met',
      'had met',
      'did meet',
      'have met'
    ],
    correctIndex: 1,
    explanation: 'Correcto: "had met". Conocerlo en el campamento fue un evento anterior a reconocerlo.',
  },
  {
    id: 'pp-sc-4',
    category: 'Past Perfect - Complete the sentences',
    question: 'They could not board the airplane because they ________ their boarding passes at the counter.',
    options: [
      'had forgotten',
      'forgot',
      'have forgotten',
      'had forgot'
    ],
    correctIndex: 0,
    explanation: 'Correcto: "had forgotten". El participio de "forget" es "forgotten". La acción de olvidar ocurrió antes de intentar abordar.',
  },
];

// ==========================================
// SESIÓN 1 (HOY): ZERO CONDITIONAL
// ==========================================

export const zeroConditionalSentences: FillBlankItem[] = [
  {
    id: 'zc-1',
    sentenceBefore: 'If you heat water to 100 degrees Celsius, it',
    sentenceAfter: '.',
    verbHint: 'boil',
    acceptedAnswers: ['boils'],
    explanation: 'En Zero Conditional (hecho científico): If + Present Simple, Present Simple. Con "it" añadimos -s al verbo ("boils").',
  },
  {
    id: 'zc-2',
    sentenceBefore: 'If people do not drink enough water, they',
    sentenceAfter: 'dehydrated.',
    verbHint: 'get',
    acceptedAnswers: ['get', 'become'],
    explanation: 'Hecho biológico universal: Sujeto plural "they" + verbo base en presente "get".',
  },
  {
    id: 'zc-3',
    sentenceBefore: 'When you mix blue and yellow paint, you',
    sentenceAfter: 'green.',
    verbHint: 'get',
    acceptedAnswers: ['get', 'obtain'],
    explanation: 'Verdad general: presente simple "you get". "When" funciona igual que "If" en Zero Conditional.',
  },
  {
    id: 'zc-4',
    sentenceBefore: 'If ice is exposed to room temperature, it',
    sentenceAfter: '.',
    verbHint: 'melt',
    acceptedAnswers: ['melts'],
    explanation: 'Causa y efecto universal: "it" lleva la terminación de tercera persona en presente simple ("melts").',
  },
];

// ==========================================
// SESIÓN 1 (HOY): FIRST CONDITIONAL
// ==========================================

export const firstConditionalSentences: FillBlankItem[] = [
  {
    id: 'fc-1',
    sentenceBefore: 'If you study hard this afternoon, you',
    sentenceAfter: 'the 9th grade algebra test.',
    verbHint: 'pass',
    acceptedAnswers: ['will pass', "'ll pass"],
    explanation: 'First Conditional: If + Present Simple, will + Verbo en infinitivo ("will pass"). Expresa una consecuencia real y probable en el futuro.',
  },
  {
    id: 'fc-2',
    sentenceBefore: 'If it rains later today, we',
    sentenceAfter: 'at home.',
    verbHint: 'stay',
    acceptedAnswers: ['will stay', "'ll stay"],
    explanation: 'Condición probable en el futuro: "will stay".',
  },
  {
    id: 'fc-3',
    sentenceBefore: 'She will miss the school bus if she',
    sentenceAfter: 'right now.',
    verbHint: 'not wake up',
    acceptedAnswers: ["does not wake up", "doesn't wake up"],
    explanation: 'La cláusula con "if" en First Conditional SIEMPRE va en Present Simple: con "she" usamos "doesn\'t wake up".',
  },
  {
    id: 'fc-4',
    sentenceBefore: 'If our team wins the championship on Saturday, we',
    sentenceAfter: 'together.',
    verbHint: 'celebrate',
    acceptedAnswers: ['will celebrate', "'ll celebrate"],
    explanation: 'Resultado futuro probable: "will celebrate".',
  },
];

// ==========================================
// SESIÓN 1 (HOY): ZERO VS FIRST CONDITIONAL (DISCRIMINACIÓN)
// ==========================================

export const zeroVsFirstMultipleChoice: MultipleChoiceItem[] = [
  {
    id: 'zvf-1',
    category: 'Zero vs First Conditional',
    question: 'If you touch a hot stove, you ________ burned immediately.',
    options: [
      'get (Zero Conditional - Ley física/hecho seguro)',
      'will get (First Conditional - Posibilidad futura única)',
      'got (Past Simple)',
      'would get (Second Conditional)'
    ],
    correctIndex: 0,
    explanation: 'Zero Conditional: Es una ley física o regla universal inmediata. Cada vez que tocas una estufa caliente, te quemas ("you get burned").',
  },
  {
    id: 'zvf-2',
    category: 'Zero vs First Conditional',
    question: 'If my uncle visits us this weekend, we ________ to the amusement park.',
    options: [
      'will go (First Conditional - Situación específica futura)',
      'go (Zero Conditional - Hábito universal)',
      'went (Past Simple)',
      'had gone (Past Perfect)'
    ],
    correctIndex: 0,
    explanation: 'First Conditional: Es una situación específica en el futuro ("this weekend"), no una ley universal. Usamos "will go".',
  },
  {
    id: 'zvf-3',
    category: 'Zero vs First Conditional',
    question: 'Plants die if they ________ enough sunlight and water.',
    options: [
      "don't get (Zero Conditional - Verdad biológica)",
      "won't get (First Conditional)",
      "didn't get (Past Simple)",
      "hadn't got (Past Perfect)"
    ],
    correctIndex: 0,
    explanation: 'Zero Conditional: Es una verdad biológica general. La condición con "if" va en presente simple ("don\'t get").',
  },
  {
    id: 'zvf-4',
    category: 'Zero vs First Conditional',
    question: 'If you don\'t set an alarm tonight, you ________ late for class tomorrow.',
    options: [
      'will be (First Conditional - Consecuencia futura probable)',
      'are (Zero Conditional)',
      'were (Past Simple)',
      'would be (Second Conditional)'
    ],
    correctIndex: 0,
    explanation: 'First Conditional: Se refiere a una consecuencia en un día específico del futuro ("tomorrow"). Usamos "will be".',
  },
];

// ==========================================
// ARRASTRAR PALABRAS EN SLOTS (DRAG & DROP / CLICK TO SLOT)
// ==========================================

export const dragSlotExercises: DragSlotExercise[] = [
  {
    id: 'drag-pp-1',
    title: 'Arrastra las palabras correctas: Past Perfect en contexto',
    instruction: 'Coloca cada forma verbal en el espacio que le corresponde según la línea de tiempo.',
    pool: ['had studied', 'arrived', 'had forgotten', 'started'],
    template: [
      {
        beforeSlot: '1. Carlos ',
        slotId: 'slot1',
        afterSlot: ' a lot before he took the exam.',
      },
      {
        beforeSlot: '2. When the movie ',
        slotId: 'slot2',
        afterSlot: ', we realized we ',
      },
      {
        beforeSlot: '',
        slotId: 'slot3',
        afterSlot: ' the tickets at home.',
      },
      {
        beforeSlot: '3. By the time my parents ',
        slotId: 'slot4',
        afterSlot: ', I had finished preparing dinner.',
      },
    ],
    correctAnswers: {
      slot1: 'had studied',
      slot2: 'started',
      slot3: 'had forgotten',
      slot4: 'arrived',
    },
    explanation: 'Observa la correlación temporal: "had studied" y "had forgotten" ocurrieron ANTES que las acciones en pasado simple "started" y "arrived".',
  },
  {
    id: 'drag-cond-1',
    title: 'Arrastra los conectores y verbos: Zero vs First Conditional',
    instruction: 'Completa las reglas de causa y efecto arrastrando la opción correcta.',
    pool: ['melts', 'will call', 'rains', 'will get'],
    template: [
      {
        beforeSlot: '1. (Zero Conditional) If snow gets warm, it ',
        slotId: 's1',
        afterSlot: '.',
      },
      {
        beforeSlot: '2. (First Conditional) If it ',
        slotId: 's2',
        afterSlot: ' tomorrow, we will cancel the football match.',
      },
      {
        beforeSlot: '3. (First Conditional) If you pass the exam, your dad ',
        slotId: 's3',
        afterSlot: ' proud.',
      },
      {
        beforeSlot: '4. (First Conditional) If I arrive late tonight, I ',
        slotId: 's4',
        afterSlot: ' you.',
      },
    ],
    correctAnswers: {
      s1: 'melts',
      s2: 'rains',
      s3: 'will get',
      s4: 'will call',
    },
    explanation: 'En el condicional cero usamos presente simple ("melts"). En el primer condicional usamos presente en la condición ("rains") y "will + verbo" en el resultado ("will get", "will call").',
  },
];

// ==========================================
// SESIÓN 2 (MAÑANA): SECOND & THIRD CONDITIONAL (PREPARADO)
// ==========================================

export const secondThirdConditionalExercises: FillBlankItem[] = [
  {
    id: 'sc-1',
    sentenceBefore: 'If I won a million dollars, I',
    sentenceAfter: 'a house for my family.',
    verbHint: 'buy',
    acceptedAnswers: ['would buy', "'d buy"],
    explanation: 'Second Conditional (situación imaginaria en presente): If + Past Simple ("won"), would + verbo base ("would buy").',
  },
  {
    id: 'sc-2',
    sentenceBefore: 'If she had more free time, she',
    sentenceAfter: 'programming every day.',
    verbHint: 'practice',
    acceptedAnswers: ['would practice', 'would practise'],
    explanation: 'Second Conditional: Situación hipotética no real hoy ("would practice").',
  },
  {
    id: 'tc-1',
    sentenceBefore: 'If you had told me about the meeting yesterday, I',
    sentenceAfter: 'there on time.',
    verbHint: 'be',
    acceptedAnswers: ['would have been', "'d have been"],
    explanation: 'Third Conditional (arrepentimiento sobre el pasado imposible de cambiar): If + had told (Past Perfect), would have been.',
  },
  {
    id: 'tc-2',
    sentenceBefore: 'If we had left earlier, we',
    sentenceAfter: 'the train this morning.',
    verbHint: 'not miss',
    acceptedAnswers: ["would not have missed", "wouldn't have missed"],
    explanation: 'Third Conditional: Situación pasada que no se puede cambiar. Forma negativa: "would not have missed".',
  },
];

export const secondVsThirdMultipleChoice: MultipleChoiceItem[] = [
  {
    id: 'svt-1',
    category: 'Second vs Third Conditional',
    question: 'If I ________ you, I would take a short break before continuing.',
    options: [
      'were (Second Conditional - Consejo hipotético en presente)',
      'had been (Third Conditional - Pasado imposible)',
      'am (Present Simple)',
      'will be (Future)'
    ],
    correctIndex: 0,
    explanation: 'Correcto: "If I were you..." es la estructura clásica del Second Conditional para dar consejos hipotéticos sobre el presente.',
  },
  {
    id: 'svt-2',
    category: 'Second vs Third Conditional',
    question: 'If she had studied for the final exam last week, she ________ it with high honors.',
    options: [
      'would have passed (Third Conditional - Arrepentimiento de evento pasado)',
      'would pass (Second Conditional - Presente hipotético)',
      'will pass (First Conditional)',
      'passed (Past Simple)'
    ],
    correctIndex: 0,
    explanation: 'Correcto: El evento ocurrió en el pasado ("last week"), por lo que ya no puede cambiar. Corresponde al Third Conditional ("would have passed").',
  },
];
