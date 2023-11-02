import { cn } from "../../../utils/tailwind.ts";

interface StudySetCoverProps {
  iconUrl: string;

  /**
   * Setting background and/or text color using css classes will change the cover colors.
   * The settings will be overridden if backgroundColor and/or foregroundColor props are set.
   */
  className?: string;

  foregroundColor?: string;
  backgroundColor?: string;
}

export const StudySetCover = (props: StudySetCoverProps) => {
  return (
    <div
      className={cn(
        "w-20 h-20 rounded-xl flex items-center justify-center",
        props.className,
      )}
      style={{
        color: props.foregroundColor,
        backgroundColor: props.backgroundColor,
      }}
    >
      <span
        className="block w-10 h-10 bg-current"
        style={{
          WebkitMask: `url(${props.iconUrl}) center center no-repeat`,
          mask: `url(${props.iconUrl}) center center no-repeat`,
          WebkitMaskSize: "contain",
          maskSize: "contain",
        }}
      />
    </div>
  );
};
