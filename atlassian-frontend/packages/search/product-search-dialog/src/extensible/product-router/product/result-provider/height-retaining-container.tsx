import React, { useRef, useEffect } from 'react';

export interface Props {
  /**
   * Whether or not to retain the existing height on render, if set to true this component will not change minimum height on render and will instead
   * have a minimum height equal to the last time this was set to false.
   * This is useful for screen transitions so the screen height doesn't jump around.
   */
  retainHeight: boolean;
}

export const HeightRetainingContainer: React.FunctionComponent<Props> = ({
  retainHeight,
  children,
  ...rest
}) => {
  const minimumHeight = useRef<number | undefined>(undefined);
  const ref = useRef<HTMLDivElement>(null);

  // Why is this not in a `useEffect`?
  // Render order for React is from top down (parent -> children), this enables to retain the most up to date height of the children before a transition happens.
  // useEffect happens after render so we won't be able to account for changes to child height that does not cause a render to this component, checking the height
  // when the transition happens would be too late as it will register the new height instead.
  if (retainHeight) {
    const height = ref.current?.getBoundingClientRect()?.height;
    minimumHeight.current = height;
  }

  // Despite what is said above we do need to track the initial size, this can only be done once the ref.current? is set hence the onMount useEffect here.
  useEffect(() => {
    const height = ref.current?.getBoundingClientRect()?.height;
    minimumHeight.current = height;
  }, []);

  const shouldFixMinimumHeight = retainHeight && minimumHeight.current;

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: shouldFixMinimumHeight
          ? `${minimumHeight.current}px`
          : 'auto',
      }}
      ref={ref}
      {...rest}
    >
      {children}
    </div>
  );
};
