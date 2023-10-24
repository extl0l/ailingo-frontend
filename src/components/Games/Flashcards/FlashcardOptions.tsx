// import Button from "../../shared/Button";

type Props = {
	nextFlashcard: () => void;
	previousFlashcard: () => void;
};

const FlashcardOptions = ({ nextFlashcard, previousFlashcard }: Props) => {
	return (
		<div className="text-theme-font-light flex items-center w-full justify-center gap-8 my-5">
			<button onClick={previousFlashcard}>pre</button>
			<button onClick={nextFlashcard}>next</button>
		</div>
	);
};

export default FlashcardOptions;
