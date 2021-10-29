/** @jsx jsx */
import type { ReactNode } from 'react';
import { css, jsx } from '@emotion/core';
import {
  ForgeDoc,
  MarkupList,
  MarkupRecursiveList,
  RenderedTextProps,
  TextAlign,
} from '@atlassian/forge-ui-types';
import { Props } from '..';
import { InlineContext } from '../../context/inline';

// exported for testing
export function toParagraphs(text: string): string[] {
  return text.split(/\s*\n\s*\n[\n\s]*/).filter((str) => str.length > 0);
}
export function TextPlain({ content }: { content: string }) {
  return (
    <div>
      {toParagraphs(content).map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
    </div>
  );
}

const ALIGN_ALLOWLIST: TextAlign[] = ['start', 'center', 'end'];

const isTextAlign = (align?: string): align is TextAlign => {
  return ALIGN_ALLOWLIST.includes(align as TextAlign);
};

export function validateAlign(align?: string): TextAlign {
  if (isTextAlign(align)) {
    return align;
  } else {
    return 'start';
  }
}

export function TextMarkup({
  children,
  align,
}: {
  children: ReactNode | ReactNode[];
  align?: TextAlign;
}) {
  const sanitizedAlign = validateAlign(align);
  return (
    <InlineContext.Provider value={{ inline: true }}>
      <div
        css={css`
          text-align: ${sanitizedAlign};
        `}
      >
        {children}
      </div>
    </InlineContext.Provider>
  );
}

function filterMarkup(children: ForgeDoc[], nested: boolean): ForgeDoc[] {
  const isNestable = (child: ForgeDoc) =>
    MarkupRecursiveList.some((x) => child.type === x);
  const isInline = (child: ForgeDoc) =>
    MarkupList.some((x) => child.type === x);

  return children
    .map((child) => {
      if (nested) {
        if (!isNestable(child)) {
          return null;
        }
      } else {
        if (!isInline(child)) {
          return null;
        }
      }

      return {
        ...child,
        children: filterMarkup(child.children, true),
      };
    })
    .filter((x): x is ForgeDoc => x !== null);
}

export function TextMarkupFn({
  Components,
  children,
  align,
  dispatch,
  render,
  renderChildren,
}: Props & { align: TextAlign }) {
  // filter non Markup components
  children = filterMarkup(children, false);

  return (
    <TextMarkup align={align}>
      {renderChildren({ Components, children, render, dispatch })}
    </TextMarkup>
  );
}

export function TextFn({ props, children, ...renderProps }: Props) {
  const { content, format } = props as RenderedTextProps;

  if (typeof content === 'string') {
    return <TextPlain content={content} />;
  }

  if (format === 'markup') {
    const { align } = props as Extract<RenderedTextProps, { format: 'markup' }>;
    return TextMarkupFn({ children, align, ...renderProps });
  }

  // otherwise, do nothing
  return null;
}
