import type { TagSelectOptions } from '../../src/types';

export const tagList: TagSelectOptions = [
  {
    label: 'Radley Bodgers',
    value: 'radley-bodgers',
    usage: {
      projects: 5,
      goals: 2,
      helpLinks: 1,
      question: 0,
    },
  },
  {
    label: 'Flathan New',
    value: 'flathan-new',
    usage: {
      projects: 2,
      goals: 2,
      helpLinks: 0,
    },
  },
  {
    label: 'Ollen Eates',
    value: 'ollen-eates',
    usage: {
      projects: 0,
      goals: 4,
      helpLinks: 2,
    },
  },
  {
    label: 'Molex Argan',
    value: 'molex-argan',
    usage: {
      projects: 2,
      goals: 9,
      helpLinks: 1,
    },
  },
  {
    label: 'Fric Ery',
    value: 'fric-ery',
    usage: {
      projects: 1,
      goals: 0,
      helpLinks: 0,
      question: 1,
    },
  },
  {
    label: 'Lachel Rin',
    value: 'lachel-rin',
    usage: {
      projects: 4,
      goals: 2,
      helpLinks: 1,
      question: 5,
    },
  },
];

export const groupedTagList: TagSelectOptions = [
  {
    label: 'Recently viewed',
    options: tagList.slice(0, 2) as any,
  },
  {
    label: 'Everyone else',
    options: tagList.slice(2, tagList.length) as any,
  },
];
