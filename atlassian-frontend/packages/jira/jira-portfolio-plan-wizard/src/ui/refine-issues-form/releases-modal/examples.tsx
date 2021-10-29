import React, { FunctionComponent, useState } from 'react';

import times from 'lodash/fp/times';
import { IntlProvider } from 'react-intl';
import styled from 'styled-components';

import Button from '@atlaskit/button';
import Modal, { ModalBody } from '@atlaskit/modal-dialog';

import {
  buildAPI,
  buildPlan,
  featureFlags,
  issueSources,
  projects,
  releases,
  StoryMetadata,
} from '../../../common/mocks';
import { Release } from '../../../common/types';
import { action } from '../../../common/utils/storybook';
import Vr from '../../../common/utils/vr';
import { APIProvider } from '../../../controllers/api';
import { FeatureFlagsProvider } from '../../../controllers/feature-flags';
import { PlanProvider } from '../../../controllers/plan';

import ViewReleaseModal from './index';

const StoryContainer = styled.div`
  display: flex;
  width: 800px;
  height: 100vh;
`;

const ProviderStack: FunctionComponent<{}> = ({ children }) => {
  return (
    <FeatureFlagsProvider featureFlags={featureFlags}>
      <APIProvider api={buildAPI()}>
        <PlanProvider
          initialPlan={{
            id: null,
            name: '',
            permission: 'open',
            issueSources: issueSources,
            excludeDays: 30,
            excludedVersions: releases.slice(0, 5).map(({ id }) => id),
          }}
        >
          <IntlProvider>
            <StoryContainer>
              <Modal>
                <ModalBody>{children}</ModalBody>
              </Modal>
            </StoryContainer>
          </IntlProvider>
        </PlanProvider>
      </APIProvider>
    </FeatureFlagsProvider>
  );
};

export default {
  title: 'Release Modal',
  decorators: [
    (storyFn) => <ProviderStack>{storyFn()}</ProviderStack>,
    (storyFn) => (
      <Vr clip={{ x: 0, y: 0, width: 1280, height: 800 }}>{storyFn()}</Vr>
    ),
  ],
} as StoryMetadata;

const plan = buildPlan();

export const Basic = () => {
  const [isOn, setIsOn] = useState(true);
  if (!isOn) {
    return <Button onClick={() => setIsOn(true)}>open again</Button>;
  }
  return (
    <ViewReleaseModal
      plan={plan}
      allProjects={projects}
      allReleases={releases}
      loading={false}
      onChange={action('onChange')}
      onSubmit={action('onSubmit')}
      onClose={() => setIsOn(false)}
    />
  );
};

export const ControlledValues = () => {
  const [isOn, setIsOn] = useState(true);
  if (!isOn) {
    return <Button onClick={() => setIsOn(true)}>open again</Button>;
  }
  return (
    <ViewReleaseModal
      plan={plan}
      allProjects={projects}
      allReleases={releases}
      loading={false}
      onChange={action('onChange')}
      onSubmit={action('onSubmit')}
      onClose={() => setIsOn(false)}
      defaultValue={times((id) => String(id * 2), 10)}
    />
  );
};

export const With2000Releases = () => {
  const [isOn, setIsOn] = useState(true);
  if (!isOn) {
    return <Button onClick={() => setIsOn(true)}>open again</Button>;
  }

  const releases: Release[] = times(
    (index) => ({
      projects: 2,
      userStartDate: index % 3 ? undefined : '16/May/2020',
      userEndDate: index % 2 ? undefined : '23/08/2020',
      startDate: index % 4 ? undefined : '10/02/2020',
      released: index % 2 === 0,
    }),
    2000,
  ).map((version, index) => ({
    name: `Version ${index}.0`,
    projectId: 1,
    ...version,
    id: String(index),
  }));
  return (
    <ViewReleaseModal
      plan={plan}
      allProjects={projects}
      allReleases={releases}
      loading={false}
      onChange={action('onChange')}
      onSubmit={action('onSubmit')}
      onClose={() => setIsOn(false)}
      defaultValue={times((id) => String(id * 2), 10)}
    />
  );
};
