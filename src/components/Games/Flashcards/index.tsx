import { useState, useEffect } from "react";
import { type HTMLAttributes } from "react";
import { type Flashcard as FlashcardInfo } from "../../../types/Flashcard";
import { cn } from "../../../utils/tailwind";
import Flashcard from "./Flashcard";
import FlashcardOptions from "./FlashcardOptions";
// import useCourseProgress from "../../../hooks/useCourseProgress";
import { useParams } from "react-router-dom";

type Props = {
	flashcards: FlashcardInfo[];
};

const FlashcardsGame = ({
	flashcards,
	className,
	...props
}: Props & HTMLAttributes<HTMLDivElement>) => {
	const [currentFlashcard, setCurrentFlashcard] = useState(0);

	const { courseId } = useParams();

	console.log(courseId);

	// useCourseProgress(courseId!);

	useEffect(() => {}, []);

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
