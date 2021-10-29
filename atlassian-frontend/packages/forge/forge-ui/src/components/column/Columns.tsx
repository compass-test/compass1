import React from 'react';
import { gridSize } from '@atlaskit/theme/constants';
import { emotionInstance } from '../../context/emotion';
import { RenderFn } from '../../renderer/RendererNext';

interface ColumnsProps {
  className: string;
  children: React.ReactNode;
}

const DEFAULT_SPACING = gridSize() * 2;

export const useColumns = ({
  forgeDoc,
  render,
}: Parameters<RenderFn>[0]): {
  htmlDivProps: ColumnsProps;
} => {
  const { children } = forgeDoc;
  return {
    htmlDivProps: {
      className: emotionInstance.css`
      display: flex;
      & > * + * {
        margin-left: ${DEFAULT_SPACING}px;
      }
    `,
      children: children.map(render),
    },
  };
};

export const Columns = (props: Parameters<RenderFn>[0]) => {
  const { htmlDivProps } = useColumns(props);
  return <div {...htmlDivProps} />;
};
