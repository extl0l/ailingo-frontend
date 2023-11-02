export interface LargeStudySetCardProps {
  studySet: StudySetDetails;
  description?: string;
  learnedWords: number;
}

export interface StudySetDetails {
  readonly id: string;
  title: string;
  icon: string;
  color: string;
  totalWords: number;
}

export const LargeStudySetCard = (props: LargeStudySetCardProps) => {
  const {title, color, icon, totalWords} = props.studySet;
  const {description, learnedWords} = props;

  const wordsPlural = totalWords === 1 ? 'word' : 'words';

  // TODO: Adjust colors automatically
  const backgroundColor = color;
  const foregroundColor = 'hsla(57, 76%, 95%, 1)';

  return (
      <article
          className="w-full p-3 rounded-xl font-medium"
          style={{
            backgroundColor: backgroundColor,
            color: foregroundColor,
          }}
      >
        <div className="flex gap-3 items-center mb-3">
          <div
              className="w-20 h-20 rounded-xl flex items-center justify-center"
              style={{
                backgroundColor: foregroundColor,
              }}
          >
            <img className="w-10 h-10" src={icon} alt=""/>
          </div>
          <div>
            <p className="text-xl">{title}</p>
            <p className="opacity-75">{description}</p>
          </div>
        </div>
        <ProgressBar max={totalWords} value={learnedWords}
                     color={foregroundColor}/>
        <p className="mt-1 ml-1 opacity-75">{learnedWords} of {totalWords} {wordsPlural}</p>
      </article>
  );
};

interface ProgressBarProps {
  max: number;
  value: number;
  color: string;
}

const ProgressBar = (props: ProgressBarProps) => {
  const rawProgress = props.max === 0 ? 0 : props.value / props.max;
  const percentage = clamp(0, 1, rawProgress) * 100;

  return (
      <div className="w-full relative">
        <div
            className="w-full h-4 rounded-full opacity-20 absolute top-1/2 left-0 -translate-y-1/2"
            style={{backgroundColor: props.color}}/>
        <div className="h-6 rounded-full"
             style={{backgroundColor: props.color, width: `${percentage}%`}}/>
      </div>
  );
};

const clamp = (low: number, high: number, value: number) => {
  return Math.max(low, Math.min(high, value));
};