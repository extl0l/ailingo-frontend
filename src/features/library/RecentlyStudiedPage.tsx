import { Glyph } from "../_shared/components/Glyph.tsx";
import IconSortDescending from "./assets/arrow_upward_alt_FILL0_wght400_GRAD0_opsz40.svg";
import { StudySetCard } from "../_shared/components/StudySetCard.tsx";
import useAuthQuery from "../../hooks/useAuthQuery.ts";
import { useQuery } from "@tanstack/react-query";
import { RecentStudySet } from "../_shared/models/RecentStudySet.ts";
import { Link, useParams } from "react-router-dom";

export const RecentlyStudiedPage = () => {

  const { setId } = useParams<{ setId: string }>();

  const { queryFn: queryRecentStudy } = useAuthQuery({
    endpoint: "/me/study-sessions",
  });

  const { data } = useQuery({
    queryKey: ["recent-study-sets"],
    queryFn: queryRecentStudy,
  })

  const ads = data?.data as RecentStudySet[];
  console.log(ads);

  return (
    <>
      <div className="col-span-full mt-6 flex justify-between items-end">
        <h1 className="font-medium text-theme-brown-light text-2xl">
          Recently studied
        </h1>
        <button className="flex items-center gap-0.5 font-medium">
          Study time
          <Glyph src={IconSortDescending} width="1.5rem" height="1.5rem" />
        </button>
      </div>
      {ads?.map(({ studySet }) => {
        return (
          <div>
            <p>{ }</p>
            <Link to={`sets/${setId}`} key={studySet.id}>
              <StudySetCard
                name={studySet.name}
                icon={studySet.icon}
                color={studySet.color}

                authorUsername={studySet.author.username}
              />
            </Link>
          </div>
        );
      })}

    </>
  );
};