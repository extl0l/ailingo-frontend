import { VariantProps, cva } from "class-variance-authority";
import { cn } from "../../utils/tailwind";
import { forwardRef, InputHTMLAttributes } from "react";

const inputVariants = cva(
	"panel outline-none py-1.5", {
	variants: {
		"rounded": {
			full: "rounded-full",
			large: "rounded-lg",
			md: "rounded-md",
			small: "rounded-sm",
			none: "rounded-none",
		},
		"width": {
			full: "w-full",
			large: "w-96",
			md: "w-50",
			small: "w-30",
			none: "w-0",
		},
		"border": {
			blue: "border-theme-blue-tertiary border",
			white: "border-white border",
			none: "border-none",
		},
		"textColor": {
			white: "text-white",
			black: "text-black",
		}
	},
	defaultVariants: {
		rounded: "full",
		width: "large",
		border: "none",
		textColor: "white",
	},
});


export interface InputProps
	extends InputHTMLAttributes<HTMLInputElement>,
	VariantProps<typeof inputVariants> {
	"width"?: "full" | "large" | "md" | "small" | "none";
}

const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className, rounded, width, border, textColor, ...props }, ref) => {
		return (
			<input type="text" className={cn(inputVariants({ rounded, width, border, textColor }), className)}
				ref={ref} {...props} />
		);

	}
);

Input.displayName = "Input";

export default Input;
