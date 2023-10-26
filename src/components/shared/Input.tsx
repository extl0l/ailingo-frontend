import { VariantProps, cva } from "class-variance-authority";
import { cn } from "../../utils/tailwind";
import { forwardRef, InputHTMLAttributes } from "react";

const inputVariants = cva(
	"panel outline-none py-1.5", {
	variants: {
		"rounded": {
			full: "rounded-full",
			md: "rounded-md",
			none: "rounded-none",
		},

	},
	defaultVariants: {},
});


export interface InputProps
	extends InputHTMLAttributes<HTMLInputElement>,
	VariantProps<typeof inputVariants> {
	"width"?: "full" | "md" | "none";
}

const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className, rounded, ...props }, ref) => {
		return (
			<input type="text" className={cn(inputVariants({ rounded }), className)}
				ref={ref} {...props} />
		);

	}
);

Input.displayName = "Input";

export default Input;
