import { cn } from "../../utils/tailwind";
import Button from "./Button";
import { SpeakerWaveIcon } from "@heroicons/react/24/outline";
import { useSpeechSynthesis } from "react-speech-kit";

export type Language =
	| "en-US"
	| "pl-PL"
	| "de-DE"
	| "en-GB"
	| "fr-FR"
	| "hi-IN"
	| "id-ID"
	| "it-IT"
	| "ja-JP"
	| "ko-KR"
	| "nl-NL"
	| "pt-BR"
	| "ru-RU"
	| "zh-CN"
	| "zh-HK"
	| "zh-TW";

type Props = {
	wordToRead: string;
	language: Language;
	className?: string;
	iconClassName?: string;
};

const SpeachButton = ({
	className,
	iconClassName,
	language,
	wordToRead,
}: Props) => {
	const { speak, speaking, supported, voices } = useSpeechSynthesis();

	const selectVoiceByLanguage = (language: string) => {
		const selectedVoice = voices.find((voice) => voice.lang.startsWith(language));
		return selectedVoice;
	};

	const speakText = (text: string, language: string) => {
		if (supported && !speaking) {
			const selectedVoice = selectVoiceByLanguage(language);
			if (selectedVoice) {
				const utterance = new SpeechSynthesisUtterance(text);
				utterance.voice = selectedVoice;
				speak(utterance);
			} else {
				console.error(`Voice for language ${language} not found.`);
			}
		}
	};

	return (
		<Button
			className={cn("aspect-square border-none p-2", className)}
			rounded="full"
			variant="outline"
			onClick={() => speakText(wordToRead, language)}>
			<SpeakerWaveIcon
				className={cn("min-w-[18px] min-h-[18px]", iconClassName)}
			/>
		</Button>
	);
};

export default SpeachButton;
