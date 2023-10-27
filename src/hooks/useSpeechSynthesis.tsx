import { useEffect, useState } from "react";

export type UtteranceSettings = Pick<
	SpeechSynthesisUtterance,
	"voice" | "rate" | "pitch" | "volume"
>;

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

const defaultUtteranceSettings: UtteranceSettings = {
	voice: null,
	rate: 1,
	pitch: 1,
	volume: 1,
};

/** useSpeechSynthesis wraps the Web Speech API in a handy hook. */
export const useSpeechSynthesis = () => {
	const [speaking, setSpeaking] = useState(false);
	const [supported, setSupported] = useState(false);
	const [voices, setVoices] = useState<SpeechSynthesisVoice[]>(
		speechSynthesis.getVoices()
	);

	useEffect(() => {
		if (!window.speechSynthesis) {
			console.error(
				"window.speechSynthesis is not defined. The feature might be unsupported."
			);
			return;
		}

		setSupported(true);

		const handleVoicesChanged = () => setVoices(speechSynthesis.getVoices());
		speechSynthesis.addEventListener("voiceschanged", handleVoicesChanged);

		return () => {
			speechSynthesis.removeEventListener("voiceschanged", handleVoicesChanged);
		};
	}, []);

	/** speak reads the given text according to the given utterance configuration. */
	const speak = (text: string, options?: Partial<UtteranceSettings>) => {
		if (!supported) {
			return;
		}

		const { voice, rate, pitch, volume } = {
			...defaultUtteranceSettings,
			...options,
		};

		setSpeaking(true);

		// Firefox won't repeat an utterance that has been
		// spoken, so we need to create a new instance each time
		const utterance = new window.SpeechSynthesisUtterance(text);
		utterance.voice = voice;
		utterance.rate = rate;
		utterance.pitch = pitch;
		utterance.volume = volume;
		utterance.addEventListener("end", () => setSpeaking(false));
		speechSynthesis.speak(utterance);
	};

	return {
		supported,
		speak,
		speaking,
		voices,
	};
};
