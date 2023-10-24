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
  return (
    <div
      className={cn(
        "col-[center-start/center-end] h-full flex flex-col",
        className,
      )}
      {...props}
    >
      {flashcards.map((flashcard, index) => (
        <Flashcard key={`flashcard-${index}`} flashcard={flashcard} />
      ))}
      <FlashcardOptions />
    </div>
  );
};

export default FlashcardsGame;
