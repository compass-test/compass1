import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { NudgeTooltipStory } from './NudgeTooltipStory';
import { NudgeSpotlightStory } from './NudgeSpotlightStory';
import { NudgeSpotlightRefactorStory } from './NudgeSpotlightRefactorStory';

const stories = storiesOf('Nudges', module);
stories.addDecorator(withKnobs);

stories.add('Refactored Nudge Spotlight', NudgeSpotlightRefactorStory);

stories.add('Nudge Spotlight', NudgeSpotlightStory);

stories.add('Nudge Tooltip', NudgeTooltipStory);
