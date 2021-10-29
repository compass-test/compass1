import React from 'react';

import LogoAmazonWebServices from './assets/logo_amazonWebServices.png';
import LogoAnsibleTower from './assets/logo_ansibleTower.png';
import LogoBrowserStack from './assets/logo_browserStack.png';
import LogoBuddybuild from './assets/logo_buddybuild.png';
import LogoBugsnag from './assets/logo_bugsnag.png';
import LogoCloudRepo from './assets/logo_cloudRepo.png';
import LogoCodeClimate from './assets/logo_codeClimate.png';
import LogoGoogleCloudPlatform from './assets/logo_googleCloudPlatform.png';
import LogoJFrog from './assets/logo_jFrog.png';
import LogoLaunchDarkly from './assets/logo_launchDarkly.png';
import LogoMicrosoftAzure from './assets/logo_microsoftAzure.png';
import LogoNpm from './assets/logo_npm.png';
import LogoPuppet from './assets/logo_puppet.png';
import LogoRaygun from './assets/logo_raygun.png';
import LogoRollbar from './assets/logo_rollbar.png';
import LogoSauceLabs from './assets/logo_sauceLabs.png';
import LogoSentry from './assets/logo_sentry.png';
import LogoSnyk from './assets/logo_snyk.png';
import LogoSonatype from './assets/logo_sonatype.png';
import LogoSourceClear from './assets/logo_sourceClear.png';
import LogoTestFairy from './assets/logo_testFairy.png';
import { DescriptionRow, ImageCell, LinkRow, NameRow, Picture } from './styled';

