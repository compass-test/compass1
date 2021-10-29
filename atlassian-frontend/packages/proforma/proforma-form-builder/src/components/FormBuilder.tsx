import React, {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { undo } from 'prosemirror-history';
import { Fragment, Node, Slice } from 'prosemirror-model';
import { safeInsert } from 'prosemirror-utils';
import { injectIntl } from 'react-intl';
import styled from 'styled-components';

import { EditorActions, WithEditorActions } from '@atlaskit/editor-core';
import { N20, N40 } from '@atlaskit/theme/colors';
import {
  FormQuestionType,
  QuestionParametersChoice,
  TemplateForm,
} from '@atlassian/proforma-common-core/form-system-models';
import { isChoiceQuestionType } from '@atlassian/proforma-common-core/form-system-utils';
import { NoticeType } from '@atlassian/proforma-common-core/jira-common';
import { usePfBrowserUtils } from '@atlassian/proforma-common-core/jira-common-context';
import { JiraField } from '@atlassian/proforma-common-core/jira-common-models';
import { withProFormaIntlProvider } from '@atlassian/proforma-translations';

import {
  GlobalMetadata,
  TemplateMetadata,
  TemplatesIndex,
} from '../apis/TemplateApi';
import { useTemplateApi } from '../context/TemplateApiContext';
import { processRawValue } from '../external/processRawValue';
import * as i18n from '../i18n';
import { FormBuilderReferenceData } from '../models/FormBuilderReferenceData';
import { SectionParameters } from '../models/SectionParameters';
import { findMaxId } from '../utils/findMaxId';
import { templateFormToAdfForm } from '../utils/templateFormToAdfForm';

import {
  ExtensionSelection,
  HtmlExtensionSelection,
  isHtmlExtension,
  isQuestionExtension,
  isSectionExtension,
  MediaSingleSelection,
  QuestionExtensionSelection,
  SectionExtensionSelection,
} from './editor/ExtensionSelection';
import { ProFormaEditor } from './editor/ProFormaEditor';
import {
  BuilderMessage,
  IntlBuilderMessages,
} from './FormBuilderMessages.intl';
import {
  findConditionsBrokenByDroppedQuestion,
  findConditionsBrokenByDroppedSection,
} from './helpers/dropHelpers';
import { getDocumentMaxId } from './helpers/getDocumentMaxId';
import { getQuestionKeys } from './helpers/questionKeyHelpers';
import { processSliceForInsert } from './helpers/safeInsertSliceHelper';
import {
  ConditionInfo,
  findConditionsDependentOnQuestion,
  removeConditionsFromDoc,
} from './helpers/sectionHelpers';
import { QuestionToolbar } from './QuestionToolbar';
import { HtmlSidebar } from './sidebar/HtmlSidebar';
import { MediaSidebar } from './sidebar/MediaSidebar';
import { QuestionSidebar } from './sidebar/QuestionSidebar';
import { SectionSidebar } from './sidebar/SectionSidebar';
import { TemplateSidebar } from './sidebar/TemplateSidebar';

interface FormBuilderProps {
  form?: TemplateForm;
  refData: FormBuilderReferenceData;
  editorActions: EditorActions;
  showTemplatesByDefault?: boolean;
  loadLinkedJiraFieldInsightChoices: (
    jiraField: JiraField,
  ) => Promise<QuestionParametersChoice[]>;
  footer: JSX.Element;
  formName?: string;
  updateFormName: (updatedFormName: string) => void;
}

export interface FormBuilderContext {
  projectId: number;
  templateFormId: number;
}

/**
 * The ProForma form builder. This allows a ProForma form in ADF format to be edited.
 */
export const FormBuilder = withProFormaIntlProvider<FormBuilderProps>(
  i18n,
  injectIntl(
    ({
      form,
      refData,
      editorActions,
      showTemplatesByDefault = false,
      intl,
      loadLinkedJiraFieldInsightChoices,
      footer,
      formName,
      updateFormName,
    }) => {
      const referenceData = useRef(refData);
      useEffect(() => {
        referenceData.current = refData;
      }, [refData]);

      const browserUtils = usePfBrowserUtils();
      const templateApi = useTemplateApi();
      const [templatesIndex, setTemplatesIndex] = useState<
        TemplatesIndex | undefined
      >(undefined);
      useEffect(() => {
        templateApi.getTemplatesList().then(index => setTemplatesIndex(index));
      }, [templateApi]);

      const [maxId, setMaxId] = useState(form ? findMaxId(form) : 0);
      const maxIdRef = useRef(maxId);

      const updateMaxId = useCallback((newMaxId: number) => {
        setMaxId(newMaxId);
        maxIdRef.current = newMaxId;
      }, []);

      const [questionKeys, setQuestionKeys] = useState<Map<string, string>>(
        form
          ? getQuestionKeys(form.design.questions)
          : new Map<string, string>(),
      );

      const updateQuestionKeys = (
        questionKey: string,
        questionId: string,
      ): Map<string, string> => {
        questionKeys.set(questionId, questionKey);
        return questionKeys;
      };

      const [showTemplates, setShowTemplates] = useState<boolean>(
        showTemplatesByDefault,
      );

      const [selectedExtension, setSelectedExtension] = useState<
        ExtensionSelection
      >();

      const [selectedImage, setSelectedImage] = useState<
        MediaSingleSelection
      >();

      const adfForm = useMemo(() => {
        const newAdfForm = form ? templateFormToAdfForm(form) : undefined;
        if (
          newAdfForm &&
          newAdfForm.content &&
          newAdfForm.content.length === 0
        ) {
          setShowTemplates(true);
        }
        return newAdfForm;
      }, [form]);

      const onExtensionSelected = useCallback(
        (newSelection: ExtensionSelection) => {
          setShowTemplates(false);
          setSelectedExtension(oldSelection => {
            // If the same section is being reselected it may be because it has moved and a condition has changed
            // In this case we may need to manually update the UI by deselecting and reselecting the section
            if (
              oldSelection &&
              isSectionExtension(oldSelection.extension) &&
              isSectionExtension(newSelection.extension)
            ) {
              const oldSectionParams = oldSelection.extension
                .parameters as SectionParameters;
              const newSectionParams = newSelection.extension
                .parameters as SectionParameters;

              // it is the same section
              if (oldSectionParams.id === newSectionParams.id) {
                // But it's position has changed
                if (oldSelection.pos !== newSelection.pos) {
                  setSelectedExtension(undefined);
                }
              }
            }
            return newSelection;
          });
        },
        [],
      );

      const onExtensionDeselected = useCallback(() => {
        setSelectedExtension(undefined);
      }, []);

      const onImageSelected = (newSelection: MediaSingleSelection) => {
        setShowTemplates(false);
        setSelectedImage(newSelection);
      };

      const onImageDeselected = () => {
        setSelectedImage(undefined);
      };

      const onPaste = useCallback(
        (slice: Slice): Slice => {
          const {
            cleanedSlice,
            newQuestionKeys,
            newMaxId,
          } = processSliceForInsert(
            slice,
            maxIdRef.current,
            editorActions,
            referenceData.current,
            questionKeys,
          );
          setQuestionKeys(new Map([...questionKeys, ...newQuestionKeys]));
          updateMaxId(newMaxId);
          return cleanedSlice;
        },
        [editorActions, questionKeys, updateMaxId],
      );

      const handleInsertTemplate = (templateForm: TemplateForm) => {
        const newAdfForm = templateFormToAdfForm(templateForm);
        const editorView = editorActions._privateGetEditorView();
        if (editorView) {
          const currentValue = editorView.state.doc;
          const currentMaxId = getDocumentMaxId(currentValue);
          const { schema, tr } = editorView.state;
          const nodes = newAdfForm.content!.map(
            node => processRawValue(schema, node) as Node,
          );
          const fragment = Fragment.fromArray(nodes);
          const slice = new Slice(fragment, 1, 1);
          const {
            cleanedSlice,
            newQuestionKeys,
            newMaxId,
          } = processSliceForInsert(
            slice,
            currentMaxId,
            editorActions,
            referenceData.current,
            questionKeys,
          );
          setQuestionKeys(new Map([...questionKeys, ...newQuestionKeys]));
          updateMaxId(newMaxId);
          editorView.dispatch(
            safeInsert(
              cleanedSlice.content,
              currentValue.content.size,
            )(tr).scrollIntoView(),
          );
        }
        setShowTemplates(false);
      };

      const onDrop = useCallback(
        (slice: Slice, dropPosition: number): boolean => {
          const conditionsToRemove: ConditionInfo[] = [];
          const editorViewBeforeDrop = editorActions._privateGetEditorView();

          if (!editorViewBeforeDrop) {
            // eslint-disable-next-line no-console
            console.error(
              'The drag and drop action was prevented, unable to get the editorView object',
            );
            return true;
          }

          slice.content.descendants(node => {
            const isQuestionNode =
              !!node.attrs && node.attrs.extensionKey === 'question';
            const isSectionNode =
              !!node.attrs && node.attrs.extensionKey === 'section';

            if (isQuestionNode || isSectionNode) {
              if (isSectionNode) {
                const conditionsBrokenBySectionDrop: ConditionInfo[] = findConditionsBrokenByDroppedSection(
                  node.attrs.parameters,
                  slice,
                  dropPosition,
                  editorViewBeforeDrop,
                );
                conditionsToRemove.push(...conditionsBrokenBySectionDrop);
              }
              if (isQuestionNode) {
                const questionId = node.attrs.parameters.id;
                const conditionsBrokenByQuestionDrop = findConditionsBrokenByDroppedQuestion(
                  questionId,
                  editorViewBeforeDrop,
                  dropPosition,
                );
                conditionsToRemove.push(...conditionsBrokenByQuestionDrop);
              }
            }
            return true;
          });

          if (conditionsToRemove.length > 0) {
            browserUtils
              .showNotice(NoticeType.ConfirmRepositionNodeInFormBuilder)
              .then(confirmed => {
                const editorViewAfterDrop = editorActions._privateGetEditorView();
                if (!editorViewAfterDrop) {
                  // eslint-disable-next-line no-console
                  console.error('Could not get editorView object');
                } else if (confirmed) {
                  removeConditionsFromDoc(
                    conditionsToRemove,
                    editorViewAfterDrop,
                  );
                } else {
                  undo(editorViewAfterDrop.state, editorViewAfterDrop.dispatch);
                }
              });
          }
          return false;
        },
        [browserUtils, editorActions],
      );

      const selectedSectionExtension =
        selectedExtension && isSectionExtension(selectedExtension.extension)
          ? (selectedExtension as SectionExtensionSelection)
          : undefined;
      const selectedQuestionExtension =
        selectedExtension && isQuestionExtension(selectedExtension.extension)
          ? (selectedExtension as QuestionExtensionSelection)
          : undefined;
      const selectedHtmlExtension =
        selectedExtension && isHtmlExtension(selectedExtension.extension)
          ? (selectedExtension as HtmlExtensionSelection)
          : undefined;

      const promptUserToClearCondition = (questionId: number) => {
        const editorView = editorActions._privateGetEditorView();
        if (editorView) {
          const dependentConditions = findConditionsDependentOnQuestion(
            editorView,
            questionId,
          );

          if (dependentConditions.length > 0) {
            browserUtils
              .showNotice(NoticeType.ConfirmRemoveCondition)
              .then(confirmed => {
                if (confirmed) {
                  // Remove condition
                  removeConditionsFromDoc(dependentConditions, editorView);
                } else {
                  // Cancel question type change
                  undo(editorView.state, editorView.dispatch);
                }
              });
          }
        }
      };

      const onQuestionDeleted = useCallback(
        (questionId: number, type: FormQuestionType) => {
          questionKeys.delete(questionId.toString());

          if (isChoiceQuestionType(type)) {
            promptUserToClearCondition(questionId);
          }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [questionKeys],
      );

      const onQuestionTypeChanged = useCallback(
        (
          questionId: number,
          prevType: FormQuestionType,
          newType: FormQuestionType,
        ) => {
          // Detect if question type used to be a choice question, these questions may be linked to conditions
          if (
            isChoiceQuestionType(prevType) &&
            !isChoiceQuestionType(newType)
          ) {
            promptUserToClearCondition(questionId);
          }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
      );

      const editorPrimaryToolbarComponents = useMemo(() => {
        return (
          <WithEditorActions
            render={actions => (
              <QuestionToolbar
                editorActions={actions}
                maxId={maxId}
                onNewMaxId={updateMaxId}
                displayTemplateButton={
                  templatesIndex ? templatesIndex.templates.length > 0 : false
                }
                toggleTemplates={() => {
                  setShowTemplates(!showTemplates);
                }}
                currentlyShowingTemplates={showTemplates}
              />
            )}
          />
        );
      }, [templatesIndex, maxId, updateMaxId, showTemplates]);

      const renderSidebar = (): ReactElement | undefined => {
        if (showTemplates) {
          let templates: TemplateMetadata[] = [];
          let subGroupMeta: GlobalMetadata['subGroups'] = [];
          let featuredGroups: GlobalMetadata['featuredGroups'];

          if (templatesIndex) {
            templates = templatesIndex.templates;
            subGroupMeta = templatesIndex.metadata.subGroups;
            featuredGroups = templatesIndex.metadata.featuredGroups;
          }
          return (
            <TemplateSidebar
              templates={templates}
              subGroupMeta={subGroupMeta}
              featured={featuredGroups}
              insertTemplate={handleInsertTemplate}
              onClose={() => setShowTemplates(false)}
            />
          );
        }

        if (selectedQuestionExtension) {
          return (
            <QuestionSidebar
              key={selectedQuestionExtension.extension.parameters.id}
              refData={refData}
              questionKeys={questionKeys}
              onNewQuestionKey={(questionKey, questionId) =>
                setQuestionKeys(updateQuestionKeys(questionKey, questionId))
              }
              editorActions={editorActions}
              {...selectedQuestionExtension}
              loadLinkedJiraFieldInsightChoices={
                loadLinkedJiraFieldInsightChoices
              }
            />
          );
        }

        if (selectedSectionExtension) {
          return (
            <WithEditorActions
              render={actions => (
                <SectionSidebar
                  editorActions={actions}
                  key={selectedSectionExtension.extension.parameters.id}
                  refData={refData}
                  maxId={maxId}
                  onNewMaxId={id => updateMaxId(id)}
                  {...selectedSectionExtension}
                />
              )}
            />
          );
        }

        if (selectedHtmlExtension) {
          return (
            <HtmlSidebar
              key={selectedHtmlExtension.extension.parameters.id}
              {...selectedHtmlExtension}
            />
          );
        }

        if (selectedImage) {
          return (
            <MediaSidebar
              key={selectedImage.extension.parameters.url}
              parameters={selectedImage.extension.parameters}
              updateSelection={selectedImage.updateSelection}
            />
          );
        }
      };

      return (
        <Wrapper>
          <Content>
            <ProFormaEditor
              defaultValue={adfForm}
              onExtensionSelected={onExtensionSelected}
              onExtensionDeselected={onExtensionDeselected}
              onImageSelected={onImageSelected}
              onImageDeselected={onImageDeselected}
              onPaste={onPaste}
              onDrop={onDrop}
              onQuestionDeleted={onQuestionDeleted}
              onQuestionTypeChanged={onQuestionTypeChanged}
              primaryToolbarComponents={editorPrimaryToolbarComponents}
              maxIdRef={maxIdRef}
              updateMaxId={updateMaxId}
              placeholder={intl.formatMessage(
                IntlBuilderMessages[BuilderMessage.EmptyBuilderPlaceholder],
              )}
              refData={refData}
              formName={formName}
              updateFormName={updateFormName}
            />
            {footer}
          </Content>
          <Sidebar>{renderSidebar()}</Sidebar>
        </Wrapper>
      );
    },
  ),
);

const Wrapper = styled.div`
  display: flex;
  flex-grow: 1;
  height: 100%;
`;

/**
 * Adjustments to the styling of the Atlassian Editor:
 * - Make space for the sidebar on the right
 * - Hide the title and border around questions so that they appear inline without adornments
 * - Slightly widen the section so its horizontal rule stands out from the rest of the document
 * - Disable showing a selection border around questions when a whole section is selected
 * - Hide the edit and layout buttons on the floating toolbar that appears when a section or question is selected
 */
const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;

  > div {
    min-height: 0;
  }

  & div[extensionkey='question'] {
    margin-left: -8px;
    margin-right: -8px;
  }

  & div[extensionkey='question'] .extension-container {
    background: none;
    overflow: visible;
  }

  &
    div[extensionkey='question']
    .extension-overflow-wrapper
    > div
    + div
    > div:first-child {
    display: none;
  }

  & div[extensionkey='section'] .extension-container {
    background: none;
    overflow: visible;

    & .extension-overflow-wrapper {
      overflow-x: visible;
    }

    & .with-children {
      padding: 0;
    }
  }

  &
    div[extensionkey='section']
    .extension-overflow-wrapper
    > div
    + div
    > div:first-child {
    display: none;
  }

  &
    div[aria-label='Extension floating controls']
    > div
    > div
    > div:nth-child(-n + 5) {
    display: none;
  }

  & div[aria-label='Extension floating controls'] > div {
    padding-left: 4px;
  }
`;
Content.displayName = 'Content';

const Sidebar = styled.div`
  background-color: ${N20};
  border-left: 1px solid ${N40};
  flex: none;
  height: 100%;
  overflow-y: auto;
  width: 370px;
`;
