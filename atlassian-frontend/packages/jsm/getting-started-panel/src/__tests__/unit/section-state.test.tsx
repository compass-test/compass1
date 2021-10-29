import React from 'react';
import { act } from '@testing-library/react';
import { mount, ReactWrapper } from 'enzyme';

import { fireErrorAnalytics } from '@atlassian/error-handling';

import {
  defaultSectionStateV2,
  useSectionState,
  getSectionStateValidator,
  toSectionStateV2AllowingV1,
  toSectionStateV2,
} from '../../ui/section-state';
import { mockGspState, mockSectionState } from '../../common/mocks';
import {
  GspSectionKey,
  SectionState,
  HeaderState,
  ChecklistTabKey,
  ProductTourKey,
  TaskId,
} from '../../common/types';

const { Expanded, Minimized } = HeaderState;
const { Basics, Changes, Incidents } = ChecklistTabKey;
const { Welcome, IncidentManagement, ChangeManagement } = ProductTourKey;

jest.mock('@atlassian/error-handling', () => ({
  fireErrorAnalytics: jest.fn(),
}));

const mockSetState = jest.fn();
interface TestConsumerProps {
  sectionState: SectionState;
  setSectionState: (newState: SectionState) => void;
}
const TestConsumer = ({ sectionState, setSectionState }: TestConsumerProps) =>
  null;
const TestContainer = ({ rawSectionState }: { rawSectionState: string }) => {
  const [sectionState, setSectionState] = useSectionState(
    rawSectionState,
    mockSetState,
  );
  return (
    <TestConsumer
      sectionState={sectionState}
      setSectionState={setSectionState}
    />
  );
};

describe('the assumptions of this test suite', () => {
  const defaultSectionState = defaultSectionStateV2;

  it('should have different defaultSectionState and mockSectionState values', () => {
    expect(defaultSectionState).not.toEqual(mockSectionState);
  });
});

describe('getSectionStateValidator', () => {
  it.each([undefined, 1, 0.5])(
    'should use toSectionStateV2AllowingV1 with version %s',
    (version) => {
      expect(getSectionStateValidator({ version })).toBe(
        toSectionStateV2AllowingV1,
      );
    },
  );
  it.each([2, 3])('should use toSectionStateV2 with version %s', (version) => {
    expect(getSectionStateValidator({ version })).toBe(toSectionStateV2);
  });
});

