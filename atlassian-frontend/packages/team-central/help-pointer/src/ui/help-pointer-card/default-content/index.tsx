import React, { ReactElement } from 'react';

import { Emoji, EmojiDescription } from '@atlaskit/emoji';
import SuitcaseIcon from '@atlaskit/icon/glyph/suitcase';
import { token } from '@atlaskit/tokens';

import { HelpPointerCyan } from '../../../common/utils/icon-color';
import { HelpPointerIcon, HelpPointerOwner } from '../../../types';

import {
  Content,
  Description,
  HelpCardHeader,
  IconWrapper,
  TagGroup,
  Title,
} from './styled';

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
  matchingTags?: ReactElement[];
};

const DefaultContent = (props: Props) => {
  const {
    editable,
    highlightedName,
    highlightedDescription,
    icon,
    emojiIcon,
    helpPointerActions,
    matchingTags,
  } = props;
  return (
    <>
      <HelpCardHeader>
        <IconWrapper color={icon?.color || HelpPointerCyan}>
          {emojiIcon ? (
            <Emoji emoji={emojiIcon} fitToHeight={12} />
          ) : (
            <SuitcaseIcon
              label="Help pointer"
              size="large"
              primaryColor={token('color.accent.boldTeal', '#068DA2')}
            />
          )}
        </IconWrapper>
        <Title>
          <span>{highlightedName}</span>
        </Title>
        {editable && helpPointerActions}
      </HelpCardHeader>
      <Content>
        <Description>
          <span>{highlightedDescription}</span>
        </Description>
        {matchingTags && (
          <TagGroup>{matchingTags.map((matchingTag) => matchingTag)}</TagGroup>
        )}
      </Content>
    </>
  );
};

export default DefaultContent;
