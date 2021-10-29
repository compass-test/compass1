import React from 'react';

import { boolean, radios, text } from '@storybook/addon-knobs';
import styled from 'styled-components';

import FileIcon from '@atlaskit/icon/glyph/file';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { Disclosure } from '../src';

const StoryWrapper = styled.div`
  max-width: 500px;

  & > :not(:last-child) {
    margin-bottom: 8px;
  }
`;

export default function ExpandingCardExample() {
  const id = text('id', 'sampleId');
  const label = text('label', 'Sample label');
  const testId = text('testId', 'sampleTestId');
  const heading = text('heading', 'Title heading');
  const secondaryText = text('secondaryText', 'Secondary text');
  const expanded = boolean('expanded', false);
  const iconSize = radios(
    'Icon size',
    {
      Small: 'small',
      Medium: 'medium',
      Large: 'large',
      'Extra large': 'xlarge',
    },
    'medium',
  );

  function Details() {
    return (
      <div>
        <p>
          Proin et suscipit nisi. Duis aliquam dolor sit amet dui aliquet, vel
          commodo nulla condimentum. Praesent volutpat nisl non nisi consequat,
          quis efficitur mi condimentum.
        </p>
        <p>
          Proin dapibus orci magna, sit amet fringilla metus rutrum nec. Ut
          malesuada aliquet urna, non sagittis arcu lacinia quis. Quisque ac
          interdum nunc.
        </p>
      </div>
    );
  }

  return (
    <CompassTestProvider>
      <StoryWrapper>
        <Disclosure expanded={expanded} id={id} label={label} testId={testId}>
          <Disclosure.ExpandingCard
            heading={heading}
            details={() => <Details />}
          />
        </Disclosure>

        <Disclosure expanded={expanded} id={id} label={label} testId={testId}>
          <Disclosure.ExpandingCard
            heading={heading}
            secondaryText={secondaryText}
            details={() => <Details />}
          />
        </Disclosure>

        <Disclosure expanded={expanded} id={id} label={label} testId={testId}>
          <Disclosure.ExpandingCard
            heading={heading}
            secondaryText={secondaryText}
            icon={<FileIcon label="" size={iconSize} />}
            details={() => <Details />}
          />
        </Disclosure>
      </StoryWrapper>
    </CompassTestProvider>
  );
}
