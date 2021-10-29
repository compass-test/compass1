import React from 'react';
import Button from '@atlaskit/button';
import {
  FilterShowMoreWrapper,
  FilterShowMoreButtonWrapper,
} from './filter-show-more.styled';

export interface Props<T> {
  /**
   * Placeholder text for the select input.
   */
  placeholderText: string;
  /**
   * Text for the show more button.
   */
  buttonText: JSX.Element | string | null;
  /**
   * Callback that is called when the user types something in the select input.
   * This is typically only used when you need to load filter suggestions asynchronously.
   */
  loadOptions?: (query: string) => Promise<OptionType<T>[]>;
  /**
   * Default set of new filter options available to the customers.
   */
  defaultOptions: OptionType<T>[];
  /**
   * Callback for when the user has selected a new filter from the select dropdown
   */
  addFilter: (value: OptionType<T>) => void;
  /**
   * Flag to determine whether the 'Show More' button is disabled
   */
  isDisabled: boolean;
  /**
   * The component to render. Is either Smart User Picker or Async Select
   */
  filterComponent: React.ComponentType<FilterComponentProps<T>>;
}

export interface FilterComponentProps<T> {
  /**
   * Placeholder text for the select input.
   */
  placeholderText: string;
  /**
   * Callback that is called when the user types something in the select input.
   * This is typically only used when you need to load filter suggestions asynchronously.
   */
  loadOptions?: (query: string) => Promise<OptionType<T>[]>;
  /**
   * Default set of new filter options available to the customers.
   */
  defaultOptions: OptionType<T>[];
  /**
   * Callback for when the user has selected a new filter from the select dropdown
   */
  onConfirm: (value: OptionType<T>) => void;
  /**
   *Callback when the component has finished editing and goes back to read mode
   */
  onMenuClosed: () => void;
  /**
   *Resets the timeout
   */
  refocusEditLink: () => NodeJS.Timeout;
}

interface State {
  isEdit: boolean;
}

export interface OptionType<T> {
  label: JSX.Element | string;
  value: T;
}

// todo - refactor out T
export class FilterShowMore<T> extends React.Component<Props<T>, State> {
  state = {
    isEdit: false,
  };

  componentWillUnmount() {
    this.focusTimeout && clearTimeout(this.focusTimeout);
  }

  focusTimeout: ReturnType<typeof setTimeout> | undefined;

  readViewRef = React.createRef<HTMLButtonElement>();

  setIsEdit = (isEdit: boolean) => {
    this.setState({
      isEdit,
    });
  };

  refocusEditLink = () =>
    (this.focusTimeout = setTimeout(
      () => this.readViewRef.current?.focus(),
      0,
    ));

  onConfirm = (value: OptionType<T>) => {
    this.refocusEditLink();
    return this.props.addFilter(value);
  };

  renderEditView() {
    const FilterComponent = this.props.filterComponent;
    return (
      <FilterComponent
        defaultOptions={this.props.defaultOptions}
        loadOptions={this.props.loadOptions}
        placeholderText={this.props.placeholderText}
        onConfirm={this.onConfirm}
        onMenuClosed={() => {
          this.setIsEdit(false);
        }}
        refocusEditLink={this.refocusEditLink}
      />
    );
  }

  renderReadView = () => (
    <FilterShowMoreButtonWrapper>
      <Button
        ref={this.readViewRef}
        appearance="link"
        onClick={() => this.setIsEdit(true)}
        isDisabled={this.props.isDisabled}
      >
        {this.props.buttonText}
      </Button>
    </FilterShowMoreButtonWrapper>
  );

  render() {
    return (
      <FilterShowMoreWrapper>
        {this.state.isEdit ? this.renderEditView() : this.renderReadView()}
      </FilterShowMoreWrapper>
    );
  }
}
