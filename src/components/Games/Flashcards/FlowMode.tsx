import { useEffect, useState } from "react";
import { type Flashcard as FlashcardType } from "../../../types/Flashcard";
import Flashcard from "./Flashcard";
import FlashcardOptions from "./FlashcardOptions";
import Button from "../../shared/Button";
import Panel from "../../shared/Panel";

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
	const [isGameRunning, setIsGameRunning] = useState(true);

	useEffect(() => {
		const flashcardsToLearn = flashcards.filter(
			(flashcard) => !knownFlashcards.includes(flashcard.id)
		);

		setFlashcardsToLearn(flashcardsToLearn);
		setCurrentFlashcard(0);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [round, flashcards, isGameRunning]);

	const markFlashcardAsKnown = (id: string) => {
		setKnownFlashcards((flashcardIds) => [...flashcardIds, id]);

		if (flashcardsToLearn.length <= knownFlashcards.length + 1) {
			setIsGameRunning(false);
		}

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
		setIsGameRunning(true);
		setKnownFlashcards([]);
		setRound(0);
		setCurrentFlashcard(0);
	};

	const nextRound = () => {
		setRound((prevRound) => prevRound + 1);
	};

	if (!isGameRunning) {
		return (
			<Panel className="flex-1 relative max-w-5xl mx-auto w-full mb-20 shadow-[-4px_17px_63px_-37px_rgba(66,68,90,1)]">
				<div className="w-full h-full flex justify-center items-center flex-col gap-8 text-theme-font-light">
					<span className="text-3xl">GUT GEMACHT!</span>
					<Button onClick={restartGame} variant="outline" className="text-lg py-2">
						Try again
					</Button>
				</div>
			</Panel>
		);
	}

	if (currentFlashcard === flashcardsToLearn.length) {
		return (
			<Panel className="flex-1 relative max-w-5xl mx-auto w-full mb-20 shadow-[-4px_17px_63px_-37px_rgba(66,68,90,1)]">
				<div className="w-full h-full flex justify-center items-center flex-col gap-8 text-theme-font-light">
					<span className="text-3xl">NEXT ROUND</span>
					<Button onClick={nextRound} variant="outline" className="text-lg py-2">
						Next round
					</Button>
				</div>
			</Panel>
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
