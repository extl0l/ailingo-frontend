import { CreateNewStudySetCard } from "./components/NewStudySetCard.tsx";
import IconFurniture from "../navigation/assets/search.svg";
import { StudySetCard } from "../_shared/components/StudySetCard.tsx";
import { Glyph } from "../_shared/components/Glyph.tsx";
import IconSortDescending from "./assets/arrow_upward_alt_FILL0_wght400_GRAD0_opsz40.svg";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

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

interface StudySetCreatedPayload {
  createdId: number;
}

export const MySetsPage = () => {
  const navigate = useNavigate();

  const { getToken } = useAuth();

  const mutation = useMutation<StudySetCreatedPayload>({
    mutationFn: async () => {
      const response = await axios.post(
        `https://ailingo-backend.azurewebsites.net/study-sets`,
        {
          name: "string",
          description: "string",
          phraseLanguage: "en-US",
          definitionLanguage: "pl-PL",
        },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        },
      );
      return response.data;
    },
    onSuccess: (createdStudySet: StudySetCreatedPayload) => {
      navigate(`/sets/${createdStudySet.createdId}`);
    },
    onError: (error) => {
      console.error("Unable to create new set:", error);
    },
  });

  const handleNewStudySetClick = () => {
    mutation.mutate();
  };

  return (
    <>
      <div className="col-span-full mt-6 flex justify-between items-end">
        <h1 className="font-medium text-theme-brown-light text-2xl">
          Created by me
        </h1>
        <button className="flex items-center gap-0.5 font-medium">
          Recent
          <Glyph src={IconSortDescending} width="1.5rem" height="1.5rem" />
        </button>
      </div>
      <CreateNewStudySetCard
        onClick={handleNewStudySetClick}
        disabled={mutation.isPending}
      />
      {mySets.map((studySet) => (
        <StudySetCard key={studySet.id} studySet={studySet} />
      ))}
    </>
  );
};
