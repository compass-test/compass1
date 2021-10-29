export type Reason =
  | 'OFF'
  | 'FALLTHROUGH'
  | 'RULE_MATCH'
  | 'TARGET_MATCH'
  | 'INELIGIBLE'
  | 'SIMPLE_EVAL'
  | 'ERROR';

export type CriteriaFn = (event: ExposureEvent) => boolean;

export type ExposureEvent = {
  action: string;
  actionSubject: string;
  eventType: string;
  attributes: ExposureEventAttributes;
  tags: string[];
  source: string;
};

export type CompressedEvaluations = {
  action: string;
  actionSubject: string;
  eventType: string;
  attributes: {
    evaluations: EvaluationAttributes[];
  };
  tags: string[];
  source: string;
};

export type ExposureEventAttributes = {
  flagKey: string;
  value: boolean | string | object;
  reason?: Reason;
  ruleId?: string;
};

export type EvaluationAttributes = {
  key: string;
  value: boolean | string | object;
  reason?: Reason;
  ruleId?: string;
};
