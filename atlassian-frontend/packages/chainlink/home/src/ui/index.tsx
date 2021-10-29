import React from 'react';

import Button from '@atlaskit/button/custom-theme-button';
import { FlagProps, useFlags } from '@atlassian/flags-provider';

import { Container } from './styled';
interface Props {
  name: string;
}

export const Home = ({ name }: Props) => {
  const { showFlag } = useFlags();

  const handleClick = () => {
    const flag: FlagProps = {
      title: 'Well done!',
      description: 'No really. Well done.',
      appearance: 'success',
      isAutoDismiss: true,
    };
    showFlag(flag);
  };

  return (
    <Container>
      <div>Hello {name}!</div>
      <Button onClick={handleClick}>Click me to show a flag!</Button>
    </Container>
  );
};
