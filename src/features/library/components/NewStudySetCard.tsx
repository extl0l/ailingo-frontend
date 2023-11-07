import IconNew from "../assets/add_FILL0_wght400_GRAD0_opsz40.svg";
import { Glyph } from "../../_shared/components/Glyph.tsx";
import { cn } from "../../../utils/tailwind.ts";
import { useClerk, useUser } from "@clerk/clerk-react";

interface NewStudySetCardProps {
	onClick?: () => void;
	disabled?: boolean;
}

export const CreateNewStudySetCard = (props: NewStudySetCardProps) => {
	const clerk = useClerk();
	const { isSignedIn } = useUser();

	const handleClick = () => {
		if (!isSignedIn) {
			clerk.openSignIn();
			return;
		}
		props.onClick?.();
	};

	return (
		<article
			className={cn(
				"font-medium text-theme-brown-light p-3 rounded-xl mx-auto px-8 ",
				props.disabled
					? "cursor-wait bg-theme-background-light-darker"
					: "bg-theme-background-light-variant hover:bg-theme-background-light-darker cursor-pointer w-full "
			)}
			onClick={handleClick}>
			<div className="flex items-center gap-2.5">
				<div className="w-20 h-20 rounded-xl flex items-center justify-center text-theme-lime-light border-[3px] border-theme-lime-light border-dashed">
					<Glyph src={IconNew} />
				</div>
				<p className="text-xl">Create new…</p>
			</div>
		</article>
	);
};
