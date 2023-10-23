import Logo from "../shared/Logo";
import ProfilePictureIcon from "./ProfilePictureIcon";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import LoginButton from "./LoginButton";
import SearchInput from "./SearchInput";

//TODO: Add <Link>s to elements

const MainNavigation = () => {
	return (
		<nav className="flex justify-between h-16 border-b border-b-gray-800 p-6">
			<div className="flex gap-9 self-center">
				<Logo />
				<a href="/" className="text-white self-center">Strona główna</a>
			</div>
			<div className="self-center">
				<SearchInput />
			</div>
			<div className="flex gap-8 self-center">
				<PlusCircleIcon className="w-9 text-yellow-300 self-center" />
				<div className="self-center">
					<ProfilePictureIcon />
				</div>
				<div className="self-center">
					<LoginButton />
				</div>
			</div>
		</nav>
	);
};

export default MainNavigation;