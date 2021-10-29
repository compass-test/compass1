import { Experiences } from './types';

const RENDER_NOTIFICATIONS_WITHOUT_CONTENT_TIMEOUT = 8000;
const RENDER_NOTIFICATIONS_WITH_CONTENT_TIMEOUT = 15000;

export const getExperienceTimeout = (experience: Experiences): number => {
  if (experience === Experiences.RENDER_NOTIFICATIONS_WITH_CONTENT) {
    return RENDER_NOTIFICATIONS_WITH_CONTENT_TIMEOUT;
  }
  if (experience === Experiences.RENDER_NOTIFICATIONS_WITHOUT_CONTENT) {
    return RENDER_NOTIFICATIONS_WITHOUT_CONTENT_TIMEOUT;
  }
  return 10000;
};
