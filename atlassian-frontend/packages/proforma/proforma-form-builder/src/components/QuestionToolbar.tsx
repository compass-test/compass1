import React from 'react';

import {
  FormattedMessage,
  InjectedIntl,
  InjectedIntlProps,
  injectIntl,
} from 'react-intl';

import Button, { ButtonGroup } from '@atlaskit/button';
import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@atlaskit/dropdown-menu';
import { EditorActions } from '@atlaskit/editor-core';
import { FormQuestionType } from '@atlassian/proforma-common-core/form-system-models';
import {
  IntlQuestionTypeMessages,
  QuestionTypeMessage,
} from '@atlassian/proforma-common-core/jira-common';
import { usePfAnalyticsUtils } from '@atlassian/proforma-common-core/jira-common-context';
import { AnalyticsEventName } from '@atlassian/proforma-common-core/jira-common-utils';

import { CheckBoxIcon } from './customIcons/CheckBoxIcon';
import { DateIcon } from './customIcons/DateIcon';
import { DateTimeIcon } from './customIcons/DateTimeIcon';
import { DropdownIcon } from './customIcons/DropdownIcon';
import { EmailIcon } from './customIcons/EmailIcon';
import { LongTextIcon } from './customIcons/LongTextIcon';
import { MultipleUsersIcon } from './customIcons/MultipleUsersIcon';
import { NumberIcon } from './customIcons/NumberIcon';
import { ParagraphIcon } from './customIcons/ParagraphIcon';
import { RadioIcon } from './customIcons/RadioIcon';
import { ShortTextIcon } from './customIcons/ShortTextIcon';
import { SingleUserIcon } from './customIcons/SingleUserIcon';
import { TimeIcon } from './customIcons/TimeIcon';
import { UrlIcon } from './customIcons/UrlIcon';
import { insertExtension } from './editor/extensionActions';
import { messages } from './messages';
import {
  IntlQuestionSidebarMessages,
  QuestionSidebarMessage,
} from './sidebar/QuestionSidebarMessages.intl';
import {
  IntlSectionSidebarMessages,
  SectionSidebarMessages,
} from './sidebar/SectionSidebarMessages.intl';
import { QuestionToolbarButtonGroupWrapper } from './styled';

interface QuestionToolbarProps {
  editorActions: EditorActions;

  /**
   * The maximum ID that has been used in this form so far.
   * This is used to ensure that each question and choices in the form has a unique ID.
   */
  maxId: number;

  /**
   * Handler called whenever the sidebar allocates a new ID.
   * @param maxId The maximum ID; the caller should store this number in its state as the new maximum.
   */
  onNewMaxId: (maxId: number) => void;

  toggleTemplates: () => void;
  displayTemplateButton: boolean;
  currentlyShowingTemplates: boolean;
}

export const generateQuestionExtensionNode = (
  id: number,
  type: FormQuestionType,
  intl: InjectedIntl,
  label?: string,
): Record<string, any> => {
  return {
    type: 'extension',
    attrs: {
      extensionType: 'com.thinktilt.proforma',
      extensionKey: 'question',
      parameters: {
        id,
        type,
        label:
          label ||
          intl.formatMessage(
            IntlQuestionSidebarMessages[QuestionSidebarMessage.Label],
          ),
        validation: {},
      },
      layout: 'default',
    },
  };
};

const generateSectionExtensionNode = (
  id: number,
  intl: InjectedIntl,
  name?: string,
): Record<string, any> => {
  return {
    type: 'extension',
    attrs: {
      extensionType: 'com.thinktilt.proforma',
      extensionKey: 'section',
      parameters: {
        id,
        name,
        conditions: {},
        extensionTitle: name
          ? `${intl.formatMessage(
              IntlQuestionSidebarMessages[QuestionSidebarMessage.Section],
            )}: ${name}`
          : undefined,
      },
      layout: 'default',
    },
  };
};

/**
 * A toolbar for the form builder that allows questions to be inserted into the editor.
 *
 * The field dropdown currently contains sample data only. It needs to be replaced with actual Jira fields.
 */
