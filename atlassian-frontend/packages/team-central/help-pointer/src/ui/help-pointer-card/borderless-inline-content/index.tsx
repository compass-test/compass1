import React, { ReactElement } from 'react';

import { Emoji, EmojiDescription } from '@atlaskit/emoji';
import SuitcaseIcon from '@atlaskit/icon/glyph/suitcase';
import { token } from '@atlaskit/tokens';
import Tooltip from '@atlaskit/tooltip';

import { HelpPointerCyan } from '../../../common/utils/icon-color';
import { HelpPointerIcon, HelpPointerOwner } from '../../../types';

import { Content, Description, IconWrapper, Owner, Title } from './styled';

export type Props = {
  editable?: boolean;
  description?: string;
  name: string;
  highlightedName: ReactElement;
  highlightedDescription: ReactElement;
  icon?: HelpPointerIcon;
  emojiIcon?: EmojiDescription;
  owner?: HelpPointerOwner;
  showOwner?: boolean;
  helpPointerActions: ReactElement;
  matchingTags?: ReactElement[]; // Currently unused
};

const BorderlessContent = (props: Props) => {
  const {
    name,
    editable,
    description,
    highlightedName,
    highlightedDescription,
    icon,
    emojiIcon,
    owner,
    showOwner,
    helpPointerActions,
  } = props;

  return (
    <>
      <IconWrapper color={icon?.color || HelpPointerCyan}>
        {emojiIcon ? (
          <Emoji emoji={emojiIcon} fitToHeight={20} />
        ) : (
          <SuitcaseIcon
            label="Help pointer"
            size="large"
            primaryColor={token('color.accent.boldTeal', '#068DA2')}
          />
        )}
      </IconWrapper>
      <Content>
        <Title>
          <Tooltip
            content={name}
            position="mouse"
            mousePosition="top"
            delay={500}
          >
            {highlightedName}
          </Tooltip>
        </Title>
        {description && (
          <Description descriptionLineCount={1}>
            <Tooltip
              content={description}
              position="mouse"
              mousePosition="top"
              delay={500}
            >
              {highlightedDescription}
            </Tooltip>
          </Description>
        )}
        {showOwner && owner && <Owner>{owner.displayName}</Owner>}
      </Content>
      {editable && helpPointerActions}
    </>
  );
};

export default BorderlessContent;
