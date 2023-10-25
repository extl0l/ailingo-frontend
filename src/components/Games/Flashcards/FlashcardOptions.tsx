import Button from "../../shared/Button";
import { XMarkIcon, CheckIcon } from "@heroicons/react/24/solid";
import Tooltip from "../../shared/Tooltip";
type Props = {
	nextFlashcard: () => void;
	previousFlashcard: () => void;
};

const FlashcardOptions = ({ nextFlashcard, previousFlashcard }: Props) => {
	return (
		<div className="flex items-center w-full justify-center gap-16 mt-4 mb-5">
			<Tooltip content="I don't know">
				<Button
					variant="outline"
					rounded="full"
					onClick={previousFlashcard}
					className="p-1.5">
					<XMarkIcon className="w-8 h-8 fill-theme-red-primary" />
				</Button>
			</Tooltip>
			<Tooltip content="I know">
				<Button
					onClick={nextFlashcard}
					variant="outline"
					rounded="full"
					className="p-1.5">
					<CheckIcon className="w-8 h-8 fill-theme-green-primary" />
				</Button>
			</Tooltip>
		</div>
	);
};

export default FlashcardOptions;
