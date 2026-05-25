import type { Language } from "../types/learning";

export const languages: Language[] = [
  {
    id: "es",
    name: "Spanish",
    nativeName: "Espanol",
    description: "Everyday words and simple greetings.",
    unitIds: ["es-basics-1"],
  },
  {
    id: "fr",
    name: "French",
    nativeName: "Francais",
    description: "Friendly phrases for introductions.",
    unitIds: ["fr-basics-1"],
  },
  {
    id: "ja",
    name: "Japanese",
    nativeName: "Nihongo",
    description: "Polite greetings and simple nouns.",
    unitIds: ["ja-basics-1"],
  },
];
