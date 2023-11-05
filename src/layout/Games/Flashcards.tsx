import { useState } from "react";
import FlashcardsGame from "../../components/Games/Flashcards";
import FlashcardsMenu from "../../components/Games/Flashcards/FlashcardsMenu";
import { Flashcard } from "../../types/Flashcard";

const DUMMY_FLASHCARDS = [
	{ examples: ["lubie piwo"], translation: "Beer", word: "Piwo", id: "1qf" },
	{
		id: "253",
		examples: ["woda jest w kranie", "woda w oceanie"],
		translation: "Water",
		word: "Woda",
	},
	{
		id: "123",
		examples: ["Mydło  myje"],
		translation: "Soap",
		word: "Mydło",
	},
] as Flashcard[];

const Flashcards = () => {
	const [currentFlashcard, setCurrentFlashcard] = useState(0);
	const [learnedFlashcardsPerRound, setLearnedFlashcardsPerRound] = useState<
		number[]
	>([0]);
	const [round, setRound] = useState(0);

	return (
		<main className="grid gridLayout grid-rows-[80px_1fr] h-full bg-theme-background-light-variant">
			<FlashcardsMenu
				round={round}
				courseName={"El courso numero uno"}
				learnedFlashcardsPerRound={learnedFlashcardsPerRound}
				currentFlashcard={currentFlashcard}
				flashcards={DUMMY_FLASHCARDS.length}
			/>
			<FlashcardsGame
				round={round}
				setRound={setRound}
				setLearnedFlashcardsPerRound={setLearnedFlashcardsPerRound}
				learnedFlashcardsPerRound={learnedFlashcardsPerRound}
				flashcards={DUMMY_FLASHCARDS}
				currentFlashcard={currentFlashcard}
				setCurrentFlashcard={setCurrentFlashcard}
			/>
		</main>
	);
};

export default Flashcards;
