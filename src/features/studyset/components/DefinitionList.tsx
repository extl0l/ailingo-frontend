import { useEffect, useState } from "react";
import { DefinitionListItem } from "./DefinitionListItem.tsx";
import { NewDefinitionListItem } from "./NewDefinition.tsx";
import {
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
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

  const queryKey: QueryKey = ["study-sets", props.studySetId, "definitions"];

  const definitionsQuery = useQuery({
    queryKey: queryKey,
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
    },
    onMutate: async (newDefinition: Omit<Definition, "id">) => {
      await queryClient.cancelQueries({ queryKey });
      const previousDefinitions = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (oldDefinitions: Definition[]) => {
        const newDefinitionId = `__unknown_id_${Date.now()}`;
        return [...oldDefinitions, { ...newDefinition, id: newDefinitionId }];
      });
      return { previousDefinitions };
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(queryKey, context?.previousDefinitions);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
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
    },
    onMutate: async (updatedDefinition: Definition) => {
      await queryClient.cancelQueries({ queryKey });
      const previousDefinitions = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (oldDefinitions: Definition[]) => {
        return oldDefinitions.map((definition) => {
          if (definition.id === updatedDefinition.id) {
            return updatedDefinition;
          }
          return definition;
        });
      });
      return { previousDefinitions };
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(queryKey, context?.previousDefinitions);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
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
    },
    onMutate: async (definitionId: number) => {
      await queryClient.cancelQueries({ queryKey });
      const previousDefinitions = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (oldDefinitions: Definition[]) => {
        return oldDefinitions.filter(
          (definition) => definition.id !== definitionId,
        );
      });
      return { previousDefinitions };
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(queryKey, context?.previousDefinitions);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
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

  const [isAiGeneratingDefinitions, setIsAiGeneratingDefinitions] =
    useState<boolean>(false);
  const [currentGenerationJobId, setCurrentGenerationJobId] = useState<
    number | undefined
  >();

  useEffect(() => {
    if (!currentGenerationJobId) {
      return;
    }
    const intervalId = setInterval(async () => {
      const response = await backendClient
        .get(`/task/${currentGenerationJobId}`, {
          headers: { Authorization: `Bearer ${await getToken()}` },
        })
        .catch(() => undefined);
      const status = response?.data?.finished;
      if (status === "DONE" || status === "FAILED") {
        setCurrentGenerationJobId(undefined);
        setIsAiGeneratingDefinitions(false);
        // noinspection ES6MissingAwait
        queryClient.invalidateQueries({ queryKey });
      }
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [getToken, currentGenerationJobId]);

  const handleGenerativeFillDefinitions = async () => {
    setIsAiGeneratingDefinitions(true);
    const response = await backendClient
      .post(`/study-sets/${props.studySetId}/definitions/fill`, undefined, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      })
      .catch(() => undefined);
    const taskId = response?.data?.["taskId"];
    if (taskId) {
      setCurrentGenerationJobId(taskId);
      console.log("started job", taskId);
      // The button status is cleared in useEffect
    } else {
      setIsAiGeneratingDefinitions(false);
    }
  };

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
        {props.editable && (
          <>
            <NewDefinitionListItem onCreate={handleDefinitionCreate} />
            <button
              className="px-6 m-4 bg-theme-ai-light text-white text-sm py-1 rounded-full disabled:bg-theme-ai-light-variant w-max"
              disabled={isAiGeneratingDefinitions}
              onClick={handleGenerativeFillDefinitions}
            >
              Suggest new phrases with AI
            </button>
          </>
        )}
      </section>
    </div>
  );
};