export const QuestionToolbar = injectIntl(
  ({
    editorActions,
    maxId,
    onNewMaxId,
    toggleTemplates,
    displayTemplateButton,
    currentlyShowingTemplates,
    intl,
  }: QuestionToolbarProps & InjectedIntlProps) => {
    const analytics = usePfAnalyticsUtils();

    const generateClickHandler = (type: FormQuestionType, label?: string) => {
      // Insert the given extension type into the document
      return (): void => {
        const newMaxId = maxId + 1;
        const questionLabel = label || undefined;
        const questionExtension = generateQuestionExtensionNode(
          newMaxId,
          type,
          intl,
          questionLabel,
        );

        if (insertExtension(editorActions, questionExtension, false)) {
          analytics.track(AnalyticsEventName.BuilderInsertQuestion, {
            questionType: type,
          });
          onNewMaxId(newMaxId);
        }
      };
    };

    const sectionHandler = (): void => {
      const newSectionId = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
      const sectionLabel = undefined;
      const sectionExtension = generateSectionExtensionNode(
        newSectionId,
        intl,
        sectionLabel,
      );

      insertExtension(editorActions, sectionExtension, true);
    };

    const handleShowTemplates = (): void => {
      analytics.track(AnalyticsEventName.BuilderOpenTemplateSidebar, {});
      toggleTemplates();
    };

    return (
      <QuestionToolbarButtonGroupWrapper>
        <ButtonGroup appearance="default">
          {displayTemplateButton && (
            <Button
              onClick={handleShowTemplates}
              isSelected={currentlyShowingTemplates}
            >
              <FormattedMessage {...messages.insertTemplateButtonLabel} />
            </Button>
          )}
          <DropdownMenu
            testId="proforma-insert-question"
            trigger={
              <FormattedMessage {...messages.insertQuestionButtonLabel} />
            }
            triggerType="button"
            shouldFlip={false}
            position="bottom right"
          >
            <DropdownItemGroup
              title={intl.formatMessage(
                IntlQuestionTypeMessages[
                  QuestionTypeMessage.TextQuestionsGroupLabel
                ],
              )}
            >
              <DropdownItem
                onClick={generateClickHandler(FormQuestionType.TextShort)}
                elemBefore={<ShortTextIcon />}
              >
                <FormattedMessage
                  {...IntlQuestionTypeMessages[
                    QuestionTypeMessage.TextShortLabel
                  ]}
                />
              </DropdownItem>
              <DropdownItem
                onClick={generateClickHandler(FormQuestionType.TextLong)}
                elemBefore={<LongTextIcon />}
              >
                <FormattedMessage
                  {...IntlQuestionTypeMessages[
                    QuestionTypeMessage.TextLongLabel
                  ]}
                />
              </DropdownItem>
              <DropdownItem
                onClick={generateClickHandler(FormQuestionType.TextParagraph)}
                elemBefore={<ParagraphIcon />}
              >
                <FormattedMessage
                  {...IntlQuestionTypeMessages[
                    QuestionTypeMessage.TextParagraphLabel
                  ]}
                />
              </DropdownItem>
              <DropdownItem
                onClick={generateClickHandler(FormQuestionType.TextEmail)}
                elemBefore={<EmailIcon />}
              >
                <FormattedMessage
                  {...IntlQuestionTypeMessages[
                    QuestionTypeMessage.TextEmailLabel
                  ]}
                />
              </DropdownItem>
              <DropdownItem
                onClick={generateClickHandler(FormQuestionType.TextUrl)}
                elemBefore={<UrlIcon />}
              >
                <FormattedMessage
                  {...IntlQuestionTypeMessages[
                    QuestionTypeMessage.TextUrlLabel
                  ]}
                />
              </DropdownItem>
            </DropdownItemGroup>
            <DropdownItemGroup
              title={intl.formatMessage(
                IntlQuestionTypeMessages[
                  QuestionTypeMessage.ChoiceQuestionsGroupLabel
                ],
              )}
            >
              <DropdownItem
                onClick={generateClickHandler(FormQuestionType.ChoiceSingle)}
                elemBefore={<RadioIcon />}
              >
                <FormattedMessage
                  {...IntlQuestionTypeMessages[
                    QuestionTypeMessage.ChoiceSingleLabel
                  ]}
                />
              </DropdownItem>
              <DropdownItem
                onClick={generateClickHandler(FormQuestionType.ChoiceMultiple)}
                elemBefore={<CheckBoxIcon />}
              >
                <FormattedMessage
                  {...IntlQuestionTypeMessages[
                    QuestionTypeMessage.ChoiceMultipleLabel
                  ]}
                />
              </DropdownItem>
              <DropdownItem
                onClick={generateClickHandler(FormQuestionType.ChoiceDropdown)}
                elemBefore={<DropdownIcon />}
              >
                <FormattedMessage
                  {...IntlQuestionTypeMessages[
                    QuestionTypeMessage.ChoiceDropdownLabel
                  ]}
                />
              </DropdownItem>
              <DropdownItem
                onClick={generateClickHandler(
                  FormQuestionType.ChoiceDropdownMultiple,
                )}
                elemBefore={<DropdownIcon />}
                shouldAllowMultiline
              >
                <FormattedMessage
                  {...IntlQuestionTypeMessages[
                    QuestionTypeMessage.ChoiceDropdownMultipleLabel
                  ]}
                />
              </DropdownItem>
            </DropdownItemGroup>
            <DropdownItemGroup
              title={intl.formatMessage(
                IntlQuestionTypeMessages[
                  QuestionTypeMessage.DateQuestionsGroupLabel
                ],
              )}
            >
              <DropdownItem
                onClick={generateClickHandler(FormQuestionType.Date)}
                elemBefore={<DateIcon />}
              >
                <FormattedMessage
                  {...IntlQuestionTypeMessages[QuestionTypeMessage.DateLabel]}
                />
              </DropdownItem>
              <DropdownItem
                onClick={generateClickHandler(FormQuestionType.DateTime)}
                elemBefore={<DateTimeIcon />}
              >
                <FormattedMessage
                  {...IntlQuestionTypeMessages[
                    QuestionTypeMessage.DateTimeLabel
                  ]}
                />
              </DropdownItem>
              <DropdownItem
                onClick={generateClickHandler(FormQuestionType.Time)}
                elemBefore={<TimeIcon />}
              >
                <FormattedMessage
                  {...IntlQuestionTypeMessages[QuestionTypeMessage.TimeLabel]}
                />
              </DropdownItem>
            </DropdownItemGroup>
            <DropdownItemGroup
              title={intl.formatMessage(
                IntlQuestionTypeMessages[
                  QuestionTypeMessage.NumericQuestionsGroupLabel
                ],
              )}
            >
              <DropdownItem
                onClick={generateClickHandler(FormQuestionType.Number)}
                elemBefore={<NumberIcon />}
              >
                <FormattedMessage
                  {...IntlQuestionTypeMessages[QuestionTypeMessage.NumberLabel]}
                />
              </DropdownItem>
            </DropdownItemGroup>
            <DropdownItemGroup
              title={intl.formatMessage(
                IntlQuestionTypeMessages[
                  QuestionTypeMessage.UserQuestionsGroupLabel
                ],
              )}
            >
              <DropdownItem
                onClick={generateClickHandler(FormQuestionType.UserSingle)}
                elemBefore={<SingleUserIcon />}
              >
                <FormattedMessage
                  {...IntlQuestionTypeMessages[
                    QuestionTypeMessage.UserSingleLabel
                  ]}
                />
              </DropdownItem>
              <DropdownItem
                onClick={generateClickHandler(FormQuestionType.UserMultiple)}
                elemBefore={<MultipleUsersIcon />}
              >
                <FormattedMessage
                  {...IntlQuestionTypeMessages[
                    QuestionTypeMessage.UserMultipleLabel
                  ]}
                />
              </DropdownItem>
            </DropdownItemGroup>
          </DropdownMenu>
          <Button id="proforma-insert-section" onClick={sectionHandler}>
            <FormattedMessage
              {...IntlSectionSidebarMessages[SectionSidebarMessages.Heading]}
            />
          </Button>
        </ButtonGroup>
      </QuestionToolbarButtonGroupWrapper>
    );
  },
);
