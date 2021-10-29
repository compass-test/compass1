const experienceTracker = {
  id: 'experience-tracker',
  caption: 'Experience Tracker',
  href:
    'https://bitbucket.org/atlassian/atlassian-frontend/src/master/packages/confluence/experience-tracker/',
  status: 'recommended',
  firstParty: true,
};

module.exports = {
  id: 'experience-reliability',
  caption: {
    'as-a': 'developer',
    'i-want-to': 'track the reliability and duration of user journeys',
  },
  solutions: [experienceTracker],
};
