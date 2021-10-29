import { CompassComponentType } from '@atlassian/dragonfruit-graphql';

// Hardcoded before backend is connected.
// Comment out the list content to see the dropdown in empty state
export const useGetStarredComponents = () => {
  const components = [
    {
      icon: '',
      componentName: 'vzhu-test-1',
      componentType: CompassComponentType.SERVICE,
    },
    {
      icon: '',
      componentName: 'vzhu-test-2',
      componentType: CompassComponentType.APPLICATION,
    },
    {
      icon: '',
      componentName: 'vzhu-test-3',
      componentType: CompassComponentType.LIBRARY,
    },
  ];

  return {
    loading: false,
    data: components,
  };
};
