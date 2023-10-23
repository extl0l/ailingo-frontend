import FlashcardsGame from "../../components/Games/Flashcards";
import FlashcardsMenu from "../../components/Games/Flashcards/FlashcardsMenu";

const Flashcards = () => {
	return (
		<main className="rootLayout">
			<FlashcardsMenu />
			<FlashcardsGame />
		</main>
	);
};

export default Flashcards;
