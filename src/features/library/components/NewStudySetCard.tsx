import IconNew from "../assets/add_FILL0_wght400_GRAD0_opsz40.svg";
import { Glyph } from "../../_shared/components/Glyph.tsx";
import { Link } from "react-router-dom";

export const CreateNewStudySetCard = () => {
	return (
		<Link
			to="../courses/new"
			className="font-medium text-theme-brown-light p-3 rounded-xl bg-theme-background-light-variant">
			<div className="flex items-center gap-2.5">
				<div className="w-20 h-20 rounded-xl flex items-center justify-center text-theme-lime-light border-[3px] border-theme-lime-light border-dashed">
					<Glyph src={IconNew} />
				</div>
				<p className="text-xl">Create new…</p>
			</div>
		</Link>
	);
};
