import React, { FC, useEffect, useState } from 'react';

import CollapsibleContent from '../../common/ui/collapsible-content';
import DropdownButton from '../../common/ui/dropdown-button';

import {
  ButtonWrapper,
  Heading,
  HeadingWrapper,
  StatusIconWrapper,
  Wrapper,
} from './styled';

export type Props = {
  heading: React.ReactNode;
  icon: React.ReactNode;
  testId?: string;
  collapseOnChangeOf?: string;
  defaultIsOpen?: boolean;
};

const CollapsibleCloud: FC<Props> = ({
  heading,
  icon,
  defaultIsOpen = false,
  testId,
  collapseOnChangeOf,
  children,
}) => {
  const [isOpen, setOpen] = useState<boolean>(defaultIsOpen);
  const onClick = () => setOpen(!isOpen);

  // reset dropdown state when the prop collapseOnChangeOf changes or children changes
  useEffect(() => {
    setOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collapseOnChangeOf || children]);

  return (
    <Wrapper data-testid={testId}>
      <HeadingWrapper>
        <StatusIconWrapper>{icon}</StatusIconWrapper>
        <Heading>{heading}</Heading>
        {children && (
          <ButtonWrapper>
            <DropdownButton onClick={onClick} isOpen={isOpen} />
          </ButtonWrapper>
        )}
      </HeadingWrapper>
      <CollapsibleContent isOpen={isOpen}>{children}</CollapsibleContent>
    </Wrapper>
  );
};

export default CollapsibleCloud;
