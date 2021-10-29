import React from 'react';
import { mount } from 'enzyme';
import { ItemCardContent } from '../../../ui/checklist-section/tab-container/item-card';
import { Instruction } from '../../../ui/checklist-section/tab-container/item-card/styled';
import { TaskId } from '../../../common/types';
import { fireUIAnalytics } from '@atlassian/analytics-bridge';

jest.mock('@atlassian/analytics-bridge', () => ({
  fireUIAnalytics: jest.fn(),
}));

describe('ItemCardContent', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe.each([
    [0, 'a full description', undefined],
    [0, '', undefined],
    [1, 'a full description', 'defined'],
    [1, '', 'defined'],
    [3, 'a full description', undefined],
    [3, '', 'defined'],
  ])(
    'with %d instructions, description="%s" and learn more data %s',
    (instructionCount, description, learnMore) => {
      const instructionsProp = [
        { key: 'foo', element: 'one' },
        { key: 'bar', element: <div>two</div> },
        { key: 'zaz', element: <p>three</p> },
      ].slice(0, instructionCount);

      const itemCardContent = mount(
        learnMore ? (
          <ItemCardContent
            description={description}
            learnMore={{
              url: 'not under test',
              text: 'not under test',
              taskId: TaskId.AddChangeApprovers,
            }}
            instructions={instructionsProp}
          />
        ) : (
          <ItemCardContent
            description={description}
            instructions={instructionsProp}
          />
        ),
      );

      it('should show the description at the top', () => {
        expect(itemCardContent.text().indexOf(description)).toBe(0);
      });

      it(`should show ${instructionCount} instructions in list items`, () => {
        const instructions = itemCardContent.find(Instruction);

        expect(instructions).toHaveLength(instructionCount);
      });

      if (instructionCount > 0) {
        it('should render the instructions exactly as given', () => {
          const instructions = itemCardContent.find(Instruction);

          instructionsProp.forEach(({ key, element }, i) => {
            expect(instructions.at(i).prop('children')).toBe(element);
            expect(instructions.at(i).key()).toBe(key);
          });
        });
      }

      describe('- LearnMoreLink', () => {
        if (learnMore === undefined) {
          it('should not appear', () => {
            const learnMoreLink = mount(
              <ItemCardContent description="description" instructions={[]} />,
            ).find('a');

            expect(learnMoreLink).toHaveLength(0);
          });
        } else {
          it.each([
            ['', ''],
            ['not empty', ''],
            ['', 'not empty'],
            ['not empty', 'not empty'],
          ])(
            'should appear with learn more url = "%s" and button text = "%s"',
            (url, text) => {
              const learnMoreLink = mount(
                <ItemCardContent
                  description="description"
                  learnMore={{ text, url, taskId: TaskId.AddChangeApprovers }}
                  instructions={[]}
                />,
              ).find('a');

              expect(learnMoreLink).toHaveLength(1);
            },
          );

          it('should track learn more link clicks', () => {
            const learnMoreLink = mount(
              <ItemCardContent
                description="description"
                learnMore={{
                  text: 'text',
                  url: 'url',
                  taskId: TaskId.AddChangeApprovers,
                }}
                instructions={[]}
              />,
            ).find('a');

            learnMoreLink.simulate('click');

            expect(fireUIAnalytics).toHaveBeenCalledTimes(1);
            expect(fireUIAnalytics).toHaveBeenCalledWith(
              expect.objectContaining({
                payload: expect.objectContaining({
                  action: 'clicked',
                  actionSubject: 'link',
                }),
              }),
              'jsmGettingStartedPanelChecklistTaskLearnMoreLink',
              {
                taskId: 'servicedesk-change-management-change-approvers-added',
              },
            );
          });
        }
      });
    },
  );
});
