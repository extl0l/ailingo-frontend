import React, { HTMLAttributes } from "react";
import { cn } from "../../utils/tailwind";

export type PanelProps = {
	children: React.ReactNode;
};

const Panel = ({
	children,
	...props
}: PanelProps & HTMLAttributes<HTMLDivElement>) => {
	return (
		<div {...props} className={cn("panel", props.className)}>
			{children}
		</div>
	);
};

export default Panel;
