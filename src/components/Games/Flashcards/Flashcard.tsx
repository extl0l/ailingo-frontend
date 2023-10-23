import { type FlashCard } from "../../../types/Flashcard";

type Props = {
	flashcard: FlashCard;
};

const Flashcard = ({ flashcard }: Props) => {
	return <div>{flashcard.word}</div>;
};

export default Flashcard;
