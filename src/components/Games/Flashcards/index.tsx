import { HTMLAttributes } from "react";
import { FlashCard } from "../../../types/Flashcard";
import { cn } from "../../../utils/tailwind";
import Flashcard from "./Flashcard";

type Props = {
	flashcards: FlashCard[];
};

const FlashcardsGame = ({
	flashcards,
	className,
	...props
}: Props & HTMLAttributes<HTMLDivElement>) => {
	return (
		<div className={cn("", className)} {...props}>
			{flashcards.map((flashcard, index) => (
				<Flashcard key={`flashcard-${index}`} flashcard={flashcard} />
			))}
		</div>
	);
};

export default FlashcardsGame;
