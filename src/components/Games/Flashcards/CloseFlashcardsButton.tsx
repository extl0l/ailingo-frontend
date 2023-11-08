import Button from "../../shared/Button";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const CloseFlashcardsButton = () => {
    const navigate = useNavigate();

    const redirectToCourse = () => navigate(`/`);

    return (
        <Button
            className="p-1 border-none"
            variant="outline"
            rounded="full"
            onClick={redirectToCourse}>
            <XMarkIcon className="w-6 h-6" />
        </Button>
    )
}

export default CloseFlashcardsButton;