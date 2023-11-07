import { FocusEvent, FormEvent, KeyboardEvent, useEffect, useRef } from "react";
import { cn } from "../../../utils/tailwind.ts";

interface EditableTextProps {
  value: string;
  onChange?: (newValue: string) => void;
  editable?: boolean;
  onSubmit?: (value: string) => void;
  className?: string;
}

export const EditableText = (props: EditableTextProps) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Due to internal handling of contentEditable elements,
    // updating their content in controlled style sometimes causes weird behavior.
    // The best workaround is to update their content only when needed.
    const spanElement = ref.current;
    const contentDiffers = props.value !== spanElement?.innerText;
    if (spanElement && contentDiffers) {
      spanElement.innerText = props.value;
    }
  }, [props.value]);

  const handleInput = (event: FormEvent<HTMLSpanElement>) => {
    const value = event.currentTarget.innerText;
    props.onChange?.(value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLSpanElement>) => {
    if (event.key === "Enter") {
      ref.current?.blur();
    }
  };

  const handleBlur = (event: FocusEvent<HTMLSpanElement, Element>) => {
    const value = event.target.innerText;
    props.onSubmit?.(value);
  };

  return (
    <span
      className={cn("min-w-[1ch] inline-block outline-0", props.className)}
      ref={ref}
      onInput={handleInput}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      contentEditable={props.editable}
      spellCheck
    />
  );
};
