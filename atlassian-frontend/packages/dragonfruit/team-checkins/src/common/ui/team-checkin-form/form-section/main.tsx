import React from 'react';

import { Description, Section, Title } from './styled';

interface Props {
  title?: string;
  description?: string;
}

export const FormSection: React.FC<Props> = ({
  title,
  description,
  children,
}) => {
  return (
    <Section>
      {title && <Title>{title}</Title>}
      {description && <Description>{description}</Description>}
      {children}
    </Section>
  );
};
