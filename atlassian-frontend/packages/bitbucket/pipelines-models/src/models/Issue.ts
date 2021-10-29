import { flatten } from '../utils/flatten';
import { pick } from '../utils/pick';

import { User } from './User';

enum StatusCategoryToAppearenceMap {
  TODO = 'default',
  DONE = 'success',
  IN_PROGRESS = 'inprogress',
}

export class Issue {
  readonly key: string = '';
  readonly id: string = '';
  readonly self: string = '';
  readonly fields: any;
  // flattened props
  readonly 'fields.summary': string = '';
  readonly 'fields.assignee.account-id': string = '';
  readonly 'fields.assignee.display_name': string = '';
  readonly 'fields.assignee.avatar_url': string = '';
  readonly 'fields.status.name': string = '';
  readonly 'fields.status.status_category.name': string = '';
  readonly 'fields.priority.name': string = '';
  readonly 'fields.priority.icon_url': string = '';
  readonly 'fields.issue_type.name': string = '';
  readonly 'fields.issue_type.icon_url': string = '';
  readonly 'rendered_key.html': string = '';

  constructor(props: Partial<Issue> = {}) {
    Object.assign(this, {
      ...pick(flatten(props), Object.keys(this)),
    });
    Object.freeze(this);
  }

  get origin() {
    return new URL(this.self).origin;
  }

  get link() {
    return `${this.origin}/browse/${this.key}`;
  }

  get renderedLink() {
    return this['rendered_key.html'].includes('<a')
      ? this['rendered_key.html']
      : `<a href=${this.link} target="_blank">${this.key}</a>`;
  }

  get assignee() {
    return new User({
      display_name: this['fields.assignee.display_name'],
      links: {
        avatar: { href: this.assigneeUrl },
        ...(this.accountUrl ? { html: { href: this.accountUrl } } : {}),
      },
    });
  }

  get assigneeUrl() {
    return this['fields.assignee.avatar_url'];
  }

  get accountUrl() {
    return `${this.origin}/people/${this['fields.assignee.account-id']}`;
  }

  get typeIconUrl() {
    return this['fields.issue_type.icon_url'];
  }

  get priorityUrl() {
    return this['fields.priority.icon_url'];
  }

  get summary() {
    return this['fields.summary'];
  }

  get statusCategory() {
    return this['fields.status.status_category.name'];
  }

  get statusApperance() {
    return StatusCategoryToAppearenceMap[
      this.statusCategory.toUpperCase() as keyof typeof StatusCategoryToAppearenceMap
    ];
  }

  get statusName() {
    return this['fields.status.name'];
  }
}
