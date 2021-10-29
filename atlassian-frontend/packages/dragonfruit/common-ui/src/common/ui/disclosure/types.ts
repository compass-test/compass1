export interface DisclosureProps {
  id?: string;
  label?: string;
  testId?: string;
  expanded?: boolean;
  children?: React.ReactNode;
}

export interface DisclosureControllerProps {
  id?: string;
  label?: string;
  testId?: string;
  expanded?: boolean;
}

export type DisclosurePropsType = {
  id?: string;
  'data-testId'?: string;
};

export type TogglePropsType = {
  'aria-expanded': boolean;
  'aria-controls'?: string;
  'aria-label'?: string;
  'data-testid'?: string;
};

export type DisclosureControllerReturnType = [
  {
    disclosureProps: DisclosurePropsType;
    toggleProps: TogglePropsType;
    isExpanded: boolean;
  },
  {
    show: () => void;
    hide: () => void;
    toggle: () => void;
  },
];
