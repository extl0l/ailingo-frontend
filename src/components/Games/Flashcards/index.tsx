import { useState } from "react";
import { type HTMLAttributes } from "react";
import { type FlashCard } from "../../../types/Flashcard";
import { cn } from "../../../utils/tailwind";
import Flashcard from "./Flashcard";
import FlashcardOptions from "./FlashcardOptions";

type Props = {
  flashcards: FlashCard[];
};

const FlashcardsGame = ({
  flashcards,
  className,
  ...props
}: Props & HTMLAttributes<HTMLDivElement>) => {
  const [currentFlashcard, setCurrentFlashcard] = useState(0);

  const nextFlashcard = () => {
    if (currentFlashcard < flashcards.length - 1) {
      setCurrentFlashcard((prevState) => prevState++);
    }
  };

  const previousFlashcard = () => {
    if (currentFlashcard > 0) {
      setCurrentFlashcard((prevState) => prevState--);
    }
  };

  return (
    <div
      className={cn(
        "col-[center-start/center-end] h-full flex flex-col",
        className,
      )}
      {...props}
    >
      <Flashcard flashcard={flashcards[currentFlashcard]} />

      <FlashcardOptions
        nextFlashcard={nextFlashcard}
        previousFlashcard={previousFlashcard}
      />
    </div>
  );
};

export default FlashcardsGame;
