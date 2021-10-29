import { ReactNode } from 'react';

export type ExampleComponentPublicProps = {
  /** Content to be displayed inside the panel. */
  content: string | ReactNode;
  /** Whether the panel is open or not. */
  isOpen?: boolean;
  /** The label that will be displayed above the panel. */
  label: string | ReactNode;
  /** Called when the open state of the panel changes. This function will be passed the new open state. */
  onOpenChange?: (isOpen: boolean) => void;
  /**
   * A `testId` prop is provided for specified elements, which is a unique
   * string that appears as a data attribute `data-testid` in the rendered code,
   * serving as a hook for automated tests */
  testId?: string;
};
