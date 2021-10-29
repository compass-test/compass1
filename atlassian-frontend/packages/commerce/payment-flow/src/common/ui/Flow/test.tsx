import React from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { act, fireEvent, render } from '@testing-library/react';

import { TwoStepFlow } from './examples';

describe('Flow', () => {
  jest.useFakeTimers();

  it('should render titles', () => {
    const { queryByText } = render(<TwoStepFlow />);
    expect(queryByText('step-1-caption')).toBeInTheDocument();
    expect(queryByText('step-2-caption')).toBeInTheDocument();
  });

  it('should render current step', () => {
    const { queryByTestId } = render(<TwoStepFlow />);
    expect(queryByTestId('step1')).toBeInTheDocument();
    expect(queryByTestId('step2')).not.toBeInTheDocument();
  });

  it('should move from one state to another and finish the flow', async () => {
    const finished = jest.fn();
    const { getByText, queryByTestId } = render(
      <TwoStepFlow onComplete={finished} />,
    );
    fireEvent.click(getByText('Next'));

    act(() => jest.runAllTimers());

    expect(queryByTestId('step1')).not.toBeInTheDocument();
    expect(queryByTestId('step2')).toBeInTheDocument();
    // check update propagation
    expect(getByText('step-2-body')).toBeInTheDocument();
    expect(finished).not.toBeCalled();
    fireEvent.click(getByText('Save'));

    expect(finished).toBeCalledWith({
      step1Data: true,
      step2Data: '42',
    });
  });

  it('should move from one state to another, back and finish the flow', async () => {
    const finished = jest.fn();
    const { getByText, findByText, findByTestId } = render(
      <TwoStepFlow onComplete={finished} />,
    );
    fireEvent.click(getByText('Next'));
    act(() => jest.runAllTimers());

    const backBtn = await findByText('Back');

    fireEvent.click(backBtn);
    act(() => jest.runAllTimers());

    expect(await findByTestId('step1')).toBeInTheDocument();

    fireEvent.click(getByText('Next'));
    act(() => jest.runAllTimers());

    expect(await findByTestId('step2')).toBeInTheDocument();

    fireEvent.click(getByText('Save'));

    expect(finished).toBeCalledWith({
      step1Data: true,
      step2Data: '42',
    });
  });
});
