import React from 'react';

import type { AllDayContentArg } from '@atlassian/fullcalendar-common';

export type AllDayContentProps = Pick<AllDayContentArg, 'text'>;

export const useAllDayContent = () =>
  function AllDayContent({ text }: AllDayContentProps) {
    return <>{text}</>;
  };
