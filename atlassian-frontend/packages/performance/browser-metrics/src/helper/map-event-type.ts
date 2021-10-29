import { BMEventsType, StorableBMEventsType } from '../types';

export const mapEventType = (type: BMEventsType) => {
  switch (type) {
    case BMEventsType.CUSTOM:
      return StorableBMEventsType.CUSTOM;
    case BMEventsType.INLINE_RESULT:
      return StorableBMEventsType.INLINE_RESULT;
    case BMEventsType.PAGE_LOAD:
      return StorableBMEventsType.PAGE_LOAD;
    case BMEventsType.PAGE_SEGMENT_LOAD:
      return StorableBMEventsType.PAGE_SEGMENT_LOAD;
    case BMEventsType.WEB_VITALS:
      return StorableBMEventsType.WEB_VITALS;
    default:
      return 'unknown';
  }
};
