import { TagUsage } from '../../types';

const remapped: { [key: string]: string } = {
  helpLinks: 'help link',
  goals: 'goal',
  projects: 'project',
};

export const getUsageText = (usageTypes: TagUsage) => {
  const counts = Object.values(usageTypes ?? {});
  const total = counts.reduce((acc = 0, current = 0) => acc + current, 0);

  const entries = Object.entries(usageTypes)
    .map(([key, value]) => {
      const noun = remapped[key] ?? key;
      return value && value > 0
        ? `${value} ${value === 1 ? noun : `${noun}s`}`
        : '';
    })
    .filter(Boolean);

  let toolTipContent;
  switch (entries.length) {
    case 1:
      toolTipContent = entries[0];
      break;
    case 2:
      toolTipContent = entries.join(' and ');
      break;
    default:
      const last = entries.pop();
      toolTipContent = entries.concat(`and ${last}`).join(', ');
      break;
  }

  return {
    optionText: `used in ${total} ${total === 1 ? 'place' : 'places'}`,
    toolTipContent,
  };
};
