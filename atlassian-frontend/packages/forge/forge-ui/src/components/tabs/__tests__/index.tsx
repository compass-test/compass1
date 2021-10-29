import React, { Suspense } from 'react';
import { render, waitForElement } from '@testing-library/react';
import Tabs, { TabsFn } from '..';

describe('Tabs component', () => {
  const tabs = [
    { label: 'Chocolate', content: 'chocolate' },
    { label: 'Strawberry', content: 'strawberry' },
    { label: 'Cinnamon', content: 'cinnamon' },
  ];
  const Basic = () => (
    <Suspense fallback={<div>loading</div>}>
      <Tabs tabs={tabs} id="test" />
    </Suspense>
  );

  test('renders', async () => {
    const { getByText } = render(<Basic />);
    const tag = await waitForElement(() => getByText('chocolate'));
    expect(tag).toBeInTheDocument();
  });

  test('*Fn renders', async () => {
    const FnBasic = () => {
      return TabsFn({
        type: 'Tabs',
        key: 'Tabs.0',
        children: [
          {
            type: 'Tab',
            key: 'Tab.0',
            children: [
              {
                type: 'Button',
                key: 'Button.0',
                props: {
                  text: 'Button time',
                },
                children: [],
              },
            ],
          },
        ],
        dispatch: () => Promise.resolve(),
        render: () => null,
        renderChildren: ({ children }) =>
          children.map((c) =>
            c.type === 'Button' && c.props ? (
              <button key={c.key}>{c.props.text}</button>
            ) : undefined,
          ),
        Components: {},
      });
    };
    const { getByText } = render(
      <Suspense fallback={<div>loading</div>}>
        <FnBasic />
      </Suspense>,
    );
    const tag = await waitForElement(() => getByText('Button time'));
    expect(tag).toBeInTheDocument();
  });
});
