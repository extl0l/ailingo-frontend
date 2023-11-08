import { XMarkIcon } from "@heroicons/react/24/outline";
import Button from "../../shared/Button";
import { useNavigate, useParams } from "react-router-dom";
import Tooltip from "../../shared/Tooltip";
import { useMemo } from "react";
import CloseFlashcardsButton from "./CloseFlashcardsButton";

type Props = {
	currentFlashcard: number;
	flashcards: number;
	learnedFlashcardsPerRound: number[];
	round: number;
	courseName: string;
};

const FlashcardsMenu = ({
	currentFlashcard,
	flashcards,
	learnedFlashcardsPerRound,
	round,
	courseName,
}: Props) => {
	const { setId } = useParams();
	const navigate = useNavigate();

	const redirectToCourse = () => navigate(`/sets/${setId}`);

	const flashcardsToLearn = useMemo(() => {
		const learnedFlashcards = learnedFlashcardsPerRound.reduce(
			(accumulator, currentValue) => accumulator + currentValue,
			0
		);

		return flashcards - learnedFlashcards;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [round]);

	return (
		<div className="col-[center-start/center-end] flex max-w-5xl mx-auto w-full items-center justify-between">
			<div className="w-8"></div>
			<div className="text-center">
				<div>
					{currentFlashcard + 1 <= flashcardsToLearn
						? currentFlashcard + 1
						: currentFlashcard}
					/{flashcardsToLearn}
				</div>
				<div onClick={redirectToCourse}>{courseName}</div>
			</div>
			<Tooltip content="Close">
				<CloseFlashcardsButton />
			</Tooltip>
		</div>
	);
};

export default FlashcardsMenu;
