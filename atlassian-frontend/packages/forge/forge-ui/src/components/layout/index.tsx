import React, { ReactNode } from 'react';
import { Props } from '..';
import { Grid, GridColumn } from '@atlaskit/page';
import { LayoutProps } from '@atlassian/forge-ui-types';

type LayoutTemplate = LayoutProps['template'];
type ReactChildren = { children: ReactNode };
type Reacted<T> = Omit<T, 'children'> & ReactChildren;

function toGrid(children: ReactNode, n: number) {
  const array = React.Children.toArray(children);
  const rows = [];
  const medium = Math.floor(12 / n);

  while (array.length > 0) {
    rows.push(
      <Grid layout="fluid">
        {array.splice(0, n).map((child) => {
          return <GridColumn medium={medium}>{child}</GridColumn>;
        })}
      </Grid>,
    );
  }

  return rows;
}

export function Grid2({ children }: ReactChildren) {
  return (
    <Grid layout="fluid">
      <GridColumn>{toGrid(children, 2)}</GridColumn>
    </Grid>
  );
}

export function Grid3({ children }: ReactChildren) {
  return (
    <Grid layout="fluid">
      <GridColumn>{toGrid(children, 3)}</GridColumn>
    </Grid>
  );
}

export function SidebarLeft({ children }: ReactChildren) {
  const [left, right] = React.Children.toArray(children);
  return (
    <Grid layout="fluid">
      <GridColumn medium={3}>{left}</GridColumn>
      <GridColumn medium={9}>{right}</GridColumn>
    </Grid>
  );
}

export function SidebarRight({ children }: ReactChildren) {
  const [left, right] = React.Children.toArray(children);
  return (
    <Grid layout="fluid">
      <GridColumn medium={9}>{left}</GridColumn>
      <GridColumn medium={3}>{right}</GridColumn>
    </Grid>
  );
}

const Components: Record<LayoutTemplate, Function> = {
  'grid-2': Grid2,
  'grid-3': Grid3,
  'sidebar-left': SidebarLeft,
  'sidebar-right': SidebarRight,
};

export function Layout({ template, children }: Reacted<LayoutProps>) {
  const Component = Components[template];
  return <Component>{children}</Component>;
}

export function LayoutFn({
  Components,
  children,
  props: propsAny,
  render,
  renderChildren,
  dispatch,
}: Props) {
  const { template } = propsAny as Omit<LayoutProps, 'children'>;
  return (
    <Layout template={template}>
      {renderChildren({ Components, children, render, dispatch })}
    </Layout>
  );
}

export function Container({ children }: ReactChildren) {
  return <>{children}</>;
}
