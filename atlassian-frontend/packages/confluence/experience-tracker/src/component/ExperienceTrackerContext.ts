import { createContext } from 'react';

import { ExperienceTrackerAPI } from '../ExperienceTracker';

export const ExperienceTrackerContext = createContext<ExperienceTrackerAPI>({
  abort() {},
  fail() {},
  start() {},
  succeed() {},
  stopOnError() {},
  subscribe() {
    return () => {};
  },
});
