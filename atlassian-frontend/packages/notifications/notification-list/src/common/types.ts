export interface NotificationResponse {
  /**
   * Notifications guaranteed to be sorted by timestamp, with the most recent notification first, even across
   * multiple pages of results linked by a `continuationToken`.
   * There may be fewer notifications in here than requested, possibly even zero notifications. Receiving zero
   * notifications does *not* mean that there are no more notifications that haven't been returned yet;
   * only the absence of the `continuationToken` property means that the last notification has been
   * returned.
   *
   * Note that, wherever applicable, the response will be in the locale and timezone for the requesting user,
   * as it is known PRS. Internationalised text will be in the user's language, and timestamps sent
   * in the user's timezone offset.
   */
  notifications: Notification[];
  /**
   * A pagination marker that tells the service where to resume a query and return the next set of results.
   * Clients should not make assumptions about the format of this token.
   */
  continuationToken?: string;
}

export interface AnalyticsAttributes {
  cloudId?: string;
  registrationName: string;
  registrationOwner: string;
  registrationProduct: string;
}

export interface Notification {
  id: string;
  /**
   * Time of the notification as determined by its producer. Note that per the json-schema specification
   * for format `date-time`, we use the RFC3330 date-time format: https://tools.ietf.org/html/rfc3339
   */
  timestamp: string;
  content: DefaultNotificationContent;
  /** The read state for the notification */
  readState: ReadState | 'read' | 'unread';
  /**
   * The category of the notification, if the notification is categorized. If it's not categorized, this optional
   * field is not sent. Currently, only one category exists: "direct", which has the general meaning that the
   * notification was very specifically targeting the receiving user.
   */
  category?: 'direct';
  /**
   * An optional object describing how this notification should be grouped.
   *
   * If this object is present, notifications with the same `id` field should be grouped. There are some caveats however:
   *   * Notifications should not be grouped across multiple days.
   *   * Groups should not exceed certain size limits. If this happens, a new group should be created.
   *
   * If you're implementing a client which utilises grouping, come and talk to us.
   */
  grouping?: {
    /** A string identifying this group of notifications */
    id: string;
  };
  /**
   * Attributes that frontend can use in its analytic events
   */
  analyticsAttributes: AnalyticsAttributes;
  /**
   * The number of items in the `content.body.items` array.
   */
  bodyItemCount: number;
}

export interface ContentBodyItem<D = AdfDocument | TextDocument> {
  author?: {
    ari: string;
    displayName?: string;
    avatarUrl?: string;
  };

  type: 'RICH_TEXT_CONTENT';

  appearance: 'PRIMARY' | 'QUOTED';
  /**
   * Content this notification refers to in ADF or text formats. For example the actual comment, mention or page update.
   *
   * The last element in this array is the **current** document which should be displayed prominently.
   * The entries before it are historical entries leading up to the current one, and should be
   * displayed in a less prominent manner.
   *
   * For comment notifications, the actual comment is the last element, and the previous comment comes before it in the array.
   *
   * This field is not returned by default, see the `expand` query parameter.
   */
  document: D;
}

interface ContentBody {
  items: ContentBodyItem[];
}

export interface DefaultNotificationContent {
  /**
   * The type identifying the schema for this notification, currently only one type exists `DEFAULT`
   * but others could be introduced in the future.
   *
   * Clients should not fail if they recieve an unknown type.
   */
  type: 'DEFAULT';
  /**
   * The actor, or multiple actors, that performed the action that causes this notification.
   *
   * This field may be used to show user avatar icons for the actor(s), and to show a profile of the user, potentially in a popup.
   *
   * Most notifications will have a single actor. If there are multiple actors, assume this each item is unique (this list is a set).
   * The last actor is the most recent or significant.
   */
  actors: {
    /** The name of the actor */
    displayName?: string;
    ari?: string;
    /** The URL to a small picture representing the actor */
    avatarUrl: string;
  }[];
  /**
   * The main message of the notification, describing what happened and who did it. The contents is plain text
   * without any formatting.
   */
  message: string;
  /**
   * Breadcrumbs path of the entity on which the notification occurred. The path is hierarchical, with the
   * first element describing the highest-level entity. The meaning is up to the producer of the notification.
   * Example: "Jira -> My Project -> MP-123"
   */
  path: Entity[];
  /**
   * The Entity is what the notification relates to â€“ in most cases itâ€™s the object (page, issue, pull request) that has changed.
   * Clicking the title takes the user to the entity.
   */
  entity?: Entity;

