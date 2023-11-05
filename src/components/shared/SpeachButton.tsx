import { cn } from "../../utils/tailwind";
import Button from "./Button";
import { SpeakerWaveIcon } from "@heroicons/react/24/outline";
import Tooltip from "./Tooltip";
import { Language, useSpeechSynthesis } from "../../hooks/useSpeechSynthesis";

type Props = {
	wordToRead: string;
	language: Language;
	className?: string;
	iconClassName?: string;
};

const SpeechButton = ({
	className,
	iconClassName,
	language,
	wordToRead,
}: Props) => {
	const { speak, speaking, supported, voices } = useSpeechSynthesis();

	const selectVoiceByLanguage = (language: string) => {
		return voices.find((voice) => voice.lang.startsWith(language));
	};

	const speakText = (text: string, language: string) => {
		if (!supported || speaking) {
			return;
		}

		const selectedVoice = selectVoiceByLanguage(language);

		if (!selectVoiceByLanguage) {
			console.error(`Voice for language ${language} not found.`);
			return;
		}

		speak(text, {
			voice: selectedVoice,
		});
	};

	return (
		<Tooltip
			content={
				supported ? "Read text." : "Your browser doesn't support this feature"
			}>
			<Button
				className={cn("aspect-square border-none p-2", className)}
				rounded="full"
				variant="outline"
				onClick={() => speakText(wordToRead, language)}>
				<SpeakerWaveIcon
					className={cn(
						"min-w-[18px] min-h-[18px] text-theme-brown-light",
						iconClassName
					)}
				/>
			</Button>
		</Tooltip>
	);
};

export default SpeechButton;
