import chalk from 'chalk';
import { default as CliTable } from 'cli-table3';
import { default as markdownTable } from 'markdown-table';

import { TeamMap } from '../types';
import { filterUndefinedValues } from '../utils';

/**
 * Creates list of teams as table rows
 * [
 *  [
 *    ['Atlassian Frontend Platform'],
 *    ['contributors', '...'],
 *  ],
 *  [
 *    ['Design System Team'],
 *    ['contributors', '...'],
 *  ]
 * ]
 * @param bold              Function to turn text bold
 * @param highlight         Function to highlight text
 * @param highlightPackages Whether or not to apply highlight function to the listed packages
 */
const createTables = (
  teams: TeamMap,
  bold: (str: string) => string,
  highlight: (str: string) => string,
  highlightPackages?: boolean,
) => {
  // Turn each team into a table list
  return Object.entries(teams).map(([teamName, teamInfo]) => {
    const table: string[][] = [];

    // First row is the team name as a header
    table.push([bold(highlight(teamName))]);

    filterUndefinedValues(Object.entries(teamInfo)).map(([key, value]) => {
      let valueStr = Array.isArray(value) ? value.join(', ') : value;
      // Highlight packages in stdout if --packages flag was used
      if (key === 'packages' && highlightPackages) {
        valueStr = highlight(valueStr);
      }
      table.push([bold(key), valueStr]);
    });

    return table;
  });
};

const cliTables = (teams: TeamMap, highlightPackages: boolean) => {
  return createTables(teams, chalk.bold, chalk.green, highlightPackages)
    .map(allRows => {
      const [[header], ...rows] = allRows;
      const table = new CliTable({
        colWidths: [null, 50],
        wordWrap: true,
      });

      // @ts-ignore cli-table3 type definitions throw errors here even though the spec is being followed
      table.push([{ content: header, colSpan: 2 }]);
      // @ts-ignore
      table.push(...rows);

      return table.toString();
    })
    .join('\n');
};

const markdownTables = (teams: TeamMap) => {
  return createTables(
    teams,
    bold => `**${bold}**`,
    highlight => `_${highlight}_`,
  )
    .map(allRows => {
      return markdownTable(allRows);
    })
    .join('\n\n');
};

export default function (
  teams: TeamMap,
  {
    outputType = 'cli',
    highlightPackages = false,
  }: { outputType?: 'cli' | 'markdown'; highlightPackages?: boolean } = {},
) {
  if (outputType === 'cli') {
    return '\n' + cliTables(teams, highlightPackages) + '\n';
  } else if (outputType === 'markdown') {
    return markdownTables(teams) + '\n';
  }
  return '';
}
