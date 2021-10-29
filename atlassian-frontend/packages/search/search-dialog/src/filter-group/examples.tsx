import React from 'react';
import { action } from '@storybook/addon-actions';
import { ColumnFilterGroup } from './filter-groups';
import {
  FilterColLabelText,
  FilterItem,
  FilterRowLabelText,
} from './filter-item';
import { FilterDropdownItem } from './filter-dropdown-item';
import Epic24Icon from '@atlaskit/icon-object/glyph/epic/24';
import Incident24Icon from '@atlaskit/icon-object/glyph/incident/24';
import Calendar24Icon from '@atlaskit/icon-object/glyph/calendar/24';
import NewFeature24Icon from '@atlaskit/icon-object/glyph/new-feature/24';
import PullRequest24Icon from '@atlaskit/icon-object/glyph/pull-request/24';

export const BasicColumnFilters = () => (
  <ColumnFilterGroup title="Filter by type" isLoading={false}>
    <FilterItem
      value="mountain"
      label="Mountain"
      icon={<Incident24Icon label="mountain" />}
      onChange={action('onChange')}
      LabelComponent={FilterColLabelText}
    />
    <FilterItem
      value="electric"
      label="Electric"
      icon={<Epic24Icon label="electric" />}
      onChange={action('onChange')}
      LabelComponent={FilterColLabelText}
    />
    <FilterItem
      value="navigation"
      label="Navigation"
      icon={<PullRequest24Icon label="navigation" />}
      onChange={action('onChange')}
      LabelComponent={FilterColLabelText}
    />
    <FilterItem
      value="robot"
      label="robot"
      icon={<Calendar24Icon label="robot" />}
      onChange={action('onChange')}
      LabelComponent={FilterColLabelText}
    />
    <FilterItem
      value="heal"
      label="heal"
      icon={<NewFeature24Icon label="heal" />}
      onChange={action('onChange')}
      LabelComponent={FilterColLabelText}
    />
  </ColumnFilterGroup>
);

const style = {
  width: '400px',
  border: '1px solid black',
};

export const BasicColumnDropdown = () => (
  <div style={style}>
    <ColumnFilterGroup title="Filter by type" isLoading={false}>
      <FilterDropdownItem
        values={[
          { label: 'hello', value: 'hello' },
          { label: 'jdog', value: 'jdog' },
        ]}
        onChange={action('onChange')}
      />
    </ColumnFilterGroup>
  </div>
);

export const LoadingColumnFilters = () => (
  <ColumnFilterGroup title="Filter by type" isLoading>
    <FilterItem
      value="mountain"
      label="Mountain"
      icon={<Incident24Icon label="mountain" />}
      onChange={action('onChange')}
      LabelComponent={FilterColLabelText}
    />
  </ColumnFilterGroup>
);

export const BasicRowFilters = () => (
  <ColumnFilterGroup title="Filter by type" isLoading={false}>
    <FilterItem
      value="mountain"
      label="Mountain"
      icon={<Incident24Icon label="mountain" />}
      onChange={action('onChange')}
      LabelComponent={FilterRowLabelText}
    />
    <FilterItem
      value="electric"
      label="Electric"
      icon={<Epic24Icon label="electric" />}
      onChange={action('onChange')}
      LabelComponent={FilterRowLabelText}
    />
    <FilterItem
      value="navigation"
      label="Navigation"
      icon={<PullRequest24Icon label="navigation" />}
      onChange={action('onChange')}
      LabelComponent={FilterRowLabelText}
    />
    <FilterItem
      value="robot"
      label="robot"
      icon={<Calendar24Icon label="robot" />}
      onChange={action('onChange')}
      LabelComponent={FilterRowLabelText}
    />
    <FilterItem
      value="heal"
      label="heal"
      icon={<NewFeature24Icon label="heal" />}
      onChange={action('onChange')}
      LabelComponent={FilterRowLabelText}
    />
  </ColumnFilterGroup>
);

export const BasicRowDropdown = () => (
  <div style={style}>
    <ColumnFilterGroup title="Filter by type" isLoading={false}>
      <FilterDropdownItem
        values={[
          { label: 'hello', value: 'hello' },
          { label: 'jdog', value: 'jdog' },
        ]}
        onChange={action('onChange')}
      />
    </ColumnFilterGroup>
  </div>
);

export const LoadingRowFilters = () => (
  <ColumnFilterGroup title="Filter by type" isLoading>
    <FilterItem
      value="mountain"
      label="Mountain"
      icon={<Incident24Icon label="mountain" />}
      onChange={action('onChange')}
      LabelComponent={FilterRowLabelText}
    />
  </ColumnFilterGroup>
);

export default { title: 'Search Dialog/Filter Groups' };
