export type Id = string;

export type Language = {
  id: Id;
  code: string;
  name: string;
  nativeName: string;
  rtl?: boolean;
};

export type Unit = {
  id: Id;
  languageId: Id;
  title: string;
  description: string;
  order: number;
  lessonIds: Id[];
};

export type ActivityType =
  | "flashcard"
  | "match"
  | "listen"
  | "speak"
  | "select"
  | "fill";

export type Activity = {
  id: Id;
  type: ActivityType;
  prompt: string;
  choices?: string[];
  answer: string;
  audioHint?: string;
};

export type VocabularyItem = {
  id: Id;
  term: string;
  meaning: string;
  transliteration?: string;
};

export type Phrase = {
  id: Id;
  text: string;
  meaning: string;
  transliteration?: string;
};

export type Lesson = {
  id: Id;
  unitId: Id;
  title: string;
  description: string;
  order: number;
  goals: string[];
  vocabulary: VocabularyItem[];
  phrases: Phrase[];
  activities: Activity[];
  aiTeacherPrompt: string;
};
