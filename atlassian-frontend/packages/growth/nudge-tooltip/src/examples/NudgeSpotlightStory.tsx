import React, { useState, useMemo, useCallback } from 'react';
import { NudgeSpotlight } from '..';
import Button from '@atlaskit/button/standard-button';
import { text, button, radios, select, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { FlexWrapper } from './HelperComponents';

const welcomeImage =
  'https://atlaskit.atlassian.com/acafac14896f10ee5d1fd96b5ccec6e7.png';

export const NudgeSpotlightStory = () => {
  const [hidden, setHidden] = useState(false);
  const hideNudge = useCallback(() => setHidden(true), [setHidden]);

  // KNOBS
  button('Show Nudge', () => setHidden(false));

  button('Hide Nudge', () => setHidden(true));

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

  const onRender = action('onRender');

  const onShow = action('onShow');

  const onHide = action('onHide');

  const onClick = action('onClick');

  const onOutsideClick = action('onOutsideClick');

  const actions = useMemo(
    () => [{ text: 'Remind me later', onClick: hideNudge }],
    [hideNudge],
  );

  const cardWidth = number('Card Width', 320);

  const imageSource = text('Image Source', welcomeImage) || welcomeImage;

  const img = useMemo(
    () => <img alt="" src={imageSource} width={cardWidth} />,
    [cardWidth, imageSource],
  );

  return (
    <FlexWrapper>
      <NudgeSpotlight
        autoShow={autoShow}
        hidden={hidden}
        setHidden={hideNudge}
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
      >
        <Button>Nudge Spotlight Target</Button>
      </NudgeSpotlight>
    </FlexWrapper>
  );
};
