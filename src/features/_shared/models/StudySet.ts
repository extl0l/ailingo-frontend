import { StudySetAuthor } from "./StudySetAuthor.ts";

export interface StudySet {
  readonly id: number;
  name: string;
  phraseLanguage: Language;
  definitionLanguage: Language;
  icon: string;
  color: string;
  author: StudySetAuthor;
}

export type Language = "en-US" | "pl-PL";

export interface Definition {
  readonly id: number;
  phrase: string;
  meaning: string;
  sentences: string[];
}