  body?: ContentBody;
  /** A list of actions that the user can perform that is related to the current notification. */
  actions?: {
    /** The title of the action */
    title: string;
    /**
     * URL refers to the an entity or action on an entity. URL is required. In the future we may support alternative
     * ways of describing the entity, such as using the ARI.
     */
    link?: {
      url: string;
    };
    /**
     * The appearance for the button, as used in the Atlaskit Button component. When not using Atlaskit
     * to render the action button, use the appearance as a hint for the look of the action.
     * See: https://atlaskit.atlassian.com/packages/core/button
     */
    appearance: ActionAppearance;
  }[];
}

export interface AdfDocument {
  format: 'ADF';
  data: string;
}

export interface TextDocument {
  format: 'TEXT';
  data: string;
}

export type ActionAppearance =
  | 'DEFAULT'
  | 'PRIMARY'
  | 'LINK'
  | 'SUBTLE'
  | 'WARNING'
  | 'DANGER';

export interface Entity {
  /** The title of the entity */
  title: string;
  /** An optional status for the entity, for example 'draft', or 'closed'. */
  status?: {
    /** A text description of the status */
    value?: string;
    /**
     * A categorization of the status, as used in the Atlaskit Lozenge component. When not using Atlaskit
     * to render the status lozenge, use the appearance as a hint for the look of the status.
     * See: https://atlaskit.atlassian.com/packages/core/lozenge
     */
    appearance: EntityAppearance;
  };
  /**
   * URL refers to the an entity or action on an entity. URL is required. In the future we may support alternative
   * ways of describing the entity, such as using the ARI.
   */

  link?: {
    url: string;
  };
  /**
   * A small square image, representing an icon.
   *
   * Clients should use (and cache) the icon returned in the `url` field when possible. If the icon is a known
   * Atlaskit icon, the `atlaskit` field will also be specified. In this case if the client has an already available
   * bundled asset representing this icon, the local asset may be used instead.
   */
  icon?: Icon;
}

export type EntityAppearance =
  | 'DEFAULT'
  | 'SUCCESS'
  | 'REMOVED'
  | 'IN_PROGRESS'
  | 'NEW'
  | 'MOVED';

export interface Icon {
  url: string;
  /**
   * Atlaskit identifier for this icon, if any.
   *
   * If the client has a local asset for this atlaskit identifier,
   * it can be safely used instead of using the `url` property.
   */
  atlaskit?: AtlaskitIcon;
}

export type AtlaskitIcon =
  | 'BLOG'
  | 'BRANCH'
  | 'BUG'
  | 'CALENDAR'
  | 'CHANGES'
  | 'CODE'
  | 'COMMIT'
  | 'EPIC'
  | 'IMPROVEMENT'
  | 'INCIDENT'
  | 'ISSUE'
  | 'FEATURE'
  | 'PAGE'
  | 'PROBLEM'
  | 'REQUEST'
  | 'QUESTION'
  | 'STORY'
  | 'SUBTASK'
  | 'TASK';

export enum ReadState {
  READ = 'read',
  UNREAD = 'unread',
}

export enum LoadingState {
  INITIAL = 'initial',
  LOADING = 'loading',
  ERROR = 'error',
  COMPLETE = 'complete',
}

export interface RenderableNotification extends Notification {
  loadingState: LoadingState;
}

export interface NotificationTimeGroup {
  timeGroup: TimeGroup;
  notifications: RenderableNotification[];
}

export enum TimeGroup {
  TODAY = 'TODAY',
  YESTERDAY = 'YESTERDAY',
  OLDER = 'OLDER',
}

export enum RequestReadState {
  UNREAD = 'unread',
  ANY = 'any',
}

export enum RequestCategory {
  DIRECT = 'direct',
  ANY = 'any',
  NONE = 'none',
}

export type AnalyticsContext = {
  cloudId?: string;
  product?: string;
  readStateFilter: RequestReadState;
  requestCategory: RequestCategory;
};

export enum MarkRequestReadState {
  READ = 'READ',
  UNREAD = 'UNREAD',
}

export type ResponseError = {
  code: number;
  reason: string;
};
