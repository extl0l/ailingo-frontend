import Logo from "../shared/Logo";

import AddCours from "./AddCours";

const MainNavigation = () => {
	return (
		<nav className="flex items-center justify-between col-[full-start/full-end] px-7 py-3 top-0 fixed w-full border-b-theme-blue-secondary text-theme-font-light">
			<Logo />

			<div>
				<input type="text" placeholder="Szukaj..." />
			</div>
			<div className="flex gap-8 items-center">
				<AddCours />
				<div>logowanie</div>
			</div>
		</nav>
	);
};

export default MainNavigation;
