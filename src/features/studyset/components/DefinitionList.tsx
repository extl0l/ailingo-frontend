import { EditableText } from "../../_shared/components/EditableText.tsx";
import { useCallback, useEffect, useState } from "react";
import { cn } from "../../../utils/tailwind.ts";

export interface Definition {
  readonly id: number;
  phrase: string;
  meaning: string;
  sentences: string[];
}

const DUMMY_DEFINITIONS: Definition[] = [
  {
    id: 0,
    phrase: "look forward to something",
    meaning: "oczekiwać na coś z niecierpliwością",
    sentences: [
      "I'm looking forward to the summer break. I've got so many holiday plans!",
      "My brother says he's looking forward to Christmas. He loves receiving gifts.",
    ],
  },
  {
    id: 1,
    phrase: "plan on something",
    meaning: "planować coś",
    sentences: [],
  },
  {
    id: 2,
    phrase: "throw a party",
    meaning: "zorganizować przyjęcie",
    sentences: [
      "Catalina said that throwing a BBQ party with the new neighbours was a great idea.",
    ],
  },
];

export const DefinitionList = () => {
  const [definitions, setDefinitions] = useState(DUMMY_DEFINITIONS);

  const [expandedDefinitionId, setExpandedDefinitionId] = useState<
    number | undefined
  >();

  const handleDefinitionClick = (definitionId: number) => {
    setExpandedDefinitionId(definitionId);
  };

  const handleDefinitionUpdate = (updatedDefinition: Definition) => {
    const definitionsCopy = [...definitions];
    const definitionIndex = definitionsCopy.findIndex(
      (definition) => definition.id === updatedDefinition.id,
    );
    definitionsCopy.splice(definitionIndex, 1, updatedDefinition);
    setDefinitions(definitionsCopy);
  };

  const handleDefinitionDelete = (definitionId: number) => {
    const definitionsCopy = [...definitions];
    const definitionIndex = definitionsCopy.findIndex(
      (definition) => definition.id === definitionId,
    );
    definitionsCopy.splice(definitionIndex, 1);
    setDefinitions(definitionsCopy);
  };

  return (
    <section className="flex flex-col max-w-3xl px-4 mx-auto">
      <p className="font-medium text-theme-brown-light text-2xl py-6 px-4">
        Words
      </p>
      {definitions.map((definition) => (
        <DefinitionListItem
          key={definition.id}
          definition={definition}
          expanded={expandedDefinitionId === definition.id}
          onClick={() => handleDefinitionClick(definition.id)}
          onUpdate={handleDefinitionUpdate}
          onDelete={() => handleDefinitionDelete(definition.id)}
          editable={true} // TODO: This should be variable
        />
      ))}
    </section>
  );
};

interface DefinitionListItemProps {
  definition: Definition;
  expanded?: boolean;
  editable?: boolean;
  onClick?: () => void;
  onUpdate?: (updatedDefinition: Definition) => void;
  onDelete?: () => void;
}

const DefinitionListItem = (props: DefinitionListItemProps) => {
  const { definition, onUpdate, onDelete } = props;
  const { phrase, meaning } = definition;

  const [phraseEditText, setPhraseEditText] = useState(phrase);
  const [meaningEditText, setMeaningEditText] = useState(meaning);

  useEffect(() => {
    setPhraseEditText(phrase);
    setMeaningEditText(meaning);
  }, [phrase, meaning]);

  const handleDefinitionUpdate = useCallback(
    (newPhrase: string, newMeaning: string) => {
      const trimmedNewPhrase = newPhrase.trim();
      const trimmedNewMeaning = newMeaning.trim();

      if (trimmedNewPhrase === "" || trimmedNewMeaning === "") {
        onDelete?.();
        return;
      }
      const updatedDefinition: Definition = {
        ...definition,
        phrase: trimmedNewPhrase,
        meaning: trimmedNewMeaning,
      };
      onUpdate?.(updatedDefinition);
    },
    [definition, onUpdate, onDelete],
  );

  const handlePhraseValueSubmit = (newPhrase: string) => {
    handleDefinitionUpdate(newPhrase, meaning);
  };

  const handleMeaningValueSubmit = (newMeaning: string) => {
    handleDefinitionUpdate(phrase, newMeaning);
  };

  const isEditable = props.expanded && props.editable;

  return (
    <div
      className={cn(
        "group even:bg-theme-background-light-variant rounded-xl px-6 transition-[margin]",
        props.expanded ? "mx-0" : "mx-4",
      )}
      onClick={props.onClick}
    >
      <div
        className={cn(
          "grid grid-cols-3 py-3 transition-[padding]",
          props.expanded ? "px-4" : "px-0",
        )}
      >
        <EditableText
          value={phraseEditText}
          onChange={setPhraseEditText}
          onSubmit={handlePhraseValueSubmit}
          editable={isEditable}
        />
        <EditableText
          className="col-span-2"
          value={meaningEditText}
          onChange={setMeaningEditText}
          onSubmit={handleMeaningValueSubmit}
          editable={isEditable}
        />
      </div>
    </div>
  );
};
