import { type HTMLAttributes } from "react";
import { type Flashcard as FlashcardInfo } from "../../../types/Flashcard";
import { cn } from "../../../utils/tailwind";

import FlowMode from "./FlowMode";

type Props = {
	flashcards: FlashcardInfo[];
	currentFlashcard: number;
	setCurrentFlashcard: React.Dispatch<React.SetStateAction<number>>;
};

const FlashcardsGame = ({
	flashcards,
	className,
	currentFlashcard,
	setCurrentFlashcard,
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
				flashcards={flashcards}
				currentFlashcard={currentFlashcard}
				setCurrentFlashcard={setCurrentFlashcard}
			/>
		</div>
	);
};

export default FlashcardsGame;
