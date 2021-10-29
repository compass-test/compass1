const reactBeautifulDnD = {
  id: 'react-beautiful-dnd',
  caption: 'react-beautiful-dnd',
  href: 'https://github.com/atlassian/react-beautiful-dnd',
  status: 'recommended',
  checks: () => [
    {
      type: 'libraries',
      configuration: 'react-beautiful-dnd',
    },
  ],
};

const reactDnD = {
  id: 'react-dnd',
  caption: 'React DnD',
  href: 'https://react-dnd.github.io/react-dnd/about',
  status: 'discouraged',
  checks: () => [
    {
      type: 'libraries',
      configuration: /^react-dnd(-.+)?$/,
    },
  ],
};

const reactSortableHoc = {
  id: 'react-sortable-hoc',
  caption: 'React Sortable HOC',
  href: 'https://github.com/clauderic/react-sortable-hoc',
  status: 'discouraged',
  checks: () => [
    {
      type: 'libraries',
      configuration: 'react-sortable-hoc',
    },
  ],
};

module.exports = {
  id: 'drag-n-drop',
  caption: {
    'as-a': 'developer',
    'i-want-to': "create drag'n'drop interactions",
  },
  tags: ['interaction'],
  solutions: [reactBeautifulDnD, reactDnD, reactSortableHoc],
};
