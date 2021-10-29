import React, { useEffect, useRef, useState } from 'react';

import { findChildren } from 'prosemirror-utils';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import styled from 'styled-components';

import { EditorActions } from '@atlaskit/editor-core';
import Textfield from '@atlaskit/textfield';
import { N200, N800 } from '@atlaskit/theme/colors';
import {
  choiceQuestionTypes,
  FormCondition,
  FormConditions,
  FormConditionType,
  isShowCondition,
  QuestionParameters,
  ShowCondition,
} from '@atlassian/proforma-common-core/form-system-models';
import { usePfAnalyticsUtils } from '@atlassian/proforma-common-core/jira-common-context';
import { AnalyticsEventName } from '@atlassian/proforma-common-core/jira-common-utils';

import { FormBuilderReferenceData } from '../../models/FormBuilderReferenceData';
import { SectionExtensionSelection } from '../editor/ExtensionSelection';

import { ConditionChoices } from './conditions/ConditionChoices';
import { QuestionDropdown } from './conditions/QuestionDropdown';
import {
  ShowSectionDropdown,
  ShowSectionValues,
} from './conditions/ShowSectionDropdown';
import {
  IntlSectionSidebarMessages,
  SectionSidebarMessages,
} from './SectionSidebarMessages.intl';

interface SectionSidebarProps extends SectionExtensionSelection {
  editorActions: EditorActions;
  refData: FormBuilderReferenceData;
  maxId: number;
  onNewMaxId: (maxId: number) => void;
}

/**
 * A sidebar for the form builder where sections can be edited.
 */
export const SectionSidebar = injectIntl(
  ({
    extension,
    maxId,
    onNewMaxId,
    updateExtension,
    editorActions,
    intl,
  }: SectionSidebarProps & InjectedIntlProps) => {
    const { parameters } = extension;
    const analytics = usePfAnalyticsUtils();

    const view = editorActions._privateGetEditorView();
    if (!view) {
      return <div>Error: No Prosemirror view is defined</div>;
    }
    const { state } = view;
    const usableChoiceQuestions: QuestionParameters[] = getUsableChoiceQuestions(
      state,
    );

    /**
     * Set to true whenever the section has changed, but should only be updated after a delay.
     * This is used for changes which are typed in to avoid updating on every keypress.
     */
    const updateAfterDelay = useRef(false);

    /**
     * Set to true whenever the section has changed, and it should be updated immediately.
     * This is used for changes which are not typed such as toggles and dropdowns.
     */
    const updateImmediately = useRef(false);

    const [currentConditionId, setCurrentConditionId] = useState<number | null>(
      null,
    );

    /*** Name ***/
    const [name, setName] = useState(parameters.name);
    const nameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newName = e.target.value;
      setName(newName);
      updateAfterDelay.current = true;
    };

    /*** Has Conditional ***/
    const hasConditionalInParameters =
      !!parameters.conditions && Object.keys(parameters.conditions).length > 0;
    const [hasConditional, setHasConditional] = useState(
      hasConditionalInParameters,
    );
    const hasConditionalChanged = (value: any): void => {
      if (value === ShowSectionValues.Conditionally) {
        setHasConditional(true);
        updateImmediately.current = true;
      } else {
        setSelectedQuestion(undefined);
        setHasConditional(false);
        updateImmediately.current = true;
      }
    };
    const showSection = hasConditional
      ? ShowSectionValues.Conditionally
      : ShowSectionValues.Always;

    /*** Selected question ***/
    const initialSelectedQuestion = getSelectedQuestionFromParameters(
      parameters.conditions,
      usableChoiceQuestions,
    );
    const [selectedQuestion, setSelectedQuestion] = useState<
      QuestionParameters | undefined
    >(initialSelectedQuestion);
    const hasQuestionChanged = (value: any): void => {
      setSelectedQuestion(value);
      updateImmediately.current = true;
    };

    /*** Selected choices ***/
    const initialCondition =
      hasConditionalInParameters &&
      (parameters.conditions![
        Object.keys(parameters.conditions!)[0]
      ] as ShowCondition);
    const initialSelectedChoices = initialCondition
      ? initialCondition.i.co!.cIds[Object.keys(initialCondition.i.co!.cIds)[0]]
      : [];
    const [selectedChoices, setSelectedChoices] = useState<string[]>(
      initialSelectedChoices,
    );
    const hasSelectedChoicesChanged = (value: any): void => {
      setSelectedChoices(value);
      updateImmediately.current = true;
    };

    /**
     * Update the section. This should not be called directly, instead triggered by setting
     * either updateImmediately or updateAfterDelay to true.
     */
    const update = (): void => {
      updateExtension({
        ...parameters,
        name,
        conditions: getNewConditions(),
        extensionTitle: `Section: ${name}`,
      });
    };

    const getNewConditions = (): FormConditions | undefined => {
      if (!hasConditional || !selectedQuestion) {
        return undefined;
      }

      let conditionId: number;

      if (currentConditionId) {
        conditionId = currentConditionId;
      } else if (hasConditionalInParameters) {
        const newConditionId = parseInt(
          Object.keys(parameters.conditions!)[0],
          10,
        );
        conditionId = newConditionId;
        setCurrentConditionId(newConditionId);
      } else {
        const newConditionId = createNewConditionId();
        conditionId = newConditionId;
        setCurrentConditionId(newConditionId);
      }

      const newCondition: ShowCondition = {
        t: FormConditionType.Show,
        i: {
          co: {
            cIds: {
              [`${selectedQuestion.id}`]: selectedChoices,
            },
          },
        },
        o: {
          sIds: [`${parameters.id}`],
        },
      };

      const newConditions = {};

      // @ts-ignore
      newConditions[conditionId] = newCondition;
      analytics.track(AnalyticsEventName.BuilderSetSectionConditions, {});

      return newConditions;
    };

    const createNewConditionId = (): number => {
      const newConditionId = maxId + 1;
      onNewMaxId(maxId + 1);
      return newConditionId;
    };

    // Update this list of dependencies with any new configuration types to be shown in the side panel of a section.
    const deps = [name, selectedQuestion, selectedChoices, hasConditional];

    // Update the section after rendering, if
    useEffect(() => {
      if (updateImmediately.current) {
        update();
        updateImmediately.current = false;
        updateAfterDelay.current = false;
      } else if (updateAfterDelay.current) {
        const id = setTimeout(() => {
          update();
          updateImmediately.current = false;
          updateAfterDelay.current = false;
        }, 250);
        return () => {
          clearTimeout(id);
        };
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deps]);

    return (
      <SidebarPadding>
        <h3>
          <FormattedMessage
            {...IntlSectionSidebarMessages[SectionSidebarMessages.Heading]}
          />
        </h3>
        <Subheading>
          <FormattedMessage
            {...IntlSectionSidebarMessages[SectionSidebarMessages.SubHeading]}
          />
        </Subheading>

        <GroupLabel>
          <FormattedMessage
            {...IntlSectionSidebarMessages[SectionSidebarMessages.Name]}
          />
        </GroupLabel>
        <Textfield
          name="name"
          placeholder={intl.formatMessage(
            IntlSectionSidebarMessages[SectionSidebarMessages.NamePlaceholder],
          )}
          value={name}
          onChange={nameChanged}
        />

        <GroupLabel>
          <FormattedMessage
            {...IntlSectionSidebarMessages[SectionSidebarMessages.ShowSection]}
          />
        </GroupLabel>
        <ShowSectionDropdown
          value={showSection}
          onChange={hasConditionalChanged}
        />

        {hasConditional && (
          <>
            <GroupLabel>
              <FormattedMessage
                {...IntlSectionSidebarMessages[SectionSidebarMessages.When]}
              />
            </GroupLabel>
            <Subheading>
              <FormattedMessage
                {...IntlSectionSidebarMessages[SectionSidebarMessages.Question]}
              />
            </Subheading>
            <QuestionDropdown
              currentQuestion={selectedQuestion}
              questions={usableChoiceQuestions}
              onChange={hasQuestionChanged}
            />

            {selectedQuestion && (
              <>
                <GroupLabel>
                  <FormattedMessage
                    {...IntlSectionSidebarMessages[
                      SectionSidebarMessages.IsAnyOf
                    ]}
                  />
                </GroupLabel>
                <ConditionChoices
                  choices={selectedQuestion.choices || []}
                  selectedChoiceIds={selectedChoices}
                  onChange={hasSelectedChoicesChanged}
                />
              </>
            )}
          </>
        )}
      </SidebarPadding>
    );
  },
);

