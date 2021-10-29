import React, { useCallback, useState, ReactNode } from 'react';
import { IntlProvider } from 'react-intl';
import { DiProvider, injectable } from 'react-magnetic-di';
import { action } from '@storybook/addon-actions';
import { css } from 'styled-components';

import { ANALYTICS_BRIDGE_CHANNEL } from '@atlassian/analytics-bridge';
import { AnalyticsListener, UIAnalyticsEvent } from '@atlaskit/analytics-next';
import { CodeBlock } from '@atlaskit/code';
import AnalyticsWebClient from '@atlassiansox/analytics-web-client';

import { Environment } from '../../src/common/types';
import { mockGspState, useMockCompletedTasks } from '../../src/common/mocks';
import { Heading as HomeHeading } from '../../src/ui/home-section/header-card/styled';
import {
  mockVisibilityDataAllKeys,
  mockVisibilityDataAdvanced,
  mockVisibilityDataEmpty,
  mockVisibilityDataStandard,
  mockVisibilityDataSomeOg,
  mockVisibilityDataNothing,
  mockVisibilityDataOnlyOg,
  mockVisibilityDataOnlySomeOg,
} from '../../src/common/services/visibility/mocks';
import { ActiveState, VisualState, Property } from '../../src';
import {
  ChecklistTabKey,
  GspSectionKey,
  ProductTourKey,
  PropertyKey,
  GspState,
} from '../../src/common/types';
import { VisibilityData } from '../../src/common/services/visibility';
import { useGspFeatureFlags } from '../../src/controllers/feature-flags/state';
import {
  FeatureFlagMap,
  featureFlagDefaultValues,
} from '../../src/controllers/feature-flags';

type ControlProps = {
  onUserActivity: ({ key, value }: Property) => void;
  properties: GspState['properties'];
};

const VisibilityControls = ({
  setVisibilityData,
}: {
  setVisibilityData: (data: VisibilityData) => void;
}) => (
  <div style={{ paddingBottom: '8px' }}>
    <p>Change tasks visibility to:</p>
    <button onClick={() => setVisibilityData(mockVisibilityDataAllKeys)}>
      All tasks
    </button>
    <button onClick={() => setVisibilityData(mockVisibilityDataEmpty)}>
      All tasks from empty visibility state
    </button>
    <button onClick={() => setVisibilityData(mockVisibilityDataStandard)}>
      Standard tasks only
    </button>
    <button onClick={() => setVisibilityData(mockVisibilityDataAdvanced)}>
      Standard and advanced tasks only
    </button>
    <button onClick={() => setVisibilityData(mockVisibilityDataSomeOg)}>
      Standard, advanced and some Opsgenie tasks
    </button>
    <button onClick={() => setVisibilityData(mockVisibilityDataOnlyOg)}>
      Opsgenie tasks only
    </button>
    <button onClick={() => setVisibilityData(mockVisibilityDataOnlySomeOg)}>
      Some Opsgenie tasks only
    </button>
    <button onClick={() => setVisibilityData(mockVisibilityDataNothing)}>
      No permissions to view any task
    </button>
  </div>
);

const CompletedTaskControls = ({
  less,
  more,
}: {
  less: () => void;
  more: () => void;
}) => (
  <div style={{ paddingBottom: '8px' }}>
    <span style={{ paddingRight: '8px' }}>
      Change number of completed tasks:
    </span>
    <button onClick={less}>Less</button>
    <button onClick={more}>More</button>
  </div>
);

const PanelStateControls = ({ onUserActivity, properties }: ControlProps) => (
  <div style={{ paddingBottom: '8px' }}>
    <span style={{ paddingRight: '8px' }}>Change state of a panel:</span>
    <button
      onClick={() =>
        onUserActivity({
          key: PropertyKey.VisualState,
          value: VisualState.FullPanel,
        })
      }
      disabled={properties.user.visualState !== VisualState.Lozenge}
    >
      Reopen panel
    </button>
    <button
      onClick={() =>
        onUserActivity({
          key: PropertyKey.ActiveState,
          value: ActiveState.On,
        })
      }
      disabled={properties.user.activeState !== ActiveState.Off}
    >
      Activate GSP
    </button>
  </div>
);

