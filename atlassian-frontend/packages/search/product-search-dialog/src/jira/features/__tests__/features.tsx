import React from 'react';
import { mount } from 'enzyme';
import {
  JiraFeatures,
  JiraFeaturesProvider,
  withJiraFeatures,
  DefaultFeatures,
} from '../features';
import { useABTest } from '../../../common/ab-test-provider';
import { useJiraCurrentUser } from '../../clients';

jest.mock('../../../common/ab-test-provider', () => ({
  useABTest: jest.fn(),
}));

jest.mock('../../clients', () =>
  Object.assign({}, jest.requireActual('../../clients'), {
    useJiraCurrentUser: jest.fn(),
    useJiraSearchClientContext: jest.fn().mockReturnValue({ sites: [] }),
  }),
);

describe('JiraFeaturesProvider', () => {
  const DummyComponent = () => <div />;
  const FeatureChildren = withJiraFeatures(DummyComponent);

  (useJiraCurrentUser as jest.Mock).mockReturnValue({
    hasSoftwareAccess: false,
  });

  it('provider passes features to children', () => {
    (useABTest as jest.Mock).mockReturnValue({
      experimentId: 'default',
    });
    const features: JiraFeatures = {
      hasSoftwareAccess: true,
      hasAdvancedRoadmapsAccess: true,
      isMultiSite: false,
    };

    const wrapper = mount(
      <JiraFeaturesProvider features={features}>
        <FeatureChildren />
      </JiraFeaturesProvider>,
    );

    expect(wrapper.find(DummyComponent).prop('features')).toStrictEqual(
      features,
    );
  });

  it('default features are passed to children when there is no provider', () => {
    (useABTest as jest.Mock).mockReturnValue({
      experimentId: 'default',
    });
    const wrapper = mount(<FeatureChildren />);

    expect(wrapper.find(DummyComponent).prop('features')).toBe(DefaultFeatures);
  });

  it('Plans feature is on when Advanced Roadmaps is available', () => {
    const wrapper = mount(
      <JiraFeaturesProvider
        features={{
          hasAdvancedRoadmapsAccess: true,
          hasSoftwareAccess: false,
        }}
      >
        <FeatureChildren />
      </JiraFeaturesProvider>,
    );

    expect(wrapper.find(DummyComponent).prop('features')).toStrictEqual({
      ...DefaultFeatures,
      hasAdvancedRoadmapsAccess: true,
    });
  });
});
