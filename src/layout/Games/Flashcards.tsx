import FlashcardsGame from "../../components/Games/Flashcards";
import FlashcardsMenu from "../../components/Games/Flashcards/FlashcardsMenu";
import { FlashCard } from "../../types/Flashcard";

const DUMMY_FLASHCARDS = [
	{ examples: ["lubie piwo"], translation: "Beer", word: "Piwo" },
	{
		examples: ["woda jest w kranie", "woda w oceanie"],
		translation: "Water",
		word: "Woda",
	},
] as FlashCard[];

const Flashcards = () => {
	return (
		<main className="grid gridLayout grid-rows-[80px_1fr] h-full">
			<FlashcardsMenu />
			<FlashcardsGame flashcards={DUMMY_FLASHCARDS} />
		</main>
	);
};

export default Flashcards;
