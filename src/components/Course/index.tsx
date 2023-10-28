import Button from "../shared/Button";
import Input from "../shared/Input";
import { useState } from "react";

const CreateCourse = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [phraseLanguage, setPhraseLanguage] = useState("");
    const [definitionsLanguage, setDefinitionsLanguage] = useState("");

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        console.log(title);
    }
    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDescription = e.target.value;
        setDescription(newDescription);
        console.log(description);
    }
    const handlePhraseLangChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPhraseLang = e.target.value;
        setPhraseLanguage(newPhraseLang);
        console.log(phraseLanguage);
    }
    const handleDefinitionLangChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDefinitionLang = e.target.value;
        setDefinitionsLanguage(newDefinitionLang);
        console.log(definitionsLanguage);
    }

    return (
        <form>
            <div className="create-info flex">
                <div className="text-white">Create flashcards</div>
                <Button buttonStyle={"blue"}>Create</Button>
            </div>
            <div className="inputs grid">
                <Input placeholder={"Enter title"} rounded={"large"} onChange={handleTitleChange} />
                <Input placeholder={"Enter description"} rounded={"large"} height="md" onChange={handleDescriptionChange} />
                <Input placeholder={"Phrase language"} rounded={"large"} onChange={handlePhraseLangChange} />
                <Input placeholder={"Definitions language"} rounded={"large"} onChange={handleDefinitionLangChange} />
            </div>
        </form>
    )
}

export default CreateCourse;