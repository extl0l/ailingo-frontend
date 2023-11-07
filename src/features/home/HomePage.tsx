import { useQuery } from "@tanstack/react-query";
import useAuthQuery from "../../hooks/useAuthQuery.ts";
import { StudySetCard } from "../_shared/components/StudySetCard.tsx";
import { SectionWrapper } from "./components/SectionWrapper.tsx";
import { StudySet } from "../_shared/models/StudySet.ts";
import { RecentStudySet } from "../_shared/models/RecentStudySet.ts";
import { Link } from "react-router-dom";

const categories: string[] = [];

export const HomePage = () => {
	const featuredCoursesByCategory: StudySet[] = [];

	const { queryFn } = useAuthQuery({
		endpoint: "/study-sets",
	});

	const { data: dataStudySets } = useQuery({
		queryKey: ["study-sets"],
		queryFn,
	});

	const studySets = dataStudySets?.data as StudySet[];

	studySets?.forEach((set) => {
		if (!categories.includes(set?.icon)) {
			categories.push(set.icon);
		}
	});

	////////////////////////////////////////////////////

	const { queryFn: queryRecentStudy } = useAuthQuery({
		endpoint: "/me/study-sessions",
	});

	const { data: dataFeatured } = useQuery({
		queryKey: ["recent-study-sets"],
		queryFn: queryRecentStudy,
	});

	const featured = (dataFeatured?.data as RecentStudySet[])?.slice(0, 2);

	const featuredCourses =
		featured?.length === 2
			? [featured[0].studySet.icon, featured[1].studySet.icon]
			: featured?.length === 1
			? [featured[0].studySet.icon]
			: [];
	// Check if there are enough last sets to display suggested one

	// skullEmoji
	if (featured && featured?.length !== 0) {
		studySets?.forEach((set) => {
			if (set.icon === featured[0].studySet?.icon) {
				const hasCategory = featuredCoursesByCategory.find(
					(set) => set.icon === featured[0].studySet?.icon
				);

				if (!hasCategory) {
					if (featuredCoursesByCategory.length < 3) {
						featuredCoursesByCategory.push(set);
					}
				}
			}
			if (set.icon === featured[1].studySet?.icon) {
				const hasCategory = featuredCoursesByCategory.find(
					(set) => set.icon === featured[1].studySet?.icon
				);

				if (!hasCategory) {
					if (featuredCoursesByCategory.length < 3) {
						featuredCoursesByCategory.push(set);
					}
				}
			}
		});
	}

	const filteredCategory = categories.filter(
		(category) => category !== featuredCoursesByCategory[0]?.icon
	);

	const listCategories: [StudySet[], StudySet[]] = [[], []];

	if (featuredCourses[0]) {
		studySets.forEach((set) => {
			if (set.icon === featuredCourses[0]) {
				if (listCategories[0].length < 4) {
					listCategories[0].push(set);
				}
			}
		});
	}

	if (featuredCourses[1]) {
		studySets.forEach((set) => {
			if (set.icon === featuredCourses[1]) {
				if (listCategories[1].length < 4) {
					listCategories[1].push(set);
				}
			}
		});
	}

	const outherCourses = studySets
		?.map((studySet) => {
			if (filteredCategory[1].length > 0) {
				if (studySet.icon !== filteredCategory[1]) {
					if (studySet.icon !== filteredCategory[0]) {
						return studySet;
					}
				}
			} else {
				if (filteredCategory[0].length > 0) {
					if (studySet.icon !== filteredCategory[0]) {
						return studySet;
					}
				}
			}
		})
		.filter((course) => course);

	const best6Courses = outherCourses?.slice(0, 6);

	return (
		<div className="relative bg-gradient-to-b from-theme-background-light-variant from-[10rem] to-transparent to-[10rem]">
			<main className="grid grid-cols-2 gap-2.5 max-w-3xl mx-auto px-8 pb-12">
				{/*Featured sets*/}
				{featured?.length !== 0 && (
					<SectionWrapper title={"Continue learning"}>
						{featured?.map(({ studySet }) => (
							<Link to={`/sets/${studySet.id}`} key={studySet.id}>
								<StudySetCard
									key={studySet.id}
									progress={{
										totalWords: 1234,
										learnedWords: 987,
									}}
									featured
									name={studySet.name}
									icon={studySet.icon}
									color={studySet.color}
									authorUsername={studySet.author.username}
								/>
							</Link>
						))}
					</SectionWrapper>
				)}
				{/*Rest of the sets*/}
				{featuredCoursesByCategory &&
					featuredCoursesByCategory.length !== 0 &&
					featuredCoursesByCategory.map((set, index) => {
						return (
							<SectionWrapper
								key={set.id + "-section"}
								title={"Suggested"}
								description={`Recently studied "${set.name}"`}>
								{listCategories[index].map((set) => (
									<Link to={`/sets/${set.id}`} key={set.id}>
										<StudySetCard
											key={set.id}
											name={set.name}
											color={set.color}
											icon={set.icon}
											authorUsername={set.author?.username ?? "Unknown user"}
										/>
									</Link>
								))}
							</SectionWrapper>
						);
					})}

				{best6Courses?.length > 0 && (
					<SectionWrapper
						key={"other-wrapper"}
						title={"Courses"}
						description={`Other interesting courses`}>
						{best6Courses?.map((set) => (
							<Link to={`/sets/${set?.id}`} key={set!.id}>
								<StudySetCard
									name={set!.name}
									color={set!.color}
									icon={set!.icon}
									authorUsername={set!.author?.username ?? "Unknown user"}
								/>
							</Link>
						))}
					</SectionWrapper>
				)}
			</main>
		</div>
	);
};
