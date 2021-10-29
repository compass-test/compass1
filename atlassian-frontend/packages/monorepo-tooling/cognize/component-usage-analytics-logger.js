/* Script to send component analytics data to Redash through Analytics pipeline. */
// eslint-disable-next-line import/no-extraneous-dependencies
const { analyticsClient } = require('@atlassiansox/analytics-node-client');

function sendAnalytics(config) {
  const analyticsEnv = config.prod ? 'prod' : 'dev';
  const client = analyticsClient({
    env: analyticsEnv,
    product: 'atlaskit',
  });

  return async (event) => {
    const [data] = Array.from(event.values());

    // Do any other manipulations of the data before sending to analytics service

    const {
      ImportDeclarations,
      JSXElements,
      DependencyVersions,
      File,
      Project,
      BaseProjectName,
    } = data;

    // TODO caused lint failures on master
    // eslint-disable-next-line no-sequences
    if ((ImportDeclarations, DependencyVersions)) {
      const finalData = Object.keys(ImportDeclarations).reduce(
        (acc, packageName, idx) => {
          const instancesCount = JSXElements
            ? JSXElements.reduce((count, { reference }) => {
                const isSamepackage = ImportDeclarations[packageName].includes(
                  reference,
                );
                if (!isSamepackage) return count;
                // eslint-disable-next-line no-param-reassign,no-return-assign
                return (count += 1);
              }, 0)
            : 0;
          return acc.concat({
            packageName,
            imports: ImportDeclarations[packageName],
            version: DependencyVersions[packageName]
              ? DependencyVersions[packageName]
              : '',
            instancesCount,
            instances: JSXElements ? JSXElements[idx] : '',
          });
        },
        [],
      );

      try {
        await client.sendTrackEvent({
          anonymousId: 'unknown',
          trackEvent: {
            tags: ['atlaskit'],
            source: 'component-usage-analytics-logger.js',
            action: 'analysed',
            actionSubject: 'component',
            attributes: {
              data: finalData,
              itemsCount: finalData.length,
              File,
              Project,
              AnalyticsVersion: '0.0.6',
              BaseProjectName,
            },
            origin: 'console',
            platform: 'bot',
          },
        });
        // eslint-disable-next-line no-console
        console.log('Logged analytics for: ', File);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    }
  };
}

module.exports = sendAnalytics({ prod: process.env.CI });
