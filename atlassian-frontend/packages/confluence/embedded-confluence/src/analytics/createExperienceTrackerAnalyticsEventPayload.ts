import type { ExperienceEvent } from '@atlassian/experience-tracker';

export const createExperienceTrackerAnalyticsEventPayload = (
  event: ExperienceEvent,
) => ({
  // Events should match the schema defined here:
  // https://hello.atlassian.net/wiki/spaces/BIZOPS/pages/387788554/Analytics+Event+Schema+for+SLA
  source: 'ui',
  actionSubject: 'ui',
  action: event.action,
  eventType: 'operational',
  attributes: createExperienceTrackerAnalyticsAttributes(event),
});

type ExperienceError = Error & {
  traceId?: string | null;
};

type Attributes = Omit<ExperienceEvent, 'action' | 'name' | 'id'> & {
  browserInfo: string;
  isActiveTab: boolean;
  error?: string | ExperienceError;
  errorMessage?: Error['message'];
  errorName?: Error['name'];
  task: ExperienceEvent['name'];
  taskId: ExperienceEvent['id'];
  traceId?: ExperienceError['traceId'];
};

function createExperienceTrackerAnalyticsAttributes(event: ExperienceEvent) {
  const { action, name, id, attributes: experienceAttributes, ...rest } = event;

  const attributes: Partial<Attributes> = {
    ...experienceAttributes,
    ...rest,
    task: name,
    taskId: id,
  };

  if (attributes.error) {
    let error: ExperienceError;

    if (typeof attributes.error === 'string') {
      error = new Error(attributes.error);
    } else {
      error = attributes.error as ExperienceError;
    }

    delete attributes.error;
    attributes.errorName = error.name;

    if (!attributes.traceId && error.traceId) {
      attributes.traceId = error.traceId;
    }

    attributes.errorMessage = error.message;
  }

  attributes.browserInfo = window.navigator.userAgent;

  // Matches the analytics-web-client's apdex event
  attributes.isActiveTab = document.visibilityState === 'visible';

  return attributes as Attributes;
}
