import { MouseEvent, useEffect, useState } from "react";
import { cn } from "../../../utils/tailwind.ts";
import { EditableText } from "../../_shared/components/EditableText.tsx";
import { DefinitionSentenceList } from "./DefinitionSentenceList.tsx";
import { Definition } from "../../_shared/models/StudySet.ts";

export interface DefinitionListItemProps {
  definition: Definition;
  expanded?: boolean;
  editable?: boolean;
  onClick?: () => void;
  onUpdate?: (updatedDefinition: Definition) => void;
  onDelete?: () => void;
}

export const DefinitionListItem = (props: DefinitionListItemProps) => {
  const { definition } = props;

  const handleDefinitionClick = (event: MouseEvent) => {
    event.stopPropagation();
    props.onClick?.();
  };

  const handleSentencesUpdate = (newSentences: string[]) => {
    props.onUpdate?.({ ...props.definition, sentences: newSentences });
  };

  const isEditable = props.expanded && props.editable;

  return (
    <div
      className={cn(
        "group even:bg-theme-background-light-variant rounded-xl px-6 transition-[margin,background-color]",
        props.expanded ? "mx-0" : "mx-4",
      )}
      onClick={handleDefinitionClick}
    >
      <div
        className={cn(
          "grid grid-cols-3 transition-[padding] gap-2",
          props.expanded ? "px-4" : "px-0",
        )}
      >
        <DefinitionEdit
          definition={definition}
          editable={isEditable}
          onUpdate={props.onUpdate}
          onDelete={props.onDelete}
        />
      </div>
      <div
        className={cn(
          "bg-theme-background-light-variant group-even:bg-theme-background-light transition-[padding,margin,max-height] rounded-xl",
          props.expanded
            ? "pl-4 max-h-[280px] mb-4 overflow-auto"
            : "pl-0 max-h-0 mb-0 overflow-hidden",
        )}
      >
        <DefinitionSentenceList
          definition={definition}
          onUpdate={handleSentencesUpdate}
          editable={props.editable}
        />
      </div>
    </div>
  );
};

interface DefinitionEditProps {
  definition: Definition;
  onUpdate?: (updatedDefinition: Definition) => void;
  onDelete?: () => void;
  editable?: boolean;
}

const DefinitionEdit = (props: DefinitionEditProps) => {
  const [phrase, setPhrase] = useState("");
  const [meaning, setMeaning] = useState("");

  useEffect(() => {
    setPhrase(props.definition.phrase);
    setMeaning(props.definition.meaning);
  }, [props.definition]);

  const handleDefinitionUpdate = () => {
    const trimmedPhrase = phrase.trim();
    const trimmedMeaning = meaning.trim();

    if (trimmedPhrase === "" || trimmedMeaning === "") {
      props.onDelete?.();
      return;
    }

    const updatedDefinition: Definition = {
      ...props.definition,
      phrase: trimmedPhrase,
      meaning: trimmedMeaning,
    };
    props.onUpdate?.(updatedDefinition);
  };

  return (
    <>
      <EditableText
        className="py-3"
        value={phrase}
        onChange={setPhrase}
        onSubmit={handleDefinitionUpdate}
        editable={props.editable}
      />
      <EditableText
        className="py-3 col-span-2"
        value={meaning}
        onChange={setMeaning}
        onSubmit={handleDefinitionUpdate}
        editable={props.editable}
      />
    </>
  );
};
