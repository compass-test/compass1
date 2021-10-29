import React from 'react';

import { BackButton, ContinueButton } from '@atlassian/mpt-elements';

import { action } from '../example-helpers/story-utils';
import FocusPage from '../src';

const fakeContent = new Array(3)
  .fill(
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tincidunt lorem eget nunc vulputate tristique at sed felis. Sed faucibus pretium libero porta tincidunt. Duis posuere magna non blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce accumsan ut tortor sit amet posuere. Aliquam suscipit neque laoreet tortor gravida, in egestas tortor bibendum. `,
  )
  // eslint-disable-next-line react/no-array-index-key
  .map((content, i) => <p key={i}>{content}</p>);

const footerButtons = [
  <BackButton key="1" onClick={action('FocusPage.onClose')} />,
  <ContinueButton key="2">Next</ContinueButton>,
];

const bannerMessage = (
  <span>
    This page is still in beta.{' '}
    <a href="http://example.com" target="_blank" rel="noopener noreferrer">
      More info
    </a>
  </span>
);

export default function FocusPageWithBanner() {
  return (
    <FocusPage
      title="My focus page with banner"
      onClose={action('FocusPage.onClose')}
      bannerMessage={bannerMessage}
      footerButtons={footerButtons}
      width="small"
    >
      {fakeContent.slice(0, 3)}
    </FocusPage>
  );
}
