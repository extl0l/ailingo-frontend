import { useEffect, useState } from "react";
import { type Flashcard as FlashcardType } from "../../../types/Flashcard";
import Flashcard from "./Flashcard";
import FlashcardOptions from "./FlashcardOptions";
import Button from "../../shared/Button";
import Panel from "../../shared/Panel";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useParams } from "react-router-dom";
import { CourseProgress } from "../../../types/Course";
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
	const [learnedFlashcardsPerRound, setLearnedFlashcardsPerRound] = useState([
		0,
	]);
	const [isGameRunning, setIsGameRunning] = useState(false);
	const [isMiddleRound, setIsMiddleRound] = useState(false);
	const [isEndScreen, setIsEndScreen] = useState(false);

	const { courseId } = useParams();

	const defaultStorageState = {
		currentFlashcard: 0,
		knownFlashcards: [],
		learnedFlashcardsPerRound: [0],
		round: 0,
	} as CourseProgress;

	const [courseProgress, setCourseProgress] = useLocalStorage<CourseProgress>(
		`course-progress-${courseId}`,
		defaultStorageState
	);

	const controllRoundEnd = () => {
		if (currentFlashcard === flashcardsToLearn.length - 1) {
			setIsMiddleRound(true);

			const toSave = {
				currentFlashcard: 0,
				knownFlashcards,
				learnedFlashcardsPerRound: [...learnedFlashcardsPerRound, 0],
				round: round + 1,
			} as CourseProgress;

			setCourseProgress(toSave);
		}
	};

	const syncFlahcardsToLearn = (flashcards: FlashcardType[]) => {
		const flashcardsToLearn = flashcards.filter(
			(flashcard) => !knownFlashcards.includes(flashcard.id)
		);
		setFlashcardsToLearn(flashcardsToLearn);
	};

	const moveToNextRound = () => {
		setRound((prev) => prev + 1);
	};

	const markFlashcardAsNotKnown = () => {
		controllRoundEnd();
		setCurrentFlashcard((flashcard) => flashcard + 1);
	};

	const goBack = () => {
		if (currentFlashcard !== 0) {
			setCurrentFlashcard((flashcard) => flashcard - 1);
			const flashcardToUndo = flashcardsToLearn[currentFlashcard - 1];
			setKnownFlashcards((flashcardIds) =>
				flashcardIds.filter((flashcardId) => flashcardId !== flashcardToUndo.id)
			);

			const isMarkedAsKnown = knownFlashcards.includes(flashcardToUndo.id);

			if (isMarkedAsKnown) {
				setLearnedFlashcardsPerRound((state) =>
					state.map((s, i) => (i === round ? s - 1 : s))
				);
			}
		}
	};

	const endGameHandler = () => {
		setIsEndScreen(true);
		setIsMiddleRound(false);
		setIsGameRunning(false);

		const toSave = {
			currentFlashcard: 0,
			knownFlashcards,
			learnedFlashcardsPerRound: [
				...learnedFlashcardsPerRound.slice(0, -1),
				learnedFlashcardsPerRound[learnedFlashcardsPerRound.length - 1] + 1,
			],
			round: round + 1,
		} as CourseProgress;

		setCourseProgress(toSave);
	};

	const markFlashcardAsKnown = (id: string) => {
		setKnownFlashcards((flashcardIds) => [...new Set([...flashcardIds, id])]);
		setLearnedFlashcardsPerRound((state) =>
			state.map((s, i) => (i === round ? s + 1 : s))
		);
		setCurrentFlashcard((flashcard) => flashcard + 1);

		const isGameFinished = flashcards.length - (knownFlashcards.length + 1) === 0;

		if (isGameFinished) {
			return endGameHandler();
		}

		controllRoundEnd();
	};

	const nextRound = () => {
		setCurrentFlashcard(0);
		moveToNextRound();
		setIsMiddleRound(false);
		setLearnedFlashcardsPerRound((state) => [...state, 0]);
	};

	const restartGame = () => {
		setKnownFlashcards([]);
		setRound(0);
		setCurrentFlashcard(0);
		setLearnedFlashcardsPerRound([0]);

		setCourseProgress(defaultStorageState);

		syncFlahcardsToLearn(flashcards);

		setIsEndScreen(false);
		setIsGameRunning(true);
	};

	useEffect(() => {
		syncFlahcardsToLearn(flashcards);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isMiddleRound, isGameRunning]);

	useEffect(() => {
		if (courseProgress.round !== 0) {
			setKnownFlashcards(courseProgress.knownFlashcards);
			setCurrentFlashcard(courseProgress.currentFlashcard);
			setRound(courseProgress.round);
			setLearnedFlashcardsPerRound(courseProgress.learnedFlashcardsPerRound);
		}

		setIsGameRunning(true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (isEndScreen) {
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

	if (isMiddleRound) {
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

	if (!isGameRunning) {
		return null;
	}

	if (flashcardsToLearn.length === 0) {
		return null;
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
