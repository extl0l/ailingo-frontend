import { StudySetDetails } from "./models/StudySetDetails.ts";
import { PropsWithChildren } from "react";
import { FeaturedStudySetCard } from "./components/FeaturedStudySetCard.tsx";
import { StudySetCard } from "./components/StudySetCard.tsx";

export interface FeedSection {
  title: string;
  description?: string;
  cards: StudySetDetails[];
}

export interface FeaturedStudySetDetails {
  description: string;
  learnedWords: number;
}

export interface FeedProps {
  continueLearningStudySets?: (StudySetDetails & FeaturedStudySetDetails)[];
  sections: FeedSection[];
}

export const Feed = (props: FeedProps) => {
  return (
    <main className="grid grid-cols-2 gap-2.5">
      {props.continueLearningStudySets && (
        <SectionWrapper title={"Continue learning"}>
          {props.continueLearningStudySets.map((card) => (
            <FeaturedStudySetCard
              key={card.id}
              studySet={card}
              description={card.description}
              learnedWords={card.learnedWords}
            />
          ))}
        </SectionWrapper>
      )}
      {props.sections.map((section) => (
        <SectionWrapper
          key={section.title}
          title={section.title}
          description={section.description}
        >
          {section.cards.map((card) => (
            <StudySetCard key={card.id} studySet={card} />
          ))}
        </SectionWrapper>
      ))}
    </main>
  );
};

interface SectionWrapperProps {
  title: string;
  description?: string;
}

const SectionWrapper = (props: PropsWithChildren<SectionWrapperProps>) => {
  return (
    <>
      <header className="col-span-full font-medium text-theme-brown-light mt-2.5 first-of-type:mt-0">
        <h2 className="text-2xl">{props.title}</h2>
        {props.description && (
          <p className="mt-0.5 opacity-75">{props.description}</p>
        )}
      </header>
      {props.children}
    </>
  );
};
