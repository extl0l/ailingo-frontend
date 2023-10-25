import { cn } from "../../utils/tailwind";
import Button from "./Button";
import { SpeakerWaveIcon } from "@heroicons/react/24/outline";
import { useSpeechSynthesis } from "react-speech-kit";

type Props = {
	wordToRead: string;
	lang: string;
	className?: string;
	iconClassName?: string;
};

const SpeachButton = ({ className, iconClassName }: Props) => {
	const { speak, speaking, supported, voices } = useSpeechSynthesis();

	return (
		<Button
			className={cn("aspect-square border-none p-2", className)}
			rounded="full"
			variant="outline">
			<SpeakerWaveIcon
				className={cn("min-w-[20px] min-h-[20px]", iconClassName)}
			/>
		</Button>
	);
};

export default SpeachButton;
