import { CreateNewStudySetCard } from "./components/NewStudySetCard.tsx";
import IconFurniture from "../navigation/assets/search.svg";
import { StudySetCard } from "../_shared/components/StudySetCard.tsx";

const mySets = [
  {
    id: "sts-00",
    title: "Gardening",
    icon: IconFurniture,
    color: "hsla(159, 39%, 55%, 1)",
  },
  {
    id: "sts-01",
    title: "At the airport",
    icon: IconFurniture,
    color: "hsla(58, 63%, 53%, 1)",
  },
  {
    id: "sts-02",
    title: "Biking in the suburbs",
    icon: IconFurniture,
    color: "hsla(24, 93%, 56%, 1)",
  },
  {
    id: "sts-03",
    title: "Home furnishings",
    icon: IconFurniture,
    color: "hsla(22,22%,27%,1)",
  },
];

export const MySetsPage = () => {
  return (
    <>
      <h1 className="font-medium text-theme-brown-light text-2xl col-span-full mt-6">
        Created by me
      </h1>
      <CreateNewStudySetCard />
      {mySets.map((studySet) => (
        <StudySetCard key={studySet.id} studySet={studySet} />
      ))}
    </>
  );
};
