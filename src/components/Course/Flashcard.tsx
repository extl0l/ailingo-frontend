import Button from "../shared/Button";
import Input from "../shared/Input";
import { TrashIcon } from "@heroicons/react/24/solid";


const Flashcard = () => {

    return (
        <div className="flex align-middle">
            <Input placeholder={"Enter phrase"} rounded={"large"} />
            <Input placeholder={"Enter definition"} rounded={"large"} />
            <Button buttonStyle={"transparent"}><TrashIcon className="w-5 h-5" /></Button>
        </div>
    )
}

export default Flashcard;