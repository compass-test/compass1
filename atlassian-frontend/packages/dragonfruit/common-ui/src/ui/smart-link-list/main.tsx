import React from 'react';

import Button from '@atlaskit/button';
import EditorCloseIcon from '@atlaskit/icon/glyph/editor/close';

import {
  default as SmartLink,
  Props as SmartLinkProps,
} from '../../common/ui/smart-link';

import { ButtonWrapper, SmartLinkWrapper, Wrapper } from './styled';

const deleteIcon = <EditorCloseIcon label="" size="small" />;

type SmartLinkListItemProps = SmartLinkProps & {
  onDelete?: () => void;
  isDisabled?: boolean;
};

/**
 * Smart link item with an optional delete action
 * Intended to be used inside a List > List.Item
 */
export function SmartLinkListItem(props: SmartLinkListItemProps) {
  const { onDelete, isDisabled = false, ...forwardProps } = props;

  return (
    <Wrapper>
      <SmartLinkWrapper>
        <SmartLink {...forwardProps} />
        {onDelete && !isDisabled && (
          <ButtonWrapper>
            <Button iconBefore={deleteIcon} onClick={onDelete} spacing="none" />
          </ButtonWrapper>
        )}
      </SmartLinkWrapper>
    </Wrapper>
  );
}
