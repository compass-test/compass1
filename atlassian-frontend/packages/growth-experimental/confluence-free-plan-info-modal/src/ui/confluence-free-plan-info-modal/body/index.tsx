import React from 'react';

import { FormattedMessage } from 'react-intl';

import Button, { ButtonGroup } from '@atlaskit/button';

import { featureItems } from './constants';
import FeatureItem from './feature-item';
import messages from './messages';
import { Actions, Wrapper } from './styled';
import { BodyProps } from './types';

const Body = ({ onPrimaryActionClick, onSecondaryActionClick }: BodyProps) => {
  return (
    <Wrapper>
      {featureItems.map((featureItem, index) => (
        <FeatureItem key={`Confluence feature ${index}`} {...featureItem} />
      ))}
      <Actions>
        <ButtonGroup>
          <Button
            appearance="subtle"
            testId="secondary-cta"
            onClick={onSecondaryActionClick}
          >
            <FormattedMessage {...messages.secondaryActionButton} />
          </Button>
          <Button
            autoFocus={true}
            appearance="primary"
            testId="primary-cta"
            onClick={onPrimaryActionClick}
          >
            <FormattedMessage {...messages.primaryActionButton} />
          </Button>
        </ButtonGroup>
      </Actions>
    </Wrapper>
  );
};

export default Body;
