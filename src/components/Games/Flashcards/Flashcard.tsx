import { type FlashCard } from "../../../types/Flashcard";
import Panel from "../../shared/Panel";

type Props = {
	flashcard: FlashCard;
};

const Flashcard = ({ flashcard }: Props) => {
	return (
		<div className="text-theme-font-light">
			<Panel>{flashcard.word}</Panel>
			<Panel>{flashcard.translation}</Panel>
		</div>
	);
};

export default Flashcard;
