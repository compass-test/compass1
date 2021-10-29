import React from 'react';
import AsyncSelect from '@atlaskit/select/AsyncSelect';
import { ValueType } from '@atlaskit/select';
import { OptionType, FilterComponentProps } from '../filter-show-more';

function isOptionType<T>(o: ValueType<OptionType<T>>): o is OptionType<T> {
  return (o as OptionType<T>).value !== undefined;
}

export class AsyncSelectFilterComponent<T> extends React.Component<
  FilterComponentProps<T>
> {
  render() {
    return (
      <AsyncSelect
        defaultOptions={this.props.defaultOptions}
        loadOptions={this.props.loadOptions}
        autoFocus
        openMenuOnFocus
        placeholder={this.props.placeholderText}
        onChange={(
          value: ValueType<OptionType<T>>,
          { action }: { action: string },
        ) => {
          if (
            isOptionType(value) &&
            (action === 'select-option' || action === 'create-option')
          ) {
            this.props.onConfirm(value);
          }
        }}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            this.props.onMenuClosed();
            e.stopPropagation();
            this.props.refocusEditLink();
          }
        }}
        onBlur={() => {
          this.props.refocusEditLink();
        }}
        menuPosition="fixed"
        captureMenuScroll
        onMenuClose={() => this.props.onMenuClosed()}
      />
    );
  }
}

export default AsyncSelectFilterComponent;
