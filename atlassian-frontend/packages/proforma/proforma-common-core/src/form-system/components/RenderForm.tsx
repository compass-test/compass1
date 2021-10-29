import React, { useRef } from 'react';

import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { ExtensionParams } from '@atlaskit/editor-common';
import { ReactRenderer } from '@atlaskit/renderer';
import {
  AsyncIntlProvider,
  parseLocaleCode,
} from '@atlassian/proforma-translations';

import { withIntlProvider } from '../../intl-provider';
import { usePfFlags } from '../../jira-common/context/FlagsContext';
import { Flags } from '../../jira-common/models/Flags';
import { HtmlParameters } from '../models/HtmlParameters';
import { QuestionParameters } from '../models/QuestionParameters';
import { FormStore } from '../stores/FormStore';

import { HtmlExtension } from './extensions/HtmlExtension';
import { rendererEventHandlers } from './rendererEventHandlers';
import { RenderQuestion } from './RenderQuestion';
import { IntlViewFormMessages, ViewFormMessage } from './ViewFormMessages.intl';

interface RenderFormProps {
  formStore: FormStore;
  revisionToken: string;
  showHiddenSections?: boolean;
  view?: boolean;
}

const formExtensionFn = (
  flags: Flags,
  formStoreRef: React.MutableRefObject<FormStore>,
  viewRef: React.MutableRefObject<boolean>,
): ((
  ext: ExtensionParams<QuestionParameters>,
  doc: Object,
) => React.ReactElement) => {
  return (ext: ExtensionParams<QuestionParameters>): React.ReactElement => {
    const formStore = formStoreRef.current;
    if (ext.extensionKey === 'question') {
      const questionId = ext.parameters?.id;
      const questionStore =
        questionId !== undefined &&
        formStore.questions.find(question => question.id === questionId);
      if (!questionStore) {
        // eslint-disable-next-line no-console
        console.error(
          `Could not find the question store with ID ${questionId}:`,
          ext,
        );
        return <></>;
      }
      return (
        <RenderQuestion
          questionStore={questionStore}
          view={viewRef.current}
          formStore={formStore}
        />
      );
    }
    if (ext.extensionKey === 'html') {
      return (
        <HtmlExtension
          extensionId={ext.parameters!.id}
          htmlContent={(ext.parameters! as HtmlParameters).htmlContent || ''}
        />
      );
    }
    return <></>;
  };
};

export const RenderForm = withIntlProvider<RenderFormProps>(
  observer(({ formStore, showHiddenSections = false, view = false }) => {
    const formStoreRef = useRef(formStore);
    if (formStoreRef.current !== formStore) {
      formStoreRef.current = formStore;
    }
    const viewRef = useRef(view);
    if (viewRef.current !== view) {
      viewRef.current = view;
    }

    const flags = usePfFlags();

    const formSections = formStore.layout?.map((sectionLayout, index) => {
      const sectionId = index.toString();
      const formSection = (
        <ReactRenderer
          key={sectionId}
          document={toJS(sectionLayout)}
          extensionHandlers={{
            'com.thinktilt.proforma': formExtensionFn(
              flags,
              formStoreRef,
              viewRef,
            ),
          }}
          eventHandlers={rendererEventHandlers}
          appearance="full-width"
        />
      );
      if (formStore.visibleSections.includes(sectionId)) {
        return formSection;
      }
      if (showHiddenSections) {
        return (
          <SectionWrapperStyles key={sectionId}>
            <div>{formSection}</div>
            <SectionOverlayStyles>
              <SectionMessageStyles>
                <FormattedMessage
                  {...IntlViewFormMessages[ViewFormMessage.HiddenSection]}
                />
              </SectionMessageStyles>
            </SectionOverlayStyles>
          </SectionWrapperStyles>
        );
      }
      return <></>;
    });
    const form = (
      <FormContainer>
        <FormStyles>{formSections}</FormStyles>
      </FormContainer>
    );
    const formLocale = formStore.language
      ? parseLocaleCode(formStore.language)
      : undefined;
    if (formLocale) {
      return <AsyncIntlProvider locale={formLocale}>{form}</AsyncIntlProvider>;
    }
    return form;
  }),
);

const FormContainer = styled.div`
  height: auto;
  overflow: auto;
`;

const FormStyles = styled.div`
  background-color: white;
  padding: 10px;

  & .ak-renderer-extension-overflow-container {
    overflow: unset !important;
  }

  & .pm-table-container {
    z-index: auto;
  }
`;

const SectionWrapperStyles = styled.div`
  position: relative;
  padding: 5px;
`;

const SectionOverlayStyles = styled.div`
  height: 100%;
  width: 100%;
  background-color: rgba(108, 121, 143, 0.1);
  top: 0;
  left: 0;
  position: absolute;
  border-radius: 3px;
  text-align: center;
`;

const SectionMessageStyles = styled.h4`
  padding: 10px;
  color: #172b4d;
  background-color: white;
  display: inline-block;
  position: relative;
  top: 10px;
  border-radius: 10px;
`;
