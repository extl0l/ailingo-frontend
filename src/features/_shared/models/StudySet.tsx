export interface StudySet {
  // readonly id: string;
  title: string;
  // description: string;

  icon: string;
  color: string;

  // phraseLanguage: Language;
  // definitionLanguage: Language;
  // words: Word[];

  // authorId: string;
}

export type Language = "en-US" | "pl-PL";
export type Word = [string, string];
