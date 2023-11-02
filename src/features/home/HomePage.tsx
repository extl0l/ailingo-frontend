import { SectionWrapper } from "./components/SectionWrapper.tsx";
import SomeIcon from "../navigation/assets/keyboard_double_arrow_up_FILL0_wght400_GRAD0_opsz24.svg";
import { FeaturedStudySetCard } from "./components/FeaturedStudySetCard.tsx";
import { StudySetCard } from "./components/StudySetCard.tsx";

const continueLearningStudySets = [
  {
    id: "su-3",
    title: "Home furnishings",
    color: "#554236",
    icon: SomeIcon,
    author: "Furnitea",
    aiGenerated: false,
    totalWords: 140,
    learnedWords: 53,
    description: "Studied 2h ago",
  },
  {
    id: "su-1",
    title: "At the airport",
    color: "#D3CE3D",
    icon: SomeIcon,
    author: "AI-r",
    aiGenerated: false,
    totalWords: 154,
    learnedWords: 130,
    description: "Studied this morning",
  },
];

const sections = [
  {
    title: "Suggested",
    description: 'Recently studied "Home furnishings"',
    cards: [
      {
        id: "su-0",
        title: "Gardening",
        color: "#60B99A",
        icon: SomeIcon,
        author: "",
        aiGenerated: true,
        totalWords: 110,
      },
      {
        id: "su-1",
        title: "At the airport",
        color: "#D3CE3D",
        icon: SomeIcon,
        author: "AI-r",
        aiGenerated: false,
        totalWords: 154,
      },
      {
        id: "su-2",
        title: "Fix your car",
        color: "#F77825",
        icon: SomeIcon,
        author: "Descend",
        aiGenerated: false,
        totalWords: 48,
      },
      {
        id: "su-3",
        title: "Home furnishings",
        color: "#554236",
        icon: SomeIcon,
        author: "Furnitea",
        aiGenerated: false,
        totalWords: 140,
      },
    ],
  },
];

export const HomePage = () => {
  return (
    <div className="relative bg-gradient-to-b from-theme-background-light-variant from-[10rem] to-transparent to-[10rem]">
      <main className="grid grid-cols-2 gap-2.5 max-w-3xl mx-auto px-8">
        {/*Continue-learning sets*/}
        {continueLearningStudySets && (
          <SectionWrapper title={"Continue learning"}>
            {continueLearningStudySets.map((card) => (
              <FeaturedStudySetCard
                key={card.id}
                studySet={card}
                description={card.description}
                learnedWords={card.learnedWords}
              />
            ))}
          </SectionWrapper>
        )}
        {/*Rest of the sets*/}
        {sections.map((section) => (
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
    </div>
  );
};
