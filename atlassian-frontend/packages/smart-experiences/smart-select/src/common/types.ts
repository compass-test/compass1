import { CreateUIAnalyticsEvent } from '@atlaskit/analytics-next';
import { OptionsType, OptionType, ValueType } from '@atlaskit/select';

export type SmartContext = {
  baseUrl?: string;
  /**
   * @description
   * id of the containing product object
   * hashed by default, see {SmartSelectProps['requiresHashing']}
   * The containerId may be used in refining the prediction model for a component.
   * For a new product implementation, talk to #smart-experience about model refinement.
   *
   * @example <caption>jira project id</caption>
   * 234567890
   *
   * @example <caption>confluence space id</caption>
   * 234567890
   *
   * @example <caption>bitbucket repository id</caption>
   * repo234567890
   */
  containerId: string;
  /**
   * @description
   * The specific field identifier. Namespacing may help if you implement multiple pickers.
   * The fieldId is used to track the usage of the pickers, and adapt the ranking over time.
   *
   * @example <caption>in confluence search user picker</caption>
   * 'search:user-search:user-picker'
   */
  fieldId: string;
  /**
   * @description
   * Hash key used in salting UGC - if the `hashKey` is not provided but `requiresHashing` is true then the `tenantId` is used.
   * The context of the hashKey is important as the same values with a different hash will not match, therefore choose
   * a hash key that represents the context of your user base.
   *
   * @example
   * spaceId
   */
  hashKey?: string;
  /**
   * @description
   * An identifier of the closest context object,
   * for example in bitbucket this may be a Pull Request Id, branch Id or commit Id
   *
   * @example <caption>in confluence label picker</caption>
   * 'somesection:label-picker'
   */
  objectId: string;
  /**
   * @description
   * Id of the user interacting with the component. (AtlassianAccountId) (sent as the `userId` in analytics)
   * Set this value to the string 'context' then the user in the current JWT subject is used
   * @example <caption>using context</caption>
   * 'context'
   *
   * @example <caption>in confluence using sessionData</caption>
   * const { userId } = useSessionData();
   * ...
   * principalId={userId}
   */
  principalId: string;
  /**
   * @description
   * The Product key. Currently FRS supports the following products.
   * Please contact #smart-experience for new product implementations.
   * 'teamcentral' will be deprecated in favour of 'townsquare' in the next major.
   */
  product: 'confluence' | 'jira' | 'bitbucket' | 'teamcentral' | 'townsquare';
  /**
   * @description
   * This identifies if the ids are unsafe for analytics and require hashing, if true then values are hashed using the hashKey if provided, or the tenantId.
   * If not provided then the default value is `true`.
   */
  requiresHashing?: boolean;
  /**
   * @description
   * This controls if the smart ranking feature should be enabled.
   * When enabled, any options passed in are re-ranked en-route using the context information provided
   */
  smartRank?: boolean; //whether to apply rerank or not
  /**
   * @description
   * The tenantId is generally the site cloudId.
   */
  tenantId: string;
};

export interface SmartSelectProps {
  smartContext: SmartContext;
}

export type Field<T> = {
  name: string;
  id: string;
  value: T;
};

export type RankedFieldsRequest<T> = {
  baseUrl?: string;
  containerId: string;
  fieldId: string;
  hashKey?: string;
  objectId?: string;
  principalId?: string;
  product: string;
  requiresHashing?: boolean;
  sessionId: string;
  tenantId: string;
  values: Field<T>[];
};

export type RankedFieldsRequestResolver<T> = (
  value: OptionType[] | PromiseLike<OptionType[]>,
) => void;

export type ServerResponse<T> = {
  fieldObjects: Field<T>[];
  fieldId: string;
};
type SmartUiEvent = {
  eventType: 'ui';
};

type SmartOperationalEvent = {
  eventType: 'operational';
};

export type AdditionalAttributes<Option> = {
  removedItem?: string;
  selectedOption?: string;
  selectedOrder?: number;
  selectedOptions?: ValueType<Option>;
};

export type SmartAnalyticsEvent<Option> = (
  | SmartUiEvent
  | SmartOperationalEvent
) & {
  action: string;
  actionSubject: string;
  additionalAttributes?: AdditionalAttributes<Option>;
  componentName: string;
  containerId: string;
  createAnalyticsEvent?: CreateUIAnalyticsEvent;
  fieldId: string;
  hashKey?: string;
  journeyId: string;
  query: string;
  isLoading: boolean;
  options: OptionsType<any>;
  packageName: string;
  packageVersion: string;
  principalId: string;
  product: string;
  requiresHashing?: boolean;
  selectedOptions: OptionsType<Option>;
  sessionId: string;
  sessionStartedAt: number;
  tenantId: string;
};

export type PartialSmartEvent<Option> = (
  | SmartUiEvent
  | SmartOperationalEvent
) & {
  action: string; // should move towards string union types later
  actionSubject: string; // should move towards string union types later
  additionalAttributes?: AdditionalAttributes<Option>;
};
