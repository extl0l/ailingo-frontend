import { Glyph } from "../_shared/components/Glyph.tsx";
import IconSortDescending from "./assets/arrow_upward_alt_FILL0_wght400_GRAD0_opsz40.svg";
import { useQuery } from "@tanstack/react-query";
import { backendClient } from "../_shared/api/backendClient.ts";
import { useAuth } from "@clerk/clerk-react";
import { Language } from "../_shared/models/StudySet.ts";
import { StudySetAuthor } from "../_shared/models/StudySetAuthor.ts";
import { StudySetCard } from "../_shared/components/StudySetCard.tsx";
import IconBrokenImage from "./assets/broken_image_FILL0_wght400_GRAD0_opsz40.svg";
import { Link } from "react-router-dom";

type StudySetsStarredByMeResponse = {
  id: number;
  author: StudySetAuthor;
  name: string;
  description: string;
  phraseLanguage: Language;
  definitionLanguage: Language;
}[];

export const StarredSetsPage = () => {
  const { getToken } = useAuth();

  const starredSetsQuery = useQuery<StudySetsStarredByMeResponse>({
    queryKey: ["my-starred-sets"],
    queryFn: async () => {
      const response = await backendClient.get("/me/study-sets/starred", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      return response.data;
    },
  });

  return (
    <>
      <div className="col-span-full mt-6 flex justify-between items-end">
        <h1 className="font-medium text-theme-brown-light text-2xl">
          Starred study sets
        </h1>
        <button className="flex items-center gap-0.5 font-medium">
          Recent
          <Glyph src={IconSortDescending} width="1.5rem" height="1.5rem" />
        </button>
      </div>
      {starredSetsQuery.data?.map((studySet) => (
        <Link key={studySet.id} to={`/sets/${studySet.id}`}>
          <StudySetCard
            name={studySet.name}
            color="hsla(58, 63%, 53%, 1)"
            icon={IconBrokenImage}
            authorUsername={studySet.author?.username}
          />
        </Link>
      ))}
    </>
  );
};
