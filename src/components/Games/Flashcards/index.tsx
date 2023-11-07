import { type HTMLAttributes } from "react";
import { cn } from "../../../utils/tailwind";

import FlowMode from "./FlowMode";
import { Definition } from "../../../features/_shared/models/StudySet";

type Props = {
	flashcards: Definition[];
	currentFlashcard: number;
	setCurrentFlashcard: React.Dispatch<React.SetStateAction<number>>;
	learnedFlashcardsPerRound: number[];
	setLearnedFlashcardsPerRound: React.Dispatch<React.SetStateAction<number[]>>;
	round: number;
	setRound: React.Dispatch<React.SetStateAction<number>>;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	lang: any;
};

const FlashcardsGame = ({
	flashcards,
	className,
	currentFlashcard,
	learnedFlashcardsPerRound,
	setLearnedFlashcardsPerRound,
	setCurrentFlashcard,
	round,
	lang,
	setRound,
	...props
}: Props & HTMLAttributes<HTMLDivElement>) => {
	return (
		<div
			className={cn(
				"col-[center-start/center-end] h-full flex flex-col ",
				className
			)}
			{...props}>
			<FlowMode
				round={round}
				setRound={setRound}
				learnedFlashcardsPerRound={learnedFlashcardsPerRound}
				setLearnedFlashcardsPerRound={setLearnedFlashcardsPerRound}
				flashcards={flashcards}
				currentFlashcard={currentFlashcard}
				setCurrentFlashcard={setCurrentFlashcard}
				lang={lang}
			/>
		</div>
	);
};

export default FlashcardsGame;
