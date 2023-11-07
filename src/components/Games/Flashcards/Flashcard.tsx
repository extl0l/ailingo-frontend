import { useState } from "react";
import { cn } from "../../../utils/tailwind";
import Panel from "../../shared/Panel";
import useKeyPress from "../../../hooks/useKeyPress";
import SpeachButton from "../../shared/SpeachButton";
import { type Definition } from "../../../features/_shared/models/StudySet";
import { Language } from "../../../hooks/useSpeechSynthesis";

type Props = {
	flashcard: Definition;
	lang: [string, string];
};

const Flashcard = ({ flashcard, lang }: Props) => {
	const [isFront, setIsFront] = useState(true);

	const switchSides = () => {
		setIsFront((prevState) => !prevState);
	};

	useKeyPress(" ", () => switchSides());

	return (
		<div className="flashcard no-scrollbar">
			<Panel
				className={cn("flashcard-side", isFront ? "rotate-x-0" : "rotate-x-180")}>
				<SpeachButton
					className="absolute top-10 right-10 text-theme-brown-light"
					language={(lang[0] as Language) || "pl-PL"}
					wordToRead={flashcard.phrase}
				/>
				<div
					className="w-full h-full  text-3xl flex justify-center items-center"
					onClick={switchSides}>
					{flashcard.phrase}
				</div>
			</Panel>
			<Panel
				className={cn("flashcard-side", isFront ? "-rotate-x-180" : "rotate-x-0")}>
				<SpeachButton
					className="absolute top-10 right-10"
					language={(lang[1] as Language) || "en-US"}
					wordToRead={flashcard.meaning}
				/>
				<div
					className="w-full h-full  text-3xl flex justify-center items-center"
					onClick={switchSides}>
					{flashcard.meaning}
				</div>
			</Panel>
		</div>
	);
};

export default Flashcard;
