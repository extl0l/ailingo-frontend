import Button from "../../shared/Button";
import { XMarkIcon, CheckIcon } from "@heroicons/react/24/solid";
import Tooltip from "../../shared/Tooltip";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
type Props = {
	markFlashcardAsKnown: () => void;
	goBack: () => void;
	markFlashcardAsNotKnown: () => void;
};

const FlashcardOptions = ({
	markFlashcardAsKnown,
	goBack,
	markFlashcardAsNotKnown,
}: Props) => {
	return (
		<div className="flex w-full items-center justify-between mt-4 mb-5 max-w-5xl mx-auto">
			<div>
				<Tooltip content="Go back">
					<Button
						variant="outline"
						rounded="full"
						onClick={goBack}
						className="p-1.5 border-none">
						<ArrowUturnLeftIcon className="w-6 h-6 fill-theme-blue-ghost" />
					</Button>
				</Tooltip>
			</div>
			<div className="gap-16 flex">
				<Tooltip content="I don't know">
					<Button
						variant="outline"
						rounded="full"
						onClick={markFlashcardAsNotKnown}
						className="p-1.5">
						<XMarkIcon className="w-8 h-8 fill-theme-red-primary" />
					</Button>
				</Tooltip>
				<Tooltip content="I know">
					<Button
						onClick={markFlashcardAsKnown}
						variant="outline"
						rounded="full"
						className="p-1.5">
						<CheckIcon className="w-8 h-8 fill-theme-green-primary" />
					</Button>
				</Tooltip>
			</div>
			<div>xd</div>
		</div>
	);
};

export default FlashcardOptions;
