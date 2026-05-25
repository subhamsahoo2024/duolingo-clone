export type LanguageId = "es" | "fr" | "ja";
export type UnitId = string;
export type LessonId = string;
export type ActivityId = string;
export type VocabularyId = string;
export type PhraseId = string;
export type AITeacherPromptId = string;

export type ActivityType =
  | "vocab"
  | "phrase-match"
  | "listening"
  | "speaking"
  | "quiz";

export type LessonGoal = {
  id: string;
  title: string;
  description: string;
};

export type AITeacherPrompt = {
  id: AITeacherPromptId;
  title: string;
  targetLanguage: LanguageId;
  level: "beginner" | "intermediate" | "advanced";
  scenario: string;
  systemPrompt: string;
  userPrompt: string;
  speakingStyle: "friendly" | "patient" | "energetic";
  constraints: string[];
  exampleUtterances: string[];
};

export type Language = {
  id: LanguageId;
  name: string;
  nativeName: string;
  description: string;
  unitIds: UnitId[];
};

export type Unit = {
  id: UnitId;
  languageId: LanguageId;
  title: string;
  description: string;
  order: number;
  lessonIds: LessonId[];
};

export type VocabularyItem = {
  id: VocabularyId;
  languageId: LanguageId;
  term: string;
  translation: string;
  partOfSpeech?: "noun" | "verb" | "adjective" | "phrase";
};

export type Phrase = {
  id: PhraseId;
  languageId: LanguageId;
  text: string;
  translation: string;
};

export type Activity = {
  id: ActivityId;
  lessonId: LessonId;
  type: ActivityType;
  prompt: string;
  vocabularyIds?: VocabularyId[];
  phraseIds?: PhraseId[];
  choices?: string[];
  correctAnswer?: string;
};

export type Lesson = {
  id: LessonId;
  unitId: UnitId;
  title: string;
  description: string;
  order: number;
  goals: LessonGoal[];
  activityIds: ActivityId[];
  vocabularyIds: VocabularyId[];
  phraseIds: PhraseId[];
  aiTeacherPromptId?: AITeacherPromptId;
};
