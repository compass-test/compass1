import fetch, { Headers, RequestInit, Response } from 'node-fetch';
import assert from 'assert';
import FormData from 'form-data';
import csvStringify from 'csv-stringify';
import { v4 as uuid } from 'uuid';
import { URL } from 'url';
import { Logger } from 'winston';
import omit from 'lodash/omit';

type SocratesClientOptions = {
  apiUrl: string;
  logger: Logger;
  token: string;
  zone: string;
};

export type SocratesColumn = {
  name: string;
  type: 'string' | 'bigint' | 'double' | 'boolean';
  pii: boolean;
};

type SocratesValue = string | number | boolean | null;

type SocratesRow = {
  [name: string]: SocratesValue;
};

type InsertResult = {
  job_id: string;
  status: string;
};

export default class SocratesClient {
  private apiUrl: string;
  private logger: Logger;
  private token: string;
  private zone: string;

  constructor(options: SocratesClientOptions) {
    this.apiUrl = options.apiUrl;
    this.logger = options.logger;
    this.token = options.token;
    this.zone = options.zone;
  }

  async insert(
    table: string,
    columns: SocratesColumn[],
    rows: SocratesRow[],
  ): Promise<InsertResult> {
    const filename = uuid() + '.csv';
    // request for a file upload slot
    const createRes = await this.fetch(
      `fileupload/create/${this.zone}/${table}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filename,
          columns,
        }),
        method: 'POST',
      },
    );

    const createResult = await createRes.json();
    assert(
      typeof createResult === 'object' &&
        createResult != null &&
        typeof createResult.file_uuid === 'string',
    );
    const fileUuid = createResult.file_uuid;

    const fd = new FormData();
    const csv = await toCSV(columns, rows);
    this.logger.debug('CSV: ' + csv);
    fd.append('file', csv);
    // upload actual file
    const res = await this.fetch(`fileupload/upload/${fileUuid}`, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: fd,
      method: 'PUT',
    });

    return res.json();
  }

  private async fetch(resource: string, init?: RequestInit) {
    const headers = new Headers({
      Authorization: `Bearer ${this.token}`,
      Accept: 'application/json',
    });

    if (init != null) {
      const initHeaders = init.headers;
      if (initHeaders != null) {
        if (Array.isArray(initHeaders)) {
          throw new Error('Array of headers is not supported');
        }

        for (const [k, v] of new Headers(initHeaders)) {
          headers.set(k, v);
        }
      }
    }

    const url = new URL(resource, this.apiUrl).toString();
    this.logger.debug(
      `Fetching ${init && init.method} ${url}: ${init && init.body}`,
    );
    this.logger.debug(
      'request headers: ' +
        JSON.stringify(omit(headers.raw(), 'Authorization'), null, 2),
    );

    const res = await fetch(url, {
      ...init,
      headers,
    });

    if (res.status >= 400) {
      throw new SocratesClientStatusError(res.status, await res.text(), res);
    }

    return res;
  }
}

class SocratesClientStatusError extends Error {
  name = 'SocratesClientError';
  status: number;
  response: Response;

  constructor(status: number, bodyText: string, response: Response) {
    super(
      `SocratesClient received a response with status ${status}: ${bodyText}`,
    );
    this.status = status;
    this.response = response;
  }
}

function toCSV(
  columns: SocratesColumn[],
  rows: SocratesRow[],
): Promise<string> {
  const csvRows: SocratesValue[][] = [];

  for (const row of rows) {
    const rowValues = [];
    for (const column of columns) {
      const value = row[column.name];

      let type: 'boolean' | 'string' | 'number';
      switch (column.type) {
        case 'boolean':
          type = 'boolean';
          break;
        case 'string':
          type = 'string';
          break;
        case 'double':
        case 'bigint':
          type = 'number';
          break;
        default:
          throw new TypeError(`Unknown type ${column.type}`);
      }

      if (typeof value !== type && value !== null) {
        throw new TypeError(
          `${column.name} value ${value} is not of type ${type}`,
        );
      }

      rowValues.push(value);
    }
    csvRows.push(rowValues);
  }

  return new Promise((resolve, reject) => {
    csvStringify(
      csvRows,
      { columns: columns.map((c) => c.name), header: true },
      (err, output) => {
        if (err != null) {
          reject(err);
          return;
        }
        resolve(output);
      },
    );
  });
}
