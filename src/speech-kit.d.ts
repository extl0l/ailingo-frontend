declare module "react-speech-kit" {
	export const useSpeechSynthesis: () => {
		// Define the types for the functions and properties you use.
		// For example:
		speak: (options: SpeechSynthesisUtterance) => void;
		speaking: boolean;
		supported: boolean;
		voices: SpeechSynthesisVoice[];
		// Add other types as needed.
	};
	// Add other exported components and functions here.
}
