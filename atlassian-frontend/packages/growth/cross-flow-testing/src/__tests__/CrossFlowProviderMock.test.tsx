import React, { ComponentType } from 'react';
import { render } from '@testing-library/react';
import { useCrossFlow } from '@atlassiansox/cross-flow-api-internals';
import { CrossFlowProviderMock } from '../CrossFlowProviderMock';

describe('CrossFlowProviderMock', () => {
  const ComponentWithCrossFlow: ComponentType = () => {
    const crossFlow = useCrossFlow();

    return crossFlow.isEnabled ? (
      <button
        data-testid="enabled"
        onClick={() =>
          crossFlow.api.open({
            journey: 'discover',
            sourceComponent: 'sourceComponent',
            sourceContext: 'sourceContext',
          })
        }
      ></button>
    ) : (
      <button data-testid="disabled"></button>
    );
  };

  it('should not have cross flow context instantiated', () => {
    const { queryByTestId } = render(<ComponentWithCrossFlow />);

    expect(queryByTestId('disabled')).toBeInTheDocument();
  });

  it('should have cross flow context instantiated', () => {
    const { queryByTestId } = render(
      <CrossFlowProviderMock onOpen={jest.fn()}>
        <ComponentWithCrossFlow />
      </CrossFlowProviderMock>,
    );

    expect(queryByTestId('enabled')).toBeInTheDocument();
  });

  it('should invoke open callback', () => {
    let onOpen = jest.fn();
    const { getByTestId } = render(
      <CrossFlowProviderMock onOpen={onOpen}>
        <ComponentWithCrossFlow />
      </CrossFlowProviderMock>,
    );

    getByTestId('enabled').click();

    expect(onOpen).toHaveBeenCalledWith({
      journey: 'discover',
      sourceComponent: 'sourceComponent',
      sourceContext: 'sourceContext',
    });
  });
});
