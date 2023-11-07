import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { backendClient } from "../../_shared/api/backendClient.ts";
import { useAuth } from "@clerk/clerk-react";
import { Definition } from "../../_shared/models/StudySet.ts";

export interface DefinitionSentenceListProps {
  definition: Definition;
  onUpdate?: (newSentences: string[]) => void;
  editable?: boolean;
}

export const DefinitionSentenceList = (props: DefinitionSentenceListProps) => {
  const { sentences } = props.definition;

  const handleSentenceUpdate = (index: number, newSentence: string) => {
    const updatedSentences = [...sentences];
    updatedSentences.splice(index, 1, newSentence);
    props.onUpdate?.(updatedSentences);
  };

  const handleSentenceDelete = (index: number) => {
    const updatedSentences = [...sentences];
    updatedSentences.splice(index, 1);
    props.onUpdate?.(updatedSentences);
  };

  const handleSentenceCreate = (newSentence: string) => {
    const updatedSentences = [...sentences, newSentence];
    props.onUpdate?.(updatedSentences);
  };

  if (!props.editable && sentences.length === 0) {
    return (
      <p className="py-2.5 pr-4 text-theme-brown-light opacity-50 cursor-not-allowed">
        No sentences entered
      </p>
    );
  }

  return (
    <ul>
      {sentences.map((sentence, index) => (
        <li className="border-b last:border-b-0" key={index}>
          <DefinitionSentenceListItem
            sentence={sentence}
            onUpdate={(newSentence) => handleSentenceUpdate(index, newSentence)}
            onDelete={() => handleSentenceDelete(index)}
            editable={props.editable}
          />
        </li>
      ))}
      {props.editable && (
        <li>
          <NewDefinitionSentence
            definition={props.definition}
            onCreate={handleSentenceCreate}
          />
        </li>
      )}
    </ul>
  );
};

interface DefinitionSentenceListItemProps {
  sentence: string;
  onUpdate?: (newSentence: string) => void;
  onDelete?: () => void;
  editable?: boolean;
}

const DefinitionSentenceListItem = (props: DefinitionSentenceListItemProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(props.sentence);

  useEffect(() => {
    setValue(props.sentence);
  }, [props.sentence]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      ref.current?.blur();
    }
  };

  const handleBlur = () => {
    const trimmedValue = value.trim();
    if (trimmedValue === "") {
      props.onDelete?.();
    } else {
      props.onUpdate?.(trimmedValue);
    }
  };

  return (
    <input
      ref={ref}
      className="w-full py-2.5 pr-4 bg-transparent outline-0"
      type="text"
      value={value}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      placeholder="Type sentence…"
      disabled={!props.editable}
    />
  );
};

interface NewDefinitionSentenceProps {
  definition: Definition;
  onCreate: (createdSentence: string) => void;
}

const NewDefinitionSentence = (props: NewDefinitionSentenceProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  const [isAiProcessing, setIsAiProcessing] = useState<boolean>(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      ref.current?.blur();
    }
  };

  const handleBlur = () => {
    const trimmedValue = value.trim();
    if (trimmedValue !== "") {
      props.onCreate(trimmedValue);
      setValue("");
    }
  };

  const { getToken } = useAuth();

  const generateSentence = async (
    phrase: string,
    meaning: string,
  ): Promise<string | undefined> => {
    const userToken = await getToken();
    if (!userToken) return;

    const response = await backendClient
      .post(
        "/ai/sentence",
        { phrase, meaning },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        },
      )
      .catch(() => undefined);
    return response?.data?.sentence;
  };

  const handleGenerateWithAiClick = async () => {
    setIsAiProcessing(true);
    const { phrase, meaning } = props.definition;
    const sentence = await generateSentence(phrase, meaning);
    setIsAiProcessing(false);

    if (sentence) {
      props.onCreate(sentence);
      setValue("");
    }
  };

  return (
    <div className="relative">
      <input
        ref={ref}
        className="w-full py-2.5 pr-4 bg-transparent outline-0"
        type="text"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        placeholder="Type sentence…"
        disabled={isAiProcessing}
      />
      <button
        className="bg-theme-ai-light text-white text-sm py-1 px-5 rounded-full absolute left-[16ch] top-1/2 -translate-y-1/2 disabled:bg-theme-ai-light-variant"
        hidden={value !== ""}
        disabled={isAiProcessing}
        onClick={handleGenerateWithAiClick}
      >
        {isAiProcessing ? "Generating with AI…" : "Generate with AI"}
      </button>
    </div>
  );
};
