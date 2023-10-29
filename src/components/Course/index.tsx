import Button from "../shared/Button";
import Input from "../shared/Input";
import { FormEvent, useState } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";

const CreateCourse = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [phraseLanguage, setPhraseLanguage] = useState("");
    const [definitionsLanguage, setDefinitionsLanguage] = useState("");
    const [prompts, setPrompts] = useState([{ phrase: '', definition: '' }]);

    const addPrompt = (event: FormEvent) => {
        event.preventDefault();
        const newPrompt = { phrase: '', definition: '' }
        setPrompts([...prompts, newPrompt]);

    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, setStateFunction: (newValue: string) => void) => {
        const newValue = e.target.value;
        setStateFunction(newValue);
        console.log(newValue);
    }

    const handleFormChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const data = [...prompts];
        data[index][event.target.name as keyof typeof prompts[0]] = event.target.value;
        setPrompts(data);
    }

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        console.table(prompts)
    }

    const removePrompt = (event: FormEvent, index: number) => {
        event.preventDefault();
        const data = [...prompts];
        data.splice(index, 1);
        setPrompts(data);
    }

    const handleEnterKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            addPrompt(event);
        }
    }

    return (
        <div>
            <div className="create-info flex">
                <div className="text-white">Create flashcards</div>
                <Button buttonStyle={"yellow"} onClick={handleSubmit}>Create</Button>
            </div>
            <div className="inputs grid">
                <Input placeholder={"Enter title"} rounded={"large"} onChange={(e) => handleInputChange(e, setTitle)} />
                <Input placeholder={"Enter description"} rounded={"large"} height="md" onChange={(e) => handleInputChange(e, setDescription)} />
                <Input placeholder={"Phrase language"} rounded={"large"} onChange={(e) => handleInputChange(e, setPhraseLanguage)} />
                <Input placeholder={"Definitions language"} rounded={"large"} onChange={(e) => handleInputChange(e, setDefinitionsLanguage)} />
                <div>
                    {prompts.map((prompt, index) => (
                        <div key={index} className="flex align-middle">
                            <Input placeholder={"Enter phrase"} name="phrase" rounded={"large"} value={prompt.phrase} onChange={event => handleFormChange(index, event)} />
                            <Input placeholder={"Enter definition"} name="definition" rounded={"large"} value={prompt.definition} onChange={event => handleFormChange(index, event)} onKeyDown={handleEnterKeyPress} />
                            <Button buttonStyle={"transparent"}><TrashIcon className="w-5 h-5" onClick={(event) => { removePrompt(event, index) }} /></Button>
                        </div>
                    ))}
                    <Button buttonStyle={"blue"} onClick={addPrompt}>
                        Add flashcard
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CreateCourse;