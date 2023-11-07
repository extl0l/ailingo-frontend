import { useEffect, useState, useMemo } from "react";

interface SpeechRecognitionResult {
  transcript: string;
  isFinal: boolean;
}

const useSpeechRecognition = (): {
  listening: boolean;
  isSupported: boolean;
  startListening: () => void;
  stopListening: () => void;
  lastResult: SpeechRecognitionResult | null;
} => {
  const isSupported = "SpeechRecognition" in window;

  const recognition = useMemo(() => {
    if (isSupported) {
      const recognitionInstance = new window.SpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.lang = "en-US";
      recognitionInstance.interimResults = true;
      recognitionInstance.maxAlternatives = 1;
      return recognitionInstance;
    }
    return null;
  }, [isSupported]);

  const [listening, setListening] = useState(false);
  const [lastResult, setLastResult] = useState<SpeechRecognitionResult | null>(
    null,
  );

  useEffect(() => {
    if (isSupported && recognition) {
      recognition.onstart = () => {
        setListening(true);
      };

      recognition.onend = () => {
        setListening(false);
      };

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const results = event.results;
        const result = results[0][0];
        const transcript = result.transcript;
        const isFinal = result.isFinal;

        setLastResult({ transcript, isFinal });
      };

      return () => {
        recognition.stop();
      };
    }
  }, [isSupported, recognition]);

  const startListening = () => {
    if (isSupported && recognition && !listening) {
      recognition.start();
    }
  };

  const stopListening = () => {
    if (isSupported && recognition) {
      recognition.stop();
    }
  };

  return { listening, isSupported, startListening, stopListening, lastResult };
};

export default useSpeechRecognition;
