import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";

export interface DefinitionSentenceListProps {
  sentences: string[];
  onUpdate?: (newSentences: string[]) => void;
}

export const DefinitionSentenceList = (props: DefinitionSentenceListProps) => {
  const { sentences } = props;

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

  return (
    <ul>
      {sentences.map((sentence, index) => (
        <li className="border-b" key={index}>
          <DefinitionSentenceListItem
            sentence={sentence}
            onUpdate={(newSentence) => handleSentenceUpdate(index, newSentence)}
            onDelete={() => handleSentenceDelete(index)}
          />
        </li>
      ))}
      <li>
        <DefinitionSentenceListItem
          key={sentences.length}
          sentence=""
          onUpdate={handleSentenceCreate}
        />
      </li>
    </ul>
  );
};

interface DefinitionSentenceListItemProps {
  sentence: string;
  onUpdate?: (newSentence: string) => void;
  onDelete?: () => void;
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
    />
  );
};