const SectionStateControls = ({ onUserActivity }: ControlProps) => {
  const setStateWithSectionState = (value: string) => () =>
    onUserActivity({ key: PropertyKey.SectionState, value });
  return (
    <div style={{ paddingBottom: '8px' }}>
      <span style={{ paddingRight: '8px' }}>Make sectionState prop:</span>
      <button onClick={setStateWithSectionState('{}')}>Invalid</button>
      <button onClick={setStateWithSectionState('a{sdasdkjasdlkjasdlkasd}j')}>
        Corrupted
      </button>
      <button
        onClick={setStateWithSectionState(
          mockGspState.properties.user.sectionState,
        )}
      >
        Okay
      </button>
    </div>
  );
};

const ActiveStateControls = ({ onUserActivity, properties }: ControlProps) => {
  const setStateWithActiveSection = (activeSection: GspSectionKey) => () =>
    onUserActivity({
      key: PropertyKey.SectionState,
      value: JSON.stringify({
        ...JSON.parse(properties.user.sectionState),
        activeSection,
      }),
    });
  return (
    <div style={{ paddingBottom: '8px' }}>
      <span style={{ paddingRight: '8px' }}>Make activeState prop:</span>
      <button onClick={setStateWithActiveSection(GspSectionKey.Checklist)}>
        Quickstart
      </button>
      <button onClick={setStateWithActiveSection(GspSectionKey.Home)}>
        Home
      </button>
      <button onClick={setStateWithActiveSection(GspSectionKey.ProductTours)}>
        Walkthroughs
      </button>
    </div>
  );
};

const ActiveTabControls = ({ onUserActivity, properties }: ControlProps) => {
  const setTabKey = (tabKey: ChecklistTabKey) => () => {
    const sectionState = JSON.parse(properties.user.sectionState);
    sectionState.sections.checklist.activeTab = tabKey;
    onUserActivity({
      key: PropertyKey.SectionState,
      value: JSON.stringify(sectionState),
    });
  };
  return (
    <div style={{ paddingBottom: '8px' }}>
      <span style={{ paddingRight: '8px' }}>Set activeTab:</span>
      <button onClick={setTabKey(ChecklistTabKey.Basics)}>Basics</button>
      <button onClick={setTabKey(ChecklistTabKey.Changes)}>Changes</button>
      <button onClick={setTabKey(ChecklistTabKey.Incidents)}>Incidents</button>
    </div>
  );
};

const ActiveTourControls = ({ onUserActivity, properties }: ControlProps) => {
  const setTourKey = (tourKey: ProductTourKey) => () => {
    const sectionState = JSON.parse(properties.user.sectionState);
    sectionState.sections.productTours.activeTour = tourKey;
    onUserActivity({
      key: PropertyKey.SectionState,
      value: JSON.stringify(sectionState),
    });
  };
  return (
    <div style={{ paddingBottom: '8px' }}>
      <span style={{ paddingRight: '8px' }}>Set activeTour:</span>
      <button onClick={setTourKey(ProductTourKey.Welcome)}>Welcome</button>
      <button onClick={setTourKey(ProductTourKey.ChangeManagement)}>
        Change Management
      </button>
      <button onClick={setTourKey(ProductTourKey.IncidentManagement)}>
        Incident Management
      </button>
    </div>
  );
};

const OgStyleControls = ({
  isOgStyles,
  setOgStyles,
}: {
  isOgStyles: boolean;
  setOgStyles: (value: boolean) => void;
}) => (
  <div style={{ paddingBottom: '8px' }}>
    <input
      checked={isOgStyles}
      name="isOgStyles"
      id="storybook-control-isOgStyles"
      type="checkbox"
      onChange={() => {
        setOgStyles(!isOgStyles);
      }}
    />
    <label htmlFor="storybook-control-isOgStyles">Simulate JSM/O styles</label>
    {
      // Simulate the OpsGenie global `box-sizing: border-box` styles.
      isOgStyles && (
        <style>{css`
          *,
          ::after,
          ::before {
            box-sizing: border-box;
          }

          ${HomeHeading}, ${HomeHeading}:first-child {
            margin-top: 28px;
          }

          h3 {
            line-height: 30px;
          }

          h1,
          h2,
          h3,
          h5,
          h6,
          h1:first-child,
          h2:first-child,
          h3:first-child,
          h5:first-child,
          h6:first-child {
            margin: 10px 0;
          }

          .ops-genie-root h4 {
            padding: 0;
            margin: 0;
          }
        `}</style>
      )
    }
  </div>
);

