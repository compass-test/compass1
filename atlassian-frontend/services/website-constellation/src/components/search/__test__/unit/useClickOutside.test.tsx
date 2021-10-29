import React, { useRef } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import { useClickOutside } from '../../utils';

describe('', () => {
  beforeEach(() => {
    global.container = document.createElement('div');
    document.body.appendChild(global.container);
  });

  afterEach(() => {
    unmountComponentAtNode(global.container);
    global.container = null;
  });

  it('should close the dialog on outside click', () => {
    const TestComponent = () => {
      const targetRef = useRef(null);
      const containerRef = useRef(null);
      const { isOpen, setIsOpen } = useClickOutside(targetRef, containerRef);
      return (
        <>
          <button
            data-testid="trigger"
            onClick={() => {
              setIsOpen(true);
            }}
            ref={targetRef}
          >
            {'Click Me'}
          </button>
          {isOpen && (
            <div data-testid="container" ref={containerRef}>
              {'SOME TEXT'}
            </div>
          )}
        </>
      );
    };
    act(() => {
      render(<TestComponent />, global.container);
    });

    const button = document.querySelector('[data-testid=trigger]');
    act(() => {
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    const dialogA = document.querySelector('[data-testid=container]');
    expect(dialogA);

    act(() => {
      global.container.dispatchEvent(
        new MouseEvent('click', { bubbles: true }),
      );
    });
    const dialogB = document.querySelector('[data-testid=container]');
    expect(dialogB).toBe(null);
  });

  it('should keep the dialog open on click in the dialog', () => {
    const TestComponent = () => {
      const targetRef = useRef(null);
      const containerRef = useRef(null);
      const { isOpen, setIsOpen } = useClickOutside(targetRef, containerRef);
      return (
        <>
          <button
            data-testid="trigger"
            onClick={() => {
              setIsOpen(true);
            }}
            ref={targetRef}
          >
            {'Click Me'}
          </button>
          {isOpen && (
            <div data-testid="container" ref={containerRef}>
              {'SOME TEXT'}
            </div>
          )}
        </>
      );
    };
    act(() => {
      render(<TestComponent />, global.container);
    });

    const button = document.querySelector('[data-testid=trigger]');
    act(() => {
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    const dialogA = document.querySelector('[data-testid=container]');
    expect(dialogA);

    act(() => {
      dialogA.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    const dialogB = document.querySelector('[data-testid=container]');
    expect(dialogA).toBe(dialogB);
  });
  it('should keep the dialog open on click of the trigger', () => {
    const TestComponent = () => {
      const targetRef = useRef(null);
      const containerRef = useRef(null);
      const { isOpen, setIsOpen } = useClickOutside(targetRef, containerRef);
      return (
        <>
          <button
            data-testid="trigger"
            onClick={() => {
              setIsOpen(true);
            }}
            ref={targetRef}
          >
            {'Click Me'}
          </button>
          {isOpen && (
            <div data-testid="container" ref={containerRef}>
              {'SOME TEXT'}
            </div>
          )}
        </>
      );
    };
    act(() => {
      render(<TestComponent />, global.container);
    });

    const button = document.querySelector('[data-testid=trigger]');
    act(() => {
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    const dialogA = document.querySelector('[data-testid=container]');
    act(() => {
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    const dialogB = document.querySelector('[data-testid=container]');
    expect(dialogB).toBe(dialogA);
  });
});
