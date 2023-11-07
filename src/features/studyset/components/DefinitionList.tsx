import { useState } from "react";
import { DefinitionListItem } from "./DefinitionListItem.tsx";
import { NewDefinitionListItem } from "./NewDefinition.tsx";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { backendClient } from "../../_shared/api/backendClient.ts";
import { useAuth } from "@clerk/clerk-react";
import { Definition } from "../../_shared/models/StudySet.ts";

export interface DefinitionListProps {
  studySetId: number;
  editable?: boolean;
}

export const DefinitionList = (props: DefinitionListProps) => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  const definitionsQuery = useQuery({
    queryKey: ["study-sets", props.studySetId, "definitions"],
    queryFn: async (): Promise<Definition[]> => {
      const url = `/study-sets/${props.studySetId}/definitions`;
      const definitions = await backendClient.get(url);
      return definitions.data satisfies Definition[];
    },
  });

  const newDefinitionMutation = useMutation({
    mutationFn: async (newDefinition: Omit<Definition, "id">) => {
      const url = `/study-sets/${props.studySetId}/definitions`;
      await backendClient.post(url, newDefinition, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      await queryClient.invalidateQueries({
        queryKey: ["study-sets", props.studySetId, "definitions"],
      });
    },
  });

  const handleDefinitionCreate = (definition: Omit<Definition, "id">) => {
    newDefinitionMutation.mutate(definition);
  };

  const updateDefinitionMutation = useMutation({
    mutationFn: async (updatedDefinition: Definition) => {
      const url = `/study-sets/${props.studySetId}/definitions/${updatedDefinition.id}`;
      await backendClient.put(url, updatedDefinition, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      await queryClient.invalidateQueries({
        queryKey: ["study-sets", props.studySetId, "definitions"],
      });
    },
  });

  const handleDefinitionUpdate = (updatedDefinition: Definition) => {
    updateDefinitionMutation.mutate(updatedDefinition);
  };

  const deleteDefinitionMutation = useMutation({
    mutationFn: async (definitionId: number) => {
      const url = `/study-sets/${props.studySetId}/definitions/${definitionId}`;
      await backendClient.delete(url, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      await queryClient.invalidateQueries({
        queryKey: ["study-sets", props.studySetId, "definitions"],
      });
    },
  });

  const handleDefinitionDelete = (definitionId: number) => {
    deleteDefinitionMutation.mutate(definitionId);
  };

  const [expandedId, setExpandedId] = useState<number | undefined>();

  const handleContainerClick = () => {
    setExpandedId(undefined);
  };

  const handleDefinitionClick = (definitionId: number) => {
    setExpandedId(definitionId);
  };

  const definitions = definitionsQuery.data;

  return (
    <div onClick={handleContainerClick}>
      <section className="flex flex-col max-w-3xl px-4 mx-auto pb-12">
        <p className="font-medium text-theme-brown-light text-2xl py-6 px-4">
          Words
        </p>
        {definitions?.map((definition) => (
          <DefinitionListItem
            key={definition.id}
            definition={definition}
            expanded={expandedId === definition.id}
            onClick={() => handleDefinitionClick(definition.id)}
            onUpdate={handleDefinitionUpdate}
            onDelete={() => handleDefinitionDelete(definition.id)}
            editable={props.editable}
          />
        ))}
        <NewDefinitionListItem onCreate={handleDefinitionCreate} />
      </section>
    </div>
  );
};
