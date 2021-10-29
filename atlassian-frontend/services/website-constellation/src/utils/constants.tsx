/* These are the categories defined in Contentful */
export const CATEGORY_NAMES = {
  BRAND: 'brand',
  FOUNDATIONS: 'foundations',
  COMPONENTS: 'components',
  CONTENT: 'content',
  PATTERNS: 'patterns',
  RESOURCES: 'resources',
  LICENSE: 'license',
};

export const CATEGORY_SLUGS = {
  BRAND: 'brand',
  COMPONENTS: 'components',
  FOUNDATIONS: 'foundations',
  CONTENT: 'content',
  PATTERNS: 'patterns',
  RESOURCES: 'resources',
  LICENSE: 'license',
};

/* Used for both description text on the page as well as description meta tag */
export const getPageDescription = (categoryName: string = '') => {
  const pageDefaultDescriptions: { [category: string]: string } = {
    BRAND: `Our brand reflects who we are and how we want our users to feel when they use our products. It’s the unique combination of our mission and values, and principles that drive our promise to unleash the potential of every team.`,
    FOUNDATIONS:
      'Foundations are the visual elements needed to create engaging end-to-end user experiences. This includes guidance on iconography, typography, layout and structure.',
    COMPONENTS:
      'Components are the reusable building blocks of our design system. Each component meets a specific interaction or UI need, and has been specifically created to work together to create patterns and intuitive user experiences.',
    CONTENT:
      'Our content guidance covers our voice and tone, and the mechanics of our grammar and style. We use clear, concise and conversational language to craft the messages teams need to know, to get them to where they need to go.',
    PATTERNS:
      'Patterns are reusable combinations of components that solve common user problems. These best practice solutions help users achieve their goals and help ensure consistency across experiences.',
    RESOURCES:
      'A collection of tools, kits, plugins and guides to help simplify the creation process for our users.',
    LICENSE:
      'Atlassian Design System licensing details, including licence grant, restrictions and intellectual property information.',
  };
  const siteDefaultDescription = `Design, develop, deliver. Use Atlassian's end-to-end design language to create simple, intuitive and beautiful experiences.`;

  const categoryName_UC = categoryName.toUpperCase();
  if (categoryName_UC in pageDefaultDescriptions) {
    return pageDefaultDescriptions[categoryName_UC];
  }
  return siteDefaultDescription;
};

export const getPageTitle = (categoryName: string = '') => {
  const pageDefaultTitles: { [category: string]: string } = {
    BRAND: 'Brand',
    FOUNDATIONS: 'Foundations',
    COMPONENTS: 'Components',
    CONTENT: 'Content',
    PATTERNS: 'Patterns',
    RESOURCES: 'Resources',
    LICENSE: 'License',
  };

  const categoryName_UC = categoryName.toUpperCase();
  if (categoryName_UC in pageDefaultTitles) {
    return pageDefaultTitles[categoryName_UC];
  }

  return '';
};
