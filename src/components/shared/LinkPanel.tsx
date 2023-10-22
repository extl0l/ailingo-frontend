import React, { HTMLAttributes } from "react";
import { cn } from "../../../utils/tailwind";
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
			to={href}
			className={cn(
				"panel",
				animate &&
					"transition hover:transition after:opacity-0 hover:after:opacity-100 hover:link-active",
				props.className
			)}
			{...props}>
			{children}
		</Link>
	);
};

export default LinkPanel;