describe.each([
  ['toSectionStateV2', toSectionStateV2],
  ['toSectionStateV2AllowingV1', toSectionStateV2AllowingV1],
])('%s', (_, toSectionState) => {
  const defaultSectionState = defaultSectionStateV2;
  const mockSectionStateVersioned = mockSectionState;
  const gspMockStateVersioned = mockGspState;

  const expectSectionStateToFailValidation = (
    sectionState: object,
    path: string,
    value: any,
  ) =>
    expect(toSectionState(sectionState)).toEqual({
      type: 'validation-error',
      error: new Error(`Failed to parse ${path} - unexpected value (${value})`),
    });

  const expectSectionStateToValidateOkay = (
    sectionState: object,
    value: SectionState = sectionState as SectionState,
  ) => {
    // Check that the upgraded properties are hardcoded
    if (toSectionState === toSectionStateV2AllowingV1) {
      value = {
        ...value,
        sections: {
          ...value.sections,
          productTours: defaultSectionState.sections.productTours,
        },
      };
    }

    // Check that documentation is phased out depending on feature flag:
    value = {
      ...value,
      sections: {
        ...value.sections,
        documentation: defaultSectionState.sections.documentation,
      },
    };

    // Check that version is hardcoded.
    value = { ...value, version: 2 };

    // Check that different version inputs don't interfere with output.
    expect(toSectionState({ ...sectionState, version: undefined })).toEqual({
      type: 'ok',
      value,
    });
    expect(toSectionState({ ...sectionState, version: 1 })).toEqual({
      type: 'ok',
      value,
    });
    expect(toSectionState({ ...sectionState, version: 2 })).toEqual({
      type: 'ok',
      value,
    });
  };

  const expectSectionStateToFailValidationForAnyReason = (
    sectionState: object,
  ) => expect(toSectionState(sectionState).type).toEqual('validation-error');

  it.each([{}, /asdf/, []])('should reject sectionState=%s', (sectionState) => {
    expectSectionStateToFailValidationForAnyReason(sectionState);
  });

  describe.each([
    ['defaultSectionState', defaultSectionState],
    ['mockSectionState', mockSectionStateVersioned],
    [
      'sectionState from gsp mock state',
      JSON.parse(gspMockStateVersioned.properties.user.sectionState),
    ],
  ])('starting from %s', (name, sectionState) => {
    it('should accept the section state unmodified', () => {
      expectSectionStateToValidateOkay(sectionState);
    });

    const withSectionChanged = (key: GspSectionKey, value: any) => ({
      ...sectionState,
      sections: {
        ...sectionState.sections,
        [key]: value,
      },
    });
    const withChecklistChanged = (checklist: any) =>
      withSectionChanged(GspSectionKey.Checklist, checklist);
    const withProductToursChanged = (productTours: any) =>
      withSectionChanged(GspSectionKey.ProductTours, productTours);

    describe('with modifications to active section', () => {
      it.each([undefined, ...Object.values(GspSectionKey)])(
        'should accept the section state with activeSection=%s',
        (activeSection) => {
          expectSectionStateToValidateOkay({
            ...sectionState,
            activeSection,
          });
        },
      );

      it.each([null, 2, /asdf/])(
        'should reject the section state with activeSection=%s',
        (activeSection) => {
          expectSectionStateToFailValidation(
            {
              ...sectionState,
              activeSection,
            },
            'sectionState.activeSection',
            activeSection,
          );
        },
      );
    });

    describe('with invalid modifications to sections', () => {
      it.each([undefined, 2, true, false])(
        'should reject the section state with sections=%s',
        (sections) => {
          expectSectionStateToFailValidation(
            {
              ...sectionState,
              sections,
            },
            'sectionState.sections',
            sections,
          );
        },
      );

      it.each([null, /lkasjdflkj/, {}, []])(
        'should reject the section state with sections=%s',
        (sections) => {
          expectSectionStateToFailValidationForAnyReason({
            ...sectionState,
            sections,
          });
        },
      );
    });

    describe('with invalid modifications to sections.checklist', () => {
      it.each([undefined, 0.12309, true, false])(
        'should reject the section state with checklist=%s',
        (checklist) => {
          expectSectionStateToFailValidation(
            withChecklistChanged(checklist),
            'sectionState.sections.checklist',
            checklist,
          );
        },
      );

      it.each([null, /lkj/, {}, []])(
        'should reject the section state with checklist=%s',
        (checklist) => {
          expectSectionStateToFailValidationForAnyReason(
            withChecklistChanged(checklist),
          );
        },
      );
    });

    if (toSectionState === toSectionStateV2AllowingV1) {
      describe('with invalid modifications to sections.productTours', () => {
        it.each([undefined, -4, true, false])(
          'should override the section state with productTours=%s',
          (productTours) => {
            expectSectionStateToValidateOkay(
              withProductToursChanged(productTours),
              withProductToursChanged(
                defaultSectionStateV2.sections.productTours,
              ),
            );
          },
        );

        it.each([null, /123sdfiu/, {}, []])(
          'should override the section state with productTours=%s',
          (productTours) => {
            expectSectionStateToValidateOkay(
              withProductToursChanged(productTours),
              withProductToursChanged(
                defaultSectionStateV2.sections.productTours,
              ),
            );
          },
        );
      });
    } else {
      describe('with invalid modifications to sections.productTours', () => {
        it.each([undefined, -4, true, false])(
          'should reject the section state with productTours=%s',
          (productTours) => {
            expectSectionStateToFailValidation(
              withProductToursChanged(productTours),
              'sectionState.sections.productTours',
              productTours,
            );
          },
        );

        it.each([null, /123sdfiu/, {}, []])(
          'should reject the section state with productTours=%s',
          (productTours) => {
            expectSectionStateToFailValidationForAnyReason(
              withProductToursChanged(productTours),
            );
          },
        );
      });
    }

    describe('with modifications to checklist activeTab and headerState', () => {
      it.each([
        [Basics, Expanded],
        [Changes, Expanded],
        [Incidents, Expanded],
        [Basics, Minimized],
        [Changes, Minimized],
        [Incidents, Minimized],
      ])(
        'should accept the section state with activeTab=%s and headerState=%s',
        (activeTab, headerState) => {
          expectSectionStateToValidateOkay(
            withChecklistChanged({
              ...sectionState.sections.checklist,
              activeTab,
              headerState,
            }),
          );
        },
      );

      it.each([null, undefined, 1.123123, /uh oh/])(
        'should reject the section state with checklist.activeTab=%s',
        (activeTab) => {
          expectSectionStateToFailValidation(
            withChecklistChanged({
              ...sectionState.sections.checklist,
              activeTab,
            }),
            'sectionState.sections.checklist.activeTab',
            activeTab,
          );
        },
      );

      it.each([null, undefined, 123, []])(
        'should reject the section state with checklist.headerState=%s',
        (headerState) => {
          expectSectionStateToFailValidation(
            withChecklistChanged({
              ...sectionState.sections.checklist,
              headerState,
            }),
            'sectionState.sections.checklist.headerState',
            headerState,
          );
        },
      );
    });

    describe('with modifications to product tours activeTour and headerState', () => {
      it.each([
        [Welcome, Expanded],
        [ChangeManagement, Expanded],
        [IncidentManagement, Expanded],
        [Welcome, Minimized],
        [ChangeManagement, Minimized],
        [IncidentManagement, Minimized],
      ])(
        'should accept the section state with activeTour=%s and headerState=%s',
        (activeTour, headerState) => {
          expectSectionStateToValidateOkay(
            withProductToursChanged({
              ...sectionState.sections.productTours,
              activeTour,
              headerState,
            }),
          );
        },
      );

      // The upgrade code ignores these properties...
      if (toSectionState !== toSectionStateV2AllowingV1) {
        it.each([null, undefined, 1.123123, /uh oh/])(
          'should reject the section state with productTours.activeTour=%s',
          (activeTour) => {
            expectSectionStateToFailValidation(
              withProductToursChanged({
                ...sectionState.sections.productTours,
                activeTour,
              }),
              'sectionState.sections.productTours.activeTour',
              activeTour,
            );
          },
        );

        it.each([null, undefined, 123, []])(
          'should reject the section state with productTours.headerState=%s',
          (headerState) => {
            expectSectionStateToFailValidation(
              withProductToursChanged({
                ...sectionState.sections.productTours,
                headerState,
              }),
              'sectionState.sections.productTours.headerState',
              headerState,
            );
          },
        );
      }
    });

    describe('with modifications to checklist tab states', () => {
      const withTabsChanged = (tabs: any) =>
        withChecklistChanged({
          ...sectionState.sections.checklist,
          tabs,
        });

      it.each([null, undefined, -1 / 8982])(
        'should reject the section state with checklist.tabs=%s',
        (tabs) => {
          expectSectionStateToFailValidation(
            withTabsChanged(tabs),
            'sectionState.sections.checklist.tabs',
            tabs,
          );
        },
      );

      it.each([
        /object but wrong shape/,
        {},
        ['not', { the: 'right' }, 'shape'],
      ])('should reject the section state with checklist.tabs=%s', (tabs) => {
        expectSectionStateToFailValidationForAnyReason(withTabsChanged(tabs));
      });

      const withTabChanged = (key: ChecklistTabKey, value: any) =>
        withTabsChanged({
          ...sectionState.sections.checklist.tabs,
          [key]: value,
        });

      describe('with modifications to the basics tab', () => {
        const withBasicsChanged = (value: any) =>
          withTabChanged(ChecklistTabKey.Basics, value);

        it.each([null, undefined, -1 / 45])(
          'should reject the section state with checklist.tabs.basics=%s',
          (basics) => {
            expectSectionStateToFailValidation(
              withBasicsChanged(basics),
              'sectionState.sections.checklist.tabs.basics',
              basics,
            );
          },
        );

        it.each([undefined, ...Object.values(TaskId)])(
          'should accept the section state with checklist.tabs.basics.activeTask=%s',
          (activeTask) => {
            expectSectionStateToValidateOkay(withBasicsChanged({ activeTask }));
          },
        );

        it.each([null, '', 'not a real task key'])(
          'should reject the section state with checklist.tabs.basics.activeTask=%s',
          (activeTask) => {
            expectSectionStateToFailValidation(
              withBasicsChanged({ activeTask }),
              'sectionState.sections.checklist.tabs.basics.activeTask',
              activeTask,
            );
          },
        );
      });

      describe('with modifications to the incidents tab', () => {
        const withIncidentsChanged = (value: any) =>
          withTabChanged(ChecklistTabKey.Incidents, value);

        it.each([null, undefined, -1 / 45])(
          'should reject the section state with checklist.tabs.incidents=%s',
          (incidents) => {
            expectSectionStateToFailValidation(
              withIncidentsChanged(incidents),
              'sectionState.sections.checklist.tabs.incidents',
              incidents,
            );
          },
        );

        it.each([undefined, ...Object.values(TaskId)])(
          'should accept the section state with checklist.tabs.incidents.activeTask=%s',
          (activeTask) => {
            expectSectionStateToValidateOkay(
              withIncidentsChanged({ activeTask }),
            );
          },
        );

        it.each([null, '', 'not a real task key'])(
          'should reject the section state with checklist.tabs.incidents.activeTask=%s',
          (activeTask) => {
            expectSectionStateToFailValidation(
              withIncidentsChanged({ activeTask }),
              'sectionState.sections.checklist.tabs.incidents.activeTask',
              activeTask,
            );
          },
        );
      });

      describe('with modifications to the changes tab', () => {
        const withChangesChanged = (value: any) =>
          withTabChanged(ChecklistTabKey.Changes, value);

        it.each([null, undefined, -1 / 45])(
          'should reject the section state with checklist.tabs.changes=%s',
          (changes) => {
            expectSectionStateToFailValidation(
              withChangesChanged(changes),
              'sectionState.sections.checklist.tabs.changes',
              changes,
            );
          },
        );

        it.each([undefined, ...Object.values(TaskId)])(
          'should accept the section state with checklist.tabs.changes.activeTask=%s',
          (activeTask) => {
            expectSectionStateToValidateOkay(
              withChangesChanged({ activeTask }),
            );
          },
        );

        it.each([null, '', 'not a real task key'])(
          'should reject the section state with checklist.tabs.changes.activeTask=%s',
          (activeTask) => {
            expectSectionStateToFailValidation(
              withChangesChanged({ activeTask }),
              'sectionState.sections.checklist.tabs.changes.activeTask',
              activeTask,
            );
          },
        );
      });
    });
  });
});

