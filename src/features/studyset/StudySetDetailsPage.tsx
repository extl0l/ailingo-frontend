import { StudySet } from "../_shared/models/StudySet.ts";
import IconAddStar from "./assets/star_FILL0_wght600_GRAD0_opsz24.svg";
import IconOpenFullscreen from "./assets/open_in_full_FILL0_wght400_GRAD0_opsz24.svg";
import { Glyph } from "../_shared/components/Glyph.tsx";
import { FlipCard } from "./components/FlipCard.tsx";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";
import { useAuth, useUser } from "@clerk/clerk-react";
import { EditableText } from "../_shared/components/EditableText.tsx";
import { useState } from "react";
import { backendClient } from "../_shared/api/backendClient.ts";
import { DefinitionList } from "./components/DefinitionList.tsx";

export const StudySetDetailsPage = () => {
  const { studySetId } = useParams();
  const { user } = useUser();

  const [studySetEditValue, setStudySetEditValue] = useState<
    StudySet | undefined
  >();

  const studySetDetailsQuery = useQuery<StudySet>({
    queryKey: ["study-set", studySetId],
    queryFn: async () => {
      const response = await backendClient.get(`study-sets/${studySetId}`);
      setStudySetEditValue(response.data);
      return response.data;
    },
    retry: false,
  });

  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  const studySetUpdateMutation = useMutation({
    mutationFn: async (studySet: StudySet) => {
      const response = await backendClient.put(
        `study-sets/${studySetId}`,
        studySet,
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        },
      );
      // noinspection ES6MissingAwait
      queryClient.invalidateQueries({ queryKey: ["study-set", studySetId] });
      return response.data;
    },
  });

  if (studySetDetailsQuery.isError) {
    return <Navigate to="/library" />;
  }

  if (studySetDetailsQuery.isPending || !studySetEditValue) {
    return <p>Loading...</p>;
  }

  const studySet = studySetDetailsQuery.data;
  const { icon, author } = studySet;
  const color = studySet.color || "hsla(58, 63%, 53%, 1)";

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
            <button title="Star this study set">
              <img src={IconAddStar} alt="" />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-3">
            <div className="col-start-1 col-end-4 aspect-video relative">
              <button
                className="absolute top-3.5 left-3.5 z-[1]"
                title="Open fullscreen"
              >
                <img src={IconOpenFullscreen} alt="" />
              </button>
              <FlipCard
                front={
                  <div className="w-full h-full bg-white rounded-xl relative overflow-hidden flex items-center justify-center text-2xl pb-4">
                    cabinet
                    <div
                      className="absolute bottom-0 left-0 w-full p-2 text-center text-theme-background-light-variant text-base"
                      style={{ backgroundColor: color }}
                    >
                      tap to flip
                    </div>
                  </div>
                }
                back={
                  <div className="w-full h-full bg-white rounded-xl overflow-hidden flex items-center justify-center text-2xl pb-4">
                    szafka
                  </div>
                }
              />
            </div>
            <div className="flex flex-col items-end">
              <div
                className="flex items-center justify-center aspect-square rounded-xl text-theme-background-light-variant w-full"
                style={{ backgroundColor: color }}
              >
                <Glyph src={icon} />
              </div>
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
