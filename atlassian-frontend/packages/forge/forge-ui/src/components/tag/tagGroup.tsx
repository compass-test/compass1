import React from 'react';
import { TagGroupProps } from '@atlassian/forge-ui-types';
import { Props } from '..';
import { Rendered } from '@atlassian/forge-ui-types';

const AKTagGroup = React.lazy(() => import('@atlaskit/tag-group'));

const TagGroup: React.FunctionComponent<Rendered<TagGroupProps>> = ({
  children,
}) => {
  return <AKTagGroup>{children}</AKTagGroup>;
};

export default TagGroup;

export const TagGroupFn: React.FunctionComponent<Props> = ({
  children,
  dispatch,
  Components,
  render,
  renderChildren,
}) => {
  return (
    <TagGroup>
      {renderChildren({ children, dispatch, Components, render })}
    </TagGroup>
  );
};
