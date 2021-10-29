import React, { FunctionComponent } from 'react';
import { mount, ReactWrapper } from 'enzyme';
import {
  KeyboardHighlightProvider,
  useKeyboardNavigation,
} from '../search-keyboard';
import { act } from '@testing-library/react';

describe('KeyboardContext', () => {
  let parentNode: HTMLElement;
  const wrappedComponentRendered = jest.fn();
  const HIGHLIGHTED = 'highlighted';

  const HighlightableComponent: FunctionComponent<{}> = ({ children }) => {
    const [isKeyboardHighlighted, registerRef] = useKeyboardNavigation<
      HTMLDivElement
    >();

    wrappedComponentRendered();

    return (
      <>
        <div ref={registerRef}>{isKeyboardHighlighted ? HIGHLIGHTED : ''}</div>
        {children}
      </>
    );
  };

  /**
   * Component that will render `HighlightableComponent` only when explicitly allowed, to do use
   * `ReactWrapper#instance#triggerRender`
   *
   * The component also allows itself to be unredered by calling `ReactWrapper#instance#triggerUnrender`
   */
  class AsyncHighlightableComponent extends React.Component<{
    initiallyRendered?: boolean;
  }> {
    state = {
      rendered: !!this.props.initiallyRendered,
    };

    triggerRender = () => {
      this.setState({
        rendered: true,
      });
    };

    triggerUnrender = () => {
      this.setState({
        rendered: false,
      });
    };

    render() {
      return (
        <>{this.state.rendered ? <HighlightableComponent /> : 'LOADING'}</>
      );
    }
  }

  const isComponentHighlighted = (wrapper: ReactWrapper<any>) => {
    return wrapper.text() === HIGHLIGHTED;
  };

  beforeEach(() => {
    parentNode = document.createElement('div');
    document.body.appendChild(parentNode);
    jest.resetAllMocks();
  });

  afterAll(() => {
    document.body.removeChild(parentNode);
  });

  const simulateArrowUp = (listenerNode: Element | Text = parentNode) => {
    act(() => {
      listenerNode.dispatchEvent(
        new KeyboardEvent('keydown', { code: 'ArrowUp' }),
      );
    });
  };

  const simulateArrowDown = (listenerNode: Element | Text = parentNode) => {
    act(() => {
      listenerNode.dispatchEvent(
        new KeyboardEvent('keydown', { code: 'ArrowDown' }),
      );
    });
  };

  it('does not highlight any components by default', () => {
    const wrapper = mount(
      <KeyboardHighlightProvider listenerNode={parentNode}>
        <HighlightableComponent />
      </KeyboardHighlightProvider>,
    );

    expect(isComponentHighlighted(wrapper.find(HighlightableComponent))).toBe(
      false,
    );
  });

  it('up & down keydowns work together as expected', () => {
    const wrapper = mount(
      <KeyboardHighlightProvider listenerNode={parentNode}>
        <HighlightableComponent />
        <HighlightableComponent />
      </KeyboardHighlightProvider>,
    );

    simulateArrowDown();
    expect(
      isComponentHighlighted(wrapper.find(HighlightableComponent).at(0)),
    ).toBe(true);

    simulateArrowUp();
    expect(
      isComponentHighlighted(wrapper.find(HighlightableComponent).at(1)),
    ).toBe(true);
  });

  it('does not error when there are no highlightable components', () => {
    const wrapper = mount(
      <KeyboardHighlightProvider listenerNode={parentNode} />,
    );

    simulateArrowDown();
    simulateArrowUp();

    expect(wrapper.find(KeyboardHighlightProvider)).toHaveLength(1);
  });

  it('does not error when there are no highlight provider', () => {
    const wrapper = mount(
      <>
        <HighlightableComponent />
        <HighlightableComponent />
      </>,
    );

    simulateArrowDown();
    simulateArrowUp();

    expect(wrapper.find(HighlightableComponent)).toHaveLength(2);
  });

  it('binds itself properly to new listenerNodes', () => {
    const wrapper = mount(
      <KeyboardHighlightProvider listenerNode={undefined}>
        <HighlightableComponent />
      </KeyboardHighlightProvider>,
    );

    wrappedComponentRendered.mockClear();

    // Should do nothing as there's no event listener
    simulateArrowDown();

    expect(wrappedComponentRendered.mock.calls).toHaveLength(0);

    wrapper.setProps({
      listenerNode: parentNode,
    });

    wrappedComponentRendered.mockClear();

    // Should trigger a render as there IS an event listener
    simulateArrowDown();
    simulateArrowUp();

    expect(wrappedComponentRendered.mock.calls.length).toBeGreaterThan(0);
  });

  it('unmounting provider correctly detaches listeners', () => {
    const wrapper = mount(
      <KeyboardHighlightProvider listenerNode={parentNode}>
        <HighlightableComponent />
      </KeyboardHighlightProvider>,
    );

    expect(wrapper.find(KeyboardHighlightProvider).exists()).toBe(true);

    act(() => {
      wrapper.unmount();
    });

    wrapper.update();
    expect(wrapper.find(KeyboardHighlightProvider).exists()).toBe(false);

    wrappedComponentRendered.mockClear();

    // We can't really test whether a listener has been detached, as such we can only test that
    // any subsequent keydowns don't blow up or trigger any additional renders.
    simulateArrowUp();
    simulateArrowDown();

    expect(wrappedComponentRendered.mock.calls).toHaveLength(0);
  });

  it('changing listener node for provider correctly detaches then reattaches listeners', () => {
    const wrapper = mount(
      <KeyboardHighlightProvider listenerNode={parentNode}>
        <HighlightableComponent />
        <HighlightableComponent />
      </KeyboardHighlightProvider>,
    );

    const newParentNode = document.createElement('div');
    document.body.appendChild(parentNode);
    wrapper.setProps({
      listenerNode: newParentNode,
    });
    wrapper.update();

    // Test that we're still rendering the right number of times with the new node
    wrappedComponentRendered.mockClear();

    simulateArrowUp(newParentNode);
    expect(wrappedComponentRendered.mock.calls).toHaveLength(1);

    simulateArrowDown(newParentNode);
    expect(wrappedComponentRendered.mock.calls).toHaveLength(3);

    // Test that we're not rendering anything with the old node
    wrappedComponentRendered.mockClear();

    simulateArrowUp(parentNode);
    simulateArrowDown(parentNode);
    expect(wrappedComponentRendered.mock.calls).toHaveLength(0);
  });

  it('adding and removing the ref causes component to be highlightable / unhighlightable respectively', async () => {
    // Setup with component that supports changing refs
    let removeRef: () => void | null;
    let addRef: () => void | null;

    const HighlightableComponentWithRefChanging: FunctionComponent<{
      initialHasRef: boolean;
    }> = ({ initialHasRef }) => {
      const [hasRef, setHasRef] = React.useState(initialHasRef);
      removeRef = () => setHasRef(false);
      addRef = () => setHasRef(true);

      const [isKeyboardHighlighted, registerRef] = useKeyboardNavigation<
        HTMLDivElement
      >();

      return (
        <>
          {hasRef ? (
            <div ref={registerRef}>
              {isKeyboardHighlighted ? HIGHLIGHTED : ''}
            </div>
          ) : (
            <div>{isKeyboardHighlighted ? HIGHLIGHTED : ''}</div>
          )}
        </>
      );
    };

    const wrapper = mount(
      <KeyboardHighlightProvider listenerNode={parentNode}>
        <HighlightableComponentWithRefChanging initialHasRef />
      </KeyboardHighlightProvider>,
    );

    // Remove the ref and make sure the up and down does not do anything
    act(() => {
      removeRef!();
    });

    simulateArrowUp();
    simulateArrowDown();

    expect(
      isComponentHighlighted(
        wrapper.find(HighlightableComponentWithRefChanging),
      ),
    ).toBe(false);

    // Add the ref again and make sure the up and down does do something
    act(() => {
      addRef!();
    });

    simulateArrowUp();
    simulateArrowDown();

    expect(
      isComponentHighlighted(
        wrapper.find(HighlightableComponentWithRefChanging),
      ),
    ).toBe(true);
  });

  describe('down', () => {
    it('highlights the only item on key down', () => {
      const wrapper = mount(
        <KeyboardHighlightProvider listenerNode={parentNode}>
          <HighlightableComponent />
        </KeyboardHighlightProvider>,
      );

      simulateArrowDown();

      expect(isComponentHighlighted(wrapper.find(HighlightableComponent))).toBe(
        true,
      );
    });

    it('multiple keydown does not unhighlight items', () => {
      const wrapper = mount(
        <KeyboardHighlightProvider listenerNode={parentNode}>
          <HighlightableComponent />
        </KeyboardHighlightProvider>,
      );

      simulateArrowDown();
      simulateArrowDown();

      expect(isComponentHighlighted(wrapper.find(HighlightableComponent))).toBe(
        true,
      );
    });

    it('there is no unncessary re-render on changing highlighted component', () => {
      mount(
        <KeyboardHighlightProvider listenerNode={parentNode}>
          <HighlightableComponent />
          <HighlightableComponent />
          <HighlightableComponent />
          <HighlightableComponent />
        </KeyboardHighlightProvider>,
      );

      wrappedComponentRendered.mockClear();

      // Expect the wrapper to NEVER be re-rendered on keydown
      // Expect 1 render from highlighting
      simulateArrowDown();
      expect(wrappedComponentRendered.mock.calls).toHaveLength(1);

      // Expect 2 more renders, 1 for unhighlighting and 1 for highlighting
      simulateArrowDown();
      expect(wrappedComponentRendered.mock.calls).toHaveLength(3);

      // Double check that we don't trigger any unnecessary renders
      simulateArrowDown();
      expect(wrappedComponentRendered.mock.calls).toHaveLength(5);
    });

    it('if highlighted item doesnt change then nothing should be re-rendered', () => {
      mount(
        <KeyboardHighlightProvider listenerNode={parentNode}>
          <HighlightableComponent />
        </KeyboardHighlightProvider>,
      );

      wrappedComponentRendered.mockClear();

      // Should trigger update
      simulateArrowDown();
      expect(wrappedComponentRendered.mock.calls).toHaveLength(1);

      // Should not trigger update
      simulateArrowDown();
      expect(wrappedComponentRendered.mock.calls).toHaveLength(1);
    });

    it('moves highlight correctly between components', () => {
      const wrapper = mount(
        <KeyboardHighlightProvider listenerNode={parentNode}>
          <HighlightableComponent />
          <HighlightableComponent />
        </KeyboardHighlightProvider>,
      );

      simulateArrowDown();
      expect(
        isComponentHighlighted(wrapper.find(HighlightableComponent).at(0)),
      ).toBe(true);
      expect(
        isComponentHighlighted(wrapper.find(HighlightableComponent).at(1)),
      ).toBe(false);

      simulateArrowDown();
      expect(
        isComponentHighlighted(wrapper.find(HighlightableComponent).at(0)),
      ).toBe(false);
      expect(
        isComponentHighlighted(wrapper.find(HighlightableComponent).at(1)),
      ).toBe(true);

      simulateArrowDown();
      expect(
        isComponentHighlighted(wrapper.find(HighlightableComponent).at(0)),
      ).toBe(true);
      expect(
        isComponentHighlighted(wrapper.find(HighlightableComponent).at(1)),
      ).toBe(false);
    });

    it('moves highlight correctly between components even with non-highlightable elements between', () => {
      const wrapper = mount(
        <KeyboardHighlightProvider listenerNode={parentNode}>
          <HighlightableComponent />
          <div />
          <HighlightableComponent />
        </KeyboardHighlightProvider>,
      );

      simulateArrowDown();
      expect(
        isComponentHighlighted(wrapper.find(HighlightableComponent).at(0)),
      ).toBe(true);

      simulateArrowDown();
      expect(
        isComponentHighlighted(wrapper.find(HighlightableComponent).at(1)),
      ).toBe(true);
    });

    it('moves highlight correctly when new highlightable component is added after highlighted component', () => {
      const wrapper = mount(
        <KeyboardHighlightProvider listenerNode={parentNode}>
          <HighlightableComponent />
          <AsyncHighlightableComponent />
          <HighlightableComponent />
        </KeyboardHighlightProvider>,
      );

      // Sanity check
      simulateArrowDown();
      expect(
        isComponentHighlighted(wrapper.find(HighlightableComponent).at(0)),
      ).toBe(true);

      act(() => {
        (wrapper
          .find(AsyncHighlightableComponent)
          .instance() as any).triggerRender();
      });

      wrapper.update();

      simulateArrowDown();
      expect(wrapper.find(HighlightableComponent)).toHaveLength(3);
      expect(
        isComponentHighlighted(wrapper.find(HighlightableComponent).at(1)),
      ).toBe(true);
    });

    it('moves highlight correctly when new highlightable component is added before highlighted component', () => {
      const wrapper = mount(
        <KeyboardHighlightProvider listenerNode={parentNode}>
          <AsyncHighlightableComponent />
          <HighlightableComponent />
          <HighlightableComponent />
        </KeyboardHighlightProvider>,
      );

      // Sanity check
      simulateArrowDown();
      expect(
        isComponentHighlighted(wrapper.find(HighlightableComponent).at(0)),
      ).toBe(true);

      act(() => {
        (wrapper
          .find(AsyncHighlightableComponent)
          .instance() as any).triggerRender();
      });

      wrapper.update();
      // The highlighted items is now the second item
      expect(
        isComponentHighlighted(wrapper.find(HighlightableComponent).at(1)),
      ).toBe(true);

      simulateArrowDown();
      expect(wrapper.find(HighlightableComponent)).toHaveLength(3);
      expect(
        isComponentHighlighted(wrapper.find(HighlightableComponent).at(2)),
      ).toBe(true); // TODO
    });

    it('moves highlight correctly when highlightable component is removed after highlighted component', () => {
      const wrapper = mount(
        <KeyboardHighlightProvider listenerNode={parentNode}>
          <HighlightableComponent />
          <AsyncHighlightableComponent initiallyRendered />
          <HighlightableComponent />
        </KeyboardHighlightProvider>,
      );

      // Sanity check
      simulateArrowDown();
      expect(
        isComponentHighlighted(wrapper.find(HighlightableComponent).at(0)),
      ).toBe(true);

      act(() => {
        (wrapper
          .find(AsyncHighlightableComponent)
          .instance() as any).triggerUnrender();
      });

      wrapper.update();

      simulateArrowDown();
      expect(
        isComponentHighlighted(wrapper.find(HighlightableComponent).at(1)),
      ).toBe(true);
    });

    it('moves highlight correctly when highlightable component is removed before highlighted component', () => {
      const wrapper = mount(
        <KeyboardHighlightProvider listenerNode={parentNode}>
          <AsyncHighlightableComponent initiallyRendered />
          <HighlightableComponent />
          <HighlightableComponent />
        </KeyboardHighlightProvider>,
      );

      // Sanity check
      simulateArrowDown();
      simulateArrowDown();
      expect(
        isComponentHighlighted(wrapper.find(HighlightableComponent).at(1)),
      ).toBe(true);

      act(() => {
        (wrapper
          .find(AsyncHighlightableComponent)
          .instance() as any).triggerUnrender();
      });

      wrapper.update();
      // The highlighted items is now the second item
      expect(
        isComponentHighlighted(wrapper.find(HighlightableComponent).at(0)),
      ).toBe(true);

      simulateArrowDown();
      expect(
        isComponentHighlighted(wrapper.find(HighlightableComponent).at(1)),
      ).toBe(true);
    });

    it('reset position and moves highlight correctly when highlighted component is removed', () => {
      const wrapper = mount(
        <KeyboardHighlightProvider listenerNode={parentNode}>
          <HighlightableComponent />
          <AsyncHighlightableComponent initiallyRendered />
          <HighlightableComponent />
        </KeyboardHighlightProvider>,
      );

      simulateArrowDown();
      simulateArrowDown();
      expect(
        isComponentHighlighted(wrapper.find(HighlightableComponent).at(1)),
      ).toBe(true);

      act(() => {
        (wrapper
          .find(AsyncHighlightableComponent)
          .instance() as any).triggerUnrender();
      });

      wrapper.update();

      expect(
        isComponentHighlighted(wrapper.find(HighlightableComponent).at(1)),
      ).toBe(false);

      simulateArrowDown();
      // Reset and moves highlights again
      expect(
        isComponentHighlighted(wrapper.find(HighlightableComponent).at(0)),
      ).toBe(true);
    });

    it('moves highlight correctly when highlightable component are rendered out of order', () => {
      const wrapper = mount(
        <KeyboardHighlightProvider listenerNode={parentNode}>
          <AsyncHighlightableComponent />
          <AsyncHighlightableComponent />
          <AsyncHighlightableComponent />
        </KeyboardHighlightProvider>,
      );

      // Render in the order of 1 / 2 / 0
      act(() => {
        (wrapper
          .find(AsyncHighlightableComponent)
          .at(1)
          .instance() as any).triggerRender();

        (wrapper
          .find(AsyncHighlightableComponent)
          .at(2)
          .instance() as any).triggerRender();

        (wrapper
          .find(AsyncHighlightableComponent)
          .at(0)
          .instance() as any).triggerRender();
      });

      wrapper.update();

      simulateArrowDown();
      expect(
        isComponentHighlighted(wrapper.find(HighlightableComponent).at(0)),
      ).toBe(true);

      simulateArrowDown();
      expect(
        isComponentHighlighted(wrapper.find(HighlightableComponent).at(1)),
      ).toBe(true);

      simulateArrowDown();
      expect(
        isComponentHighlighted(wrapper.find(HighlightableComponent).at(2)),
      ).toBe(true);
    });

    it('moves highlight correctly when nested', () => {
      const wrapper = mount(
        <KeyboardHighlightProvider listenerNode={parentNode}>
          <div>
            <HighlightableComponent />
            <div>
              <HighlightableComponent />
            </div>
          </div>
          <HighlightableComponent />
        </KeyboardHighlightProvider>,
      );

      simulateArrowDown();
      expect(
        isComponentHighlighted(wrapper.find(HighlightableComponent).at(0)),
      ).toBe(true);

      simulateArrowDown();
      expect(
        isComponentHighlighted(wrapper.find(HighlightableComponent).at(1)),
      ).toBe(true);

      simulateArrowDown();
      expect(
        isComponentHighlighted(wrapper.find(HighlightableComponent).at(2)),
      ).toBe(true);
    });

    it('moves highlight correctly when nested in other highlightable components', () => {
      const wrapper = mount(
        <KeyboardHighlightProvider listenerNode={parentNode}>
          <HighlightableComponent>
            <HighlightableComponent />
          </HighlightableComponent>
        </KeyboardHighlightProvider>,
      );

      simulateArrowDown();
      expect(
        isComponentHighlighted(wrapper.find(HighlightableComponent).at(0)),
      ).toBe(true);

      simulateArrowDown();
      expect(
        isComponentHighlighted(wrapper.find(HighlightableComponent).at(1)),
      ).toBe(true);
    });
  });

  describe('up', () => {
    it('highlights the only item on key down', () => {
      const wrapper = mount(
        <KeyboardHighlightProvider listenerNode={parentNode}>
          <HighlightableComponent />
        </KeyboardHighlightProvider>,
      );

      simulateArrowUp();

      expect(isComponentHighlighted(wrapper.find(HighlightableComponent))).toBe(
        true,
      );
    });

    it('multiple keydown does not unhighlight items', () => {
      const wrapper = mount(
        <KeyboardHighlightProvider listenerNode={parentNode}>
          <HighlightableComponent />
        </KeyboardHighlightProvider>,
      );

      simulateArrowUp();
      simulateArrowUp();

      expect(isComponentHighlighted(wrapper.find(HighlightableComponent))).toBe(
        true,
      );
    });

    it('there is no unncessary re-render on changing highlighted component', () => {
      mount(
        <KeyboardHighlightProvider listenerNode={parentNode}>
          <HighlightableComponent />
          <HighlightableComponent />
          <HighlightableComponent />
          <HighlightableComponent />
        </KeyboardHighlightProvider>,
      );

      wrappedComponentRendered.mockClear();

      // Expect the wrapper to NEVER be re-rendered on keydown
      // Expect 1 render from highlighting
      simulateArrowUp();
      expect(wrappedComponentRendered.mock.calls).toHaveLength(1);

      // Expect 2 more renders, 1 for unhighlighting and 1 for highlighting
      simulateArrowUp();
      expect(wrappedComponentRendered.mock.calls).toHaveLength(3);

      // Double check that we don't trigger any unnecessary renders
      simulateArrowUp();
      expect(wrappedComponentRendered.mock.calls).toHaveLength(5);
    });

    it('if highlighted item doesnt change then nothing should be re-rendered', () => {
      mount(
        <KeyboardHighlightProvider listenerNode={parentNode}>
          <HighlightableComponent />
        </KeyboardHighlightProvider>,
      );

      wrappedComponentRendered.mockClear();

      // Should trigger update
      simulateArrowUp();
      expect(wrappedComponentRendered.mock.calls).toHaveLength(1);

      // Should not trigger update
      simulateArrowUp();
      expect(wrappedComponentRendered.mock.calls).toHaveLength(1);
    });

    it('moves highlight correctly between components', () => {
      const wrapper = mount(
        <KeyboardHighlightProvider listenerNode={parentNode}>
          <HighlightableComponent />
          <HighlightableComponent />
        </KeyboardHighlightProvider>,
      );

      simulateArrowUp();
      expect(
        isComponentHighlighted(wrapper.find(HighlightableComponent).at(0)),
      ).toBe(false);
      expect(
        isComponentHighlighted(wrapper.find(HighlightableComponent).at(1)),
      ).toBe(true);

      simulateArrowUp();
      expect(
        isComponentHighlighted(wrapper.find(HighlightableComponent).at(0)),
      ).toBe(true);
      expect(
        isComponentHighlighted(wrapper.find(HighlightableComponent).at(1)),
      ).toBe(false);

      simulateArrowUp();
      expect(
        isComponentHighlighted(wrapper.find(HighlightableComponent).at(0)),
      ).toBe(false);
      expect(
        isComponentHighlighted(wrapper.find(HighlightableComponent).at(1)),
      ).toBe(true);
    });

    it('moves highlight correctly between components even with non-highlightable elements between', () => {
      const wrapper = mount(
        <KeyboardHighlightProvider listenerNode={parentNode}>
          <HighlightableComponent />
          <div />
          <HighlightableComponent />
        </KeyboardHighlightProvider>,
      );

      simulateArrowUp();
      expect(
        isComponentHighlighted(wrapper.find(HighlightableComponent).at(1)),
      ).toBe(true);

      simulateArrowUp();
      expect(
        isComponentHighlighted(wrapper.find(HighlightableComponent).at(0)),
      ).toBe(true);
    });

    it('moves highlight correctly when new highlightable component is added after highlighted component', () => {
      const wrapper = mount(
        <KeyboardHighlightProvider listenerNode={parentNode}>
          <HighlightableComponent />
          <HighlightableComponent />
          <AsyncHighlightableComponent />
        </KeyboardHighlightProvider>,
      );

      // Sanity check
      simulateArrowUp();
      expect(
        isComponentHighlighted(wrapper.find(HighlightableComponent).at(1)),
      ).toBe(true);

      (wrapper
        .find(AsyncHighlightableComponent)
        .instance() as any).triggerRender();

      wrapper.update();

      simulateArrowUp();
      expect(wrapper.find(HighlightableComponent)).toHaveLength(3);
      expect(
        isComponentHighlighted(wrapper.find(HighlightableComponent).at(0)),
      ).toBe(true);
    });

    it('moves highlight correctly when new highlightable component is added before highlighted component', () => {
      const wrapper = mount(
        <KeyboardHighlightProvider listenerNode={parentNode}>
          <HighlightableComponent />
          <AsyncHighlightableComponent />
          <HighlightableComponent />
        </KeyboardHighlightProvider>,
      );

      // Sanity check
      simulateArrowUp();
      expect(
        isComponentHighlighted(wrapper.find(HighlightableComponent).at(1)),
      ).toBe(true);

      act(() => {
        (wrapper
          .find(AsyncHighlightableComponent)
          .instance() as any).triggerRender();
      });

      wrapper.update();
      // The highlighted items is now the second item
      expect(
        isComponentHighlighted(wrapper.find(HighlightableComponent).at(2)),
      ).toBe(true);

      simulateArrowUp();
      expect(wrapper.find(HighlightableComponent)).toHaveLength(3);
      expect(
        isComponentHighlighted(wrapper.find(HighlightableComponent).at(1)),
      ).toBe(true); // TODO
    });

    it('moves highlight correctly when highlightable component is removed after highlighted component', () => {
      const wrapper = mount(
        <KeyboardHighlightProvider listenerNode={parentNode}>
          <HighlightableComponent />
          <HighlightableComponent />
          <AsyncHighlightableComponent initiallyRendered />
        </KeyboardHighlightProvider>,
      );

      // Sanity check
      simulateArrowUp();
      simulateArrowUp();
      expect(
        isComponentHighlighted(wrapper.find(HighlightableComponent).at(1)),
      ).toBe(true);

      act(() => {
        (wrapper
          .find(AsyncHighlightableComponent)
          .instance() as any).triggerUnrender();
      });
      wrapper.update();

      simulateArrowUp();
      expect(
        isComponentHighlighted(wrapper.find(HighlightableComponent).at(0)),
      ).toBe(true);
    });

    it('moves highlight correctly when highlightable component is removed before highlighted component', () => {
      const wrapper = mount(
        <KeyboardHighlightProvider listenerNode={parentNode}>
          <HighlightableComponent />
          <AsyncHighlightableComponent initiallyRendered />
          <HighlightableComponent />
        </KeyboardHighlightProvider>,
      );

      // Sanity check
      simulateArrowUp();
      expect(
        isComponentHighlighted(wrapper.find(HighlightableComponent).at(2)),
      ).toBe(true);

      act(() => {
        (wrapper
          .find(AsyncHighlightableComponent)
          .instance() as any).triggerUnrender();
      });

      wrapper.update();
      // The highlighted items is now the second item
      expect(
        isComponentHighlighted(wrapper.find(HighlightableComponent).at(1)),
      ).toBe(true);

      simulateArrowDown();
      expect(
        isComponentHighlighted(wrapper.find(HighlightableComponent).at(0)),
      ).toBe(true);
    });

    it('reset position and moves highlight correctly when highlighted component is removed', () => {
      const wrapper = mount(
        <KeyboardHighlightProvider listenerNode={parentNode}>
          <HighlightableComponent />
          <AsyncHighlightableComponent initiallyRendered />
          <HighlightableComponent />
        </KeyboardHighlightProvider>,
      );

      simulateArrowUp();
      simulateArrowUp();
      expect(
        isComponentHighlighted(wrapper.find(HighlightableComponent).at(1)),
      ).toBe(true);

      act(() => {
        (wrapper
          .find(AsyncHighlightableComponent)
          .instance() as any).triggerUnrender();
      });
      wrapper.update();

      expect(
        isComponentHighlighted(wrapper.find(HighlightableComponent).at(1)),
      ).toBe(false);

      simulateArrowUp();
      // Reset and moves highlights again
      expect(
        isComponentHighlighted(wrapper.find(HighlightableComponent).at(1)),
      ).toBe(true);
    });

    it('moves highlight correctly when highlightable component are rendered out of order', () => {
      const wrapper = mount(
        <KeyboardHighlightProvider listenerNode={parentNode}>
          <AsyncHighlightableComponent />
          <AsyncHighlightableComponent />
          <AsyncHighlightableComponent />
        </KeyboardHighlightProvider>,
      );

      // Render in the order of 1 / 2 / 0
      act(() => {
        (wrapper
          .find(AsyncHighlightableComponent)
          .at(1)
          .instance() as any).triggerRender();

        (wrapper
          .find(AsyncHighlightableComponent)
          .at(2)
          .instance() as any).triggerRender();

        (wrapper
          .find(AsyncHighlightableComponent)
          .at(0)
          .instance() as any).triggerRender();
      });

      wrapper.update();

      simulateArrowUp();
      expect(
        isComponentHighlighted(wrapper.find(HighlightableComponent).at(2)),
      ).toBe(true);

      simulateArrowUp();
      expect(
        isComponentHighlighted(wrapper.find(HighlightableComponent).at(1)),
      ).toBe(true);

      simulateArrowUp();
      expect(
        isComponentHighlighted(wrapper.find(HighlightableComponent).at(0)),
      ).toBe(true);
    });

    it('moves highlight correctly when nested', () => {
      const wrapper = mount(
        <KeyboardHighlightProvider listenerNode={parentNode}>
          <div>
            <HighlightableComponent />
            <div>
              <HighlightableComponent />
            </div>
          </div>
          <HighlightableComponent />
        </KeyboardHighlightProvider>,
      );

      simulateArrowUp();
      expect(
        isComponentHighlighted(wrapper.find(HighlightableComponent).at(2)),
      ).toBe(true);

      simulateArrowUp();
      expect(
        isComponentHighlighted(wrapper.find(HighlightableComponent).at(1)),
      ).toBe(true);

      simulateArrowUp();
      expect(
        isComponentHighlighted(wrapper.find(HighlightableComponent).at(0)),
      ).toBe(true);
    });

    it('moves highlight correctly when nested in other highlightable components', () => {
      const wrapper = mount(
        <KeyboardHighlightProvider listenerNode={parentNode}>
          <HighlightableComponent>
            <HighlightableComponent />
          </HighlightableComponent>
        </KeyboardHighlightProvider>,
      );

      simulateArrowUp();
      expect(
        isComponentHighlighted(wrapper.find(HighlightableComponent).at(1)),
      ).toBe(true);

      simulateArrowUp();
      expect(
        isComponentHighlighted(wrapper.find(HighlightableComponent).at(0)),
      ).toBe(true);
    });
  });
});
