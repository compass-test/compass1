import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { waitFor } from '@testing-library/dom';

import {
  useCrossFlow,
  Reasons,
  CrossFlowContextType,
  Journeys,
  Targets,
} from '@atlassiansox/cross-flow-api-internals';
import { CrossFlowConsumer } from '../CrossFlowConsumer';

jest.mock('@atlassiansox/cross-flow-api-internals');

const mockUseCrossFlow = useCrossFlow as jest.Mock<CrossFlowContextType>;

const defaultProps = {
  targetProduct: Targets.CONFLUENCE,
  sourceComponent: 'example-component',
  sourceContext: 'example-context',
  journey: Journeys.GET_STARTED,
};

describe('The CrossFlowConsumer Component', () => {
  const mockCompletionStatus = { success: true };
  const mockRejectedValue = new Error('Example error');
  const mockOpen = jest.fn();
  const mockOnComplete = jest.fn();
  const mockOnError = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();

    mockOpen.mockResolvedValue({ success: true });

    mockUseCrossFlow.mockReturnValue({
      isEnabled: true,
      api: {
        open: mockOpen,
      },
    });
  });

  afterEach(cleanup);

  it('should do nothing when crossFlow is disabled', () => {
    mockUseCrossFlow.mockReturnValueOnce({
      isEnabled: false,
      reason: Reasons.NO_PROVIDER,
    });

    render(<CrossFlowConsumer {...defaultProps} />);

    expect(mockOpen).not.toHaveBeenCalled();
  });

  it('should invoke the open method', async () => {
    render(<CrossFlowConsumer {...defaultProps} />);

    expect(mockOpen).toHaveBeenCalledWith(defaultProps);
  });

  it('should invoke the onComplete handler with the completion status', async () => {
    render(<CrossFlowConsumer {...defaultProps} onComplete={mockOnComplete} />);

    await waitFor(() => expect(mockOnComplete).toHaveBeenCalled());

    expect(mockOnComplete).toHaveBeenCalledWith(mockCompletionStatus);
  });

  it('should invoke the onError handler with the rejected value', async () => {
    mockOpen.mockRejectedValue(mockRejectedValue);

    render(<CrossFlowConsumer {...defaultProps} onError={mockOnError} />);

    await waitFor(() => expect(mockOnError).toHaveBeenCalled());

    expect(mockOnError).toHaveBeenCalledWith(mockRejectedValue);
    expect(mockOnComplete).not.toHaveBeenCalled();
  });
});
