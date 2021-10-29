import React from 'react';

import { AnnouncementListItem } from './list-item';
import { Container, List, Title } from './styled';

type ListProps = {
  testId?: string;
  title?: string;
  children: React.ReactNode;
};

function AnnouncementList(props: ListProps) {
  return (
    <Container>
      {props.title && <Title>{props.title}</Title>}
      <List data-testid={props.testId}>{props.children}</List>
    </Container>
  );
}

AnnouncementList.Item = AnnouncementListItem;

export default AnnouncementList;
