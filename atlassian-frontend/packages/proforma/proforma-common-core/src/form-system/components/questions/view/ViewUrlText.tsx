import React, { FC } from 'react';

import { isSafeUrl } from '@atlaskit/adf-schema';

import { TextfieldDisabledWrapper } from '../common/questionWrappers';

type ViewUrlTextProps = {
  id: string;
  value?: string;
};

export const ViewUrlText: FC<ViewUrlTextProps> = ({ value }) => {
  return (
    <TextfieldDisabledWrapper>
      <div>
        {value !== undefined && isSafeUrl(value) ? (
          <a href={value} target="_blank" rel="noopener noreferrer">
            {value}
          </a>
        ) : (
          value
        )}
      </div>
    </TextfieldDisabledWrapper>
  );
};
