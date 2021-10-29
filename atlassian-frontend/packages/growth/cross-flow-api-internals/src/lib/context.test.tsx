import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { mount } from 'enzyme';
import { VERSION, APIv0 } from './api/v0';
import { Reasons, WithCrossFlowProps } from './types';

import {
  createNegotiateApi,
  useCrossFlow,
  BaseCrossFlowApiProvider,
  withCrossFlow,
} from './context';

// eslint-disable-next-line import/no-extraneous-dependencies
import { configure } from 'enzyme';
// @ts-ignore
// eslint-disable-next-line import/no-extraneous-dependencies
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('The createNegotiateApi function', () => {
  const factory = createNegotiateApi(() => {
    return new Promise((resolve) => {
      resolve();
    });
  });
  it('should return isEnabled false if the version does not match', () => {
    expect(factory(VERSION - 1).isEnabled).toBeFalsy();
    expect(factory(VERSION + 1).isEnabled).toBeFalsy();
  });
  it('should return a reason if the version does not match', () => {
    expect(
      (() => {
        const crossflowApi = factory(-1);
        if (!crossflowApi.isEnabled) {
          return crossflowApi.reason;
        }
      })(),
    ).toBe(Reasons.NO_API_SUPPORT);
  });
  it('should return isEnabled true if the version matches', () => {
    const crossflowApi = factory(VERSION);
    expect(crossflowApi.isEnabled).toBeTruthy();
  });
  it('should return an API object if the version matches', () => {
    const crossflowApi = factory(VERSION);
    expect(
      (() => {
        if (crossflowApi.isEnabled) {
          return crossflowApi.api;
        }
      })(),
    ).toMatchObject<APIv0>({ open: expect.any(Function) });
  });
});

describe('The useCrossFlow hook', () => {
  it('should return a default value with message if not rendered under a provider', () => {
    const spy = jest.fn();
    const Touchpoint = ({ spy }: { spy: jest.Mock }) => {
      const api = useCrossFlow();
      spy(api);
      return null;
    };
    mount(<Touchpoint spy={spy} />);
    expect(spy).toHaveBeenCalledWith({
      isEnabled: false,
      reason: 'Provider not found',
    });
  });
  it('should return a valid a valid api object if rendered under a provider', () => {
    const spy = jest.fn();
    const Touchpoint = ({ spy }: { spy: jest.Mock }) => {
      const api = useCrossFlow();
      spy(api);
      return null;
    };
    mount(
      <BaseCrossFlowApiProvider onOpen={jest.fn()}>
        <Touchpoint spy={spy} />
      </BaseCrossFlowApiProvider>,
    );
    expect(spy).toHaveBeenCalledWith({
      isEnabled: true,
      api: {
        open: expect.any(Function),
      },
    });
  });
});

describe('The withCrossFlow HOC', () => {
  interface MyProps {
    spy: jest.Mock;
  }
  const WrappedComponent = withCrossFlow(
    class MyComponent extends React.Component<MyProps & WithCrossFlowProps> {
      render() {
        const { spy, crossFlow } = this.props;
        spy(crossFlow);
        return null;
      }
    },
  );
  it('should return a default value with message if not rendered under a provider', () => {
    const spy = jest.fn();
    mount(<WrappedComponent spy={spy} />);
    expect(spy).toHaveBeenCalledWith({
      isEnabled: false,
      reason: 'Provider not found',
    });
  });

  it('should return a valid a valid api object if rendered under a provider', () => {
    const spy = jest.fn();
    mount(
      <BaseCrossFlowApiProvider onOpen={jest.fn()}>
        <WrappedComponent spy={spy} />
      </BaseCrossFlowApiProvider>,
    );
    expect(spy).toHaveBeenCalledWith({
      isEnabled: true,
      api: {
        open: expect.any(Function),
      },
    });
  });
});
