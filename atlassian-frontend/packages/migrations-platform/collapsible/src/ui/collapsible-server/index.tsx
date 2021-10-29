import React, { FC, useEffect, useState } from 'react';

import CollapsibleContent from '../../common/ui/collapsible-content';
import DropdownButton from '../../common/ui/dropdown-button';

import { Heading, Wrapper } from './styled';

export type Props = {
  content: React.ReactNode;
  heading: React.ReactNode;
  testId?: string;
  collapseOnChangeOf?: string;
  defaultIsOpen?: boolean;
};

const CollapsibleServer: FC<Props> = ({
  heading,
  content,
  testId,
  defaultIsOpen = false,
  collapseOnChangeOf,
}) => {
  const [isOpen, setOpen] = useState<boolean>(defaultIsOpen);
  const onClick = () => setOpen(!isOpen);

  // reset dropdown state when the prop collapseOnChangeOf changes or content changes
  useEffect(() => {
    setOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collapseOnChangeOf || content]);

  return (
    <div data-testid={testId}>
      <Wrapper>
        <Heading>{heading}</Heading>
        {content && <DropdownButton onClick={onClick} isOpen={isOpen} />}
      </Wrapper>
      <CollapsibleContent isOpen={isOpen}>{content}</CollapsibleContent>
    </div>
  );
};

export default CollapsibleServer;
