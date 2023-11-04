import { Definition, StudySet } from "../_shared/models/StudySet.tsx";
import IconAddStar from "./assets/star_FILL0_wght600_GRAD0_opsz24.svg";
import IconOpenFullscreen from "./assets/open_in_full_FILL0_wght400_GRAD0_opsz24.svg";
import { Glyph } from "../_shared/components/Glyph.tsx";

import DUMMY_ICON from "../library/assets/arrow_upward_alt_FILL0_wght400_GRAD0_opsz40.svg";
import { FlipCard } from "./components/FlipCard.tsx";

const DUMMY_STUDY_SET: StudySet = {
  id: "study-set-1",
  title: "Home and furniture",
  icon: DUMMY_ICON,
  color: "hsla(58, 63%, 53%, 1)",
};

const DUMMY_DEFINITIONS: Definition[] = [
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
  const definitions = DUMMY_DEFINITIONS;

  return (
    <article className="font-medium text-theme-brown-light">
      <header className="bg-theme-background-light-variant">
        <div className="p-8 max-w-3xl mx-auto">
          <div className="flex items-center gap-2.5 mb-3">
            <h1 className="text-3xl">{title}</h1>
            <button title="Star this study set">
              <img src={IconAddStar} alt="" />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-3">
            <div className="col-start-1 col-end-4 aspect-video relative">
              <button
                className="absolute top-3.5 left-3.5 z-[1]"
                title="Open fullscreen"
              >
                <img src={IconOpenFullscreen} alt="" />
              </button>
              <FlipCard
                front={
                  <div className="w-full h-full bg-white rounded-xl relative overflow-hidden flex items-center justify-center text-2xl pb-4">
                    cabinet
                    <div
                      className="absolute bottom-0 left-0 w-full p-2 text-center text-theme-background-light-variant text-base"
                      style={{ backgroundColor: color }}
                    >
                      tap to flip
                    </div>
                  </div>
                }
                back={
                  <div className="w-full h-full bg-white rounded-xl overflow-hidden flex items-center justify-center text-2xl pb-4">
                    szafka
                  </div>
                }
              />
            </div>
            <div className="flex flex-col items-end">
              <div
                className="flex items-center justify-center aspect-square rounded-xl text-theme-background-light-variant w-full"
                style={{ backgroundColor: color }}
              >
                <Glyph src={icon} />
              </div>
              <div className="flex items-center gap-2 mt-3">
                <span className="opacity-50">by Anonymous</span>
                <img className="w-8 h-8 rounded-full" src="" alt="" />
              </div>
            </div>
          </div>
        </div>
      </header>
      <section className="flex flex-col max-w-3xl px-8 mx-auto">
        <p className="font-medium text-theme-brown-light text-2xl py-6">
          Words
        </p>
        {definitions.map((definition) => (
          <WordDefinition
            key={`${definition.word}:${definition.definition}`} // key="<word>:<definition>"
            definition={definition}
          />
        ))}
      </section>
    </article>
  );
};

interface WordDefinitionProps {
  definition: Definition;
}

const WordDefinition = (props: WordDefinitionProps) => {
  const { word, definition } = props.definition;

  return (
    <div className="grid grid-cols-3 even:bg-theme-background-light-variant rounded-xl p-3">
      <span>{word}</span>
      <span className="col-span-2">{definition}</span>
    </div>
  );
};
