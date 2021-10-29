export class TestReportResult {
  readonly number_of_error_test_cases: number = 0;
  readonly number_of_failed_test_cases: number = 0;
  readonly number_of_skipped_test_cases: number = 0;
  readonly number_of_successful_test_cases: number = 0;
  readonly number_of_test_cases: number = 0;
  readonly step_uuid: string = '';

  constructor(props: Partial<TestReportResult> = {}) {
    Object.assign(this, props);
    Object.freeze(this);
  }
}
