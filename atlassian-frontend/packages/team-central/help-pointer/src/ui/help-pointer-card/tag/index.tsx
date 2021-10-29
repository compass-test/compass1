import React, { ReactElement } from 'react';

import { SimpleTag, TagColor } from '@atlaskit/tag';

import { getTagColor } from '../../../common/utils/tag-coloring';

import { TagContentWrapper, TagWrapper } from './styled';

export type Props = {
  name: string;
  highlightedContent: ReactElement;
  color?: TagColor;
  elemBefore?: ReactElement;
  tagClickCallback?: (tagValue: string) => void;
};

const HelpPointerTag = (props: Props) => {
  const {
    name,
    highlightedContent,
    color,
    elemBefore,
    tagClickCallback,
  } = props;

  return (
    <TagWrapper
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        tagClickCallback && tagClickCallback(name);
      }}
    >
      <SimpleTag
        text={name}
        color={color ? color : getTagColor(name)}
        href="#"
        linkComponent={() => (
          <TagContentWrapper elemBeforeExists={elemBefore != null}>
            {highlightedContent}
          </TagContentWrapper>
        )}
        elemBefore={elemBefore}
      />
    </TagWrapper>
  );
};

export default HelpPointerTag;
