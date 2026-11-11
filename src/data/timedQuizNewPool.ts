import { TimedQuestion } from '../types/timedQuiz';

export const newTimedQuizPool: TimedQuestion[] = [
  {
    "id": "mp-01",
    "topic": "past-perfect",
    "type": "match-pairs",
    "prompt": "Conecta cada cláusula temporal con su acción previa correspondiente:",
    "pairs": [
      {
        "id": "p1",
        "left": "When the movie started,",
        "right": "we had already bought our popcorn."
      },
      {
        "id": "p2",
        "left": "Before she phoned him,",
        "right": "Carlos had left the office."
      },
      {
        "id": "p3",
        "left": "After they had finished dinner,",
        "right": "they went for an evening walk."
      }
    ],
    "explanation": "En cada par, la acción anterior en el pasado se formula con Past Perfect (had + participio)."
  },
  {
    "id": "mp-02",
    "topic": "past-perfect",
    "type": "match-pairs",
    "prompt": "Conecta cada causa pasada con su efecto:",
    "pairs": [
      {
        "id": "p1",
        "left": "Sara was very upset because",
        "right": "she had lost her house keys."
      },
      {
        "id": "p2",
        "left": "By 8:00 AM yesterday,",
        "right": "the express train had departed."
      },
      {
        "id": "p3",
        "left": "I recognized the teacher because",
        "right": "I had seen her photo earlier."
      }
    ],
    "explanation": "La causa anterior en el tiempo siempre lleva had + participio pasado."
  },
  {
    "id": "mp-03",
    "topic": "past-perfect",
    "type": "match-pairs",
    "prompt": "Conecta cada situación con su antecedente en Past Perfect:",
    "pairs": [
      {
        "id": "p1",
        "left": "The grass was wet because",
        "right": "it had rained all night long."
      },
      {
        "id": "p2",
        "left": "He could not pay for lunch because",
        "right": "he had forgotten his wallet at home."
      },
      {
        "id": "p3",
        "left": "When the police arrived at the bank,",
        "right": "the thief had already escaped."
      }
    ],
    "explanation": "Llover, olvidar la billetera y escapar ocurrieron antes del momento de referencia en pasado simple."
  },
  {
    "id": "mp-04",
    "topic": "past-perfect",
    "type": "match-pairs",
    "prompt": "Conecta cada acción con lo que había ocurrido previamente:",
    "pairs": [
      {
        "id": "p1",
        "left": "Before starting the math exam,",
        "right": "Maria had reviewed all her formulas."
      },
      {
        "id": "p2",
        "left": "Lucas passed his driving test because",
        "right": "he had practiced for six months."
      },
      {
        "id": "p3",
        "left": "By the time the guests woke up,",
        "right": "grandma had prepared fresh breakfast."
      }
    ],
    "explanation": "Revisar fórmulas, practicar y preparar desayuno son las acciones primeras (had + V3)."
  },
  {
    "id": "mp-05",
    "topic": "past-perfect",
    "type": "match-pairs",
    "prompt": "Conecta cada expresión temporal con su cláusula en Past Perfect:",
    "pairs": [
      {
        "id": "p1",
        "left": "Daniel was exhausted because",
        "right": "he had run a five-mile marathon."
      },
      {
        "id": "p2",
        "left": "Until yesterday evening,",
        "right": "I had never tasted authentic sushi."
      },
      {
        "id": "p3",
        "left": "When we finally reached the platform,",
        "right": "the school bus had already departed."
      }
    ],
    "explanation": "El Past Perfect conecta estados previos o antecedentes anteriores a otro hecho del pasado."
  },
  {
    "id": "mp-06",
    "topic": "zero-conditional",
    "type": "match-pairs",
    "prompt": "Conecta cada causa natural con su efecto científico (Zero Conditional):",
    "pairs": [
      {
        "id": "p1",
        "left": "If you heat ice,",
        "right": "it melts into liquid."
      },
      {
        "id": "p2",
        "left": "If water reaches 100°C,",
        "right": "it boils vigorously."
      },
      {
        "id": "p3",
        "left": "If you drop a stone,",
        "right": "it falls to the ground."
      }
    ],
    "explanation": "Zero Conditional: If + Present Simple -> Present Simple (hechos y leyes científicas universales)."
  },
  {
    "id": "mp-07",
    "topic": "zero-conditional",
    "type": "match-pairs",
    "prompt": "Conecta cada condición universal con su resultado permanente:",
    "pairs": [
      {
        "id": "p1",
        "left": "Plants die",
        "right": "if they do not get sunlight."
      },
      {
        "id": "p2",
        "left": "If you mix red and yellow,",
        "right": "you get orange paint."
      },
      {
        "id": "p3",
        "left": "Iron rusts",
        "right": "if it is exposed to water and oxygen."
      }
    ],
    "explanation": "Ambos verbos deben estar en Present Simple porque son leyes de la naturaleza y mezclas constantes."
  },
  {
    "id": "mp-08",
    "topic": "zero-conditional",
    "type": "match-pairs",
    "prompt": "Conecta cada hábito biológico con su consecuencia inmediata:",
    "pairs": [
      {
        "id": "p1",
        "left": "If people do not sleep well,",
        "right": "they feel tired and unfocused."
      },
      {
        "id": "p2",
        "left": "If newborn babies are hungry,",
        "right": "they cry to ask for milk."
      },
      {
        "id": "p3",
        "left": "Butter melts quickly",
        "right": "if you leave it under the hot sun."
      }
    ],
    "explanation": "Hechos fisiológicos y físicos siempre usan la estructura Zero Conditional (presente -> presente)."
  },
  {
    "id": "mp-09",
    "topic": "zero-conditional",
    "type": "match-pairs",
    "prompt": "Conecta cada condición con su resultado automático:",
    "pairs": [
      {
        "id": "p1",
        "left": "If you press this red button,",
        "right": "the emergency alarm sounds."
      },
      {
        "id": "p2",
        "left": "If it freezes outside,",
        "right": "water turns into solid ice."
      },
      {
        "id": "p3",
        "left": "If you divide twenty by four,",
        "right": "you get five."
      }
    ],
    "explanation": "Acciones con resultado matemático o mecánico predeterminado usan Zero Conditional."
  },
  {
    "id": "mp-10",
    "topic": "zero-conditional",
    "type": "match-pairs",
    "prompt": "Conecta cada acción con su consecuencia invariable:",
    "pairs": [
      {
        "id": "p1",
        "left": "If dry wood gets too hot,",
        "right": "it catches fire and burns."
      },
      {
        "id": "p2",
        "left": "If you touch an open flame,",
        "right": "it burns your skin instantly."
      },
      {
        "id": "p3",
        "left": "If you add sugar to coffee,",
        "right": "it tastes much sweeter."
      }
    ],
    "explanation": "Causa y efecto inmediatos sin especulación futura: ambos lados en Present Simple."
  },
  {
    "id": "mp-11",
    "topic": "first-conditional",
    "type": "match-pairs",
    "prompt": "Conecta cada condición real futura con su consecuencia probable (First Conditional):",
    "pairs": [
      {
        "id": "p1",
        "left": "If it rains tomorrow afternoon,",
        "right": "we will cancel our picnic in the park."
      },
      {
        "id": "p2",
        "left": "If you study hard this week,",
        "right": "you will pass your English exam."
      },
      {
        "id": "p3",
        "left": "If Mariana arrives early,",
        "right": "we will start the group project."
      }
    ],
    "explanation": "First Conditional: If + Present Simple -> Will + Verbo base (situaciones reales y probables)."
  },
  {
    "id": "mp-12",
    "topic": "first-conditional",
    "type": "match-pairs",
    "prompt": "Conecta cada posible situación con su decisión futura:",
    "pairs": [
      {
        "id": "p1",
        "left": "If we miss the public bus,",
        "right": "we will take a yellow taxi."
      },
      {
        "id": "p2",
        "left": "If you eat all that sweet chocolate,",
        "right": "you will have a bad stomachache."
      },
      {
        "id": "p3",
        "left": "If they invite me to the party,",
        "right": "I will definitely go with my friends."
      }
    ],
    "explanation": "La condición If lleva presente simple; el resultado lleva will + verbo base."
  },
  {
    "id": "mp-13",
    "topic": "first-conditional",
    "type": "match-pairs",
    "prompt": "Conecta cada condición con su resultado First Conditional:",
    "pairs": [
      {
        "id": "p1",
        "left": "If Carlos does not hurry,",
        "right": "he will be late for his class."
      },
      {
        "id": "p2",
        "left": "If the weather is sunny on Saturday,",
        "right": "we will swim at the public pool."
      },
      {
        "id": "p3",
        "left": "If you save five dollars each day,",
        "right": "you will buy your video game."
      }
    ],
    "explanation": "Estructura First Conditional para planes contingentes y advertencias futuras."
  },
  {
    "id": "mp-14",
    "topic": "first-conditional",
    "type": "match-pairs",
    "prompt": "Conecta cada promesa o advertencia con su desenlace:",
    "pairs": [
      {
        "id": "p1",
        "left": "If she practices piano every single day,",
        "right": "she will win the regional recital."
      },
      {
        "id": "p2",
        "left": "If I find your missing keys,",
        "right": "I will call your cell immediately."
      },
      {
        "id": "p3",
        "left": "If the teacher asks a question,",
        "right": "I will raise my hand enthusiastically."
      }
    ],
    "explanation": "Regla del First: nunca poner will dentro de la cláusula If (If she practices, no If she will practice)."
  },
  {
    "id": "mp-15",
    "topic": "first-conditional",
    "type": "match-pairs",
    "prompt": "Conecta cada condición con su efecto correspondiente:",
    "pairs": [
      {
        "id": "p1",
        "left": "If you wake up too late,",
        "right": "you will miss your warm breakfast."
      },
      {
        "id": "p2",
        "left": "If the corner supermarket is open,",
        "right": "we will buy fresh milk and bread."
      },
      {
        "id": "p3",
        "left": "If our soccer team wins today,",
        "right": "they will qualify for the grand final."
      }
    ],
    "explanation": "Situaciones de causa-efecto en el presente/futuro real."
  },
  {
    "id": "mp-16",
    "topic": "second-conditional",
    "type": "match-pairs",
    "prompt": "Conecta cada hipótesis presente o imaginaria con su resultado (Second Conditional):",
    "pairs": [
      {
        "id": "p1",
        "left": "If I won the grand lottery,",
        "right": "I would buy a modern mansion."
      },
      {
        "id": "p2",
        "left": "If she had more free time,",
        "right": "she would learn to speak Italian."
      },
      {
        "id": "p3",
        "left": "If they were extremely wealthy,",
        "right": "they would travel around the world."
      }
    ],
    "explanation": "Second Conditional: If + Past Simple -> Would + Verbo base (situaciones hipotéticas o irreales en presente)."
  },
  {
    "id": "mp-17",
    "topic": "second-conditional",
    "type": "match-pairs",
    "prompt": "Conecta cada consejo o situación imaginaria:",
    "pairs": [
      {
        "id": "p1",
        "left": "If I were in your position,",
        "right": "I would accept the internship offer."
      },
      {
        "id": "p2",
        "left": "If he lived in central London,",
        "right": "he would speak British English fluently."
      },
      {
        "id": "p3",
        "left": "If we had a spacious backyard,",
        "right": "we would adopt two rescue puppies."
      }
    ],
    "explanation": "Nota el uso formal de were con I (If I were you) y would en la consecuencia."
  },
  {
    "id": "mp-18",
    "topic": "second-conditional",
    "type": "match-pairs",
    "prompt": "Conecta cada escenario irreal con su desenlace hipotético:",
    "pairs": [
      {
        "id": "p1",
        "left": "If you spoke a bit slower,",
        "right": "I would understand your explanation better."
      },
      {
        "id": "p2",
        "left": "If I knew his personal address,",
        "right": "I would send him a birthday card."
      },
      {
        "id": "p3",
        "left": "If Sofia didn’t have to work today,",
        "right": "she would sleep until late morning."
      }
    ],
    "explanation": "Second Conditional trata de cosas que NO son ciertas ahora mismo: no hablas lento, no sé su dirección, Sofía tiene que trabajar."
  },
  {
    "id": "mp-19",
    "topic": "second-conditional",
    "type": "match-pairs",
    "prompt": "Conecta cada fantasía con su consecuencia imaginaria:",
    "pairs": [
      {
        "id": "p1",
        "left": "If humans had wings,",
        "right": "we would fly across the clouds."
      },
      {
        "id": "p2",
        "left": "If it snowed in our tropical city,",
        "right": "we would build a giant snowman."
      },
      {
        "id": "p3",
        "left": "If intelligent aliens landed on Earth,",
        "right": "scientists would study their technology."
      }
    ],
    "explanation": "Imaginaciones puras: pasado simple en la condición + would en el resultado."
  },
  {
    "id": "mp-20",
    "topic": "second-conditional",
    "type": "match-pairs",
    "prompt": "Conecta cada premisa con su resultado en Second Conditional:",
    "pairs": [
      {
        "id": "p1",
        "left": "If Mateo studied regularly every day,",
        "right": "he would earn much higher marks."
      },
      {
        "id": "p2",
        "left": "If we owned a private helicopter,",
        "right": "we would fly directly to school."
      },
      {
        "id": "p3",
        "left": "If I met the president in person,",
        "right": "I would ask for better school libraries."
      }
    ],
    "explanation": "Condiciones hipotéticas que contrastan con la realidad actual."
  },
  {
    "id": "mp-21",
    "topic": "third-conditional",
    "type": "match-pairs",
    "prompt": "Conecta cada condición del pasado con su lamento o resultado imposible (Third Conditional):",
    "pairs": [
      {
        "id": "p1",
        "left": "If I had known about the concert,",
        "right": "I would have bought a front-row ticket."
      },
      {
        "id": "p2",
        "left": "If she had set an alarm last night,",
        "right": "she would not have arrived late."
      },
      {
        "id": "p3",
        "left": "If they had booked their seats earlier,",
        "right": "they would have found better seats."
      }
    ],
    "explanation": "Third Conditional: If + Past Perfect (had + V3) -> Would have + Participio (V3). El pasado ya no se puede cambiar."
  },
  {
    "id": "mp-22",
    "topic": "third-conditional",
    "type": "match-pairs",
    "prompt": "Conecta cada hipótesis sobre el pasado con su consecuencia:",
    "pairs": [
      {
        "id": "p1",
        "left": "If you had told me the honest truth,",
        "right": "I would have helped you solve the problem."
      },
      {
        "id": "p2",
        "left": "If he had driven more carefully,",
        "right": "he would have avoided the traffic accident."
      },
      {
        "id": "p3",
        "left": "If we had brought our umbrellas,",
        "right": "we would not have gotten soaking wet."
      }
    ],
    "explanation": "Expresan lo que habría sucedido si el pasado hubiera sido diferente (lamentos o alivios)."
  },
  {
    "id": "mp-23",
    "topic": "third-conditional",
    "type": "match-pairs",
    "prompt": "Conecta cada condición en Third Conditional:",
    "pairs": [
      {
        "id": "p1",
        "left": "If Lucas had practiced more penalties,",
        "right": "he would have scored the winning goal."
      },
      {
        "id": "p2",
        "left": "If they had followed the doctor’s advice,",
        "right": "they would have recovered much faster."
      },
      {
        "id": "p3",
        "left": "If I had seen Camila yesterday at school,",
        "right": "I would have reminded her of the homework."
      }
    ],
    "explanation": "Ambos lados se refieren a situaciones concluidas en el pasado."
  },
  {
    "id": "mp-24",
    "topic": "third-conditional",
    "type": "match-pairs",
    "prompt": "Conecta cada causa pasada con lo que habría ocurrido:",
    "pairs": [
      {
        "id": "p1",
        "left": "If you had studied the vocabulary list,",
        "right": "you would have answered all questions."
      },
      {
        "id": "p2",
        "left": "If the highway had not been closed,",
        "right": "we would have arrived before sunset."
      },
      {
        "id": "p3",
        "left": "If he had checked the navigation map,",
        "right": "he would not have gotten lost."
      }
    ],
    "explanation": "Estructura Third Conditional clásica: had + V3 emparejado con would have + V3."
  },
  {
    "id": "mp-25",
    "topic": "third-conditional",
    "type": "match-pairs",
    "prompt": "Conecta cada escenario retrospectivo con su resultado:",
    "pairs": [
      {
        "id": "p1",
        "left": "If the firefighters had arrived sooner,",
        "right": "they would have saved the old building."
      },
      {
        "id": "p2",
        "left": "If I had remembered my phone charger,",
        "right": "my battery would not have died yesterday."
      },
      {
        "id": "p3",
        "left": "If it had not rained all Sunday,",
        "right": "we would have organized a family barbecue."
      }
    ],
    "explanation": "Todos los eventos ya pasaron y no sucedieron así en la realidad."
  },
  {
    "id": "sb-01",
    "topic": "past-perfect",
    "type": "sentence-builder",
    "prompt": "Ordena los bloques para construir la oración en Past Perfect:",
    "tokens": [
      {
        "id": "t1",
        "text": "They had left"
      },
      {
        "id": "t2",
        "text": "before"
      },
      {
        "id": "t3",
        "text": "the party"
      },
      {
        "id": "t4",
        "text": "started."
      }
    ],
    "correctSequence": [
      "t1",
      "t2",
      "t3",
      "t4"
    ],
    "fullSentence": "They had left before the party started.",
    "explanation": "La acción primera (\"They had left\") va en Past Perfect, seguida de la segunda acción en Past Simple (\"started\")."
  },
  {
    "id": "sb-02",
    "topic": "past-perfect",
    "type": "sentence-builder",
    "prompt": "Construye la oración gramaticalmente correcta:",
    "tokens": [
      {
        "id": "t1",
        "text": "She had never seen"
      },
      {
        "id": "t2",
        "text": "such a huge"
      },
      {
        "id": "t3",
        "text": "waterfall"
      },
      {
        "id": "t4",
        "text": "before."
      }
    ],
    "correctSequence": [
      "t1",
      "t2",
      "t3",
      "t4"
    ],
    "fullSentence": "She had never seen such a huge waterfall before.",
    "explanation": "En Past Perfect con \"never\", el adverbio se ubica entre \"had\" y el participio (\"had never seen\")."
  },
  {
    "id": "sb-03",
    "topic": "past-perfect",
    "type": "sentence-builder",
    "prompt": "Ordena la secuencia temporal en pasado:",
    "tokens": [
      {
        "id": "t1",
        "text": "When I arrived,"
      },
      {
        "id": "t2",
        "text": "Carlos"
      },
      {
        "id": "t3",
        "text": "had already cooked"
      },
      {
        "id": "t4",
        "text": "lunch."
      }
    ],
    "correctSequence": [
      "t1",
      "t2",
      "t3",
      "t4"
    ],
    "fullSentence": "When I arrived, Carlos had already cooked lunch.",
    "explanation": "Cocinar el almuerzo fue la acción previa completada antes de la llegada."
  },
  {
    "id": "sb-04",
    "topic": "past-perfect",
    "type": "sentence-builder",
    "prompt": "Organiza los bloques sintácticos del Past Perfect:",
    "tokens": [
      {
        "id": "t1",
        "text": "By 9:00 PM,"
      },
      {
        "id": "t2",
        "text": "the students"
      },
      {
        "id": "t3",
        "text": "had finished"
      },
      {
        "id": "t4",
        "text": "their exam."
      }
    ],
    "correctSequence": [
      "t1",
      "t2",
      "t3",
      "t4"
    ],
    "fullSentence": "By 9:00 PM, the students had finished their exam.",
    "explanation": "\"By + hora en el pasado\" introduce el límite temporal donde la acción ya había culminado (\"had finished\")."
  },
  {
    "id": "sb-05",
    "topic": "past-perfect",
    "type": "sentence-builder",
    "prompt": "Arma la oración de causa y efecto en pasado:",
    "tokens": [
      {
        "id": "t1",
        "text": "He realized"
      },
      {
        "id": "t2",
        "text": "that he had forgotten"
      },
      {
        "id": "t3",
        "text": "his passport"
      },
      {
        "id": "t4",
        "text": "at home."
      }
    ],
    "correctSequence": [
      "t1",
      "t2",
      "t3",
      "t4"
    ],
    "fullSentence": "He realized that he had forgotten his passport at home.",
    "explanation": "Darse cuenta (\"realized\") ocurrió después de haber olvidado el pasaporte (\"had forgotten\")."
  },
  {
    "id": "sb-06",
    "topic": "zero-conditional",
    "type": "sentence-builder",
    "prompt": "Arma la ley física en Zero Conditional:",
    "tokens": [
      {
        "id": "t1",
        "text": "If you freeze water,"
      },
      {
        "id": "t2",
        "text": "it turns into"
      },
      {
        "id": "t3",
        "text": "solid ice."
      }
    ],
    "correctSequence": [
      "t1",
      "t2",
      "t3"
    ],
    "fullSentence": "If you freeze water, it turns into solid ice.",
    "explanation": "Causa en presente simple (\"freeze\") y consecuencia física invariable en presente simple (\"turns into\")."
  },
  {
    "id": "sb-07",
    "topic": "zero-conditional",
    "type": "sentence-builder",
    "prompt": "Arma la verdad biológica en inglés:",
    "tokens": [
      {
        "id": "t1",
        "text": "Plants dry up"
      },
      {
        "id": "t2",
        "text": "if they do not get"
      },
      {
        "id": "t3",
        "text": "enough water."
      }
    ],
    "correctSequence": [
      "t1",
      "t2",
      "t3"
    ],
    "fullSentence": "Plants dry up if they do not get enough water.",
    "explanation": "El resultado puede ir primero sin coma (\"Plants dry up if they do not get enough water\")."
  },
  {
    "id": "sb-08",
    "topic": "zero-conditional",
    "type": "sentence-builder",
    "prompt": "Construye la relación causa-efecto en Zero Conditional:",
    "tokens": [
      {
        "id": "t1",
        "text": "If you heat butter,"
      },
      {
        "id": "t2",
        "text": "it melts"
      },
      {
        "id": "t3",
        "text": "very quickly."
      }
    ],
    "correctSequence": [
      "t1",
      "t2",
      "t3"
    ],
    "fullSentence": "If you heat butter, it melts very quickly.",
    "explanation": "Presente simple en ambas cláusulas al tratarse de un hecho físico cotidiano."
  },
  {
    "id": "sb-09",
    "topic": "zero-conditional",
    "type": "sentence-builder",
    "prompt": "Ordena la afirmación natural en Zero Conditional:",
    "tokens": [
      {
        "id": "t1",
        "text": "When the sun sets,"
      },
      {
        "id": "t2",
        "text": "darkness"
      },
      {
        "id": "t3",
        "text": "covers the city."
      }
    ],
    "correctSequence": [
      "t1",
      "t2",
      "t3"
    ],
    "fullSentence": "When the sun sets, darkness covers the city.",
    "explanation": "\"When\" se usa de forma idéntica a \"If\" en Zero Conditional para hechos invariables."
  },
  {
    "id": "sb-10",
    "topic": "zero-conditional",
    "type": "sentence-builder",
    "prompt": "Arma la oración de causa y efecto inmediato:",
    "tokens": [
      {
        "id": "t1",
        "text": "If you touch a cactus,"
      },
      {
        "id": "t2",
        "text": "the sharp spines"
      },
      {
        "id": "t3",
        "text": "hurt your skin."
      }
    ],
    "correctSequence": [
      "t1",
      "t2",
      "t3"
    ],
    "fullSentence": "If you touch a cactus, the sharp spines hurt your skin.",
    "explanation": "Estructura Zero Conditional directa y sin modales futuros."
  },
  {
    "id": "sb-11",
    "topic": "first-conditional",
    "type": "sentence-builder",
    "prompt": "Ordena los bloques en First Conditional:",
    "tokens": [
      {
        "id": "t1",
        "text": "If it rains tomorrow,"
      },
      {
        "id": "t2",
        "text": "we will stay"
      },
      {
        "id": "t3",
        "text": "inside the house."
      }
    ],
    "correctSequence": [
      "t1",
      "t2",
      "t3"
    ],
    "fullSentence": "If it rains tomorrow, we will stay inside the house.",
    "explanation": "If + Present Simple (\"rains\") -> Will + Base (\"will stay\")."
  },
  {
    "id": "sb-12",
    "topic": "first-conditional",
    "type": "sentence-builder",
    "prompt": "Arma la predicción condicional en First Conditional:",
    "tokens": [
      {
        "id": "t1",
        "text": "You will pass the test"
      },
      {
        "id": "t2",
        "text": "if you study"
      },
      {
        "id": "t3",
        "text": "every afternoon."
      }
    ],
    "correctSequence": [
      "t1",
      "t2",
      "t3"
    ],
    "fullSentence": "You will pass the test if you study every afternoon.",
    "explanation": "Resultado con will al inicio (\"You will pass the test\") seguido de la condición con if."
  },
  {
    "id": "sb-13",
    "topic": "first-conditional",
    "type": "sentence-builder",
    "prompt": "Construye la advertencia en First Conditional:",
    "tokens": [
      {
        "id": "t1",
        "text": "If she does not hurry,"
      },
      {
        "id": "t2",
        "text": "she will miss"
      },
      {
        "id": "t3",
        "text": "the school bus."
      }
    ],
    "correctSequence": [
      "t1",
      "t2",
      "t3"
    ],
    "fullSentence": "If she does not hurry, she will miss the school bus.",
    "explanation": "Presente simple negativo (\"does not hurry\") con resultado futuro probable (\"will miss\")."
  },
  {
    "id": "sb-14",
    "topic": "first-conditional",
    "type": "sentence-builder",
    "prompt": "Ordena los componentes del First Conditional:",
    "tokens": [
      {
        "id": "t1",
        "text": "If they invite us,"
      },
      {
        "id": "t2",
        "text": "we will attend"
      },
      {
        "id": "t3",
        "text": "their birthday party."
      }
    ],
    "correctSequence": [
      "t1",
      "t2",
      "t3"
    ],
    "fullSentence": "If they invite us, we will attend their birthday party.",
    "explanation": "Condición probable en presente (\"invite\") y decisión futura (\"will attend\")."
  },
  {
    "id": "sb-15",
    "topic": "first-conditional",
    "type": "sentence-builder",
    "prompt": "Construye el compromiso futuro condicional:",
    "tokens": [
      {
        "id": "t1",
        "text": "I will call you"
      },
      {
        "id": "t2",
        "text": "as soon as"
      },
      {
        "id": "t3",
        "text": "I arrive at"
      },
      {
        "id": "t4",
        "text": "the station."
      }
    ],
    "correctSequence": [
      "t1",
      "t2",
      "t3",
      "t4"
    ],
    "fullSentence": "I will call you as soon as I arrive at the station.",
    "explanation": "\"As soon as\" funciona como conector temporal en First Conditional llevando presente simple (\"arrive\")."
  },
  {
    "id": "sb-16",
    "topic": "second-conditional",
    "type": "sentence-builder",
    "prompt": "Construye la hipótesis imaginaria (Second Conditional):",
    "tokens": [
      {
        "id": "t1",
        "text": "If I won the lottery,"
      },
      {
        "id": "t2",
        "text": "I would travel"
      },
      {
        "id": "t3",
        "text": "across Europe."
      }
    ],
    "correctSequence": [
      "t1",
      "t2",
      "t3"
    ],
    "fullSentence": "If I won the lottery, I would travel across Europe.",
    "explanation": "Second Conditional: If + Past Simple (\"won\") -> would + base verb (\"would travel\")."
  },
  {
    "id": "sb-17",
    "topic": "second-conditional",
    "type": "sentence-builder",
    "prompt": "Arma la situación hipotética presente:",
    "tokens": [
      {
        "id": "t1",
        "text": "If she were taller,"
      },
      {
        "id": "t2",
        "text": "she would play"
      },
      {
        "id": "t3",
        "text": "on the basketball team."
      }
    ],
    "correctSequence": [
      "t1",
      "t2",
      "t3"
    ],
    "fullSentence": "If she were taller, she would play on the basketball team.",
    "explanation": "Uso de subjuntivo \"were\" con tercera persona en condiciones hipotéticas formales."
  },
  {
    "id": "sb-18",
    "topic": "second-conditional",
    "type": "sentence-builder",
    "prompt": "Ordena la hipótesis doméstica en Second Conditional:",
    "tokens": [
      {
        "id": "t1",
        "text": "We would adopt a dog"
      },
      {
        "id": "t2",
        "text": "if we had"
      },
      {
        "id": "t3",
        "text": "a bigger garden."
      }
    ],
    "correctSequence": [
      "t1",
      "t2",
      "t3"
    ],
    "fullSentence": "We would adopt a dog if we had a bigger garden.",
    "explanation": "Sería el resultado (\"would adopt\") condicionado a tener un jardín más grande (\"if we had\")."
  },
  {
    "id": "sb-19",
    "topic": "second-conditional",
    "type": "sentence-builder",
    "prompt": "Construye la especulación sobre habilidades:",
    "tokens": [
      {
        "id": "t1",
        "text": "If he spoke English fluently,"
      },
      {
        "id": "t2",
        "text": "he would apply"
      },
      {
        "id": "t3",
        "text": "for that scholarship."
      }
    ],
    "correctSequence": [
      "t1",
      "t2",
      "t3"
    ],
    "fullSentence": "If he spoke English fluently, he would apply for that scholarship.",
    "explanation": "Past Simple en la condición irreal (\"spoke\") y would en la consecuencia (\"would apply\")."
  },
  {
    "id": "sb-20",
    "topic": "second-conditional",
    "type": "sentence-builder",
    "prompt": "Ordena la pregunta hipotética en Second Conditional:",
    "tokens": [
      {
        "id": "t1",
        "text": "What would you do"
      },
      {
        "id": "t2",
        "text": "if you found"
      },
      {
        "id": "t3",
        "text": "a lost wallet?"
      }
    ],
    "correctSequence": [
      "t1",
      "t2",
      "t3"
    ],
    "fullSentence": "What would you do if you found a lost wallet?",
    "explanation": "Pregunta en Second: What would you do + If + Past Simple (\"found\")."
  },
  {
    "id": "sb-21",
    "topic": "third-conditional",
    "type": "sentence-builder",
    "prompt": "Construye el lamento sobre el pasado (Third Conditional):",
    "tokens": [
      {
        "id": "t1",
        "text": "If you had told me,"
      },
      {
        "id": "t2",
        "text": "I would have helped"
      },
      {
        "id": "t3",
        "text": "with your project."
      }
    ],
    "correctSequence": [
      "t1",
      "t2",
      "t3"
    ],
    "fullSentence": "If you had told me, I would have helped with your project.",
    "explanation": "Third Conditional: If + had + V3 (\"had told\") -> would have + V3 (\"would have helped\")."
  },
  {
    "id": "sb-22",
    "topic": "third-conditional",
    "type": "sentence-builder",
    "prompt": "Arma la conclusión sobre un resultado pasado:",
    "tokens": [
      {
        "id": "t1",
        "text": "She would have won"
      },
      {
        "id": "t2",
        "text": "if she had practiced"
      },
      {
        "id": "t3",
        "text": "more diligently."
      }
    ],
    "correctSequence": [
      "t1",
      "t2",
      "t3"
    ],
    "fullSentence": "She would have won if she had practiced more diligently.",
    "explanation": "Resultado imposible en el pasado (\"would have won\") porque no practicó lo suficiente."
  },
  {
    "id": "sb-23",
    "topic": "third-conditional",
    "type": "sentence-builder",
    "prompt": "Ordena la contingencia retrospectiva:",
    "tokens": [
      {
        "id": "t1",
        "text": "If it had not rained,"
      },
      {
        "id": "t2",
        "text": "we would have played"
      },
      {
        "id": "t3",
        "text": "soccer outside."
      }
    ],
    "correctSequence": [
      "t1",
      "t2",
      "t3"
    ],
    "fullSentence": "If it had not rained, we would have played soccer outside.",
    "explanation": "Condición negativa en pasado (\"had not rained\") con consecuencia hipotética en Third Conditional."
  },
  {
    "id": "sb-24",
    "topic": "third-conditional",
    "type": "sentence-builder",
    "prompt": "Construye la oportunidad perdida en el pasado:",
    "tokens": [
      {
        "id": "t1",
        "text": "They would have caught"
      },
      {
        "id": "t2",
        "text": "the flight"
      },
      {
        "id": "t3",
        "text": "if they had left earlier."
      }
    ],
    "correctSequence": [
      "t1",
      "t2",
      "t3"
    ],
    "fullSentence": "They would have caught the flight if they had left earlier.",
    "explanation": "Perdieron el vuelo porque no salieron más temprano."
  },
  {
    "id": "sb-25",
    "topic": "third-conditional",
    "type": "sentence-builder",
    "prompt": "Arma la advertencia sobre un hecho consumado:",
    "tokens": [
      {
        "id": "t1",
        "text": "If he had worn a jacket,"
      },
      {
        "id": "t2",
        "text": "he would not have caught"
      },
      {
        "id": "t3",
        "text": "a bad cold."
      }
    ],
    "correctSequence": [
      "t1",
      "t2",
      "t3"
    ],
    "fullSentence": "If he had worn a jacket, he would not have caught a bad cold.",
    "explanation": "had worn (ropa) $\\rightarrow$ would not have caught (resfriado)."
  },
  {
    "id": "bh-01",
    "topic": "past-perfect",
    "type": "bug-hunter",
    "prompt": "Toca el segmento con el error gramatical (o \"Sin error\"):",
    "fullSentence": "When I arrived at the station, the train has already left the platform.",
    "segments": [
      {
        "id": "s1",
        "text": "When I arrived",
        "isError": false
      },
      {
        "id": "s2",
        "text": "the train",
        "isError": false
      },
      {
        "id": "s3",
        "text": "has already left",
        "isError": true,
        "correction": "had already left"
      },
      {
        "id": "s4",
        "text": "the platform.",
        "isError": false
      }
    ],
    "hasNoError": false,
    "explanation": "Error en \"has already left\": al relatar un hecho pasado previo a otro (\"arrived\"), se debe usar Past Perfect (\"had already left\"), no Present Perfect."
  },
  {
    "id": "bh-02",
    "topic": "past-perfect",
    "type": "bug-hunter",
    "prompt": "Toca el segmento con el error gramatical (o \"Sin error\"):",
    "fullSentence": "Sara had forget her keys before leaving the apartment.",
    "segments": [
      {
        "id": "s1",
        "text": "Sara had",
        "isError": false
      },
      {
        "id": "s2",
        "text": "forget her keys",
        "isError": true,
        "correction": "forgotten her keys"
      },
      {
        "id": "s3",
        "text": "before leaving",
        "isError": false
      },
      {
        "id": "s4",
        "text": "the apartment.",
        "isError": false
      }
    ],
    "hasNoError": false,
    "explanation": "Error en \"forget\": Past Perfect requiere el participio pasado del verbo irregular (\"had forgotten\"), nunca el infinitivo."
  },
  {
    "id": "bh-03",
    "topic": "past-perfect",
    "type": "bug-hunter",
    "prompt": "Toca el segmento con el error gramatical (o \"Sin error\"):",
    "fullSentence": "By the time we got home, my brother had cooked a delicious dinner.",
    "segments": [
      {
        "id": "s1",
        "text": "By the time we got home,",
        "isError": false
      },
      {
        "id": "s2",
        "text": "my brother",
        "isError": false
      },
      {
        "id": "s3",
        "text": "had cooked",
        "isError": false
      },
      {
        "id": "s4",
        "text": "a delicious dinner.",
        "isError": false
      }
    ],
    "hasNoError": true,
    "explanation": "¡Esta oración no tiene ningún error! \"got home\" (Past Simple) y \"had cooked\" (Past Perfect) están perfectamente empleados."
  },
  {
    "id": "bh-04",
    "topic": "past-perfect",
    "type": "bug-hunter",
    "prompt": "Toca el segmento con el error gramatical (o \"Sin error\"):",
    "fullSentence": "They had never saw such a beautiful sunset until yesterday.",
    "segments": [
      {
        "id": "s1",
        "text": "They had never saw",
        "isError": true,
        "correction": "They had never seen"
      },
      {
        "id": "s2",
        "text": "such a beautiful sunset",
        "isError": false
      },
      {
        "id": "s3",
        "text": "until yesterday.",
        "isError": false
      }
    ],
    "hasNoError": false,
    "explanation": "Error en \"saw\": \"saw\" es el pasado simple de \"see\", pero después del auxiliar \"had\" se exige el participio pasado \"seen\" (had never seen)."
  },
  {
    "id": "bh-05",
    "topic": "past-perfect",
    "type": "bug-hunter",
    "prompt": "Toca el segmento con el error gramatical (o \"Sin error\"):",
    "fullSentence": "Before the teacher entered the classroom, all students did finished the exercise.",
    "segments": [
      {
        "id": "s1",
        "text": "Before the teacher entered,",
        "isError": false
      },
      {
        "id": "s2",
        "text": "all students",
        "isError": false
      },
      {
        "id": "s3",
        "text": "did finished the exercise.",
        "isError": true,
        "correction": "had finished the exercise."
      }
    ],
    "hasNoError": false,
    "explanation": "Error en \"did finished\": la acción anterior a la entrada del profesor debe formarse con el auxiliar \"had\" + participio (\"had finished\"), no con \"did\"."
  },
  {
    "id": "bh-06",
    "topic": "zero-conditional",
    "type": "bug-hunter",
    "prompt": "Toca el segmento con el error gramatical (o \"Sin error\"):",
    "fullSentence": "If you heat solid ice, it will melt into pure water.",
    "segments": [
      {
        "id": "s1",
        "text": "If you heat solid ice,",
        "isError": false
      },
      {
        "id": "s2",
        "text": "it will melt",
        "isError": true,
        "correction": "it melts"
      },
      {
        "id": "s3",
        "text": "into pure water.",
        "isError": false
      }
    ],
    "hasNoError": false,
    "explanation": "Error en \"it will melt\": para leyes físicas universales (Zero Conditional), se usa Present Simple en ambos lados (\"it melts\"), no \"will\"."
  },
  {
    "id": "bh-07",
    "topic": "zero-conditional",
    "type": "bug-hunter",
    "prompt": "Toca el segmento con el error gramatical (o \"Sin error\"):",
    "fullSentence": "If water reaches 100 degrees Celsius, it boils and evaporates.",
    "segments": [
      {
        "id": "s1",
        "text": "If water reaches 100°C,",
        "isError": false
      },
      {
        "id": "s2",
        "text": "it boils",
        "isError": false
      },
      {
        "id": "s3",
        "text": "and evaporates.",
        "isError": false
      }
    ],
    "hasNoError": true,
    "explanation": "¡Oración impecable! Tanto \"reaches\" como \"boils and evaporates\" están en Present Simple, describiendo un hecho universal."
  },
  {
    "id": "bh-08",
    "topic": "zero-conditional",
    "type": "bug-hunter",
    "prompt": "Toca el segmento con el error gramatical (o \"Sin error\"):",
    "fullSentence": "If dry leaves get too hot, they catches fire easily.",
    "segments": [
      {
        "id": "s1",
        "text": "If dry leaves",
        "isError": false
      },
      {
        "id": "s2",
        "text": "get too hot,",
        "isError": false
      },
      {
        "id": "s3",
        "text": "they catches fire",
        "isError": true,
        "correction": "they catch fire"
      },
      {
        "id": "s4",
        "text": "easily.",
        "isError": false
      }
    ],
    "hasNoError": false,
    "explanation": "Error de concordancia en \"they catches\": el pronombre plural \"they\" requiere la forma base \"catch\" (\"they catch fire\"), no con -es."
  },
  {
    "id": "bh-09",
    "topic": "zero-conditional",
    "type": "bug-hunter",
    "prompt": "Toca el segmento con el error gramatical (o \"Sin error\"):",
    "fullSentence": "When small babies are hungry, they cried for milk.",
    "segments": [
      {
        "id": "s1",
        "text": "When small babies",
        "isError": false
      },
      {
        "id": "s2",
        "text": "are hungry,",
        "isError": false
      },
      {
        "id": "s3",
        "text": "they cried for milk.",
        "isError": true,
        "correction": "they cry for milk."
      }
    ],
    "hasNoError": false,
    "explanation": "Error en \"they cried\": un hábito o reacción natural permanente debe estar en Present Simple (\"they cry\"), no en pasado (\"cried\")."
  },
  {
    "id": "bh-10",
    "topic": "zero-conditional",
    "type": "bug-hunter",
    "prompt": "Toca el segmento con el error gramatical (o \"Sin error\"):",
    "fullSentence": "If you mix red and blue paint, you get purple color.",
    "segments": [
      {
        "id": "s1",
        "text": "If you mix red and blue,",
        "isError": false
      },
      {
        "id": "s2",
        "text": "you get",
        "isError": false
      },
      {
        "id": "s3",
        "text": "purple color.",
        "isError": false
      }
    ],
    "hasNoError": true,
    "explanation": "¡Correcta! \"mix\" y \"get\" en presente simple reflejan una verdad científica constante."
  },
  {
    "id": "bh-11",
    "topic": "first-conditional",
    "type": "bug-hunter",
    "prompt": "Toca el segmento con el error gramatical (o \"Sin error\"):",
    "fullSentence": "If it will rain tomorrow morning, we will postpone the match.",
    "segments": [
      {
        "id": "s1",
        "text": "If it will rain tomorrow,",
        "isError": true,
        "correction": "If it rains tomorrow,"
      },
      {
        "id": "s2",
        "text": "we will postpone",
        "isError": false
      },
      {
        "id": "s3",
        "text": "the match.",
        "isError": false
      }
    ],
    "hasNoError": false,
    "explanation": "Regla de oro: NUNCA se usa el modal \"will\" dentro de la cláusula con \"If\" (\"If it rains\", no \"If it will rain\")."
  },
  {
    "id": "bh-12",
    "topic": "first-conditional",
    "type": "bug-hunter",
    "prompt": "Toca el segmento con el error gramatical (o \"Sin error\"):",
    "fullSentence": "If you study tonight, you will pass your English test tomorrow.",
    "segments": [
      {
        "id": "s1",
        "text": "If you study tonight,",
        "isError": false
      },
      {
        "id": "s2",
        "text": "you will pass",
        "isError": false
      },
      {
        "id": "s3",
        "text": "your English test.",
        "isError": false
      }
    ],
    "hasNoError": true,
    "explanation": "¡Totalmente correcta! Cumple la fórmula exacta del First Conditional: If + Present Simple -> Will + Verbo base."
  },
  {
    "id": "bh-13",
    "topic": "first-conditional",
    "type": "bug-hunter",
    "prompt": "Toca el segmento con el error gramatical (o \"Sin error\"):",
    "fullSentence": "If Mariana runs fast, she will catches the morning train.",
    "segments": [
      {
        "id": "s1",
        "text": "If Mariana runs fast,",
        "isError": false
      },
      {
        "id": "s2",
        "text": "she will catches",
        "isError": true,
        "correction": "she will catch"
      },
      {
        "id": "s3",
        "text": "the morning train.",
        "isError": false
      }
    ],
    "hasNoError": false,
    "explanation": "Error en \"will catches\": los verbos modales como \"will\" siempre van seguidos de la forma base del verbo sin -s (\"will catch\")."
  },
  {
    "id": "bh-14",
    "topic": "first-conditional",
    "type": "bug-hunter",
    "prompt": "Toca el segmento con el error gramatical (o \"Sin error\"):",
    "fullSentence": "If Carlos arrives on time, we would start the presentation.",
    "segments": [
      {
        "id": "s1",
        "text": "If Carlos arrives on time,",
        "isError": false
      },
      {
        "id": "s2",
        "text": "we would start",
        "isError": true,
        "correction": "we will start"
      },
      {
        "id": "s3",
        "text": "the presentation.",
        "isError": false
      }
    ],
    "hasNoError": false,
    "explanation": "Inconsistencia de condicionales: \"arrives\" está en presente (First Conditional), por lo que la consecuencia debe llevar \"will start\", no \"would start\"."
  },
  {
    "id": "bh-15",
    "topic": "first-conditional",
    "type": "bug-hunter",
    "prompt": "Toca el segmento con el error gramatical (o \"Sin error\"):",
    "fullSentence": "You will feel cold if you will go out without your coat.",
    "segments": [
      {
        "id": "s1",
        "text": "You will feel cold",
        "isError": false
      },
      {
        "id": "s2",
        "text": "if you will go out",
        "isError": true,
        "correction": "if you go out"
      },
      {
        "id": "s3",
        "text": "without your coat.",
        "isError": false
      }
    ],
    "hasNoError": false,
    "explanation": "Error en \"if you will go out\": la parte con \"if\" debe usar Present Simple (\"if you go out\"), aunque vaya al final de la oración."
  },
  {
    "id": "bh-16",
    "topic": "second-conditional",
    "type": "bug-hunter",
    "prompt": "Toca el segmento con el error gramatical (o \"Sin error\"):",
    "fullSentence": "If I have a million dollars right now, I would buy a beach villa.",
    "segments": [
      {
        "id": "s1",
        "text": "If I have a million dollars,",
        "isError": true,
        "correction": "If I had a million dollars,"
      },
      {
        "id": "s2",
        "text": "I would buy",
        "isError": false
      },
      {
        "id": "s3",
        "text": "a beach villa.",
        "isError": false
      }
    ],
    "hasNoError": false,
    "explanation": "Error en \"If I have\": para una situación imaginaria en el presente emparejada con \"would\", se requiere Past Simple (\"If I had\")."
  },
  {
    "id": "bh-17",
    "topic": "second-conditional",
    "type": "bug-hunter",
    "prompt": "Toca el segmento con el error gramatical (o \"Sin error\"):",
    "fullSentence": "If she were here with us, she would explain the whole story.",
    "segments": [
      {
        "id": "s1",
        "text": "If she were here,",
        "isError": false
      },
      {
        "id": "s2",
        "text": "she would explain",
        "isError": false
      },
      {
        "id": "s3",
        "text": "the whole story.",
        "isError": false
      }
    ],
    "hasNoError": true,
    "explanation": "¡Oración correcta! \"were\" es el subjuntivo formal del Second Conditional y \"would explain\" expresa la consecuencia hipotética."
  },
  {
    "id": "bh-18",
    "topic": "second-conditional",
    "type": "bug-hunter",
    "prompt": "Toca el segmento con el error gramatical (o \"Sin error\"):",
    "fullSentence": "If he won the national championship, he will celebrate for days.",
    "segments": [
      {
        "id": "s1",
        "text": "If he won the championship,",
        "isError": false
      },
      {
        "id": "s2",
        "text": "he will celebrate",
        "isError": true,
        "correction": "he would celebrate"
      },
      {
        "id": "s3",
        "text": "for days.",
        "isError": false
      }
    ],
    "hasNoError": false,
    "explanation": "Error en \"will celebrate\": al tener la condición en pasado hipotético (\"won\"), el resultado debe formularse con \"would\" (\"he would celebrate\")."
  },
  {
    "id": "bh-19",
    "topic": "second-conditional",
    "type": "bug-hunter",
    "prompt": "Toca el segmento con el error gramatical (o \"Sin error\"):",
    "fullSentence": "If we lived in Paris, we would spoke French every single day.",
    "segments": [
      {
        "id": "s1",
        "text": "If we lived in Paris,",
        "isError": false
      },
      {
        "id": "s2",
        "text": "we would spoke",
        "isError": true,
        "correction": "we would speak"
      },
      {
        "id": "s3",
        "text": "French every day.",
        "isError": false
      }
    ],
    "hasNoError": false,
    "explanation": "Error en \"would spoke\": después de \"would\" se debe usar siempre el verbo en forma base (\"would speak\"), nunca en pasado."
  },
  {
    "id": "bh-20",
    "topic": "second-conditional",
    "type": "bug-hunter",
    "prompt": "Toca el segmento con el error gramatical (o \"Sin error\"):",
    "fullSentence": "If you asked politely, the teacher would helped you with the task.",
    "segments": [
      {
        "id": "s1",
        "text": "If you asked politely,",
        "isError": false
      },
      {
        "id": "s2",
        "text": "the teacher",
        "isError": false
      },
      {
        "id": "s3",
        "text": "would helped you.",
        "isError": true,
        "correction": "would help you."
      }
    ],
    "hasNoError": false,
    "explanation": "Error en \"would helped\": el verbo que sigue al modal \"would\" debe ser infinitivo sin to (\"would help\"), no pasado con -ed."
  },
  {
    "id": "bh-21",
    "topic": "third-conditional",
    "type": "bug-hunter",
    "prompt": "Toca el segmento con el error gramatical (o \"Sin error\"):",
    "fullSentence": "If you had studied more diligently, you would have passed the exam.",
    "segments": [
      {
        "id": "s1",
        "text": "If you had studied,",
        "isError": false
      },
      {
        "id": "s2",
        "text": "you would have passed",
        "isError": false
      },
      {
        "id": "s3",
        "text": "the exam.",
        "isError": false
      }
    ],
    "hasNoError": true,
    "explanation": "¡Oración correcta! Cumple la estructura exacta del Third Conditional: had + participio (\"had studied\") y would have + participio (\"would have passed\")."
  },
  {
    "id": "bh-22",
    "topic": "third-conditional",
    "type": "bug-hunter",
    "prompt": "Toca el segmento con el error gramatical (o \"Sin error\"):",
    "fullSentence": "If she had took the tourist map, she would not have gotten lost.",
    "segments": [
      {
        "id": "s1",
        "text": "If she had took the map,",
        "isError": true,
        "correction": "If she had taken the map,"
      },
      {
        "id": "s2",
        "text": "she would not have",
        "isError": false
      },
      {
        "id": "s3",
        "text": "gotten lost.",
        "isError": false
      }
    ],
    "hasNoError": false,
    "explanation": "Error en \"had took\": \"took\" es la forma de pasado simple. Con el auxiliar \"had\" se debe utilizar el participio pasado \"taken\" (\"had taken\")."
  },
  {
    "id": "bh-23",
    "topic": "third-conditional",
    "type": "bug-hunter",
    "prompt": "Toca el segmento con el error gramatical (o \"Sin error\"):",
    "fullSentence": "If they had arrived earlier, they would had seen the musical.",
    "segments": [
      {
        "id": "s1",
        "text": "If they had arrived earlier,",
        "isError": false
      },
      {
        "id": "s2",
        "text": "they would had seen",
        "isError": true,
        "correction": "they would have seen"
      },
      {
        "id": "s3",
        "text": "the musical.",
        "isError": false
      }
    ],
    "hasNoError": false,
    "explanation": "Error en \"would had seen\": en la consecuencia del Third Conditional la estructura invariable es \"would have + V3\" (\"would have seen\"), jamás \"would had\"."
  },
  {
    "id": "bh-24",
    "topic": "third-conditional",
    "type": "bug-hunter",
    "prompt": "Toca el segmento con el error gramatical (o \"Sin error\"):",
    "fullSentence": "If Carlos had warned us yesterday, we would have avoid the road accident.",
    "segments": [
      {
        "id": "s1",
        "text": "If Carlos had warned us,",
        "isError": false
      },
      {
        "id": "s2",
        "text": "we would have avoid",
        "isError": true,
        "correction": "we would have avoided"
      },
      {
        "id": "s3",
        "text": "the road accident.",
        "isError": false
      }
    ],
    "hasNoError": false,
    "explanation": "Error en \"would have avoid\": después de \"would have\" se requiere el participio pasado (\"avoided\"), no el verbo en forma base."
  },
  {
    "id": "bh-25",
    "topic": "third-conditional",
    "type": "bug-hunter",
    "prompt": "Toca el segmento con el error gramatical (o \"Sin error\"):",
    "fullSentence": "If I would have known about the test, I would have prepared better.",
    "segments": [
      {
        "id": "s1",
        "text": "If I would have known,",
        "isError": true,
        "correction": "If I had known,"
      },
      {
        "id": "s2",
        "text": "I would have prepared",
        "isError": false
      },
      {
        "id": "s3",
        "text": "much better.",
        "isError": false
      }
    ],
    "hasNoError": false,
    "explanation": "Error común y grave: NUNCA se coloca \"would have\" dentro de la cláusula con \"If\" (\"If I had known\", no \"If I would have known\")."
  },
  {
    "id": "tl-01",
    "topic": "past-perfect",
    "type": "timeline-sorter",
    "prompt": "¿Cuál de las dos acciones ocurrió PRIMERO en la línea de tiempo?",
    "sentenceContext": "When Diego arrived at the train station, the express train had already departed.",
    "eventA": "Diego llegó a la estación de trenes (arrived)",
    "eventB": "El tren expreso partió de la estación (had departed)",
    "firstEvent": "B",
    "explanation": "El Past Perfect (\"had departed\") señala la acción más antigua en el pasado (ocurrió primero), antes de que Diego llegara."
  },
  {
    "id": "tl-02",
    "topic": "past-perfect",
    "type": "timeline-sorter",
    "prompt": "¿Cuál de las dos acciones ocurrió PRIMERO en la línea de tiempo?",
    "sentenceContext": "Sofia had already cooked a delicious pasta before her family arrived home.",
    "eventA": "Sofía cocinó la pasta (had cooked)",
    "eventB": "La familia llegó a la casa (arrived)",
    "firstEvent": "A",
    "explanation": "Cocinar la pasta ocurrió primero (\"had cooked\"), por eso lleva Past Perfect frente a la llegada posterior (\"arrived\")."
  },
  {
    "id": "tl-03",
    "topic": "past-perfect",
    "type": "timeline-sorter",
    "prompt": "¿Cuál de las dos acciones ocurrió PRIMERO en la línea de tiempo?",
    "sentenceContext": "The football match started after the heavy thunderstorm had stopped.",
    "eventA": "El partido de fútbol comenzó (started)",
    "eventB": "La fuerte tormenta se detuvo (had stopped)",
    "firstEvent": "B",
    "explanation": "La tormenta cesó primero (\"had stopped\"), y solo después empezó el partido (\"started\")."
  },
  {
    "id": "tl-04",
    "topic": "past-perfect",
    "type": "timeline-sorter",
    "prompt": "¿Cuál de las dos acciones ocurrió PRIMERO en la línea de tiempo?",
    "sentenceContext": "Carlos couldn’t buy the concert ticket because he had forgotten his credit card at home.",
    "eventA": "Carlos no pudo comprar la entrada (could not buy)",
    "eventB": "Carlos olvidó su tarjeta en casa (had forgotten)",
    "firstEvent": "B",
    "explanation": "Olvidar la tarjeta (\"had forgotten\") ocurrió antes de intentar comprar la entrada en la taquilla."
  },
  {
    "id": "tl-05",
    "topic": "past-perfect",
    "type": "timeline-sorter",
    "prompt": "¿Cuál de las dos acciones ocurrió PRIMERO en la línea de tiempo?",
    "sentenceContext": "By the time the firefighter arrived, the neighbors had put out the fire.",
    "eventA": "Llegaron los bomberos al lugar (arrived)",
    "eventB": "Los vecinos apagaron el fuego (had put out)",
    "firstEvent": "B",
    "explanation": "Los vecinos apagaron el fuego primero (\"had put out\") antes de la llegada de los bomberos."
  },
  {
    "id": "tl-06",
    "topic": "past-perfect",
    "type": "timeline-sorter",
    "prompt": "¿Cuál de las dos acciones ocurrió PRIMERO en la línea de tiempo?",
    "sentenceContext": "Mariana had finished all her homework before she turned on the television.",
    "eventA": "Mariana terminó toda su tarea (had finished)",
    "eventB": "Mariana encendió la televisión (turned on)",
    "firstEvent": "A",
    "explanation": "Terminar las tareas (\"had finished\") fue completado antes de encender la TV (\"turned on\")."
  },
  {
    "id": "tl-07",
    "topic": "past-perfect",
    "type": "timeline-sorter",
    "prompt": "¿Cuál de las dos acciones ocurrió PRIMERO en la línea de tiempo?",
    "sentenceContext": "When we reached the cinema hall, the opening previews had already begun.",
    "eventA": "Llegamos a la sala de cine (reached)",
    "eventB": "Empezaron los tráileres de estreno (had begun)",
    "firstEvent": "B",
    "explanation": "Los avances ya habían comenzado (\"had begun\") antes de nuestro ingreso a la sala (\"reached\")."
  },
  {
    "id": "tl-08",
    "topic": "past-perfect",
    "type": "timeline-sorter",
    "prompt": "¿Cuál de las dos acciones ocurrió PRIMERO en la línea de tiempo?",
    "sentenceContext": "Lucas had saved money for six months before he purchased his new bicycle.",
    "eventA": "Lucas ahorró dinero durante seis meses (had saved)",
    "eventB": "Lucas compró su bicicleta nueva (purchased)",
    "firstEvent": "A",
    "explanation": "El ahorro prolongado (\"had saved\") precedió temporalmente al momento de la compra (\"purchased\")."
  },
  {
    "id": "tl-09",
    "topic": "past-perfect",
    "type": "timeline-sorter",
    "prompt": "¿Cuál de las dos acciones ocurrió PRIMERO en la línea de tiempo?",
    "sentenceContext": "The doctor explained the treatment after the nurse had checked the patient’s vital signs.",
    "eventA": "El médico explicó el tratamiento (explained)",
    "eventB": "La enfermera revisó los signos vitales (had checked)",
    "firstEvent": "B",
    "explanation": "La enfermera tomó los signos vitales primero (\"had checked\"), permitiendo luego la consulta médica."
  },
  {
    "id": "tl-10",
    "topic": "past-perfect",
    "type": "timeline-sorter",
    "prompt": "¿Cuál de las dos acciones ocurrió PRIMERO en la línea de tiempo?",
    "sentenceContext": "I knew the city streets well because I had lived there five years ago.",
    "eventA": "Conocía bien las calles de la ciudad (knew)",
    "eventB": "Viví en esa ciudad años atrás (had lived)",
    "firstEvent": "B",
    "explanation": "Haber vivido allí en el pasado remoto (\"had lived\") ocurrió primero y fundamenta el conocimiento posterior (\"knew\")."
  },
  {
    "id": "tl-11",
    "topic": "past-perfect",
    "type": "timeline-sorter",
    "prompt": "¿Cuál de las dos acciones ocurrió PRIMERO en la línea de tiempo?",
    "sentenceContext": "Before the teacher collected the test sheets, Daniel had checked all his calculations.",
    "eventA": "El profesor recogió las hojas de examen (collected)",
    "eventB": "Daniel revisó todos sus cálculos matemáticos (had checked)",
    "firstEvent": "B",
    "explanation": "Daniel verificó sus cuentas primero (\"had checked\") antes de la recolección (\"collected\")."
  },
  {
    "id": "tl-12",
    "topic": "past-perfect",
    "type": "timeline-sorter",
    "prompt": "¿Cuál de las dos acciones ocurrió PRIMERO en la línea de tiempo?",
    "sentenceContext": "She felt very confident during the interview because she had practiced her answers.",
    "eventA": "Se sintió muy segura durante la entrevista (felt confident)",
    "eventB": "Practicó sus respuestas minuciosamente (had practiced)",
    "firstEvent": "B",
    "explanation": "Practicar con anticipación (\"had practiced\") fue la causa anterior a sentirse segura en la entrevista."
  },
  {
    "id": "tl-13",
    "topic": "past-perfect",
    "type": "timeline-sorter",
    "prompt": "¿Cuál de las dos acciones ocurrió PRIMERO en la línea de tiempo?",
    "sentenceContext": "When the police arrived at the warehouse, the burglars had escaped through the back.",
    "eventA": "La policía llegó al almacén (arrived)",
    "eventB": "Los ladrones escaparon por la puerta trasera (had escaped)",
    "firstEvent": "B",
    "explanation": "El escape (\"had escaped\") ocurrió antes del arribo policial (\"arrived\")."
  },
  {
    "id": "tl-14",
    "topic": "past-perfect",
    "type": "timeline-sorter",
    "prompt": "¿Cuál de las dos acciones ocurrió PRIMERO en la línea de tiempo?",
    "sentenceContext": "Grandmother had baked delicious chocolate cookies before the grandchildren visited her.",
    "eventA": "La abuela horneó las galletas de chocolate (had baked)",
    "eventB": "Los nietos llegaron a visitarla (visited)",
    "firstEvent": "A",
    "explanation": "Hornear las galletas (\"had baked\") se completó antes de la visita de los nietos (\"visited\")."
  },
  {
    "id": "tl-15",
    "topic": "past-perfect",
    "type": "timeline-sorter",
    "prompt": "¿Cuál de las dos acciones ocurrió PRIMERO en la línea de tiempo?",
    "sentenceContext": "We discovered that somebody had broken the classroom window during the night.",
    "eventA": "Descubrimos la ventana rota por la mañana (discovered)",
    "eventB": "Alguien rompió la ventana durante la noche (had broken)",
    "firstEvent": "B",
    "explanation": "Romper la ventana ocurrió en la noche previa (\"had broken\"), antes de ser descubierta en la mañana (\"discovered\")."
  },
  {
    "id": "rc-01",
    "topic": "zero-vs-first",
    "type": "binary-classify",
    "prompt": "Clasifica a qué tipo de condicional pertenece la siguiente oración:",
    "phrase": "If you boil water, it turns into steam.",
    "categoryA": "Zero Conditional (Ley Universal)",
    "categoryB": "First Conditional (Posibilidad Futura)",
    "correctCategory": "A",
    "explanation": "Es un hecho científico y universal constante, por lo que pertenece a Zero Conditional."
  },
  {
    "id": "rc-02",
    "topic": "zero-vs-first",
    "type": "binary-classify",
    "prompt": "Clasifica a qué tipo de condicional pertenece la siguiente oración:",
    "phrase": "If it rains tomorrow, we will stay at home.",
    "categoryA": "Zero Conditional (Ley Universal)",
    "categoryB": "First Conditional (Posibilidad Futura)",
    "correctCategory": "B",
    "explanation": "Habla de una posibilidad específica en el futuro (\"tomorrow\") con resultado probable (\"will stay\")."
  },
  {
    "id": "rc-03",
    "topic": "zero-vs-first",
    "type": "binary-classify",
    "prompt": "Clasifica a qué tipo de condicional pertenece la siguiente oración:",
    "phrase": "If you mix red and yellow paint, you get orange.",
    "categoryA": "Zero Conditional (Ley Universal)",
    "categoryB": "First Conditional (Posibilidad Futura)",
    "correctCategory": "A",
    "explanation": "Mezclar colores siempre produce el mismo resultado científico comprobado (Zero Conditional)."
  },
  {
    "id": "rc-04",
    "topic": "zero-vs-first",
    "type": "binary-classify",
    "prompt": "Clasifica a qué tipo de condicional pertenece la siguiente oración:",
    "phrase": "If she passes the exam on Friday, she will celebrate with her friends.",
    "categoryA": "Zero Conditional (Ley Universal)",
    "categoryB": "First Conditional (Posibilidad Futura)",
    "correctCategory": "B",
    "explanation": "Es un evento futuro particular condicionado (First Conditional con \"will\")."
  },
  {
    "id": "rc-05",
    "topic": "zero-vs-first",
    "type": "binary-classify",
    "prompt": "Clasifica a qué tipo de condicional pertenece la siguiente oración:",
    "phrase": "Plants die if they do not receive regular sunlight and water.",
    "categoryA": "Zero Conditional (Ley Universal)",
    "categoryB": "First Conditional (Posibilidad Futura)",
    "correctCategory": "A",
    "explanation": "Verdad biológica universal sin referencia a un evento futuro específico."
  },
  {
    "id": "rc-06",
    "topic": "second-vs-third",
    "type": "binary-classify",
    "prompt": "Clasifica el sentido temporal de la siguiente hipótesis:",
    "phrase": "If I were a millionaire today, I would buy a luxury sports car.",
    "categoryA": "Second (Imaginaria en el Presente)",
    "categoryB": "Third (Lamento Imposible en el Pasado)",
    "correctCategory": "A",
    "explanation": "Second Conditional: hipótesis irreal sobre el presente o futuro (If + past simple -> would + base)."
  },
  {
    "id": "rc-07",
    "topic": "second-vs-third",
    "type": "binary-classify",
    "prompt": "Clasifica el sentido temporal de la siguiente hipótesis:",
    "phrase": "If you had told me yesterday, I would have helped you with the luggage.",
    "categoryA": "Second (Imaginaria en el Presente)",
    "categoryB": "Third (Lamento Imposible en el Pasado)",
    "correctCategory": "B",
    "explanation": "Third Conditional: el evento ocurrió ayer (\"yesterday\"), ya no puede cambiarse (had told -> would have helped)."
  },
  {
    "id": "rc-08",
    "topic": "second-vs-third",
    "type": "binary-classify",
    "prompt": "Clasifica el sentido temporal de la siguiente hipótesis:",
    "phrase": "If humans had wings, we would fly across the mountain peaks.",
    "categoryA": "Second (Imaginaria en el Presente)",
    "categoryB": "Third (Lamento Imposible en el Pasado)",
    "correctCategory": "A",
    "explanation": "Fantasía hipotética general en el presente/atemporal (Second Conditional)."
  },
  {
    "id": "rc-09",
    "topic": "second-vs-third",
    "type": "binary-classify",
    "prompt": "Clasifica el sentido temporal de la siguiente hipótesis:",
    "phrase": "If she had woken up on time this morning, she would not have missed the flight.",
    "categoryA": "Second (Imaginaria en el Presente)",
    "categoryB": "Third (Lamento Imposible en el Pasado)",
    "correctCategory": "B",
    "explanation": "Se refiere a un hecho consumado esta mañana (\"this morning\"): el vuelo ya se perdió (Third Conditional)."
  },
  {
    "id": "rc-10",
    "topic": "second-vs-third",
    "type": "binary-classify",
    "prompt": "Clasifica el sentido temporal de la siguiente hipótesis:",
    "phrase": "If I knew his telephone number right now, I would call him immediately.",
    "categoryA": "Second (Imaginaria en el Presente)",
    "categoryB": "Third (Lamento Imposible en el Pasado)",
    "correctCategory": "A",
    "explanation": "Condición irreal en el momento presente (\"right now\"): no sé su número, por eso es Second Conditional."
  }
];
