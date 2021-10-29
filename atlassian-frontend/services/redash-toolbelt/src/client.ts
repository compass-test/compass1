import fetch from 'node-fetch';
import { URL } from 'url';
import isEqual from 'lodash/isEqual';

export interface RedashClientInit {
  host: string;
  key: string;
}

type Dashboard = {
  name: string;
  widgets: Widget[];
};

type Widget = {
  id: string;
  visualization?: Visualisation;
};

type Visualisation = {
  id: string;
  query: Query;
};

type Query = {
  id: string;
};

export class RedashClient {
  private host: string;
  private key: string;

  static fromUrl(url: string, key: string) {
    return new RedashClient({
      host: new URL(url).origin,
      key,
    });
  }

  private constructor(init: RedashClientInit) {
    this.host = init.host;
    this.key = init.key;
  }

  async verify() {
    const response = await this.get('session');

    if (response instanceof Error) {
      return new Error(
        `Could not log in to ${this.host} with api key. Please verify api key for correctness.`,
      );
    }

    return true;
  }

  async dashboard(from: { fromUrl: string }): Promise<Dashboard | Error> {
    const parsed = new URL(from.fromUrl);
    const slug = /^\/dashboard\/(.+)$/.exec(parsed.pathname);

    if (!slug) {
      return new Error(`Could not derive dashboard slug from ${from.fromUrl}`);
    }

    return this.get(`dashboards/${slug[1]}`);
  }

  async createDashboard(init: { name: string }) {
    const dashboard = await this.post('dashboards', init);
    const url = new URL(this.host);
    url.pathname = `dashboard/${dashboard.slug}`;
    dashboard.href = url.href;
    return dashboard;
  }

  async createWidget(init: {
    dashboard: string;
    visualization: string;
    text: string;
    options: any;
    width: number;
  }) {
    // text widget
    if (!init.visualization) {
      // TODO: Figure out why this errors with 500
      // https://product-fabric.atlassian.net/browse/ED-12083
      // return this.post('widgets', {
      //   dashboard_id: init.dashboard,
      //   text: init.text,
      //   options: init.options,
      //   width: init.width,
      // });
    } else {
      // visualisation widget
      return this.post('widgets', {
        dashboard_id: init.dashboard,
        visualization_id: init.visualization,
        options: init.options,
        width: init.width,
      });
    }
  }

  async createQuery(init: {
    name: string;
    description: string;
    query: string;
    schedule: any;
    data_source_id: number;
    options: any;
  }) {
    return this.post('queries', {
      name: init.name,
      description: init.description,
      query: init.query,
      schedule: init.schedule,
      data_source_id: init.data_source_id,
      options: init.options,
    });
  }

  async cloneDashboard(from: {
    fromUrl: string;
    name?: string;
    deep?: boolean;
  }) {
    const dashboard = await this.dashboard(from);

    if (dashboard instanceof Error) {
      return dashboard;
    }

    const name = from?.name ?? `${dashboard.name}`;

    const created = await this.createDashboard({
      name,
    });

    if (created instanceof Error) {
      return created;
    }

    const toRecord = <T extends { id: string }>(
      acc: Record<string, T>,
      item: T,
    ) => ({
      ...acc,
      [item.id]: item,
    });

    const visualizations = Object.values(
      dashboard.widgets
        .map((widget) => widget?.visualization)
        .filter(Boolean)
        .reduce<Record<string, Visualisation>>(toRecord, {}),
    );

    const mapping = new Map(visualizations.map((vis) => [vis.id, vis.id]));

    const queries = Object.values(
      visualizations
        .map((vis) => vis.query)
        .filter(Boolean)
        .reduce<Record<string, Query>>(toRecord, {}),
    );

    if (from.deep) {
      await Promise.all(
        queries.map(async (query) => {
          const clone = await this.cloneQuery({ from: query });

          if (clone instanceof Error) {
            return clone;
          }

          clone.visualizations.forEach((clonedVis) => {
            const vis = visualizations.find(
              (v: any) =>
                v.name === clonedVis.name &&
                isEqual(clonedVis.options, v.options),
            );

            if (vis) {
              mapping.set(vis.id, clonedVis.id);
            }
          });
        }),
      );
    }

    const results = await Promise.all(
      dashboard.widgets.map(async (widget) => {
        const id =
          mapping.get(widget?.visualization?.id) ?? widget?.visualization?.id;
        const visualization = id ? { id } : {};
        const from = { ...widget, visualization };
        return this.cloneWidget({ from, to: created });
      }),
    );

    const errors = results.filter(
      (result): result is Error => result instanceof Error,
    );

    if (errors.length) {
      return new Error(errors.map((error) => error.message).join('\n'));
    }

    return created;
  }

  async cloneWidget({ from, to }: { from: any; to: any }) {
    return this.createWidget({
      dashboard: to.id,
      visualization: from.visualization?.id,
      text: from.text,
      options: from.options,
      width: from.width,
    });
  }

  async cloneQuery({ from }: { from: any }) {
    return this.post(`queries/${from.id}/fork`, {});
  }

  private headers() {
    return {
      Authorization: `Key ${this.key}`,
      ContentType: 'application/json',
    };
  }

  private async get(pathname: string) {
    const url = new URL(this.host);
    url.pathname = `api/${pathname}`;

    const response = await fetch(url.href, { headers: this.headers() });

    if (!response.ok) {
      return new Error(
        `Failed to get ${url.href}: ${response.status} ${response.statusText}`,
      );
    }

    return response.json();
  }

  private async post(pathname: string, body: any) {
    const url = new URL(this.host);
    url.pathname = `api/${pathname}`;

    const response = await fetch(url.href, {
      method: 'POST',
      headers: this.headers(),
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      try {
        const data = await response.json();
        return new Error(
          `Failed to post ${url.href}: ${response.status} ${response.statusText}:\n${data.message}`,
        );
      } catch (err) {
        return new Error(
          `Failed to post ${url.href}: ${response.status} ${response.statusText}`,
        );
      }
    }

    return response.json();
  }
}
