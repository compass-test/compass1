import React from 'react';
import { Suspense } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { temporarilySilenceActAndAtlaskitDeprecationWarnings } from '@atlassian/aux-test-utils';
import { Button } from '../Button';

temporarilySilenceActAndAtlaskitDeprecationWarnings();

describe('Button component', () => {
  test('displays loading until the atlaskit button is loaded', () => {
    const dispatchSpy = jest.fn();
    const renderSpy = jest.fn();
    const { getByText } = render(
      <Suspense fallback={<div>loading</div>}>
        <Button
          forgeDoc={{
            type: 'Button',
            key: 'Button.0',
            props: {
              text: 'appButton',
              onClick: {
                componentKey: 'Button.0',
                prop: 'onClick',
              },
            },
            children: [],
          }}
          dispatch={dispatchSpy}
          render={renderSpy}
        />
      </Suspense>,
    );
    expect(getByText('loading')).toBeTruthy();
    expect(() => getByText('appButton')).toThrow();
  });

  test('dispatch prop is called with onClick object when button is clicked', async () => {
    const dispatchSpy = jest.fn();
    const renderSpy = jest.fn();
    const onClick = {
      componentKey: 'Button.0',
      prop: 'onClick',
    };
    const { findByText } = render(
      <Suspense fallback={<div>loading</div>}>
        <Button
          forgeDoc={{
            type: 'Button',
            key: 'Button.0',
            props: {
              text: 'appButton',
              onClick,
            },
            children: [],
          }}
          dispatch={dispatchSpy}
          render={renderSpy}
        />
      </Suspense>,
    );

    const spanInButton = await findByText('appButton');

    // Event bubbles to button
    fireEvent.click(spanInButton);
    expect(dispatchSpy).toHaveBeenCalledWith({
      type: 'event',
      handler: onClick,
      args: [],
      extensionData: {},
    });
  });
});
