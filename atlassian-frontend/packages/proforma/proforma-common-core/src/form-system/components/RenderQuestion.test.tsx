import React from 'react';

import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { PfFlagsProvider } from '../../jira-common/context/FlagsContext';
import { FormQuestionType } from '../models/Form';

import { RenderQuestion } from './RenderQuestion';

describe('Rendering a question', () => {
  it('should render a description', () => {
    const mockQuestionStore: any = {
      id: 2,
      formQuestion: {
        type: FormQuestionType.TextShort,
        label: 'Question component',
        description: 'Short text question',
        validation: { rq: true },
      },
      currentAnswer: '2019-03-02',
      validationErrors: null,
    };
    const mockFormStore: any = {};

    const { getByTestId } = render(
      <PfFlagsProvider flags={{}}>
        <RenderQuestion
          questionStore={mockQuestionStore}
          view={false}
          formStore={mockFormStore}
        />
      </PfFlagsProvider>,
    );
    expect(getByTestId('description')).toHaveTextContent('Short text question');
  });
});
