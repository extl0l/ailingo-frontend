import {
  FeaturedStudySetDetails,
  Feed,
  FeedSection,
} from '../features/feed/Feed.tsx';
import SomeIcon
  from '../features/navigation/assets/keyboard_double_arrow_up_FILL0_wght400_GRAD0_opsz24.svg';
import {StudySetDetails} from '../features/feed/models/StudySetDetails.ts';

const continueLearningStudySets: (StudySetDetails & FeaturedStudySetDetails)[] = [
  {
    id: 'su-3',
    title: 'Home furnishings',
    color: '#554236',
    icon: SomeIcon,
    author: 'Furnitea',
    aiGenerated: false,
    totalWords: 140,
    learnedWords: 53,
    description: 'Studied 2h ago',
  },
  {
    id: 'su-1',
    title: 'At the airport',
    color: '#D3CE3D',
    icon: SomeIcon,
    author: 'AI-r',
    aiGenerated: false,
    totalWords: 154,
    learnedWords: 130,
    description: 'Studied this morning',
  },
];

const sections: FeedSection[] = [
  {
    title: 'Suggested',
    description: 'Recently studied "Home furnishings"',
    cards: [
      {
        id: 'su-0',
        title: 'Gardening',
        color: '#60B99A',
        icon: SomeIcon,
        author: '',
        aiGenerated: true,
        totalWords: 110,
      },
      {
        id: 'su-1',
        title: 'At the airport',
        color: '#D3CE3D',
        icon: SomeIcon,
        author: 'AI-r',
        aiGenerated: false,
        totalWords: 154,
      },
      {
        id: 'su-2',
        title: 'Fix your car',
        color: '#F77825',
        icon: SomeIcon,
        author: 'Descend',
        aiGenerated: false,
        totalWords: 48,
      },
      {
        id: 'su-3',
        title: 'Home furnishings',
        color: '#554236',
        icon: SomeIcon,
        author: 'Furnitea',
        aiGenerated: false,
        totalWords: 140,
      },

    ],
  },
];

export const HomePage = () => {
  return <Feed continueLearningStudySets={continueLearningStudySets}
               sections={sections}/>;
};