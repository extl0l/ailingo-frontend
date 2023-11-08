import { Definition, StudySet } from "../_shared/models/StudySet.ts";
import IconAddStar from "./assets/star_FILL0_wght600_GRAD0_opsz24.svg";
import IconOpenFullscreen from "./assets/open_in_full_FILL0_wght400_GRAD0_opsz24.svg";
import { Glyph } from "../_shared/components/Glyph.tsx";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useAuth, useUser } from "@clerk/clerk-react";
import { EditableText } from "../_shared/components/EditableText.tsx";
import { useState } from "react";
import { backendClient } from "../_shared/api/backendClient.ts";
import { DefinitionList } from "./components/DefinitionList.tsx";
import "./styles/ColorPicker.css";
import { ColorPicker } from "./components/ColorPicker.tsx";
import { FlipCard } from "./components/FlipCard.tsx";
import { availableIcons, getIconPath } from "../_shared/utils/icons.ts";
import { cn } from "../../utils/tailwind.ts";

export const StudySetDetailsPage = () => {
  const { setId } = useParams();
  const { user } = useUser();

  const navigate = useNavigate();

  const setNumberId = setId ? parseInt(setId) : -1;
  const libraryMySetsQueryKey = ["library", "my-sets"];
  const currentSetDetailsQueryKey = ["set", setNumberId, "details"];
  const currentSetDefinitionsQueryKey = ["set", setNumberId, "definitions"];

  const [studySetEditValue, setStudySetEditValue] = useState<
    StudySet | undefined
  >();

  const studySetDetailsQuery = useQuery<StudySet>({
    queryKey: currentSetDetailsQueryKey,
    queryFn: async () => {
      const response = await backendClient.get(`study-sets/${setId}`);
      setStudySetEditValue(response.data);
      return response.data;
    },
    retry: false,
  });

  const definitionsQuery = useQuery({
    queryKey: currentSetDefinitionsQueryKey,
    queryFn: async (): Promise<Definition[]> => {
      const url = `/study-sets/${setId}/definitions`;
      const definitions = await backendClient.get(url);
      return definitions.data satisfies Definition[];
    },
  });

  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  const studySetDeleteMutation = useMutation({
    mutationFn: async () => {
      const url = `/study-sets/${setId}`;
      await backendClient.delete(url, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: libraryMySetsQueryKey });
      const previousLibraryMySets = queryClient.getQueryData(
        libraryMySetsQueryKey,
      );
      queryClient.setQueryData(
        libraryMySetsQueryKey,
        (libraryMySets: StudySet[]) => {
          return libraryMySets.filter((set) => set.id !== setNumberId);
        },
      );
      return { previousLibraryMySets };
    },
    onSuccess: () => {
      navigate("/library");
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(
        libraryMySetsQueryKey,
        context?.previousLibraryMySets,
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["library", "my-sets"] });
    },
  });

  const handleStudySetDelete = () => [studySetDeleteMutation.mutate()];

  const studySetUpdateMutation = useMutation({
    mutationFn: async (updatedStudySet: StudySet) => {
      const url = `/study-sets/${setId}`;
      const response = await backendClient.put(url, updatedStudySet, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      return response.data;
    },
    onMutate: async (updatedStudySet: StudySet) => {
      await queryClient.cancelQueries({ queryKey: currentSetDetailsQueryKey });
      const previousSet = queryClient.getQueryData(currentSetDetailsQueryKey);
      queryClient.setQueryData(currentSetDetailsQueryKey, updatedStudySet);
      return { previousSet };
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(currentSetDetailsQueryKey, context?.previousSet);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: currentSetDetailsQueryKey });
    },
  });

  if (studySetDetailsQuery.isError) {
    return <Navigate to="/library" />;
  }

  if (studySetDetailsQuery.isPending || !studySetEditValue) {
    return <p>Loading...</p>;
  }

  const studySet = studySetDetailsQuery.data;
  const { author, color = "#d3ce3c", icon } = studySet;

  const isCurrentUserAuthor = user?.id === author.id;

  const handleNameChange = (newName: string) => {
    setStudySetEditValue({ ...studySetEditValue, name: newName });
  };

  const handleChangedNameSubmit = (newName: string) => {
    if (!newName) {
      // Revert empty name to the unedited version
      setStudySetEditValue({ ...studySetEditValue, name: studySet.name });
    } else {
      studySetUpdateMutation.mutate({ ...studySet, name: newName });
    }
  };

  const handleColorChange = (newColor: string) => {
    studySetUpdateMutation.mutate({ ...studySet, color: newColor });
  };

  const handleIconChange = (newIcon: string) => {
    studySetUpdateMutation.mutate({ ...studySet, icon: newIcon });
  };

  return (
    <article className="font-medium text-theme-brown-light">
      <header className="bg-theme-background-light-variant">
        <div className="p-8 max-w-3xl mx-auto">
          <div className="flex items-center gap-2.5 mb-3">
            <h1 className="text-3xl">
              <EditableText
                value={studySetEditValue.name}
                onChange={handleNameChange}
                onSubmit={handleChangedNameSubmit}
                editable={isCurrentUserAuthor}
              />
            </h1>
            <button title="Add to favorites">
              <img src={IconAddStar} alt="" />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-3">
            <div className="col-start-1 col-end-4 aspect-video relative">
              <button
                className="absolute top-3.5 left-3.5 z-[1]"
                title="Open fullscreen"
              >
                <img
                  src={IconOpenFullscreen}
                  alt=""
                  onClick={() => {
                    navigate(`/${setId}/flashcards`);
                  }}
                />
              </button>
              <FlashCardTeaser
                definition={definitionsQuery.data?.[0]}
                color={studySet.color}
              />
            </div>
            <div className="flex flex-col items-end">
              <div
                className="flex items-center justify-center aspect-square rounded-xl text-theme-background-light-variant w-full relative"
                style={{ backgroundColor: color }}
              >
                {isCurrentUserAuthor && (
                  <div className="absolute top-4 right-4">
                    <ColorPicker
                      color={studySet.color}
                      onSelect={handleColorChange}
                    />
                  </div>
                )}
                <GlyphWithPicker
                  icon={icon}
                  color={color}
                  availableIcons={[...availableIcons]}
                  onChange={handleIconChange}
                />
              </div>
              {isCurrentUserAuthor && (
                <button
                  className="mt-2 w-full p-3 rounded-xl text-theme-background-light-variant bg-white hover:bg-gray-100 text-[rgb(255,98,81)]"
                  onClick={handleStudySetDelete}
                >
                  Delete this set
                </button>
              )}
              <div className="flex items-center gap-2 mt-3">
                <span className="opacity-50">by {author.username}</span>
                <img
                  className="w-8 h-8 rounded-full"
                  src={author.imageUrl}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </header>
      <DefinitionList studySetId={studySet.id} editable={isCurrentUserAuthor} />
    </article>
  );
};

