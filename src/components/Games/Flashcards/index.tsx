import { useState } from "react";
import { type HTMLAttributes } from "react";
import { type FlashCard } from "../../../types/Flashcard";
import { cn } from "../../../utils/tailwind";
import Flashcard from "./Flashcard";
import FlashcardOptions from "./FlashcardOptions";
import { useLocalStorage } from "@uidotdev/usehooks";

type Props = {
	flashcards: FlashCard[];
};

const FlashcardsGame = ({
	flashcards,
	className,
	...props
}: Props & HTMLAttributes<HTMLDivElement>) => {
	const [currentFlashcard, setCurrentFlashcard] = useState(0);
	const [courseProgress, setCourseProgress] = useLocalStorage(
		"coursesProgress",
		[]
	);

	const nextFlashcard = () => {
		console.log(currentFlashcard);
		if (currentFlashcard < flashcards.length - 1) {
			console.log("NEXT");
			setCurrentFlashcard((prevState) => prevState + 1);
		}
	};

	const previousFlashcard = () => {
		console.log(currentFlashcard);
		if (currentFlashcard > 0) {
			console.log("PREV");

			setCurrentFlashcard((prevState) => prevState - 1);
		}
	};

	return (
		<div
			className={cn(
				"col-[center-start/center-end] h-full flex flex-col",
				className
			)}
			{...props}>
			<Flashcard
				flashcard={flashcards[currentFlashcard]}
				key={`flashcard-${currentFlashcard}`}
			/>

			<FlashcardOptions
				nextFlashcard={nextFlashcard}
				previousFlashcard={previousFlashcard}
			/>
		</div>
	);
};

export default FlashcardsGame;
