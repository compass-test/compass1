import React, { useState, useContext } from 'react';
import { ForgeDoc } from '@atlassian/forge-ui-types';
import { RenderFn } from '../../renderer/RendererNext';
import { buttonShouldFitContainer } from './breakpoints';
import { WidthContext } from '../../context';
import Icon from '../icon';

export const AkButton = React.lazy(
  () => import('@atlaskit/button/custom-theme-button'),
);

type PropsOf<T extends (props: any) => React.ReactNode> = Parameters<T>[0];

export function useButton({
  forgeDoc,
  dispatch,
}: Parameters<RenderFn>[0]): {
  akButtonProps: PropsOf<typeof AkButton>;
} {
  const {
    props: {
      appearance = 'default',
      text,
      disabled,
      onClick,
      icon,
      iconPosition = 'before',
    } = {},
  } = forgeDoc;
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      await dispatch({
        type: 'event',
        handler: onClick,
        args: [],
        extensionData: {},
      });
    } finally {
      setLoading(false);
    }
  };

  let iconDom: React.ReactChild | undefined;
  if (icon) {
    iconDom = <Icon size="medium" glyph={icon} />;
  }

  const iconBefore = iconPosition === 'before' ? iconDom : undefined;
  const iconAfter = iconPosition === 'after' ? iconDom : undefined;
  const width = useContext(WidthContext);
  let shouldFitContainer = buttonShouldFitContainer(width);

  return {
    akButtonProps: {
      shouldFitContainer,
      iconBefore,
      iconAfter,
      isLoading: loading,
      isDisabled: disabled,
      appearance,
      onClick: handleClick,
      children: text,
    },
  };
}

export function Button(props: Parameters<RenderFn>[0]) {
  const { akButtonProps } = useButton(props);
  return <AkButton {...akButtonProps} />;
}

export function useActionButtons({
  forgeDoc,
  dispatch,
}: Omit<Parameters<RenderFn>[0], 'forgeDoc'> & { forgeDoc: ForgeDoc[] }): {
  akActionButtonProps: Array<PropsOf<typeof AkButton>>;
} {
  const [loading, setLoading] = useState(forgeDoc.map(() => false));
  const width = useContext(WidthContext);
  const shouldFitContainer = buttonShouldFitContainer(width);

  const actionButtons = forgeDoc.map((actionButtonForgeDoc, index) => {
    const {
      props: {
        appearance = 'subtle',
        text,
        disabled,
        onClick,
        icon,
        iconPosition = 'before',
      } = {},
    } = actionButtonForgeDoc;

    const handleClick = async () => {
      setLoading(
        loading.map((l, i) => {
          if (i === index) {
            return true;
          }
          return l;
        }),
      );
      try {
        await dispatch({
          type: 'event',
          handler: onClick,
          args: [],
          extensionData: {},
        });
      } finally {
        setLoading(
          loading.map((l, i) => {
            if (i === index) {
              return false;
            }
            return l;
          }),
        );
      }
    };

    let iconDom: React.ReactChild | undefined;
    if (icon) {
      iconDom = <Icon size="medium" glyph={icon} />;
    }

    const iconBefore = iconPosition === 'before' ? iconDom : undefined;
    const iconAfter = iconPosition === 'after' ? iconDom : undefined;

    return {
      shouldFitContainer,
      iconBefore,
      iconAfter,
      isLoading: loading[index],
      isDisabled: disabled,
      appearance,
      onClick: handleClick,
      children: text,
    };
  });

  return {
    akActionButtonProps: actionButtons,
  };
}
