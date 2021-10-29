import meow from 'meow';
import chalk from 'chalk';

import { CliFlags } from './types';
import { Logger } from './lib/Logger';
import { printTeams, FORMATS } from './lib/teams';
import find from './index';

const cli = meow(
  chalk`
  {bold USAGE}
    $ bolt w @atlassian/ownership-cli find [{bold -p} {underline packages} | {bold -t} {underline team}] [{bold --include} {underline expression}] [{bold --exclude} {underline expression}] [{bold -f} {underline json | text | adf}] [{bold -o} {underline path}] [{bold -v}]


  {bold OPTIONS}
    --packages, -p
        Comma separated list of one or more package names

    --team, -t
        Name of a team (as can be found in teams.json)
        bolt doesn't interpret args with spaces correctly so please use either:
          {underline '"Team Name"'} or {underline "Team-Name"}
        Use "no-team" for unowned packages

    --include
        Include packages either by a package name substring, or glob file path

    --exclude
        Same as --include but excludes, takes precendence

    --format, -f
        Output format
        {underline json}, {underline text} (formats as table, markdown if --output is set), or {underline adf}

    --output, -o
        Path to file (relative to root of repo)

    --verbose, -v
        Log what's happening

    --help
        Display CLI usage information


  {bold EXAMPLES}
    $ bolt w @af/package-ownership-cli find --packages '@atlaskit/button,@af/package-ownership'
    $ bolt w @af/package-ownership-cli find --team '"Design System Team"' --include '**/design-system/field*'
    $ bolt w @af/package-ownership-cli find -t "Atlassian-Frontend-Platform" --format json --output afp-packages.json
  `,
  {
    description: 'A CLI for querying ownership of packages and files.',
    flags: {
      packages: {
        type: 'string',
        alias: 'p',
      },
      team: {
        type: 'string',
        alias: 't',
      },
      include: {
        type: 'string',
      },
      exclude: {
        type: 'string',
      },
      format: {
        type: 'string',
        alias: 'f',
      },
      output: {
        type: 'string',
        alias: 'o',
      },
      verbose: {
        type: 'boolean',
        alias: 'v',
      },
    },
  },
);

const defaultFlags = {
  format: 'text',
  verbose: false,
};

const flags = {
  ...defaultFlags,
  ...cli.flags,
} as CliFlags;

Logger.setVerbose(flags.verbose);

if (!FORMATS.ALLOWED(flags.format)) {
  Logger.exit(FORMATS.ERROR);
}

flags.team = flags.team && flags.team.replace(/[-_]/g, ' ');

find(flags).then(teams => {
  if (Object.keys(teams).length > 0) {
    printTeams(teams, flags);
  } else {
    Logger.addError('No teams found');
  }
  Logger.printErrors();
});