describe('useSectionState', () => {
  const defaultSectionState = defaultSectionStateV2;
  const mockSectionStateVersioned = mockSectionState;
  const gspMockStateVersioned = mockGspState;

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe.each([
    ['defaultSectionState', defaultSectionState],
    ['mockSectionState', mockSectionStateVersioned],
    [
      'sectionState from gsp mock state',
      JSON.parse(gspMockStateVersioned.properties.user.sectionState),
    ],
  ])('starting with valid state: %s', (name, parsedSectionState) => {
    const differentState =
      parsedSectionState === mockSectionStateVersioned
        ? defaultSectionState
        : mockSectionStateVersioned;
    const rawSectionState = JSON.stringify(parsedSectionState);

    let container: ReactWrapper;
    let consumer: ReactWrapper<TestConsumerProps>;
    beforeEach(() => {
      container = mount(<TestContainer rawSectionState={rawSectionState} />);
      consumer = container.find(TestConsumer);
    });

    it('should parse and return the section state unmodified', () => {
      expect(consumer.prop('sectionState')).toEqual(parsedSectionState);
    });

    it('should return the given function unmodified', () => {
      expect(consumer.prop('setSectionState')).toBe(mockSetState);
    });

    it('should not update internal state when calling returned function', () => {
      act(() => {
        consumer.prop('setSectionState')(differentState);
      });

      consumer = container.find(TestConsumer);
      expect(consumer.prop('sectionState')).toEqual(parsedSectionState);
    });

    describe('with unnecessary properties', () => {
      let consumer: ReactWrapper<TestConsumerProps>;
      beforeEach(() => {
        consumer = mount(
          <TestContainer
            rawSectionState={JSON.stringify({
              ...parsedSectionState,
              foo: 'bar',
            })}
          />,
        ).find(TestConsumer);
      });

      it('should strip out unnecessary properties', () => {
        expect((consumer.prop('sectionState') as any).foo).toBeUndefined();
      });

      it('should return the valid parts of section state', () => {
        expect(consumer.prop('sectionState')).toEqual(parsedSectionState);
      });
    });

    it.each([
      ['default -> mock', defaultSectionState, mockSectionStateVersioned],
      ['default -> default', defaultSectionState, defaultSectionState],
      ['mock -> mock', mockSectionStateVersioned, mockSectionStateVersioned],
      ['mock -> default', mockSectionStateVersioned, defaultSectionState],
    ])(
      `should support the valid state transitions (${name}) -> %s`,
      (transitionLabel, firstState, secondState) => {
        container.setProps({
          rawSectionState: JSON.stringify(firstState),
        });
        container.update();

        consumer = container.find(TestConsumer);
        expect(consumer.prop('sectionState')).toEqual(firstState);

        container.setProps({
          rawSectionState: JSON.stringify(secondState),
        });
        container.update();

        consumer = container.find(TestConsumer);
        expect(consumer.prop('sectionState')).toEqual(secondState);
      },
    );

    describe.each([
      ['{}', '{}'],
      [
        'a valid state plus extra characters',
        gspMockStateVersioned.properties.user.sectionState + 'asdf',
      ],
      ['', ''],
      ['invalid json', 'asdlkjjasdlkjasd}{!@#)*(&!@#}{ASD]kj'],
    ])(
      'when handling a transition to invalid state: %s',
      (invalidStateName, invalidRawState) => {
        beforeEach(() => {
          container.setProps({
            rawSectionState: invalidRawState,
          });
          container.update();
          consumer = container.find(TestConsumer);
        });

        it('should revert to the first seen good state', () => {
          expect(consumer.prop('sectionState')).toEqual(parsedSectionState);
        });

        it('should ignore updates to a valid external state', () => {
          // the original valid section state
          container.setProps({ rawSectionState });
          container.update();

          consumer = container.find(TestConsumer);
          expect(consumer.prop('sectionState')).toEqual(parsedSectionState);
        });
      },
    );
  });

  describe.each([
    ['{}', '{}'],
    [
      'a valid state plus extra characters',
      gspMockStateVersioned.properties.user.sectionState + 'asdf',
    ],
    ['', ''],
    ['invalid json', 'asdlkjjasdlkjasd}{!@#)*(&!@#}{ASD]kj'],
  ])('starting with invalid state: %s', (name, rawSectionState) => {
    let container: ReactWrapper;
    let consumer: ReactWrapper<TestConsumerProps>;
    beforeEach(() => {
      container = mount(<TestContainer rawSectionState={rawSectionState} />);
      consumer = container.find(TestConsumer);
    });

    it('should return the default state', () => {
      expect(consumer.prop('sectionState')).toEqual(defaultSectionState);
    });

    it('should trigger error analytics', () => {
      expect(fireErrorAnalytics).toHaveBeenCalledTimes(1);
    });

    it('use the correct error metadata', () => {
      const errorType = name === '{}' ? Error : SyntaxError;

      expect(fireErrorAnalytics).toHaveBeenCalledWith(
        expect.objectContaining({
          meta: expect.objectContaining({
            packageName: 'jsmGettingStartedPanel',
            id: 'section-state',
          }),
          error: expect.any(errorType),
          attributes: expect.objectContaining({
            errorMsg: expect.any(String),
          }),
        }),
      );
    });

    it('should return a function which updates internal state', () => {
      act(() => {
        consumer.prop('setSectionState')(mockSectionStateVersioned);
      });
      container.update();

      consumer = container.find(TestConsumer);
      expect(consumer.prop('sectionState')).toEqual(mockSectionStateVersioned);
    });

    it('should return a function which calls the original setSectionState', () => {
      expect(mockSetState).toHaveBeenCalledTimes(0);

      act(() => {
        consumer.prop('setSectionState')(mockSectionStateVersioned);
      });

      expect(mockSetState).toHaveBeenCalledTimes(1);
      expect(mockSetState).toHaveBeenCalledWith(mockSectionStateVersioned);
    });

    it.each([
      [defaultSectionState, mockSectionStateVersioned],
      [defaultSectionState, defaultSectionState],
      [mockSectionStateVersioned, mockSectionStateVersioned],
      [mockSectionStateVersioned, defaultSectionState],
    ])(
      'should not return to the external section state even after that state becomes valid',
      (internalState, externalState) => {
        act(() => {
          consumer.prop('setSectionState')(internalState);
        });
        container.setProps({
          rawSectionState: JSON.stringify(externalState),
        });
        container.update();

        consumer = container.find(TestConsumer);
        expect(consumer.prop('sectionState')).toEqual(internalState);
      },
    );
  });
});
