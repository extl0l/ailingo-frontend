import { Definition, StudySet } from "../_shared/models/StudySet.tsx";
import { Glyph } from "../_shared/components/Glyph.tsx";
import IconStudy from "./assets/lightbulb_FILL0_wght400_GRAD0_opsz40.svg";

import DUMMY_ICON from "../library/assets/arrow_upward_alt_FILL0_wght400_GRAD0_opsz40.svg";

const DUMMY_STUDY_SET: StudySet = {
  id: "study-set-1",
  title: "Home and furniture",
  icon: DUMMY_ICON,
  color: "hsla(58, 63%, 53%, 1)",
};

const DUMMY_WORDS: Definition[] = [
  {
    word: "look forward to something",
    definition: "oczekiwać na coś z niecierpliwością",
  },
  {
    word: "plan on something",
    definition: "planować coś",
  },
  {
    word: "throw a party",
    definition: "zorganizować przyjęcie",
  },
  {
    word: "housewarming party",
    definition: "parapetówka",
  },
];

export const StudySetDetailsPage = () => {
  const { title, icon, color } = DUMMY_STUDY_SET;
  const words = DUMMY_WORDS;

  return (
    <article className="font-medium text-theme-brown-light">
      <header className="bg-theme-background-light-variant">
        <div className="p-8 max-w-3xl mx-auto flex gap-8 items-center">
          <div
            className="w-40 h-40 rounded-2xl flex items-center justify-center text-theme-background-light-variant flex-shrink-0"
            style={{ backgroundColor: color }}
          >
            <Glyph src={icon} width="4rem" height="4rem" />
          </div>
          <div>
            <h1 className="text-4xl">{title}</h1>
            <p className="opacity-50 mt-1">by Anonymous</p>
            <div className="grid grid-cols-2 mt-3">
              <button
                className="border-2 p-3 pl-0 rounded-xl flex items-center gap-2 justify-center"
                style={{ color, borderColor: color }}
              >
                <Glyph src={IconStudy} width="1.5rem" height="1.5rem" />
                Study
              </button>
            </div>
          </div>
        </div>
      </header>
      <section className="flex flex-col max-w-3xl px-8 mx-auto">
        <p className="font-medium text-theme-brown-light text-2xl py-6">
          Words
        </p>
        {words.map((word) => (
          <div key={word.word}>
            <p>{word.word}</p>
          </div>
        ))}
      </section>
    </article>
  );
};
