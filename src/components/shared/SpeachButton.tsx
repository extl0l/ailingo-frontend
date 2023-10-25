import { cn } from "../../utils/tailwind";
import Button from "./Button";
import { SpeakerWaveIcon } from "@heroicons/react/24/solid";

type Props = {
	className: string;
};

const SpeachButton = ({ className }: Props) => {
	return (
		<Button className={cn("", className)}>
			<SpeakerWaveIcon />
		</Button>
	);
};

export default SpeachButton;
