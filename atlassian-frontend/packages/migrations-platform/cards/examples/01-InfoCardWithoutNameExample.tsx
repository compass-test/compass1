import React from 'react';

import Button from '@atlaskit/button/standard-button';

import { InfoCard } from '../src';

export default function InfoCardWithWrapperExample() {
  return (
    <div style={{ width: '600px', margin: '1% auto' }}>
      <InfoCard title="Ipsum" imageUrl="https://loremflickr.com/320/240">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus
        massa et ex pretium, quis faucibus est mattis.
        <div style={{ marginTop: '10px' }}>
          <Button appearance="primary">Manage Migrations</Button>
        </div>
      </InfoCard>
    </div>
  );
}
