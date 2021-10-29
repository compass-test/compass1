import React, { useState, useMemo, useCallback } from 'react';
import { NudgeSpotlightV2, ExpandingBorderNudge } from '..';
import {
  text,
  button,
  radios,
  select,
  number,
  boolean,
  color,
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import {
  FlexWrapper,
  CustomSpotlightComponent,
  CustomTarget,
  ScrollWrapper,
  ScrollContent,
  ScrollHeader,
} from './HelperComponents';

const welcomeImage =
  'https://atlaskit.atlassian.com/acafac14896f10ee5d1fd96b5ccec6e7.png';

export const NudgeSpotlightRefactorStory = () => {
  const [hidden, setHidden] = useState(false);
  const hideNudge = useCallback(
    (event: Event) => {
      setHidden(true);
      action('setHidden')(event);
    },
    [setHidden],
  );
  const [updateFn, setUpdateFn] = useState<Function>();
  const [toggleCardFn, setToggleCardFn] = useState<Function>();

  // KNOBS
  button('Show Nudge', () => setHidden(false));

  button('Hide Nudge', () => setHidden(true));

  button('Show Card', () => toggleCardFn?.(true));

  button('Hide Card', () => toggleCardFn?.(false));

  button('Force Update Position', () => updateFn?.());

  button('Mess up Positioning', () => {
    const target = document.querySelector<HTMLButtonElement>('.target');
    target &&
      (target.style.padding = `${Math.floor(Math.random() * 3)}rem`) &&
      (target.style.boxSizing = `content-box`);
  });

  const offsetX = number('X Offset ', 2, {
    range: true,
    min: -40,
    max: 40,
    step: 1,
  });

  const offsetY = number('Y Offset ', 8, {
    range: true,
    min: -40,
    max: 40,
    step: 1,
  });

  const autoShow = radios('Auto Show', { Yes: '1', No: '0' }, '1') === '1';

  const hideNudgeOnClick =
    radios('Hide Nudge on Click', { Yes: '1', No: '0' }, '1') === '1';

  const hideSpotlightOnOutsideClick =
    radios('Hide Spotlight on Outside Click', { Yes: '1', No: '0' }, '1') ===
    '1';

  const heading = text('heading', 'Create a Thing');

  const content = text(
    'content',
    'Some very descriptive text here. Feel free to go bananas.',
  );

  const position = select(
    'Placement',
    [
      'top-start',
      'top',
      'top-end',
      'right-start',
      'right',
      'right-end',
      'bottom-start',
      'bottom',
      'bottom-end',
      'left-start',
      'left',
      'left-end',
    ],
    'bottom-end',
  );

  // AFP-2511 TODO: Fix automatic suppressions below
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onRender = useCallback(action('onRender'), []);

  // AFP-2511 TODO: Fix automatic suppressions below
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onShow = useCallback(action('onShow'), []);

  // AFP-2511 TODO: Fix automatic suppressions below
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onHide = useCallback(action('onHide'), []);

  // AFP-2511 TODO: Fix automatic suppressions below
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onClick = useCallback(action('onClick'), []);

  // AFP-2511 TODO: Fix automatic suppressions below
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onOutsideClick = useCallback(action('onOutsideClick'), []);

  const actions = useMemo(
    () => [{ text: 'Remind me later', onClick: () => toggleCardFn?.(false) }],
    [toggleCardFn],
  );

  const cardWidth = number('Card Width', 320);

  const imageSource = text('Image Source', welcomeImage) || welcomeImage;

  const img = useMemo(
    () => <img alt="" src={imageSource} width={cardWidth} />,
    [cardWidth, imageSource],
  );

  const component = boolean('Use Custom Component', false)
    ? CustomSpotlightComponent
    : undefined;

  const pulseColor = color('Pulse Color', 'rgba(192, 182, 242, 1)');

  const pulseShadowColor = color('Pulse Shadow Color', 'rgba(101, 84, 192, 1)');

  const pulseBorderRadius = number('Pulse Border Radius ', 3, {
    range: true,
    min: 0,
    max: 40,
    step: 1,
  });

  const concealSpotlightOnReferenceHidden = boolean(
    'Conceal spotlight on reference hidden?',
    false,
  );

  const nudge = (
    <NudgeSpotlightV2
      autoShow={autoShow}
      hidden={hidden}
      setHidden={hideNudge}
      spotlight={component}
      offset={[offsetX, offsetY]}
      nudge={ExpandingBorderNudge}
      heading={heading}
      position={position}
      zIndex={800}
      hideNudgeOnClick={hideNudgeOnClick}
      hideSpotlightOnOutsideClick={hideSpotlightOnOutsideClick}
      content={content}
      actions={actions}
      width={cardWidth}
      image={img}
      onRender={onRender}
      onShow={onShow}
      onHide={onHide}
      onClick={onClick}
      onOutsideClick={onOutsideClick}
      pulseColor={pulseColor}
      pulseShadowColor={pulseShadowColor}
      pulseBorderRadius={pulseBorderRadius}
      registerUpdateFn={setUpdateFn}
      registerToggleCardFn={setToggleCardFn}
      concealSpotlightOnReferenceHidden={concealSpotlightOnReferenceHidden}
    >
      <CustomTarget />
    </NudgeSpotlightV2>
  );

  if (boolean('Scrollable target container', false)) {
    return (
      <ScrollWrapper>
        <ScrollContent>
          <ScrollHeader>Scroll this container</ScrollHeader>
          {nudge}
        </ScrollContent>
      </ScrollWrapper>
    );
  }

  return <FlexWrapper>{nudge}</FlexWrapper>;
};
