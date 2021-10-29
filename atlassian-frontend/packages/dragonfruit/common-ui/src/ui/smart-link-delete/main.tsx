import React from 'react';

import Button from '@atlaskit/button';
import EditorCloseIcon from '@atlaskit/icon/glyph/editor/close';

import {
  default as SmartLink,
  Props as SmartLinkProps,
} from '../../common/ui/smart-link';

import {
  ButtonWrapper,
  ListItemWrapper,
  SmartLinkWrapper,
  Wrapper,
} from './styled';

const deleteIcon = <EditorCloseIcon label="" size="small" />;

type SmartLinkCardDelete = SmartLinkProps & {
  onDelete?: () => void;
  isDisabled?: boolean;
};

/**
 * Smart link item with an optional delete action
 * Intended to be used inside a List > List.Item
 */
export function SmartLinkDelete(props: SmartLinkCardDelete) {
  const { onDelete, isDisabled = false, ...forwardProps } = props;

  return (
    <Wrapper>
      <ListItemWrapper>
        <SmartLinkWrapper>
          <SmartLink {...forwardProps} />
        </SmartLinkWrapper>
        {onDelete && !isDisabled && (
          <ButtonWrapper>
            <Button iconBefore={deleteIcon} onClick={onDelete} spacing="none" />
          </ButtonWrapper>
        )}
      </ListItemWrapper>
    </Wrapper>
  );
}
