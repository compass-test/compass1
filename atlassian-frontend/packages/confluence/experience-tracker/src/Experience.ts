import { ExperienceEvent, StartEvent, StopEvent } from './ExperienceEvent';
import { ExperienceTimeoutError } from './ExperienceTimeoutError';

type ConstructorProps = {
  name: string;
  id: string;
  timeout?: number;
  startTime?: number;
  attributes?: object;
  onStart?: (event: StartEvent) => (event: StopEvent) => void;
  onSuccess?: () => void;
  onFailure?: () => void;
  onAbort?: () => void;
};

function mergeAttributes<T>(
  first: T | undefined,
  last: T | undefined,
): T | undefined {
  if (first === undefined) {
    return last;
  }

  if (last === undefined) {
    return first;
  }

  return {
    ...first,
    ...last,
  };
}

export class Experience {
  name: string;
  id: string;
  timeout?: number;

  private _hasStopped: boolean = false;
  private startTime: number;
  private attributes?: object;
  private onStop?: (event: StopEvent) => void;
  private onSuccess?: () => void;
  private onFailure?: () => void;
  private onAbort?: () => void;

  constructor({
    name,
    id,
    timeout,
    startTime = window.performance.now(),
    attributes,
    onStart,
    onSuccess,
    onFailure,
    onAbort,
  }: ConstructorProps) {
    this.name = name;
    this.id = id;
    this.timeout = timeout;
    this.startTime = startTime;
    this.attributes = attributes;
    this.onSuccess = onSuccess;
    this.onFailure = onFailure;
    this.onAbort = onAbort;

    const startEvent: StartEvent = {
      action: 'taskStart',
      name,
      id,
      startTime,
      timeout,
      attributes,
    };
    if (onStart) {
      this.onStop = onStart(startEvent);
    }
  }

  get hasStopped(): boolean {
    return this._hasStopped;
  }

  succeed(attributes?: object) {
    if (this._hasStopped) {
      return;
    }

    this.onSuccess && this.onSuccess();

    this.stop({
      action: 'taskSuccess',
      name: this.name,
      id: this.id,
      startTime: this.startTime,
      duration: this.getDuration(),
      attributes: mergeAttributes(this.attributes, attributes),
    });
  }

  fail({ error, attributes }: { error: Error; attributes?: object }) {
    if (this._hasStopped) {
      return;
    }

    this.onFailure && this.onFailure();

    this.stop({
      action: 'taskFail',
      name: this.name,
      id: this.id,
      startTime: this.startTime,
      duration: this.getDuration(),
      error,
      attributes: mergeAttributes(this.attributes, attributes),
    });
  }

  abort({
    reason,
    attributes,
    checkForTimeout = true,
  }: {
    reason: string;
    attributes?: object;
    checkForTimeout?: boolean;
  }) {
    if (this._hasStopped) {
      return;
    }

    // Check if the experience should have failed due to timeout
    if (
      checkForTimeout &&
      this.timeout != null &&
      this.getDuration() >= this.timeout
    ) {
      this.fail({
        attributes,
        error: new ExperienceTimeoutError(
          `${this.name} failed to complete in ${this.timeout}ms`,
        ),
      });
      return;
    }

    this.onAbort && this.onAbort();

    this.stop({
      action: 'taskAbort',
      name: this.name,
      id: this.id,
      startTime: this.startTime,
      duration: this.getDuration(),
      reason,
      checkForTimeout,
      attributes: mergeAttributes(this.attributes, attributes),
    });
  }

  stopOn(event?: ExperienceEvent) {
    if (!event) {
      return;
    }

    if (event.action === 'taskSuccess') {
      this.succeed();
    } else if (event.action === 'taskAbort') {
      this.abort({
        reason: event.reason,
        checkForTimeout: event.checkForTimeout,
      });
    } else if (event.action === 'taskFail') {
      this.fail({
        error: event.error,
      });
    }
  }

  private stop(event: StopEvent) {
    this._hasStopped = true;
    if (this.onStop) {
      this.onStop(event);
    }
  }

  private getDuration() {
    return Math.round(window.performance.now() - this.startTime);
  }
}
