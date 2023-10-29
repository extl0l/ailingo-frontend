import { useEffect, useState } from "react";
import { type Flashcard as FlashcardType } from "../../../types/Flashcard";
import Flashcard from "./Flashcard";
import FlashcardOptions from "./FlashcardOptions";
import Button from "../../shared/Button";

type Props = {
	flashcards: FlashcardType[];
};

const FlowMode = ({ flashcards }: Props) => {
	const [knownFlashcards, setKnownFlashcards] = useState<string[]>([]);
	const [currentFlashcard, setCurrentFlashcard] = useState(0);
	const [round, setRound] = useState(0);
	const [flashcardsToLearn, setFlashcardsToLearn] = useState<FlashcardType[]>(
		[]
	);

	useEffect(() => {
		const flashcardsToLearn = flashcards.filter(
			(flashcard) => !knownFlashcards.includes(flashcard.id)
		);

		setFlashcardsToLearn(flashcardsToLearn);
		setCurrentFlashcard(0);
	}, [round, flashcards, knownFlashcards]);

	const markFlashcardAsKnown = (id: string) => {
		setKnownFlashcards((flashcardIds) => [...flashcardIds, id]);
		setCurrentFlashcard((flashcard) => flashcard + 1);
	};

	const goBack = () => {
		if (currentFlashcard !== 0) {
			setCurrentFlashcard((flashcard) => flashcard - 1);
		}
	};

	const markFlashcardAsNotKnown = () => {
		setCurrentFlashcard((flashcard) => flashcard + 1);
	};

	const restartGame = () => {
		setKnownFlashcards([]);
		setRound(0);
		setCurrentFlashcard(0);
	};

	const nextRound = () => {
		setRound((prevRound) => prevRound + 1);
	};

	console.log(
		round,
		currentFlashcard,
		flashcardsToLearn.length,
		flashcardsToLearn
	);

	if (flashcardsToLearn.length === 0) {
		return (
			<div className="text-white">
				GUT GEMACHT <Button onClick={restartGame}>Try again</Button>
			</div>
		);
	}

	if (currentFlashcard === flashcardsToLearn.length) {
		return (
			<div className="text-white">
				NEXT ROUND <Button onClick={nextRound}>Next round</Button>
			</div>
		);
	}

	return (
		<>
			<Flashcard
				flashcard={flashcardsToLearn[currentFlashcard]}
				key={`flashcard-${currentFlashcard}`}
			/>

			<FlashcardOptions
				markFlashcardAsKnown={() =>
					markFlashcardAsKnown(flashcardsToLearn[currentFlashcard].id)
				}
				goBack={goBack}
				markFlashcardAsNotKnown={markFlashcardAsNotKnown}
			/>
		</>
	);
};

export default FlowMode;
