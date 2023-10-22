import { NavLink } from "react-router-dom";

type Props = {
	href: string;
	name: string;
};

const Link = ({ href, name }: Props) => {
	return (
		<NavLink
			className={({ isActive }) =>
				`h-full px-1 text-sm py-5 relative transition after:opacity-0 hover:after:opacity-100 link-active ${
					isActive ? "after:opacity-100" : ""
				}`
			}
			to={href}>
			{name}
		</NavLink>
	);
};

export default Link;
