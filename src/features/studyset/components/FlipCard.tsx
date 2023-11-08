import "../styles/FlipCard.css";
import { ReactNode, useState } from "react";

export interface FlipCardProps {
  front: ReactNode;
  back: ReactNode;
}

export const FlipCard = (props: FlipCardProps) => {
  const [isBackVisible, setIsBackVisible] = useState(false);

  const handleCardClick = () => {
    setIsBackVisible((value) => !value);
  };

  return (
    <div className="h-full w-full" onClick={handleCardClick}>
      <div
        className="w-full h-full relative perspective-250 transition-transform duration-500 transform-style-3d"
        style={{ rotate: `x ${isBackVisible ? 0.5 : 0}turn` }}
      >
        <div className="flashcard-face rotate-x-180">{props.back}</div>
        <div className="flashcard-face">{props.front}</div>
      </div>
    </div>
  );
};