const MockFeatureFlagControls = ({
  mockFeatureFlags,
  setMockFeatureFlags,
}: {
  mockFeatureFlags: FeatureFlagMap;
  setMockFeatureFlags: (value: FeatureFlagMap) => void;
}) => (
  <div style={{ paddingBottom: '8px' }}>
    <p>Feature flags:</p>
    {Object.entries(mockFeatureFlags).map(([flag, value]) => (
      <div>
        <input
          checked={value}
          name={flag}
          id={`storybook-control-${flag}`}
          type="checkbox"
          onChange={() => {
            setMockFeatureFlags({
              ...mockFeatureFlags,
              [flag]: !value,
            });
          }}
        />
        <label htmlFor={`storybook-control-${flag}`}>{flag}</label>
      </div>
    ))}
  </div>
);

const onAnalyticsEvent = (event: UIAnalyticsEvent, _channel?: string) => {
  const {
    action: evAction,
    actionSubject,
    actionSubjectId,
    attributes,
  } = event.payload;
  action(
    `${
      actionSubjectId !== undefined ? actionSubjectId + ' ' : ''
    }${actionSubject} ${evAction}${
      attributes !== undefined
        ? `, attributes ${JSON.stringify(attributes)}`
        : ''
    }`,
  )(event);
};

export const useStorybookMockData = () => {
  const [isOgStyles, setOgStyles] = useState(false);
  const [properties, setProperties] = useState(mockGspState.properties);
  const [visibilityData, setVisibilityData] = useState(
    mockVisibilityDataAllKeys,
  );
  const [
    { completedTasks },
    { onTaskComplete, more, less },
  ] = useMockCompletedTasks(3);
  const onUserActivity = ({ key, value }: Property) => {
    setProperties({
      ...properties,
      user: {
        ...properties.user,
        [key]: value,
      },
    });
  };

  const state = {
    completedItems: completedTasks,
    properties: {
      ...properties,
      user: { ...properties.user, ...visibilityData.user },
      workspace: visibilityData.workspace,
    },
  };

  // For our examples we can set an invalid state string, so fallback to
  // the original string if we fail the JSON parsing
  let potentiallyParsedSectionState = state.properties.user.sectionState;
  try {
    potentiallyParsedSectionState = JSON.parse(
      state.properties.user.sectionState,
    );
  } catch {}
  const prettyStateString = JSON.stringify(
    {
      ...state,
      properties: {
        ...state.properties,
        user: {
          ...state.properties.user,
          sectionState: potentiallyParsedSectionState,
        },
      },
    },
    null,
    2,
  );

  const controlsProps = {
    onUserActivity,
    properties,
  };

  const [mockFeatureFlags, setMockFeatureFlags] = useState(
    featureFlagDefaultValues,
  );

  const ControlledWrapper = useCallback(
    ({ children, controls }: { children: ReactNode; controls: ReactNode }) => {
      const useGspFeatureFlagsInjectable = injectable(
        useGspFeatureFlags,
        () => [
          {
            isInitialised: true,
            gspFeatureFlagValues: mockFeatureFlags,
          },
          {
            initialiseFlags: async (
              _analyticsClient: typeof AnalyticsWebClient,
              _environment: Environment,
              _cloudId: string,
            ) => {},
          },
        ],
      );

      return (
        <AnalyticsListener
          onEvent={onAnalyticsEvent}
          channel={ANALYTICS_BRIDGE_CHANNEL}
        >
          <IntlProvider locale="en">
            <>
              <div style={{ display: 'flex' }}>
                <div style={{ width: '350px' }}>
                  <DiProvider use={[useGspFeatureFlagsInjectable]}>
                    {children}
                  </DiProvider>
                </div>
                {controls}
              </div>
            </>
          </IntlProvider>
        </AnalyticsListener>
      );
    },
    [mockFeatureFlags],
  );

  const controls = (
    <>
      <div style={{ width: '400px' }}>
        <VisibilityControls setVisibilityData={setVisibilityData} />
        <CompletedTaskControls less={less} more={more} />
        <PanelStateControls {...controlsProps} />
        <SectionStateControls {...controlsProps} />
        <ActiveStateControls {...controlsProps} />
        <ActiveTabControls {...controlsProps} />
        <ActiveTourControls {...controlsProps} />
        <OgStyleControls isOgStyles={isOgStyles} setOgStyles={setOgStyles} />
        <MockFeatureFlagControls
          mockFeatureFlags={mockFeatureFlags}
          setMockFeatureFlags={setMockFeatureFlags}
        />
      </div>
      <CodeBlock language="json" text={prettyStateString} />
    </>
  );

  return {
    ControlledWrapper,
    controls,
    state,
    onUserActivity,
    onTaskComplete,
  };
};
