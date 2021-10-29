import React from 'react';
import { InjectedIntl, FormattedMessage, injectIntl } from 'react-intl';
import { gridSize } from '@atlaskit/theme/constants';

import { Avatar, isSingleAvatar } from '../../clients/response-types';

interface Props {
  avatar: Avatar;
  alt: string | FormattedMessage.MessageDescriptor;
  isCollapsed?: boolean;
}

interface IntlProps {
  intl: InjectedIntl;
}

const SMALL_SIZE = `${gridSize() * 2}px`;
const MEDIUM_SIZE = `${gridSize() * 3}px`;

export function Icon({
  avatar,
  alt,
  intl: { formatMessage },
  isCollapsed,
}: Props & IntlProps) {
  // Wrapping span below is to avoid issue with image not sized properly for post-query images loaded later
  return (
    <span>
      <img
        src={
          isSingleAvatar(avatar)
            ? avatar.url
            : avatar.urls[isCollapsed ? '24x24' : '16x16']
        }
        alt={typeof alt === 'string' ? alt : formatMessage(alt)}
        height={isCollapsed ? MEDIUM_SIZE : SMALL_SIZE}
        width={isCollapsed ? MEDIUM_SIZE : SMALL_SIZE}
      />
    </span>
  );
}

export default injectIntl<Props>(Icon);
