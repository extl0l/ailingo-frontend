import Link from "./Link";

// eslint-disable-next-line react-refresh/only-export-components
const LINKS = [
	{
		name: "Home",
		href: "/",
	},
];

const index = () => {
	return (
		<ul>
			{LINKS.map((link) => (
				<Link key={link.href} {...link} />
			))}
		</ul>
	);
};

export default index;
