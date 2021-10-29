import Contributor from '../../db/models/contributor';
import { RequestRangeError } from '../../server/errors';

export default async function corporate(req, res) {
  const { limit, offset, jsonView = false } = req.query;

  try {
    const { rows } = await Contributor.getAllCorporate({
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
      corporation_name: 8,
      github_name: 5,
      date_signed: 6,
    };

    const table = rows.map(user => {
      const fields = Object.entries(user);

      return {
        cells: fields.reduce((result, [key, value]) => {
          const colSpan = keyToColSpan[key];

          if (colSpan) {
            result.push({
              content: value,
              colSpan,
            });
          }

          return result;
        }, []),
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
