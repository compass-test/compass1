import { Experience } from './Experience';
import { ExperienceEvent } from './ExperienceEvent';

export type ExperienceEventSubscriber = (event: ExperienceEvent) => void;
export type ExperienceEventListenerUnsubscribe = () => void;
export type CollectFn = (
  events: ExperienceEvent[],
  experience: Experience,
) => void;

export type StartOptions = {
  name: string;
  id: string;
  timeout?: number;
  startTime?: number;
  attributes?: object;
  onSuccess?: () => void;
  onFailure?: () => void;
  onAbort?: () => void;
  collect?: CollectFn;
};

export type SucceedOptions = {
  name: string;
  attributes?: object;
};

export type FailOptions = {
  name?: string;
  error: Error;
  attributes?: object;
};

export type AbortOptions = {
  name?: string;
  reason: string;
  attributes?: object;
  checkForTimeout?: boolean;
};

export type StopOnErrorOptions = {
  name: string;
  error: Error;
  attributes?: object;
};

export interface ExperienceTrackerAPI {
  start(options: StartOptions): void;
  succeed(options: SucceedOptions): void;
  fail(options: FailOptions): void;
  abort(options: AbortOptions): void;

  /**
   * Fails or aborts an experience with a specific `name` because of a specific
   * `error` based on product-specific logic. For example, if the specified
   * `error` describes a network error or a user error (these are internal
   * implementation details so do not rely that any particular classification of
   * errors is really implemented), `ExperienceStop` may abort the experience with
   * the specified `name` rather than fail it because the errors in question are
   * not product failures.
   */
  stopOnError(options: StopOnErrorOptions): void;

  subscribe(
    subscriber: ExperienceEventSubscriber,
  ): ExperienceEventListenerUnsubscribe;
}

export class ExperienceTracker implements ExperienceTrackerAPI {
  private experiences: {
    [name: string]: Experience;
  } = {};
  private subscribers: ExperienceEventSubscriber[] = [];
  private isNetworkOfflineError: (error: Error) => boolean;

  constructor(options?: { isNetworkOfflineError(error: Error): boolean }) {
    this.isNetworkOfflineError =
      (options && options.isNetworkOfflineError) || (() => false);
  }

  start({
    name,
    id,
    timeout,
    startTime,
    attributes,
    onSuccess,
    onFailure,
    onAbort,
    collect,
  }: StartOptions) {
    const current = this.experiences[name];
    if (current && !current.hasStopped && current.id === id) {
      return;
    }

    // Before replacing a current experience, abort it to ensure
    // it is cleaned up.
    if (current) {
      current.abort({
        reason: 'Aborted because the same experience was started with a new id',
      });
    }

    const experience = new Experience({
      name,
      id,
      timeout,
      startTime,
      attributes,
      onSuccess,
      onFailure,
      onAbort,
      onStart: (startEvent) => {
        this.emit(startEvent);

        let disposeCollectSubscription = () => {};
        if (collect) {
          const events: ExperienceEvent[] = [];
          disposeCollectSubscription = this.subscribe((event) => {
            // Ignore already running experiences that started before this
            // experience started
            if (
              event.action === 'taskStart' ||
              events.some(
                (previousEvent) =>
                  previousEvent.name === event.name &&
                  previousEvent.action === 'taskStart',
              )
            ) {
              events.push(event);
              collect(events, experience);
            }
          });
        }

        return (stopEvent) => {
          disposeCollectSubscription();
          this.emit(stopEvent);
        };
      },
    });

    this.experiences[name] = experience;
  }

  succeed({ name, attributes }: SucceedOptions) {
    const current = this.experiences[name];
    if (!current) {
      return;
    }

    current.succeed(attributes);
  }

  fail({ name, error, attributes }: FailOptions) {
    Object.values(this.experiences).forEach((current) => {
      if (name != null && current.name !== name) {
        return;
      }

      current.fail({ error, attributes });
    });
  }

  abort({ name, reason, attributes, checkForTimeout }: AbortOptions) {
    function abort(experience: Experience) {
      if (name != null && experience.name !== name) {
        return;
      }

      experience.abort({ reason, checkForTimeout, attributes });
    }

    const experiencesWithTimeouts = Object.values(this.experiences).filter(
      (experience) => experience.timeout,
    );
    const experiencesWithoutTimeouts = Object.values(this.experiences).filter(
      (experience) => !experience.timeout,
    );

    // We need to abort all experiences with timeouts first in order to properly
    // capture compound experiences composed of sub-experiences which have timeouts
    experiencesWithTimeouts.forEach(abort);
    experiencesWithoutTimeouts.forEach(abort);
  }

  subscribe(subscriber: ExperienceEventSubscriber): () => void {
    if (typeof subscriber !== 'function') {
      throw new Error('Subscriber must be a function');
    }
    this.subscribers.push(subscriber);
    return () => {
      this.subscribers = this.subscribers.filter((x) => x !== subscriber);
    };
  }

  stopOnError({ name, error, attributes }: StopOnErrorOptions) {
    if (this.isNetworkOfflineError(error)) {
      this.abort({
        name,
        reason: `Aborted ${name} because of network error: ${error.toString()}`,
        checkForTimeout: false,
        attributes,
      });
      return;
    }

    return this.fail({ name, error, attributes });
  }

  private emit(event: ExperienceEvent) {
    this.subscribers.forEach((subscriber) => {
      try {
        subscriber(event);
      } catch (e) {
        if (process.env.NODE_ENV !== 'production') {
          // eslint-disable-next-line no-console
          console.error(
            `Error occurred in ExperienceTracker subscriber when handling an event.`,
            'Error:',
            e,
            'Event:',
            event,
          );
        }
      }
    });
  }
}
