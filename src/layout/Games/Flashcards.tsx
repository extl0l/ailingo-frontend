import FlashcardsGame from "../../components/Games/Flashcards";
import FlashcardsMenu from "../../components/Games/Flashcards/FlashcardsMenu";
import { Flashcard } from "../../types/Flashcard";

const DUMMY_FLASHCARDS = [
	{ examples: ["lubie piwo"], translation: "Beer", word: "Piwo", id: "1qf" },
	{
		id: "253",
		examples: ["woda jest w kranie", "woda w oceanie"],
		translation: "Water",
		word: "Woda",
	},
	{
		id: "123",
		examples: ["Mydło  myje"],
		translation: "Soap",
		word: "Mydło",
	},
] as Flashcard[];

const Flashcards = () => {
	//TODO:  clear unused local storage

	return (
		<main className="grid gridLayout grid-rows-[80px_1fr] h-full">
			<FlashcardsMenu />
			<FlashcardsGame flashcards={DUMMY_FLASHCARDS} />
		</main>
	);
};

export default Flashcards;
