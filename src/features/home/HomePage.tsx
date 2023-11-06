import { useQuery } from "@tanstack/react-query";
import useAuthQuery from "../../hooks/useAuthQuery.ts";
import {
	StudySetCard,
	StudySetCardProps,
} from "../_shared/components/StudySetCard.tsx";
import IconFurniture from "../navigation/assets/search.svg";
import { SectionWrapper } from "./components/SectionWrapper.tsx";
import { StudySet } from "../_shared/models/StudySet.ts";

const featured = [
	{
		id: "sts-03",
		title: "Home furnishings",
		icon: IconFurniture,
		color: "hsla(22,22%,27%,1)",
	},
	{
		id: "sts-01",
		title: "At the airport",
		icon: IconFurniture,
		color: "hsla(58, 63%, 53%, 1)",
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
		],
	},
];

export const HomePage = () => {
	const featuredCoursesByCategory = [];

	const { queryFn } = useAuthQuery({
		endpoint: "/study-sets",
	});

	const { data: dataStudySets } = useQuery({
		queryKey: ["study-sets"],
		queryFn,
	});

	const studySets = dataStudySets?.data as StudySet[];

	////////////////////////////////////////////////////

	const { queryFn: queryRecentStudy } = useAuthQuery({
		endpoint: "/me/study-sessions",
	});

	const { data: dataFeatured } = useQuery({
		queryKey: ["recent-study-sets"],
		queryFn: queryRecentStudy,
	});

	const featured = dataFeatured?.data as StudySetCardProps[];

	// Check if there are enough last sets to display suggested one

	if (featured && featured?.length !== 0) {
		studySets?.forEach((set) => {
			if (set.icon === featured[0]?.icon) {
				featuredCoursesByCategory.push(set);
			}
		});
	}

	return (
		<div className="relative bg-gradient-to-b from-theme-background-light-variant from-[10rem] to-transparent to-[10rem]">
			<main className="grid grid-cols-2 gap-2.5 max-w-3xl mx-auto px-8">
				{/*Featured sets*/}
				{featured?.length !== 0 && (
					<SectionWrapper title={"Continue learning"}>
						{featured?.map((set) => (
							<StudySetCard
								key={set.id}
								progress={{
									totalWords: 1234,
									learnedWords: 987,
								}}
								featured
								name={set.name}
								icon={set.icon}
								color={set.color}
								authorUsername={set.author.username}
							/>
						))}
					</SectionWrapper>
				)}
				{/*Rest of the sets*/}
				{sections.map((section) => (
					<SectionWrapper
						key={section.title}
						title={section.title}
						description={section.description}>
						{section.sets.map((set) => (
							<StudySetCard key={set.id} studySet={set} />
						))}
					</SectionWrapper>
				))}
			</main>
		</div>
	);
};
