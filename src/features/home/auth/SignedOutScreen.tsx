import useAuthQuery from "../../../hooks/useAuthQuery";
import { useQuery } from "@tanstack/react-query";
import { StudySet } from "../../_shared/models/StudySet";
import { SectionWrapper } from "../components/SectionWrapper";
import { Link } from "react-router-dom";
import { StudySetCard } from "../../_shared/components/StudySetCard";

const SignedOutScreen = () => {
	const { queryFn } = useAuthQuery({
		endpoint: "/study-sets",
	});

	const { data: dataStudySets } = useQuery({
		queryKey: ["study-sets-data"],
		queryFn,
	});

	const studySets = dataStudySets?.data as StudySet[];

	return (
		<div className="relative bg-gradient-to-b from-theme-background-light-variant from-[10rem] to-transparent to-[10rem]">
			<main className="grid grid-cols-2 gap-2.5 max-w-3xl mx-auto px-8 pb-12">
				{studySets && studySets?.length !== 0 && (
					<SectionWrapper title="Our courses">
						{studySets?.slice(0, 12)?.map((studySet) => (
							<Link to={`/sets/${studySet.id}`} key={studySet.id}>
								<StudySetCard
									key={studySet.id}
									id={studySet.id.toString()}
									progress={{
										totalWords: 1234,
										learnedWords: 987,
									}}
									name={studySet.name}
									icon={studySet.icon}
									color={studySet.color}
									authorUsername={studySet.author.username}
								/>
							</Link>
						))}
					</SectionWrapper>
				)}
			</main>
		</div>
	);
};

export default SignedOutScreen;
