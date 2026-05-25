import type { Unit } from "../types/learning";

export const units: Unit[] = [
  {
    id: "es-basics-1",
    languageId: "es",
    title: "Basics 1",
    description: "Core greetings and polite words.",
    order: 1,
    lessonIds: ["es-lesson-hello", "es-lesson-please"],
  },
  {
    id: "fr-basics-1",
    languageId: "fr",
    title: "Basics 1",
    description: "Introduce yourself and say hello.",
    order: 1,
    lessonIds: ["fr-lesson-hello"],
  },
  {
    id: "ja-basics-1",
    languageId: "ja",
    title: "Basics 1",
    description: "Greetings and simple nouns.",
    order: 1,
    lessonIds: ["ja-lesson-hello"],
  },
];
