import { type HTMLAttributes } from "react";
import { cn } from "../../utils/tailwind";
import { Link } from "react-router-dom";

export type LinkPanelProps = {
	children: React.ReactNode;
	href: string;
	animate?: boolean;
};

const LinkPanel = ({
	children,
	animate,
	href,
	...props
}: LinkPanelProps & HTMLAttributes<HTMLAnchorElement>) => {
	return (
		<Link
			{...props}
			to={href}
			className={cn(
				"panel",
				animate &&
					"transition hover:transition after:opacity-0 hover:after:opacity-100 hover:link-active",
				props.className
			)}>
			{children}
		</Link>
	);
};

export default LinkPanel;
