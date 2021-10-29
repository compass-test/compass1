import checkImg from '../../assets/check.png';
import chooseImg from '../../assets/choose.png';
import cloudImg from '../../assets/cloud.png';
import migrateImg from '../../assets/migrate.png';
import reviewImg from '../../assets/review.png';
import { messages } from '../how-it-works/messages';

import type { Step } from './index';

export const steps: Step[] = [
  {
    key: '1',
    img: cloudImg,
    title: 'Connect to cloud',
    description: 'Connect to a new or existing Atlassian cloud site.',
  },
  {
    key: '2',
    img: chooseImg,
    title: 'Choose what to migrate',
    description:
      'You can migrate everything at once or break it up into different stages.',
  },
  {
    key: '3',
    img: checkImg,
    title: 'Check for errors',
    description:
      "We'll check for any errors or conflicts so you can resolve them before you migrate.",
  },
  {
    key: '4',
    img: reviewImg,
    title: 'Review',
    description: "Review what you're planning to migrate.",
  },
  {
    key: '5',
    img: migrateImg,
    title: 'Migrate now or later',
    description: 'Run your migration straight away or save it to run later.',
  },
];

export const formattedSteps: Step[] = [
  {
    key: '1',
    img: cloudImg,
    title: messages.connectToCloudHeading,
    description: messages.connectToCloudDescription,
  },
  {
    key: '2',
    img: chooseImg,
    title: messages.chooseWhatToMigrateHeading,
    description: messages.chooseWhatToMigrateDescription,
  },
  {
    key: '3',
    img: checkImg,
    title: messages.checkForErrorsHeading,
    description: messages.checkForErrorsDescription,
  },
  {
    key: '4',
    img: reviewImg,
    title: messages.reviewHeading,
    description: messages.reviewDescription,
  },
];
