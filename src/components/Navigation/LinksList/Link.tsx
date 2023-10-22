import { NavLink } from "react-router-dom";

type Props = {
	href: string;
	name: string;
};

const Link = ({ href, name }: Props) => {
	return <NavLink to={href}>{name}</NavLink>;
};

export default Link;
