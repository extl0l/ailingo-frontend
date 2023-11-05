type Props = {
	currentFlashcard: number;
	flashcards: number;
};

const FlashcardsMenu = ({ currentFlashcard, flashcards }: Props) => {
	return (
		<nav className="col-[full-start/full-end] px-7 ">
			{currentFlashcard + 1}/{flashcards}
		</nav>
	);
};

export default FlashcardsMenu;
