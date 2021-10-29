import React, { Suspense } from 'react';
import { render, waitForElement } from '@testing-library/react';
import { Tag, TagGroup, TagFn } from '..';

describe('Tag component', () => {
  const Basic = () => (
    <Suspense fallback={<div>loading</div>}>
      <Tag text="basic" />
    </Suspense>
  );

  test('renders', async () => {
    const { getByText } = render(<Basic />);
    const tag = await waitForElement(() => getByText('basic'));
    expect(tag).toBeInTheDocument();
  });

  test('*Fn renders', () => {
    const FnBasic = () => {
      return TagFn({
        type: 'Tag',
        props: { text: 'hello' },
        children: [],
        dispatch: () => Promise.resolve(),
        render: () => null,
        renderChildren: () => null,
        Components: {},
      });
    };
    const { getByText } = render(<FnBasic />);
    const tag = getByText('hello');
    expect(tag).toBeInTheDocument();
  });

  test('can supply color', async () => {
    const Yellow = () => (
      <Suspense fallback={<div>loading</div>}>
        <Tag text="yellow" color={'yellow'} />
      </Suspense>
    );
    const { getByText } = render(<Yellow />);
    const tag = await waitForElement(() => getByText('yellow'));
    expect(tag).toHaveStyle('backgroundColor: yellow');
  });
});

describe('TagGroup', () => {
  const Basic = (
    <Suspense fallback={<div>loading</div>}>
      <TagGroup>
        <Tag text="content" />
      </TagGroup>
    </Suspense>
  );
  test('renders', async () => {
    const { getByText } = render(Basic);
    const tagGroup = await waitForElement(() => getByText('content'));
    expect(tagGroup).toBeInTheDocument();
  });
});
