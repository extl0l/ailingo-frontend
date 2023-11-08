import { CreateNewStudySetCard } from "./components/NewStudySetCard.tsx";
import { StudySetCard } from "../_shared/components/StudySetCard.tsx";
import { Glyph } from "../_shared/components/Glyph.tsx";
import IconSortDescending from "./assets/arrow_upward_alt_FILL0_wght400_GRAD0_opsz40.svg";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, useUser } from "@clerk/clerk-react";
import { Language } from "../_shared/models/StudySet.ts";
import { backendClient } from "../_shared/api/backendClient.ts";

interface StudySetCreateRequest {
  name: string;
  description: string;
  phraseLanguage: Language;
  definitionLanguage: Language;
  color: string;
  icon: string;
}

interface StudySetCreatedResponse {
  createdId: number;
}

type StudySetsCreatedByMeResponse = {
  id: number;
  name: string;
  description: string;
  phraseLanguage: Language;
  definitionLanguage: Language;
  color: string;
  icon: string;
}[];

export const MySetsPage = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { user } = useUser();
  const { getToken } = useAuth();

  const createSetMutation = useMutation<StudySetCreatedResponse>({
    mutationFn: async () => {
      const emptyStudySet: StudySetCreateRequest = {
        name: "Unnamed set",
        description: "A brief overview of the set content",
        phraseLanguage: "en-US",
        definitionLanguage: "pl-PL",
        color: "#d3ce3c",
        icon: "clock",
      };
      const response = await backendClient.post("/study-sets", emptyStudySet, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      return response.data;
    },
    onSuccess: (createdStudySet: StudySetCreatedResponse) => {
      // noinspection JSIgnoredPromiseFromCall
      queryClient.invalidateQueries({ queryKey: ["my-sets"] });
      navigate(`/sets/${createdStudySet.createdId}`);
    },
    onError: (error) => {
      console.error("Unable to create new set:", error);
    },
  });

  const handleNewStudySetClick = () => {
    createSetMutation.mutate();
  };

  const mySetsQuery = useQuery<StudySetsCreatedByMeResponse>({
    queryKey: ["library", "my-sets"],
    queryFn: async () => {
      const response = await backendClient.get("/me/study-sets/created", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      return response.data;
    },
  });

  return (
    <>
      <div className="col-span-full mt-6 flex justify-between items-end text-theme-brown-light">
        <h1 className="font-medium text-theme-brown-light text-2xl">
          Created by me
        </h1>
        {/*TODO: Add support for sorting*/}
        <button className="flex items-center gap-0.5 font-medium">
          Recent
          <Glyph src={IconSortDescending} width="1.5rem" height="1.5rem" />
        </button>
      </div>
      <CreateNewStudySetCard
        onClick={handleNewStudySetClick}
        disabled={createSetMutation.isPending}
      />
      {mySetsQuery.data?.map((studySet) => (
        <Link key={studySet.id} to={`/sets/${studySet.id}`}>
          <StudySetCard
            id={studySet.id.toString()}
            name={studySet.name}
            color={studySet.color}
            icon={studySet.icon}
            authorUsername={user?.username ?? "Unknown user"}
          />
        </Link>
      ))}
    </>
  );
};
