import { type FlashCard } from "../../../types/Flashcard";
import Panel from "../../shared/Panel";

type Props = {
	flashcard: FlashCard;
};

const Flashcard = ({ flashcard }: Props) => {
	return (
		<div className="text-theme-font-light flex-1">
			<Panel className="h-full">{flashcard.word}</Panel>
			<Panel className="h-full">{flashcard.translation}</Panel>
		</div>
	);
};

export default Flashcard;
