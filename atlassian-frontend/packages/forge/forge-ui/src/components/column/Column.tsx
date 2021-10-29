import React from 'react';
import { emotionInstance } from '../../context/emotion';
import { RenderFn } from '../../renderer/RendererNext';

interface ColumnProps {
  className: string;
  children: React.ReactNode;
}

export const useColumn = ({
  forgeDoc,
  render,
}: Parameters<RenderFn>[0]): {
  htmlDivProps: ColumnProps;
} => {
  const { props: { width = 1 } = {}, children } = forgeDoc;

  return {
    htmlDivProps: {
      className: emotionInstance.css`
      flex-basis: 0;
      flex-grow: ${width};
    `,
      children: children.map(render),
    },
  };
};

export const Column = (props: Parameters<RenderFn>[0]) => {
  const { htmlDivProps } = useColumn(props);
  return <div {...htmlDivProps} />;
};