const getUsableChoiceQuestions = (state: any) => {
  const sectionPosition = state.selection.$anchor.pos;
  const choiceQuestionNodes = getChoiceQuestionNodes(state.doc);

  return choiceQuestionNodes
    .filter(node => {
      if (node.pos >= sectionPosition) {
        return false;
      }
      return (
        node.node.attrs.parameters.choices &&
        node.node.attrs.parameters.choices.length > 0
      );
    })
    .map(node => node.node.attrs.parameters);
};

const getChoiceQuestionNodes = (rootNode: any) => {
  return findChildren(rootNode, node => {
    if (
      !node.attrs ||
      !node.attrs.parameters ||
      node.attrs.extensionKey !== 'question'
    ) {
      return false;
    }
    const questionType = node.attrs.parameters.type;
    return !!choiceQuestionTypes.includes(questionType);
  });
};

const getSelectedQuestionFromParameters = (
  conditions: FormConditions | undefined,
  choiceQuestions: QuestionParameters[],
): QuestionParameters | undefined => {
  if (!conditions || Object.keys(conditions).length < 1) {
    return undefined;
  }
  const condition: FormCondition = conditions[Object.keys(conditions)[0]];
  if (!isShowCondition(condition) || !condition.i.co) {
    return undefined;
  }
  // Currently this code only supports one input per condition, because it returns from the first iteration of this loop
  for (const conditionQuestionId in condition.i.co.cIds) {
    return choiceQuestions.find(
      question => `${question.id}` === conditionQuestionId,
    );
  }
  return undefined;
};

const Subheading = styled.div`
  color: ${N200};
  font-size: 11px;
`;

const GroupLabel = styled.div`
  font-size: 12px;
  font-style: inherit;
  line-height: 1.33333;
  color: ${N800};
  font-weight: 600;
  text-transform: uppercase;
  margin-top: 20px;
  margin-bottom: 4px;
`;

const SidebarPadding = styled.div`
  margin-bottom: 30px;
  padding: 24px 16px 0 16px;
`;
