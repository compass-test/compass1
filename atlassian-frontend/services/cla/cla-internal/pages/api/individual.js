import Contributor from '../../db/models/contributor';
import { RequestRangeError } from '../../server/errors';

export default async function individual(req, res) {
  const { limit, offset, jsonView = false } = req.query;

  try {
    const { rows } = await Contributor.getAllIndividual({
      limit,
      offset,
    });

    if (jsonView === 'true') {
      res.status(200).json(rows);
      return;
    }

    const keyToColSpan = {
      first_name: 5,
      last_name: 5,
      email: 9,
      address: 9,
      github_name: 5,
      date_signed: 6,
    };

    const table = rows.map(user => {
      const fields = Object.entries(user);

      return {
        cells: fields.map(([key, value]) => {
          return {
            content: value,
            colSpan: keyToColSpan[key],
          };
        }),
      };
    });

    res.status(200).json(table);
  } catch (e) {
    if (e instanceof RequestRangeError) {
      res.status(422).send(e.message);
      return;
    }

    throw e;
  }
}
