import {
  ADFEntity,
  getEmptyADF,
  table,
  tableRow,
  tableHeader,
  tableCell,
  heading,
  paragraph,
} from '@atlaskit/adf-utils';

import { TeamMap } from '../types';
import { filterUndefinedValues } from '../utils';

export default function (teams: TeamMap) {
  return Object.entries(teams).reduce(
    (doc: ADFEntity, [teamName, teamInfo]) => {
      const header = tableRow([
        tableHeader({ colspan: 2 })(
          heading({ level: 1 })({ type: 'text', text: teamName }),
        ),
      ]);

      const rows = filterUndefinedValues(Object.entries(teamInfo)).map(
        ([key, value]) => {
          return tableRow([
            tableCell()(paragraph(key)),
            tableCell()(
              paragraph(Array.isArray(value) ? value.join(', ') : value),
            ),
          ]);
        },
      );

      const teamTable = table(header, ...rows);

      if (!doc.content) {
        doc.content = [];
      }
      doc.content.push(teamTable);
      return doc;
    },
    getEmptyADF(),
  );
}
