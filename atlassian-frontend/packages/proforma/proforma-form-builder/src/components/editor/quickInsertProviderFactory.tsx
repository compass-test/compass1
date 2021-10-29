import React from 'react';

import { InjectedIntl } from 'react-intl';

import {
  QuickInsertItem,
  QuickInsertProvider,
  TypeAheadItem,
} from '@atlaskit/editor-core';
import { FormQuestionType } from '@atlassian/proforma-common-core/form-system-models';

import { CheckBoxIcon } from '../customIcons/CheckBoxIcon';
import { DateIcon } from '../customIcons/DateIcon';
import { DateTimeIcon } from '../customIcons/DateTimeIcon';
import { DropdownIcon } from '../customIcons/DropdownIcon';
import { EmailIcon } from '../customIcons/EmailIcon';
import { LongTextIcon } from '../customIcons/LongTextIcon';
import { MultipleUsersIcon } from '../customIcons/MultipleUsersIcon';
import { NumberIcon } from '../customIcons/NumberIcon';
import { ParagraphIcon } from '../customIcons/ParagraphIcon';
import { RadioIcon } from '../customIcons/RadioIcon';
import { ShortTextIcon } from '../customIcons/ShortTextIcon';
import { SingleUserIcon } from '../customIcons/SingleUserIcon';
import { TimeIcon } from '../customIcons/TimeIcon';
import { UrlIcon } from '../customIcons/UrlIcon';
import { focusOnElement, selectFocusedInput } from '../helpers/focusOnElement';
import { generateQuestionExtensionNode } from '../QuestionToolbar';

export const quickInsertProviderFactory = (
  maxIdRef: React.MutableRefObject<number>,
  updateMaxId: (newMaxId: number) => void,
  intl: InjectedIntl,
): QuickInsertProvider => {
  const customQuickInsertItems = generateQuickInsertItems(
    maxIdRef,
    updateMaxId,
    intl,
  );
  return {
    getItems(): Promise<QuickInsertItem[]> {
      return Promise.resolve(customQuickInsertItems);
    },
  };
};

const generateQuickInsertItems = (
  maxIdRef: React.MutableRefObject<number>,
  updateMaxId: (newMaxId: number) => void,
  intl: InjectedIntl,
): QuickInsertItem[] => {
  // Add PF questions to quick Insert
  return PFQuickInsertQuestionItems.map(item => ({
    title: item.title,
    icon: item.icon,
    keywords: item.keywords,
    action(insert) {
      const extensionId = maxIdRef.current + 1;
      updateMaxId(extensionId);
      // Set focus on question sidebar label is insertion is question
      if (item.questionType) {
        focusOnElement('question-sidebar-label').then(selectFocusedInput);
      }
      return insert(
        generateQuestionExtensionNode(extensionId, item.questionType, intl),
      );
    },
  }));
};

interface PFQuickInsertItem extends TypeAheadItem {
  questionType: FormQuestionType;
  keywords?: Array<string>;
  priority?: number;
}

const PFQuickInsertQuestionItems: PFQuickInsertItem[] = [
  {
    title: 'Short Text Question',
    questionType: FormQuestionType.TextShort,
    keywords: ['qts'],
    icon: (): React.ReactElement => <ShortTextIcon />,
  },
  {
    title: 'Long Text Question',
    questionType: FormQuestionType.TextLong,
    keywords: ['qtl'],
    icon: (): React.ReactElement => <LongTextIcon />,
  },
  {
    title: 'Paragraph Question',
    questionType: FormQuestionType.TextParagraph,
    keywords: ['qtp'],
    icon: (): React.ReactElement => <ParagraphIcon />,
  },
  {
    title: 'Email Question',
    questionType: FormQuestionType.TextEmail,
    keywords: ['qte'],
    icon: (): React.ReactElement => <EmailIcon />,
  },
  {
    title: 'URL Question',
    questionType: FormQuestionType.TextUrl,
    keywords: ['qtu'],
    icon: (): React.ReactElement => <UrlIcon />,
  },
  {
    title: 'Radio Buttons Question',
    questionType: FormQuestionType.ChoiceSingle,
    keywords: ['qcs'],
    icon: (): React.ReactElement => <RadioIcon />,
  },
  {
    title: 'Checkboxes Question',
    questionType: FormQuestionType.ChoiceMultiple,
    keywords: ['qcm'],
    icon: (): React.ReactElement => <CheckBoxIcon />,
  },
  {
    title: 'Dropdown Choice Question',
    questionType: FormQuestionType.ChoiceDropdown,
    keywords: ['qcd'],
    icon: (): React.ReactElement => <DropdownIcon />,
  },
  {
    title: 'Multiselect Dropdown Question',
    questionType: FormQuestionType.ChoiceDropdownMultiple,
    keywords: ['qcl'],
    icon: (): React.ReactElement => <DropdownIcon />,
  },
  {
    title: 'Date Question',
    questionType: FormQuestionType.Date,
    keywords: ['qd'],
    icon: (): React.ReactElement => <DateIcon />,
  },
  {
    title: 'Date & time Question',
    questionType: FormQuestionType.DateTime,
    keywords: ['qdt'],
    icon: (): React.ReactElement => <DateTimeIcon />,
  },
  {
    title: 'Time Question',
    questionType: FormQuestionType.Time,
    keywords: ['qt'],
    icon: (): React.ReactElement => <TimeIcon />,
  },
  {
    title: 'Number Question',
    questionType: FormQuestionType.Number,
    keywords: ['qn'],
    icon: (): React.ReactElement => <NumberIcon />,
  },
  {
    title: 'Single User Question',
    questionType: FormQuestionType.UserSingle,
    keywords: ['qus'],
    icon: (): React.ReactElement => <SingleUserIcon />,
  },
  {
    title: 'Multiple User Question',
    questionType: FormQuestionType.UserMultiple,
    keywords: ['qum'],
    icon: (): React.ReactElement => <MultipleUsersIcon />,
  },
];
