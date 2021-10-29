import { code, md } from '@atlaskit/docs';

export default md`
  To run unit tests on your machine, run

  ${code`yarn test notification-list`}

  To run the integration tests, run

  ${code`
yarn test:webdriver notification-list
yarn test:webdriver:watch:chrome notification-list
yarn test:webdriver:browserstack notification-list
  `}

  For more details and most up-to-date information, refer to the AFP documentation [DAC](https://developer.atlassian.com/cloud/framework/atlassian-frontend/development/04-testing/). For VR testing make sure you enable LFS:

  ${code`
yarn test:vr notification-list -u
  `}
`;
