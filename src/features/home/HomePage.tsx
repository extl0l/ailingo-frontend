import { StudySetCard } from "../_shared/components/StudySetCard.tsx";
import IconFurniture from "../navigation/assets/search.svg";
import { SectionWrapper } from "./components/SectionWrapper.tsx";

const featured = [
  {
    id: "sts-03",
    title: "Home furnishings",
    icon: IconFurniture,
    color: "hsla(22,22%,27%,1)",
    authorUsername: "John Doe",
  },
  {
    id: "sts-01",
    title: "At the airport",
    icon: IconFurniture,
    color: "hsla(58, 63%, 53%, 1)",
    authorUsername: "Joe Rogan",
  },
];

const sections = [
  {
    title: "Suggested",
    description: 'Recently studied "Home furnishings"',
    sets: [
      {
        id: "sts-00",
        title: "Gardening",
        // description: "Taking care of plants. But in English.",
        icon: IconFurniture,
        color: "hsla(159, 39%, 55%, 1)",
        authorUsername: "AI Generated",
        // phraseLanguage: "en-US",
        // definitionLanguage: "pl-PL",
        // words: [],
        // authorId: "usr-01",
      },
      {
        id: "sts-01",
        title: "At the airport",
        icon: IconFurniture,
        color: "hsla(58, 63%, 53%, 1)",
        authorUsername: "Ryanair",
      },
      {
        id: "sts-02",
        title: "Biking in the suburbs",
        icon: IconFurniture,
        color: "hsla(24, 93%, 56%, 1)",
        authorUsername: "Louis Clutchstar",
      },
      {
        id: "sts-03",
        title: "Home furnishings",
        icon: IconFurniture,
        color: "hsla(22,22%,27%,1)",
        authorUsername: "Mike Terryfield",
      },
    ],
  },
];

export const HomePage = () => {
  return (
    <div className="relative bg-gradient-to-b from-theme-background-light-variant from-[10rem] to-transparent to-[10rem]">
      <main className="grid grid-cols-2 gap-2.5 max-w-3xl mx-auto px-8">
        {/*Featured sets*/}
        {featured && (
          <SectionWrapper title={"Continue learning"}>
            {featured.map((set) => (
              <StudySetCard
                key={set.id}
                // studySet={set}
                name={set.title}
                icon={set.icon}
                color={set.color}
                authorUsername={set.authorUsername}
                progress={{
                  totalWords: 1234,
                  learnedWords: 987,
                }}
                featured
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
            {section.sets.map((set) => (
              // <StudySetCard key={set.id} studySet={set} />
              <StudySetCard key={set.id} name={set.title} icon={set.icon} color={set.color} authorUsername={set.authorUsername} />
            ))}
          </SectionWrapper>
        ))}
      </main>
    </div>
  );
};
