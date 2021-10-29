import React, { ReactNode } from 'react';

import { mount, ReactWrapper } from 'enzyme';

import { Trigger } from './styled';
import type { PopupControllerActions, PopupSpec } from './types';

import { usePopupController } from './index';

const makePopup: (
  id: string,
  data: string,
  keepOpenIds?: string[],
) => PopupSpec<{ test: string }, { test: string }> = (
  id,
  data,
  keepOpenIds = [],
) => ({
  id: id,
  data: {
    test: data,
  },
  offset: [0, 0],
  placement: 'top',
  renderContents: ({ id, data, context, onClose }) => (
    <div data-id={id}>
      <div data-context>{context.test}</div>
      <button onClick={onClose}>{data.test}</button>
    </div>
  ),
  targetRect: {
    bottom: 220,
    height: 20,
    left: 100,
    right: 150,
    top: 200,
    width: 50,
    x: 100,
    y: 200,
    toJSON: () => '',
  },
  targetOffsetWidth: 50,
  keepOpenIds,
  mouseOffsetY: 10,
});

const TestRoot = ({
  children,
}: {
  children: ReactNode;
  arePopupsOpen: boolean;
  openPopupIds: Set<string>;
  openPopup: PopupControllerActions<{ test: string }>['openPopup'];
}) => <div data-root>{children}</div>;

const TestContainer = (props: { context: string }) => {
  const [
    { arePopupsOpen, openPopupIds, popupContainer },
    { openPopup },
  ] = usePopupController({ test: props.context });
  return (
    <TestRoot
      arePopupsOpen={arePopupsOpen}
      openPopupIds={openPopupIds}
      openPopup={openPopup}
    >
      {popupContainer}
    </TestRoot>
  );
};

