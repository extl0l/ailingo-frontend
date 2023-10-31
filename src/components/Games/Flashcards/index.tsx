import { type HTMLAttributes } from "react";
import { type Flashcard as FlashcardInfo } from "../../../types/Flashcard";
import { cn } from "../../../utils/tailwind";

import FlowMode from "./FlowMode";

type Props = {
	flashcards: FlashcardInfo[];
};

const FlashcardsGame = ({
	flashcards,
	className,
	...props
}: Props & HTMLAttributes<HTMLDivElement>) => {
	return (
		<div
			className={cn(
				"col-[center-start/center-end] h-full flex flex-col",
				className
			)}
			{...props}>
			<FlowMode flashcards={flashcards} />
		</div>
	);
};

export default FlashcardsGame;
