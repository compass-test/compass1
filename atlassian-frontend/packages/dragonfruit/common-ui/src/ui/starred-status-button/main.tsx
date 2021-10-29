import React from 'react';

import Button from '@atlaskit/button';
import StarIcon from '@atlaskit/icon/glyph/star';
import StarFilledIcon from '@atlaskit/icon/glyph/star-filled';
import { N50, Y300 } from '@atlaskit/theme/colors';
import Tooltip from '@atlaskit/tooltip';
import { useIntl } from '@atlassian/dragonfruit-utils';

import message from './messages';
import { btnStyle } from './styled';
import { Props } from './types';

export const StarredStatusButton = (props: Props) => {
  const { formatMessage } = useIntl();

  return (
    <Button
      onClick={props.onClick}
      appearance={props.appearance}
      style={btnStyle}
    >
      {props.isStarred ? (
        <Tooltip content={formatMessage(message.unstarThis)}>
          <StarFilledIcon
            label="Starred Icon"
            size={props.size}
            primaryColor={Y300}
          />
        </Tooltip>
      ) : (
        <Tooltip content={formatMessage(message.starThis)}>
          <StarIcon
            label="Unstarred Icon"
            size={props.size}
            primaryColor={N50}
          />
        </Tooltip>
      )}
    </Button>
  );
};
