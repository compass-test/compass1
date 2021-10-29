import React, { FC, useRef } from 'react';

import Tooltip from '@atlaskit/tooltip';
import { useCreateUIEvent } from '@atlassian/mpt-analytics';

type Props = { property: string; title: string };

const HeadLabel: FC<Props> = ({ children, property, title }) => {
  const createUIEvent = useCreateUIEvent();
  const startTime = useRef<number>();

  return (
    <Tooltip
      content={title}
      position="top"
      tag="span"
      onShow={() => {
        startTime.current = Date.now();
      }}
      onHide={() => {
        if (startTime.current !== undefined) {
          createUIEvent({
            subject: 'Tooltip',
            action: 'Displayed',
            id: `appAssessmentTableCell-${property}`,
            attributes: { value: title, time: Date.now() - startTime.current },
          });
          startTime.current = undefined;
        }
      }}
    >
      {children}
    </Tooltip>
  );
};

export default HeadLabel;
