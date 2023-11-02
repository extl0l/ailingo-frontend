import {StudySetDetails} from '../models/StudySetDetails.ts';
import {StudySetCover} from './StudySetCover.tsx';

export interface StudySetCardProps {
  studySet: StudySetDetails;
}

export const StudySetCard = (props: StudySetCardProps) => {
  const {title, author, aiGenerated, color, icon} = props.studySet;

  return (
      <article
          className="w-full p-3 rounded-xl font-medium bg-theme-background-light-variant flex items-center text-theme-brown-light gap-3">
        <StudySetCover className="text-theme-background-light-variant"
                       backgroundColor={color}
                       iconUrl={icon}/>

        <div>
          <p className="text-xl">{title}</p>
          {
            aiGenerated
                ? <p className="text-theme-green-light">AI Generated</p>
                : <p className="opacity-50">by {author}</p>
          }
        </div>
      </article>
  );
};