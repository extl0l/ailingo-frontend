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
    }

    const handleFormChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const data = [...prompts];
        data[index][event.target.name as keyof typeof prompts[0]] = event.target.value;
        setPrompts(data);
    }

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        const data = { title, description, phraseLanguage, definitionsLanguage, prompts };
        console.log(data)
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
            <div className="create-info flex justify-between items-center my-3">
                <div className="text-white text-2xl">Create flashcards</div>
                <Button buttonStyle={"yellow"} onClick={handleSubmit}>Create</Button>
            </div>

            <div className="inputs space-y-5">
                <div className="space-y-2 w-full place-items-center">
                    <Input className="w-full" placeholder={"Enter title"} rounded={"large"} onChange={(e) => handleInputChange(e, setTitle)} required />
                    <div className="grid grid-cols-2 w-full space-x-2 align-middle m-auto h-20">
                        <Input className="h-20" placeholder={"Enter description"} width="md" rounded={"large"} onChange={(e) => handleInputChange(e, setDescription)} required />
                        <div className="grid space-y-2">
                            <Input width="full" placeholder={"Phrase language"} rounded={"large"} onChange={(e) => handleInputChange(e, setPhraseLanguage)} required />
                            <Input width="full" placeholder={"Definitions language"} rounded={"large"} onChange={(e) => handleInputChange(e, setDefinitionsLanguage)} required />
                        </div>
                    </div>
                </div>

                <div className="space-y-2 w-3/4 m-auto">
                    {prompts.map((prompt, index) => (
                        <div key={index} className="flex h-20 panel items-center justify-between">
                            <Input placeholder={"Enter phrase"} name="phrase" rounded={"large"} border={"white"} value={prompt.phrase} onChange={event => handleFormChange(index, event)} required />
                            <Input placeholder={"Enter definition"} name="definition" rounded={"large"} border={"white"} value={prompt.definition} onChange={event => handleFormChange(index, event)} onKeyDown={handleEnterKeyPress} required />
                            <Button buttonStyle={"transparent"} className="w-24 bg-red-500 border-none" onClick={(event) => { if (prompts.length > 1) { removePrompt(event, index) } }}><TrashIcon className="w-5 h-6" /></Button>
                        </div>
                    ))}
                </div>

                <div className="flex space-x-1 justify-center">
                    <Button buttonStyle={"blue"} className="w-40" onClick={addPrompt}>
                        Add flashcard
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CreateCourse;