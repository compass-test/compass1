import React, { ReactElement, useCallback, useState } from 'react';

import useClipboard from 'react-use-clipboard';

import CopyIcon from '@atlaskit/icon/glyph/copy';
import { G300 } from '@atlaskit/theme/colors';
import Tooltip from '@atlaskit/tooltip';

import { IconWrapper, StyledEventKey } from './styled';

type Props = {
  eventKey: string;
};

type TooltipComponentProps = {
  isCopied: boolean;
  children: ReactElement;
};

const TooltipComponent = ({
  isCopied,
  children,
}: TooltipComponentProps): ReactElement => {
  if (isCopied) {
    return (
      <Tooltip content={'Copied!'} delay={0}>
        {children}
      </Tooltip>
    );
  }
  return children;
};

export const EventKey = ({ eventKey }: Props) => {
  const [iconState, setIconState] = useState(false);
  const showIcon = useCallback(() => {
    setIconState(true);
  }, [setIconState]);

  const hideIcon = useCallback(() => {
    setIconState(false);
  }, [setIconState]);

  const [isCopied, setCopied] = useClipboard(eventKey, {
    successDuration: 1000,
  });

  return (
    <TooltipComponent isCopied={isCopied}>
      <StyledEventKey
        onMouseOver={showIcon}
        onMouseOut={hideIcon}
        onClick={setCopied}
      >
        <span>{eventKey}</span>
        <IconWrapper iconState={iconState}>
          <CopyIcon
            size={'small'}
            label={'Copy metric key'}
            primaryColor={isCopied ? G300 : undefined}
          />
        </IconWrapper>
      </StyledEventKey>
    </TooltipComponent>
  );
};
