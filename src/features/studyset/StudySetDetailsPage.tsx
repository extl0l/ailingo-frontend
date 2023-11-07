import { Definition, StudySet } from "../_shared/models/StudySet.ts";
import IconAddStar from "./assets/star_FILL0_wght600_GRAD0_opsz24.svg";
import IconOpenFullscreen from "./assets/open_in_full_FILL0_wght400_GRAD0_opsz24.svg";
import { Glyph } from "../_shared/components/Glyph.tsx";
import { FlipCard } from "./components/FlipCard.tsx";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useAuth, useUser } from "@clerk/clerk-react";
import { EditableText } from "../_shared/components/EditableText.tsx";
import { useState } from "react";
import { backendClient } from "../_shared/api/backendClient.ts";

const DUMMY_DEFINITIONS: Definition[] = [
	{
		word: "look forward to something",
		definition: "oczekiwać na coś z niecierpliwością",
	},
	{
		word: "plan on something",
		definition: "planować coś",
	},
	{
		word: "throw a party",
		definition: "zorganizować przyjęcie",
	},
	{
		word: "housewarming party",
		definition: "parapetówka",
	},
];

export const StudySetDetailsPage = () => {
	const { setId } = useParams();
	const { user } = useUser();
	const navigate = useNavigate();

	const [studySetEditValue, setStudySetEditValue] = useState<
		StudySet | undefined
	>();

	const studySetDetailsQuery = useQuery<StudySet>({
		queryKey: ["study-set", setId],
		queryFn: async () => {
			const response = await backendClient.get(`study-sets/${setId}`);
			setStudySetEditValue(response.data);
			return response.data;
		},
		retry: false,
	});

	const { getToken } = useAuth();
	const queryClient = useQueryClient();

	const studySetUpdateMutation = useMutation({
		mutationFn: async (studySet: StudySet) => {
			const response = await backendClient.put(`study-sets/${setId}`, studySet, {
				headers: { Authorization: `Bearer ${await getToken()}` },
			});
			// noinspection ES6MissingAwait
			queryClient.invalidateQueries({ queryKey: ["study-set", setId] });
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

	const isEditable = user?.id === author.id;

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
								editable={isEditable}
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
								title="Open fullscreen">
								<img
									src={IconOpenFullscreen}
									alt=""
									onClick={() => {
										navigate(`/${setId}/flashcards`);
									}}
								/>
							</button>
							<FlipCard
								front={
									<div className="w-full h-full bg-white rounded-xl relative overflow-hidden flex items-center justify-center text-2xl pb-4">
										cabinet
										<div
											className="absolute bottom-0 left-0 w-full p-2 text-center text-theme-background-light-variant text-base"
											style={{ backgroundColor: color }}>
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
								style={{ backgroundColor: color }}>
								<Glyph src={icon} />
							</div>
							<div className="flex items-center gap-2 mt-3">
								<span className="opacity-50">by Anonymous</span>
								<img className="w-8 h-8 rounded-full" src="" alt="" />
							</div>
						</div>
					</div>
				</div>
			</header>
			<section className="flex flex-col max-w-3xl px-8 mx-auto">
				<p className="font-medium text-theme-brown-light text-2xl py-6">Words</p>
				{DUMMY_DEFINITIONS.map((definition) => (
					<WordDefinition
						key={`${definition.word}:${definition.definition}`} // key="<word>:<definition>"
						definition={definition}
					/>
				))}
			</section>
		</article>
	);
};

interface WordDefinitionProps {
	definition: Definition;
}

const WordDefinition = (props: WordDefinitionProps) => {
	const { word, definition } = props.definition;

	return (
		<div className="grid grid-cols-3 even:bg-theme-background-light-variant rounded-xl p-3">
			<span>{word}</span>
			<span className="col-span-2">{definition}</span>
		</div>
	);
};
