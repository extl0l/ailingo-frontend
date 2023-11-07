import { cn } from "../../../utils/tailwind.ts";
import { CSSProperties, useMemo } from "react";
import { Glyph } from "./Glyph.tsx";

export interface StudySetCardProps {
  name: string;
  icon: string;
  color: string;
  authorUsername: string;
  featured?: boolean;
  progress?: StudySetProgress;
}

export interface StudySetProgress {
  totalWords: number;
  learnedWords: number;
}

export const StudySetCard = (props: StudySetCardProps) => {
  const { name, icon, color, authorUsername, featured, progress } = props;

  return (
    <article
      className="font-medium text-theme-brown-light p-3 rounded-xl bg-theme-background-light-variant w-full sm:max-w-3xl"
      style={featured ? { backgroundColor: color } : {}}
    >
      <StudySetCardDetails
        title={name}
        icon={icon}
        color={color}
        authorUsername={authorUsername}
        featured={featured}
      />
      {progress && (
        <StudySetCardProgressDetails
          progress={progress}
          color={color}
          featured={featured}
        />
      )}
    </article>
  );
};

interface StudySetCardDetailsProps {
  title: string;
  icon: string;
  color: string;
  authorUsername: string;
  featured?: boolean;
}

const StudySetCardDetails = (props: StudySetCardDetailsProps) => {
  const { title, icon, color, featured, authorUsername } = props;

  const textColor = featured
    ? "text-theme-background-light"
    : "text-theme-brown-light";

  const authorTextOpacity = featured ? "opacity-75" : "opacity-50";

  return (
    <div className={cn("flex items-center gap-2.5", textColor)}>
      <Cover icon={icon} color={color} featured={featured} />
      <div>
        <p className="text-xl">{title}</p>
        <p className={authorTextOpacity}>by {authorUsername}</p>
      </div>
    </div>
  );
};

interface CoverProps {
  icon: string;
  color: string;
  featured?: boolean;
}

const Cover = (props: CoverProps) => {
  const style: CSSProperties = useMemo(() => {
    if (props.featured) return { color: props.color };
    return { backgroundColor: props.color };
  }, [props.featured, props.color]);

  return (
    <div
      className="w-20 h-20 rounded-xl flex items-center justify-center bg-theme-background-light text-theme-background-light-variant"
      style={style}
    >
      <Glyph src={props.icon} />
    </div>
  );
};

interface StudySetCardProgressDetailsProps {
  progress: StudySetProgress;
  color: string;
  featured?: boolean;
}

const StudySetCardProgressDetails = (
  props: StudySetCardProgressDetailsProps,
) => {
  const { learnedWords, totalWords } = props.progress;

  const textColor = props.featured
    ? "text-theme-background-light"
    : "text-theme-brown-light";

  return (
    <div className="mt-3">
      <ProgressBar
        max={totalWords}
        value={learnedWords}
        color={props.color}
        featured={props.featured}
      />
      <p className={cn("mt-1 ml-1 opacity-75", textColor)}>
        {learnedWords} of {totalWords}
      </p>
    </div>
  );
};

interface ProgressBarProps {
  max: number;
  value: number;
  color: string;
  featured?: boolean;
}

const ProgressBar = (props: ProgressBarProps) => {
  const rawProgress = props.max === 0 ? 0 : props.value / props.max;
  const percentage = clamp(0, 1, rawProgress) * 100;

  const backgroundColor = props.featured ? undefined : props.color;

  return (
    <div className="w-full relative">
      <div
        className="w-full h-4 rounded-full opacity-20 absolute top-1/2 left-0 -translate-y-1/2 bg-theme-background-light"
        style={{ backgroundColor }}
      />
      <div
        className="h-6 rounded-full min-w-[1.5rem] bg-theme-background-light"
        style={{ backgroundColor, width: `${percentage}%` }}
      />
    </div>
  );
};

const clamp = (low: number, high: number, value: number) => {
  return Math.max(low, Math.min(high, value));
};