describe('usePopupController', () => {
  const mountPopups = (context: string) =>
    mount(<TestContainer context={context} />);

  const arePopupsOpen = (wrapper: ReactWrapper) =>
    wrapper.find(TestRoot).prop('arePopupsOpen');
  const openPopupIds = (wrapper: ReactWrapper) =>
    wrapper.find(TestRoot).prop('openPopupIds');
  const popups = (wrapper: ReactWrapper) =>
    wrapper.find('[data-root] > div').children();
  const popupContentsById = (wrapper: ReactWrapper, id: string) =>
    popups(wrapper).find(`[data-id="${id}"]`);
  const popupById = (
    wrapper: ReactWrapper,
    id: string,
    remountCounter: number = 0,
  ) =>
    popups(wrapper).findWhere(
      (node) => node.key() === JSON.stringify([id, remountCounter]),
    );
  const openPopup = async (
    wrapper: ReactWrapper,
    popup: ReturnType<typeof makePopup>,
  ) => {
    const promise = wrapper.find(TestRoot).prop('openPopup')(popup);
    jest.runAllTimers();
    await promise;
    wrapper.update();
  };
  const closePopups = async (wrapper: ReactWrapper, popupIds: string[]) => {
    const promises = popupIds.map((popupId) =>
      (popupContentsById(wrapper, popupId)
        .find('button')
        .prop('onClick') as () => Promise<void>)(),
    );
    jest.runAllTimers();
    await Promise.all(promises);
    wrapper.update();
  };

  let wrapper: ReactWrapper;

  beforeEach(() => {
    jest.useFakeTimers();
    wrapper = mountPopups('dummy-context');
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should not initially have any popups open', () => {
    expect(arePopupsOpen(wrapper)).toEqual(false);
    expect(openPopupIds(wrapper).size).toBe(0);
  });

  it('should render the trigger correctly', async () => {
    await openPopup(wrapper, makePopup('test-id', '123'));
    const trigger = wrapper.find(Trigger);
    expect(trigger.prop('top')).toEqual(210);
    expect(trigger.prop('left')).toEqual(100);
    expect(trigger.prop('width')).toEqual(50);
  });

  it('should provide the correct props to the popup', async () => {
    const popupSpec = makePopup('test-id', '123');
    await openPopup(wrapper, popupSpec);
    const popup = popupById(wrapper, 'test-id');
    expect(popup.prop('offset')).toEqual(popupSpec.offset);
    expect(popup.prop('placement')).toEqual(popupSpec.placement);
    expect(popup.prop('isOpen')).toEqual(true);
  });

  it('should open and close a popup', async () => {
    expect(openPopupIds(wrapper).has('test-id')).toBe(false);
    await openPopup(wrapper, makePopup('test-id', '123'));
    expect(popupContentsById(wrapper, 'test-id').exists()).toEqual(true);
    expect(popupContentsById(wrapper, 'test-id').find('button').text()).toEqual(
      '123',
    );
    expect(
      popupContentsById(wrapper, 'test-id').find('[data-context]').text(),
    ).toEqual('dummy-context');
    expect(arePopupsOpen(wrapper)).toEqual(true);
    expect(openPopupIds(wrapper).has('test-id')).toBe(true);

    await closePopups(wrapper, ['test-id']);
    expect(popupContentsById(wrapper, 'test-id').exists()).toEqual(false);
    expect(arePopupsOpen(wrapper)).toEqual(false);
    expect(openPopupIds(wrapper).has('test-id')).toBe(false);
  });

  it('should update the popup contents when the context changes', async () => {
    await openPopup(wrapper, makePopup('test-id', '123'));
    expect(
      popupContentsById(wrapper, 'test-id').find('[data-context]').text(),
    ).toEqual('dummy-context');

    wrapper.setProps({ context: 'another-context' });
    expect(
      popupContentsById(wrapper, 'test-id').find('[data-context]').text(),
    ).toEqual('another-context');
  });

  it('should not close a popup when another popup closes first including it in keepOpenIds', async () => {
    const popupSpec = makePopup('test-id', '123');
    const popupSpecChild = makePopup('test-id-child', '456', ['test-id']);
    await openPopup(wrapper, popupSpec);
    await openPopup(wrapper, popupSpecChild);
    expect(popupContentsById(wrapper, 'test-id').exists()).toEqual(true);
    expect(popupContentsById(wrapper, 'test-id-child').exists()).toEqual(true);
    expect(openPopupIds(wrapper).has('test-id')).toBe(true);
    expect(openPopupIds(wrapper).has('test-id-child')).toBe(true);

    await closePopups(wrapper, ['test-id-child', 'test-id']);
    expect(popupContentsById(wrapper, 'test-id-child').exists()).toEqual(false);
    expect(popupContentsById(wrapper, 'test-id').exists()).toEqual(true);
    expect(arePopupsOpen(wrapper)).toEqual(true);
    expect(openPopupIds(wrapper).has('test-id-child')).toBe(false);
    expect(openPopupIds(wrapper).has('test-id')).toBe(true);
  });

  it('should close a popup despite another popup including it in keepOpenIds if it is closed first', async () => {
    const popupSpec = makePopup('test-id', '123');
    const popupSpecChild = makePopup('test-id-child', '456', ['test-id']);
    await openPopup(wrapper, popupSpec);
    await openPopup(wrapper, popupSpecChild);
    expect(popupContentsById(wrapper, 'test-id').exists()).toEqual(true);
    expect(popupContentsById(wrapper, 'test-id-child').exists()).toEqual(true);
    expect(openPopupIds(wrapper).has('test-id-child')).toBe(true);
    expect(openPopupIds(wrapper).has('test-id')).toBe(true);

    await closePopups(wrapper, ['test-id', 'test-id-child']);
    expect(popupContentsById(wrapper, 'test-id-child').exists()).toEqual(false);
    expect(popupContentsById(wrapper, 'test-id').exists()).toEqual(false);
    expect(arePopupsOpen(wrapper)).toEqual(false);
    expect(openPopupIds(wrapper).has('test-id-child')).toBe(false);
    expect(openPopupIds(wrapper).has('test-id')).toBe(false);
  });
});
