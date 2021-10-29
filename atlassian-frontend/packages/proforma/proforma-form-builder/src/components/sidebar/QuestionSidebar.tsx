import React, { useEffect, useRef, useState } from 'react';

import { findChildren } from 'prosemirror-utils';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import styled from 'styled-components';

import { Checkbox } from '@atlaskit/checkbox';
import { DatePicker, TimePicker } from '@atlaskit/datetime-picker';
import { EditorActions } from '@atlaskit/editor-core';
import InlineMessage from '@atlaskit/inline-message';
import { ModalTransition } from '@atlaskit/modal-dialog';
import SectionMessage from '@atlaskit/section-message';
import { ValueType } from '@atlaskit/select';
import Textfield from '@atlaskit/textfield';
import { N200, N800 } from '@atlaskit/theme/colors';
import {
  DateTimePicker,
  times,
} from '@atlassian/proforma-common-core/form-system';
import {
  FormChoice,
  FormQuestionType,
  QuestionParametersAnswer,
  QuestionParametersChoice,
  QuestionParametersValidation,
} from '@atlassian/proforma-common-core/form-system-models';
import {
  isChoiceQuestionType,
  isTextQuestionType,
} from '@atlassian/proforma-common-core/form-system-utils';
import { FormField, PfLink } from '@atlassian/proforma-common-core/jira-common';
import {
  usePfAnalyticsUtils,
  usePfFlags,
} from '@atlassian/proforma-common-core/jira-common-context';
import {
  DataConnectionResponse,
  INSIGHT_OBJECT_LIMIT,
  isInsightChoiceApi,
  JiraField,
  RegexPattern,
  UserSearchType,
} from '@atlassian/proforma-common-core/jira-common-models';
import { AnalyticsEventName } from '@atlassian/proforma-common-core/jira-common-utils';

import { FormBuilderReferenceData } from '../../models/FormBuilderReferenceData';
import { fieldTypeToQuestionType } from '../../utils/fieldTypeToQuestionType';
import { QuestionExtensionSelection } from '../editor/ExtensionSelection';
import { isDuplicateQuestionKey } from '../helpers/questionKeyHelpers';

import { MinMaxChoice } from './choices/MinMaxChoice';
import { ReadonlySidebarChoices } from './choices/ReadonlySidebarChoices';
import { SidebarChoices } from './choices/SidebarChoices';
import { SingleChoiceSelect } from './choices/SingleChoiceSelect';
import { ConnectionConflictPopup } from './dataconnection/ConnectionConflictPopup';
import {
  ConnectionConflict,
  detectConnectionConflict,
} from './dataconnection/detectConnectionConflict';
import { QuestionDataConnectionDropdown } from './dataconnection/QuestionDataConnectionDropdown';
import { DefaultAnswerField } from './DefaultAnswerField';
import {
  detectFieldChoiceChange,
  FieldChoiceChange,
} from './jirafield/detectFieldChoiceChange';
import {
  detectFieldTypeChange,
  FieldTypeChange,
} from './jirafield/detectFieldTypeChange';
import {
  detectQuestionTypeFieldChange,
  QuestionTypeFieldChange,
} from './jirafield/detectQuestionTypeFieldChange';
import { FieldChoiceChangePopup } from './jirafield/FieldChoiceChangePopup';
import { FieldTypeChangePopup } from './jirafield/FieldTypeChangePopup';
import { QuestionJiraFieldDropdown } from './jirafield/QuestionJiraFieldDropdown';
import { RemoveDataConnectionPopup } from './jirafield/RemoveDataConnectionPopup';
import { RemoveJiraFieldPopup } from './jirafield/RemoveJiraFieldPopup';
import {
  IntlQuestionSidebarMessages,
  QuestionSidebarMessage,
} from './QuestionSidebarMessages.intl';
import { QuestionTypeDropdown } from './QuestionTypeDropdown';
import { SideBarSelectStyles } from './styles';
import { UserSearchTypeDropdown } from './usersearch/UserSearchTypeDropdown';
import {
  IntlUserSearchTypeMessages,
  UserSearchOption,
} from './UserSearchTypeMessages.intl';
import { MinMaxType } from './validation/MinMaxDropdown';
import { MinMaxNumber } from './validation/MinMaxNumber';
import { MinMaxText } from './validation/MinMaxText';
import { QuestionKeysConflictPopup } from './validation/QuestionKeysConflictPopup';

interface QuestionSidebarProps extends QuestionExtensionSelection {
  refData: FormBuilderReferenceData;
  questionKeys: Map<string, string>;
  onNewQuestionKey: (questionKey: string, questionId: string) => void;
  editorActions: EditorActions;
  loadLinkedJiraFieldInsightChoices: (
    jiraField: JiraField,
  ) => Promise<QuestionParametersChoice[]>;
}

const toNumberOrUndefined = (value: string) =>
  value === '0' ? 0 : value ? parseInt(value, 10) : undefined;
const toStringOrUndefined = (value: string) =>
  value.trim().length === 0 ? undefined : value;

/**
 * A sidebar for the form builder where questions can be edited.
 */
