import { EmojiDescription } from '@atlaskit/emoji';

import { HelpPointer, HelpPointerTag, HelpPointerType } from '../../src';
import {
  HelpPointerGreen,
  HelpPointerOrange,
  HelpPointerPink,
  HelpPointerPurple,
  HelpPointerYellow,
} from '../../src/common/utils/icon-color';

export const EXAMPLE_TAGS: HelpPointerTag[] = [
  { name: 'io', uuid: 'id-1' },
  { name: 'unlocked-tag', uuid: 'id-2' },
  { name: 'team-central', uuid: 'id-3' },
  { name: 'team-help', uuid: 'id-4' },
  { name: 'notifications', uuid: 'id-5' },
  { name: 'help-pointers-are-helpful', uuid: 'id-6' },
  { name: 'really-long-tag-town-long-seriously-long', uuid: 'id-7' },
  { name: 'melon-help', uuid: 'id-8' },
  { name: 'townsquare-watermelon', uuid: 'id-9' },
];

export const EXAMPLE_HELP_POINTERS: HelpPointer[] = [
  {
    link: 'https://team.atlassian.com/',
    name: 'Basic help card',

    type: HelpPointerType.Information,
    pointerId: 'help-pointer-id-0',
    cloudId: 'test-cloud-id',
    tags: EXAMPLE_TAGS.slice(0, 3),
  },
  {
    link: 'https://team.atlassian.com/',
    name: 'Watermelon',
    description: 'Clicking on this help pointer will take you to Watermelon',
    icon: {
      color: HelpPointerYellow,
      shortName: ':watermelon:',
    },
    type: HelpPointerType.Information,
    pointerId: 'help-pointer-id-1',
    cloudId: 'test-cloud-id',
    tags: EXAMPLE_TAGS.slice(2, 6),
  },
  {
    link: 'https://team.atlassian.com/',
    name: 'Melon',
    icon: {
      color: HelpPointerOrange,
      shortName: ':melon:',
    },
    type: HelpPointerType.Information,
    pointerId: 'help-pointer-id-2',
    cloudId: 'test-cloud-id',
    tags: EXAMPLE_TAGS.slice(4, 9),
  },
  {
    link: 'https://team.atlassian.com/',
    name: 'Townsquare',
    description: "Did you know that we're briefly called townsquare?",
    icon: {
      color: HelpPointerYellow,
      shortName: ':watermelon:',
    },
    owner: {
      displayName: 'Townsquare',
      id: 'test-id-0',
      avatarUrl:
        'https://ptc-directory-sited-static.us-east-1.staging.public.atl-paas.net/teams/avatars/4.svg',
    },
    type: HelpPointerType.Information,
    pointerId: 'help-pointer-id-3',
    cloudId: 'test-cloud-id',
    tags: EXAMPLE_TAGS.slice(2, 7),
  },
  {
    link: 'https://team.atlassian.com/',
    name: 'Team Central',
    description: 'Clicking on this help pointer will take you to Team Central',
    owner: { displayName: 'Team Central', id: 'test-id-1' },
    icon: {
      color: HelpPointerGreen,
      shortName: ':briefcase:',
    },
    type: HelpPointerType.Information,
    pointerId: 'help-pointer-id-4',
    cloudId: 'test-cloud-id',
    tags: EXAMPLE_TAGS.slice(0, 8),
  },
  {
    link: 'https://team.atlassian.com/',
    name: 'Max description length',
    description:
      'Lorem ipsum dolor sit amet, nonummy ligula volutpat hac integer nonummy. Suspendisse ultricies, congue etiam tellus, erat libero, nulla eleifend, mauris pellent',
    owner: {
      displayName: 'Lorem Ipsum',
      id: 'test-id-2',
      avatarUrl:
        'https://ptc-directory-sited-static.us-east-1.staging.public.atl-paas.net/teams/avatars/6.svg',
    },
    icon: {
      color: HelpPointerPurple,
      shortName: ':book:',
    },
    type: HelpPointerType.Information,
    pointerId: 'help-pointer-id-5',
    cloudId: 'test-cloud-id',
    tags: EXAMPLE_TAGS.slice(0, 8),
  },
  {
    link: 'https://team.atlassian.com/',
    name: 'A maxed out link title to demonstrate biggest size',
    description:
      'Lorem ipsum dolor sit amet, nonummy ligula volutpat hac integer nonummy. Suspendisse ultricies, congue etiam tellus, erat libero, nulla eleifend, mauris pellent',
    owner: {
      displayName:
        'A extremely exceedingly exceptionally extraordinarily excessively long owner',
      id: 'test-id-3',
      avatarUrl:
        'https://ptc-directory-sited-static.us-east-1.staging.public.atl-paas.net/teams/avatars/2.svg',
    },
    icon: {
      color: HelpPointerPink,
      shortName: ':book:',
    },
    type: HelpPointerType.Information,
    pointerId: 'help-pointer-id-6',
    cloudId: 'test-cloud-id',
    tags: EXAMPLE_TAGS,
  },
  {
    link: 'https://team.atlassian.com/',
    name: 'A maxed out link title to demonstrate biggest size',
    description:
      'Lorem ipsum dolor sit amet, nonummy ligula volutpat hac integer nonummy. Suspendisse ultricies, congue etiam tellus, erat libero, nulla eleifend, mauris pellent',
    owner: {
      displayName:
        'A extremely exceedingly exceptionally extraordinarily excessively long owner',
      id: 'test-id-3',
      avatarUrl:
        'https://ptc-directory-sited-static.us-east-1.staging.public.atl-paas.net/teams/avatars/2.svg',
    },
    icon: {
      color: HelpPointerPink,
      shortName: ':book:',
    },
    type: HelpPointerType.Information,
    pointerId: 'help-pointer-id-7',
    cloudId: 'test-cloud-id',
    tags: EXAMPLE_TAGS,
  },
  {
    link: 'google.com/',
    name: 'Google',
    description:
      'GOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOGLE',
    owner: {
      displayName:
        'A extremely exceedingly exceptionally extraordinarily excessively long owner',
      id: 'test-id-3',
      avatarUrl:
        'https://ptc-directory-sited-static.us-east-1.staging.public.atl-paas.net/teams/avatars/2.svg',
    },
    icon: {
      color: HelpPointerPink,
      shortName: ':book:',
    },
    type: HelpPointerType.Information,
    pointerId: 'help-pointer-id-8',
    cloudId: 'test-cloud-id',
    tags: EXAMPLE_TAGS,
  },
  {
    link:
      'https://team.atlassian.com/a/very/long/ridiculous/link/alwvhab;lrjbhl;wrNBOWFNBL;AEFNBLADJFNBLAENFBLANFLBJANFLJANDLFJBNADLFJBNADLJFNBLJAFNBLJADFNBLJSFNBLAJFNBLAJFNBLJSAFNBLJANFLBJNSFL;JNFDBALSJFNBLSJFNBLSFJNBLSNFBLJSBFNL;SANFLBJSFNBSLJ',
    name: 'OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO',
    description:
      'Lorem ipsum dolor sit amet, nonummy ligula volutpat hac integer nonummy. Suspendisse ultricies, congue etiam tellus, erat libero, nulla eleifend, mauris pellent',
    owner: {
      displayName:
        'A extremely exceedingly exceptionally extraordinarily excessively long owner',
      id: 'test-id-3',
      avatarUrl:
        'https://ptc-directory-sited-static.us-east-1.staging.public.atl-paas.net/teams/avatars/2.svg',
    },
    icon: {
      color: HelpPointerPink,
      shortName: ':book:',
    },
    type: HelpPointerType.Information,
    pointerId: 'help-pointer-id-9',
    cloudId: 'test-cloud-id',
    tags: EXAMPLE_TAGS,
  },
];

export const SAMPLE_EMOJI: EmojiDescription = {
  id: '1f4bc',
  name: 'briefcase',
  fallback: '📋',
  type: 'STANDARD',
  category: 'PEOPLE',
  order: 12395,
  searchable: true,
  shortName: ':briefcase:',
  representation: {
    sprite: {
      url:
        'https://pf-emoji-service--cdn.us-east-1.staging.public.atl-paas.net/standard/a51a7674-8d5d-4495-a2d2-a67c090f5c3b/32x32/spritesheets/people.png',
      row: 36,
      column: 37,
      height: 1224,
      width: 1258,
    },
    height: 32,
    width: 32,
    x: 1156,
    y: 1156,
    xIndex: 34,
    yIndex: 34,
  },
  altRepresentation: {
    height: 64,
    width: 64,
    imagePath:
      'https://pf-emoji-service--cdn.us-east-1.staging.public.atl-paas.net/standard/a51a7674-8d5d-4495-a2d2-a67c090f5c3b/64x64/1f4bc.png',
  },
};
