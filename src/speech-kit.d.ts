declare module "react-speech-kit" {
	export const useSpeechSynthesis: () => {
		speak: (options: SpeechSynthesisUtterance) => void;
		speaking: boolean;
		supported: boolean;
		voices: SpeechSynthesisVoice[];
	};
}
