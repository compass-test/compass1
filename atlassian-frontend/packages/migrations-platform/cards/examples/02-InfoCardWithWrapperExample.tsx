import React from 'react';

import Button from '@atlaskit/button/standard-button';

import { CardsWrapper, InfoCard } from '../src';

export default function InfoCardWithWrapperExample() {
  return (
    <div style={{ width: '600px', margin: '1% auto' }}>
      <CardsWrapper>
        <InfoCard
          title="Ipsum"
          imageUrl="https://loremflickr.com/320/240"
          name={'PLAN'}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus
          massa et ex pretium, quis faucibus est mattis.
          <div style={{ marginTop: '10px' }}>
            <Button>Plan Migrations</Button>
          </div>
        </InfoCard>
        <InfoCard
          title="Ipsum"
          imageUrl="https://loremflickr.com/320/240"
          name={'MANAGE'}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus
          massa et ex pretium, quis faucibus est mattis.
          <div style={{ marginTop: '10px' }}>
            <Button appearance="primary">Manage Migrations</Button>
          </div>
        </InfoCard>
      </CardsWrapper>
    </div>
  );
}
