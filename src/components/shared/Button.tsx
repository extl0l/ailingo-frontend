import { VariantProps, cva } from "class-variance-authority";
import { cn } from "../../utils/tailwind";
import { forwardRef, ButtonHTMLAttributes } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const buttonVariants = cva(
	"text-theme-brown-light inline-flex transition hover:transition px-3.5 py-1.5 items-center justify-center rounded-md transition-colors focus:outline-none disabled:opacity-50  disabled:pointer-events-none  data-[state=open]:bg-slate-100",
	{
		variants: {
			variant: {
				outline: "border-2 border-theme-brown-light hover:bg-theme-brown-lighter",
				fill: "border-none",
			},
			rounded: {
				full: "rounded-full",
				md: "rounded-md",
				none: "rounded-none",
			},
			buttonStyle: {
				yellow: "bg-theme-yellow-primary text-theme-font-dark",
				blue: "bg-theme-blue-tertiary text-theme-font-light",
				transparent: "bg-transparent text-theme-brown-light",
				brown: "bg-theme-brown-light",
			},
		},
		defaultVariants: {
			variant: "outline",
			rounded: "md",
			buttonStyle: "transparent",
		},
	}
);

export interface ButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, children, variant, rounded, buttonStyle, ...props }, ref) => {
		return (
			<button
				className={cn(buttonVariants({ variant, rounded, buttonStyle, className }))}
				ref={ref}
				{...props}>
				{children}
			</button>
		);
	}
);
Button.displayName = "Button";

export default Button;
