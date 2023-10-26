import Logo from "../shared/Logo";
import AddCours from "./AddCours";
import User from "./Auth";
import LinksList from "./LinksList";
import Input from "../shared/Input";

const MainNavigation = () => {
	return (
		<nav className="flex items-center justify-between col-[full-start/full-end] px-7 top-0 fixed w-full  text-theme-font-light border-b border-b-theme-blue-secondary">
			<div className="flex gap-8 items-center h-full py-3">
				<Logo />
				<LinksList />
			</div>
			<div><Input height="normal" /></div>
			{/* //? Implement search input? */}
			<div className="flex gap-5 items-center ">
				<AddCours />
				{/* TODO: Render AddCours button only when user is logged in. ! Clerk */}
				<User />
			</div>
		</nav>
	);
};

export default MainNavigation;
