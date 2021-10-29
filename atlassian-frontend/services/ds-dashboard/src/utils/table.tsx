import React, { ReactNode } from 'react';

import type { HeadType, RowType } from '@atlaskit/dynamic-table/types';
import { Code } from '@atlaskit/code';
import Lozenge, {
  ThemeAppearance as LozengeAppearance,
} from '@atlaskit/lozenge';

import type {
  Styling as StylingValue,
  Theming as ThemingValue,
  Documentation as DocumentationValue,
} from '../types/package';
import Check from '../components/check';

export const col = {
  version: 'Version',
  liteMode: 'Lite mode',
  styling: 'Styling',
  theming: 'Theming',
  documentation: 'Documentation',
  release: 'Released',
  name: 'Name',
  packageName: 'Package name',
  deprecated: 'Deprecated',
} as const;

export type Col<Name extends string, Type> = {
  name: Name;
  value: Type;
  content?: ReactNode;
};

export type ColName<C> = C extends Col<any, any> ? C['name'] : never;
export type Head<T extends Col<any, any>[]> = {
  [Index in keyof T]: ColName<T[Index]>;
} & { length: T['length'] };

export type Version = Col<typeof col.version, string>;
export type LiteMode = Col<typeof col.liteMode, boolean>;
export type Styling = Col<typeof col.styling, StylingValue | null>;
export type Theming = Col<typeof col.theming, ThemingValue | null>;
export type Documentation = Col<
  typeof col.documentation,
  DocumentationValue | null
>;
export type Release = Col<typeof col.release, number | null>;
export type Name = Col<typeof col.name, string>;
export type PackageName = Col<typeof col.packageName, string>;

export type Deprecated = Col<typeof col.deprecated, boolean>;

export const transformHead = <Row extends Col<any, any>[]>(
  head: Head<Row>,
): HeadType => ({
  cells: head.map((cell) => ({
    key: cell,
    isSortable: true,
    content: cell,
  })),
});

export const transformRows = <Row extends Col<any, any>[]>(
  rows: Row[],
  transformer: (row: Row) => Row,
): RowType[] =>
  rows.map((row, i) => ({
    key: `row-${i}`,
    cells: transformer(row).map((cell, j) => ({
      key: `${cell.value}-${j}-${i}`,
      content: cell.content ?? cell.value,
    })),
  }));

export const showCode = (cell: Col<any, string>) => ({
  ...cell,
  content: <Code>{cell.value}</Code>,
});

export const showCheck = (cell: Col<any, boolean>) => ({
  ...cell,
  content: cell.value ? <Check /> : null,
});

export const showDate = (cell: Col<any, number>) => {
  const date = new Date(cell.value);
  return {
    ...cell,
    content: (
      <time dateTime={date.toUTCString()}>{date.toLocaleDateString()}</time>
    ),
  };
};

export const showDeprecation = (cell: Deprecated) => ({
  ...cell,
  content: cell.value ? (
    <Lozenge appearance="removed">Deprecated</Lozenge>
  ) : null,
});

export const showPackageName: (cell: PackageName) => PackageName = showCode;
export const showVersion: (cell: Version) => Version = showCode;
export const showLiteMode: (cell: LiteMode) => LiteMode = showCheck;

const stylingAppearances: Record<StylingValue, LozengeAppearance> = {
  '@compiled/react': 'new',
  '@emotion/core': 'success',
  '@emotion/styled': 'moved',
  'styled-components': 'default',
};
export const showStyling = (cell: Styling): Styling => ({
  ...cell,
  content: cell.value && (
    <Lozenge appearance={stylingAppearances[cell.value]}>{cell.value}</Lozenge>
  ),
});

const themingAppearances: Record<ThemingValue, LozengeAppearance> = {
  'new-theming-api': 'default',
  tokens: 'success',
};
export const showTheming = (cell: Theming): Theming => ({
  ...cell,
  content: cell.value && (
    <Lozenge appearance={themingAppearances[cell.value]}>{cell.value}</Lozenge>
  ),
});

const documentationAppearances: Record<
  DocumentationValue,
  LozengeAppearance
> = {
  atlaskit: 'default',
  constellation: 'success',
};
export const showDocumentation = (cell: Documentation): Documentation => ({
  ...cell,
  content: cell.value && (
    <Lozenge appearance={documentationAppearances[cell.value]}>
      {cell.value}
    </Lozenge>
  ),
});

export const showRelease = (cell: Release): Release => {
  if (cell.value === null) {
    return { ...cell, content: null };
  }
  return showDate(cell as Col<any, number>);
};
