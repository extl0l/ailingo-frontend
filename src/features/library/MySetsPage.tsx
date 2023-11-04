import { CreateNewStudySetCard } from "./components/NewStudySetCard.tsx";
import IconFurniture from "../navigation/assets/search.svg";
import { StudySetCard } from "../_shared/components/StudySetCard.tsx";
import { Glyph } from "../_shared/components/Glyph.tsx";
import IconSortDescending from "./assets/arrow_upward_alt_FILL0_wght400_GRAD0_opsz40.svg";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { Language, StudySet } from "../_shared/models/StudySet.ts";
import { backendClient } from "../_shared/api/backendClient.ts";

const DUMMY_MY_SETS: StudySet[] = [
  {
    id: "sts-00",
    name: "Gardening",
    icon: IconFurniture,
    color: "hsla(159, 39%, 55%, 1)",
    author: {
      id: "au-123",
      imageUrl: "",
      username: "test-test",
    },
    phraseLanguage: "en-US",
    definitionLanguage: "pl-PL",
  },
];

interface StudySetCreateRequest {
  name: string;
  description: string;
  phraseLanguage: Language;
  definitionLanguage: Language;
}

interface StudySetCreatedResponse {
  createdId: number;
}

export const MySetsPage = () => {
  const navigate = useNavigate();
  const { getToken } = useAuth();

  const mutation = useMutation<StudySetCreatedResponse>({
    mutationFn: async () => {
      const emptyStudySet: StudySetCreateRequest = {
        name: "Unnamed set",
        description: "A brief overview of the set content",
        phraseLanguage: "en-US",
        definitionLanguage: "pl-PL",
      };
      const response = await backendClient.post("/study-sets", emptyStudySet, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      return response.data;
    },
    onSuccess: (createdStudySet: StudySetCreatedResponse) => {
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
      {/*TODO: Get all my sets*/}
      {DUMMY_MY_SETS.map((studySet) => (
        <StudySetCard key={studySet.id} studySet={studySet} />
      ))}
    </>
  );
};
