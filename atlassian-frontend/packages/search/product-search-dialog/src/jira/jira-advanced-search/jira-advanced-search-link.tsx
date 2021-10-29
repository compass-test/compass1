import React from 'react';
import { StyledButton } from './jira-advanced-search.styled';

interface Props {
  href: string;
  dataTestId: string;
  children?: React.ReactElement;
  onClick: (
    href: string,
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
  ) => void;
}

export const JiraAdvancedSearchLink = ({
  href,
  onClick,
  children,
  dataTestId,
}: Props) => {
  return (
    <StyledButton
      data-test-id={dataTestId}
      spacing="compact"
      href={href}
      onClick={(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        e.preventDefault();
        onClick(href, e);
      }}
    >
      {children}
    </StyledButton>
  );
};
