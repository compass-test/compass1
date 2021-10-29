export default class TestGetters {
  constructor();
  get dom(): HTMLElement | undefined;
  get performanceOptions(): {
    enabled: boolean;
    samplingRate: number;
    slowThreshold: number;
  };
}
