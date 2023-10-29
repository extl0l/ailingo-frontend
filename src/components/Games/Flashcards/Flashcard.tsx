import { useState } from "react";
import { type Flashcard as FlashcardType } from "../../../types/Flashcard";
import { cn } from "../../../utils/tailwind";
import Panel from "../../shared/Panel";
import useKeyPress from "../../../hooks/useKeyPress";
import SpeachButton from "../../shared/SpeachButton";

type Props = {
	flashcard: FlashcardType;
};

const Flashcard = ({ flashcard }: Props) => {
	const [isFront, setIsFront] = useState(true);

	const switchSides = () => {
		setIsFront((prevState) => !prevState);
	};

	useKeyPress(" ", () => switchSides());

	return (
		<div className="flashcard no-scrollbar">
			<Panel
				className={cn("flashcard-side", isFront ? "rotate-x-0" : "rotate-x-180")}>
				<SpeachButton
					className="absolute top-10 right-10"
					language="pl-PL"
					wordToRead={flashcard.word}
				/>
				<div
					className="w-full h-full  text-3xl flex justify-center items-center"
					onClick={switchSides}>
					{flashcard.word}
				</div>
			</Panel>
			<Panel
				className={cn("flashcard-side", isFront ? "-rotate-x-180" : "rotate-x-0")}>
				<SpeachButton
					className="absolute top-10 right-10"
					language="en-US"
					wordToRead={flashcard.translation}
				/>
				<div
					className="w-full h-full  text-3xl flex justify-center items-center"
					onClick={switchSides}>
					{flashcard.translation}
				</div>
			</Panel>
		</div>
	);
};

export default Flashcard;
