import { VariantProps, cva } from "class-variance-authority";
import { cn } from "../../utils/tailwind";
import { forwardRef, InputHTMLAttributes } from "react";

export const inputVariants = cva({
	variants: {},
	defaultVariants: {},
});

export interface InputProps
	extends InputHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof inputVariants> {}

const Input = ({ className }: InputProps) => {
	return (
		<input type="text" className={cn("panel outline-none py-1.5", className)} />
	);
};

Input.displayName = "Input";

export default Input;
