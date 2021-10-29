import React from 'react';

import { observer } from 'mobx-react';
import styled from 'styled-components';

// eslint-disable-next-line no-restricted-imports
import { Label } from '@atlaskit/field-base';

import { FormQuestionType } from '../models/Form';

import { QuestionProps, RenderQuestionProps } from './QuestionProps';
import { QuestionErrorMsg } from './questions/common/QuestionErrorMsg';
import { QuestionHelperMsg } from './questions/common/QuestionHelperMsg';
import {
  ErrorWrapper,
  LabelWrapper,
} from './questions/common/questionWrappers';
import { Date } from './questions/Date';
import { DateTime } from './questions/DateTime';
import { Dropdown } from './questions/Dropdown';
import { DropdownMultiselect } from './questions/DropdownMultiselect';
import { LongText } from './questions/LongText';
import { MultiChoice } from './questions/MultiChoice';
import { Number } from './questions/Number';
import { Paragraph } from './questions/Paragraph';
import { ShortText } from './questions/ShortText';
import { SingleChoice } from './questions/SingleChoice';
import { Time } from './questions/Time';
import { UserPicker } from './questions/UserPicker';
import { ViewUrlText } from './questions/view/ViewUrlText';

export const RenderQuestion = observer(
  ({ questionStore, view, formStore }: RenderQuestionProps) => {
    let fieldId = `pf-${questionStore.formQuestion.type}-${questionStore.id}`;
    const questionProps: QuestionProps = {
      questionStore,
      view,
      formStore,
      id: fieldId,
      revisionToken: questionStore.revisionToken,
    };
    let questionComponent: JSX.Element;

    switch (questionStore.formQuestion.type) {
      case FormQuestionType.TextShort:
        questionComponent = <ShortText {...questionProps} />;
        break;
      // @ts-ignore
      case FormQuestionType.TextUrl:
        if (view) {
          questionComponent = (
            <ViewUrlText id={fieldId} value={questionStore.currentAnswer} />
          );
          break;
        }
      // eslint-disable-next-line no-fallthrough
      case FormQuestionType.TextLong:
      case FormQuestionType.TextEmail:
        questionComponent = <LongText {...questionProps} />;
        break;
      case FormQuestionType.TextParagraph:
        questionComponent = <Paragraph {...questionProps} />;
        break;
      case FormQuestionType.Number:
        questionComponent = <Number {...questionProps} />;
        break;
      case FormQuestionType.DateTime:
        questionComponent = <DateTime {...questionProps} />;
        fieldId = `react-select-${fieldId}--input`;
        break;
      case FormQuestionType.Date:
        questionComponent = <Date {...questionProps} />;
        fieldId = `react-select-${fieldId}--input`;
        break;
      case FormQuestionType.Time:
        questionComponent = <Time {...questionProps} />;
        fieldId = `react-select-${fieldId}--input`;
        break;
      case FormQuestionType.ChoiceSingle:
        questionComponent = <SingleChoice {...questionProps} />;
        break;
      case FormQuestionType.ChoiceMultiple:
        questionComponent = <MultiChoice {...questionProps} />;
        break;
      case FormQuestionType.ChoiceDropdown:
        questionComponent = <Dropdown {...questionProps} />;
        break;
      case FormQuestionType.ChoiceDropdownMultiple:
        questionComponent = <DropdownMultiselect {...questionProps} />;
        break;
      case FormQuestionType.UserSingle:
      case FormQuestionType.UserMultiple:
        questionComponent = <UserPicker {...questionProps} />;
        break;
      default:
        return (
          <UnknownFieldDetailStyles>
            Unknown Question Type: {questionStore.formQuestion.type}
          </UnknownFieldDetailStyles>
        );
    }

    const { formQuestion, validationErrors } = questionStore;
    return (
      <div>
        <LabelWrapper>
          <Label
            htmlFor={fieldId}
            label={formQuestion.label}
            isRequired={formQuestion.validation.rq}
          />
        </LabelWrapper>
        <QuestionHelperMsg description={formQuestion.description} />
        {questionComponent}
        {view ? (
          <ErrorWrapper />
        ) : (
          <QuestionErrorMsg validationErrors={validationErrors} />
        )}
      </div>
    );
  },
);

const UnknownFieldDetailStyles = styled.div`
  margin: 10px 0;
  color: red;
`;
