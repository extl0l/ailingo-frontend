import { useState } from "react";
import { DefinitionListItem } from "./DefinitionListItem.tsx";
import { NewDefinitionListItem } from "./NewDefinition.tsx";

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

  const handleContainerClick = () => {
    setExpandedDefinitionId(undefined);
  };

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

  const handleDefinitionCreate = (definition: Omit<Definition, "id">) => {
    setDefinitions((definitions) => {
      return [...definitions, { ...definition, id: Date.now() }];
    });
  };

  return (
    <div onClick={handleContainerClick}>
      <section className="flex flex-col max-w-3xl px-4 mx-auto pb-12">
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
        <NewDefinitionListItem onCreate={handleDefinitionCreate} />
      </section>
    </div>
  );
};
