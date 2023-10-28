import Button from "../shared/Button";
import Input from "../shared/Input";
import Flashcard from "./Flashcard";
import { FormEvent, useState } from "react";

const CreateCourse = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [phraseLanguage, setPhraseLanguage] = useState("");
    const [definitionsLanguage, setDefinitionsLanguage] = useState("");
    const [prompts, setPrompts] = useState([<Flashcard key="prompt-0" />]);
    const [promptIndex, setPromptIndex] = useState(1);

    const handleButtonClick = (event: FormEvent) => {
        event.preventDefault();
        setPrompts(prompts => [...prompts, <Flashcard key={`prompt-${promptIndex}`} />])
        setPromptIndex(promptIndex => promptIndex + 1);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, setStateFunction: (newValue: string) => void) => {
        const newValue = e.target.value;
        setStateFunction(newValue);
        console.log(newValue);
    }

    return (
        <form>
            <div className="create-info flex">
                <div className="text-white">Create flashcards</div>
                <Button buttonStyle={"yellow"}>Create</Button>
            </div>
            <div className="inputs grid">
                <Input placeholder={"Enter title"} rounded={"large"} onChange={(e) => handleInputChange(e, setTitle)} />
                <Input placeholder={"Enter description"} rounded={"large"} height="md" onChange={(e) => handleInputChange(e, setDescription)} />
                <Input placeholder={"Phrase language"} rounded={"large"} onChange={(e) => handleInputChange(e, setPhraseLanguage)} />
                <Input placeholder={"Definitions language"} rounded={"large"} onChange={(e) => handleInputChange(e, setDefinitionsLanguage)} />
            </div>
            <div>
                {...prompts}
                <Button buttonStyle={"blue"} onClick={handleButtonClick}>Add flashcard</Button>
            </div>
        </form>
    )
}

export default CreateCourse;