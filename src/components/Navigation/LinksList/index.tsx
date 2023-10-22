import Link from "./Link";

// eslint-disable-next-line react-refresh/only-export-components
const LINKS = [
	{
		name: "Home",
		href: "/",
	},
	{
		name: "Your Courses",
		href: "/courses",
	},
];

const index = () => {
	return (
		<ul className="h-full space-x-6">
			{LINKS.map((link) => (
				<Link key={link.href} {...link} />
			))}
		</ul>
	);
};

export default index;
