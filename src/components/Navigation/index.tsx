import Logo from "../shared/Logo";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

const MainNavigation = () => {
	return (
		<nav className="flex justify-between col-[full-start/full-end] px-4 py-3 top-0 fixefd">
			<div>
				<Logo />
			</div>
			<div>
				<input type="text" placeholder="Szukaj..." />
			</div>
			<div className="flex gap-8">
				<PlusCircleIcon className="w-9" />
				<div>logowanie</div>
			</div>
		</nav>
	);
};

export default MainNavigation;
