import { BMEventsType } from '../types';

export type HistogramConfig = {
  [BMEventsType.PAGE_LOAD]?: {
    initial: {
      fmp: string;
      tti: string;
    };
    transition: {
      fmp: string;
      tti: string;
    };
  };
  [BMEventsType.INLINE_RESULT]?: {
    result: string;
    response: string;
  };
  [BMEventsType.CUSTOM]?: {
    duration: string;
  };
};
