import { StudySetAuthor } from "./StudySetAuthor.ts";

export interface StudySet {
  readonly id: string;
  name: string;

  icon: string; // FIXME: This is missing in the api response
  color: string; // FIXME: This is missing in the api response

  phraseLanguage: Language;
  definitionLanguage: Language;

  author: StudySetAuthor;
}

export type Language = "en-US" | "pl-PL";

export interface Definition {
  word: string;
  definition: string;
}
