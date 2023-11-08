import { ChangeEvent, useEffect, useState } from "react";

export interface ColorPickerProps {
  color: string;
  onSelect?: (newColor: string) => void;
  editable?: boolean;
}

export const ColorPicker = (props: ColorPickerProps) => {
  const [value, setValue] = useState(props.color);

  useEffect(() => {
    setValue(props.color);
  }, [props.color]);

  const handleColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
  };

  const handleBlur = () => {
    props.onSelect?.(value);
  };

  return (
    <input
      className="absolute top-4 right-4 w-8 h-8 rounded-full border-2 border-theme-background-light cursor-pointer disabled:cursor-default"
      type="color"
      value={value}
      onChange={handleColorChange}
      onBlur={handleBlur}
      disabled={!props.editable}
    />
  );
};
