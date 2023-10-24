import { useState } from "react";
import { type FlashCard } from "../../../types/Flashcard";
import { cn } from "../../../utils/tailwind";
import Panel from "../../shared/Panel";
import useKeyPress from "../../../hooks/useKeyPress";

type Props = {
	flashcard: FlashCard;
};

const Flashcard = ({ flashcard }: Props) => {
	const [isFront, setIsFront] = useState(true);

	const switchSides = () => {
		setIsFront((prevState) => !prevState);
	};

	useKeyPress(" ");

	return (
		<div className="flashcard" onClick={switchSides}>
			<Panel
				className={cn("flashcard-side", isFront ? "rotate-x-0" : "-rotate-x-180")}>
				{flashcard.word}
			</Panel>
			<Panel
				className={cn("flashcard-side", isFront ? "rotate-x-180" : "rotate-x-0")}>
				{flashcard.translation}
			</Panel>
		</div>
	);
};

export default Flashcard;
