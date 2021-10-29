import { code, md } from '@atlaskit/docs';

export default md`
  To get \`notification-list\` up and running on your machine, run

  ${code`bolt start notification-list`}

  You may need to switch to the correct version of \`nvm\` and update all packages by running 
  
  ${code`nvm use && bolt install`}

  - [http://localhost:9000/examples/notifications/notification-list](http://localhost:9000/examples/notifications/notification-list) will show the examples.
  - [http://localhost:9000](http://localhost:9000) will show a local version of [atlaskit.atlassian.com](https://atlaskit.atlassian.com/).
`;
