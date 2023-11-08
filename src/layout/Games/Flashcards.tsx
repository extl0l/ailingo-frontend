import { useEffect, useState } from "react";
import FlashcardsGame from "../../components/Games/Flashcards";
import FlashcardsMenu from "../../components/Games/Flashcards/FlashcardsMenu";
import useAuthQuery from "../../hooks/useAuthQuery";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Panel from "../../components/shared/Panel";
import { Definition, StudySet } from "../../features/_shared/models/StudySet";
import CloseFlashcardsButton from "../../components/Games/Flashcards/CloseFlashcardsButton";

const Flashcards = () => {
	const { setId } = useParams();

	const { queryFn } = useAuthQuery({
		endpoint: `/study-sets/${setId}/definitions`,
	});

	const { isLoading, data } = useQuery({
		queryKey: [`flashcards-${setId}`],
		queryFn,
	});

	const { queryFn: setQueryFn } = useAuthQuery({
		endpoint: `/study-sets/${setId}`,
	});

	const { data: d } = useQuery({
		queryKey: [`flashcards-${setId}-data`],
		queryFn: setQueryFn,
	});

	const setData = d?.data as StudySet;

	const lang = [setData?.phraseLanguage, setData?.definitionLanguage];

	const flashcardElements = data?.data as Definition[];

	const { queryFn: setAsLatestQuery } = useAuthQuery({
		endpoint: `/me/study-sessions/${setId}`,
		method: "PATCH",
	});

	useEffect(() => {
		setAsLatestQuery();
	}, []);

	const [currentFlashcard, setCurrentFlashcard] = useState(0);
	const [learnedFlashcardsPerRound, setLearnedFlashcardsPerRound] = useState<
		number[]
	>([0]);
	const [round, setRound] = useState(0);

	if (isLoading) {
		return (
			<main className="grid gridLayout grid-rows-[80px_1fr] h-full bg-theme-background-light-variant">
				<CloseFlashcardsButton />
				<Panel className="flex-1 relative max-w-5xl mx-auto w-full mb-20 shadow-[-4px_17px_63px_-37px_hsla(23, 22%, 27%, 1)] col-[full-start/full-end] row-[2/3]">
					<div className="w-full h-full flex justify-center items-center flex-col gap-8 text-theme-brown-light">
						<span className="text-3xl">Loading...</span>
					</div>
				</Panel>
			</main>
		);
	}

	if (!flashcardElements || flashcardElements.length === 0) {
		return (
			<main className="grid gridLayout grid-rows-[80px_1fr] h-full bg-theme-background-light-variant">
				<CloseFlashcardsButton />
				<Panel className="flex-1 relative max-w-5xl mx-auto w-full mb-20 shadow-[-4px_17px_63px_-37px_hsla(23, 22%, 27%, 1)] col-[full-start/full-end] row-[2/3]">
					<div className="w-full h-full flex justify-center items-center flex-col gap-8 text-theme-brown-light">
						<span className="text-3xl">No flashcards</span>
					</div>
				</Panel>
			</main>
		);
	}

	return (
		<main className="grid gridLayout grid-rows-[80px_1fr] h-full bg-theme-background-light-variant">
			<FlashcardsMenu
				round={round}
				courseName={setData.name}
				learnedFlashcardsPerRound={learnedFlashcardsPerRound}
				currentFlashcard={currentFlashcard}
				flashcards={flashcardElements.length}
			/>
			<FlashcardsGame
				round={round}
				setRound={setRound}
				setLearnedFlashcardsPerRound={setLearnedFlashcardsPerRound}
				learnedFlashcardsPerRound={learnedFlashcardsPerRound}
				flashcards={flashcardElements}
				currentFlashcard={currentFlashcard}
				setCurrentFlashcard={setCurrentFlashcard}
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				lang={lang as any}
			/>
		</main>
	);
};

export default Flashcards;
