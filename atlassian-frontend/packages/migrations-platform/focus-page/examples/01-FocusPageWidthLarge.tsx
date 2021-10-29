import React from 'react';

import { ProgressTracker, Stages } from '@atlaskit/progress-tracker';
import {
  BackButton,
  AnalyticsButton as Button,
  ContinueButton,
} from '@atlassian/mpt-elements';

import { action } from '../example-helpers/story-utils';
import FocusPage from '../src';

const items: Stages = [
  {
    id: 'disabled-1',
    label: 'Connect',
    percentageComplete: 100,
    status: 'disabled',
    href: '#',
  },
  {
    id: 'visited-1',
    label: 'Choose',
    percentageComplete: 50,
    status: 'visited',
    href: '#',
  },
  {
    id: 'current-1',
    label: 'Check',
    percentageComplete: 0,
    status: 'current',
    href: '#',
  },
];

const fakeContent = new Array(3)
  .fill(
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tincidunt lorem eget nunc vulputate tristique at sed felis. Sed faucibus pretium libero porta tincidunt. Duis posuere magna non blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce accumsan ut tortor sit amet posuere. Aliquam suscipit neque laoreet tortor gravida, in egestas tortor bibendum. `,
  )
  // eslint-disable-next-line react/no-array-index-key
  .map((content, i) => <p key={i}>{content}</p>);

const progress = (
  <div style={{ width: '700px' }}>
    <ProgressTracker items={items} />
  </div>
);

const footerButtons = [
  <BackButton key="1" onClick={action('FocusPage.onClose')} />,
  <ContinueButton key="2">Next</ContinueButton>,
];

export default function FocusPageWidthLarge() {
  return (
    <FocusPage
      progress={progress}
      title="My focus page"
      subtitle={
        <span>
          Lorem ipsum dolor sit amet, <strong>consectetur adipiscing</strong>{' '}
          elit.
        </span>
      }
      onClose={action('FocusPage.onClose')}
      headerButtons={[
        <Button key="1">Button #1</Button>,
        <Button key="2">Button #2</Button>,
      ]}
      footerButtons={footerButtons}
      width="large"
    >
      {fakeContent.slice(0, 3)}
    </FocusPage>
  );
}