export const QuestionSidebar = injectIntl(
  ({
    extension,
    refData,
    questionKeys,
    onNewQuestionKey,
    updateExtension,
    editorActions,
    loadLinkedJiraFieldInsightChoices,
    intl,
  }: QuestionSidebarProps & InjectedIntlProps) => {
    const { parameters } = extension;
    const { id, validation } = parameters;

    const analytics = usePfAnalyticsUtils();
    const flags = usePfFlags();

    const questionId = String(id);
    /**
     * Set to true whenever the question has changed, but should only be updated after a delay.
     * This is used for changes which are typed in to avoid updating on every keypress.
     */
    const updateAfterDelay = useRef(false);

    /**
     * Set to true whenever the question has changed, and it should be updated immediately.
     * This is used for changes which are not typed such as toggles and dropdowns.
     */
    const updateImmediately = useRef(false);

    const [jiraFieldKey, setJiraFieldKey] = useState<string | undefined>(
      parameters.jiraField,
    );
    const jiraField: JiraField | undefined = jiraFieldKey
      ? refData.jiraFieldMap?.get(jiraFieldKey)
      : undefined;

    const updateJiraFieldKey = (jiraField?: JiraField): void => {
      if (flags.ReadOnlyQuestions) {
        if (jiraField && jiraField.readOnly) {
          setDefaultAnswer({});
          setIsReadOnly(true);
          setReadOnlyLocked(true);
        } else {
          setIsReadOnly(false);
          setReadOnlyLocked(false);
        }
      }
      if (
        jiraField &&
        !jiraField.choices &&
        jiraField.choiceApi &&
        isInsightChoiceApi(jiraField.choiceApi)
      ) {
        loadLinkedJiraFieldInsightChoices(jiraField).then(_ => {
          setJiraFieldKey(jiraField.key);
          updateImmediately.current = true;
        });
      } else {
        setJiraFieldKey(jiraField?.key);
        updateImmediately.current = true;
      }
    };

    const isJiraFieldInsightChoicesRestricted = (
      type: FormQuestionType,
    ): boolean =>
      !!jiraField?.choiceApi &&
      isInsightChoiceApi(jiraField?.choiceApi) &&
      (type === FormQuestionType.ChoiceMultiple ||
        type === FormQuestionType.ChoiceSingle);

    const [dataConnectionId, setDataConnectionId] = useState<
      string | undefined
    >(parameters.dcId);
    const dataConnectionResponse: DataConnectionResponse | undefined =
      dataConnectionId && refData.dataConnectionMap
        ? refData.dataConnectionMap.get(dataConnectionId)
        : undefined;

    const [linkedJiraFields, setLinkedJiraFields] = useState<string[]>([]);

    useEffect(() => {
      let linkedFieldsInDoc = getLinkedFieldsInDoc();
      if (jiraField) {
        linkedFieldsInDoc = linkedFieldsInDoc.filter(
          linkedFieldKey => linkedFieldKey !== jiraField.key,
        );
      }
      setLinkedJiraFields(linkedFieldsInDoc);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [extension, jiraField, refData]);

    const getLinkedFieldsInDoc = (): string[] => {
      const editorView = editorActions._privateGetEditorView();
      if (!editorView) {
        // eslint-disable-next-line no-console
        console.error(
          `Could not check for already linked Jira fields, unable to fetch editorView`,
        );
        return [];
      }

      const currentEditorValue = editorView.state.doc;
      return findChildren(
        currentEditorValue,
        node =>
          node.attrs &&
          node.attrs.parameters &&
          node.attrs.parameters.jiraField,
      ).map(nodeWithPos => nodeWithPos.node.attrs.parameters.jiraField);
    };

    /** * Question type ** */
    const [type, setType] = useState(parameters.type);
    const [
      confirmQuestionTypeFieldChange,
      setConfirmQuestionTypeFieldChange,
    ] = useState<QuestionTypeFieldChange>();

    const typeChanged = (newQuestionType: FormQuestionType) => {
      const questionTypeFieldChange = detectQuestionTypeFieldChange(
        newQuestionType,
        jiraField,
        dataConnectionResponse,
      );
      if (questionTypeFieldChange) {
        setConfirmQuestionTypeFieldChange(questionTypeFieldChange);
      } else {
        setType(newQuestionType);
        updateImmediately.current = true;
        analytics.track(AnalyticsEventName.BuilderChangeQuestion, {
          questionType: newQuestionType,
        });
      }
    };

    const applyQuestionTypeChange: () => void = () => {
      if (confirmQuestionTypeFieldChange) {
        updateJiraFieldKey();
        setDataConnectionId(undefined);
        setRequiredChoice('');
        setType(confirmQuestionTypeFieldChange.newQuestionType);
        setConfirmQuestionTypeFieldChange(undefined);
        updateImmediately.current = true;
        analytics.track(AnalyticsEventName.BuilderChangeQuestion, {
          questionType: confirmQuestionTypeFieldChange.newQuestionType,
        });
      }
    };

    const cancelQuestionTypeChange: () => void = () => {
      setConfirmQuestionTypeFieldChange(undefined);
    };

    /** * Label ** */
    const [label, setLabel] = useState(parameters.label);
    const labelChanged = (newLabel: string): void => {
      setLabel(newLabel);
      updateAfterDelay.current = true;
    };
    const textFieldLabelChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
      labelChanged(e.target.value);

    /** * Description ** */
    const [description, setDescription] = useState(
      parameters.description || '',
    );
    const descriptionChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newDescription = e.target.value;
      setDescription(newDescription);
      updateAfterDelay.current = true;
    };

    /** * Choices ** */
    const [choices, setChoices] = useState<QuestionParametersChoice[]>(
      parameters.choices || [],
    );
    const choicesChanged = (newChoices: QuestionParametersChoice[]) => {
      setChoices(newChoices);
      updateImmediately.current = true;
    };

    /** * Read only ** */
    const [isReadOnly, setIsReadOnly] = useState(parameters.readOnly || false);
    const [readOnlyLocked, setReadOnlyLocked] = useState(
      jiraField?.readOnly || false,
    );
    const readOnlyChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newReadOnly = e.target.checked;
      setIsReadOnly(newReadOnly);
      updateImmediately.current = true;
    };

    /** * Required validation ** */
    const [required, setRequired] = useState(validation.rq || false);
    const requiredChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newRequired = e.target.checked;
      setRequired(newRequired);
      updateImmediately.current = true;
    };

    /** * Whole numbers only validation ** */
    const [wholeNumbersOnly, setWholeNumbersOnly] = useState(
      validation.wh || false,
    );
    const wholeNumbersOnlyChanged = (
      e: React.ChangeEvent<HTMLInputElement>,
    ) => {
      const newWholeNumbersOnly = e.target.checked;
      setWholeNumbersOnly(newWholeNumbersOnly);
      updateImmediately.current = true;
    };

    /** * Minimum and maximum character/word validation ** */
    // Convert minimum and maximum validation to strings so they can be used in a text field more easily.
    let initialTextMin: number | undefined;
    let initialTextMinCw: MinMaxType;
    let initialTextMax: number | undefined;
    let initialTextMaxCw: MinMaxType;
    if (validation.mnc || !validation.mnw) {
      initialTextMin = validation.mnc;
      initialTextMinCw = MinMaxType.characters;
    } else {
      initialTextMin = validation.mnw;
      initialTextMinCw = MinMaxType.words;
    }
    if (validation.mxc || !validation.mxw) {
      initialTextMax = validation.mxc;
      initialTextMaxCw = MinMaxType.characters;
    } else {
      initialTextMax = validation.mxw;
      initialTextMaxCw = MinMaxType.words;
    }

    const [textMin, setTextMin] = useState<string>(
      String(initialTextMin || ''),
    );
    const [textMinCw, setTextMinCw] = useState<MinMaxType>(initialTextMinCw);
    const [textMax, setTextMax] = useState<string>(
      String(initialTextMax || ''),
    );
    const [textMaxCw, setTextMaxCw] = useState<MinMaxType>(initialTextMaxCw);

    const textMinChanged = (newMinimum: string, newType: MinMaxType) => {
      setTextMin(newMinimum);
      setTextMinCw(newType);
      updateAfterDelay.current = true;
    };
    const textMaxChanged = (newMaximum: string, newType: MinMaxType) => {
      setTextMax(newMaximum);
      setTextMaxCw(newType);
      updateAfterDelay.current = true;
    };

    /** * Minimum and maximum number validation ** */
    // Convert minimum and maximum numbers to strings. Note numbers can be negative so a zero is useful and so is preserved.
    const [numMin, setNumMin] = useState<string>(
      String(validation.mnn === 0 ? '0' : validation.mnn || ''),
    );
    const [numMax, setNumMax] = useState<string>(
      String(validation.mxn === 0 ? '0' : validation.mxn || ''),
    );

    const numMinChanged = (newMinimum: string) => {
      setNumMin(newMinimum);
      updateAfterDelay.current = true;
    };
    const numMaxChanged = (newMaximum: string) => {
      setNumMax(newMaximum);
      updateAfterDelay.current = true;
    };

    /** * Minimum and maximum date validation ** */
    const [dateMin, setDateMin] = useState<string>(validation.mnd || '');
    const [dateMax, setDateMax] = useState<string>(validation.mxd || '');
    const [timeMin, setTimeMin] = useState<string>(validation.mnt || '');
    const [timeMax, setTimeMax] = useState<string>(validation.mxt || '');

    const dateMinChanged = (value: string) => {
      const newMinimum = value.trim();
      setDateMin(newMinimum);
      updateAfterDelay.current = true;
    };
    const dateMaxChanged = (value: string) => {
      const newMaximum = value.trim();
      setDateMax(newMaximum);
      updateAfterDelay.current = true;
    };

    const timeMinChanged = (value: string) => {
      const newMinimum = value.trim();
      setTimeMin(newMinimum);
      updateAfterDelay.current = true;
    };
    const timeMaxChanged = (value: string) => {
      const newMaximum = value.trim();
      setTimeMax(newMaximum);
      updateAfterDelay.current = true;
    };

    /** * Regular expression validation ** */
    const [regexEnabled, setRegexEnabled] = useState<boolean>(
      !!validation.rgx || false,
    );
    const regexPatternEnabled = (e: React.ChangeEvent<HTMLInputElement>) => {
      const isEnabled = e.target.checked;
      setRegexEnabled(isEnabled);
      updateAfterDelay.current = true;
    };
    const [regexPattern, setRegexPattern] = useState<string>(
      (validation.rgx && validation.rgx.p) || '',
    );
    const regexPatternChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newRegexPattern = regexEnabled ? e.target.value : '';
      analytics.track(AnalyticsEventName.BuilderSetRegexValidation, {});
      setRegexPattern(newRegexPattern);
      updateAfterDelay.current = true;
    };
    const [regexMessage, setRegexMessage] = useState<string>(
      (validation.rgx && validation.rgx.m) || '',
    );
    const regexMessageChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newRegexMessage = regexEnabled ? e.target.value : '';
      setRegexMessage(newRegexMessage);
      updateAfterDelay.current = true;
    };

    /** * Minimum and maximum number validation ** */
    // Convert minimum and maximum numbers to strings. Note numbers can be negative so a zero is useful and so is preserved.
    const [numMinChoices, setNumMinChoices] = useState<string>(
      String(validation.mns === 0 ? '0' : validation.mns || ''),
    );
    const [numMaxChoices, setNumMaxChoices] = useState<string>(
      String(validation.mxs === 0 ? '0' : validation.mxs || ''),
    );

    /** * Required validation ** */
    const [requiredChoice, setRequiredChoice] = useState<string>(
      validation.ch || '',
    );
    const requiredChoiceChanged = (v: ValueType<FormChoice>) => {
      setRequiredChoice((v as FormChoice).id);
      updateImmediately.current = true;
    };

    const numMinChoicesChanged = (newMinimum: string) => {
      setNumMinChoices(newMinimum);
      updateAfterDelay.current = true;
    };
    const numMaxChoicesChanged = (newMaximum: string) => {
      setNumMaxChoices(newMaximum);
      updateAfterDelay.current = true;
    };

    const [defaultAnswer, setDefaultAnswer] = useState<
      QuestionParametersAnswer
    >(parameters.defaultAnswer || {});
    const onDefaultAnswerChange = (answer?: QuestionParametersAnswer) => {
      setDefaultAnswer(answer || {});
      updateAfterDelay.current = true;
    };

    const [questionKey, setQuestionKey] = useState<string>(
      parameters.questionKey || '',
    );

    const duplicateQuestionKey = isDuplicateQuestionKey(
      questionId,
      questionKey,
      questionKeys,
    );
    const [duplicateQuestionModal, setDuplicateQuestionModal] = useState<
      boolean
    >(false);

    const onQuestionKeyChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
      const questionKey = e.target.value || '';
      if (questionKey.length) {
        analytics.track(AnalyticsEventName.BuilderSetQuestionKey, {});
      }
      setQuestionKey(questionKey);
      onNewQuestionKey(questionKey, questionId);
      updateAfterDelay.current = true;
    };

    const onQuestionKeyBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
      const questionKey = e.target.value || '';
      setQuestionKey(questionKey);
      onNewQuestionKey(questionKey, questionId);
      setDuplicateQuestionModal(
        isDuplicateQuestionKey(questionId, questionKey, questionKeys),
      );
      updateAfterDelay.current = true;
    };

    const cancelQuestionKey = () => {
      setQuestionKey('');
      setDuplicateQuestionModal(false);
    };

    /** * Linked Jira fields ** */
    const [confirmFieldTypeChange, setConfirmFieldTypeChange] = useState<
      FieldTypeChange
    >();
    const [confirmFieldChoiceChange, setConfirmFieldChoiceChange] = useState<
      FieldChoiceChange
    >();
    const [confirmConnectionConflict, setConfirmConnectionConflict] = useState<
      ConnectionConflict
    >();

    const jiraFieldChanged: () => void = async (newFieldKey?: string) => {
      if (newFieldKey) {
        analytics.track(AnalyticsEventName.BuilderLinkJiraField, {
          jiraField: newFieldKey,
        });
        const fieldTypeChange = await detectFieldTypeChange(
          refData,
          type,
          newFieldKey,
        );
        if (fieldTypeChange) {
          // The type of question is changing, so confirm the change before applying it
          setConfirmFieldTypeChange(fieldTypeChange);
        } else {
          const fieldChoiceChange = detectFieldChoiceChange(
            refData,
            type,
            jiraField,
            newFieldKey,
          );
          const newJiraField = refData.jiraFieldMap?.get(newFieldKey);
          const conflict = detectConnectionConflict(
            jiraField,
            dataConnectionResponse,
            newJiraField,
          );
          if (conflict) {
            // There is a conflict between the Jira field and the data connection
            setConfirmConnectionConflict(conflict);
          } else if (fieldChoiceChange) {
            // The choices on this question are changing, so confirm the change before applying it
            setConfirmFieldChoiceChange(fieldChoiceChange);
          } else {
            // The change can proceed immediately
            updateJiraFieldKey(newJiraField);
            setRequiredChoice('');
            updateImmediately.current = true;
          }
        }
      } else {
        updateJiraFieldKey();
        setRequiredChoice('');
        choicesChanged([]);
      }
    };

    const applyFieldTypeChange: () => void = () => {
      if (confirmFieldTypeChange) {
        setType(
          fieldTypeToQuestionType(
            confirmFieldTypeChange.newType,
            confirmFieldTypeChange.jiraField.key,
          ),
        );
        updateJiraFieldKey(confirmFieldTypeChange.jiraField);
        setRequiredChoice('');
        setDataConnectionId(undefined);
        setConfirmFieldTypeChange(undefined);
        updateImmediately.current = true;
      }
    };

    const cancelFieldTypeChange: () => void = () => {
      setConfirmFieldTypeChange(undefined);
    };

    const applyFieldChoiceChange: () => void = () => {
      if (confirmFieldChoiceChange) {
        updateJiraFieldKey(confirmFieldChoiceChange.jiraField);
        setRequiredChoice('');
        setConfirmFieldChoiceChange(undefined);
        updateImmediately.current = true;
      }
    };

    const cancelFieldChoiceChange: () => void = () => {
      setConfirmFieldChoiceChange(undefined);
    };

    /** * Data connection ** */
    const dataConnectionIdChanged = (newDataConnectionId?: string) => {
      if (newDataConnectionId) {
        analytics.track(AnalyticsEventName.BuilderUseDataConnection, {});
        const newDataConnection = refData.dataConnectionMap
          ? refData.dataConnectionMap.get(newDataConnectionId)
          : undefined;
        const conflict = detectConnectionConflict(
          jiraField,
          dataConnectionResponse,
          undefined,
          newDataConnection,
        );
        if (conflict) {
          setConfirmConnectionConflict(conflict);
        } else {
          setDataConnectionId(newDataConnectionId);
          setRequiredChoice('');
        }
        updateImmediately.current = true;
      } else {
        setDataConnectionId(undefined);
        setRequiredChoice('');
        choicesChanged([]);
      }
    };

    const cancelDataConnectionChanged: () => void = () => {
      setConfirmConnectionConflict(undefined);
    };

    const [searchType, setSearchType] = useState(parameters.searchType);
    const searchTypeChanged: () => void = (type?: UserSearchType) => {
      setSearchType(type);
      updateImmediately.current = true;
    };

    const pickChoices: () => QuestionParametersChoice[] = () => {
      if (jiraField) {
        // This is connected to a Jira field, so use the choices from that field
        return jiraField.choices || [];
      }

      if (dataConnectionResponse) {
        return dataConnectionResponse.choices;
      }

      return choices;
    };

    /**
     * Update the question. This should not be called directly, instead triggered by setting
     * either updateImmediately or updateAfterDelay to true.
     */
    const update = () => {
      const newDefaultAnswer = defaultAnswer ? defaultAnswer : {};

      updateExtension({
        ...parameters,
        type,
        label,
        description,
        choices: pickChoices(),
        jiraField: jiraFieldKey,
        dcId: dataConnectionId,
        questionKey,
        validation: getValidationConfigForQuestionType(type),
        defaultAnswer: newDefaultAnswer,
        searchType: searchType,
        ...(flags.ReadOnlyQuestions && {
          readOnly: isReadOnly,
        }),
      });
    };

    const getValidationConfigForQuestionType = (
      questionType: FormQuestionType,
    ): QuestionParametersValidation => {
      const pattern: RegexPattern | undefined = regexEnabled
        ? { p: regexPattern, m: regexMessage }
        : undefined;

      const validationConfig: QuestionParametersValidation = {
        rq: required,
      };

      if (isTextQuestionType(questionType)) {
        const minNumber = toNumberOrUndefined(textMin);
        if (textMinCw === MinMaxType.characters && minNumber && minNumber > 0) {
          validationConfig.mnc = minNumber;
        }
        if (textMinCw === MinMaxType.words && minNumber && minNumber > 0) {
          validationConfig.mnw = minNumber;
        }
        const maxNumber = toNumberOrUndefined(textMax);
        if (textMaxCw === MinMaxType.characters && maxNumber && maxNumber > 0) {
          validationConfig.mxc = maxNumber;
        }
        if (textMaxCw === MinMaxType.words && maxNumber && maxNumber > 0) {
          validationConfig.mxw = maxNumber;
        }
        validationConfig.rgx = pattern;
      }

      if (questionType === FormQuestionType.Number) {
        validationConfig.mnn = toNumberOrUndefined(numMin);
        validationConfig.mxn = toNumberOrUndefined(numMax);
        validationConfig.wh = wholeNumbersOnly;
      }

      if (
        questionType === FormQuestionType.Date ||
        questionType === FormQuestionType.DateTime
      ) {
        validationConfig.mnd = toStringOrUndefined(dateMin);
        validationConfig.mxd = toStringOrUndefined(dateMax);
      }

      if (
        questionType === FormQuestionType.Time ||
        questionType === FormQuestionType.DateTime
      ) {
        validationConfig.mnt = toStringOrUndefined(timeMin);
        validationConfig.mxt = toStringOrUndefined(timeMax);
      }

      if (isChoiceQuestionType(questionType)) {
        validationConfig.ch = toStringOrUndefined(requiredChoice);
      }

      if (
        questionType === FormQuestionType.ChoiceMultiple ||
        questionType === FormQuestionType.ChoiceDropdownMultiple
      ) {
        validationConfig.mns = toNumberOrUndefined(numMinChoices);
        validationConfig.mxs = toNumberOrUndefined(numMaxChoices);
      }

      return validationConfig;
    };

    // Update this list of dependencies with any new configuration types to be shown in the side panel of a question.
    const deps = [
      type,
      label,
      description,
      choices,
      required,
      textMin,
      textMinCw,
      textMax,
      textMaxCw,
      numMin,
      numMax,
      dateMin,
      dateMax,
      timeMin,
      timeMax,
      regexPattern,
      regexMessage,
      jiraFieldKey,
      dataConnectionId,
      numMinChoices,
      numMaxChoices,
      requiredChoice,
      defaultAnswer,
      wholeNumbersOnly,
      questionKey,
      searchType,
      isReadOnly,
    ];

    // Update the question after rendering, if
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

    const show = visibilityConfiguration[type] || {};

    const searchTypeOptions: UserSearchOption[] = [
      {
        name: intl.formatMessage(
          IntlQuestionSidebarMessages[
            QuestionSidebarMessage.DefaultUserSearchType
          ],
        ),
        value: '',
      },
      {
        name: intl.formatMessage(
          IntlUserSearchTypeMessages[
            UserSearchType.usersWithBrowseProjectPermission
          ],
        ),
        value: UserSearchType.usersWithBrowseProjectPermission,
      },
    ];

    return (
      <SidebarPadding>
        <h3>
          <FormattedMessage
            {...IntlQuestionSidebarMessages[QuestionSidebarMessage.Title]}
          />
        </h3>
        <Subheading>
          <FormattedMessage
            {...IntlQuestionSidebarMessages[QuestionSidebarMessage.SubTitle]}
          />
        </Subheading>

        <GroupLabel>
          <FormattedMessage
            {...IntlQuestionSidebarMessages[QuestionSidebarMessage.Type]}
          />
        </GroupLabel>
        <QuestionTypeDropdown value={type} onChange={typeChanged} />
        {show.jiraField && isJiraFieldInsightChoicesRestricted(type) && (
          <>
            <br />
            <SectionMessage
              title={intl.formatMessage(
                IntlQuestionSidebarMessages[
                  QuestionSidebarMessage.InsightChoicesLimitTitle
                ],
              )}
              appearance="warning"
            >
              <FormattedMessage
                {...IntlQuestionSidebarMessages[
                  QuestionSidebarMessage.InsightChoicesLimitMsg
                ]}
                values={{
                  insightChoicesLimit: INSIGHT_OBJECT_LIMIT,
                }}
              />
            </SectionMessage>
          </>
        )}

        <GroupLabel>
          <FormattedMessage
            {...IntlQuestionSidebarMessages[QuestionSidebarMessage.Label]}
          />
        </GroupLabel>
        <Textfield
          id="question-sidebar-label"
          name="label"
          placeholder={intl.formatMessage(
            IntlQuestionSidebarMessages[
              QuestionSidebarMessage.LabelPlaceholder
            ],
          )}
          value={label}
          onChange={textFieldLabelChanged}
        />

        <GroupLabel>
          <FormattedMessage
            {...IntlQuestionSidebarMessages[QuestionSidebarMessage.Description]}
          />
        </GroupLabel>
        <Textfield
          name="description"
          placeholder={intl.formatMessage(
            IntlQuestionSidebarMessages[
              QuestionSidebarMessage.DescriptionPlaceholder
            ],
          )}
          value={description}
          onChange={descriptionChanged}
        />

        {show.choices && (
          <>
            <GroupLabel>
              <FormattedMessage
                {...IntlQuestionSidebarMessages[QuestionSidebarMessage.Choices]}
              />
            </GroupLabel>
            {dataConnectionResponse && !jiraField && (
              <ReadonlySidebarChoices
                choices={dataConnectionResponse?.choices || []}
              />
            )}
            {jiraField && (
              <ReadonlySidebarChoices
                choices={jiraField.choices || []}
                hasMoreChoices={jiraField.hasMoreChoices}
              />
            )}
            {!jiraField && !dataConnectionResponse && (
              <SidebarChoices choices={choices} onChange={choicesChanged} />
            )}
          </>
        )}

        {show.default && !readOnlyLocked && (
          <DefaultAnswerField
            type={type}
            value={defaultAnswer}
            onChange={onDefaultAnswerChange}
            jiraField={jiraField}
            dataConnection={dataConnectionResponse}
            refData={refData}
            choices={choices}
          />
        )}

        {show.searchType && !isReadOnly && (
          <>
            <GroupLabel>
              <FormattedMessage
                {...IntlQuestionSidebarMessages[
                  QuestionSidebarMessage.UserSearchType
                ]}
              />
            </GroupLabel>
            <UserSearchTypeDropdown
              value={searchType}
              options={searchTypeOptions}
              onChange={searchTypeChanged}
            />
            <InlineMessage
              type="info"
              title={intl.formatMessage(
                IntlQuestionSidebarMessages[
                  QuestionSidebarMessage.SearchTypesExplainedTitle
                ],
              )}
            >
              <p>
                <strong>
                  <FormattedMessage
                    {...IntlQuestionSidebarMessages[
                      QuestionSidebarMessage.DefaultUserSearchType
                    ]}
                  />
                </strong>
                <br />
                <FormattedMessage
                  {...IntlQuestionSidebarMessages[
                    QuestionSidebarMessage.DefaultUserSearchTypeText1
                  ]}
                />
                <br />
                <FormattedMessage
                  {...IntlQuestionSidebarMessages[
                    QuestionSidebarMessage.DefaultUserSearchTypeText2
                  ]}
                />
              </p>
              <p>
                <strong>
                  <FormattedMessage
                    {...IntlQuestionSidebarMessages[
                      QuestionSidebarMessage.UsersWithBrowseProjectsSearchType
                    ]}
                  />
                </strong>
                <br />
                <FormattedMessage
                  {...IntlQuestionSidebarMessages[
                    QuestionSidebarMessage.UsersWithBrowseProjectsSearchText
                  ]}
                />
              </p>
            </InlineMessage>
          </>
        )}

        {show.jiraField && (
          <>
            <GroupLabel>
              <FormattedMessage
                {...IntlQuestionSidebarMessages[
                  QuestionSidebarMessage.LinkedJiraField
                ]}
              />
            </GroupLabel>
            <QuestionJiraFieldDropdown
              placeholder={intl.formatMessage(
                IntlQuestionSidebarMessages[
                  QuestionSidebarMessage.LinkedJiraFieldPlaceholder
                ],
              )}
              value={jiraFieldKey}
              onChange={jiraFieldChanged}
              refData={refData}
              linkedJiraFields={linkedJiraFields}
            />
          </>
        )}

        {show.dcId && (
          <>
            <GroupLabel>
              <FormattedMessage
                {...IntlQuestionSidebarMessages[
                  QuestionSidebarMessage.DataConnection
                ]}
              />
            </GroupLabel>
            <QuestionDataConnectionDropdown
              placeholder={intl.formatMessage(
                IntlQuestionSidebarMessages[
                  QuestionSidebarMessage.DataConnectionPlaceholder
                ],
              )}
              value={dataConnectionId}
              onChange={dataConnectionIdChanged}
              refData={refData}
            />
          </>
        )}

        {flags.ReadOnlyQuestions && (show.readOnly || readOnlyLocked) && (
          <>
            <GroupLabel>
              <FormattedMessage
                {...IntlQuestionSidebarMessages[
                  QuestionSidebarMessage.EditProperties
                ]}
              />
            </GroupLabel>
            <Checkbox
              isChecked={isReadOnly}
              onChange={readOnlyChanged}
              label={intl.formatMessage(
                IntlQuestionSidebarMessages[QuestionSidebarMessage.ReadOnly],
              )}
              name="readOnly"
              isDisabled={readOnlyLocked}
            />
          </>
        )}

        {!(flags.ReadOnlyQuestions && isReadOnly) && (
          <div>
            {(show.minMaxText ||
              show.minMaxChoices ||
              show.minMaxDate ||
              show.minMaxNum ||
              show.minMaxTime ||
              show.responseRequired ||
              show.regexPattern) && (
              <GroupLabel>
                <FormattedMessage
                  {...IntlQuestionSidebarMessages[
                    QuestionSidebarMessage.Validation
                  ]}
                />
              </GroupLabel>
            )}

            {show.responseRequired && (
              <Checkbox
                isChecked={required}
                onChange={requiredChanged}
                label={intl.formatMessage(
                  IntlQuestionSidebarMessages[
                    QuestionSidebarMessage.ValidationResponseRequired
                  ],
                )}
                name="required"
              />
            )}

            {show.regexPattern && (
              <Checkbox
                label={intl.formatMessage(
                  IntlQuestionSidebarMessages[
                    QuestionSidebarMessage.ValidationMatchRegex
                  ],
                )}
                isChecked={regexEnabled}
                onChange={regexPatternEnabled}
              />
            )}

            {show.minMaxText && (
              <>
                <MinMaxText
                  label={intl.formatMessage(
                    IntlQuestionSidebarMessages[
                      QuestionSidebarMessage.ValidationMinimum
                    ],
                  )}
                  placeholder={intl.formatMessage(
                    IntlQuestionSidebarMessages[
                      QuestionSidebarMessage.ValidationMinimumPlaceholder
                    ],
                  )}
                  value={textMin}
                  type={textMinCw}
                  onChange={textMinChanged}
                />
                <MinMaxText
                  label={intl.formatMessage(
                    IntlQuestionSidebarMessages[
                      QuestionSidebarMessage.ValidationMaximum
                    ],
                  )}
                  placeholder={intl.formatMessage(
                    IntlQuestionSidebarMessages[
                      QuestionSidebarMessage.ValidationMaximumPlaceholder
                    ],
                  )}
                  value={textMax}
                  type={textMaxCw}
                  onChange={textMaxChanged}
                />
              </>
            )}

            {show.minMaxNum && (
              <>
                <MinMaxNumber
                  label={intl.formatMessage(
                    IntlQuestionSidebarMessages[
                      QuestionSidebarMessage.ValidationMinimum
                    ],
                  )}
                  placeholder={intl.formatMessage(
                    IntlQuestionSidebarMessages[
                      QuestionSidebarMessage.ValidationMinimumPlaceholder
                    ],
                  )}
                  value={numMin}
                  onChange={numMinChanged}
                />
                <MinMaxNumber
                  label={intl.formatMessage(
                    IntlQuestionSidebarMessages[
                      QuestionSidebarMessage.ValidationMaximum
                    ],
                  )}
                  placeholder={intl.formatMessage(
                    IntlQuestionSidebarMessages[
                      QuestionSidebarMessage.ValidationMaximumPlaceholder
                    ],
                  )}
                  value={numMax}
                  onChange={numMaxChanged}
                />
              </>
            )}

            {show.wholeNumValidation && (
              <Checkbox
                isChecked={wholeNumbersOnly}
                onChange={wholeNumbersOnlyChanged}
                label={intl.formatMessage(
                  IntlQuestionSidebarMessages[
                    QuestionSidebarMessage.ValidationWholeNumber
                  ],
                )}
                name="wholeNumbersOnly"
              />
            )}

            {show.minMaxChoices && (
              <>
                <MinMaxChoice
                  label={intl.formatMessage(
                    IntlQuestionSidebarMessages[
                      QuestionSidebarMessage.ValidationMinChoices
                    ],
                  )}
                  value={numMinChoices}
                  onChange={numMinChoicesChanged}
                  jiraField={jiraField}
                  dataConnection={dataConnectionResponse}
                  refData={refData}
                  choices={choices}
                />
                <MinMaxChoice
                  label={intl.formatMessage(
                    IntlQuestionSidebarMessages[
                      QuestionSidebarMessage.ValidationMaxChoices
                    ],
                  )}
                  value={numMaxChoices}
                  onChange={numMaxChoicesChanged}
                  jiraField={jiraField}
                  dataConnection={dataConnectionResponse}
                  refData={refData}
                  choices={choices}
                />
              </>
            )}

            {show.minMaxDate && !show.minMaxTime && (
              <>
                <FieldLabel>
                  <FormattedMessage
                    {...IntlQuestionSidebarMessages[
                      QuestionSidebarMessage.ValidationMinDate
                    ]}
                  />
                </FieldLabel>
                <DatePicker
                  id="mindate"
                  value={dateMin}
                  onChange={dateMinChanged}
                  locale={intl.locale ? intl.locale : 'en-US'}
                  placeholder={intl.formatMessage(
                    IntlQuestionSidebarMessages[
                      QuestionSidebarMessage.ValidationMinDatePlaceholder
                    ],
                  )}
                  selectProps={darkSelectProps}
                />

                <FieldLabel>
                  <FormattedMessage
                    {...IntlQuestionSidebarMessages[
                      QuestionSidebarMessage.ValidationMaxDate
                    ]}
                  />
                </FieldLabel>
                <DatePicker
                  id="maxdate"
                  value={dateMax}
                  onChange={dateMaxChanged}
                  locale={intl.locale ? intl.locale : 'en-US'}
                  placeholder={intl.formatMessage(
                    IntlQuestionSidebarMessages[
                      QuestionSidebarMessage.ValidationMaxDatePlaceholder
                    ],
                  )}
                  selectProps={darkSelectProps}
                />
              </>
            )}

            {show.minMaxDate && show.minMaxTime && (
              <>
                <FieldLabel>
                  <FormattedMessage
                    {...IntlQuestionSidebarMessages[
                      QuestionSidebarMessage.ValidationMinDateAndTime
                    ]}
                  />
                </FieldLabel>
                <DateTimePicker
                  dark
                  dateValue={dateMin}
                  timeValue={timeMin}
                  onDateChange={dateMinChanged}
                  onTimeChange={timeMinChanged}
                  datePlaceholder={intl.formatMessage(
                    IntlQuestionSidebarMessages[
                      QuestionSidebarMessage.ValidationMinDatePlaceholder
                    ],
                  )}
                  timePlaceholder={intl.formatMessage(
                    IntlQuestionSidebarMessages[
                      QuestionSidebarMessage.ValidationMinTimePlaceholder
                    ],
                  )}
                  locale={intl.locale ? intl.locale : 'en-US'}
                />

                <FieldLabel>
                  <FormattedMessage
                    {...IntlQuestionSidebarMessages[
                      QuestionSidebarMessage.ValidationMaxDateAndTime
                    ]}
                  />
                </FieldLabel>
                <DateTimePicker
                  dark
                  dateValue={dateMax}
                  timeValue={timeMax}
                  onDateChange={dateMaxChanged}
                  onTimeChange={timeMaxChanged}
                  datePlaceholder={intl.formatMessage(
                    IntlQuestionSidebarMessages[
                      QuestionSidebarMessage.ValidationMaxDatePlaceholder
                    ],
                  )}
                  timePlaceholder={intl.formatMessage(
                    IntlQuestionSidebarMessages[
                      QuestionSidebarMessage.ValidationMaxTimePlaceholder
                    ],
                  )}
                  locale={intl.locale ? intl.locale : 'en-US'}
                />
              </>
            )}

            {!show.minMaxDate && show.minMaxTime && (
              <>
                <FieldLabel>
                  <FormattedMessage
                    {...IntlQuestionSidebarMessages[
                      QuestionSidebarMessage.ValidationMinTime
                    ]}
                  />
                </FieldLabel>
                <TimePicker
                  id="mintime"
                  value={timeMin}
                  onChange={timeMinChanged}
                  timeIsEditable
                  placeholder={intl.formatMessage(
                    IntlQuestionSidebarMessages[
                      QuestionSidebarMessage.ValidationMinTimePlaceholder
                    ],
                  )}
                  selectProps={darkSelectProps}
                  times={times}
                />
                <FieldLabel>
                  <FormattedMessage
                    {...IntlQuestionSidebarMessages[
                      QuestionSidebarMessage.ValidationMaxTime
                    ]}
                  />
                </FieldLabel>
                <TimePicker
                  id="maxtime"
                  value={timeMax}
                  onChange={timeMaxChanged}
                  timeIsEditable
                  placeholder={intl.formatMessage(
                    IntlQuestionSidebarMessages[
                      QuestionSidebarMessage.ValidationMaxTimePlaceholder
                    ],
                  )}
                  selectProps={darkSelectProps}
                  times={times}
                />
              </>
            )}

            {show.regexPattern && (
              <>
                <FieldLabel>
                  <FormattedMessage
                    {...IntlQuestionSidebarMessages[
                      QuestionSidebarMessage.ValidationRegexPattern
                    ]}
                  />{' '}
                  <PfLink
                    href="http://links.thinktilt.net/regex-examples"
                    message={
                      IntlQuestionSidebarMessages[
                        QuestionSidebarMessage.ValidationRegexExample
                      ]
                    }
                  />
                </FieldLabel>
                <Textfield
                  isDisabled={!regexEnabled}
                  placeholder={intl.formatMessage(
                    IntlQuestionSidebarMessages[
                      QuestionSidebarMessage.ValidationRegexPlaceholder
                    ],
                  )}
                  value={regexPattern}
                  onChange={regexPatternChanged}
                />
                <FieldLabel>
                  <FormattedMessage
                    {...IntlQuestionSidebarMessages[
                      QuestionSidebarMessage.ValidationRegexMessage
                    ]}
                  />
                </FieldLabel>
                <Textfield
                  isDisabled={!regexEnabled}
                  placeholder=""
                  value={regexMessage}
                  onChange={regexMessageChanged}
                />
              </>
            )}

            {show.requiredChoice && (
              <>
                <FieldLabel>
                  <FormattedMessage
                    {...IntlQuestionSidebarMessages[
                      QuestionSidebarMessage.ValidationRequiredChoice
                    ]}
                  />
                </FieldLabel>
                <SingleChoiceSelect
                  placeholder={intl.formatMessage(
                    IntlQuestionSidebarMessages[
                      QuestionSidebarMessage.ValidationRequiredChoicePlaceholder
                    ],
                  )}
                  value={requiredChoice}
                  onChange={requiredChoiceChanged}
                  jiraField={jiraField}
                  dataConnection={dataConnectionResponse}
                  refData={refData}
                  choices={choices}
                  isDisabled={false}
                  noResponse
                />
              </>
            )}
          </div>
        )}

        {show.questionKey && (
          <>
            <GroupLabel>
              <FormattedMessage
                {...IntlQuestionSidebarMessages[
                  QuestionSidebarMessage.QuestionKey
                ]}
              />
            </GroupLabel>
            <FormField
              label=""
              error={
                duplicateQuestionKey
                  ? intl.formatMessage(
                      IntlQuestionSidebarMessages[
                        QuestionSidebarMessage.QuestionKeyErrorMsg
                      ],
                    )
                  : undefined
              }
            >
              <Textfield
                name="questionKey"
                placeholder={intl.formatMessage(
                  IntlQuestionSidebarMessages[
                    QuestionSidebarMessage.QuestionKeyPlaceholder
                  ],
                )}
                value={questionKey}
                onChange={onQuestionKeyChanged}
                onBlur={onQuestionKeyBlur}
              />
            </FormField>
          </>
        )}

        <ModalTransition>
          {confirmConnectionConflict && (
            <ConnectionConflictPopup
              {...confirmConnectionConflict}
              onCancel={cancelDataConnectionChanged}
            />
          )}
          {confirmFieldTypeChange && (
            <FieldTypeChangePopup
              {...confirmFieldTypeChange}
              onConfirm={applyFieldTypeChange}
              onCancel={cancelFieldTypeChange}
            />
          )}
          {confirmFieldChoiceChange && (
            <FieldChoiceChangePopup
              {...confirmFieldChoiceChange}
              onConfirm={applyFieldChoiceChange}
              onCancel={cancelFieldChoiceChange}
            />
          )}
          {confirmQuestionTypeFieldChange?.jiraField && (
            <RemoveJiraFieldPopup
              {...confirmQuestionTypeFieldChange}
              jiraField={confirmQuestionTypeFieldChange.jiraField}
              onConfirm={applyQuestionTypeChange}
              onCancel={cancelQuestionTypeChange}
            />
          )}
          {confirmQuestionTypeFieldChange?.dataConnection && (
            <RemoveDataConnectionPopup
              {...confirmQuestionTypeFieldChange}
              dataConnection={confirmQuestionTypeFieldChange.dataConnection}
              onConfirm={applyQuestionTypeChange}
              onCancel={cancelQuestionTypeChange}
            />
          )}
          {duplicateQuestionModal && (
            <QuestionKeysConflictPopup
              onCancel={cancelQuestionKey}
              questionKey={questionKey}
            />
          )}
        </ModalTransition>
      </SidebarPadding>
    );
  },
);

