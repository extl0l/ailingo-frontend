import { Glyph } from "../_shared/components/Glyph.tsx";
import IconSortDescending from "./assets/arrow_upward_alt_FILL0_wght400_GRAD0_opsz40.svg";
import { StudySetCard } from "../_shared/components/StudySetCard.tsx";
import IconFurniture from "../navigation/assets/search.svg";
import useAuthQuery from "../../hooks/useAuthQuery.ts";
import { Studyset } from "../../types/Api.ts";
import { useQuery } from "react-query";

const starredSets = [
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

export const StarredSetsPage = () => {
	const { queryFn } = useAuthQuery<Studyset[]>({
		endpoint: "/me/study-sets/starred",
	});

	const { isLoading, data } = useQuery({
		queryKey: ["myStudySetsStarred"],
		queryFn,
	});

	const starredSets = data?.data;

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
			{isLoading && <div>Loading...</div>}
			{!starredSets || (starredSets.length === 0 && <div>No study sets</div>)}

			{starredSets?.map((studySet) => (
				<StudySetCard key={studySet.id} studySet={studySet} />
			))}
		</>
	);
};
