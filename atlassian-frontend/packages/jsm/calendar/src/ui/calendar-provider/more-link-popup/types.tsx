import { ComponentType } from 'react';

import { FormatDateOptions } from '@atlassian/fullcalendar-common';

import type {
  EventClickCallback,
  EventContentWrapperProps,
} from '../../../common/types';

export type MoreEvent = EventContentWrapperProps & {
  backgroundColor: string;
  borderColor: string;
};

export interface PopupContentData {
  date: Date;
  events: MoreEvent[];
}

export interface PopupContentProps extends PopupContentData {
  formatDate: (date: Date, options: FormatDateOptions) => string;
  eventClick: EventClickCallback;
  onClose: () => void;
  EventContentWrapper: ComponentType<EventContentWrapperProps>;
}
