const flagsProvider = {
  id: 'flags-provider',
  caption: 'Flags Provider',
  href:
    'https://bitbucket.org/atlassian/atlassian-frontend/src/master/packages/spa/flags-provider/',
  description: `
    In rich, composed frontend applications, showing flags is a concern shared between individual _experiences_, and the product/SPA _shell_; 
    while it is the experience's responsibility to 'trigger' a flag, it is the shell's responsibility to mount the flag, and orchestrate the flags of multiple experiences. 
    This model is embraced by the Flags Provider, which allows mounting a provider at the root of the application, and invoking this provider on experience level, e.g. through a Hook-based, imperative API.  
  `,
  status: 'recommended',
  firstParty: true,
};

module.exports = {
  id: 'flags',
  caption: {
    'as-a': 'developer',
    'i-want-to': 'show flags',
  },
  description: `
    [Flags](https://atlaskit.atlassian.com/packages/design-system/flag) are used for confirmations, alerts, and acknowledgments that require minimal user interaction.
  `,
  solutions: [flagsProvider],
};
