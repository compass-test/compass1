import React, { FC, MouseEventHandler } from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';

import ChevronDownIcon from '@atlaskit/icon/glyph/chevron-down';

import { messages } from './messages';
import { Button, IconWrapper } from './styled';

type Props = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  isOpen: boolean;
} & InjectedIntlProps;

const DropdownButton: FC<Props> = ({ onClick, isOpen, intl }) => {
  return (
    // TODO: Use AK Button
    <Button role="button" onClick={onClick} aria-expanded={isOpen}>
      <IconWrapper isOpen={isOpen}>
        <ChevronDownIcon
          label={
            isOpen
              ? intl.formatMessage(messages.close)
              : intl.formatMessage(messages.open)
          }
          size="large"
        />
      </IconWrapper>
    </Button>
  );
};

export default injectIntl(DropdownButton);
