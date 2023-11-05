import { XMarkIcon } from "@heroicons/react/24/outline";
import Button from "../../shared/Button";
import { useNavigate, useParams } from "react-router-dom";
import Tooltip from "../../shared/Tooltip";

type Props = {
	currentFlashcard: number;
	flashcards: number;
};

const FlashcardsMenu = ({ currentFlashcard, flashcards }: Props) => {
	const { courseId } = useParams();
	const navigate = useNavigate();

	const redirectToCourse = () => navigate(`/courses/${courseId}`);

	return (
		<div className="col-[center-start/center-end] flex max-w-5xl mx-auto w-full items-center justify-between">
			<div className="w-8"></div>
			<div className="text-center">
				<div>
					{currentFlashcard + 1}/{flashcards}
				</div>
				<div onClick={redirectToCourse}>COURSE NAME</div>
			</div>
			<Tooltip content="Close">
				<Button className="p-0.5" variant={"outline"} onClick={redirectToCourse}>
					<XMarkIcon className="w-6 h-6" />
				</Button>
			</Tooltip>
		</div>
	);
};

export default FlashcardsMenu;
