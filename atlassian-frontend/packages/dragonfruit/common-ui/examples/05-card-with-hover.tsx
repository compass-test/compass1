import React from 'react';

import { Card, CardBody } from '../src';

export default function Hover() {
  return (
    <Card shadowOnHover={true}>
      <CardBody>This is some information inside the card</CardBody>
    </Card>
  );
}
