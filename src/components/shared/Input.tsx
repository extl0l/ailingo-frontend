import { VariantProps, cva } from "class-variance-authority";
import { cn } from "../../utils/tailwind";
import { forwardRef, InputHTMLAttributes } from "react";

export const inputVariants = cva({
    variants:{},
    defaultVariants:{}
});

export interface InputProps
	extends InputHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof inputVariants> {}

const Input = ()=>{
    return <>
        <input type="text"/>
    </>
}

Input.displayName = "Input";


export default Input