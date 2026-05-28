import type { Lesson } from "../types/learning";

const sharedPrompt =
  "You are a friendly audio teacher. Speak slowly, use short sentences, and pause between phrases. Provide one example, then ask the learner to repeat.";

export const lessons: Lesson[] = [
  {
    id: "lesson-es-1",
    unitId: "unit-es-1",
    title: "Hola and Gracias",
    description: "Say hello and thank you.",
    order: 1,
    goals: ["Say hello", "Say thank you"],
    vocabulary: [
      { id: "v-es-hola", term: "hola", meaning: "hello" },
      { id: "v-es-gracias", term: "gracias", meaning: "thank you" },
    ],
    phrases: [
      {
        id: "p-es-hola",
        text: "hola",
        meaning: "hello",
      },
      {
        id: "p-es-gracias",
        text: "gracias",
        meaning: "thank you",
      },
    ],
    activities: [
      {
        id: "a-es-1",
        type: "flashcard",
        prompt: "hola",
        answer: "hello",
      },
      {
        id: "a-es-2",
        type: "select",
        prompt: "Choose the meaning of 'gracias'",
        choices: ["please", "thank you", "goodbye"],
        answer: "thank you",
      },
    ],
    aiTeacherPrompt: sharedPrompt,
  },
  {
    id: "lesson-es-2",
    unitId: "unit-es-1",
    title: "Me Llamo",
    description: "Introduce yourself.",
    order: 2,
    goals: ["Say your name", "Ask someone's name"],
    vocabulary: [
      { id: "v-es-llamo", term: "me llamo", meaning: "my name is" },
      { id: "v-es-como", term: "como te llamas", meaning: "what is your name" },
    ],
    phrases: [
      {
        id: "p-es-llamo",
        text: "me llamo Ana",
        meaning: "my name is Ana",
      },
      {
        id: "p-es-como",
        text: "como te llamas?",
        meaning: "what is your name?",
      },
    ],
    activities: [
      {
        id: "a-es-3",
        type: "select",
        prompt: "Choose the meaning of 'me llamo'",
        choices: ["I am fine", "my name is", "thank you"],
        answer: "my name is",
      },
      {
        id: "a-es-4",
        type: "match",
        prompt: "Match the phrase to its meaning",
        choices: [
          "como te llamas? = what is your name?",
          "me llamo = my name is",
        ],
        answer: "me llamo = my name is",
      },
    ],
    aiTeacherPrompt: sharedPrompt,
  },
  {
    id: "lesson-es-3",
    unitId: "unit-es-1",
    title: "At the Cafe",
    description: "Order something to drink.",
    order: 3,
    goals: ["Order at a cafe", "Be polite"],
    vocabulary: [
      { id: "v-es-cafe", term: "cafe", meaning: "coffee" },
      { id: "v-es-porfavor", term: "por favor", meaning: "please" },
    ],
    phrases: [
      {
        id: "p-es-quiero",
        text: "quiero un cafe, por favor",
        meaning: "I want a coffee, please",
      },
      {
        id: "p-es-agua",
        text: "agua, por favor",
        meaning: "water, please",
      },
    ],
    activities: [
      {
        id: "a-es-5",
        type: "select",
        prompt: "Choose the polite phrase",
        choices: ["cafe", "por favor", "adios"],
        answer: "por favor",
      },
      {
        id: "a-es-6",
        type: "flashcard",
        prompt: "cafe",
        answer: "coffee",
      },
    ],
    aiTeacherPrompt: sharedPrompt,
  },
  {
    id: "lesson-es-4",
    unitId: "unit-es-1",
    title: "Travel and Directions",
    description: "Ask for directions.",
    order: 4,
    goals: ["Ask where something is", "Understand directions"],
    vocabulary: [
      { id: "v-es-donde", term: "donde", meaning: "where" },
      { id: "v-es-derecha", term: "derecha", meaning: "right" },
    ],
    phrases: [
      {
        id: "p-es-donde",
        text: "donde esta el hotel?",
        meaning: "where is the hotel?",
      },
      {
        id: "p-es-derecha",
        text: "a la derecha",
        meaning: "to the right",
      },
    ],
    activities: [
      {
        id: "a-es-7",
        type: "select",
        prompt: "Choose the meaning of 'derecha'",
        choices: ["left", "right", "straight"],
        answer: "right",
      },
      {
        id: "a-es-8",
        type: "match",
        prompt: "Match the question",
        choices: ["donde esta el hotel? = where is the hotel?"],
        answer: "donde esta el hotel? = where is the hotel?",
      },
    ],
    aiTeacherPrompt: sharedPrompt,
  },
  {
    id: "lesson-es-5",
    unitId: "unit-es-1",
    title: "Shopping Basics",
    description: "Buy something small.",
    order: 5,
    goals: ["Ask the price", "Say it is expensive or cheap"],
    vocabulary: [
      { id: "v-es-cuanto", term: "cuanto cuesta", meaning: "how much is it" },
      { id: "v-es-caro", term: "caro", meaning: "expensive" },
    ],
    phrases: [
      {
        id: "p-es-cuanto",
        text: "cuanto cuesta?",
        meaning: "how much is it?",
      },
      {
        id: "p-es-barato",
        text: "es barato",
        meaning: "it is cheap",
      },
    ],
    activities: [
      {
        id: "a-es-9",
        type: "select",
        prompt: "Choose the meaning of 'caro'",
        choices: ["expensive", "cheap", "new"],
        answer: "expensive",
      },
      {
        id: "a-es-10",
        type: "flashcard",
        prompt: "cuanto cuesta",
        answer: "how much is it",
      },
    ],
    aiTeacherPrompt: sharedPrompt,
  },
  {
    id: "lesson-es-6",
    unitId: "unit-es-1",
    title: "Family and Friends",
    description: "Talk about people you know.",
    order: 6,
    goals: ["Say family members", "Introduce a friend"],
    vocabulary: [
      { id: "v-es-madre", term: "madre", meaning: "mother" },
      { id: "v-es-amigo", term: "amigo", meaning: "friend" },
    ],
    phrases: [
      {
        id: "p-es-mi-madre",
        text: "mi madre",
        meaning: "my mother",
      },
      {
        id: "p-es-es-amigo",
        text: "el es mi amigo",
        meaning: "he is my friend",
      },
    ],
    activities: [
      {
        id: "a-es-11",
        type: "match",
        prompt: "Match the word to its meaning",
        choices: ["madre = mother", "amigo = friend"],
        answer: "amigo = friend",
      },
      {
        id: "a-es-12",
        type: "select",
        prompt: "Choose the meaning of 'madre'",
        choices: ["mother", "father", "sister"],
        answer: "mother",
      },
    ],
    aiTeacherPrompt: sharedPrompt,
  },
  {
    id: "lesson-fr-1",
    unitId: "unit-fr-1",
    title: "Bonjour and Merci",
    description: "Say hello and thank you.",
    order: 1,
    goals: ["Say hello", "Say thank you"],
    vocabulary: [
      { id: "v-fr-bonjour", term: "bonjour", meaning: "hello" },
      { id: "v-fr-merci", term: "merci", meaning: "thank you" },
    ],
    phrases: [
      {
        id: "p-fr-bonjour",
        text: "bonjour",
        meaning: "hello",
      },
      {
        id: "p-fr-merci",
        text: "merci",
        meaning: "thank you",
      },
    ],
    activities: [
      {
        id: "a-fr-1",
        type: "match",
        prompt: "Match the word to its meaning",
        choices: ["bonjour = hello", "merci = thank you"],
        answer: "bonjour = hello",
      },
      {
        id: "a-fr-2",
        type: "select",
        prompt: "Choose the meaning of 'merci'",
        choices: ["thank you", "good morning", "excuse me"],
        answer: "thank you",
      },
    ],
    aiTeacherPrompt: sharedPrompt,
  },
  {
    id: "lesson-fr-2",
    unitId: "unit-fr-1",
    title: "Je M'appelle",
    description: "Introduce yourself.",
    order: 2,
    goals: ["Say your name", "Ask someone's name"],
    vocabulary: [
      { id: "v-fr-appelle", term: "je m'appelle", meaning: "my name is" },
      {
        id: "v-fr-comment",
        term: "comment tu t'appelles",
        meaning: "what is your name",
      },
    ],
    phrases: [
      {
        id: "p-fr-appelle",
        text: "je m'appelle Lea",
        meaning: "my name is Lea",
      },
      {
        id: "p-fr-comment",
        text: "comment tu t'appelles?",
        meaning: "what is your name?",
      },
    ],
    activities: [
      {
        id: "a-fr-3",
        type: "select",
        prompt: "Choose the meaning of 'je m'appelle'",
        choices: ["my name is", "good night", "thank you"],
        answer: "my name is",
      },
      {
        id: "a-fr-4",
        type: "match",
        prompt: "Match the phrase to its meaning",
        choices: [
          "je m'appelle = my name is",
          "comment tu t'appelles? = what is your name?",
        ],
        answer: "je m'appelle = my name is",
      },
    ],
    aiTeacherPrompt: sharedPrompt,
  },
  {
    id: "lesson-fr-3",
    unitId: "unit-fr-1",
    title: "At the Cafe",
    description: "Order something to drink.",
    order: 3,
    goals: ["Order at a cafe", "Be polite"],
    vocabulary: [
      { id: "v-fr-cafe", term: "cafe", meaning: "coffee" },
      { id: "v-fr-silvousplait", term: "s'il vous plait", meaning: "please" },
    ],
    phrases: [
      {
        id: "p-fr-veux",
        text: "je veux un cafe, s'il vous plait",
        meaning: "I want a coffee, please",
      },
      {
        id: "p-fr-eau",
        text: "de l'eau, s'il vous plait",
        meaning: "water, please",
      },
    ],
    activities: [
      {
        id: "a-fr-5",
        type: "select",
        prompt: "Choose the polite phrase",
        choices: ["cafe", "s'il vous plait", "au revoir"],
        answer: "s'il vous plait",
      },
      {
        id: "a-fr-6",
        type: "flashcard",
        prompt: "cafe",
        answer: "coffee",
      },
    ],
    aiTeacherPrompt: sharedPrompt,
  },
  {
    id: "lesson-fr-4",
    unitId: "unit-fr-1",
    title: "Travel and Directions",
    description: "Ask for directions.",
    order: 4,
    goals: ["Ask where something is", "Understand directions"],
    vocabulary: [
      { id: "v-fr-ou", term: "ou", meaning: "where" },
      { id: "v-fr-droite", term: "droite", meaning: "right" },
    ],
    phrases: [
      {
        id: "p-fr-ou",
        text: "ou est l'hotel?",
        meaning: "where is the hotel?",
      },
      {
        id: "p-fr-droite",
        text: "a droite",
        meaning: "to the right",
      },
    ],
    activities: [
      {
        id: "a-fr-7",
        type: "select",
        prompt: "Choose the meaning of 'droite'",
        choices: ["left", "right", "straight"],
        answer: "right",
      },
      {
        id: "a-fr-8",
        type: "match",
        prompt: "Match the question",
        choices: ["ou est l'hotel? = where is the hotel?"],
        answer: "ou est l'hotel? = where is the hotel?",
      },
    ],
    aiTeacherPrompt: sharedPrompt,
  },
  {
    id: "lesson-fr-5",
    unitId: "unit-fr-1",
    title: "Shopping Basics",
    description: "Buy something small.",
    order: 5,
    goals: ["Ask the price", "Say it is expensive or cheap"],
    vocabulary: [
      {
        id: "v-fr-combien",
        term: "combien ca coute",
        meaning: "how much is it",
      },
      { id: "v-fr-cher", term: "cher", meaning: "expensive" },
    ],
    phrases: [
      {
        id: "p-fr-combien",
        text: "combien ca coute?",
        meaning: "how much is it?",
      },
      {
        id: "p-fr-pas-cher",
        text: "ce n'est pas cher",
        meaning: "it is not expensive",
      },
    ],
    activities: [
      {
        id: "a-fr-9",
        type: "select",
        prompt: "Choose the meaning of 'cher'",
        choices: ["expensive", "cheap", "new"],
        answer: "expensive",
      },
      {
        id: "a-fr-10",
        type: "flashcard",
        prompt: "combien ca coute",
        answer: "how much is it",
      },
    ],
    aiTeacherPrompt: sharedPrompt,
  },
  {
    id: "lesson-fr-6",
    unitId: "unit-fr-1",
    title: "Family and Friends",
    description: "Talk about people you know.",
    order: 6,
    goals: ["Say family members", "Introduce a friend"],
    vocabulary: [
      { id: "v-fr-mere", term: "mere", meaning: "mother" },
      { id: "v-fr-ami", term: "ami", meaning: "friend" },
    ],
    phrases: [
      {
        id: "p-fr-ma-mere",
        text: "ma mere",
        meaning: "my mother",
      },
      {
        id: "p-fr-mon-ami",
        text: "il est mon ami",
        meaning: "he is my friend",
      },
    ],
    activities: [
      {
        id: "a-fr-11",
        type: "match",
        prompt: "Match the word to its meaning",
        choices: ["mere = mother", "ami = friend"],
        answer: "ami = friend",
      },
      {
        id: "a-fr-12",
        type: "select",
        prompt: "Choose the meaning of 'mere'",
        choices: ["mother", "father", "sister"],
        answer: "mother",
      },
    ],
    aiTeacherPrompt: sharedPrompt,
  },
  {
    id: "lesson-ja-1",
    unitId: "unit-ja-1",
    title: "Konnichiwa and Arigatou",
    description: "Say hello and thank you.",
    order: 1,
    goals: ["Say hello", "Say thank you"],
    vocabulary: [
      {
        id: "v-ja-konnichiwa",
        term: "konnichiwa",
        meaning: "hello",
        transliteration: "kon-nee-chee-wah",
      },
      {
        id: "v-ja-arigatou",
        term: "arigatou",
        meaning: "thank you",
        transliteration: "ah-ree-gah-toh",
      },
    ],
    phrases: [
      {
        id: "p-ja-konnichiwa",
        text: "konnichiwa",
        meaning: "hello",
        transliteration: "kon-nee-chee-wah",
      },
      {
        id: "p-ja-arigatou",
        text: "arigatou",
        meaning: "thank you",
        transliteration: "ah-ree-gah-toh",
      },
    ],
    activities: [
      {
        id: "a-ja-1",
        type: "listen",
        prompt: "Listen and choose the right meaning of 'konnichiwa'",
        choices: ["hello", "good night", "thank you"],
        answer: "hello",
        audioHint: "konnichiwa",
      },
      {
        id: "a-ja-2",
        type: "speak",
        prompt: "Say 'arigatou'",
        answer: "arigatou",
      },
    ],
    aiTeacherPrompt: sharedPrompt,
  },
  {
    id: "lesson-ja-2",
    unitId: "unit-ja-1",
    title: "Watashi no Namae",
    description: "Introduce yourself.",
    order: 2,
    goals: ["Say your name", "Ask someone's name"],
    vocabulary: [
      {
        id: "v-ja-namae",
        term: "namae",
        meaning: "name",
        transliteration: "nah-mah-eh",
      },
      {
        id: "v-ja-desu",
        term: "desu",
        meaning: "is",
        transliteration: "deh-soo",
      },
    ],
    phrases: [
      {
        id: "p-ja-namae",
        text: "watashi no namae wa Ken desu",
        meaning: "my name is Ken",
        transliteration: "wah-tah-shee no nah-mah-eh wah ken deh-soo",
      },
      {
        id: "p-ja-namae-ask",
        text: "namae wa nan desu ka?",
        meaning: "what is your name?",
        transliteration: "nah-mah-eh wah nan deh-soo kah",
      },
    ],
    activities: [
      {
        id: "a-ja-3",
        type: "select",
        prompt: "Choose the meaning of 'namae'",
        choices: ["name", "hello", "thanks"],
        answer: "name",
      },
      {
        id: "a-ja-4",
        type: "match",
        prompt: "Match the word to its meaning",
        choices: ["desu = is", "namae = name"],
        answer: "desu = is",
      },
    ],
    aiTeacherPrompt: sharedPrompt,
  },
  {
    id: "lesson-ja-3",
    unitId: "unit-ja-1",
    title: "At the Cafe",
    description: "Order something to drink.",
    order: 3,
    goals: ["Order at a cafe", "Be polite"],
    vocabulary: [
      {
        id: "v-ja-koohii",
        term: "koohii",
        meaning: "coffee",
        transliteration: "koh-hee",
      },
      {
        id: "v-ja-kudasai",
        term: "kudasai",
        meaning: "please",
        transliteration: "koo-dah-sigh",
      },
    ],
    phrases: [
      {
        id: "p-ja-coffee",
        text: "koohii o kudasai",
        meaning: "coffee, please",
        transliteration: "koh-hee oh koo-dah-sigh",
      },
      {
        id: "p-ja-water",
        text: "mizu o kudasai",
        meaning: "water, please",
        transliteration: "mee-zoo oh koo-dah-sigh",
      },
    ],
    activities: [
      {
        id: "a-ja-5",
        type: "select",
        prompt: "Choose the polite word",
        choices: ["kudasai", "arigatou", "ohayou"],
        answer: "kudasai",
      },
      {
        id: "a-ja-6",
        type: "flashcard",
        prompt: "koohii",
        answer: "coffee",
      },
    ],
    aiTeacherPrompt: sharedPrompt,
  },
  {
    id: "lesson-ja-4",
    unitId: "unit-ja-1",
    title: "Travel and Directions",
    description: "Ask for directions.",
    order: 4,
    goals: ["Ask where something is", "Understand directions"],
    vocabulary: [
      {
        id: "v-ja-doko",
        term: "doko",
        meaning: "where",
        transliteration: "doh-koh",
      },
      {
        id: "v-ja-migi",
        term: "migi",
        meaning: "right",
        transliteration: "mee-gee",
      },
    ],
    phrases: [
      {
        id: "p-ja-hotel",
        text: "hoteru wa doko desu ka?",
        meaning: "where is the hotel?",
        transliteration: "ho-teh-roo wah doh-koh deh-soo kah",
      },
      {
        id: "p-ja-right",
        text: "migi desu",
        meaning: "it is to the right",
        transliteration: "mee-gee deh-soo",
      },
    ],
    activities: [
      {
        id: "a-ja-7",
        type: "select",
        prompt: "Choose the meaning of 'migi'",
        choices: ["right", "left", "straight"],
        answer: "right",
      },
      {
        id: "a-ja-8",
        type: "match",
        prompt: "Match the word to its meaning",
        choices: ["doko = where", "migi = right"],
        answer: "migi = right",
      },
    ],
    aiTeacherPrompt: sharedPrompt,
  },
  {
    id: "lesson-ja-5",
    unitId: "unit-ja-1",
    title: "Shopping Basics",
    description: "Buy something small.",
    order: 5,
    goals: ["Ask the price", "Say it is expensive or cheap"],
    vocabulary: [
      {
        id: "v-ja-ikura",
        term: "ikura",
        meaning: "how much",
        transliteration: "ee-koo-rah",
      },
      {
        id: "v-ja-takai",
        term: "takai",
        meaning: "expensive",
        transliteration: "tah-kigh",
      },
    ],
    phrases: [
      {
        id: "p-ja-ikura",
        text: "ikura desu ka?",
        meaning: "how much is it?",
        transliteration: "ee-koo-rah deh-soo kah",
      },
      {
        id: "p-ja-yasui",
        text: "yasui desu",
        meaning: "it is cheap",
        transliteration: "yah-soo-ee deh-soo",
      },
    ],
    activities: [
      {
        id: "a-ja-9",
        type: "select",
        prompt: "Choose the meaning of 'takai'",
        choices: ["expensive", "cheap", "new"],
        answer: "expensive",
      },
      {
        id: "a-ja-10",
        type: "flashcard",
        prompt: "ikura",
        answer: "how much",
      },
    ],
    aiTeacherPrompt: sharedPrompt,
  },
  {
    id: "lesson-ja-6",
    unitId: "unit-ja-1",
    title: "Family and Friends",
    description: "Talk about people you know.",
    order: 6,
    goals: ["Say family members", "Introduce a friend"],
    vocabulary: [
      {
        id: "v-ja-haha",
        term: "haha",
        meaning: "mother",
        transliteration: "hah-hah",
      },
      {
        id: "v-ja-tomodachi",
        term: "tomodachi",
        meaning: "friend",
        transliteration: "toh-moh-dah-chee",
      },
    ],
    phrases: [
      {
        id: "p-ja-haha",
        text: "watashi no haha",
        meaning: "my mother",
        transliteration: "wah-tah-shee no hah-hah",
      },
      {
        id: "p-ja-friend",
        text: "kare wa tomodachi desu",
        meaning: "he is a friend",
        transliteration: "kah-reh wah toh-moh-dah-chee deh-soo",
      },
    ],
    activities: [
      {
        id: "a-ja-11",
        type: "match",
        prompt: "Match the word to its meaning",
        choices: ["haha = mother", "tomodachi = friend"],
        answer: "tomodachi = friend",
      },
      {
        id: "a-ja-12",
        type: "select",
        prompt: "Choose the meaning of 'haha'",
        choices: ["mother", "father", "sister"],
        answer: "mother",
      },
    ],
    aiTeacherPrompt: sharedPrompt,
  },
];
