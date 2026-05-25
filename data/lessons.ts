import type {
  Activity,
  AITeacherPrompt,
  Lesson,
  Phrase,
  VocabularyItem,
} from "../types/learning";

export const vocabulary: VocabularyItem[] = [
  { id: "es-hola", languageId: "es", term: "hola", translation: "hello" },
  { id: "es-adios", languageId: "es", term: "adios", translation: "goodbye" },
  {
    id: "es-por-favor",
    languageId: "es",
    term: "por favor",
    translation: "please",
  },
  { id: "fr-bonjour", languageId: "fr", term: "bonjour", translation: "hello" },
  { id: "fr-merci", languageId: "fr", term: "merci", translation: "thank you" },
  {
    id: "ja-konnichiwa",
    languageId: "ja",
    term: "konnichiwa",
    translation: "hello",
  },
  {
    id: "ja-arigatou",
    languageId: "ja",
    term: "arigatou",
    translation: "thank you",
  },
];

export const phrases: Phrase[] = [
  {
    id: "es-me-llamo",
    languageId: "es",
    text: "me llamo Ana",
    translation: "my name is Ana",
  },
  {
    id: "fr-je-mappelle",
    languageId: "fr",
    text: "je m'appelle Jules",
    translation: "my name is Jules",
  },
  {
    id: "ja-hajimemashite",
    languageId: "ja",
    text: "hajimemashite",
    translation: "nice to meet you",
  },
];

export const aiTeacherPrompts: AITeacherPrompt[] = [
  {
    id: "es-audio-greeter",
    title: "Spanish Greeting Coach",
    targetLanguage: "es",
    level: "beginner",
    scenario: "A friendly teacher helps a learner practice greetings.",
    systemPrompt:
      "You are a patient Spanish teacher. Keep responses short and clear.",
    userPrompt:
      "Guide the learner to say hello and goodbye in Spanish. Ask one short question at a time.",
    speakingStyle: "friendly",
    constraints: [
      "Use simple vocabulary",
      "Speak slowly",
      "Provide a short model answer",
    ],
    exampleUtterances: [
      "Di: hola.",
      "Ahora di: adios.",
      "Muy bien. Como estas?",
    ],
  },
  {
    id: "fr-audio-intro",
    title: "French Introduction Coach",
    targetLanguage: "fr",
    level: "beginner",
    scenario: "Practice a short self-introduction in French.",
    systemPrompt:
      "You are a calm French teacher. Keep the pace slow and encouraging.",
    userPrompt: "Help the learner say hello and share their name in French.",
    speakingStyle: "patient",
    constraints: ["Use two short sentences", "Repeat once if needed"],
    exampleUtterances: ["Dis: bonjour.", "Dis: je m'appelle Jules."],
  },
];

export const lessons: Lesson[] = [
  {
    id: "es-lesson-hello",
    unitId: "es-basics-1",
    title: "Hello and Goodbye",
    description: "Learn simple Spanish greetings.",
    order: 1,
    goals: [
      {
        id: "es-hello-goal-1",
        title: "Greet someone",
        description: "Say hello and goodbye in Spanish.",
      },
    ],
    activityIds: ["es-act-hello-1", "es-act-hello-2"],
    vocabularyIds: ["es-hola", "es-adios"],
    phraseIds: [],
    aiTeacherPromptId: "es-audio-greeter",
  },
  {
    id: "es-lesson-please",
    unitId: "es-basics-1",
    title: "Polite Words",
    description: "Practice simple polite words.",
    order: 2,
    goals: [
      {
        id: "es-please-goal-1",
        title: "Be polite",
        description: "Use the word for please in Spanish.",
      },
    ],
    activityIds: ["es-act-please-1"],
    vocabularyIds: ["es-por-favor"],
    phraseIds: [],
  },
  {
    id: "fr-lesson-hello",
    unitId: "fr-basics-1",
    title: "Bonjour",
    description: "Say hello and introduce yourself.",
    order: 1,
    goals: [
      {
        id: "fr-hello-goal-1",
        title: "Say hello",
        description: "Use a friendly greeting in French.",
      },
    ],
    activityIds: ["fr-act-hello-1", "fr-act-hello-2"],
    vocabularyIds: ["fr-bonjour", "fr-merci"],
    phraseIds: ["fr-je-mappelle"],
    aiTeacherPromptId: "fr-audio-intro",
  },
  {
    id: "ja-lesson-hello",
    unitId: "ja-basics-1",
    title: "Konnichiwa",
    description: "Learn a polite Japanese greeting.",
    order: 1,
    goals: [
      {
        id: "ja-hello-goal-1",
        title: "Greet politely",
        description: "Say hello in Japanese.",
      },
    ],
    activityIds: ["ja-act-hello-1"],
    vocabularyIds: ["ja-konnichiwa", "ja-arigatou"],
    phraseIds: ["ja-hajimemashite"],
  },
];

export const activities: Activity[] = [
  {
    id: "es-act-hello-1",
    lessonId: "es-lesson-hello",
    type: "vocab",
    prompt: "Match the Spanish word to its meaning.",
    vocabularyIds: ["es-hola", "es-adios"],
    choices: ["hello", "goodbye"],
    correctAnswer: "hello",
  },
  {
    id: "es-act-hello-2",
    lessonId: "es-lesson-hello",
    type: "listening",
    prompt: "Listen and choose the word you hear.",
    vocabularyIds: ["es-hola"],
    choices: ["hola", "adios"],
    correctAnswer: "hola",
  },
  {
    id: "es-act-please-1",
    lessonId: "es-lesson-please",
    type: "speaking",
    prompt: "Say the word for please in Spanish.",
    vocabularyIds: ["es-por-favor"],
    correctAnswer: "por favor",
  },
  {
    id: "fr-act-hello-1",
    lessonId: "fr-lesson-hello",
    type: "vocab",
    prompt: "Pick the French greeting.",
    vocabularyIds: ["fr-bonjour"],
    choices: ["bonjour", "merci"],
    correctAnswer: "bonjour",
  },
  {
    id: "fr-act-hello-2",
    lessonId: "fr-lesson-hello",
    type: "phrase-match",
    prompt: "Match the phrase to its meaning.",
    phraseIds: ["fr-je-mappelle"],
    choices: ["my name is Jules"],
    correctAnswer: "my name is Jules",
  },
  {
    id: "ja-act-hello-1",
    lessonId: "ja-lesson-hello",
    type: "vocab",
    prompt: "Choose the Japanese greeting.",
    vocabularyIds: ["ja-konnichiwa"],
    choices: ["konnichiwa", "arigatou"],
    correctAnswer: "konnichiwa",
  },
];
