import { ChangeEvent, FormEvent, useState } from "react";
import { Definition } from "../../_shared/models/StudySet.ts";
import { backendClient } from "../../_shared/api/backendClient.ts";
import { useAuth } from "@clerk/clerk-react";

export interface NewDefinitionListItemProps {
  onCreate?: (definition: Omit<Definition, "id">) => void;
}

export const NewDefinitionListItem = (props: NewDefinitionListItemProps) => {
  const [phrase, setPhrase] = useState("");
  const [meaning, setMeaning] = useState("");

  const handlePhraseChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPhrase(event.target.value);
  };

  const handleMeaningChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMeaning(event.target.value);
  };

  const createDefinition = (phrase: string, meaning: string) => {
    const trimmedPhrase = phrase.trim();
    const trimmedMeaning = meaning.trim();

    if (trimmedPhrase === "" || trimmedMeaning === "") {
      return;
    }

    const createdDefinition: Omit<Definition, "id"> = {
      phrase: trimmedPhrase,
      meaning: trimmedMeaning,
      sentences: [],
    };
    props.onCreate?.(createdDefinition);
    setPhrase("");
    setMeaning("");
  };

  const handleDefinitionSubmit = () => {
    createDefinition(phrase, meaning);
  };

  const handleDefinitionFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleDefinitionSubmit();
  };

  const handleFieldBlur = () => {
    handleDefinitionSubmit();
  };

  const [isAiProcessing, setIsAiProcessing] = useState<boolean>(false);
  const { getToken } = useAuth();

  const translatePhrase = async (
    phrase: string,
  ): Promise<string | undefined> => {
    const userToken = await getToken();
    if (!userToken) return;

    const response = await backendClient
      .post(
        "/ai/translate",
        { phrase },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        },
      )
      .catch(() => undefined);
    return response?.data?.definition;
  };

  const handleTranslateWithAi = async () => {
    setIsAiProcessing(true);
    const translation = await translatePhrase(phrase);
    setIsAiProcessing(false);

    if (translation) {
      createDefinition(phrase, translation);
    }
  };

  return (
    <div className="group even:bg-theme-background-light-variant rounded-xl px-6 mx-4">
      <form className="grid grid-cols-3" onSubmit={handleDefinitionFormSubmit}>
        <input
          className="w-full py-3 outline-0 bg-transparent"
          type="text"
          value={phrase}
          onChange={handlePhraseChange}
          onBlur={handleFieldBlur}
          placeholder="Type phrase…"
        />
        <div className="col-span-2 relative">
          <input
            className="w-full py-3 outline-0 bg-transparent"
            type="text"
            value={meaning}
            onChange={handleMeaningChange}
            onBlur={handleFieldBlur}
            placeholder="Type definition or…"
          />
          <button
            className="bg-theme-ai-light text-white text-sm py-1 px-5 rounded-full absolute left-[16ch] top-1/2 -translate-y-1/2 disabled:bg-theme-ai-light-variant"
            disabled={phrase === "" || isAiProcessing}
            hidden={meaning !== ""}
            onClick={handleTranslateWithAi}
          >
            {isAiProcessing ? "Translating with AI…" : "Translate with AI"}
          </button>
        </div>
      </form>
    </div>
  );
};
