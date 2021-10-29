import { useQuery } from '@apollo/react-hooks';
import ApolloClient from 'apollo-client';
import { ReactNode, useMemo, useState } from 'react';

import type { SelectProps } from '@atlaskit/select';

import type { LabelFragment } from './__generated__/LabelFragment';
import type {
  LabelPickerQuery as LabelPickerQueryData,
  LabelPickerQueryVariables,
} from './__generated__/LabelPickerQuery';
import { LabelPickerQuery } from './LabelPickerQuery';
import { useApolloClient } from './useApolloClient';

export function useNonCreatableLabelPicker<IsMulti extends boolean>({
  client,
  spaceKey,
}: LabelPickerProps<IsMulti>): Partial<CreatableProps<IsMulti>> {
  const [searchText, setSearchText] = useState<string>('');

  const apolloClient = useApolloClient(client);
  const { data, loading } = useQuery<
    LabelPickerQueryData,
    LabelPickerQueryVariables
  >(LabelPickerQuery, {
    client: apolloClient,
    context: { isConfluenceGQLRequest: true },
    variables: {
      searchText,
      spaceKey,
    },
  });

  const suggestedLabels = data?.labelSearch?.suggestedLabels;
  const otherLabels = data?.labelSearch?.otherLabels;
  const labels: Label[] = useMemo(
    () =>
      [...(suggestedLabels || []), ...(otherLabels || [])].filter(
        isLabelWithId,
      ),
    [suggestedLabels, otherLabels],
  );

  return {
    isLoading: loading,
    isValidNewOption,
    loadOptions: setSearchText,
    options: labels,
  };
}

export interface CreatableProps<IsMulti extends boolean>
  extends SelectProps<Label, IsMulti> {
  /**
   * Determines whether the "create new ..." option should be displayed based on
   * the current input value, select value and options array.
   */
  isValidNewOption?: (
    inputValue: string,
    value: ValueType<IsMulti>,
    options: ReadonlyArray<Label>,
  ) => boolean;
  /**
   * Returns the data for the new option when it is created. Used to display the
   * value, and is passed to `onChange`.
   */
  getNewOptionData?: (inputValue: string, optionLabel: ReactNode) => Label;
}

export type Label = Omit<LabelFragment, '__typename' | 'id'> & {
  id: NonNullable<LabelFragment['id']>;
};

export type LabelPickerProps<IsMulti extends boolean> = {
  client?: ApolloClient<unknown>;
  defaultValue?: ValueType<IsMulti>;
  isCreatable?: boolean;
  isMulti?: IsMulti;
  menuPortalTarget?: HTMLDivElement | null;
  onChange?: (value: ValueType<IsMulti>) => void;
  placeholder?: ReactNode;
  spaceKey?: string;
  value?: ValueType<IsMulti>;
};

export type ValueType<IsMulti extends boolean> = IsMulti extends true
  ? readonly Label[]
  : Label | null;

const isLabelWithId = (
  label: LabelFragment | null,
): label is LabelFragment & Label => label?.id != null;

const isValidNewOption = () => false;
