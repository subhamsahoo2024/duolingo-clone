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
];