interface GlyphWithPickerProps {
  icon: string;
  availableIcons: string[];
  color: string;
  onChange?: (newIcon: string) => void;
}

const GlyphWithPicker = (props: GlyphWithPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleIconClick = (newIcon: string) => {
    props.onChange?.(newIcon);
    setIsOpen(false);
  };

  const handleGlyphClick = () => {
    setIsOpen((open) => !open);
  };

  return (
    <div className="relative">
      <div onClick={handleGlyphClick}>
        <Glyph src={getIconPath(props.icon)} />
      </div>
      <div
        className="absolute bottom-0 translate-y-[calc(100%+1rem)] left-1/2 -translate-x-1/2 z-20 bg-[#FCFBE9] rounded-xl p-4 max-h-60 overflow-auto w-max h-max"
        hidden={!isOpen}
      >
        <ul className="grid grid-cols-3">
          {props.availableIcons.map((icon) => (
            <li
              className={cn(
                "rounded-xl p-2 transition-[background-color] hover:bg-theme-background-light-variant text-theme-brown-light",
                props.icon === icon && "text-theme-background-light-variant",
              )}
              style={{
                backgroundColor: props.icon === icon ? props.color : undefined,
              }}
              role="button"
              key={icon}
              onClick={() => handleIconClick(icon)}
            >
              <Glyph src={getIconPath(icon)} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

interface FlashCardTeaserProps {
  definition?: Definition;
  color: string;
}

const FlashCardTeaser = (props: FlashCardTeaserProps) => {
  if (!props.definition) {
    return (
      <div className="h-full w-full bg-white rounded-xl flex items-center justify-center text-2xl">
        <span className="opacity-50 select-none">No flashcards</span>
      </div>
    );
  }

  const { phrase, meaning } = props.definition;

  return (
    <FlipCard
      front={
        <div className="w-full h-full bg-white rounded-xl relative overflow-hidden flex items-center justify-center text-2xl pb-4">
          {phrase}
          <div
            className="absolute bottom-0 left-0 w-full p-2 text-center text-theme-background-light-variant text-base"
            style={{ backgroundColor: props.color }}
          >
            tap to flip
          </div>
        </div>
      }
      back={
        <div className="w-full h-full bg-white rounded-xl overflow-hidden flex items-center justify-center text-2xl pb-4">
          {meaning}
        </div>
      }
    />
  );
};
