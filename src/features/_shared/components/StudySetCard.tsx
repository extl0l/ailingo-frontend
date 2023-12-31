import { cn } from "../../../utils/tailwind.ts";
import { CSSProperties, useMemo, useState } from "react";
import { Glyph } from "./Glyph.tsx";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import { StarIcon as StarIconFill } from "@heroicons/react/24/solid";
import useAuthQuery from "../../../hooks/useAuthQuery.ts";
import { useAuth } from "@clerk/clerk-react";
import { getIconPath } from "../utils/icons.ts";

export interface StudySetCardProps {
  id: string;
  name: string;
  icon: string;
  color: string;
  authorUsername: string;
  starred?: boolean;
  featured?: boolean;
  progress?: StudySetProgress;
}

export interface StudySetProgress {
  totalWords: number;
  learnedWords: number;
}

export const StudySetCard = (props: StudySetCardProps) => {
  const {
    name,
    icon,
    color,
    authorUsername,
    featured,
    progress,
    id,
    starred = false,
  } = props;

  return (
    <article
      className="font-medium text-theme-brown-light p-3 rounded-xl bg-theme-background-light-variant w-full sm:max-w-3xl"
      style={featured ? { backgroundColor: color } : {}}
    >
      <StudySetCardDetails
        id={id}
        starred={starred}
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
  id: string;
  title: string;
  icon: string;
  color: string;
  starred: boolean;
  authorUsername: string;
  featured?: boolean;
}

const StudySetCardDetails = (props: StudySetCardDetailsProps) => {
  const [isStarred, setIsStarred] = useState(props.starred);

  const { isSignedIn } = useAuth();

  const { queryFn } = useAuthQuery({
    endpoint: `/me/study-sets/starred`,
    body: {
      id: +props.id,
    },
    method: "POST",
  });

  const { queryFn: queryDelete } = useAuthQuery({
    endpoint: `/me/study-sets/starred/${props.id}`,
    method: "DELETE",
  });

  const starClickHandle = (event: React.MouseEvent<SVGSVGElement>) => {
    event.stopPropagation();
    event.preventDefault();

    if (isStarred) {
      queryDelete();
    } else {
      queryFn();
    }

    setIsStarred((prev) => !prev);
  };

  const { title, icon, color, featured, authorUsername } = props;

  const textColor = featured
    ? "text-theme-background-light"
    : "text-theme-brown-light";

  const authorTextOpacity = featured ? "opacity-75" : "opacity-50";

  return (
    <div className="relative">
      {isSignedIn && (
        <div className="absolute right-1.5 top-1.5 w-5 h-5">
          {isStarred ? (
            <StarIconFill
              className="fill-yellow-500"
              onClick={starClickHandle}
            />
          ) : (
            <StarIconOutline onClick={starClickHandle} />
          )}
        </div>
      )}
      <div className={cn("flex items-center gap-2.5 ", textColor)}>
        <Cover icon={icon} color={color} featured={featured} />
        <div>
          <p className="text-xl">{title}</p>
          <p className={authorTextOpacity}>by {authorUsername}</p>
        </div>
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
      <Glyph src={getIconPath(props.icon)} />
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