const content = [
  {
    name: 'Ansible Tower',
    logo: LogoAnsibleTower,
    description:
      'Ansible, an open source community project sponsored by Red Hat, is the simplest way to automate IT.',
    link: {
      name: 'Ansible integration page',
      url: 'https://www.ansible.com/atlassian/bitbucket-pipelines',
    },
  },
  {
    name: 'Amazon Web Services',
    logo: LogoAmazonWebServices,
    description: `Amazon Web Services (AWS) is a secure cloud services platform, offering compute power,
  		database storage, content delivery and other functionality to help businesses scale and grow.`,
    link: {
      name: 'AWS labs repository',
      url: 'https://bitbucket.org/account/user/awslabs/projects/BP',
    },
  },
  {
    name: 'Microsoft Azure',
    logo: LogoMicrosoftAzure,
    description: `
  Microsoft Azure is a growing collection of integrated cloud services - analytics, computing,
  database, mobile, networking, storage and web - for moving faster, achieving more and saving
  money.`,
    link: {
      name: 'deploy to azure',
      url: 'https://bitbucket.org/mojall/bitbucket-pipelines-deploy-to-azure',
    },
  },
  {
    name: 'BrowserStack',
    logo: LogoBrowserStack,
    description: `
  BrowserStack is a cross-browser testing tool, used to extensively test public websites and
  protected servers, on real mobile and desktop browsers.`,
    link: {
      name: 'browserstack',
      url:
        'https://www.browserstack.com/automate/continuous-integration#Bitbucket',
    },
  },
  {
    name: 'buddybuild',
    logo: LogoBuddybuild,
    description: `buddybuild is an end-to-end continuous integration, continuous delivery and user feedback
  platform specifically optimized for mobile apps that takes minutes to set up.`,
    link: {
      name: 'buddybuild',
      url: 'http://docs.buddybuild.com/docs/bitbucket-pipelines',
    },
  },
  {
    name: 'Bugsnag',
    logo: LogoBugsnag,
    description: `
  Bugsnag provides software teams with an automated crash detection platform for their
  web and mobile applications.`,
    link: {
      name: 'bugsnag',
      url: 'https://docs.bugsnag.com/api/deploy-tracking/bitbucket-pipelines/',
    },
  },
  {
    name: 'CloudRepo',
    logo: LogoCloudRepo,
    description: `CloudRepo is a cloud native artifact repository manager offering both public and private repositories.`,
    link: {
      name: 'cloudrepo docs',
      url: 'https://www.cloudrepo.io/docs/bitbucket-pipelines.html',
    },
  },
  {
    name: 'Code Climate',
    logo: LogoCodeClimate,
    description: `Code Climate is an open, extensible platform for static analysis that helps enforce
  your code quality standards on every commit.`,
    link: {
      name: 'codeclimate',
      url: 'https://docs.codeclimate.com/v1.0/docs/bitbucket-pipelines',
    },
  },
  {
    name: 'Google Cloud Platform',
    logo: LogoGoogleCloudPlatform,
    description: `Google Cloud Platform's App Engine is a platform for building scalable web applications
  and mobile backends.`,
    link: {
      name: 'gcp repository',
      url:
        'https://github.com/GoogleCloudPlatform/continuous-deployment-bitbucket',
    },
  },
  {
    name: 'JFrog',
    logo: LogoJFrog,
    description:
      'JFrog provides solutions to automate software management and distribution.',
    link: {
      name: 'JFrog bitbucket user',
      url: 'https://bitbucket.org/JfrogDev/',
    },
  },
  {
    name: 'LaunchDarkly',
    logo: LogoLaunchDarkly,
    description:
      'LaunchDarkly is a continuous delivery and feature flag management platform built for teams.',
    link: {
      name: 'launchdarkly docs',
      url: 'http://docs.launchdarkly.com/v2.0/docs/bitbucket-pipelines',
    },
  },
  {
    name: 'npm',
    logo: LogoNpm,
    description:
      "npm is the package manager for JavaScript and the world's largest software registry.",
    link: {
      name: 'npmjs blog',
      url: 'https://docs.npmjs.com/enterprise/pipelines',
    },
  },

  {
    name: 'Puppet',
    logo: LogoPuppet,
    description: `Puppet gives you the capabilities needed to automatically deliver, update, monitor, and secure
  your distributed applications and global infrastructure.`,
    link: {
      name: 'Puppet on bitbucket.org',
      url:
        'https://bitbucket.org/geoff_williams/bitbucket_pipelines_and_puppet_doc/src/master/bitbucket-pipelines.md?_ga=1.25913725.1925126293.1430794524',
    },
  },

  {
    name: 'Raygun',
    logo: LogoRaygun,
    description: `Raygun provides error and crash reporting software and real user monitoring tools, giving developer
  teams actionable insights into problems affecting their applications.`,
    link: {
      name: 'raygun on pipelines',
      url: 'https://bitbucket.org/try-raygun/raygun-pipelines',
    },
  },

  {
    name: 'Rollbar',
    logo: LogoRollbar,
    description: `Rollbar is a real-time error monitoring system that notifies developers of critical production issues
  and provides the details needed to reproduce and fix them as quickly as possible.`,
    link: {
      name: 'Rollbar docs',
      url: 'https://rollbar.com/docs/bitbucket/',
    },
  },
  {
    name: 'Sauce Labs',
    logo: LogoSauceLabs,
    description:
      'Sauce Labs provides a cloud based platform for the automated testing of web and mobile applications.',
    link: {
      name: 'saucelabs wiki',
      url: 'https://wiki.saucelabs.com/pages/viewpage.action?pageId=64718920',
    },
  },
  {
    name: 'Sentry',
    logo: LogoSentry,
    description: `Sentry is modern error logging. Don't just get notified - get the stack trace, request params,
  user context and breadcrumbs leading up to the error.`,
    link: {
      name: 'sentry',
      url: 'http://getsentry.com/integrations/bitbucket/',
    },
  },
  {
    name: 'Sonatype',
    logo: LogoSonatype,
    description: `With more than 100,000 installations, companies around the globe use Sonatype's Nexus solutions
  to manage reusable components and improve the security, quality and speed of their software supply chains.`,
    link: {
      name: 'sonatype example',
      url: 'https://bitbucket.org/simpligility/ossrh-pipeline-demo',
    },
  },
  {
    name: 'SourceClear',
    logo: LogoSourceClear,
    description: `SourceClear provides automatic vulnerability detection for your open source dependencies that
  fits perfectly into your workflow.`,
    link: {
      name: 'sourceclear',
      url: 'https://www.sourceclear.com/docs/bitbucket-pipelines',
    },
  },
  {
    name: 'Snyk',
    logo: LogoSnyk,
    description:
      'Snyk helps developers mitigate the risk of known vulnerabilities without losing productivity.',
    link: {
      name: 'snyk docs',
      url: 'https://snyk.io/docs/bitbucket/',
    },
  },
  {
    name: 'TestFairy',
    logo: LogoTestFairy,
    description: `TestFairy is a mobile apps beta testing platform that provides developers with videos showing
  their actual tests.`,
    link: {
      name: 'testfairy docs',
      url: 'http://docs.testfairy.com/Integrations/Bitbucket_Pipelines.html',
    },
  },
];

type Props = {};

const IntegrationsList: React.FC<Props> = ({}) => {
  return (
    <table data-testid="pipelines-admin-integrations">
      <tbody>
        {content.map((partner) => (
          <tr key={partner.name}>
            <ImageCell>
              <a href={partner.link.url}>
                <Picture src={partner.logo} />
              </a>
            </ImageCell>
            <NameRow>
              <strong>{partner.name}</strong>
            </NameRow>
            <DescriptionRow>{partner.description}</DescriptionRow>
            <LinkRow>
              {partner.link && (
                <a href={partner.link.url} target="_blank">
                  See example
                </a>
              )}
            </LinkRow>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default React.memo(IntegrationsList);
