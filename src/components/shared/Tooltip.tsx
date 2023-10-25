import * as RadixTooltip from "@radix-ui/react-tooltip";
import { cn } from "../../utils/tailwind";

type Props = {
	sideOffset?: number;
	className?: string;
	content: string;
	children: React.ReactNode;
	arrowClassName?: string;
};

const Tooltip = ({
	children,
	content,
	sideOffset = 5,
	arrowClassName,
	className,
}: Props) => {
	return (
		<RadixTooltip.Provider delayDuration={250}>
			<RadixTooltip.Root>
				<RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
				<RadixTooltip.Portal>
					<RadixTooltip.Content
						className={cn(
							"[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-theme-font-light select-none rounded-md bg-theme-blue-ghost px-[15px] py-[10px] text-xs leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]",
							className
						)}
						sideOffset={sideOffset}>
						{content}
						<RadixTooltip.Arrow
							className={cn("fill-theme-blue-ghost", arrowClassName)}
						/>
					</RadixTooltip.Content>
				</RadixTooltip.Portal>
			</RadixTooltip.Root>
		</RadixTooltip.Provider>
	);
};

export default Tooltip;