type VisibilityType = {
  [key in FormQuestionType]: {
    choices?: boolean;
    minMaxDate?: boolean;
    minMaxNum?: boolean;
    minMaxText?: boolean;
    minMaxTime?: boolean;
    regexPattern?: boolean;
    jiraField?: boolean;
    dcId?: boolean;
    minMaxChoices?: boolean;
    requiredChoice?: boolean;
    default?: boolean;
    wholeNumValidation?: boolean;
    responseRequired?: boolean;
    questionKey?: boolean;
    searchType?: boolean;
    readOnly?: boolean;
  };
};

/**
 * Defines which sections of the sidebar are visible depending on the question type.
 * All optional sections are hidden by default.
 */
const visibilityConfiguration: VisibilityType = {
  [FormQuestionType.ChoiceDropdown]: {
    choices: true,
    jiraField: true,
    dcId: true,
    requiredChoice: true,
    default: true,
    responseRequired: true,
    questionKey: true,
    readOnly: true,
  },
  [FormQuestionType.ChoiceDropdownMultiple]: {
    choices: true,
    jiraField: true,
    dcId: true,
    requiredChoice: true,
    minMaxChoices: true,
    default: true,
    responseRequired: true,
    questionKey: true,
    readOnly: true,
  },
  [FormQuestionType.ChoiceMultiple]: {
    choices: true,
    jiraField: true,
    dcId: true,
    requiredChoice: true,
    minMaxChoices: true,
    default: true,
    responseRequired: true,
    questionKey: true,
    readOnly: true,
  },
  [FormQuestionType.ChoiceSingle]: {
    choices: true,
    jiraField: true,
    dcId: true,
    requiredChoice: true,
    default: true,
    responseRequired: true,
    questionKey: true,
    readOnly: true,
  },
  [FormQuestionType.Date]: {
    minMaxDate: true,
    jiraField: true,
    default: true,
    responseRequired: true,
    questionKey: true,
    readOnly: true,
  },
  [FormQuestionType.DateTime]: {
    minMaxDate: true,
    minMaxTime: true,
    jiraField: true,
    default: true,
    responseRequired: true,
    questionKey: true,
    readOnly: true,
  },
  [FormQuestionType.Number]: {
    minMaxNum: true,
    jiraField: true,
    default: true,
    wholeNumValidation: true,
    responseRequired: true,
    questionKey: true,
    readOnly: true,
  },
  [FormQuestionType.TextEmail]: {
    minMaxText: true,
    jiraField: true,
    default: true,
    responseRequired: true,
    questionKey: true,
    readOnly: true,
  },
  [FormQuestionType.TextLong]: {
    minMaxText: true,
    regexPattern: true,
    jiraField: true,
    default: true,
    responseRequired: true,
    questionKey: true,
    readOnly: true,
  },
  [FormQuestionType.TextParagraph]: {
    minMaxText: true,
    jiraField: true,
    default: true,
    responseRequired: true,
    questionKey: true,
    readOnly: true,
  },
  [FormQuestionType.TextShort]: {
    minMaxText: true,
    regexPattern: true,
    jiraField: true,
    default: true,
    responseRequired: true,
    questionKey: true,
    readOnly: true,
  },
  [FormQuestionType.TextUrl]: {
    minMaxText: true,
    jiraField: true,
    default: true,
    responseRequired: true,
    questionKey: true,
    readOnly: true,
  },
  [FormQuestionType.Time]: {
    minMaxTime: true,
    jiraField: true,
    default: true,
    responseRequired: true,
    questionKey: true,
    readOnly: true,
  },
  [FormQuestionType.UserMultiple]: {
    jiraField: true,
    responseRequired: true,
    questionKey: true,
    searchType: true,
  },
  [FormQuestionType.UserSingle]: {
    jiraField: true,
    responseRequired: true,
    questionKey: true,
    searchType: true,
  },
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

const FieldLabel = styled.div`
  font-size: 11px;
  margin-top: 8px;
  margin-bottom: 4px;
  color: ${N800};
`;

const SidebarPadding = styled.div`
  margin-bottom: 30px;
  padding: 24px 16px 0 16px;
`;

const darkSelectProps = { styles: SideBarSelectStyles };
